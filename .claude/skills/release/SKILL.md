# Release Skill

Runs a full release cycle for the Spicetify Sync extension:
1. Code review at max effort, fixes all bugs found
2. Copies `sync.js` to the Spicetify extensions folder
3. Runs `spicetify apply` to reload the extension in Spotify
4. Commits and pushes to GitHub

## Steps

### 1. Code review and fix

Run `/code-review max --fix` to find and fix bugs in the current diff.

### 2. Sync to Spicetify

Copy the extension file to Spicetify's extensions directory:

```powershell
Copy-Item C:\spicetify-sync-extension\sync.js "$env:APPDATA\spicetify\Extensions\sync.js" -Force
```

### 3. Apply to Spotify

```powershell
spicetify apply
```

### 4. Commit and push

```powershell
git add C:\spicetify-sync-extension\sync.js
git commit -m "release: apply fixes and sync"
git push
```

Confirm success by checking that Spotify reloaded without errors and the push reached github.com/norgon2/spicetify-sync.
