// Validation : vérifie que chaque hymns/**/*.md respecte le schéma
// et signale les doublons (même langue + même numéro). Code de sortie != 0 si erreur.

import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import Ajv from "ajv";

import { HYMNS_DIR, ROOT } from "./lib/hymn.mjs";

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
  const schema = JSON.parse(
    await fs.readFile(path.join(ROOT, "schema", "hymn.schema.json"), "utf8")
  );
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);

  const files = (await walk(HYMNS_DIR)).sort();
  const errors = [];
  const seen = new Map(); // language::number -> file

  for (const file of files) {
    const rel = path.relative(ROOT, file);
    let parsed;
    try {
      parsed = matter(await fs.readFile(file, "utf8"));
    } catch (e) {
      errors.push(`${rel}: YAML illisible — ${e.message}`);
      continue;
    }
    const data = parsed.data;

    if (!validate(data)) {
      for (const err of validate.errors) {
        errors.push(`${rel}: ${err.instancePath || "/"} ${err.message}`);
      }
    }

    if (!parsed.content.trim()) {
      errors.push(`${rel}: le corps (paroles) est vide.`);
    }

    // Les variantes volontaires partagent langue+numéro mais diffèrent par `variant`.
    const dupKey = `${data.language}::${data.number}::${data.variant ?? ""}`;
    if (seen.has(dupKey)) {
      errors.push(`${rel}: doublon (langue+numéro+variant) avec ${seen.get(dupKey)}`);
    } else {
      seen.set(dupKey, rel);
    }
  }

  console.log(`🔎 ${files.length} fichier(s) vérifié(s).`);
  if (errors.length) {
    console.error(`❌ ${errors.length} problème(s) :`);
    for (const e of errors) console.error("   • " + e);
    process.exit(1);
  }
  console.log("✅ Tout est valide.");
}

main().catch((err) => {
  console.error("💥 Erreur :", err);
  process.exit(1);
});
