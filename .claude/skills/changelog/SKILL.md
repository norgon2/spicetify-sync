# Skill changelog

Génère un changelog lisible en français depuis les commits git du projet.

## Instructions

1. Récupère les commits depuis le dernier tag ou depuis le début :
   ```powershell
   git log --oneline --no-merges --format="%h %s" 2>$null
   ```

2. Groupe les commits par catégorie selon leur préfixe :
   - `fix:` / `fix ` → **Corrections**
   - `feat:` / `feature:` → **Nouveautés**
   - `refactor:` / `chore:` → **Améliorations internes**
   - `release:` → **Releases**
   - autres → **Divers**

3. Traduis et reformule chaque message en français clair et humain — pas le message git brut, une vraie description de ce qui a changé pour l'utilisateur.

4. Affiche le résultat formaté en markdown.

## Format de sortie

```markdown
## Changelog — Spicetify Sync

### Corrections
- Le bouton de la barre d'outils ne restait plus bloqué sur "co-host" après la déconnexion de l'hôte
- …

### Nouveautés
- …

### Améliorations internes
- …
```

Si le repo a des tags git, regroupe par version (`git tag --sort=-creatordate`).
Affiche les commits les plus récents en premier.
