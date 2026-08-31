(() => {
  const normalizeHeader = () => {
    const logo = document.querySelector('.logo-mark');
    if (logo) {
      logo.innerHTML = '<svg fill="none" height="16" viewBox="0 0 24 24" width="16" aria-hidden="true"><path d="M12 2 L20.5 7 V17 L12 22 L3.5 17 V7 Z" stroke="currentColor" stroke-width="1.6"></path><path d="M12 8 V16 M8 12 H16" stroke="currentColor" stroke-linecap="round" stroke-width="1.8"></path><circle cx="12" cy="12" fill="currentColor" r="1.6"></circle></svg>';
    }
    const style = document.createElement('style');
    style.textContent = '.header-inner{width:min(1160px,calc(100% - 36px))!important;display:grid!important;grid-template-columns:1fr auto 1fr!important;align-items:center!important;gap:22px!important;padding:14px 0!important}.brand{gap:11px!important}.brand small{font-size:10px!important;letter-spacing:.13em!important}.logo-mark{width:37px!important;height:37px!important;border:4px solid var(--yellow,#ffd400)!important;border-top-color:#bd78e7!important;border-radius:50%!important;background:transparent!important;display:grid!important;place-items:center!important;color:var(--yellow,#ffd400)!important;box-shadow:0 0 18px rgba(255,212,0,.3)!important}.logo-mark svg{display:block}.main-nav,.lang-switch{display:flex!important;border:1px solid var(--line,#4c3821)!important;border-radius:999px!important;padding:4px!important;gap:3px!important}.main-nav a{padding:8px 16px!important}.lang-switch a,.lang-switch span{padding:7px 10px!important}@media(max-width:820px){.header-inner{grid-template-columns:1fr auto!important}.main-nav{order:3!important;grid-column:1/-1!important;justify-self:center!important}.lang-switch a,.lang-switch span{padding:6px 7px!important}}@media(max-width:560px){.header-inner{width:min(100% - 24px,1160px)!important;gap:8px!important}.brand small{display:none!important}}';
    document.head.append(style);
    if (logo) { logo.style.setProperty('width','34px','important'); logo.style.setProperty('height','34px','important'); }
    document.querySelectorAll('.main-nav a').forEach((link)=>{link.style.setProperty('font-size','13px','important');link.style.setProperty('font-weight','700','important')});
  };
  normalizeHeader();
  const lang = (document.documentElement.lang || 'ru').split('-')[0];
  const nested = lang !== 'ru';
  const text = {ru:'Выберите условие и наблюдайте результат на шкале от 0 до 100.',en:'Choose a condition and watch the result land on the 0–100 scale.',uz:'Shartni tanlang va natijani 0–100 shkalasida kuzating.',tg:'Шартро интихоб карда, натиҷаро дар миқёси 0–100 бинед.',es:'Elegí una condición y observá el resultado en la escala de 0 a 100.',id:'Pilih kondisi dan amati hasil pada skala 0–100.'};
  const available = {ru:'Доступен',en:'Available',uz:'Mavjud',tg:'Дастрас',es:'Disponible',id:'Tersedia'};
  const play = {ru:'Играть →',en:'Play →',uz:'O‘ynash →',tg:'Бозӣ →',es:'Jugar →',id:'Main →'};
  const media = nested ? '../media/' : 'media/';
  const simGrid = document.querySelector('.sim-grid');
  if (simGrid && !simGrid.querySelector('[href="simulator-dice.html"]')) {
    const placeholder = [...simGrid.children].find(el => !el.matches('a'));
    const card = document.createElement('a');
    card.className = 'sim-card plinko-card dice-card';
    card.href = 'simulator-dice.html';
    card.innerHTML = `<div class="sim-art"><img src="${media}dice-card-hero.png" alt="Dice 0–100"></div><div class="sim-copy"><span class="sim-status">${available[lang] || available.ru}</span><h3>Dice: 0–100</h3><p>${text[lang] || text.ru}</p></div>`;
    placeholder ? placeholder.replaceWith(card) : simGrid.append(card);
  }
  const other = document.querySelector('.other-games');
  if (other && !other.querySelector('[href="simulator-dice.html"]') && !location.pathname.endsWith('simulator-dice.html')) {
    const card = document.createElement('a');
    card.className = 'other-game';
    card.href = 'simulator-dice.html';
    card.style.marginTop = '12px';
    card.innerHTML = `<img src="${media}dice-card-hero.png" alt="Dice 0–100"><div class="other-game-copy"><span class="other-game-status">${available[lang] || available.ru}</span><h3>Dice: 0–100</h3><p>${text[lang] || text.ru}</p></div><span class="other-game-action">${play[lang] || play.ru}</span>`;
    other.append(card);
  }
})();
