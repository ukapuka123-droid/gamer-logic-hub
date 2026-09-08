import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const pages=['article-slot-terms.html','en/article-slot-terms.html','uz/article-slot-terms.html','tg/article-slot-terms.html','es/article-slot-terms.html','id/article-slot-terms.html'];
const failures=[];
for(const rel of pages){
  const file=path.join(root,rel); const html=fs.readFileSync(file,'utf8');
  const count=(pattern)=>(html.match(pattern)||[]).length;
  if(count(/class="term-card"/g)!==42) failures.push(`${rel}: expected 42 term cards`);
  if(count(/data-term-section/g)!==7) failures.push(`${rel}: expected 7 glossary sections`);
  if(count(/rel="alternate" hreflang=/g)!==7) failures.push(`${rel}: expected 7 hreflang links`);
  if(!html.includes('id="megaways"')) failures.push(`${rel}: Megaways definition is missing`);
  if(!html.includes('data-glossary-search')) failures.push(`${rel}: search is missing`);
  for(const match of html.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/g)){
    try{JSON.parse(match[1])}catch(error){failures.push(`${rel}: invalid JSON-LD (${error.message})`)}
  }
  for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
    const target=match[1];
    if(target.startsWith('#')||target.startsWith('http')||target.startsWith('data:')) continue;
    const clean=target.split(/[?#]/)[0];
    if(!fs.existsSync(path.resolve(path.dirname(file),clean))) failures.push(`${rel}: missing local target ${clean}`);
  }
}
for(const rel of ['articles.html','en/articles.html','uz/articles.html','tg/articles.html','es/articles.html','id/articles.html']){
  const html=fs.readFileSync(path.join(root,rel),'utf8');
  if((html.match(/<a class="card" href="article-slot-terms\.html"/g)||[]).length!==1) failures.push(`${rel}: glossary card missing or duplicated`);
  if(!html.includes('id="slot-glossary-card-style"')||!html.includes('slot-glossary-hero.png')) failures.push(`${rel}: glossary card background is missing`);
  const scripts=[...html.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/g)];
  const collection=scripts.map(match=>{try{return JSON.parse(match[1])}catch{return null}}).find(json=>json?.['@type']==='CollectionPage');
  if(!collection?.mainEntity?.itemListElement?.some(item=>item.url?.endsWith('/article-slot-terms.html'))) failures.push(`${rel}: glossary missing from CollectionPage schema`);
}
const sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');
if((sitemap.match(/<loc>https:\/\/gamer-logic-hub\.com\/(?:en\/|uz\/|tg\/|es\/|id\/)?article-slot-terms\.html<\/loc>/g)||[]).length!==6) failures.push('sitemap.xml: expected 6 glossary URLs');
if(failures.length){console.error(failures.join('\n'));process.exit(1)}
console.log('Slot glossary validation passed: 6 locales, 42 terms each, local links intact, JSON-LD valid.');
