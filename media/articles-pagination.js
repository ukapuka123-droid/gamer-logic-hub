(() => {
  const catalogLayout = document.createElement('style');
  catalogLayout.textContent = '.all-games-head{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;column-gap:20px}.all-games-head h2,.all-games-head p{grid-column:1}.all-games-head p{grid-row:2}.all-games-link{grid-column:2;grid-row:1/3;display:inline-flex;align-items:center;justify-content:center;min-height:40px;padding:9px 18px;border:1px solid var(--purple-neon,var(--purple,#a84cf4));border-radius:999px;background:rgba(168,76,244,.13);color:var(--text-primary,var(--text,#fff));font-size:13px;font-weight:800;text-decoration:none;white-space:nowrap;transition:transform .18s ease,border-color .18s ease,background .18s ease,box-shadow .18s ease}.all-games-link:hover{transform:translateY(-2px);border-color:var(--gold,#ffd700);background:rgba(255,215,0,.12);box-shadow:0 8px 20px rgba(255,215,0,.1)}.all-games-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.all-game{display:flex;flex-direction:column;align-items:stretch;min-width:0}.all-game img{width:100%;height:145px;object-fit:cover}.all-game-copy{display:flex;flex:1;flex-direction:column;align-items:flex-start;padding:14px}.all-game h3{font-size:16px}.all-game p{margin-top:6px}@media(max-width:700px){.all-games-grid{grid-template-columns:1fr}.all-game{display:grid;grid-template-columns:150px minmax(0,1fr)}.all-game img{width:150px;height:100%}}@media(max-width:460px){.all-games-head{grid-template-columns:1fr;row-gap:12px}.all-games-head h2,.all-games-head p,.all-games-link{grid-column:1}.all-games-link{grid-row:3;justify-self:start}.all-game{display:flex}.all-game img{width:100%;height:165px}}';
  document.head.append(catalogLayout);
  const gamesLinkStyle = document.createElement('style');
  gamesLinkStyle.textContent = '.all-games-link{border-color:#ff9a00;background:linear-gradient(135deg,#ffc400,#ff7a00);color:#241000;box-shadow:0 8px 22px rgba(255,122,0,.3)}.all-games-link:hover{border-color:#ffd45a;background:linear-gradient(135deg,#ffd84d,#ff9418);box-shadow:0 11px 28px rgba(255,122,0,.42)}';
  document.head.append(gamesLinkStyle);
  const lang = (document.documentElement.lang || 'ru').split('-')[0];
  const gamesGrid = document.querySelector('.all-games-grid');
  const gamesSectionCopy = {
    ru: { title: 'Наши игры', link: 'Все игры' },
    en: { title: 'Our games', link: 'All games' },
    uz: { title: 'Bizning o‘yinlar', link: 'Barcha o‘yinlar' },
    tg: { title: 'Бозиҳои мо', link: 'Ҳамаи бозиҳо' },
    es: { title: 'Nuestros juegos', link: 'Todos los juegos' },
    id: { title: 'Game kami', link: 'Semua game' }
  };
  const gamesSectionText = gamesSectionCopy[lang] || gamesSectionCopy.ru;
  const gamesSection = gamesGrid?.closest('.all-games');
  const gamesHead = gamesSection?.querySelector('.all-games-head');
  if (gamesHead) {
    const gamesTitle = gamesHead.querySelector('h2');
    if (gamesTitle) gamesTitle.textContent = gamesSectionText.title;
    if (!gamesHead.querySelector('.all-games-link')) {
      const gamesLink = document.createElement('a');
      gamesLink.className = 'all-games-link';
      gamesLink.href = 'index.html#simulators';
      gamesLink.textContent = gamesSectionText.link;
      gamesHead.append(gamesLink);
    }
  }
  if (gamesGrid && !gamesGrid.querySelector('[href="simulator-dice.html"]')) {
    const text = {ru:'Выберите условие и наблюдайте результат на шкале от 0 до 100.',en:'Choose a condition and watch the result land on the 0–100 scale.',uz:'Shartni tanlang va natijani 0–100 shkalasida kuzating.',tg:'Шартро интихоб карда, натиҷаро дар миқёси 0–100 бинед.',es:'Elegí una condición y observá el resultado en la escala de 0 a 100.',id:'Pilih kondisi dan amati hasil pada skala 0–100.'};
    const available = {ru:'Доступен',en:'Available',uz:'Mavjud',tg:'Дастрас',es:'Disponible',id:'Tersedia'};
    const mediaPrefix = lang === 'ru' ? 'media/' : '../media/';
    const card = document.createElement('a');
    card.className = 'all-game';
    card.href = 'simulator-dice.html';
    card.innerHTML = `<img src="${mediaPrefix}dice-card-hero.png" alt="Dice"><div class="all-game-copy"><span class="all-game-status">${available[lang] || available.ru}</span><h3>Dice: 0–100</h3><p>${text[lang] || text.ru}</p></div>`;
    gamesGrid.append(card);
  }
  const articlesPerPage = 6;
  const cards = [...document.querySelectorAll('.card-grid > .card')];
  const grid = document.querySelector('.card-grid');
  const statsCopy = {
    ru: { views: 'просмотров', likes: 'лайков' },
    en: { views: 'views', likes: 'likes' },
    uz: { views: 'ko‘rish', likes: 'layk' },
    tg: { views: 'тамошо', likes: 'лайк' },
    es: { views: 'vistas', likes: 'Me gusta' },
    id: { views: 'tayangan', likes: 'suka' }
  };
  const statsText = statsCopy[lang] || statsCopy.ru;
  const statsStyle = document.createElement('style');
  statsStyle.textContent = '.card-grid>.card{position:relative}.article-card-topline{position:relative;z-index:7;display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:30px;margin-bottom:16px}.article-card-topline .tags{min-width:0;margin:0}.article-card-stats{display:flex;flex:0 0 auto;gap:6px;pointer-events:none;user-select:none}.article-card-stat{display:inline-flex;align-items:center;gap:5px;min-height:29px;padding:5px 9px;border:1px solid rgba(255,255,255,.13);border-radius:999px;background:rgba(12,7,25,.78);color:var(--text-muted,#b9acd1);font-size:10px;font-weight:700;line-height:1;white-space:nowrap;box-shadow:0 5px 16px rgba(0,0,0,.16);backdrop-filter:blur(8px)}.article-card-stat svg{width:14px;height:14px;flex:0 0 14px}.article-card-stat strong{color:var(--text,#fff);font-variant-numeric:tabular-nums}.article-card-stats-ready{animation:card-stats-in .24s ease both}.card-grid>.card>.icon{display:none}.card-grid>.card h3{font-size:clamp(19px,2vw,22px);line-height:1.28;margin:0 0 10px;letter-spacing:-.012em}.card-grid>.card .read-more{align-self:flex-start;margin-top:4px;padding:8px 13px;border:1px solid rgba(255,215,0,.34);border-radius:999px;background:rgba(255,215,0,.08);font-size:14px;font-weight:800;line-height:1;color:var(--gold);transition:transform .2s ease,background .2s ease,border-color .2s ease,box-shadow .2s ease}.card-grid>.card:hover .read-more{transform:translateX(3px);border-color:rgba(255,215,0,.62);background:rgba(255,215,0,.14);box-shadow:0 7px 18px rgba(255,215,0,.1)}@keyframes card-stats-in{from{opacity:.45;transform:translateY(-2px)}to{opacity:1;transform:none}}@media(max-width:620px){.article-card-topline{align-items:flex-start;gap:9px;margin-bottom:14px}.article-card-stats{gap:5px}.article-card-stat{min-height:28px;padding:5px 8px}.article-card-stat span{display:none}.card-grid>.card h3{font-size:19px}.card-grid>.card .read-more{font-size:13.5px}}@media(max-width:380px){.article-card-topline{flex-wrap:wrap}.article-card-stats{margin-left:auto}}';
  document.head.append(statsStyle);
  const cardToplineStyle = document.createElement('style');
  cardToplineStyle.textContent = '.card-grid>.card{padding-top:68px}.article-card-topline{position:absolute;top:22px;left:22px;right:22px;display:flex;align-items:center;justify-content:space-between;flex-wrap:nowrap;gap:12px;min-width:0;min-height:30px;margin:0}.article-card-topline .tags{display:flex;flex:1 1 auto;flex-wrap:nowrap;gap:6px;min-width:0;margin:0}.article-card-topline .tag{flex:0 0 auto;white-space:nowrap}.article-card-stats{flex:0 0 auto;margin:0}@media(max-width:980px){.article-card-stat>span{display:none}.article-card-stat{padding:5px 8px}}@media(max-width:620px){.card-grid>.card{padding-top:64px}.article-card-topline{top:18px;left:18px;right:18px;align-items:center;flex-wrap:nowrap;gap:7px}.article-card-topline .tags{gap:4px}.article-card-topline .tag{padding:3px 6px;font-size:9.5px}.article-card-stats{gap:4px}.article-card-stat{min-height:27px;padding:4px 7px;gap:4px}.article-card-stat svg{width:13px;height:13px;flex-basis:13px}}@media(max-width:380px){.article-card-topline{left:14px;right:14px;flex-wrap:nowrap;gap:5px}.article-card-topline .tag{padding:3px 5px;font-size:9px}.article-card-stat{padding:4px 6px}.article-card-stat svg{width:12px;height:12px;flex-basis:12px}}';
  cardToplineStyle.textContent += '.card-grid>.card>.article-card-topline{position:absolute;z-index:7}';
  document.head.append(cardToplineStyle);

  const cardStats = cards.map((card) => {
    const match = new URL(card.href, location.href).pathname.match(/\/article-([a-z0-9-]+)\.html$/i);
    if (!match) return null;
    const articleId = match[1].toLowerCase();
    const stats = document.createElement('span');
    stats.className = 'article-card-stats';
    stats.setAttribute('aria-label', `${statsText.views} и ${statsText.likes}`);
    stats.innerHTML = `<span class="article-card-stat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.6"/></svg><strong data-card-views>0</strong><span>${statsText.views}</span></span><span class="article-card-stat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M20.8 4.7a5.4 5.4 0 0 0-7.7 0L12 5.8l-1.1-1.1a5.4 5.4 0 0 0-7.7 7.7L12 21l8.8-8.6a5.4 5.4 0 0 0 0-7.7Z"/></svg><strong data-card-likes>0</strong><span>${statsText.likes}</span></span>`;
    const topLine = document.createElement('div');
    topLine.className = 'article-card-topline';
    const tags = card.querySelector('.tags');
    if (tags) topLine.append(tags);
    topLine.append(stats);
    card.prepend(topLine);
    return { articleId, stats };
  }).filter(Boolean);

  const articleIds = [...new Set(cardStats.map(({ articleId }) => articleId))];
  if (articleIds.length) {
    fetch(`https://gamer-logic-stats.ukapuka123.workers.dev/stats?articles=${encodeURIComponent(articleIds.join(','))}`)
      .then((response) => {
        if (!response.ok) throw new Error(`Stats API ${response.status}`);
        return response.json();
      })
      .then(({ stats = {} }) => {
        cardStats.forEach(({ articleId, stats: element }) => {
          const values = stats[articleId] || { views: 0, likes: 0 };
          element.querySelector('[data-card-views]').textContent = new Intl.NumberFormat(lang).format(Number(values.views) || 0);
          element.querySelector('[data-card-likes]').textContent = new Intl.NumberFormat(lang).format(Number(values.likes) || 0);
          element.classList.add('article-card-stats-ready');
        });
      })
      .catch(() => {});
  }

  if (!grid || !cards.length) return;

  const totalPages = Math.ceil(cards.length / articlesPerPage);
  const paginationCopy = {
    ru: { label: 'Навигация по страницам статей', previous: 'Предыдущая страница', next: 'Следующая страница', page: 'Страница' },
    en: { label: 'Article page navigation', previous: 'Previous page', next: 'Next page', page: 'Page' },
    uz: { label: 'Maqolalar sahifalari bo‘yicha navigatsiya', previous: 'Oldingi sahifa', next: 'Keyingi sahifa', page: 'Sahifa' },
    tg: { label: 'Паймоиш дар саҳифаҳои мақолаҳо', previous: 'Саҳифаи қаблӣ', next: 'Саҳифаи навбатӣ', page: 'Саҳифа' },
    es: { label: 'Navegación por páginas de artículos', previous: 'Página anterior', next: 'Página siguiente', page: 'Página' },
    id: { label: 'Navigasi halaman artikel', previous: 'Halaman sebelumnya', next: 'Halaman berikutnya', page: 'Halaman' }
  };
  const paginationText = paginationCopy[lang] || paginationCopy.ru;
  const paginationStyle = document.createElement('style');
  paginationStyle.textContent = '.card-grid{scroll-margin-top:110px}.articles-pagination{display:flex;align-items:center;justify-content:center;gap:8px;margin:28px auto 0}.articles-pagination-top{position:relative;z-index:4;width:max-content;margin:0 auto 30px}.articles-pagination button{display:grid;place-items:center;width:42px;height:42px;padding:0;border:1px solid rgba(168,76,244,.5);border-radius:12px;background:rgba(168,76,244,.1);color:var(--text-primary,#fff);font-family:inherit;font-size:14px;font-weight:800;line-height:1;cursor:pointer;transition:transform .18s ease,border-color .18s ease,background .18s ease,box-shadow .18s ease}.articles-pagination button:hover{transform:translateY(-2px);border-color:var(--gold,#ffd700);background:rgba(255,215,0,.1)}.articles-pagination button[aria-current="page"]{border-color:var(--gold,#ffd700);background:linear-gradient(135deg,var(--gold,#ffd700),var(--gold-dim,#e4b900));color:#1a1330;box-shadow:0 8px 22px rgba(255,215,0,.22);cursor:default;transform:none}.articles-pagination .articles-page-arrow{font-size:20px}.articles-pagination button[hidden]{display:none}@media(max-width:480px){.articles-pagination{gap:6px}.articles-pagination-top{margin-bottom:24px}.articles-pagination button{width:38px;height:38px;border-radius:10px}}';
  document.head.append(paginationStyle);

  if (totalPages <= 1) {
    cards.forEach((card) => { card.hidden = false; });
    return;
  }

  const visibleNumberLimit = 9;
  const createPagination = (position) => {
    const pagination = document.createElement('nav');
    pagination.className = `articles-pagination articles-pagination-${position}`;
    pagination.setAttribute('aria-label', `${paginationText.label} — ${position}`);
    const previousButton = document.createElement('button');
    previousButton.type = 'button';
    previousButton.className = 'articles-page-arrow';
    previousButton.setAttribute('aria-label', paginationText.previous);
    previousButton.textContent = '←';
    pagination.append(previousButton);
    const pageButtons = [];
    for (let page = 1; page <= Math.min(totalPages, visibleNumberLimit); page += 1) {
      const pageButton = document.createElement('button');
      pageButton.type = 'button';
      pageButton.className = 'articles-page-number';
      pageButton.dataset.page = String(page);
      pageButton.setAttribute('aria-label', `${paginationText.page} ${page}`);
      pageButton.textContent = String(page);
      pageButtons.push(pageButton);
      pagination.append(pageButton);
    }
    const nextButton = document.createElement('button');
    nextButton.type = 'button';
    nextButton.className = 'articles-page-arrow';
    nextButton.setAttribute('aria-label', paginationText.next);
    nextButton.textContent = '→';
    pagination.append(nextButton);
    return { pagination, previousButton, pageButtons, nextButton };
  };
  const paginationControls = [createPagination('top'), createPagination('bottom')];
  grid.before(paginationControls[0].pagination);
  grid.parentElement.append(paginationControls[1].pagination);

  const pageFromUrl = Number.parseInt(new URL(location.href).searchParams.get('page') || '1', 10);
  let currentPage = Math.min(Math.max(Number.isFinite(pageFromUrl) ? pageFromUrl : 1, 1), totalPages);

  const updateUrl = (replace = false) => {
    try {
      const url = new URL(location.href);
      if (currentPage === 1) url.searchParams.delete('page');
      else url.searchParams.set('page', String(currentPage));
      history[replace ? 'replaceState' : 'pushState']({ articlesPage: currentPage }, '', url);
    } catch (_) {
      // Some local preview schemes do not support History API updates.
    }
  };

  const renderPage = ({ updateHistory = false, scroll = false } = {}) => {
    const firstVisibleIndex = (currentPage - 1) * articlesPerPage;
    const lastVisibleIndex = firstVisibleIndex + articlesPerPage;
    cards.forEach((card, index) => {
      const visible = index >= firstVisibleIndex && index < lastVisibleIndex;
      card.hidden = !visible;
      card.style.display = visible ? '' : 'none';
    });
    paginationControls.forEach(({ previousButton, pageButtons, nextButton }) => {
      pageButtons.forEach((button) => {
        const active = Number(button.dataset.page) === currentPage;
        if (active) button.setAttribute('aria-current', 'page');
        else button.removeAttribute('aria-current');
      });
      previousButton.hidden = currentPage === 1;
      previousButton.disabled = currentPage === 1;
      nextButton.hidden = currentPage === totalPages;
      nextButton.disabled = currentPage === totalPages;
    });
    if (updateHistory) updateUrl();
    if (scroll) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  paginationControls.forEach(({ previousButton, pageButtons, nextButton }) => {
    pageButtons.forEach((button) => button.addEventListener('click', () => {
      const requestedPage = Number(button.dataset.page);
      if (requestedPage === currentPage) return;
      currentPage = requestedPage;
      renderPage({ updateHistory: true, scroll: true });
    }));
    previousButton.addEventListener('click', () => {
      if (currentPage <= 1) return;
      currentPage -= 1;
      renderPage({ updateHistory: true, scroll: true });
    });
    nextButton.addEventListener('click', () => {
      if (currentPage >= totalPages) return;
      currentPage += 1;
      renderPage({ updateHistory: true, scroll: true });
    });
  });
  addEventListener('popstate', () => {
    const requestedPage = Number.parseInt(new URL(location.href).searchParams.get('page') || '1', 10);
    currentPage = Math.min(Math.max(Number.isFinite(requestedPage) ? requestedPage : 1, 1), totalPages);
    renderPage();
  });

  const requestedPage = Number.parseInt(new URL(location.href).searchParams.get('page') || '1', 10);
  renderPage();
  if (requestedPage !== currentPage) updateUrl(true);
})();
