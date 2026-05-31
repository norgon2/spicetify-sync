# Skill test-scenarios

Simule tous les cas d'usage de l'extension Spicetify Sync et identifie les bugs potentiels.

## Instructions

Lis `sync.js` en entier, puis raisonne sur chaque scénario ci-dessous. Pour chaque scénario, décris :
- ce qui devrait se passer
- ce qui se passe réellement dans le code
- tout bug ou incohérence détecté

## Scénarios à couvrir

### Connexion initiale
1. L'utilisateur ouvre le panneau et clique "Host"
2. L'utilisateur ouvre le panneau et clique "Guest" avec un code valide
3. L'utilisateur clique "Guest" sans saisir de code
4. Le serveur est inaccessible (connect_error)

### Synchronisation playback
5. L'hôte met en pause → les guests reçoivent `pause` avec position
6. L'hôte lance lecture → les guests reçoivent `play`
7. L'hôte seekte manuellement → déviation détectée par seekPoll
8. L'hôte change de piste → les guests reçoivent `change_track`
9. `sync_state` reçu avec URI différent de la piste actuelle
10. `sync_state` reçu avec URI identique (resync de position)

### Mode co-hôte
11. L'hôte active le co-hôte → guest devient contrôleur
12. Un guest co-hôte met en pause → l'événement est bien émis
13. L'hôte désactive le co-hôte → le guest perd le contrôle
14. `cohost_mode_changed` reçu pendant `waitingForHost=true`

### Déconnexion / reconnexion
15. L'hôte quitte (`host_left`) → guest passe en "Waiting for host"
16. L'hôte revient (`host_connected`) → guest resynchronise
17. La connexion est perdue (`disconnect` non-client) → reconnexion auto
18. Reconnexion réussie (`reconnect_attempt` puis `connect` + `registered`)

### Volume
19. L'hôte change le volume avec `volumeSync=true` → guest suit
20. L'hôte change le volume avec `volumeSync=false` → aucun effet

### UI
21. Ouverture du panneau pendant la connexion active
22. Ouverture du panneau pendant `waitingForHost=true`
23. Ouverture du panneau pendant la reconnexion
24. Changement de langue depuis les paramètres
25. `showCode=true` → le code apparaît dans la barre d'outils

### Edge cases
26. Deux événements `host_left` consécutifs
27. `cohost_mode_changed` alors que le socket est déconnecté
28. `seek` avec `sentAt` très vieux (>3s) → compensation plafonnée à 1500ms
29. `position = 0` dans `pause` → Player.seek(0) bien appelé
30. `suppressCount > 0` → les événements player locaux sont ignorés

## Format de sortie

Pour chaque bug trouvé :
```
**[SCÉNARIO N] Titre court**
État initial : …
Ce qui se passe : …
Bug : …
Correction suggérée : …
```

Si aucun bug : "✓ Aucun bug détecté pour ce scénario."
