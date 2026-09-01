CREATE TABLE IF NOT EXISTS article_stats (
  article_id TEXT PRIMARY KEY,
  views INTEGER NOT NULL DEFAULT 0,
  likes INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS article_views (
  article_id TEXT NOT NULL,
  visitor_hash TEXT NOT NULL,
  viewed_on TEXT NOT NULL,
  PRIMARY KEY (article_id, visitor_hash, viewed_on)
);

CREATE TABLE IF NOT EXISTS article_likes (
  article_id TEXT NOT NULL,
  visitor_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (article_id, visitor_hash)
);

CREATE INDEX IF NOT EXISTS idx_article_views_date ON article_views(viewed_on);
