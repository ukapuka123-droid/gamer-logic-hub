(() => {
  const $ = id => document.getElementById(id);
  const fmt = n => new Intl.NumberFormat('ru-RU',{maximumFractionDigits:2}).format(n);
  const configs = {
    low: [{p:.25,m:.35},{p:.14,m:1},{p:.055,m:2},{p:.012,m:5}],
    medium: [{p:.16,m:.4},{p:.09,m:1.2},{p:.03,m:4},{p:.006,m:15}],
    high: [{p:.10,m:.35},{p:.035,m:2},{p:.009,m:10},{p:.0012,m:70}]
  };
  let volatility='medium', running=false;
  const setButtons=(root,value)=>root.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.value===value));
  $('volatility').addEventListener('click',e=>{if(!e.target.dataset.value)return;volatility=e.target.dataset.value;setButtons($('volatility'),volatility)});
  $('rtp').addEventListener('input',()=>{$('rtpOut').textContent=fmt(+$('rtp').value)+'%'});
  function clear(){['actualRtp','profit','hitRate','drawdown'].forEach(id=>$(id).textContent='—');$('payoutChart').innerHTML='';$('progress').style.width='0';$('status').textContent='Выберите параметры и запустите первый эксперимент.'}
  $('reset').addEventListener('click',clear);
  function spin(items,scale){const r=Math.random();let cursor=0;for(const item of items){cursor+=item.p;if(r<cursor)return item.m*scale}return 0}
  async function run(){if(running)return;running=true;$('run').disabled=true;clear();const target=+$('rtp').value/100,count=+$('spins').value,bet=Math.max(.1,+$('bet').value||1),items=configs[volatility];const rawMean=items.reduce((s,x)=>s+x.p*x.m,0),scale=target/rawMean,bins=[0,0,0,0,0,0],labels=['0×','<1×','1–2×','2–5×','5–20×','20×+'];let wagered=0,returned=0,wins=0,balance=0,peak=0,maxDrawdown=0;
    for(let i=0;i<count;i++){const mult=spin(items,scale),payout=bet*mult;wagered+=bet;returned+=payout;balance+=payout-bet;peak=Math.max(peak,balance);maxDrawdown=Math.max(maxDrawdown,peak-balance);if(payout>0)wins++;const bi=mult===0?0:mult<1?1:mult<2?2:mult<5?3:mult<20?4:5;bins[bi]++;if(i%2500===0){$('progress').style.width=(i/count*100)+'%';$('status').textContent=`Обработано ${fmt(i)} из ${fmt(count)} спинов…`;await new Promise(requestAnimationFrame)}}
    $('progress').style.width='100%';$('actualRtp').textContent=fmt(returned/wagered*100)+'%';$('profit').textContent=(balance>=0?'+':'')+fmt(balance);$('profit').className=balance>=0?'good':'';$('hitRate').textContent=fmt(wins/count*100)+'%';$('drawdown').textContent='−'+fmt(maxDrawdown);const max=Math.max(...bins,1);$('payoutChart').innerHTML=bins.map((v,i)=>`<div class="bar" data-label="${labels[i]}" title="${fmt(v)} спинов" style="height:${Math.max(2,v/max*100)}%"></div>`).join('');$('status').innerHTML=`Готово: <strong>${fmt(count)}</strong> независимых спинов. Теоретический RTP модели — <strong>${fmt(target*100)}%</strong>.`;running=false;$('run').disabled=false
  }
  $('run').addEventListener('click',run);clear();
})();
