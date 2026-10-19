// Helpers partagés des scripts (chemins + rendu HTML des paroles).
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(__dirname, "..", "..");
export const HYMNS_DIR = path.join(ROOT, "hymns");
export const DIST_DIR = path.join(ROOT, "dist");

/** Rend du HTML (<p> par vers, <br> entre strophes) à partir du texte clair. */
export function textToHtml(text) {
  if (!text) return "";
  const parts = [];
  for (const raw of String(text).split(/\r?\n/)) {
    const line = raw.trim();
    if (line === "") {
      parts.push("<br>");
    } else {
      const esc = line
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      parts.push(`<p>${esc}</p>`);
    }
  }
  return parts.join("\n");
}
