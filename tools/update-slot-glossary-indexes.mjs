import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const slug='article-slot-terms.html';
const langs=['ru','en','uz','tg','es','id'];
const folders={ru:'',en:'en',uz:'uz',tg:'tg',es:'es',id:'id'};
const hrefLang={ru:'ru',en:'en',uz:'uz',tg:'tg',es:'es-AR',id:'id'};
const copy={
ru:{tags:['Словарь слотов','42 термина'],title:'Термины слотов: RTP, Wild, Scatter и 40+ понятий',text:'Перевожу казиношный язык на человеческий: определения, местный сленг, мифы и быстрый поиск.',read:'Читать статью →',date:'Опубликовано: 8 сентября 2026'},
en:{tags:['Slot glossary','42 terms'],title:'Slot Terms Explained: RTP, Wilds, Scatters and 40+ More',text:'Casino jargon translated into plain English, with definitions, real talk, myths, and instant search.',read:'Read the article →',date:'Published: September 8, 2026'},
uz:{tags:['Slot lug‘ati','42 atama'],title:'Slot atamalari: RTP, Wild, Scatter va 40+ tushuncha',text:'Kazino tilini odam tiliga o‘girdim: ta’riflar, mahalliy gaplar, afsonalar va tez qidiruv.',read:'Maqolani o‘qish →',date:'Nashr etilgan: 8-sentabr, 2026'},
tg:{tags:['Луғати слот','42 истилоҳ'],title:'Истилоҳҳои слот: RTP, Wild, Scatter ва 40+ мафҳум',text:'Забони казино ба забони одамӣ: таърифҳо, гапҳои маҳаллӣ, афсонаҳо ва ҷустуҷӯи тез.',read:'Хондани мақола →',date:'Нашр шуд: 8 сентябри 2026'},
es:{tags:['Glosario de slots','42 términos'],title:'Términos de slots: RTP, Wild, Scatter y 40+ conceptos',text:'Traduzco la jerga sin chamuyo: definiciones, tono argentino, mitos y búsqueda rápida.',read:'Leer el artículo →',date:'Publicado: 8 de septiembre de 2026'},
id:{tags:['Glosarium slot','42 istilah'],title:'Istilah Slot: RTP, Wild, Scatter, dan 40+ Konsep',text:'Bahasa kasino dibedah santai: definisi, istilah lokal, mitos, dan pencarian cepat.',read:'Baca artikel →',date:'Diterbitkan: 8 September 2026'}
};

const url=l=>`https://gamer-logic-hub.com/${folders[l]?folders[l]+'/':''}${slug}`;
for(const lang of langs){
  const file=path.join(root,folders[lang],'articles.html');
  let html=fs.readFileSync(file,'utf8');
  if(!html.includes(`href="${slug}"`)){
    const c=copy[lang];
    const card=`<a class="card" href="${slug}"><div class="icon">A↔Z</div><div class="tags"><span class="tag">${c.tags[0]}</span><span class="tag">${c.tags[1]}</span></div><h3>${c.title}</h3><p>${c.text}</p><span class="read-more">${c.read}</span><time class="card-date" datetime="2026-09-08">${c.date}</time></a>`;
    html=html.replace('<div class="card-grid">',`<div class="card-grid">${card}`);
  }
  if(!html.includes('id="slot-glossary-card-style"')){
    const art=lang==='ru'?'media/slot-glossary-hero.png':'../media/slot-glossary-hero.png';
    const style=`<style id="slot-glossary-card-style">.card[href="article-slot-terms.html"]{position:relative;isolation:isolate;overflow:hidden;min-height:270px;padding-right:198px;border-color:rgba(190,95,255,.48);background:linear-gradient(90deg,rgba(19,11,35,.99) 0%,rgba(19,11,35,.95) 46%,rgba(19,11,35,.43) 67%,rgba(19,11,35,.12) 100%),url("${art}") 64% center/cover no-repeat}.card[href="article-slot-terms.html"]::after{content:"";position:absolute;z-index:-1;inset:0;background:radial-gradient(circle at 90% 18%,rgba(37,202,255,.15),transparent 36%)}.card[href="article-slot-terms.html"] .icon{color:#e0a0ff;border-color:rgba(202,121,255,.42);background:rgba(42,18,70,.72)}.card[href="article-slot-terms.html"] h3{color:#e3a6ff;text-shadow:0 2px 10px rgba(5,2,12,.82)}.card[href="article-slot-terms.html"] p{color:#d5cadf;text-shadow:0 1px 8px rgba(5,2,12,.95)}@media(max-width:560px){.card[href="article-slot-terms.html"]{min-height:260px;padding-right:22px;background:linear-gradient(90deg,rgba(19,11,35,.99) 0%,rgba(19,11,35,.91) 62%,rgba(19,11,35,.48) 100%),url("${art}") 61% center/cover no-repeat}.card[href="article-slot-terms.html"] p{max-width:82%}}</style>`;
    html=html.replace('</head>',`${style}</head>`);
  }
  html=html.replace(/<script type="application\/ld\+json">(\{[^<]+"@type":"CollectionPage"[^<]+\})<\/script>/,match=>{
    const json=JSON.parse(match.slice(match.indexOf('>')+1,match.lastIndexOf('<')));
    const items=json.mainEntity?.itemListElement||[];
    if(!items.some(item=>item.url===url(lang))) items.unshift({"@type":"ListItem",position:1,url:url(lang),name:copy[lang].title});
    items.forEach((item,index)=>item.position=index+1);
    return `<script type="application/ld+json">${JSON.stringify(json)}</script>`;
  });
  fs.writeFileSync(file,html,'utf8');
  console.log(`updated ${path.relative(root,file)}`);
}

const sitemapFile=path.join(root,'sitemap.xml');
let sitemap=fs.readFileSync(sitemapFile,'utf8');
if(!sitemap.includes(url('ru'))){
  const alternates=langs.map(l=>`<xhtml:link rel="alternate" hreflang="${hrefLang[l]}" href="${url(l)}"/>`).join('')+`<xhtml:link rel="alternate" hreflang="x-default" href="${url('ru')}"/>`;
  const entries=langs.map(l=>`  <url><loc>${url(l)}</loc>${alternates}<lastmod>2026-09-08</lastmod></url>`).join('\n');
  sitemap=sitemap.replace('</urlset>',`${entries}\n</urlset>`);
  fs.writeFileSync(sitemapFile,sitemap,'utf8');
  console.log('updated sitemap.xml');
}
