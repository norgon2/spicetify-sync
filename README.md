# Spicetify Sync

Synchronize Spotify playback in real-time across multiple devices. One device acts as the **host** and controls playback; others join as **guests** and follow automatically.

## Requirements

- [Spicetify](https://spicetify.app/) installed and configured
- A running instance of the sync server (default: `spicetify-sync-server.onrender.com`)
- Node.js 18+ (for self-hosting the server)

## Installation

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

### Spicetify Marketplace

Search for **Spicetify Sync** in the Marketplace tab and click Install.

## Usage

1. Click the **⇄** icon in the Spotify toolbar (bottom right area)
2. Enter the server address (default: `spicetify-sync-server.onrender.com`)
3. Enter a username and a room name
4. Choose your role:
   - **Host** — your playback controls the room
   - **Guest** — your playback follows the host

### Co-host mode

Guests can enable co-host mode in settings to also send seek/play/pause events to the host.

## Self-hosting the server

```bash
git clone https://github.com/norgon2/spicetify-sync-server
cd spicetify-sync-server
npm install
node server.js
```

Then set the server address in the extension settings to your machine's IP or domain.

## Settings

| Option | Description |
|---|---|
| Auto-connect | Automatically reconnect when Spotify starts |
| Language | French or English interface |
| Notifications | Show status toast notifications |

## License

MIT
