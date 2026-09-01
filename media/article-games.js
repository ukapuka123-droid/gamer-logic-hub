(() => {
  const language = (document.documentElement.lang || 'ru').split('-')[0];
  const isNested = location.pathname.split('/').filter(Boolean).slice(-2, -1)[0] !== undefined && /\/(en|uz|tg|es|id)\//.test(location.pathname);
  const mediaPrefix = isNested ? '../media/' : 'media/';

  const copy = {
    ru: { title: 'Все игры', intro: 'Все доступные образовательные симуляторы в одном месте.', available: 'Доступен', plinkoTitle: 'Plinko: физика случайных отскоков', plinkoText: 'Наблюдайте, как случайные отскоки формируют распределение результатов.', limboTitle: 'Limbo: коэффициент и вероятность', limboText: 'Выберите цель до 9900× и исследуйте изменение вероятности.' },
    en: { title: 'All games', intro: 'All available educational simulators in one place.', available: 'Available', plinkoTitle: 'Plinko: the physics of random bounces', plinkoText: 'See how random bounces shape the distribution of outcomes.', limboTitle: 'Limbo: multiplier and probability', limboText: 'Choose a target up to 9900× and explore how probability changes.' },
    uz: { title: 'Barcha o‘yinlar', intro: 'Barcha mavjud ta’limiy simulyatorlar bir joyda.', available: 'Mavjud', plinkoTitle: 'Plinko: tasodifiy sakrashlar fizikasi', plinkoText: 'Tasodifiy sakrashlar natijalar taqsimotini qanday yaratishini ko‘ring.', limboTitle: 'Limbo: ko‘paytirgich va ehtimollik', limboText: '9900× gacha maqsad tanlang va ehtimollik o‘zgarishini o‘rganing.' },
    tg: { title: 'Ҳамаи бозиҳо', intro: 'Ҳамаи симуляторҳои омӯзишии дастрас дар як ҷо.', available: 'Дастрас', plinkoTitle: 'Plinko: физикаи ҷаҳишҳои тасодуфӣ', plinkoText: 'Тақсимоти натиҷаҳоро аз ҷаҳишҳои тасодуфӣ мушоҳида кунед.', limboTitle: 'Limbo: коэффитсиент ва эҳтимолият', limboText: 'Ҳадафро то 9900× интихоб карда, тағйири эҳтимолиятро омӯзед.' },
    es: { title: 'Todos los juegos', intro: 'Todos los simuladores educativos disponibles en un solo lugar.', available: 'Disponible', plinkoTitle: 'Plinko: física de rebotes aleatorios', plinkoText: 'Observá cómo los rebotes aleatorios forman la distribución de resultados.', limboTitle: 'Limbo: multiplicador y probabilidad', limboText: 'Elegí un objetivo de hasta 9900× y explorá cómo cambia la probabilidad.' },
    id: { title: 'Semua game', intro: 'Semua simulator edukatif yang tersedia dalam satu tempat.', available: 'Tersedia', plinkoTitle: 'Plinko: fisika pantulan acak', plinkoText: 'Lihat bagaimana pantulan acak membentuk distribusi hasil.', limboTitle: 'Limbo: pengali dan probabilitas', limboText: 'Pilih target hingga 9900× dan pelajari perubahan probabilitas.' }
  };
  const t = copy[language] || copy.ru;
  const games = [
    { href: 'simulator-plinko.html', image: 'plinko-card-hero.png', alt: 'Plinko', title: t.plinkoTitle, text: t.plinkoText },
    { href: 'simulator-limbo.html', image: 'limbo-card-hero.png', alt: 'Limbo', title: t.limboTitle, text: t.limboText },
    { href: 'simulator-dice.html', image: 'dice-card-hero.png', alt: 'Dice', title: 'Dice: 0–100', text: language === 'ru' ? 'Выберите условие и наблюдайте результат на шкале от 0 до 100.' : language === 'es' ? 'Elegí una condición y observá el resultado en la escala de 0 a 100.' : language === 'id' ? 'Pilih kondisi dan amati hasil pada skala 0–100.' : language === 'uz' ? 'Shartni tanlang va natijani 0–100 shkalasida kuzating.' : language === 'tg' ? 'Шартро интихоб карда, натиҷаро дар миқёси 0–100 бинед.' : 'Choose a condition and watch the result land on the 0–100 scale.' }
  ].slice(0, 6);

  const style = document.createElement('style');
  style.textContent = '.article-all-games{margin:24px 0;padding:20px;border:1px solid rgba(168,76,244,.42);border-radius:20px;background:linear-gradient(145deg,rgba(33,20,61,.94),rgba(23,16,42,.96));box-shadow:0 14px 34px rgba(0,0,0,.22)}.article-all-games-head{margin-bottom:15px}.article-all-games h2{margin:0;color:var(--yellow,#ffd84d);font-size:24px}.article-all-games-head p{margin:3px 0 0;color:var(--muted,#b9acd1);font-size:13px}.article-all-games-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.article-all-game{display:grid;grid-template-columns:160px minmax(0,1fr);align-items:center;overflow:hidden;border:1px solid var(--line,rgba(255,255,255,.14));border-radius:15px;background:rgba(11,6,24,.62);color:var(--text,#fff);text-decoration:none;transition:transform .18s ease,border-color .18s ease}.article-all-game:hover{transform:translateY(-3px);border-color:var(--purple,#a84cf4)}.article-all-game img{display:block;width:160px;height:112px;object-fit:cover}.article-all-game-copy{padding:13px}.article-all-game-status{display:inline-block;margin-bottom:4px;color:var(--green,#20e875);font-size:10px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}.article-all-game h3{margin:0;font-size:17px;line-height:1.25}.article-all-game p{margin:5px 0 0;color:var(--muted,#b9acd1);font-size:12px;line-height:1.35}@media(max-width:820px){.article-all-games-grid{grid-template-columns:1fr}}@media(max-width:500px){.article-all-games{padding:13px}.article-all-game{grid-template-columns:1fr}.article-all-game img{width:100%;height:165px}}';
  document.head.append(style);
  const catalogLayout = document.createElement('style');
  catalogLayout.textContent = '.article-all-games-standalone{width:min(720px,calc(100% - 28px));margin:24px auto 46px}.article-all-games-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.article-all-game{display:flex;flex-direction:column;align-items:stretch;min-width:0}.article-all-game img{width:100%;height:132px;object-fit:cover}.article-all-game-copy{display:flex;flex:1;flex-direction:column;align-items:flex-start;padding:14px}.article-all-game-status{margin-bottom:5px}.article-all-game h3{color:var(--text,#fff);font-size:16px}.article-all-game p{margin-top:6px}@media(max-width:700px){.article-all-games-grid{grid-template-columns:1fr}.article-all-game{display:grid;grid-template-columns:150px minmax(0,1fr)}.article-all-game img{width:150px;height:100%}}@media(max-width:460px){.article-all-game{display:flex}.article-all-game img{width:100%;height:155px}}';
  document.head.append(catalogLayout);

  const createBlock = () => {
      const section = document.createElement('section');
      section.className = 'article-all-games';
      section.setAttribute('aria-label', t.title);
      section.innerHTML = `<div class="article-all-games-head"><h2>${t.title}</h2><p>${t.intro}</p></div><div class="article-all-games-grid">${games.map((game) => `<a class="article-all-game" href="${game.href}"><img src="${mediaPrefix}${game.image}" alt="${game.alt}"><div class="article-all-game-copy"><span class="article-all-game-status">${t.available}</span><h3>${game.title}</h3><p>${game.text}</p></div></a>`).join('')}</div>`;
      return section;
  };

  const addBlock = () => {
    const popularSections = [...document.querySelectorAll('.popular-articles')];
    popularSections.forEach((popular) => {
      if (popular.nextElementSibling?.classList.contains('article-all-games')) return;
      const section = createBlock();
      popular.insertAdjacentElement('afterend', section);
    });
    if (!popularSections.length) {
      const main = document.querySelector('main');
      if (main && !main.querySelector('.article-all-games')) {
        const section = createBlock();
        section.classList.add('article-all-games-standalone');
        main.append(section);
      }
    }
  };

  addBlock();
  new MutationObserver(addBlock).observe(document.body, { childList: true, subtree: true });
})();

(() => {
  const API_URL = 'https://gamer-logic-stats.ukapuka123.workers.dev';
  const articleMatch = location.pathname.match(/\/article-([a-z0-9-]+)\.html$/i);
  if (!articleMatch) return;

  const articleId = articleMatch[1].toLowerCase();
  const language = (document.documentElement.lang || 'ru').split('-')[0];
  const copy = {
    ru: { views: 'просмотров', like: 'Нравится', unlike: 'Убрать лайк', error: 'Не удалось сохранить лайк' },
    en: { views: 'views', like: 'Like', unlike: 'Unlike', error: 'Could not save your like' },
    uz: { views: 'ko‘rish', like: 'Yoqdi', unlike: 'Laykni olib tashlash', error: 'Laykni saqlab bo‘lmadi' },
    tg: { views: 'тамошо', like: 'Маъқул', unlike: 'Лайкро гирифтан', error: 'Лайк сабт нашуд' },
    es: { views: 'vistas', like: 'Me gusta', unlike: 'Quitar Me gusta', error: 'No se pudo guardar tu Me gusta' },
    id: { views: 'tayangan', like: 'Suka', unlike: 'Batal suka', error: 'Suka tidak dapat disimpan' }
  };
  const t = copy[language] || copy.ru;

  const style = document.createElement('style');
  style.textContent = '.article-reactions{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;margin:16px 0 0;font-size:13px}.article-view-count,.article-like-button{display:inline-flex;align-items:center;gap:7px;min-height:38px;padding:8px 13px;border:1px solid rgba(255,255,255,.16);border-radius:999px;background:rgba(12,7,25,.62);color:var(--muted,#c7bbd9);backdrop-filter:blur(8px)}.article-view-count strong,.article-like-button strong{color:var(--text,#fff);font-variant-numeric:tabular-nums}.article-reaction-icon{width:18px;height:18px;flex:0 0 18px}.article-like-button{cursor:pointer;font:inherit;transition:transform .16s ease,border-color .16s ease,background .16s ease}.article-like-button:hover{transform:translateY(-1px);border-color:rgba(255,87,145,.7)}.article-like-button[aria-pressed="true"]{border-color:rgba(255,87,145,.72);background:rgba(255,62,126,.16);color:#ff8db6}.article-like-button[aria-pressed="true"] .article-reaction-icon{fill:#ff5b95}.article-like-button:disabled{cursor:wait;opacity:.7}.article-reactions-error{width:100%;margin:0;color:#ff9eae;font-size:12px;text-align:center}@media(max-width:520px){.article-reactions{gap:8px}.article-view-count,.article-like-button{min-height:36px;padding:7px 11px}}';
  document.head.append(style);

  const widget = document.createElement('div');
  widget.className = 'article-reactions';
  widget.innerHTML = `<span class="article-view-count"><svg class="article-reaction-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.6"/></svg><strong data-article-views>—</strong><span>${t.views}</span></span><button class="article-like-button" type="button" aria-pressed="false" aria-label="${t.like}"><svg class="article-reaction-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M20.8 4.7a5.4 5.4 0 0 0-7.7 0L12 5.8l-1.1-1.1a5.4 5.4 0 0 0-7.7 7.7L12 21l8.8-8.6a5.4 5.4 0 0 0 0-7.7Z"/></svg><span data-like-label>${t.like}</span><strong data-article-likes>—</strong></button>`;
  const hero = document.querySelector('.article-hero');
  if (!hero) return;
  hero.append(widget);

  const viewsNode = widget.querySelector('[data-article-views]');
  const likesNode = widget.querySelector('[data-article-likes]');
  const likeButton = widget.querySelector('.article-like-button');
  const likeLabel = widget.querySelector('[data-like-label]');

  const visitorId = (() => {
    const key = 'glh-stats-visitor';
    try {
      let value = localStorage.getItem(key);
      if (!value) {
        value = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        localStorage.setItem(key, value);
      }
      return value;
    } catch (_) {
      return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }
  })();

  const render = (stats) => {
    viewsNode.textContent = new Intl.NumberFormat(language).format(Number(stats.views) || 0);
    likesNode.textContent = new Intl.NumberFormat(language).format(Number(stats.likes) || 0);
    const liked = Boolean(stats.liked);
    likeButton.setAttribute('aria-pressed', String(liked));
    likeButton.setAttribute('aria-label', liked ? t.unlike : t.like);
    likeLabel.textContent = liked ? t.unlike : t.like;
  };

  const request = async (path) => {
    const response = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ article: articleId, visitor: visitorId })
    });
    if (!response.ok) throw new Error(`Stats API ${response.status}`);
    return response.json();
  };

  const loadStats = () => request('/view').then(render).catch(() => {
    viewsNode.textContent = '—';
    likesNode.textContent = '—';
  });

  likeButton.addEventListener('click', async () => {
    likeButton.disabled = true;
    widget.querySelector('.article-reactions-error')?.remove();
    try {
      render(await request('/like'));
    } catch (_) {
      const message = document.createElement('p');
      message.className = 'article-reactions-error';
      message.textContent = t.error;
      widget.append(message);
    } finally {
      likeButton.disabled = false;
    }
  });

  if (document.visibilityState === 'visible') loadStats();
  else document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') loadStats();
  }, { once: true });
})();
