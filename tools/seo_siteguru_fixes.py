"""Apply repeatable SiteGuru SEO fixes to the static multilingual site."""

from __future__ import annotations

import html
import json
import re
import sys
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
LANGUAGES = {"en", "uz", "tg", "es", "id"}
DESCRIPTION_SUFFIXES = {
    "ru": (" Подробный разбор.", " Подробный разбор с понятными примерами.", " Подробный разбор с понятными примерами и практическими выводами."),
    "en": (" Read the full guide.", " A clear guide with practical examples.", " A clear guide with practical examples and useful takeaways."),
    "uz": (" Batafsil qo‘llanma.", " Tushunarli misollar bilan batafsil qo‘llanma.", " Tushunarli misollar va amaliy xulosalar bilan batafsil qo‘llanma."),
    "tg": (" Шарҳи муфассал.", " Шарҳи муфассал бо мисолҳои фаҳмо.", " Шарҳи муфассал бо мисолҳои фаҳмо ва хулосаҳои амалӣ."),
    "es": (" Consulta la guía.", " Una guía clara con ejemplos prácticos.", " Una guía clara con ejemplos prácticos y conclusiones útiles."),
    "id": (" Baca panduan lengkap.", " Panduan lengkap dengan contoh praktis.", " Panduan lengkap dengan contoh praktis dan kesimpulan yang mudah dipahami."),
}
DESCRIPTION_MARKERS = (
    "Подробный разбор",
    "Read the full guide",
    "A clear guide",
    "Batafsil qo‘llanma",
    "Tushunarli misollar",
    "Шарҳи муфассал",
    "Consulta la guía",
    "Una guía clara",
    "Baca panduan lengkap",
    "Panduan lengkap",
)
TEXT_EXTENSIONS = {".html", ".css", ".js"}
SIMULATOR_DESCRIPTIONS = {
    "ru": "Бесплатный образовательный симулятор {name}: изучайте вероятность, риск и механику результатов на виртуальных примерах без ставок на реальные деньги.",
    "en": "Free educational {name} simulator: explore probability, risk and game mechanics through virtual examples without betting or using real money.",
    "uz": "Bepul {name} ta’limiy simulyatori: virtual misollarda ehtimollik, xavf va o‘yin mexanikasini real pul tikmasdan o‘rganing va natijalarni tahlil qiling.",
    "tg": "Симулятори ройгони омӯзишии {name}: эҳтимолият, хавф ва механикаи бозиро бо мисолҳои виртуалӣ, бе шартгузории пули воқеӣ омӯзед.",
    "es": "Simulador educativo gratuito de {name}: explora la probabilidad, el riesgo y las mecánicas mediante ejemplos virtuales, sin apuestas ni dinero real.",
    "id": "Simulator edukatif {name} gratis: pelajari probabilitas, risiko, dan mekanisme permainan melalui contoh virtual tanpa taruhan atau uang sungguhan.",
}


def language_for(path: Path) -> str:
    relative = path.relative_to(ROOT)
    return relative.parts[0] if relative.parts[0] in LANGUAGES else "ru"


def shorten_title(value: str) -> str:
    if len(value) <= 70:
        return value
    suffix = " — Gamer Logic Hub"
    shortened = value[: -len(suffix)] if value.endswith(suffix) else value
    if len(shortened) <= 70:
        return shortened
    candidate = shortened[:69].rsplit(" ", 1)[0].rstrip(" —:,-")
    return candidate or shortened[:70]


def normalize_description(value: str, language: str) -> str:
    normalized = value.strip()
    for marker in DESCRIPTION_MARKERS:
        marker_position = normalized.find(" " + marker)
        if marker_position >= 0:
            normalized = normalized[:marker_position].rstrip()
    if len(normalized) < 120:
        base = normalized.rstrip(" .") + "."
        for suffix in DESCRIPTION_SUFFIXES[language]:
            candidate = base + suffix
            if 120 <= len(candidate) <= 170:
                return candidate
        normalized = base + DESCRIPTION_SUFFIXES[language][-1]
    if len(normalized) > 170:
        normalized = normalized[:168].rsplit(" ", 1)[0].rstrip(" ,;:-") + "."
    return normalized


def canonical_url(path: Path) -> str:
    relative = path.relative_to(ROOT).as_posix()
    return f"https://gamer-logic-hub.com/{relative}"


def simulator_name(path: Path) -> str:
    return path.stem.removeprefix("simulator-").replace("-", " ").title().replace("Rtp", "RTP")


def simulator_description(path: Path) -> str:
    language = language_for(path)
    return normalize_description(
        SIMULATOR_DESCRIPTIONS[language].format(name=simulator_name(path)), language
    )


def add_simulator_schema(document: str, path: Path) -> tuple[str, bool]:
    if not path.name.startswith("simulator-"):
        return document, False
    title_match = re.search(r"<title>(.*?)</title>", document, re.I | re.S)
    description_match = re.search(
        r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']\s*/?>',
        document,
        re.I | re.S,
    )
    lang_match = re.search(r'<html\s+lang=["\']([^"\']+)', document, re.I)
    if not title_match or not description_match:
        return document, False
    payload = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": html.unescape(title_match.group(1).strip()),
        "description": html.unescape(description_match.group(1).strip()),
        "url": canonical_url(path),
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript and a modern web browser",
        "isAccessibleForFree": True,
        "inLanguage": lang_match.group(1) if lang_match else language_for(path),
        "publisher": {
            "@type": "Organization",
            "name": "Gamer Logic Hub",
            "url": "https://gamer-logic-hub.com/",
        },
    }
    schema = (
        '<script type="application/ld+json">'
        + json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
        + "</script>"
    )
    web_app_pattern = re.compile(
        r'<script\s+type=["\']application/ld\+json["\']>\s*({.*?"@type"\s*:\s*"WebApplication".*?})\s*</script>',
        re.I | re.S,
    )
    if web_app_pattern.search(document):
        updated = web_app_pattern.sub(schema, document, count=1)
        return updated, updated != document
    return document.replace("</head>", schema + "</head>", 1), True


def image_dimensions(src: str, page: Path) -> tuple[int, int] | None:
    if re.match(r"(?:https?:|data:|//)", src):
        return None
    image_path = (page.parent / src.split("?", 1)[0].split("#", 1)[0]).resolve()
    try:
        image_path.relative_to(ROOT)
        with Image.open(image_path) as image:
            return image.size
    except (OSError, ValueError):
        return None


def optimize_img_tags(document: str, path: Path) -> tuple[str, int]:
    image_index = 0
    changed = 0

    def replace(match: re.Match[str]) -> str:
        nonlocal image_index, changed
        tag = match.group(0)
        original = tag
        image_index += 1
        if not re.search(r"\bdecoding=", tag, re.I):
            tag = tag[:-1] + ' decoding="async">'
        if not re.search(r"\bloading=", tag, re.I):
            loading = "eager" if image_index == 1 else "lazy"
            tag = tag[:-1] + f' loading="{loading}">'
        if image_index == 1 and not re.search(r"\bfetchpriority=", tag, re.I):
            tag = tag[:-1] + ' fetchpriority="high">'
        src_match = re.search(r'\bsrc=["\']([^"\']+)["\']', tag, re.I)
        if src_match and not re.search(r"\bwidth=", tag, re.I) and not re.search(r"\bheight=", tag, re.I):
            size = image_dimensions(src_match.group(1), path)
            if size:
                tag = tag[:-1] + f' width="{size[0]}" height="{size[1]}">'
        if tag != original:
            changed += 1
        return tag

    return re.sub(r"<img\b[^>]*>", replace, document, flags=re.I), changed


def convert_large_pngs() -> dict[str, str]:
    replacements: dict[str, str] = {}
    for source in sorted((ROOT / "media").glob("*.png")):
        if source.stat().st_size < 180_000:
            continue
        target = source.with_suffix(".webp")
        if not target.exists() or target.stat().st_mtime < source.stat().st_mtime:
            with Image.open(source) as image:
                image.save(target, "WEBP", quality=82, method=6)
        replacements[source.name] = target.name
    return replacements


def rewrite_image_references(replacements: dict[str, str]) -> int:
    changed = 0
    for path in ROOT.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in TEXT_EXTENSIONS:
            continue
        document = path.read_text(encoding="utf-8")
        updated = document
        for old, new in replacements.items():
            updated = updated.replace(old, new)
        if updated != document:
            path.write_text(updated, encoding="utf-8", newline="")
            changed += 1
    return changed


def update_html(path: Path) -> dict[str, int]:
    document = path.read_text(encoding="utf-8")
    updated = document
    stats = {"title": 0, "description": 0, "schema": 0, "images": 0}

    title_match = re.search(r"<title>(.*?)</title>", updated, re.I | re.S)
    if title_match:
        old_title = title_match.group(1).strip()
        new_title = shorten_title(old_title)
        if new_title != old_title:
            head, separator, body = updated.partition("</head>")
            head = head.replace(old_title, new_title)
            updated = head + separator + body
            stats["title"] = 1

    description_match = re.search(
        r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']\s*/?>',
        updated,
        re.I | re.S,
    )
    if description_match:
        old_description = description_match.group(1).strip()
        new_description = (
            simulator_description(path)
            if path.name.startswith("simulator-")
            else normalize_description(old_description, language_for(path))
        )
        if new_description != old_description:
            head, separator, body = updated.partition("</head>")
            head = head.replace(old_description, new_description)
            updated = head + separator + body
            stats["description"] = 1

    head, separator, body = updated.partition("</head>")
    if separator:
        marker_pattern = "|".join(re.escape(marker) for marker in DESCRIPTION_MARKERS)
        body = re.sub(rf"\s+(?:{marker_pattern})[^<]*?\.", "", body)
        updated = head + separator + body

    updated, schema_added = add_simulator_schema(updated, path)
    stats["schema"] = int(schema_added)
    updated, stats["images"] = optimize_img_tags(updated, path)

    if updated != document:
        path.write_text(updated, encoding="utf-8", newline="")
    return stats


def main() -> None:
    if "--check" in sys.argv:
        validate()
        return
    replacements = convert_large_pngs()
    reference_files = rewrite_image_references(replacements)
    totals = {"title": 0, "description": 0, "schema": 0, "images": 0}
    pages = [path for path in ROOT.rglob("*.html") if "work" not in path.parts]
    for path in pages:
        stats = update_html(path)
        for key, value in stats.items():
            totals[key] += value
    before = sum((ROOT / "media" / old).stat().st_size for old in replacements)
    after = sum((ROOT / "media" / new).stat().st_size for new in replacements.values())
    print(
        json.dumps(
            {
                "pages": len(pages),
                "html_changes": totals,
                "converted_images": len(replacements),
                "reference_files": reference_files,
                "image_bytes_before": before,
                "image_bytes_after": after,
            },
            ensure_ascii=False,
            indent=2,
        )
    )


def validate() -> None:
    pages = [path for path in ROOT.rglob("*.html") if "work" not in path.parts]
    problems: dict[str, list[object]] = {
        "titles": [],
        "descriptions": [],
        "schema": [],
        "schema_description": [],
        "json_ld": [],
        "images": [],
    }
    for path in pages:
        document = path.read_text(encoding="utf-8")
        title = re.search(r"<title>(.*?)</title>", document, re.I | re.S)
        if title and not 15 <= len(title.group(1).strip()) <= 70:
            problems["titles"].append([str(path.relative_to(ROOT)), len(title.group(1).strip())])
        description = re.search(
            r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']\s*/?>',
            document,
            re.I | re.S,
        )
        if description and not 120 <= len(description.group(1).strip()) <= 170:
            problems["descriptions"].append(
                [str(path.relative_to(ROOT)), len(description.group(1).strip())]
            )
        if path.name.startswith("simulator-") and "application/ld+json" not in document:
            problems["schema"].append(str(path.relative_to(ROOT)))
        for payload in re.findall(
            r'<script\s+type=["\']application/ld\+json["\']>(.*?)</script>',
            document,
            re.I | re.S,
        ):
            try:
                parsed = json.loads(payload)
                if (
                    path.name.startswith("simulator-")
                    and isinstance(parsed, dict)
                    and parsed.get("@type") == "WebApplication"
                    and description
                    and parsed.get("description") != html.unescape(description.group(1).strip())
                ):
                    problems["schema_description"].append(str(path.relative_to(ROOT)))
            except json.JSONDecodeError as error:
                problems["json_ld"].append([str(path.relative_to(ROOT)), str(error)])
        for tag in re.findall(r"<img\b[^>]*>", document, re.I):
            if "decoding=" not in tag or "loading=" not in tag:
                problems["images"].append(str(path.relative_to(ROOT)))
    print(
        json.dumps(
            {
                "pages": len(pages),
                "problem_counts": {key: len(value) for key, value in problems.items()},
                "problems": problems,
            },
            ensure_ascii=False,
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
