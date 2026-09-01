const ALLOWED_ORIGINS = new Set([
  'https://gamer-logic-hub.com',
  'https://www.gamer-logic-hub.com',
  'https://ukapuka123-droid.github.io',
  'http://127.0.0.1:8000',
  'http://localhost:8000'
]);
const BOT_UA = /bot|crawler|spider|slurp|bingpreview|facebookexternalhit|twitterbot|whatsapp|telegrambot|discordbot|headless/i;

function corsHeaders(request) {
  const origin = request.headers.get('Origin');
  const allowedOrigin = origin && ALLOWED_ORIGINS.has(origin)
    ? origin
    : 'https://gamer-logic-hub.com';
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8',
    'Vary': 'Origin',
    'X-Content-Type-Options': 'nosniff'
  };
}

function json(request, data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: corsHeaders(request)
  });
}

function validArticle(value) {
  return typeof value === 'string' && /^[a-z0-9-]{1,80}$/.test(value);
}

function validVisitor(value) {
  return typeof value === 'string' && value.length >= 8 && value.length <= 160;
}

async function hashVisitor(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function readStats(env, article, visitorHash = null) {
  const row = await env.DB.prepare(
    'SELECT views, likes FROM article_stats WHERE article_id = ?'
  ).bind(article).first();
  let liked = false;
  if (visitorHash) {
    liked = Boolean(await env.DB.prepare(
      'SELECT 1 AS liked FROM article_likes WHERE article_id = ? AND visitor_hash = ?'
    ).bind(article, visitorHash).first());
  }
  return {
    article,
    views: Number(row?.views || 0),
    likes: Number(row?.likes || 0),
    liked
  };
}

async function parsePayload(request) {
  try {
    return await request.json();
  } catch (_) {
    return null;
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin');

    if (request.method === 'OPTIONS') {
      if (origin && !ALLOWED_ORIGINS.has(origin)) return json(request, { error: 'Origin not allowed' }, 403);
      return new Response(null, { status: 204, headers: corsHeaders(request) });
    }

    if (origin && !ALLOWED_ORIGINS.has(origin)) {
      return json(request, { error: 'Origin not allowed' }, 403);
    }

    if (request.method === 'GET' && url.pathname === '/health') {
      return json(request, { ok: true, service: 'gamer-logic-stats' });
    }

    if (request.method === 'GET' && url.pathname === '/stats') {
      const articles = (url.searchParams.get('articles') || '')
        .split(',')
        .map((article) => article.trim().toLowerCase())
        .filter(validArticle)
        .slice(0, 50);
      if (!articles.length) return json(request, { error: 'No valid articles' }, 400);

      const placeholders = articles.map(() => '?').join(',');
      const result = await env.DB.prepare(
        `SELECT article_id, views, likes FROM article_stats WHERE article_id IN (${placeholders})`
      ).bind(...articles).all();
      const saved = new Map((result.results || []).map((row) => [row.article_id, row]));
      const stats = Object.fromEntries(articles.map((article) => {
        const row = saved.get(article);
        return [article, {
          views: Number(row?.views || 0),
          likes: Number(row?.likes || 0)
        }];
      }));
      return json(request, { stats });
    }

    if (request.method !== 'POST' || !['/view', '/like'].includes(url.pathname)) {
      return json(request, { error: 'Not found' }, 404);
    }

    const payload = await parsePayload(request);
    if (!payload || !validArticle(payload.article) || !validVisitor(payload.visitor)) {
      return json(request, { error: 'Invalid request' }, 400);
    }

    const article = payload.article;
    const visitorHash = await hashVisitor(payload.visitor);
    await env.DB.prepare(
      'INSERT OR IGNORE INTO article_stats (article_id, views, likes) VALUES (?, 0, 0)'
    ).bind(article).run();

    if (url.pathname === '/view') {
      if (!BOT_UA.test(request.headers.get('User-Agent') || '')) {
        const viewedOn = new Date().toISOString().slice(0, 10);
        const event = await env.DB.prepare(
          'INSERT OR IGNORE INTO article_views (article_id, visitor_hash, viewed_on) VALUES (?, ?, ?)'
        ).bind(article, visitorHash, viewedOn).run();
        if (Number(event.meta?.changes || 0) > 0) {
          await env.DB.prepare(
            'UPDATE article_stats SET views = views + 1, updated_at = CURRENT_TIMESTAMP WHERE article_id = ?'
          ).bind(article).run();
        }
      }
      return json(request, await readStats(env, article, visitorHash));
    }

    const existing = await env.DB.prepare(
      'SELECT 1 AS liked FROM article_likes WHERE article_id = ? AND visitor_hash = ?'
    ).bind(article, visitorHash).first();

    if (existing) {
      await env.DB.batch([
        env.DB.prepare('DELETE FROM article_likes WHERE article_id = ? AND visitor_hash = ?').bind(article, visitorHash),
        env.DB.prepare('UPDATE article_stats SET likes = MAX(0, likes - 1), updated_at = CURRENT_TIMESTAMP WHERE article_id = ?').bind(article)
      ]);
    } else {
      const inserted = await env.DB.prepare(
        'INSERT OR IGNORE INTO article_likes (article_id, visitor_hash) VALUES (?, ?)'
      ).bind(article, visitorHash).run();
      if (Number(inserted.meta?.changes || 0) > 0) {
        await env.DB.prepare(
          'UPDATE article_stats SET likes = likes + 1, updated_at = CURRENT_TIMESTAMP WHERE article_id = ?'
        ).bind(article).run();
      }
    }

    return json(request, await readStats(env, article, visitorHash));
  }
};
