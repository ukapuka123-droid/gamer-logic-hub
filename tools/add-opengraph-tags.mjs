import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const write = process.argv.includes("--write");
const required = ["og:type", "og:site_name", "og:title", "og:description", "og:url", "og:image"];

const localeByDirectory = {
  en: "en_US",
  es: "es_AR",
  id: "id_ID",
  tg: "tg_TJ",
  uz: "uz_UZ",
};

const imageByPage = [
  [/simulator-blackjack-strategy\.html$/, "blackjack-strategy-card-hero.webp"],
  [/simulator-blackjack\.html$/, "blackjack-card-hero-v3.webp"],
  [/simulator-crazy-chicken\.html$/, "crazy-chicken-card-hero.webp"],
  [/simulator-roulette-lab\.html$/, "roulette-lab-card-hero.webp"],
  [/simulator-wheel-x1000\.html$/, "wheel-x1000-card-hero.webp"],
  [/simulator-slot-lab\.html$/, "slot-lab-card-hero.webp"],
  [/simulator-plinko\.html$/, "plinko-card-hero.webp"],
  [/simulator-limbo\.html$/, "limbo-card-hero.webp"],
  [/simulator-mines\.html$/, "mines-card-hero.webp"],
  [/simulator-dice\.html$/, "dice-card-hero.webp"],
  [/article-slot-terms\.html$/, "slot-glossary-hero.webp"],
  [/article-gates-of-olympus-multipliers\.html$/, "gates-of-olympus-article-hero.webp"],
  [/article-sweet-bonanza\.html$/, "sweet-bonanza-cover.webp"],
  [/article-zeus-vs-hades\.html$/, "zeus-vs-hades-olympus.jpg"],
  [/article-sugar-rush-1000\.html$/, "sugar-rush-1000-1.jpg"],
  [/article-the-dog-house\.html$/, "dog-house-main.webp"],
  [/article-roulette-odds\.html$/, "roulette-odds-hero.webp"],
  [/article-blackjack-rules\.html$/, "blackjack-rules-cutout.webp"],
  [/article-bonus-buy-slots\.html$/, "bonus-buy-hero.webp"],
  [/article-provably-fair-rng\.html$/, "provably-fair-controller.png"],
];

async function listHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if ([".git", "node_modules", "work"].includes(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await listHtmlFiles(fullPath));
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(fullPath);
  }
  return files;
}

function metaPropertyExists(html, property) {
  const escaped = property.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`<meta\\b(?=[^>]*\\bproperty=["']${escaped}["'])[^>]*>`, "i").test(html);
}

function extract(html, pattern, label, relativePath) {
  const match = html.match(pattern);
  if (!match) throw new Error(`Missing ${label} in ${relativePath}`);
  return match[1].trim();
}

function imageFor(relativePath) {
  const normalized = relativePath.replaceAll("\\", "/");
  const match = imageByPage.find(([pattern]) => pattern.test(normalized));
  return match
    ? `https://gamer-logic-hub.com/media/${match[1]}`
    : "https://gamer-logic-hub.com/apple-touch-icon.png";
}

function localeFor(relativePath) {
  const firstDirectory = relativePath.replaceAll("\\", "/").split("/")[0];
  return localeByDirectory[firstDirectory] ?? "ru_RU";
}

const files = await listHtmlFiles(root);
let changed = 0;
const touched = [];

for (const file of files) {
  const relativePath = path.relative(root, file);
  let html = await readFile(file, "utf8");
  const title = extract(html, /<title[^>]*>([\s\S]*?)<\/title>/i, "title", relativePath);
  const description = extract(html, /<meta\b(?=[^>]*\bname=["']description["'])[^>]*\bcontent=["']([^"']*)["'][^>]*>/i, "description", relativePath);
  const canonical = extract(html, /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*\bhref=["']([^"']+)["'][^>]*>/i, "canonical", relativePath);
  const type = path.basename(file).startsWith("article-") ? "article" : "website";
  const values = {
    "og:type": type,
    "og:site_name": "Gamer Logic Hub",
    "og:title": title,
    "og:description": description,
    "og:url": canonical,
    "og:image": imageFor(relativePath),
  };
  const missing = required.filter((property) => !metaPropertyExists(html, property));
  if (missing.length === 0) continue;
  const optional = [];
  if (!metaPropertyExists(html, "og:locale")) optional.push("og:locale");
  if (!metaPropertyExists(html, "og:image:alt")) optional.push("og:image:alt");

  const tags = [
    ...missing.map((property) => `<meta property="${property}" content="${values[property]}">`),
    ...optional.map((property) => property === "og:locale"
      ? `<meta property="og:locale" content="${localeFor(relativePath)}">`
      : `<meta property="og:image:alt" content="${title}">`),
  ].join("");

  const headEnd = html.search(/<\/head>/i);
  if (headEnd === -1) throw new Error(`Missing </head> in ${relativePath}`);
  html = `${html.slice(0, headEnd)}${tags}${html.slice(headEnd)}`;
  changed += 1;
  touched.push(relativePath);
  if (write) await writeFile(file, html, "utf8");
}

console.log(`${write ? "Updated" : "Would update"} ${changed} of ${files.length} HTML files.`);
for (const file of touched) console.log(file);

const validationErrors = [];
for (const file of files) {
  const relativePath = path.relative(root, file);
  const html = await readFile(file, "utf8");
  for (const property of required) {
    if (!metaPropertyExists(html, property)) validationErrors.push(`${relativePath}: missing ${property}`);
  }
}
if (validationErrors.length > 0) {
  throw new Error(`OpenGraph validation failed:\n${validationErrors.join("\n")}`);
}
console.log(`Validated the required OpenGraph tags in ${files.length} HTML files.`);
