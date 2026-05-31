# Changelog

## v1.1.0

### Corrections
- La barre d'outils affiche maintenant "Sync: waiting for host" quand l'hôte n'est pas encore connecté, au lieu de "Sync: listening"
- Le label de la barre d'outils est mis à jour immédiatement quand l'hôte quitte en mode co-hôte (il restait bloqué sur "Sync: co-host mode")
- La barre d'outils est maintenant correctement mise à jour quand l'hôte se reconnecte
- En mode co-hôte, la note "vous pouvez contrôler la lecture" n'apparaît plus quand on attend l'hôte
- Le statut "En attente de l'hôte" s'affiche maintenant aussi quand on rejoint une room avant l'hôte (premier arrivant)
- L'événement `pause` avec `position = 0` déclenche bien un seek au début du morceau (régression de type `=== undefined` → `!= null`)
- Les informations de room sont rafraîchies dans le panneau quand l'hôte se reconnecte

## v1.0.0

### Fonctionnalités initiales
- Synchronisation en temps réel de la lecture Spotify (lecture, pause, seek, changement de piste)
- Rôles hôte et invité avec codes de room à 6 caractères
- Mode co-hôte : les invités peuvent contrôler la lecture pour toute la room
- Compensation automatique de la latence réseau
- Synchronisation du volume
- Notifications sonores quand un invité rejoint ou quitte
- Interface en français et en anglais
- Reconnexion automatique
- Affichage du code de room dans la barre d'outils
- Délai de sync configurable (0–500 ms)
