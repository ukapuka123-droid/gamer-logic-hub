(() => {
  const catalogLayout = document.createElement('style');
  catalogLayout.textContent = '.all-games-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.all-game{display:flex;flex-direction:column;align-items:stretch;min-width:0}.all-game img{width:100%;height:145px;object-fit:cover}.all-game-copy{display:flex;flex:1;flex-direction:column;align-items:flex-start;padding:14px}.all-game h3{font-size:16px}.all-game p{margin-top:6px}@media(max-width:700px){.all-games-grid{grid-template-columns:1fr}.all-game{display:grid;grid-template-columns:150px minmax(0,1fr)}.all-game img{width:150px;height:100%}}@media(max-width:460px){.all-game{display:flex}.all-game img{width:100%;height:165px}}';
  document.head.append(catalogLayout);
  const lang = (document.documentElement.lang || 'ru').split('-')[0];
  const gamesGrid = document.querySelector('.all-games-grid');
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
  const batchSize = 8;
  const cards = [...document.querySelectorAll('.card-grid > .card')];
  const grid = document.querySelector('.card-grid');
  if (!grid || cards.length <= batchSize) return;

  const labels = {
    ru: 'Показать еще статьи',
    en: 'Show more articles',
    uz: 'Yana maqolalarni ko‘rsatish',
    tg: 'Мақолаҳои бештарро нишон диҳед',
    es: 'Mostrar más artículos',
    id: 'Tampilkan artikel lainnya'
  };
  const language = (document.documentElement.lang || 'ru').split('-')[0];
  const button = document.createElement('button');
  let visibleCount = batchSize;
  button.type = 'button';
  button.className = 'articles-load-more';
  button.textContent = labels[language] || labels.ru;

  const render = () => {
    cards.forEach((card, index) => { card.hidden = index >= visibleCount; });
    button.hidden = visibleCount >= cards.length;
  };

  button.addEventListener('click', () => {
    visibleCount += batchSize;
    render();
  });
  grid.parentElement.append(button);
  render();
})();
