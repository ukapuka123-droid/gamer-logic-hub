import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const locales = new Set(["en", "es", "uz", "tg", "id"]);
const extensions = new Set([".html", ".xml", ".js"]);
const ignoredDirectories = new Set([".git", "node_modules", "work"]);

const canonicalIndexUrls = new Map([
  ["https://gamer-logic-hub.com/index.html", "https://gamer-logic-hub.com/"],
  ["https://gamer-logic-hub.com/en/index.html", "https://gamer-logic-hub.com/en/"],
  ["https://gamer-logic-hub.com/es/index.html", "https://gamer-logic-hub.com/es/"],
  ["https://gamer-logic-hub.com/uz/index.html", "https://gamer-logic-hub.com/uz/"],
  ["https://gamer-logic-hub.com/tg/index.html", "https://gamer-logic-hub.com/tg/"],
  ["https://gamer-logic-hub.com/id/index.html", "https://gamer-logic-hub.com/id/"],
]);

function filesIn(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) return [];
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) return filesIn(target);
    return extensions.has(path.extname(entry.name)) ? [target] : [];
  });
}

function cleanRelativeIndexUrl(value, file) {
  const [pathname, suffix = ""] = value.split(/(?=[?#])/u, 2);
  if (!pathname.endsWith("index.html")) return value;

  const currentRelative = path.relative(root, file).replaceAll("\\", "/");
  const currentLocale = locales.has(currentRelative.split("/")[0])
    ? currentRelative.split("/")[0]
    : null;

  const withoutParents = pathname.replace(/^(?:\.\.\/)+/u, "");
  const explicitLocale = withoutParents.match(/^(en|es|uz|tg|id)\/index\.html$/u)?.[1];
  if (explicitLocale) return `/${explicitLocale}/${suffix}`;
  if (withoutParents !== "index.html") return value;

  const navigatesToRoot = pathname.startsWith("../") || !currentLocale;
  return navigatesToRoot ? `/${suffix}` : `/${currentLocale}/${suffix}`;
}

let changedFiles = 0;
let replacements = 0;

for (const file of filesIn(root)) {
  const original = fs.readFileSync(file, "utf8");
  let updated = original;

  for (const [source, target] of canonicalIndexUrls) {
    const occurrences = updated.split(source).length - 1;
    if (occurrences) {
      updated = updated.replaceAll(source, target);
      replacements += occurrences;
    }
  }

  if (path.extname(file) === ".html") {
    updated = updated.replace(
      /\b(href|action)=(['"])([^'"]*index\.html(?:[?#][^'"]*)?)\2/gu,
      (match, attribute, quote, value) => {
        const normalized = cleanRelativeIndexUrl(value, file);
        if (normalized === value) return match;
        replacements += 1;
        return `${attribute}=${quote}${normalized}${quote}`;
      },
    );
  }

  if (updated !== original) {
    fs.writeFileSync(file, updated, "utf8");
    changedFiles += 1;
  }
}

console.log(JSON.stringify({ changedFiles, replacements }, null, 2));
