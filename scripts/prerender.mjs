import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const API = 'https://functions.poehali.dev/dd31f286-4b2a-49dc-a63f-7bbd58a99a3f/';

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const safeJson = (o) => JSON.stringify(o).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');

async function api(route, qp = {}) {
  const url = `${API}?${new URLSearchParams({ _path: route, ...qp })}`;
  let last;
  for (let i = 0; i < 4; i++) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(20000) });
      if (!r.ok) throw new Error(`${route}: HTTP ${r.status}`);
      return route === '/sitemap.xml' ? await r.text() : await r.json();
    } catch (e) {
      last = e;
      await new Promise((r) => setTimeout(r, 1500 * (i + 1)));
    }
  }
  throw last;
}

function metaBlock(m) {
  const t = [];
  t.push(`<title>${esc(m.title)}</title>`);
  t.push(`<meta name="description" content="${esc(m.description)}">`);
  if (m.keywords) t.push(`<meta name="keywords" content="${esc(m.keywords)}">`);
  if (m.noindex) t.push('<meta name="robots" content="noindex, follow">');
  t.push(`<link rel="canonical" href="${esc(m.url)}">`);
  t.push(`<meta property="og:site_name" content="АО «СОФТ ПЛЮС СИСТЕМС»">`);
  t.push(`<meta property="og:locale" content="ru_RU">`);
  t.push(`<meta property="og:type" content="${m.type}">`);
  t.push(`<meta property="og:url" content="${esc(m.url)}">`);
  t.push(`<meta property="og:title" content="${esc(m.title)}">`);
  t.push(`<meta property="og:description" content="${esc(m.description)}">`);
  t.push(`<meta property="og:image" content="${esc(m.image)}">`);
  t.push(`<meta name="twitter:card" content="summary_large_image">`);
  t.push(`<meta name="twitter:title" content="${esc(m.title)}">`);
  t.push(`<meta name="twitter:description" content="${esc(m.description)}">`);
  t.push(`<meta name="twitter:image" content="${esc(m.image)}">`);
  if (m.type === 'article') {
    if (m.publishedTime) t.push(`<meta property="article:published_time" content="${esc(m.publishedTime)}">`);
    if (m.modifiedTime) t.push(`<meta property="article:modified_time" content="${esc(m.modifiedTime)}">`);
  }
  if (m.jsonLd) t.push(`<script type="application/ld+json" id="seo-jsonld">${safeJson(m.jsonLd)}</script>`);
  return t.join('\n    ');
}

function buildHtml(template, meta, body, preload) {
  let html = template
    .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
    .replace(/<meta\s+name="(description|keywords|robots|twitter:[^"]+)"[^>]*>\s*/gi, '')
    .replace(/<meta\s+property="(og:|article:)[^"]*"[^>]*>\s*/gi, '')
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, '');
  html = html.replace('</head>', `    ${metaBlock(meta)}\n  </head>`);
  const data = `<script type="application/json" id="blog-preload">${safeJson(preload)}</script>`;
  html = html.replace(/<div id="root">\s*<\/div>/, `<div id="root">${body}</div>\n${data}`);
  if (!html.includes('id="blog-preload"')) throw new Error('root container not found in template');
  return html;
}

let DIST_DIR = '';
function write(rel, html) {
  const file = path.join(DIST_DIR, rel, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

export async function prerender(DIST, SSR) {
  if (!fs.existsSync(path.join(DIST, 'index.html')) || !fs.existsSync(SSR)) {
    console.warn('[prerender] нет dist или dist-ssr — пропуск');
    return;
  }
  DIST_DIR = DIST;
  const { render, postSeo, listSeo, listPath, BLOG_PER_PAGE } = await import(pathToFileURL(SSR).href);
  const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

  const all = await api('/posts', { per: 1000, page: 1 });
  const posts = all.posts;
  const categories = Array.from(new Set(posts.map((p) => p.category).filter(Boolean)));
  const pageCount = Math.max(1, Math.ceil(posts.length / BLOG_PER_PAGE));

  for (let page = 1; page <= pageCount; page++) {
    const slice = posts.slice((page - 1) * BLOG_PER_PAGE, page * BLOG_PER_PAGE);
    const preload = { type: 'list', page, total: posts.length, posts: slice, categories };
    const body = render(listPath(page), preload);
    write(listPath(page).replace(/^\//, ''), buildHtml(template, listSeo(page), body, preload));
  }

  let ok = 0;
  for (const p of posts) {
    const full = await api(`/posts/${p.slug}`);
    const preload = { type: 'post', post: full };
    const body = render(`/blog/${full.slug}`, preload);
    write(`blog/${full.slug}`, buildHtml(template, postSeo(full), body, preload));
    ok++;
  }

  const sitemap = await api('/sitemap.xml');
  if (sitemap.includes('<urlset')) fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap);

  console.log(`[prerender] страниц списка: ${pageCount}, статей: ${ok}, sitemap обновлён`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  prerender(path.resolve(process.argv[2] || 'dist'), path.resolve(process.argv[3] || 'dist-ssr/entry-server.js'))
    .catch((e) => { console.error('[prerender] ОШИБКА:', e.message); process.exit(1); });
}
