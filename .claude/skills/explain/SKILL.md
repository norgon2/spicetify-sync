# Skill explain

Explique n'importe quel bout de code en français simple et accessible.

## Instructions

L'argument passé (`$ARGUMENTS`) est soit :
- un extrait de code directement
- un nom de fonction ou de variable à rechercher dans `sync.js`
- une description ("comment fonctionne le seekPoll ?")

### Si c'est un nom de fonction/variable
Lis `sync.js`, trouve la définition, et explique-la.

### Si c'est un extrait de code ou une description
Explique directement.

## Règles d'explication

- Français simple, pas de jargon technique non expliqué
- Commence par "En une phrase : …" pour le résumé
- Puis détaille étape par étape ce que fait le code
- Utilise des analogies concrètes si utile
- Mentionne les cas limites ou subtilités importantes
- Pas de blocs de code inutiles — cite le code seulement si nécessaire pour illustrer un point

## Exemple

Argument : `suppressFor`

Réponse :
> **En une phrase :** `suppressFor` empêche temporairement l'extension d'envoyer des événements au serveur après une action reçue du serveur, pour éviter les boucles.
>
> **Détail :** Quand l'extension reçoit une instruction du serveur (ex. "mets en pause"), elle exécute l'action sur Spotify. Mais Spotify déclenche alors un événement "onplaypause" que l'extension écouterait normalement pour le renvoyer au serveur — ce qui créerait une boucle infinie. `suppressFor(ms)` incrémente un compteur `suppressCount` et le décrémente après `ms` millisecondes. Pendant ce temps, les listeners ignorent les événements locaux.
