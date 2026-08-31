(() => {
  const normalizeHeader = () => {
    const logo = document.querySelector('.logo-mark');
    if (logo) logo.innerHTML='<svg fill="none" height="16" viewBox="0 0 24 24" width="16" aria-hidden="true"><path d="M12 2 L20.5 7 V17 L12 22 L3.5 17 V7 Z" stroke="currentColor" stroke-width="1.6"></path><path d="M12 8 V16 M8 12 H16" stroke="currentColor" stroke-linecap="round" stroke-width="1.8"></path><circle cx="12" cy="12" fill="currentColor" r="1.6"></circle></svg>';
    const style=document.createElement('style');
    style.textContent='.header-inner{width:min(1160px,calc(100% - 36px))!important;display:grid!important;grid-template-columns:1fr auto 1fr!important;align-items:center!important;gap:22px!important;padding:14px 0!important}.brand{gap:11px!important}.brand small{font-size:10px!important;letter-spacing:.13em!important}.logo-mark{width:37px!important;height:37px!important;border:4px solid var(--yellow,#ffd400)!important;border-top-color:#bd78e7!important;border-radius:50%!important;background:transparent!important;display:grid!important;place-items:center!important;color:var(--yellow,#ffd400)!important;box-shadow:0 0 18px rgba(255,212,0,.3)!important}.logo-mark svg{display:block}.main-nav,.lang-switch{display:flex!important;border:1px solid var(--line,#4c3821)!important;border-radius:999px!important;padding:4px!important;gap:3px!important}.main-nav a{padding:8px 16px!important}.lang-switch a,.lang-switch span{padding:7px 10px!important}@media(max-width:820px){.header-inner{grid-template-columns:1fr auto!important}.main-nav{order:3!important;grid-column:1/-1!important;justify-self:center!important}.lang-switch a,.lang-switch span{padding:6px 7px!important}}@media(max-width:560px){.header-inner{width:min(100% - 24px,1160px)!important;gap:8px!important}.brand small{display:none!important}}';
    document.head.append(style);
    if (logo) { logo.style.setProperty('width','34px','important'); logo.style.setProperty('height','34px','important'); }
    document.querySelectorAll('.main-nav a').forEach((link)=>{link.style.setProperty('font-size','13px','important');link.style.setProperty('font-weight','700','important')});
  };
  normalizeHeader();
  const q = (id) => document.getElementById(id);
  if (document.documentElement.lang !== 'ru') {
    const brand = document.querySelector('.brand');
    const navLinks = document.querySelectorAll('.main-nav a');
    if (brand) brand.href = 'index.html';
    if (navLinks[0]) navLinks[0].href = 'index.html';
    if (navLinks[1]) navLinks[1].href = 'articles.html';
  }
  const amountEl=q('amount'),balanceEl=q('balance'),profitEl=q('profit'),launch=q('launch'),reset=q('reset'),manual=q('manualMode'),auto=q('autoMode'),targetEl=q('target'),conditionEl=q('condition'),chanceEl=q('chance'),multiplierEl=q('multiplier'),marker=q('dieMarker'),targetPin=q('targetPin'),status=q('status'),historyEl=q('history');
  const lang=(document.documentElement.lang||'ru').split('-')[0];
  const assetPrefix=lang==='ru'?'media/':'../media/';
  const balanceCard=document.querySelector('.balance-card');
  const balanceLabel=balanceCard.querySelector(':scope > span')?.textContent||'Баланс';
  const coinUnits={ru:'Монет',en:'Coins',uz:'Tanga',tg:'Танга',es:'Monedas',id:'Koin'};
  const coinImage=document.createElement('img');
  coinImage.src=assetPrefix+'plinko-coins.png';coinImage.alt=lang==='ru'?'Виртуальные монеты':'Virtual coins';
  const balanceCopy=document.createElement('div');
  const balanceLabelEl=document.createElement('span');
  const balanceValueEl=document.createElement('strong');
  balanceLabelEl.className='balance-label';balanceLabelEl.textContent=balanceLabel;
  balanceValueEl.className='balance-value';balanceValueEl.append(balanceEl,document.createTextNode(' '+(coinUnits[lang]||coinUnits.ru)));
  balanceCopy.append(balanceLabelEl,balanceValueEl);
  balanceCard.replaceChildren(coinImage,balanceCopy);
  const enhancementStyle=document.createElement('style');
  enhancementStyle.textContent='.balance-card{display:grid;grid-template-columns:64px minmax(0,1fr);align-items:center;gap:12px;min-height:86px}.balance-card>img{width:64px;height:64px;object-fit:contain}.balance-card .balance-label{display:block;margin-bottom:3px;color:#c79af4;font-size:11px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}.balance-card .balance-value{display:block;color:var(--yellow,#ffd400);font-size:24px;font-weight:900;line-height:1.15;white-space:nowrap}.balance-card .balance-value span{display:inline;color:inherit;font:inherit;text-transform:none;letter-spacing:normal}.rail-wrap{cursor:pointer;touch-action:none;user-select:none}.target-pin{z-index:3;top:6px!important;width:24px!important;height:68px!important;border-radius:9px!important;background:linear-gradient(180deg,#ffe86a,#f0b600)!important;cursor:grab}.target-pin::after{content:"⋮";display:grid;place-items:center;height:100%;color:#6a4b00;font-size:22px;font-weight:900}.target-pin:active{cursor:grabbing}.target-pin:focus-visible{outline:3px solid #fff;outline-offset:3px}@media(max-width:360px){.balance-card{grid-template-columns:54px minmax(0,1fr)}.balance-card>img{width:54px;height:54px}.balance-card .balance-value{font-size:21px}}';
  document.head.append(enhancementStyle);
  const messages={
    ru:{run:'Запустить раунд',startAuto:'Запустить авто',stopAuto:'Остановить авто',low:'Недостаточно виртуальных монет.',win:'Условие выполнено — виртуальные монеты начислены.',loss:'Результат не выполнил выбранное условие.',ready:'Настройте условие и запустите первый раунд.'},
    en:{run:'Run round',startAuto:'Start auto',stopAuto:'Stop auto',low:'Not enough virtual coins.',win:'Condition met — virtual coins credited.',loss:'The result did not meet the selected condition.',ready:'Set the condition and run the first round.'},
    uz:{run:'Raundni boshlash',startAuto:'Avtoni boshlash',stopAuto:'Avtoni to‘xtatish',low:'Virtual tangalar yetarli emas.',win:'Shart bajarildi — virtual tangalar qo‘shildi.',loss:'Natija tanlangan shartga mos kelmadi.',ready:'Shartni sozlang va birinchi raundni boshlang.'},
    tg:{run:'Оғози раунд',startAuto:'Оғози авто',stopAuto:'Қатъи авто',low:'Тангаҳои виртуалӣ кофӣ нестанд.',win:'Шарт иҷро шуд — тангаҳои виртуалӣ илова шуданд.',loss:'Натиҷа ба шарти интихобшуда мувофиқ нашуд.',ready:'Шартро танзим карда, раунди аввалро оғоз кунед.'},
    es:{run:'Iniciar ronda',startAuto:'Iniciar auto',stopAuto:'Detener auto',low:'No hay suficientes monedas virtuales.',win:'Condición cumplida: se acreditaron monedas virtuales.',loss:'El resultado no cumplió la condición elegida.',ready:'Configurá la condición e iniciá la primera ronda.'},
    id:{run:'Mulai ronde',startAuto:'Mulai otomatis',stopAuto:'Hentikan otomatis',low:'Koin virtual tidak cukup.',win:'Kondisi terpenuhi — koin virtual ditambahkan.',loss:'Hasil tidak memenuhi kondisi yang dipilih.',ready:'Atur kondisi dan mulai ronde pertama.'}
  };
  const msg=messages[lang]||messages.ru;
  const extraCopy={
    ru:{back:'← Назад на главную',title:'Другие игры',intro:'Попробуйте другие доступные образовательные симуляторы.',available:'Доступен',play:'Играть →',plinko:'Plinko: физика случайных отскоков',plinkoText:'Запускайте шарики и наблюдайте распределение случайных результатов.',limbo:'Limbo: коэффициент и вероятность',limboText:'Выберите цель и исследуйте изменение вероятности.'},
    en:{back:'← Back to home',title:'Other games',intro:'Try other available educational simulators.',available:'Available',play:'Play →',plinko:'Plinko: the physics of random bounces',plinkoText:'Launch balls and watch the distribution of random outcomes.',limbo:'Limbo: multiplier and probability',limboText:'Choose a target and explore how probability changes.'},
    uz:{back:'← Bosh sahifaga',title:'Boshqa o‘yinlar',intro:'Boshqa mavjud ta’limiy simulyatorlarni sinab ko‘ring.',available:'Mavjud',play:'O‘ynash →',plinko:'Plinko: tasodifiy sakrashlar fizikasi',plinkoText:'Sharchalarni ishga tushiring va tasodifiy natijalarni kuzating.',limbo:'Limbo: ko‘paytirgich va ehtimollik',limboText:'Maqsadni tanlang va ehtimollik o‘zgarishini o‘rganing.'},
    tg:{back:'← Ба саҳифаи асосӣ',title:'Бозиҳои дигар',intro:'Симуляторҳои омӯзишии дигари дастрасро санҷед.',available:'Дастрас',play:'Бозӣ →',plinko:'Plinko: физикаи ҷаҳишҳои тасодуфӣ',plinkoText:'Тӯбҳоро сар дода, тақсимоти натиҷаҳоро мушоҳида кунед.',limbo:'Limbo: коэффитсиент ва эҳтимолият',limboText:'Ҳадафро интихоб карда, тағйири эҳтимолиятро омӯзед.'},
    es:{back:'← Volver al inicio',title:'Otros juegos',intro:'Probá otros simuladores educativos disponibles.',available:'Disponible',play:'Jugar →',plinko:'Plinko: física de rebotes aleatorios',plinkoText:'Lanzá bolas y observá la distribución de resultados.',limbo:'Limbo: multiplicador y probabilidad',limboText:'Elegí un objetivo y explorá cómo cambia la probabilidad.'},
    id:{back:'← Kembali ke beranda',title:'Game lainnya',intro:'Coba simulator edukatif lain yang tersedia.',available:'Tersedia',play:'Main →',plinko:'Plinko: fisika pantulan acak',plinkoText:'Luncurkan bola dan amati distribusi hasil acak.',limbo:'Limbo: pengali dan probabilitas',limboText:'Pilih target dan pelajari perubahan probabilitas.'}
  };
  const extra=extraCopy[lang]||extraCopy.ru;
  const backHome=document.createElement('a');
  backHome.className='back-home';backHome.href='index.html';backHome.textContent=extra.back;
  document.querySelector('.intro').append(backHome);
  const otherGames=document.createElement('section');
  otherGames.className='dice-other-games';
  otherGames.innerHTML=`<div class="dice-other-head"><h2>${extra.title}</h2><p>${extra.intro}</p></div><div class="dice-other-grid"><a class="dice-other-card" href="simulator-plinko.html"><img src="${assetPrefix}plinko-card-hero.png" alt="Plinko"><div><span>${extra.available}</span><h3>${extra.plinko}</h3><p>${extra.plinkoText}</p><strong>${extra.play}</strong></div></a><a class="dice-other-card" href="simulator-limbo.html"><img src="${assetPrefix}limbo-card-hero.png" alt="Limbo"><div><span>${extra.available}</span><h3>${extra.limbo}</h3><p>${extra.limboText}</p><strong>${extra.play}</strong></div></a></div>`;
  document.querySelector('.explain').before(otherGames);
  const extrasStyle=document.createElement('style');
  extrasStyle.textContent='.back-home{position:absolute;right:0;bottom:22px;display:inline-flex;align-items:center;padding:9px 14px;border:1px solid var(--line);border-radius:999px;background:rgba(33,20,61,.72);color:var(--text);font-size:13px;font-weight:800;text-decoration:none;transition:transform .18s ease,border-color .18s ease}.back-home:hover{transform:translateX(-3px);border-color:var(--purple)}.dice-other-games{margin:0 auto 24px;padding:18px;border:1px solid rgba(168,76,244,.42);border-radius:18px;background:linear-gradient(145deg,rgba(33,20,61,.94),rgba(23,16,42,.96))}.dice-other-head{margin-bottom:13px}.dice-other-head h2{margin:0;color:var(--yellow);font-size:21px}.dice-other-head p{margin:2px 0 0;color:var(--muted);font-size:13px}.dice-other-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.dice-other-card{display:grid;grid-template-columns:150px minmax(0,1fr);overflow:hidden;border:1px solid var(--line);border-radius:14px;background:rgba(11,6,24,.62);color:var(--text);text-decoration:none}.dice-other-card img{width:150px;height:100%;min-height:150px;object-fit:cover}.dice-other-card>div{display:flex;min-width:0;flex-direction:column;padding:13px}.dice-other-card span{color:var(--green);font-size:10px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}.dice-other-card h3{margin:4px 0;color:var(--text);font-size:16px;line-height:1.25}.dice-other-card p{margin:0;color:var(--muted);font-size:12px}.dice-other-card strong{margin-top:auto;padding-top:8px;color:var(--yellow);font-size:12px}@media(max-width:960px){.back-home{position:static;margin-top:16px}}@media(max-width:760px){.dice-other-grid{grid-template-columns:1fr}}@media(max-width:440px){.dice-other-card{grid-template-columns:1fr}.dice-other-card img{width:100%;height:150px;min-height:0}}';
  document.head.append(extrasStyle);
  let balance=1000,running=false,autoRunning=false,timer=0,history=[];
  const clamp=(n,min,max)=>Math.min(max,Math.max(min,n));
  const money=(n)=>n.toLocaleString(undefined,{minimumFractionDigits:0,maximumFractionDigits:2});
  const target=()=>clamp(Number(targetEl.value)||50,2,98);
  const chance=()=>conditionEl.value==='over'?100-target():target();
  const multiplier=()=>99/chance();
  function amount(){const n=clamp(Number(amountEl.value)||1,1,Math.max(1,balance));amountEl.value=Math.floor(n);return Math.floor(n)}
  function sync(){targetEl.value=target().toFixed(2);chanceEl.textContent=chance().toFixed(4);multiplierEl.textContent=multiplier().toFixed(4);targetPin.style.left=target()+'%';targetPin.setAttribute('aria-valuenow',target().toFixed(2));balanceEl.textContent=money(balance);launch.disabled=running||balance<1}
  function renderHistory(){historyEl.replaceChildren(...history.slice(0,8).map(x=>{const s=document.createElement('span');s.className='history-chip '+(x.win?'win':'loss');s.textContent=x.value.toFixed(2);return s}))}
  function finish(stake,result){const win=conditionEl.value==='over'?result>target():result<target(),reward=win?stake*multiplier():0,profit=reward-stake;balance+=reward;profitEl.textContent=(profit>0?'+':'')+money(profit);marker.firstElementChild.textContent=result.toFixed(2);marker.style.left=result+'%';marker.classList.add('show');history.unshift({value:result,win});renderHistory();status.textContent=win?msg.win:msg.loss;running=false;sync();if(autoRunning&&balance>=1)timer=setTimeout(play,900)}
  function play(){clearTimeout(timer);if(running)return;const stake=amount();if(stake>balance){status.textContent=msg.low;return}running=true;balance-=stake;marker.classList.remove('show');profitEl.textContent='0';sync();setTimeout(()=>finish(stake,Math.floor(Math.random()*10001)/100),280)}
  launch.addEventListener('click',()=>{if(auto.classList.contains('active'))autoRunning=!autoRunning;launch.textContent=autoRunning?msg.stopAuto:msg.run;if(autoRunning||manual.classList.contains('active'))play()});
  manual.addEventListener('click',()=>{autoRunning=false;clearTimeout(timer);manual.classList.add('active');auto.classList.remove('active');launch.textContent=msg.run});
  auto.addEventListener('click',()=>{manual.classList.remove('active');auto.classList.add('active');launch.textContent=msg.startAuto});
  q('half').addEventListener('click',()=>{amountEl.value=Math.max(1,Math.floor(amount()/2));sync()});q('double').addEventListener('click',()=>{amountEl.value=Math.min(balance,amount()*2);sync()});
  q('swap').addEventListener('click',()=>{conditionEl.value=conditionEl.value==='over'?'under':'over';sync()});[targetEl,conditionEl,amountEl].forEach(el=>el.addEventListener('input',sync));
  const railWrap=document.querySelector('.rail-wrap');
  let dragging=false;
  const setTargetFromPointer=(event)=>{const rect=railWrap.getBoundingClientRect();const value=clamp((event.clientX-rect.left)/rect.width*100,2,98);targetEl.value=value.toFixed(2);sync()};
  railWrap.addEventListener('pointerdown',(event)=>{if(event.button!==0)return;dragging=true;railWrap.setPointerCapture(event.pointerId);setTargetFromPointer(event)});
  railWrap.addEventListener('pointermove',(event)=>{if(dragging)setTargetFromPointer(event)});
  railWrap.addEventListener('pointerup',(event)=>{dragging=false;if(railWrap.hasPointerCapture(event.pointerId))railWrap.releasePointerCapture(event.pointerId)});
  railWrap.addEventListener('pointercancel',()=>{dragging=false});
  targetPin.tabIndex=0;targetPin.setAttribute('role','slider');targetPin.setAttribute('aria-valuemin','2');targetPin.setAttribute('aria-valuemax','98');
  targetPin.addEventListener('keydown',(event)=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();let value=target();if(event.key==='ArrowLeft')value-=event.shiftKey?5:.5;if(event.key==='ArrowRight')value+=event.shiftKey?5:.5;if(event.key==='Home')value=2;if(event.key==='End')value=98;targetEl.value=clamp(value,2,98).toFixed(2);sync()});
  reset.addEventListener('click',()=>{clearTimeout(timer);balance=1000;running=false;autoRunning=false;history=[];historyEl.replaceChildren();marker.classList.remove('show');profitEl.textContent='0';status.textContent=msg.ready;sync()});targetEl.value='2.00';profitEl.textContent='0';sync();
})();
