# Format d'un cantique

Chaque cantique est **un fichier Markdown** (`.md`) rangé dans `hymns/<langue>/`.
Le nom du fichier est le numéro du cantique sur 4 chiffres : `0001.md`, `0042.md`…

Un fichier a deux parties :

1. un **en-tête YAML** (entre deux lignes `---`) contenant les métadonnées ;
2. le **corps** : les paroles, en texte clair.

## Exemple

```markdown
---
id: anglais_1
number: 1
language: anglais
title: The host of Angels
key: ""
source_side: right
tags: []
---

The host of Angels full of joy in heaven,
The host of Angels

They are praising God with joyful songs in heaven.
Amen
```

## Champs de l'en-tête

| Champ         | Obligatoire | Type    | Description                                                  |
|---------------|-------------|---------|--------------------------------------------------------------|
| `id`          | oui         | texte   | Identifiant stable (repris de la base d'origine).            |
| `number`      | oui         | entier  | Numéro du cantique dans son recueil / sa langue.             |
| `language`    | oui         | texte   | Langue du cantique (`anglais`, `francais`, `goun`, …).       |
| `title`       | oui         | texte   | Titre du cantique.                                           |
| `key`         | non         | texte   | Tonalité / clé musicale (ex: `C`, `G`), vide si inconnue.    |
| `source_side` | non         | texte   | Métadonnée d'origine (`left` / `right`), facultative.        |
| `variant`     | non         | texte   | Étiquette (ex: `v2`, `bis`) quand 2 cantiques partagent un numéro. |
| `tags`        | non         | liste   | Mots-clés libres (thème, fête, auteur…).                     |

> **Variantes** : quand un même numéro a deux versions, la version principale
> est `NNNN.md` (sans `variant`) et l'autre `NNNNb.md` avec un champ `variant`.

> Tu peux ajouter de nouveaux champs facultatifs, mais garde les champs
> obligatoires. La validation (`npm run validate`) refuse un fichier invalide.

## Règles pour le corps (les paroles)

- Une **ligne vide** sépare deux strophes / couplets.
- Garde une ligne par vers (comme on chante).
- Pas de HTML : écris du texte normal. Le script de build se charge de produire
  le HTML pour l'application.
- Les notations sol-fa (`d r m f s l t`), refrains, indications `(Nisẹ)` / `Bẹji:`
  se gardent telles quelles, sur leurs propres lignes.

## Et le JSON pour l'app ?

Tu n'édites **jamais** le JSON à la main. Il est généré :

```bash
npm run build   # lit tous les hymns/**/*.md et écrit dist/cantiques.json
```
