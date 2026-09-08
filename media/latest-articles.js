(() => {
  const storyGrids = [...document.querySelectorAll('.story-grid')];
  const latestGrid = storyGrids.at(-1);
  if (!latestGrid || storyGrids.length < 2) return;

  const language = (document.documentElement.lang || 'ru').split('-')[0];
  const featuredCopy = {
    ru: {
      badge: 'Новые интерактивные лаборатории', title: 'Главные симуляторы', description: 'Четыре углублённых инструмента для практического изучения RTP, стратегии и вероятностей.',
      cards: [
        ['RTP и волатильность', 'Slot RTP & Volatility Lab', 'До 100 000 спинов, фактический RTP, частота выплат и максимальная просадка.', 'Открыть лабораторию →', 'slot-lab-card-hero.webp', 'Слот-машина и график распределения для лаборатории RTP', 'simulator-slot-lab.html'],
        ['Обучение решениям', 'Blackjack Strategy Trainer', 'Практикуйте базовую стратегию и получайте объяснение каждого решения.', 'Начать тренировку →', 'blackjack-strategy-card-hero.webp', 'Карты и компас решений тренажёра стратегии Blackjack', 'simulator-blackjack-strategy.html'],
        ['Шансы и house edge', 'Roulette Odds Calculator', 'Сравните типы ставок, европейское и американское колесо на длинной серии.', 'Рассчитать вероятность →', 'roulette-lab-card-hero.webp', 'Рулетка и аналитические графики калькулятора вероятностей', 'simulator-roulette-lab.html'],
        ['RTP и матожидание', 'Калькулятор RTP и Bonus Buy', 'Рассчитайте фактический RTP, среднюю выплату и математическое ожидание покупки бонуса.', 'Открыть калькулятор →', 'rtp-calculator-card.svg?v=20260907-2', 'Калькулятор с показателем RTP 96 процентов и результатами матожидания', 'calculator-rtp.html']
      ]
    },
    en: {
      badge: 'New interactive labs', title: 'Featured simulators', description: 'Four in-depth tools for exploring RTP, strategy and probability through practice.',
      cards: [
        ['RTP and volatility', 'Slot RTP & Volatility Lab', 'Run up to 100,000 spins and inspect observed RTP, hit rate and maximum drawdown.', 'Open the lab →', 'slot-lab-card-hero.webp', 'Slot machine and distribution chart for the RTP lab', 'simulator-slot-lab.html'],
        ['Decision training', 'Blackjack Strategy Trainer', 'Practice basic strategy and get an explanation for every decision.', 'Start training →', 'blackjack-strategy-card-hero.webp', 'Cards and decision compass for the Blackjack strategy trainer', 'simulator-blackjack-strategy.html'],
        ['Odds and house edge', 'Roulette Odds Calculator', 'Compare bets and test European and American wheels over a large sample.', 'Calculate the odds →', 'roulette-lab-card-hero.webp', 'Roulette wheel and analytical charts for the odds calculator', 'simulator-roulette-lab.html'],
        ['RTP and expected value', 'RTP & Bonus Buy Calculator', 'Calculate observed RTP, average payout, and the expected value of a bonus purchase.', 'Open the calculator →', 'rtp-calculator-card.svg?v=20260907-2', 'Calculator showing 96 percent RTP and expected value results', 'calculator-rtp.html']
      ]
    },
    uz: {
      badge: 'Yangi interaktiv laboratoriyalar', title: 'Asosiy simulyatorlar', description: 'RTP, strategiya va ehtimollikni amalda tushunish uchun to‘rtta batafsil vosita.',
      cards: [
        ['RTP va volatillik', 'Slot RTP va volatillik laboratoriyasi', '100 000 tagacha spin qiling, haqiqiy RTP, yutuq chastotasi va maksimal pasayishni kuzating.', 'Laboratoriyani ochish →', 'slot-lab-card-hero.webp', 'RTP laboratoriyasi uchun slot va taqsimot grafigi', 'simulator-slot-lab.html'],
        ['Qarorlarni mashq qilish', 'Blackjack strategiya trenajyori', 'Asosiy strategiyani mashq qiling va har bir qaror bo‘yicha sodda izoh oling.', 'Mashqni boshlash →', 'blackjack-strategy-card-hero.webp', 'Blackjack strategiya trenajyori kartalari', 'simulator-blackjack-strategy.html'],
        ['Ehtimollik va house edge', 'Ruletka ehtimollari kalkulyatori', 'Tikish turlarini solishtiring va Yevropa hamda Amerika g‘ildiraklarini katta seriyada sinang.', 'Ehtimollikni hisoblash →', 'roulette-lab-card-hero.webp', 'Ehtimollik kalkulyatori uchun ruletka va grafiklar', 'simulator-roulette-lab.html'],
        ['RTP va matematik kutilma', 'RTP va Bonus Buy kalkulyatori', 'Amaldagi RTP, o‘rtacha to‘lov va bonus xaridining matematik kutilmasini hisoblang.', 'Kalkulyatorni ochish →', 'rtp-calculator-card.svg?v=20260907-2', 'RTP 96 foiz va matematik kutilma natijalarini ko‘rsatuvchi kalkulyator', 'calculator-rtp.html']
      ]
    },
    tg: {
      badge: 'Лабораторияҳои нави интерактивӣ', title: 'Симуляторҳои асосӣ', description: 'Чор воситаи муфассал барои омӯзиши амалии RTP, стратегия ва эҳтимолият.',
      cards: [
        ['RTP ва волатилнокӣ', 'Лабораторияи RTP ва волатилнокии слот', 'То 100 000 спин гузаронед ва RTP-и воқеӣ, басомади бурд ва пастшавии калонтаринро бинед.', 'Кушодани лаборатория →', 'slot-lab-card-hero.webp', 'Слот ва графики тақсимот барои лабораторияи RTP', 'simulator-slot-lab.html'],
        ['Машқи қарорҳо', 'Тренажёри стратегияи Blackjack', 'Стратегияи асосиро машқ кунед ва барои ҳар қарор шарҳи фаҳмо гиред.', 'Оғози машқ →', 'blackjack-strategy-card-hero.webp', 'Кортҳои тренажёри стратегияи Blackjack', 'simulator-blackjack-strategy.html'],
        ['Эҳтимолият ва house edge', 'Ҳисобкунаки эҳтимолияти рулетка', 'Навъҳои шартро муқоиса карда, чархи аврупоӣ ва амрикоиро дар силсилаи калон санҷед.', 'Ҳисоб кардани эҳтимолият →', 'roulette-lab-card-hero.webp', 'Рулетка ва графикҳои ҳисобкунаки эҳтимолият', 'simulator-roulette-lab.html'],
        ['RTP ва интизории математикӣ', 'Калкулятори RTP ва Bonus Buy', 'RTP-и воқеӣ, пардохти миёна ва интизории хариди бонусро ҳисоб кунед.', 'Кушодани калкулятор →', 'rtp-calculator-card.svg?v=20260907-2', 'Калкулятор бо RTP 96 фоиз ва натиҷаҳои интизории математикӣ', 'calculator-rtp.html']
      ]
    },
    es: {
      badge: 'Nuevos laboratorios interactivos', title: 'Simuladores principales', description: 'Cuatro herramientas completas para entender RTP, estrategia y probabilidades metiendo mano, sin vueltas.',
      cards: [
        ['RTP y volatilidad', 'Laboratorio de RTP y volatilidad', 'Probá hasta 100.000 tiradas y mirá el RTP real, la frecuencia de premios y la caída máxima.', 'Abrir el laboratorio →', 'slot-lab-card-hero.webp', 'Tragamonedas y gráfico de distribución del laboratorio de RTP', 'simulator-slot-lab.html'],
        ['Práctica de decisiones', 'Entrenador de estrategia de Blackjack', 'Practicá la estrategia básica y recibí una explicación clara para cada decisión.', 'Empezar a practicar →', 'blackjack-strategy-card-hero.webp', 'Cartas del entrenador de estrategia de Blackjack', 'simulator-blackjack-strategy.html'],
        ['Chances y ventaja de la casa', 'Calculadora de probabilidades de ruleta', 'Compará apuestas y probá ruedas europea y americana en una tanda larga.', 'Calcular probabilidades →', 'roulette-lab-card-hero.webp', 'Ruleta y gráficos de la calculadora de probabilidades', 'simulator-roulette-lab.html'],
        ['RTP y valor esperado', 'Calculadora de RTP y Bonus Buy', 'Calculá el RTP observado, el pago promedio y el valor esperado de una compra de bonus.', 'Abrir la calculadora →', 'rtp-calculator-card.svg?v=20260907-2', 'Calculadora con RTP de 96 por ciento y resultados de valor esperado', 'calculator-rtp.html']
      ]
    },
    id: {
      badge: 'Laboratorium interaktif terbaru', title: 'Simulator utama', description: 'Empat alat lengkap buat membedah RTP, strategi, dan probabilitas lewat praktik langsung.',
      cards: [
        ['RTP dan volatilitas', 'Lab RTP & volatilitas slot', 'Jalankan sampai 100.000 spin lalu cek RTP aktual, hit rate, dan penurunan saldo maksimum.', 'Buka lab →', 'slot-lab-card-hero.webp', 'Mesin slot dan grafik distribusi untuk lab RTP', 'simulator-slot-lab.html'],
        ['Latihan keputusan', 'Pelatih strategi Blackjack', 'Latih strategi dasar dan dapatkan penjelasan yang gampang dipahami untuk setiap keputusan.', 'Mulai latihan →', 'blackjack-strategy-card-hero.webp', 'Kartu untuk pelatih strategi Blackjack', 'simulator-blackjack-strategy.html'],
        ['Peluang dan house edge', 'Kalkulator peluang Roulette', 'Bandingkan jenis taruhan dan tes roda Eropa serta Amerika dalam seri panjang.', 'Hitung peluang →', 'roulette-lab-card-hero.webp', 'Roda roulette dan grafik kalkulator peluang', 'simulator-roulette-lab.html'],
        ['RTP dan expected value', 'Kalkulator RTP & Bonus Buy', 'Hitung RTP aktual, pembayaran rata-rata, dan expected value pembelian bonus.', 'Buka kalkulator →', 'rtp-calculator-card.svg?v=20260907-2', 'Kalkulator dengan RTP 96 persen dan hasil expected value', 'calculator-rtp.html']
      ]
    }
  };
  if (featuredCopy[language] && !document.getElementById('featured-simulators')) {
    const simulatorSection = document.getElementById('simulators');
    if (simulatorSection) {
      const featured = document.createElement('section');
      featured.className = 'section wrap featured-tools';
      featured.id = 'featured-simulators';
      const copy = featuredCopy[language];
      const mediaPrefix = language === 'ru' ? 'media/' : '../media/';
      featured.innerHTML = `<div class="section-head"><div><span class="featured-badge">${copy.badge}</span><h2>${copy.title}</h2><p>${copy.description}</p></div></div><div class="featured-sim-grid">${copy.cards.map(([tag, title, description, action, image, alt, href]) => `<a class="featured-sim-card" href="${href}"><img src="${mediaPrefix}${image}" alt="${alt}"><div class="featured-sim-copy"><span>${tag}</span><h3>${title}</h3><p>${description}</p><b>${action}</b></div></a>`).join('')}</div>`;
      const featuredStyle = document.createElement('style');
      featuredStyle.textContent = '.featured-tools{padding-top:42px}.featured-badge{display:inline-flex;padding:7px 12px;margin-bottom:8px;border:1px solid rgba(32,232,117,.45);border-radius:999px;background:rgba(32,232,117,.08);color:#8bffc0;font-size:10px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}.featured-sim-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.featured-sim-card{position:relative;display:flex;min-width:0;min-height:360px;overflow:hidden;border:1px solid #62427e;border-radius:20px;background:#17102a;color:#fff;text-decoration:none;box-shadow:0 18px 42px rgba(0,0,0,.28);transition:transform .22s,border-color .22s,box-shadow .22s}.featured-sim-card:hover{transform:translateY(-5px);border-color:var(--purple);box-shadow:0 24px 48px rgba(92,35,151,.3)}.featured-sim-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .45s}.featured-sim-card:hover img{transform:scale(1.035)}.featured-sim-card:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,4,20,.02) 30%,rgba(11,6,24,.58) 60%,rgba(11,6,24,.98) 100%)}.featured-sim-copy{position:relative;z-index:1;display:flex;flex-direction:column;justify-content:flex-end;width:100%;padding:22px}.featured-sim-copy>span{align-self:flex-start;margin-bottom:auto;padding:5px 9px;border:1px solid rgba(255,255,255,.25);border-radius:999px;background:rgba(11,6,24,.68);color:#e8dcfa;font-size:9px;font-weight:900;letter-spacing:.1em;text-transform:uppercase;backdrop-filter:blur(8px)}.featured-sim-copy h3{margin:0;color:#fff;font-size:21px;line-height:1.18}.featured-sim-copy p{margin:7px 0 0;color:#d5c7e9;font-size:13px}.featured-sim-copy b{margin-top:12px;color:var(--yellow);font-size:13px}@media(max-width:820px){.featured-sim-grid{grid-template-columns:1fr 1fr}.featured-sim-card:last-child{grid-column:1/-1}}@media(max-width:560px){.featured-sim-grid{grid-template-columns:1fr}.featured-sim-card,.featured-sim-card:last-child{grid-column:auto;min-height:330px}}';
      document.head.append(featuredStyle);
      const featuredGridStyle = document.createElement('style');
      featuredGridStyle.textContent = '.featured-sim-grid{grid-template-columns:repeat(4,minmax(0,1fr))}.featured-sim-card{min-height:340px}.featured-sim-copy{padding:18px}.featured-sim-copy h3{font-size:19px}@media(max-width:1020px){.featured-sim-grid{grid-template-columns:1fr 1fr}.featured-sim-card:last-child{grid-column:auto}}@media(max-width:560px){.featured-sim-grid{grid-template-columns:1fr}.featured-sim-card{min-height:330px}}';
      document.head.append(featuredGridStyle);
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
  statsStyle.textContent = '.latest-story-topline{display:flex;align-items:center;justify-content:space-between;gap:10px;min-height:29px;margin-bottom:8px}.latest-story-topline .story-kicker{min-width:max-content;white-space:nowrap}.latest-story-stats{display:flex;flex:0 0 auto;gap:5px;pointer-events:none;user-select:none}.latest-story-stat{display:inline-flex;align-items:center;gap:4px;min-height:27px;padding:5px 8px;border:1px solid rgba(255,255,255,.13);border-radius:999px;background:rgba(12,7,25,.72);color:var(--muted,#bba9dc);font-size:9.5px;font-weight:700;line-height:1;white-space:nowrap}.latest-story-stat svg{width:13px;height:13px;flex:0 0 13px}.latest-story-stat strong{color:var(--text,#fff);font-variant-numeric:tabular-nums}.fair-story-card .latest-story-topline,.rtp-story-card .latest-story-topline{margin-right:-130px}@media(max-width:900px){.latest-story-stat>span{display:none}.latest-story-stat{padding:5px 7px}.fair-story-card .latest-story-topline,.rtp-story-card .latest-story-topline{margin-right:-120px}}@media(max-width:560px){.fair-story-card .latest-story-topline,.rtp-story-card .latest-story-topline{margin-right:-94px}}@media(max-width:380px){.latest-story-topline{gap:6px}.latest-story-stats{gap:4px}.latest-story-stat{padding:4px 6px}}';
  document.head.append(statsStyle);

  const rtpCardStyle = document.createElement('style');
  rtpCardStyle.textContent = '.story-card.rtp-story-card{position:relative;isolation:isolate;overflow:hidden;padding-right:142px}.rtp-story-card>*:not(.rtp-story-art){position:relative;z-index:2}.rtp-story-art{position:absolute;z-index:1;right:-22px;bottom:-5px;width:165px;height:150px;object-fit:contain;object-position:center bottom;filter:drop-shadow(0 11px 14px rgba(0,0,0,.38));pointer-events:none}.rtp-story-card:after{content:"";position:absolute;z-index:0;right:-30px;bottom:-44px;width:210px;height:210px;border-radius:50%;background:radial-gradient(circle,rgba(76,190,210,.18),transparent 68%);pointer-events:none}@media(max-width:560px){.story-card.rtp-story-card{padding-right:112px}.rtp-story-art{right:-28px;width:140px;height:130px}}';
  document.head.append(rtpCardStyle);

  const fairCardStyle = document.createElement('style');
  fairCardStyle.textContent = '.story-card.fair-story-card{position:relative;isolation:isolate;overflow:hidden;padding-right:148px;border-color:rgba(80,176,255,.34)}.fair-story-card>*:not(.fair-story-art){position:relative;z-index:2}.fair-story-art{position:absolute;z-index:1;right:-28px;bottom:8px;width:185px;height:145px;object-fit:contain;filter:drop-shadow(0 11px 14px rgba(0,0,0,.38));pointer-events:none}.fair-story-card:after{content:"";position:absolute;z-index:0;right:-38px;bottom:-52px;width:220px;height:220px;border-radius:50%;background:radial-gradient(circle,rgba(44,156,255,.2),transparent 68%);pointer-events:none}@media(max-width:560px){.story-card.fair-story-card{padding-right:116px}.fair-story-art{right:-34px;width:155px;height:125px}}';
  document.head.append(fairCardStyle);

  const rtpImageAlt = {
    ru: 'Шкала RTP от низкого к высокому значению',
    en: 'RTP gauge ranging from low to high return',
    uz: "Pastdan yuqorigacha bo'lgan RTP ko'rsatkichi",
    tg: 'Нишондиҳандаи RTP аз сатҳи паст то баланд',
    es: 'Medidor de RTP desde retorno bajo hasta alto',
    id: 'Pengukur RTP dari tingkat pengembalian rendah hingga tinggi'
  };

  const fairImageAlt = {
    ru: 'Синий игровой контроллер — символ проверяемой механики',
    en: 'Blue game controller representing verifiable game mechanics',
    uz: "Tekshiriladigan o'yin mexanikasi ramzi bo'lgan ko'k kontroller",
    tg: 'Контроллери кабуд — рамзи механикаи санҷидашаванда',
    es: 'Control azul como símbolo de una mecánica verificable',
    id: 'Kontroler biru sebagai simbol mekanik game yang dapat diverifikasi'
  };

  const provablyLatest = {
    ru: { href: 'article-provably-fair-rng.html', title: 'Provably Fair и RNG: как проверить честность онлайн-игры', description: 'Server seed, client seed, nonce и SHA-256 без криптотумана — разбираемся, можно ли проверить занос, слив и любой конкретный раунд.', linkText: 'Читать статью →', datetime: '2026-09-05', dateText: 'Опубликовано: 5 сентября 2026' },
    en: { href: 'article-provably-fair-rng.html', title: 'Provably Fair and RNG: how to verify a game result', description: 'Server seed, client seed, nonce, and SHA-256 without the crypto fog—learn what a verifier really proves.', linkText: 'Read the article →', datetime: '2026-09-05', dateText: 'Published: September 5, 2026' },
    uz: { href: 'article-provably-fair-rng.html', title: "Provably Fair va RNG: o'yin natijasini tekshirish", description: 'Server seed, client seed, nonce va SHA-256 sodda tilda — verifier nimani isbotlashini bilib oling.', linkText: "Maqolani o'qish →", datetime: '2026-09-05', dateText: 'Nashr etilgan: 5-sentabr, 2026' },
    tg: { href: 'article-provably-fair-rng.html', title: 'Provably Fair ва RNG: санҷиши натиҷаи бозӣ', description: 'Server seed, client seed, nonce ва SHA-256 бо забони сода — verifier чиро исбот мекунад?', linkText: 'Хондани мақола →', datetime: '2026-09-05', dateText: 'Нашр шуд: 5 сентябри 2026' },
    es: { href: 'article-provably-fair-rng.html', title: 'Provably Fair y RNG: cómo verificar un resultado', description: 'Server seed, client seed, nonce y SHA-256 sin humo cripto: qué demuestra realmente el verifier.', linkText: 'Leer el artículo →', datetime: '2026-09-05', dateText: 'Publicado: 5 de septiembre de 2026' },
    id: { href: 'article-provably-fair-rng.html', title: 'Provably Fair dan RNG: cara cek hasil game', description: 'Server seed, client seed, nonce, dan SHA-256 tanpa jargon ribet—apa yang verifier buktikan?', linkText: 'Baca artikel →', datetime: '2026-09-05', dateText: 'Diterbitkan: 5 September 2026' }
  };

  const localLatestArticles = {
    ru: [
      { href: 'article-rtp-slots.html', title: 'RTP в слотах: что это и почему 96% не возвращаются сразу', description: 'Формула RTP, реальные отклонения короткой сессии, популярные мифы и наглядный эксперимент.', linkText: 'Читать статью →', datetime: '2026-09-04', dateText: 'Опубликовано: 4 сентября 2026' },
      { href: 'article-the-dog-house.html', title: 'The dog house - обзор на самый классический слот от Pragmatic!', description: 'Личный обзор 20 линий, Wild-будок с ×2 и ×3, бесплатных вращений и классического собачьего вайба.', linkText: 'Читать статью →', datetime: '2026-09-01', dateText: 'Опубликовано: 1 сентября 2026' },
      { href: 'article-sugar-rush-1000.html', title: 'Sugar rush 1000 - одна из легендарных игр от Pragmatic Play!', description: 'Личный обзор поля 7×7, каскадов, липких множителей, бесплатных вращений и конфетного безумия.', linkText: 'Читать статью →', datetime: '2026-08-31', dateText: 'Опубликовано: 31 августа 2026' },
      { href: 'article-zeus-vs-hades.html', title: 'Zeus vs hades - разбор слота от Pragmatic Play', description: 'Живой обзор Zeus vs Hades: режимы Olympus и Hades, RTP, обычные вращения, расширяющиеся Wild и бонусные игры.', linkText: 'Читать статью →', datetime: '2026-08-31', dateText: 'Опубликовано: 31 августа 2026' }
    ],
    en: [
      { href: 'article-rtp-slots.html', title: 'Slot RTP explained: why 96% does not come back right away', description: 'RTP formula, real short-run swings, common myths, and a visual experiment with virtual spins.', linkText: 'Read the article →', datetime: '2026-09-04', dateText: 'Published: September 4, 2026' },
      { href: 'article-the-dog-house.html', title: "The Dog House — a review of Pragmatic's most classic slot!", description: 'A hands-on look at 20 paylines, ×2 and ×3 kennel Wilds, free spins and proper old-school doggo chaos.', linkText: 'Read the article →', datetime: '2026-09-01', dateText: 'Published: September 1, 2026' },
      { href: 'article-sugar-rush-1000.html', title: 'Sugar Rush 1000 — one of Pragmatic Play’s legendary games!', description: 'A personal look at the 7×7 grid, tumbles, sticky multipliers, free spins, and candy-coated chaos.', linkText: 'Read the article →', datetime: '2026-08-31', dateText: 'Published: August 31, 2026' },
      { href: 'article-zeus-vs-hades.html', title: 'Zeus vs Hades — Pragmatic Play Slot Review', description: 'A lively Zeus vs Hades review covering Olympus and Hades volatility, RTP, expanding Wild multipliers and free spins.', linkText: 'Read article →', datetime: '2026-08-31', dateText: 'Published: August 31, 2026' }
    ],
    uz: [
      { href: 'article-rtp-slots.html', title: "Slotlarda RTP: nega 96% darhol qaytmaydi", description: "RTP formulasi, qisqa sessiyadagi haqiqiy og'ishlar, mashhur afsonalar va virtual spinlar tajribasi.", linkText: "Maqolani o'qish →", datetime: '2026-09-04', dateText: 'Nashr etilgan: 4-sentabr, 2026' },
      { href: 'article-the-dog-house.html', title: "The Dog House — Pragmatic'ning eng klassik sloti!", description: "20 liniya, ×2 va ×3 Wild uyalar, free spin'lar va eski maktab kuchuklar kayfiyati.", linkText: "Maqolani o'qish →", datetime: '2026-09-01', dateText: 'Nashr etilgan: 1-sentabr, 2026' },
      { href: 'article-sugar-rush-1000.html', title: 'Sugar Rush 1000 — Pragmatic Play’ning afsonaviy o‘yinlaridan biri!', description: '7×7 maydon, kaskadlar, yopishqoq ko‘paytirgichlar, bepul aylanishlar va shirin tartibsizlik haqida shaxsiy sharh.', linkText: 'Maqolani o‘qish →', datetime: '2026-08-31', dateText: 'Nashr etilgan: 31-avgust, 2026' },
      { href: 'article-zeus-vs-hades.html', title: 'Zeus vs Hades — Pragmatic Play sloti sharhi', description: 'Zeus vs Hades sharhi: Olympus va Hades volatiliteti, RTP, kengayuvchi Wild koʼpaytirgichlari va bepul spinlar.', linkText: 'Maqolani oʼqish →', datetime: '2026-08-31', dateText: 'Nashr etildi: 31-avgust, 2026' }
    ],
    tg: [
      { href: 'article-rtp-slots.html', title: 'RTP дар слотҳо: чаро 96% фавран барнамегардад', description: 'Формулаи RTP, фарқияти натиҷаҳои кӯтоҳ, афсонаҳои маъмул ва таҷриба бо спинҳои виртуалӣ.', linkText: 'Хондани мақола →', datetime: '2026-09-04', dateText: 'Нашр шуд: 4 сентябри 2026' },
      { href: 'article-the-dog-house.html', title: 'The Dog House — слоти аз ҳама классикии Pragmatic!', description: '20 хат, хоначаҳои Wild бо ×2 ва ×3, free spin ва кайфияти сагҳои кӯҳна.', linkText: 'Хондани мақола →', datetime: '2026-09-01', dateText: 'Нашр шуд: 1 сентябри 2026' },
      { href: 'article-sugar-rush-1000.html', title: 'Sugar Rush 1000 — яке аз бозиҳои афсонавии Pragmatic Play!', description: 'Шарҳи шахсии майдони 7×7, каскадҳо, зарбкунандаҳои часпанда, чархҳои ройгон ва бесарусомонии ширин.', linkText: 'Мақоларо хондан →', datetime: '2026-08-31', dateText: 'Нашр шуд: 31 августи 2026' },
      { href: 'article-zeus-vs-hades.html', title: 'Zeus vs Hades — шарҳи слоти Pragmatic Play', description: 'Шарҳи Zeus vs Hades: Olympus ва Hades, RTP, Wild-ҳои васеъшаванда ва фриспинҳо.', linkText: 'Хондани мақола →', datetime: '2026-08-31', dateText: 'Нашр шуд: 31 августи 2026' }
    ],
    es: [
      { href: 'article-rtp-slots.html', title: 'RTP en slots: por qué el 96% no vuelve enseguida', description: 'La fórmula del RTP, los vaivenes de una sesión corta, mitos comunes y un experimento con tiradas virtuales.', linkText: 'Leer el artículo →', datetime: '2026-09-04', dateText: 'Publicado: 4 de septiembre de 2026' },
      { href: 'article-the-dog-house.html', title: 'The Dog House: ¡el slot más clásico de Pragmatic!', description: '20 líneas, casitas Wild con ×2 y ×3, giros gratis y una banda de perros con mucha onda.', linkText: 'Leer el artículo →', datetime: '2026-09-01', dateText: 'Publicado: 1 de septiembre de 2026' },
      { href: 'article-sugar-rush-1000.html', title: 'Sugar Rush 1000: ¡uno de los juegos legendarios de Pragmatic Play!', description: 'Una mirada personal a la cuadrícula 7×7, cascadas, multiplicadores pegajosos, giros gratis y caos azucarado.', linkText: 'Leer el artículo →', datetime: '2026-08-31', dateText: 'Publicado: 31 de agosto de 2026' },
      { href: 'article-zeus-vs-hades.html', title: 'Zeus vs Hades — reseña del slot de Pragmatic Play', description: 'Reseña de Zeus vs Hades: Olympus, Hades, RTP, Wild expansivos y tiradas gratis.', linkText: 'Leer artículo →', datetime: '2026-08-31', dateText: 'Publicado: 31 de agosto de 2026' }
    ],
    id: [
      { href: 'article-rtp-slots.html', title: 'RTP slot: kenapa 96% tidak langsung kembali', description: 'Rumus RTP, swing nyata dalam sesi pendek, mitos populer, dan eksperimen dengan spin virtual.', linkText: 'Baca artikel →', datetime: '2026-09-04', dateText: 'Diterbitkan: 4 September 2026' },
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

      if (article.href === 'article-rtp-slots.html') {
        const image = document.createElement('img');
        image.className = 'rtp-story-art';
        image.src = `${language === 'ru' ? 'media/' : '../media/'}rtp-meter.png`;
        image.width = 754;
        image.height = 510;
        image.alt = rtpImageAlt[language] || rtpImageAlt.ru;
        card.classList.add('rtp-story-card');
        card.append(image);
      }

      if (article.href === 'article-provably-fair-rng.html') {
        const image = document.createElement('img');
        image.className = 'fair-story-art';
        image.src = `${language === 'ru' ? 'media/' : '../media/'}provably-fair-controller.png`;
        image.width = 740;
        image.height = 493;
        image.alt = fairImageAlt[language] || fairImageAlt.ru;
        card.classList.add('fair-story-card');
        card.append(image);
      }

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
    renderArticles([provablyLatest[language] || provablyLatest.ru, ...(localLatestArticles[language] || localLatestArticles.ru)].slice(0, 3));
  });
})();
