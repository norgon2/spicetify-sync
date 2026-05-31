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
