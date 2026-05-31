# Spicetify Sync

Synchronize Spotify playback in real-time across multiple devices. One device acts as the **host** and controls playback; others join as **guests** and follow automatically.

## Features

- Real-time playback sync (play, pause, seek, track changes)
- Automatic latency compensation
- Co-host mode — guests can take control of playback
- Volume sync between host and guests
- Room codes for isolated sessions
- French and English interface

## Requirements

- [Spicetify](https://spicetify.app/) installed and configured
- A running instance of the sync server (default: `spicetify-sync-server.onrender.com`)

## Installation

### Spicetify Marketplace

Search for **Spicetify Sync** in the Marketplace tab and click Install.

### Manual

1. Download `sync.js` from the [releases page](https://github.com/norgon2/spicetify-sync/releases)
2. Copy it to your Spicetify extensions folder:
   - Windows: `%APPDATA%\spicetify\Extensions\`
   - macOS/Linux: `~/.config/spicetify/Extensions/`
3. Run in a terminal:
   ```
   spicetify config extensions sync.js
   spicetify apply
   ```

## Usage

1. Click the **⇄** icon in the Spotify toolbar (bottom right area)
2. Enter the server address (default is pre-filled)
3. Enter a username
4. Choose your role:
   - **Host** — your playback controls the room; a 6-character room code is generated for you
   - **Guest** — enter the host's room code and follow their playback automatically

### Co-host mode

The host can enable **co-host mode** via the toggle in the panel. When active, all guests can also control playback (play, pause, seek) for the whole room.

## Settings

| Option | Description |
|---|---|
| Language | French or English interface |
| Auto-connect | Automatically reconnect when Spotify starts using your last role |
| Sound notifications | Play a sound when guests join or leave |
| Show code in toolbar | Display the active room code next to the toolbar button |
| Volume sync | Sync volume changes from the host to all guests |
| Sync delay (ms) | Extra offset (0–500 ms) to compensate for custom network latency |

## Self-hosting the server

```bash
git clone https://github.com/norgon2/spicetify-sync
cd spicetify-sync
npm install
node server.js
```

Then set the server address in the extension to your machine's IP or domain.

## License

MIT
