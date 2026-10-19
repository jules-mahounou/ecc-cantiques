# Contribuer à ECC-Cantique

Merci de vouloir améliorer ce dictionnaire ouvert de cantiques ! 🙏
Toute contribution est la bienvenue : corriger une faute, compléter un couplet,
ajouter un cantique ou une langue entière.

## 1. Pour une petite correction (le plus simple)

1. Trouve le fichier du cantique dans `hymns/<langue>/<numéro>.md`.
2. Clique sur l'icône ✏️ (modifier) directement sur GitHub.
3. Corrige, puis propose une *pull request*. C'est tout !

## 2. Pour une contribution plus large (en local)

```bash
git clone https://github.com/jules-mahounou/ecc-cantiques.git
cd ecc-cantiques
npm install

# ... fais tes modifications dans hymns/ ...

npm run validate    # vérifie que tout est conforme
npm run build       # (optionnel) régénère dist/cantiques.json
```

Puis ouvre une pull request.

## Règles de contenu

- **Un fichier = un cantique.** Nom : le numéro sur 4 chiffres (`0042.md`).
- Respecte le [format](docs/FORMAT.md) : en-tête YAML + paroles en texte clair.
- Les champs obligatoires sont `id`, `number`, `language`, `title`.
- Pas de HTML dans les paroles — le texte clair suffit.
- Reste fidèle aux paroles originales ; indique tes sources dans la description
  de la PR quand c'est pertinent.

## Ajouter une nouvelle langue

Crée un dossier `hymns/<nom-de-langue>/` (en minuscules, sans accents si possible :
`francais`, `goun`, `yoruba`…) et ajoute tes fichiers dedans.

## Validation automatique

Chaque pull request est automatiquement vérifiée par la CI (schéma + doublons).
Si le job échoue, lis le message : il indique le fichier et le problème.

## Questions

Ouvre une [issue](../../issues) — on est là pour aider.
