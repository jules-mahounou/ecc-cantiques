# 🎵 ECC-Cantique — Dictionnaire ouvert de cantiques

Un **dictionnaire open-source et collaboratif** de cantiques, en plusieurs langues
(**anglais, français, goun, yoruba**). Chaque cantique est un simple fichier texte
que **n'importe qui peut lire, corriger et enrichir** via une *pull request* GitHub.

Pensé comme une **librairie de données** : les développeurs peuvent récupérer les
cantiques et bâtir leurs propres applications par-dessus.

> **Auteur & mainteneur :** Jules Mahounou.

---

## 📖 Comment ça marche

- **Source de vérité** : chaque cantique = un fichier [Markdown](docs/FORMAT.md)
  avec un en-tête YAML (métadonnées) + les paroles en texte clair.
- **Organisation** : rangés par langue dans `hymns/<langue>/`.
- **Build** : un script génère `dist/cantiques.json`, prêt à être consommé par
  n'importe quelle application ou langage.
- **Qualité** : chaque contribution est validée automatiquement (CI) contre un schéma.

```
hymns/anglais/0001.md   ──►  npm run build  ──►  dist/cantiques.json
hymns/goun/0046.md
```

## 📦 Récupérer / consulter la donnée (pour les développeurs)

Aucun serveur, aucune inscription. Deux moyens recommandés :

### 1. Via le CDN jsDelivr (URL directe, versionnée)

```js
// Dernière version publiée (un tag Git, ex: v1.0.0)
const res = await fetch(
  "https://cdn.jsdelivr.net/gh/<org>/ECC-Cantique@v1.0.0/dist/cantiques.json"
);
const { hymns } = await res.json();
```

> Remplace `<org>` par le compte/organisation GitHub et le tag par la version voulue.
> Épingler un tag précis (plutôt que `@main`) garantit une donnée stable et mise en cache.

### 2. Via les GitHub Releases

Chaque version publie `cantiques.json` en **asset** téléchargeable
(voir l'onglet *Releases* du dépôt) — idéal pour les apps hors-ligne et tout langage
(Flutter, Python, Kotlin, Swift…).

### Forme des données

```json
{
  "generatedAt": "2026-10-19T...",
  "count": 1559,
  "hymns": [
    {
      "id": "goun_46",
      "number": 46,
      "language": "goun",
      "title": "Mi gbo mi n'dopẹ na 'To",
      "key": "",
      "tags": [],
      "content": "paroles en texte clair…",
      "contentHtml": "<p>…</p>"
    }
  ]
}
```

Chaque cantique fournit `content` (texte brut) **et** `contentHtml` (prêt pour une
WebView). Les variantes d'un même numéro portent un champ `variant` (ex: `bis`, `v2`).

## 🗂️ Arborescence

```
ECC-Cantique/
├── hymns/                 # LA source de vérité (éditée par les humains)
│   ├── anglais/  francais/  goun/  yoruba/
├── dist/                  # cantiques.json généré (servi via CDN / Releases)
├── schema/hymn.schema.json
├── scripts/               # build.mjs + validate.mjs (aucune dépendance externe de données)
├── docs/FORMAT.md
├── .github/workflows/     # CI (validation) + release
├── CONTRIBUTING.md  CODE_OF_CONDUCT.md  LICENSE
```

## 🚀 Développement local

```bash
npm install
npm run validate     # valide tous les cantiques
npm run build        # (re)génère dist/cantiques.json
```

## 🤝 Contribuer

Correction d'une faute, couplet manquant, nouveau cantique, nouvelle langue…
tout est bienvenu. Lis [CONTRIBUTING.md](CONTRIBUTING.md) et le format
[docs/FORMAT.md](docs/FORMAT.md).

## 📜 Licence

Contenu (paroles, traductions) sous **CC BY-SA 4.0** ; code (scripts) sous **MIT**.
Voir [LICENSE](LICENSE).
