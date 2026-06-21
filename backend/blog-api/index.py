"""
API блога АО «СОФТ ПЛЮС СИСТЕМС».
Маршруты:
  POST /auth/login          — вход в админку
  GET  /posts               — список опубликованных статей (публичный)
  GET  /posts/{slug}        — одна статья (публичный)
  GET  /admin/posts         — все статьи (требует токен)
  POST /admin/posts         — создать статью
  PUT  /admin/posts/{id}    — обновить статью
  DELETE /admin/posts/{id}  — удалить статью (мягко: is_published=false)
  POST /admin/upload        — загрузить изображение на S3
"""

import json
import os
import re
import time
import traceback
import unicodedata

import bcrypt
import boto3
import jwt
import psycopg2

SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "t_p49608475_corporate_site_s_plu")
JWT_SECRET = os.environ.get("JWT_SECRET", "fallback-secret-change-me")
JWT_ALGO = "HS256"
JWT_TTL = 60 * 60 * 24  # 24 h

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Authorization",
}


# ─── helpers ───────────────────────────────────────────────────────────────────

def ok(data, status=200):
    return {"statusCode": status, "headers": {**CORS, "Content-Type": "application/json"},
            "body": json.dumps(data, ensure_ascii=False, default=str)}


def err(msg, status=400):
    return {"statusCode": status, "headers": {**CORS, "Content-Type": "application/json"},
            "body": json.dumps({"error": msg}, ensure_ascii=False)}


def get_db():
    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    return conn, cur


def T(table: str) -> str:
    """Возвращает полное имя таблицы со схемой."""
    return f"{SCHEMA}.{table}"


def require_auth(event):
    """Извлекает и верифицирует JWT. Заголовки приходят в нижнем регистре."""
    headers = {k.lower(): v for k, v in (event.get("headers") or {}).items()}
    token = headers.get("x-authorization", "")
    if token.startswith("Bearer ") or token.startswith("bearer "):
        token = token.split(" ", 1)[1]
    if not token:
        raise ValueError("Unauthorized")
    # options={"verify_sub": False} — не проверяем тип sub (число или строка)
    payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGO],
                         options={"verify_sub": False})
    # Нормализуем sub к строке
    payload["sub"] = str(payload.get("sub", ""))
    return payload


def slugify(text: str) -> str:
    text = unicodedata.normalize("NFKD", text)
    text = re.sub(r"[^\w\s-]", "", text.lower())
    text = re.sub(r"[\s_-]+", "-", text).strip("-")
    return text or f"post-{int(time.time())}"


def parse_body(event):
    body = event.get("body") or "{}"
    if isinstance(body, str):
        return json.loads(body)
    return body


# ─── handler ───────────────────────────────────────────────────────────────────

def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    method = event.get("httpMethod", "GET")
    params = event.get("queryStringParameters") or {}
    # Платформа не передаёт подпути — маршрут берём из ?_path=
    path = params.get("_path", event.get("path", "/"))
    path = path.rstrip("/") or "/"

    try:
        # ── AUTH ──────────────────────────────────────────────────
        if path == "/auth/login" and method == "POST":
            body = parse_body(event)
            username = body.get("username", "")
            password = body.get("password", "")

            conn, cur = get_db()
            cur.execute(f"SELECT id, password_hash, display_name FROM {T('admins')} WHERE username=%s", (username,))
            row = cur.fetchone()
            conn.close()

            if not row:
                return err("Неверный логин или пароль", 401)
            admin_id, pw_hash, display_name = row
            if not bcrypt.checkpw(password.encode(), pw_hash.encode()):
                return err("Неверный логин или пароль", 401)

            token = jwt.encode(
                {"sub": str(admin_id), "username": username, "exp": int(time.time()) + JWT_TTL},
                JWT_SECRET, algorithm=JWT_ALGO
            )
            return ok({"token": token, "display_name": display_name})

        # ── PUBLIC: список статей ─────────────────────────────────
        if path == "/posts" and method == "GET":
            page = int(params.get("page", 1))
            per = int(params.get("per", 9))
            cat = params.get("category")
            tag = params.get("tag")
            offset = (page - 1) * per

            conn, cur = get_db()
            conds, vals = ["is_published=TRUE"], []
            if cat:
                conds.append("category=%s"); vals.append(cat)
            if tag:
                conds.append("%s=ANY(tags)"); vals.append(tag)

            where = " AND ".join(conds)
            cur.execute(f"SELECT COUNT(*) FROM {T('posts')} WHERE {where}", vals)
            total = cur.fetchone()[0]

            cur.execute(
                f"""SELECT id, slug, title, excerpt, cover_url, category, tags, published_at
                    FROM {T('posts')} WHERE {where}
                    ORDER BY published_at DESC LIMIT %s OFFSET %s""",
                vals + [per, offset]
            )
            cols = ["id", "slug", "title", "excerpt", "cover_url", "category", "tags", "published_at"]
            posts = [dict(zip(cols, r)) for r in cur.fetchall()]
            conn.close()
            return ok({"posts": posts, "total": total, "page": page, "per": per})

        # ── PUBLIC: одна статья ───────────────────────────────────
        if path.startswith("/posts/") and method == "GET":
            slug = path[len("/posts/"):]
            conn, cur = get_db()
            cur.execute(
                f"""SELECT p.id, p.slug, p.title, p.excerpt, p.content, p.cover_url,
                          p.category, p.tags, p.keywords, p.published_at,
                          a.display_name AS author
                   FROM {T('posts')} p LEFT JOIN {T('admins')} a ON a.id=p.author_id
                   WHERE p.slug=%s AND p.is_published=TRUE""",
                (slug,)
            )
            row = cur.fetchone()
            conn.close()
            if not row:
                return err("Статья не найдена", 404)
            cols = ["id","slug","title","excerpt","content","cover_url","category","tags","keywords","published_at","author"]
            return ok(dict(zip(cols, row)))

        # ── ADMIN: список ВСЕХ статей ─────────────────────────────
        if path == "/admin/posts" and method == "GET":
            payload = require_auth(event)
            conn, cur = get_db()
            cur.execute(
                f"""SELECT id, slug, title, category, tags, is_published, created_at, updated_at
                   FROM {T('posts')} ORDER BY created_at DESC"""
            )
            cols = ["id","slug","title","category","tags","is_published","created_at","updated_at"]
            posts = [dict(zip(cols, r)) for r in cur.fetchall()]
            conn.close()
            return ok({"posts": posts})

        # ── ADMIN: получить одну статью полностью ────────────────
        if path.startswith("/admin/posts/") and method == "GET":
            payload = require_auth(event)
            post_id = int(path.split("/")[-1])
            conn, cur = get_db()
            cur.execute(
                f"""SELECT id, slug, title, excerpt, content, cover_url,
                          category, tags, keywords, is_published, published_at,
                          created_at, updated_at
                   FROM {T('posts')} WHERE id=%s""",
                (post_id,)
            )
            row = cur.fetchone()
            conn.close()
            if not row:
                return err("Статья не найдена", 404)
            cols = ["id","slug","title","excerpt","content","cover_url",
                    "category","tags","keywords","is_published","published_at",
                    "created_at","updated_at"]
            return ok(dict(zip(cols, row)))

        # ── ADMIN: создать статью ─────────────────────────────────
        if path == "/admin/posts" and method == "POST":
            payload = require_auth(event)
            b = parse_body(event)

            title    = b.get("title", "").strip()
            content  = b.get("content", "").strip()
            if not title or not content:
                return err("Поля title и content обязательны")

            slug      = slugify(b.get("slug") or title) + f"-{int(time.time()) % 10000}"
            excerpt   = b.get("excerpt", "")
            cover_url = b.get("cover_url", "")
            category  = b.get("category", "")
            tags      = b.get("tags", [])
            keywords  = b.get("keywords", [])
            publish   = bool(b.get("is_published", False))
            pub_at    = "NOW()" if publish else "NULL"

            conn, cur = get_db()
            cur.execute(
                f"""INSERT INTO {T('posts')}
                    (slug, title, excerpt, content, cover_url, author_id,
                     category, tags, keywords, is_published, published_at)
                    VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,{'NOW()' if publish else 'NULL'})
                    RETURNING id, slug""",
                (slug, title, excerpt, content, cover_url, int(payload["sub"]),
                 category, tags, keywords, publish)
            )
            row = cur.fetchone()
            conn.commit()
            conn.close()
            return ok({"id": row[0], "slug": row[1]}, 201)

        # ── ADMIN: обновить статью ────────────────────────────────
        if path.startswith("/admin/posts/") and method == "PUT":
            payload = require_auth(event)
            post_id = int(path.split("/")[-1])
            b = parse_body(event)

            conn, cur = get_db()
            cur.execute(f"SELECT is_published FROM {T('posts')} WHERE id=%s", (post_id,))
            existing = cur.fetchone()
            if not existing:
                conn.close()
                return err("Статья не найдена", 404)

            was_published = existing[0]
            publish = bool(b.get("is_published", was_published))

            fields, vals = [], []
            for f in ["title","excerpt","content","cover_url","category"]:
                if f in b:
                    fields.append(f"{f}=%s"); vals.append(b[f])
            for f in ["tags","keywords"]:
                if f in b:
                    fields.append(f"{f}=%s"); vals.append(b[f])
            if "slug" in b:
                fields.append("slug=%s"); vals.append(slugify(b["slug"]))
            fields.append("is_published=%s"); vals.append(publish)
            if publish and not was_published:
                fields.append("published_at=NOW()")
            fields.append("updated_at=NOW()")
            vals.append(post_id)

            cur.execute(f"UPDATE {T('posts')} SET {', '.join(fields)} WHERE id=%s", vals)
            conn.commit()
            conn.close()
            return ok({"updated": post_id})

        # ── ADMIN: архивировать статью ────────────────────────────
        if path.startswith("/admin/posts/") and method == "DELETE":
            payload = require_auth(event)
            post_id = int(path.split("/")[-1])
            conn, cur = get_db()
            cur.execute(f"UPDATE {T('posts')} SET is_published=FALSE, updated_at=NOW() WHERE id=%s", (post_id,))
            conn.commit()
            conn.close()
            return ok({"archived": post_id})

        # ── ADMIN: загрузка изображения ───────────────────────────
        if path == "/admin/upload" and method == "POST":
            payload = require_auth(event)
            import base64 as b64lib
            b = parse_body(event)
            data_b64 = b.get("data", "")
            mime     = b.get("mime", "image/jpeg")

            # Убираем data URI префикс если есть: "data:image/jpeg;base64,..."
            if "," in data_b64:
                data_b64 = data_b64.split(",", 1)[1]

            ext = mime.split("/")[-1].replace("jpeg", "jpg").replace("svg+xml", "svg")
            filename = f"blog/{int(time.time())}.{ext}"

            s3 = boto3.client(
                "s3",
                endpoint_url="https://bucket.poehali.dev",
                aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
                aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
            )
            s3.put_object(
                Bucket="files",
                Key=filename,
                Body=b64lib.b64decode(data_b64),
                ContentType=mime,
            )
            cdn = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{filename}"
            return ok({"url": cdn})

        # ── SETUP: создать первого администратора (только если таблица пустая) ──
        if path == "/setup" and method == "POST":
            b = parse_body(event)
            username = b.get("username", "").strip()
            password = b.get("password", "").strip()
            display  = b.get("display_name", username)
            if not username or not password:
                return err("username и password обязательны")
            conn, cur = get_db()
            cur.execute(f"SELECT COUNT(*) FROM {T('admins')}")
            count = cur.fetchone()[0]
            if count > 0:
                conn.close()
                return err("Администратор уже создан", 403)
            pw_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt(12)).decode()
            cur.execute(
                f"INSERT INTO {T('admins')} (username, password_hash, display_name) VALUES (%s,%s,%s) RETURNING id",
                (username, pw_hash, display)
            )
            new_id = cur.fetchone()[0]
            conn.commit()
            conn.close()
            return ok({"created": new_id, "username": username}, 201)

        return err("Not found", 404)

    except ValueError as e:
        if "Unauthorized" in str(e):
            return err("Требуется авторизация", 401)
        return err(str(e))
    except Exception as e:
        tb = traceback.format_exc()
        print(tb)
        return err(f"Ошибка: {str(e)} | {tb[-300:]}", 500)