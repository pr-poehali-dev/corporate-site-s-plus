CREATE TABLE IF NOT EXISTS t_p49608475_corporate_site_s_plu.admins (
  id            SERIAL PRIMARY KEY,
  username      VARCHAR(64) UNIQUE NOT NULL,
  password_hash VARCHAR(256) NOT NULL,
  display_name  VARCHAR(128) NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS t_p49608475_corporate_site_s_plu.posts (
  id            SERIAL PRIMARY KEY,
  slug          VARCHAR(256) UNIQUE NOT NULL,
  title         VARCHAR(512) NOT NULL,
  excerpt       TEXT,
  content       TEXT NOT NULL,
  cover_url     TEXT,
  author_id     INTEGER REFERENCES t_p49608475_corporate_site_s_plu.admins(id),
  category      VARCHAR(128),
  tags          TEXT[],
  keywords      TEXT[],
  is_published  BOOLEAN DEFAULT FALSE,
  published_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_posts_slug      ON t_p49608475_corporate_site_s_plu.posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_published ON t_p49608475_corporate_site_s_plu.posts(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_category  ON t_p49608475_corporate_site_s_plu.posts(category);
