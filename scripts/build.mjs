// Build : lit tous les hymns/**/*.md et produit dist/cantiques.json
// (+ dist/cantiques.by-language.json). Ne modifie jamais les sources.

import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

import { HYMNS_DIR, DIST_DIR, textToHtml } from "./lib/hymn.mjs";

async function walk(dir) {
  const out = [];
  let entries = [];
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (e.isFile() && e.name.endsWith(".md")) out.push(full);
  }
  return out;
}

async function main() {
  const files = (await walk(HYMNS_DIR)).sort();
  console.log(`📚 ${files.length} fichier(s) cantique trouvé(s).`);

  const hymns = [];
  for (const file of files) {
    const raw = await fs.readFile(file, "utf8");
    const { data, content } = matter(raw);
    const text = content.trim();
    hymns.push({
      ...data,
      content: text, // texte clair
      contentHtml: textToHtml(text), // HTML prêt pour l'app / WebView
    });
  }

  hymns.sort((a, b) => {
    const l = String(a.language).localeCompare(String(b.language));
    if (l !== 0) return l;
    return (Number(a.number) || 0) - (Number(b.number) || 0);
  });

  await fs.mkdir(DIST_DIR, { recursive: true });

  const all = {
    generatedAt: new Date().toISOString(),
    count: hymns.length,
    hymns,
  };
  await fs.writeFile(
    path.join(DIST_DIR, "cantiques.json"),
    JSON.stringify(all, null, 2),
    "utf8"
  );

  const byLang = {};
  for (const h of hymns) (byLang[h.language] ||= []).push(h);
  await fs.writeFile(
    path.join(DIST_DIR, "cantiques.by-language.json"),
    JSON.stringify(byLang, null, 2),
    "utf8"
  );

  console.log(`✅ dist/cantiques.json (${hymns.length} cantiques)`);
  for (const [lang, arr] of Object.entries(byLang).sort()) {
    console.log(`   • ${lang}: ${arr.length}`);
  }
}

main().catch((err) => {
  console.error("💥 Erreur :", err);
  process.exit(1);
});
