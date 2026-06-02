# Spicetify Sync — Project Rules

## Stack
- **Extension**: Vanilla JS (`sync.js`), runs inside Spotify via [Spicetify](https://spicetify.app/)
- **Server**: Node.js + Socket.io, hosted at `https://spicetify-sync-server.onrender.com`
- **Extension name**: Spicetify Sync
- **Server repo**: github.com/norgon2/spicetify-sync (same repo, server code lives alongside the extension)

## Workflow after any sync.js change

1. `spicetify apply` — reloads the extension into Spotify
2. Copy `sync.js` → `%APPDATA%\spicetify\Extensions\sync.js` before committing
3. `git add . && git commit && git push` to github.com/norgon2/spicetify-sync

## Hard rules — never break these

### Toolbar button CSS class mechanism
Do NOT modify the class-copy mechanism in `createToolbarButton()`:
```js
const nativeBtn = document.querySelector(".main-nowPlayingBar-extraControls button");
if (nativeBtn && nativeBtn.className) {
  btn.className = nativeBtn.className;
}
```
This copies Spotify's native button classes at runtime so the icon inherits the correct theme styling. Changing or removing it breaks the button appearance across Spotify updates.

### Deploy checklist (every change)
- Run `spicetify apply` after every modification to `sync.js`
- Copy `sync.js` to `%APPDATA%\spicetify\Extensions\sync.js` before committing
- Push to GitHub after `spicetify apply`

## Key file
- `sync.js` — the entire extension, single self-contained IIFE

## sync.js function map (lines offset by ~8 due to socket.io header)

### State & utilities (lines ~41–74)
| Ligne | Fonction | Rôle |
|-------|----------|------|
| 41 | `suppressFor(ms)` | Incrémente `suppressCount` pendant `ms` ms pour ignorer les events Player locaux provoqués par une commande distante |
| 46 | `isController()` | Retourne `true` si `role === "host"` ou (co-hôte actif et guest) |
| 50 | `escHtml(v)` | Échappe `& < >` pour insertion dans innerHTML |
| 56 | `isSpotifyUri(v)` | Valide le format `spotify:type:22chars` |
| 59 | `isSafeNum(v,min,max)` | Vérifie que v est un nombre fini dans les bornes |
| 74 | `saveSetting(key,value)` | Persiste un paramètre dans localStorage et met à jour `settings` |

### i18n (lines ~151–159)
| Ligne | Fonction | Rôle |
|-------|----------|------|
| 151 | `getLang()` | Retourne `"fr"` ou `"en"` selon `settings.lang` + `navigator.language` |
| 156 | `t(key,...args)` | Lookup de traduction avec fallback EN |

### Audio (line ~165)
| Ligne | Fonction | Rôle |
|-------|----------|------|
| 165 | `playBeep(join)` | Joue un bip Web Audio à la connexion/déconnexion d'un guest |

### Réseau (lines ~192–496)
| Ligne | Fonction | Rôle |
|-------|----------|------|
| 192 | `loadSocketIO(cb)` | No-op — socket.io est bundlé inline, appelle `cb()` immédiatement |
| 197 | `connect(selectedRole)` | Crée le socket, enregistre tous les handlers serveur, émet `register` |
| 481 | `disconnect()` | Coupe le socket, remet l'état à zéro, met à jour l'UI |

### Player listeners (lines ~503–555)
| Ligne | Fonction | Rôle |
|-------|----------|------|
| 503 | `onSongChange()` | Émet `change_track` quand le contrôleur change de piste |
| 516 | `onPlayPause()` | Émet `play` ou `pause` quand le contrôleur joue/pause |
| 533 | `onVolumeChange()` | Émet `volume_change` si `volumeSync` est activé |
| 541 | `registerPlayerListeners()` | Attache les 3 listeners Player (idempotent) |
| 549 | `unregisterPlayerListeners()` | Détache les 3 listeners Player |

### Seek poll (lines ~569–640)
| Ligne | Fonction | Rôle |
|-------|----------|------|
| 569 | `resetSeekBaseline(pos)` | Remet la baseline position+temps pour le seek poll |
| 576 | `startSeekPoll()` | Lance la boucle de détection de seek manuel (50 ms playing / 200 ms paused) |
| 632 | `stopSeekPoll()` | Arrête la boucle et remet les variables à null |

### UI — helpers panel (lines ~645–806)
| Ligne | Fonction | Rôle |
|-------|----------|------|
| 645 | `getPanel()` | Retourne `#sync-panel` ou null |
| 646 | `qs(parent,sel)` | Alias `parent.querySelector(sel)` |
| 648 | `resetPanelUI()` | Remet le panneau en état déconnecté (inputs visibles) |
| 661 | `setConnectedPanelUI(r)` | Affiche le panneau connecté (statut, code, co-hôte) |
| 684 | `setReconnectingPanelUI(n)` | Affiche le statut reconnexion avec numéro de tentative |
| 701 | `setWaitingPanelUI()` | Affiche "En attente de l'hôte" |
| 717 | `updateRoomInfo(h,g)` | Met à jour la ligne hosts/guests dans le panneau |
| 734 | `updateCohostSection()` | Synchronise le toggle co-hôte et la note guest |
| 753 | `showNotification(msg,err)` | Délègue à `Spicetify.showNotification` |
| 757 | `updateToolbarCode()` | Affiche/masque le code room sous le bouton toolbar |
| 768 | `updateToolbarGuestCount(n)` | Affiche/masque le badge guests sur le bouton toolbar |
| 779 | `updateButtonState()` | Met à jour label, couleur et badges du bouton toolbar |

### UI — panel & toolbar (lines ~811–1392)
| Ligne | Fonction | Rôle |
|-------|----------|------|
| 811 | `injectStyles()` | Injecte le `<style>` CSS de l'extension (idempotent) |
| 952 | `closePanel()` | Ferme le panneau avec animation pop-out |
| 958 | `buildPanel()` | Construit et monte le panneau complet dans le DOM |
| 1194 | `saveInputs(role)` | Lit serverIP/username/roomCode depuis les inputs et les persiste |
| 1288 | `createToolbarButton()` | Crée et monte le bouton SVG dans la barre Spotify |

### Init (lines ~1359–1392)
| Ligne | Fonction | Rôle |
|-------|----------|------|
| 1359 | `maybeAutoConnect()` | Lance `connect(lastRole)` au démarrage si `autoConnect` est actif |
| 1371 | `init()` | Attend que le DOM Spotify soit prêt (max 20 tentatives) puis initialise |
