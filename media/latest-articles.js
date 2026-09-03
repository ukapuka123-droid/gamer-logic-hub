(() => {
  const storyGrids = [...document.querySelectorAll('.story-grid')];
  const latestGrid = storyGrids.at(-1);
  if (!latestGrid || storyGrids.length < 2) return;

  const language = (document.documentElement.lang || 'ru').split('-')[0];
  if ((language === 'ru' || language === 'en') && !document.getElementById('featured-simulators')) {
    const simulatorSection = document.getElementById('simulators');
    if (simulatorSection) {
      const featured = document.createElement('section');
      featured.className = 'section wrap featured-tools';
      featured.id = 'featured-simulators';
      featured.innerHTML = `<div class="section-head"><div><span class="featured-badge">Новые интерактивные лаборатории</span><h2>Главные симуляторы</h2><p>Три углублённых инструмента для практического изучения RTP, стратегии и вероятностей.</p></div></div><div class="featured-sim-grid"><a class="featured-sim-card" href="simulator-slot-lab.html"><img src="media/slot-lab-card-hero.png" alt="Слот-машина и график распределения для лаборатории RTP"><div class="featured-sim-copy"><span>RTP и волатильность</span><h3>Slot RTP &amp; Volatility Lab</h3><p>До 100 000 спинов, фактический RTP, частота выплат и максимальная просадка.</p><b>Открыть лабораторию →</b></div></a><a class="featured-sim-card" href="simulator-blackjack-strategy.html"><img src="media/blackjack-strategy-card-hero.png" alt="Карты и компас решений тренажёра стратегии Blackjack"><div class="featured-sim-copy"><span>Обучение решениям</span><h3>Blackjack Strategy Trainer</h3><p>Практикуйте базовую стратегию и получайте объяснение каждого решения.</p><b>Начать тренировку →</b></div></a><a class="featured-sim-card" href="simulator-roulette-lab.html"><img src="media/roulette-lab-card-hero.png" alt="Рулетка и аналитические графики калькулятора вероятностей"><div class="featured-sim-copy"><span>Шансы и house edge</span><h3>Roulette Odds Calculator</h3><p>Сравните типы ставок, европейское и американское колесо на длинной серии.</p><b>Рассчитать вероятность →</b></div></a></div>`;
      if (language === 'en') {
        featured.innerHTML = `<div class="section-head"><div><span class="featured-badge">New interactive labs</span><h2>Featured simulators</h2><p>Three in-depth tools for exploring RTP, strategy and probability through practice.</p></div></div><div class="featured-sim-grid"><a class="featured-sim-card" href="simulator-slot-lab.html"><img src="../media/slot-lab-card-hero.png" alt="Slot machine and distribution chart for the RTP lab"><div class="featured-sim-copy"><span>RTP and volatility</span><h3>Slot RTP &amp; Volatility Lab</h3><p>Run up to 100,000 spins and inspect observed RTP, hit rate and maximum drawdown.</p><b>Open the lab →</b></div></a><a class="featured-sim-card" href="simulator-blackjack-strategy.html"><img src="../media/blackjack-strategy-card-hero.png" alt="Cards and decision compass for the Blackjack strategy trainer"><div class="featured-sim-copy"><span>Decision training</span><h3>Blackjack Strategy Trainer</h3><p>Practice basic strategy and get an explanation for every decision.</p><b>Start training →</b></div></a><a class="featured-sim-card" href="simulator-roulette-lab.html"><img src="../media/roulette-lab-card-hero.png" alt="Roulette wheel and analytical charts for the odds calculator"><div class="featured-sim-copy"><span>Odds and house edge</span><h3>Roulette Odds Calculator</h3><p>Compare bets and test European and American wheels over a large sample.</p><b>Calculate the odds →</b></div></a></div>`;
      }
      const featuredStyle = document.createElement('style');
      featuredStyle.textContent = '.featured-tools{padding-top:42px}.featured-badge{display:inline-flex;padding:7px 12px;margin-bottom:8px;border:1px solid rgba(32,232,117,.45);border-radius:999px;background:rgba(32,232,117,.08);color:#8bffc0;font-size:10px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}.featured-sim-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.featured-sim-card{position:relative;display:flex;min-width:0;min-height:360px;overflow:hidden;border:1px solid #62427e;border-radius:20px;background:#17102a;color:#fff;text-decoration:none;box-shadow:0 18px 42px rgba(0,0,0,.28);transition:transform .22s,border-color .22s,box-shadow .22s}.featured-sim-card:hover{transform:translateY(-5px);border-color:var(--purple);box-shadow:0 24px 48px rgba(92,35,151,.3)}.featured-sim-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .45s}.featured-sim-card:hover img{transform:scale(1.035)}.featured-sim-card:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,4,20,.02) 30%,rgba(11,6,24,.58) 60%,rgba(11,6,24,.98) 100%)}.featured-sim-copy{position:relative;z-index:1;display:flex;flex-direction:column;justify-content:flex-end;width:100%;padding:22px}.featured-sim-copy>span{align-self:flex-start;margin-bottom:auto;padding:5px 9px;border:1px solid rgba(255,255,255,.25);border-radius:999px;background:rgba(11,6,24,.68);color:#e8dcfa;font-size:9px;font-weight:900;letter-spacing:.1em;text-transform:uppercase;backdrop-filter:blur(8px)}.featured-sim-copy h3{margin:0;color:#fff;font-size:21px;line-height:1.18}.featured-sim-copy p{margin:7px 0 0;color:#d5c7e9;font-size:13px}.featured-sim-copy b{margin-top:12px;color:var(--yellow);font-size:13px}@media(max-width:820px){.featured-sim-grid{grid-template-columns:1fr 1fr}.featured-sim-card:last-child{grid-column:1/-1}}@media(max-width:560px){.featured-sim-grid{grid-template-columns:1fr}.featured-sim-card,.featured-sim-card:last-child{grid-column:auto;min-height:330px}}';
      document.head.append(featuredStyle);
      simulatorSection.before(featured);
    }
  }
  const statsCopy = {
    ru: { views: 'просмотров', likes: 'лайков' },
    en: { views: 'views', likes: 'likes' },
    uz: { views: 'ko‘rish', likes: 'layk' },
    tg: { views: 'тамошо', likes: 'лайк' },
    es: { views: 'vistas', likes: 'Me gusta' },
    id: { views: 'tayangan', likes: 'suka' }
  };
  const statsText = statsCopy[language] || statsCopy.ru;
  const statsStyle = document.createElement('style');
  statsStyle.textContent = '.latest-story-topline{display:flex;align-items:center;justify-content:space-between;gap:10px;min-height:29px;margin-bottom:8px}.latest-story-topline .story-kicker{min-width:0}.latest-story-stats{display:flex;flex:0 0 auto;gap:5px;pointer-events:none;user-select:none}.latest-story-stat{display:inline-flex;align-items:center;gap:4px;min-height:27px;padding:5px 8px;border:1px solid rgba(255,255,255,.13);border-radius:999px;background:rgba(12,7,25,.72);color:var(--muted,#bba9dc);font-size:9.5px;font-weight:700;line-height:1;white-space:nowrap}.latest-story-stat svg{width:13px;height:13px;flex:0 0 13px}.latest-story-stat strong{color:var(--text,#fff);font-variant-numeric:tabular-nums}@media(max-width:900px){.latest-story-stat>span{display:none}.latest-story-stat{padding:5px 7px}}@media(max-width:380px){.latest-story-topline{gap:6px}.latest-story-stats{gap:4px}.latest-story-stat{padding:4px 6px}}';
  document.head.append(statsStyle);

  const localLatestArticles = {
    ru: [
      { href: 'article-the-dog-house.html', title: 'The dog house - обзор на самый классический слот от Pragmatic!', description: 'Личный обзор 20 линий, Wild-будок с ×2 и ×3, бесплатных вращений и классического собачьего вайба.', linkText: 'Читать статью →', datetime: '2026-09-01', dateText: 'Опубликовано: 1 сентября 2026' },
      { href: 'article-sugar-rush-1000.html', title: 'Sugar rush 1000 - одна из легендарных игр от Pragmatic Play!', description: 'Личный обзор поля 7×7, каскадов, липких множителей, бесплатных вращений и конфетного безумия.', linkText: 'Читать статью →', datetime: '2026-08-31', dateText: 'Опубликовано: 31 августа 2026' },
      { href: 'article-zeus-vs-hades.html', title: 'Zeus vs hades - разбор слота от Pragmatic Play', description: 'Живой обзор Zeus vs Hades: режимы Olympus и Hades, RTP, обычные вращения, расширяющиеся Wild и бонусные игры.', linkText: 'Читать статью →', datetime: '2026-08-31', dateText: 'Опубликовано: 31 августа 2026' }
    ],
    en: [
      { href: 'article-the-dog-house.html', title: "The Dog House — a review of Pragmatic's most classic slot!", description: 'A hands-on look at 20 paylines, ×2 and ×3 kennel Wilds, free spins and proper old-school doggo chaos.', linkText: 'Read the article →', datetime: '2026-09-01', dateText: 'Published: September 1, 2026' },
      { href: 'article-sugar-rush-1000.html', title: 'Sugar Rush 1000 — one of Pragmatic Play’s legendary games!', description: 'A personal look at the 7×7 grid, tumbles, sticky multipliers, free spins, and candy-coated chaos.', linkText: 'Read the article →', datetime: '2026-08-31', dateText: 'Published: August 31, 2026' },
      { href: 'article-zeus-vs-hades.html', title: 'Zeus vs Hades — Pragmatic Play Slot Review', description: 'A lively Zeus vs Hades review covering Olympus and Hades volatility, RTP, expanding Wild multipliers and free spins.', linkText: 'Read article →', datetime: '2026-08-31', dateText: 'Published: August 31, 2026' }
    ],
    uz: [
      { href: 'article-the-dog-house.html', title: "The Dog House — Pragmatic'ning eng klassik sloti!", description: "20 liniya, ×2 va ×3 Wild uyalar, free spin'lar va eski maktab kuchuklar kayfiyati.", linkText: "Maqolani o'qish →", datetime: '2026-09-01', dateText: 'Nashr etilgan: 1-sentabr, 2026' },
      { href: 'article-sugar-rush-1000.html', title: 'Sugar Rush 1000 — Pragmatic Play’ning afsonaviy o‘yinlaridan biri!', description: '7×7 maydon, kaskadlar, yopishqoq ko‘paytirgichlar, bepul aylanishlar va shirin tartibsizlik haqida shaxsiy sharh.', linkText: 'Maqolani o‘qish →', datetime: '2026-08-31', dateText: 'Nashr etilgan: 31-avgust, 2026' },
      { href: 'article-zeus-vs-hades.html', title: 'Zeus vs Hades — Pragmatic Play sloti sharhi', description: 'Zeus vs Hades sharhi: Olympus va Hades volatiliteti, RTP, kengayuvchi Wild koʼpaytirgichlari va bepul spinlar.', linkText: 'Maqolani oʼqish →', datetime: '2026-08-31', dateText: 'Nashr etildi: 31-avgust, 2026' }
    ],
    tg: [
      { href: 'article-the-dog-house.html', title: 'The Dog House — слоти аз ҳама классикии Pragmatic!', description: '20 хат, хоначаҳои Wild бо ×2 ва ×3, free spin ва кайфияти сагҳои кӯҳна.', linkText: 'Хондани мақола →', datetime: '2026-09-01', dateText: 'Нашр шуд: 1 сентябри 2026' },
      { href: 'article-sugar-rush-1000.html', title: 'Sugar Rush 1000 — яке аз бозиҳои афсонавии Pragmatic Play!', description: 'Шарҳи шахсии майдони 7×7, каскадҳо, зарбкунандаҳои часпанда, чархҳои ройгон ва бесарусомонии ширин.', linkText: 'Мақоларо хондан →', datetime: '2026-08-31', dateText: 'Нашр шуд: 31 августи 2026' },
      { href: 'article-zeus-vs-hades.html', title: 'Zeus vs Hades — шарҳи слоти Pragmatic Play', description: 'Шарҳи Zeus vs Hades: Olympus ва Hades, RTP, Wild-ҳои васеъшаванда ва фриспинҳо.', linkText: 'Хондани мақола →', datetime: '2026-08-31', dateText: 'Нашр шуд: 31 августи 2026' }
    ],
    es: [
      { href: 'article-the-dog-house.html', title: 'The Dog House: ¡el slot más clásico de Pragmatic!', description: '20 líneas, casitas Wild con ×2 y ×3, giros gratis y una banda de perros con mucha onda.', linkText: 'Leer el artículo →', datetime: '2026-09-01', dateText: 'Publicado: 1 de septiembre de 2026' },
      { href: 'article-sugar-rush-1000.html', title: 'Sugar Rush 1000: ¡uno de los juegos legendarios de Pragmatic Play!', description: 'Una mirada personal a la cuadrícula 7×7, cascadas, multiplicadores pegajosos, giros gratis y caos azucarado.', linkText: 'Leer el artículo →', datetime: '2026-08-31', dateText: 'Publicado: 31 de agosto de 2026' },
      { href: 'article-zeus-vs-hades.html', title: 'Zeus vs Hades — reseña del slot de Pragmatic Play', description: 'Reseña de Zeus vs Hades: Olympus, Hades, RTP, Wild expansivos y tiradas gratis.', linkText: 'Leer artículo →', datetime: '2026-08-31', dateText: 'Publicado: 31 de agosto de 2026' }
    ],
    id: [
      { href: 'article-the-dog-house.html', title: 'The Dog House — slot Pragmatic paling klasik!', description: 'Ulasan 20 payline, Wild rumah anjing ×2 dan ×3, free spins, dan kekacauan doggo jadul.', linkText: 'Baca artikel →', datetime: '2026-09-01', dateText: 'Diterbitkan: 1 September 2026' },
      { href: 'article-sugar-rush-1000.html', title: 'Sugar Rush 1000 — salah satu game legendaris Pragmatic Play!', description: 'Ulasan pribadi tentang grid 7×7, tumble, pengali lengket, free spin, dan kekacauan penuh permen.', linkText: 'Baca artikel →', datetime: '2026-08-31', dateText: 'Diterbitkan: 31 Agustus 2026' },
      { href: 'article-zeus-vs-hades.html', title: 'Zeus vs Hades — Ulasan Slot Pragmatic Play', description: 'Ulasan Zeus vs Hades: mode Olympus dan Hades, RTP, Wild melebar, dan free spin.', linkText: 'Baca artikel →', datetime: '2026-08-31', dateText: 'Terbit: 31 Agustus 2026' }
    ]
  };

  const attachStats = (cards) => {
    const trackedCards = cards.map((card) => {
      const articleMatch = new URL(card.href, location.href).pathname.match(/\/article-([a-z0-9-]+)\.html$/i);
      const kicker = card.querySelector('.story-kicker');
      if (!articleMatch || !kicker || card.querySelector('.latest-story-stats')) return null;

      const stats = document.createElement('span');
      stats.className = 'latest-story-stats';
      stats.setAttribute('aria-label', `${statsText.views} / ${statsText.likes}`);
      stats.innerHTML = `<span class="latest-story-stat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.6"/></svg><strong data-latest-views>0</strong><span>${statsText.views}</span></span><span class="latest-story-stat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M20.8 4.7a5.4 5.4 0 0 0-7.7 0L12 5.8l-1.1-1.1a5.4 5.4 0 0 0-7.7 7.7L12 21l8.8-8.6a5.4 5.4 0 0 0 0-7.7Z"/></svg><strong data-latest-likes>0</strong><span>${statsText.likes}</span></span>`;

      const topLine = document.createElement('div');
      topLine.className = 'latest-story-topline';
      kicker.before(topLine);
      topLine.append(kicker, stats);
      return { articleId: articleMatch[1].toLowerCase(), stats };
    }).filter(Boolean);

    const articleIds = [...new Set(trackedCards.map(({ articleId }) => articleId))];
    if (!articleIds.length) return;

    fetch(`https://gamer-logic-stats.ukapuka123.workers.dev/stats?articles=${encodeURIComponent(articleIds.join(','))}`)
      .then((response) => {
        if (!response.ok) throw new Error(`Stats API ${response.status}`);
        return response.json();
      })
      .then(({ stats = {} }) => {
        trackedCards.forEach(({ articleId, stats: element }) => {
          const values = stats[articleId] || { views: 0, likes: 0 };
          element.querySelector('[data-latest-views]').textContent = new Intl.NumberFormat(language).format(Number(values.views) || 0);
          element.querySelector('[data-latest-likes]').textContent = new Intl.NumberFormat(language).format(Number(values.likes) || 0);
        });
      })
      .catch(() => {});
  };

  const renderArticles = (articles) => {
    const fragment = document.createDocumentFragment();
    articles.forEach((article) => {
      const card = document.createElement('a');
      card.className = 'story-card';
      card.href = article.href;

      const kicker = document.createElement('span');
      kicker.className = 'story-kicker';
      kicker.textContent = 'Gamer Logic Hub';

      const title = document.createElement('h3');
      title.textContent = article.title;

      const description = document.createElement('p');
      description.textContent = article.description;

      const link = document.createElement('span');
      link.className = 'story-link';
      link.textContent = article.linkText || '→';

      const date = document.createElement('time');
      date.dateTime = article.datetime;
      date.textContent = article.dateText;

      card.append(kicker, title, description, link, date);
      fragment.append(card);
    });

    latestGrid.replaceChildren(fragment);
    attachStats([...latestGrid.querySelectorAll('.story-card')]);
  };

  const loadLatestArticles = async () => {
    const response = await fetch(new URL('articles.html', location.href), { cache: 'no-store' });
    if (!response.ok) throw new Error(`Articles catalog ${response.status}`);

    const catalog = new DOMParser().parseFromString(await response.text(), 'text/html');
    const articles = [...catalog.querySelectorAll('.card-grid > .card')]
      .map((card, index) => {
        const time = card.querySelector('.card-date');
        return {
          index,
          href: card.getAttribute('href'),
          title: card.querySelector('h3')?.textContent.trim(),
          description: card.querySelector('p')?.textContent.trim(),
          linkText: card.querySelector('.read-more')?.textContent.trim(),
          dateText: time?.textContent.trim(),
          datetime: time?.getAttribute('datetime') || ''
        };
      })
      .filter((article) => article.href && article.title && article.description && article.datetime)
      .sort((first, second) => {
        const dateDifference = Date.parse(second.datetime) - Date.parse(first.datetime);
        return dateDifference || first.index - second.index;
      })
      .slice(0, 3);

    if (!articles.length) return;

    renderArticles(articles);
  };

  loadLatestArticles().catch(() => {
    renderArticles(localLatestArticles[language] || localLatestArticles.ru);
  });
})();
