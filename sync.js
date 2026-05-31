// Spicetify Sync Extension - v2
(function SpicetifySync() {
  const { Player, Platform, React, ReactDOM } = Spicetify;
  if (!Player || !Platform || !React || !ReactDOM) {
    setTimeout(SpicetifySync, 300);
    return;
  }

  // --------------------------------------------------------------------------
  // State
  // --------------------------------------------------------------------------
  let socket         = null;
  let role           = null;
  let serverIP       = localStorage.getItem("sync_serverIP") || "spicetify-sync-server.onrender.com";
  let username       = localStorage.getItem("sync_username") || "User";
  let isConnected    = false;
  let reconnecting   = false;
  let cohostMode     = false;
  let roomCode       = localStorage.getItem("sync_roomCode") || "";
  let lastVolume     = null;
  let lastGuestCount = null;
  let guestCount     = 0;
  let lastRoomInfo   = { hosts: 0, guests: 0, connected: 0 };

  let suppressCount = 0;
  function suppressFor(ms) {
    suppressCount++;
    setTimeout(() => { suppressCount = Math.max(0, suppressCount - 1); }, ms);
  }

  function isController() {
    return role === "host" || (cohostMode && role === "guest");
  }

  // --------------------------------------------------------------------------
  // Settings + i18n
  // --------------------------------------------------------------------------
  const settings = {
    autoConnect: localStorage.getItem("sync_autoConnect") === "true",
    lang:        localStorage.getItem("sync_lang") || "auto",
    showCode:    localStorage.getItem("sync_showCode") === "true",
    volumeSync:  localStorage.getItem("sync_volumeSync") === "true",
    syncDelay:   parseInt(localStorage.getItem("sync_syncDelay") || "0", 10),
    soundNotif:  localStorage.getItem("sync_soundNotif") !== "false",
  };
  function saveSetting(key, value) {
    localStorage.setItem(`sync_${key}`, String(value));
    settings[key] = value;
  }

  const I18N = {
    en: {
      appName: "Spicetify Sync",
      server: "Server", serverPh: "localhost or ngrok URL",
      username: "Username", usernamePh: "Your name",
      roomCode: "Room Code", roomCodePh: "6-char code (guests only)",
      yourCode: "Your room code", copyCode: "Copy",
      codeCopied: "Code copied!",
      host: "Host", guest: "Guest",
      disconnect: "Disconnect", cancel: "Cancel",
      statusHost: "You are the host",
      statusGuest: "Connected as guest",
      statusCohost: "Connected — co-host mode",
      statusRecon: "Reconnecting…",
      statusReconN: (n) => `Reconnecting… (attempt ${n})`,
      statusWaiting: "Waiting for host…",
      cohostLabel: "Co-host mode", cohostDesc: "Guests can skip, play & pause",
      cohostNote: "You can control playback for everyone.",
      settingsTitle: "Settings", back: "← Back",
      autoConnect: "Auto-connect", autoConnectDesc: "Reconnect on Spotify start",
      language: "Language",
      langAuto: "Auto (system)", langFr: "Français", langEn: "English",
      showCode: "Show code in toolbar", showCodeDesc: "Display active room code next to the button",
      volumeSync: "Volume sync", volumeSyncDesc: "Sync volume between host and guests",
      syncDelay: "Sync delay (ms)", syncDelayDesc: "Extra offset to compensate custom latency",
      soundNotif: "Notification sounds", soundNotifDesc: "Play a sound when guests join or leave",
      sectionGeneral: "General", sectionSession: "Session",
      connectedAs: (r, name) => `Connected as ${r} (${name})`,
      cohostModeOn: "Co-host mode ON — you can now control playback.",
      cohostModeOff: "Co-host mode OFF.",
      cannotReach: "Cannot reach server — retrying…",
      connLost: "Connection lost — reconnecting…",
      hostConnected: "Host connected — syncing…",
      hostLeft: "Host disconnected.",
    },
    fr: {
      appName: "Spicetify Sync",
      server: "Serveur", serverPh: "localhost ou URL ngrok",
      username: "Nom d'utilisateur", usernamePh: "Votre nom",
      roomCode: "Code de room", roomCodePh: "Code à 6 caractères (invités)",
      yourCode: "Votre code de room", copyCode: "Copier",
      codeCopied: "Code copié !",
      host: "Hôte", guest: "Invité",
      disconnect: "Déconnecter", cancel: "Annuler",
      statusHost: "Vous êtes l'hôte",
      statusGuest: "Connecté en tant qu'invité",
      statusCohost: "Connecté — mode co-hôte",
      statusRecon: "Reconnexion…",
      statusReconN: (n) => `Reconnexion… (tentative ${n})`,
      statusWaiting: "En attente de l'hôte…",
      cohostLabel: "Mode co-hôte", cohostDesc: "Les invités contrôlent la lecture",
      cohostNote: "Vous pouvez contrôler la lecture pour tous.",
      settingsTitle: "Paramètres", back: "← Retour",
      autoConnect: "Connexion automatique", autoConnectDesc: "Se reconnecter au démarrage",
      language: "Langue",
      langAuto: "Auto (système)", langFr: "Français", langEn: "English",
      showCode: "Afficher le code dans la barre", showCodeDesc: "Affiche le code de room actif à côté du bouton",
      volumeSync: "Sync du volume", volumeSyncDesc: "Synchronise le volume entre hôte et invités",
      syncDelay: "Délai de sync (ms)", syncDelayDesc: "Décalage supplémentaire pour compenser la latence",
      soundNotif: "Sons de notification", soundNotifDesc: "Joue un son quand un invité rejoint ou quitte",
      sectionGeneral: "Général", sectionSession: "Session",
      connectedAs: (r, name) => `Connecté en tant que ${r} (${name})`,
      cohostModeOn: "Mode co-hôte activé — vous pouvez contrôler la lecture.",
      cohostModeOff: "Mode co-hôte désactivé.",
      cannotReach: "Impossible de joindre le serveur — reconnexion…",
      connLost: "Connexion perdue — reconnexion…",
      hostConnected: "Hôte connecté — synchronisation…",
      hostLeft: "Hôte déconnecté.",
    },
  };
  function getLang() {
    if (settings.lang === "fr") return "fr";
    if (settings.lang === "en") return "en";
    return (navigator.language || "en").toLowerCase().startsWith("fr") ? "fr" : "en";
  }
  function t(key, ...args) {
    const lang = getLang();
    const v = (I18N[lang] ?? I18N.en)[key] ?? I18N.en[key] ?? key;
    return typeof v === "function" ? v(...args) : v;
  }

  // --------------------------------------------------------------------------
  // Web Audio beep
  // --------------------------------------------------------------------------
  function playBeep(join) {
    if (!settings.soundNotif) return;
    try {
      const ctx  = new (window.AudioContext || window.webkitAudioContext)();
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      if (join) {
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.setValueAtTime(1100, ctx.currentTime + 0.08);
      } else {
        osc.frequency.setValueAtTime(660, ctx.currentTime);
        osc.frequency.setValueAtTime(440, ctx.currentTime + 0.08);
      }
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.22);
      osc.onended = () => ctx.close();
    } catch (_) {}
  }

  // --------------------------------------------------------------------------
  // Socket.io loader
  // --------------------------------------------------------------------------
  let socketIOCallbacks = null;
  function loadSocketIO(callback) {
    if (window.io) { callback(); return; }
    if (socketIOCallbacks !== null) { socketIOCallbacks.push(callback); return; }
    socketIOCallbacks = [callback];
    const script = document.createElement("script");
    script.src = "https://cdn.socket.io/4.7.5/socket.io.min.js";
    script.onload = () => {
      const cbs = socketIOCallbacks;
      socketIOCallbacks = null;
      cbs.forEach((cb) => cb());
    };
    script.onerror = () => {
      socketIOCallbacks = null;
      showNotification("Failed to load Socket.io.", true);
    };
    document.head.appendChild(script);
  }

  // --------------------------------------------------------------------------
  // Connection
  // --------------------------------------------------------------------------
  function connect(selectedRole) {
    localStorage.setItem("sync_lastRole", selectedRole);
    stopSeekPoll();
    if (socket) { socket.disconnect(); socket = null; }
    reconnecting    = false;
    cohostMode      = false;
    lastVolume      = null;
    lastGuestCount  = null;
    guestCount      = 0;
    lastRoomInfo    = { hosts: 0, guests: 0, connected: 0 };

    loadSocketIO(() => {
      const isLocal = serverIP === "localhost" || serverIP === "127.0.0.1";
      const isIP    = /^[\d.]+$/.test(serverIP);
      const serverURL = isLocal
        ? `http://${serverIP}:3000`
        : isIP
          ? `https://${serverIP}:3000`
          : `https://${serverIP}`;

      socket = window.io(serverURL, {
        transports: ["websocket"],
        reconnectionDelay: 1000,
        reconnectionDelayMax: 8000,
        reconnectionAttempts: Infinity,
      });

      socket.on("connect", () => {
        isConnected  = true;
        role         = selectedRole;
        reconnecting = false;
        const regPayload = { role, username, roomCode };
        if (role === "host" && roomCode) regPayload.requestedCode = roomCode;
        socket.emit("register", regPayload);
        updateButtonState();
        const disc = document.querySelector("#sync-panel #sync-disconnect-btn");
        if (disc && disc.textContent === t("cancel")) disc.textContent = t("disconnect");
      });

      socket.on("registered", ({ role: r }) => {
        showNotification(t("connectedAs", r, username));
        setConnectedPanelUI(r);
        if (r === "guest") socket.emit("request_sync");
        startSeekPoll();
      });

      socket.on("connect_error", () => {
        if (!reconnecting) showNotification(t("cannotReach"), true);
        reconnecting = true;
        updateButtonState();
        setReconnectingPanelUI();
      });

      socket.on("reconnect_attempt", (n) => {
        reconnecting = true;
        updateButtonState();
        setReconnectingPanelUI(n);
      });

      socket.on("error", ({ message = "Unknown error" } = {}) => {
        showNotification(`Error: ${message}`, true);
        reconnecting = false;
        disconnect();
        resetPanelUI();
      });

      socket.on("disconnect", (reason) => {
        isConnected = false;
        role        = null;
        updateButtonState();
        updateToolbarCode();
        updateToolbarGuestCount(0);
        if (reason === "io client disconnect") {
          reconnecting = false;
          resetPanelUI();
        } else {
          reconnecting = true;
          showNotification(t("connLost"));
          setReconnectingPanelUI();
        }
      });

      socket.on("room_update", ({ connected, hosts, guests }) => {
        if (lastGuestCount !== null && guests !== lastGuestCount) {
          playBeep(guests > lastGuestCount);
        }
        lastGuestCount = guests;
        guestCount     = guests;
        lastRoomInfo   = { hosts, guests, connected };
        updateRoomInfo(hosts, guests, connected);
        updateToolbarGuestCount(guests);
      });

      socket.on("cohost_mode_changed", ({ enabled }) => {
        cohostMode = Boolean(enabled);
        updateCohostSection();
        updateButtonState();
        if (role === "guest") {
          showNotification(cohostMode ? t("cohostModeOn") : t("cohostModeOff"));
        }
      });

      socket.on("room_created", ({ code } = {}) => {
        if (!code) return;
        roomCode = code;
        localStorage.setItem("sync_roomCode", code);
        updateToolbarCode();
        const p = getPanel();
        if (!p) return;
        const codeEl = qs(p, "#sync-host-room-code");
        if (codeEl) codeEl.textContent = code;
        const section = qs(p, "#sync-host-code-section");
        if (section) section.style.display = "block";
      });

      socket.on("waiting_for_host", () => setWaitingPanelUI());

      socket.on("host_connected", () => {
        if (role === "guest" && isConnected) {
          socket.emit("request_sync");
          showNotification(t("hostConnected"));
        }
      });

      socket.on("host_left", () => {
        showNotification(t("hostLeft"), true);
        setWaitingPanelUI();
      });

      socket.on("play", async ({ uri, position, contextUri } = {}) => {
        if (!isConnected) return;
        try {
          if (uri && Player.data?.item?.uri !== uri) {
            suppressFor(1200);
            if (contextUri && contextUri !== uri) {
              await Player.playUri(contextUri, {}, { skipTo: { uri }, seekTo: position || 0 });
            } else {
              await Player.playUri(uri, {}, { seekTo: position || 0 });
            }
            resetSeekBaseline(position || 0);
          } else {
            suppressFor(500);
            if (position !== undefined) await Player.seek(position);
            await Player.play();
            resetSeekBaseline(position ?? null);
          }
        } catch (_) {}
      });

      socket.on("pause", async ({ position } = {}) => {
        if (!isConnected) return;
        suppressFor(600);
        try {
          if (position !== undefined) await Player.seek(position);
          await Player.pause();
          resetSeekBaseline(position ?? null);
        } catch (_) {}
      });

      socket.on("seek", async ({ position, sentAt } = {}) => {
        if (!isConnected || position == null) return;
        suppressFor(800);
        try {
          const halfRtt = sentAt
            ? Math.min(Math.max(0, (Date.now() - sentAt) / 2), 1500)
            : 0;
          const adjPos = position + halfRtt + settings.syncDelay;
          await Player.seek(adjPos);
          resetSeekBaseline(adjPos);
        } catch (_) {}
      });

      let changeSeq = 0;
      socket.on("change_track", async ({ uri, position, contextUri } = {}) => {
        if (!isConnected || !uri) return;
        const seq = ++changeSeq;
        suppressFor(1200);
        try {
          if (contextUri && contextUri !== uri) {
            await Player.playUri(contextUri, {}, { skipTo: { uri }, seekTo: position || 0 });
          } else {
            await Player.playUri(uri, {}, { seekTo: position || 0 });
          }
          if (seq !== changeSeq) return;
          resetSeekBaseline(position || 0);
        } catch (_) {
          if (seq !== changeSeq) return;
          try {
            await Player.playUri(uri, {}, { seekTo: position || 0 });
            if (seq === changeSeq) resetSeekBaseline(position || 0);
          } catch (_) {}
        }
      });

      let syncSeq = 0;
      socket.on("sync_state", async ({ uri, position, isPlaying, contextUri, sentAt } = {}) => {
        if (role !== "guest" || !uri) return;
        const seq = ++syncSeq;
        suppressFor(1500);
        try {
          const latency = (sentAt && isPlaying)
            ? Math.min(Math.max(0, (Date.now() - sentAt) / 2), 1500)
            : 0;
          const adjPos = position + latency + settings.syncDelay;
          if (Player.data?.item?.uri !== uri) {
            try {
              if (contextUri && contextUri !== uri) {
                await Player.playUri(contextUri, {}, { skipTo: { uri }, seekTo: adjPos });
              } else {
                await Player.playUri(uri, {}, { seekTo: adjPos });
              }
            } catch (_) {
              try { await Player.playUri(uri, {}, { seekTo: adjPos }); } catch (_) {}
            }
            resetSeekBaseline(adjPos);
            if (!isPlaying && seq === syncSeq) {
              await new Promise((r) => setTimeout(r, 800));
              if (seq === syncSeq) await Player.pause();
            }
          } else {
            await Player.seek(adjPos);
            resetSeekBaseline(adjPos);
            if (seq !== syncSeq) return;
            if (isPlaying) {
              await Player.play();
            } else {
              await Player.pause();
            }
          }
        } catch (_) {}
      });

      socket.on("sync_requested", ({ guestId } = {}) => {
        if (role !== "host") return;
        const state = Player.data;
        if (!state?.item?.uri) return;
        socket.emit("sync_state", {
          guestId,
          uri:        state.item.uri,
          position:   state.positionAsOfTimestamp || 0,
          isPlaying:  !state.isPaused,
          contextUri: state.context?.uri ?? null,
          sentAt:     Date.now(),
        });
      });

      socket.on("volume_change", async ({ volume } = {}) => {
        if (!isConnected || role !== "guest" || !settings.volumeSync) return;
        if (typeof volume !== "number") return;
        try {
          await Spicetify.Platform.PlaybackAPI.setVolume(volume);
        } catch (_) {
          try { Spicetify.Player.setVolume?.(volume); } catch (_) {}
        }
      });
    });
  }

  function disconnect() {
    reconnecting   = false;
    cohostMode     = false;
    lastGuestCount = null;
    guestCount     = 0;
    lastRoomInfo   = { hosts: 0, guests: 0, connected: 0 };
    stopSeekPoll();
    if (socket) { socket.disconnect(); socket = null; }
    isConnected = false;
    role        = null;
    updateButtonState();
    updateToolbarCode();
    updateToolbarGuestCount(0);
  }

  // --------------------------------------------------------------------------
  // Player event listeners (host + co-host guests)
  // --------------------------------------------------------------------------

  let seekPollTimer    = null;
  let seekPollPos      = null;
  let seekPollTime     = null;
  let seekPollPending  = false;
  let seekPollDebounce = null;

  function resetSeekBaseline(knownPos) {
    seekPollPos     = (knownPos != null) ? knownPos : (Player.data?.positionAsOfTimestamp ?? null);
    seekPollTime    = Date.now();
    seekPollPending = false;
    clearTimeout(seekPollDebounce);
  }

  function startSeekPoll() {
    if (seekPollTimer) return;
    resetSeekBaseline();
    seekPollTimer = setInterval(() => {
      const state = Player.data;
      if (!state?.item?.uri) return;
      const now = Date.now();
      const pos = state.positionAsOfTimestamp || 0;
      if (!isController() || !socket?.connected) {
        seekPollPos  = pos; seekPollTime = now;
        clearTimeout(seekPollDebounce); seekPollPending = false;
        return;
      }
      const paused = state.isPaused;
      if (suppressCount > 0) { seekPollTime = now; return; }
      if (seekPollPos !== null) {
        const elapsed   = paused ? 0 : now - seekPollTime;
        const expected  = seekPollPos + elapsed;
        const deviation = Math.abs(pos - expected);
        if (deviation > 500) {
          if (!seekPollPending) {
            seekPollPending = true;
            seekPollDebounce = setTimeout(() => {
              seekPollPending = false;
              const emitPos  = Player.data?.positionAsOfTimestamp || pos;
              const emitNow  = Date.now();
              seekPollPos  = emitPos;
              seekPollTime = emitNow;
              socket.emit("seek", { position: emitPos, sentAt: emitNow });
              suppressFor(500);
            }, 150);
          }
          seekPollTime = now;
          return;
        }
        if (seekPollPending) { clearTimeout(seekPollDebounce); seekPollPending = false; }
      }
      seekPollPos  = pos;
      seekPollTime = now;
    }, 50);
  }

  function stopSeekPoll() {
    clearInterval(seekPollTimer);
    clearTimeout(seekPollDebounce);
    seekPollTimer    = null;
    seekPollDebounce = null;
    seekPollPos      = null;
    seekPollTime     = null;
    seekPollPending  = false;
  }

  Player.addEventListener("songchange", () => {
    resetSeekBaseline();
    if (!isController() || suppressCount > 0 || !socket?.connected) return;
    const state = Player.data;
    if (!state?.item?.uri) return;
    socket.emit("change_track", {
      uri:        state.item.uri,
      position:   state.positionAsOfTimestamp || 0,
      contextUri: state.context?.uri ?? null,
    });
    suppressFor(2000);
  });

  Player.addEventListener("onplaypause", () => {
    if (!isController() || suppressCount > 0 || !socket?.connected) return;
    const state = Player.data;
    if (!state?.item?.uri) return;
    const position = state.positionAsOfTimestamp || 0;
    if (state.isPaused) {
      socket.emit("pause", { position });
    } else {
      socket.emit("play", {
        uri:        state.item.uri,
        position,
        contextUri: state.context?.uri ?? null,
      });
    }
    suppressFor(800);
  });

  Player.addEventListener("onvolumechange", () => {
    if (!isController() || !socket?.connected || !settings.volumeSync) return;
    const vol = Player.data?.volume ?? null;
    if (vol === null || vol === lastVolume) return;
    lastVolume = vol;
    socket.emit("volume_change", { volume: vol });
  });

  // --------------------------------------------------------------------------
  // Panel UI helpers
  // --------------------------------------------------------------------------
  function getPanel() { return document.getElementById("sync-panel"); }
  function qs(parent, sel) { return parent.querySelector(sel); }

  function resetPanelUI() {
    const p = getPanel(); if (!p) return;
    qs(p, "#sync-inputs-section").style.display    = "flex";
    qs(p, "#sync-connect-btns").style.display      = "flex";
    qs(p, "#sync-status-section").style.display    = "none";
    qs(p, "#sync-room-info").style.display         = "none";
    qs(p, "#sync-host-code-section").style.display = "none";
    qs(p, "#sync-cohost-row").style.display        = "none";
    const disc = qs(p, "#sync-disconnect-btn");
    disc.style.display = "none";
    disc.textContent   = t("disconnect");
  }

  function setConnectedPanelUI(r) {
    const p = getPanel(); if (!p) return;
    qs(p, "#sync-inputs-section").style.display  = "none";
    qs(p, "#sync-connect-btns").style.display    = "none";
    const disc = qs(p, "#sync-disconnect-btn");
    disc.style.display = "block";
    disc.textContent   = t("disconnect");
    qs(p, "#sync-status-section").style.display  = "flex";
    const st = qs(p, "#sync-status-text");
    st.textContent = r === "host" ? t("statusHost") : t("statusGuest");
    st.style.color = r === "host" ? "var(--spice-button, #1db954)" : "#1e90ff";
    qs(p, "#sync-cohost-row").style.display        = r === "host" ? "flex" : "none";
    qs(p, "#sync-guest-cohost-note").style.display = "none";
    const hcs = qs(p, "#sync-host-code-section");
    if (r === "host" && roomCode) {
      const codeEl = qs(p, "#sync-host-room-code");
      if (codeEl) codeEl.textContent = roomCode;
      hcs.style.display = "block";
    } else {
      hcs.style.display = "none";
    }
  }

  function setReconnectingPanelUI(attempt) {
    const p = getPanel(); if (!p) return;
    qs(p, "#sync-inputs-section").style.display    = "none";
    qs(p, "#sync-connect-btns").style.display      = "none";
    const disc = qs(p, "#sync-disconnect-btn");
    disc.style.display = "block";
    disc.textContent   = t("cancel");
    qs(p, "#sync-status-section").style.display    = "flex";
    const st = qs(p, "#sync-status-text");
    st.textContent = attempt > 1 ? t("statusReconN", attempt) : t("statusRecon");
    st.style.color = "#f59b00";
    qs(p, "#sync-cohost-row").style.display        = "none";
    qs(p, "#sync-guest-cohost-note").style.display = "none";
    qs(p, "#sync-room-info").style.display         = "none";
    qs(p, "#sync-host-code-section").style.display = "none";
  }

  function setWaitingPanelUI() {
    const p = getPanel(); if (!p) return;
    qs(p, "#sync-inputs-section").style.display    = "none";
    qs(p, "#sync-connect-btns").style.display      = "none";
    const disc = qs(p, "#sync-disconnect-btn");
    disc.style.display = "block";
    disc.textContent   = t("disconnect");
    qs(p, "#sync-status-section").style.display    = "flex";
    const st = qs(p, "#sync-status-text");
    st.textContent = t("statusWaiting");
    st.style.color = "#f59b00";
    qs(p, "#sync-cohost-row").style.display        = "none";
    qs(p, "#sync-guest-cohost-note").style.display = "none";
    qs(p, "#sync-room-info").style.display         = "none";
  }

  function updateRoomInfo(hosts, guests, connected) {
    const p = getPanel(); if (!p) return;
    const ri = qs(p, "#sync-room-info");
    if (!isConnected) { ri.style.display = "none"; return; }
    ri.style.display = "flex";
    ri.innerHTML =
      `<span style="color:var(--spice-button,#1db954)">${hosts} host${hosts !== 1 ? "s" : ""}</span>` +
      `<span style="color:rgba(255,255,255,0.2);margin:0 6px">·</span>` +
      `<span style="color:#1e90ff">${guests} guest${guests !== 1 ? "s" : ""}</span>` +
      (cohostMode
        ? `<span style="color:rgba(255,255,255,0.2);margin:0 6px">·</span>` +
          `<span style="color:var(--spice-button,#1db954);font-weight:700">co-host on</span>`
        : "");
    void connected;
  }

  function updateCohostSection() {
    const p = getPanel(); if (!p) return;
    const toggle = qs(p, "#sync-cohost-toggle");
    if (toggle) toggle.checked = cohostMode;
    if (role === "guest") {
      const note = qs(p, "#sync-guest-cohost-note");
      if (note) note.style.display = cohostMode ? "block" : "none";
      const st = qs(p, "#sync-status-text");
      if (st && isConnected) {
        st.textContent = cohostMode ? t("statusCohost") : t("statusGuest");
        st.style.color = cohostMode ? "var(--spice-button,#1db954)" : "#1e90ff";
      }
    }
    updateRoomInfo(lastRoomInfo.hosts, lastRoomInfo.guests, lastRoomInfo.connected);
  }

  // --------------------------------------------------------------------------
  // Notifications, toolbar elements, button state
  // --------------------------------------------------------------------------
  function showNotification(message, isError = false) {
    Spicetify.showNotification(message, isError);
  }

  function updateToolbarCode() {
    const el = document.getElementById("sync-toolbar-code");
    if (!el) return;
    if (settings.showCode && isConnected && roomCode) {
      el.textContent = roomCode;
      el.style.display = "block";
    } else {
      el.style.display = "none";
    }
  }

  function updateToolbarGuestCount(n) {
    const el = document.getElementById("sync-toolbar-guests");
    if (!el) return;
    if (isConnected && n > 0) {
      el.textContent = String(n);
      el.style.display = "block";
    } else {
      el.style.display = "none";
    }
  }

  function updateButtonState() {
    const btn = document.getElementById("sync-toggle-btn");
    if (!btn) return;
    const svgEl = btn.querySelector("svg");
    let color, label;
    if (isConnected && role === "host") {
      color = "var(--spice-button, #1db954)";
      label = cohostMode ? "Sync: hosting (co-host on)" : "Sync: hosting";
    } else if (isConnected && role === "guest") {
      color = "var(--spice-button, #1db954)";
      label = cohostMode ? "Sync: co-host mode" : "Sync: listening";
    } else if (reconnecting) {
      color = "var(--spice-button, #1db954)";
      label = "Sync: reconnecting";
    } else {
      color = "var(--spice-button, #1db954)";
      label = t("appName");
    }
    btn.style.color = color;
    if (svgEl) {
      svgEl.style.fill = color;
      svgEl.style.stroke = color;
      svgEl.style.color = color;
    }
    btn.setAttribute("aria-label", label);
    btn.setAttribute("data-tooltip", label);
    updateToolbarCode();
    updateToolbarGuestCount(guestCount);
  }

  // --------------------------------------------------------------------------
  // CSS injection
  // --------------------------------------------------------------------------
  function injectStyles() {
    if (document.getElementById("sync-styles")) return;
    const s = document.createElement("style");
    s.id = "sync-styles";
    s.textContent = `
      @keyframes syncPopIn {
        from { opacity: 0; transform: translateY(6px) scale(0.98); }
        to   { opacity: 1; transform: translateY(0)   scale(1);    }
      }
      @keyframes syncPopOut {
        from { opacity: 1; transform: translateY(0)   scale(1);    }
        to   { opacity: 0; transform: translateY(6px) scale(0.98); }
      }
      #sync-panel { animation: syncPopIn 0.18s cubic-bezier(0.4,0,0.2,1) forwards; }

      #sync-toggle-btn { cursor: default !important; }
      #sync-toggle-btn:hover { cursor: default !important; }
      #sync-toggle-btn::before, #sync-toggle-btn::after { content: none !important; display: none !important; }

      #sync-toolbar-code {
        display: none;
        position: absolute;
        bottom: -6px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 11px;
        font-weight: 800;
        font-family: monospace;
        letter-spacing: 0.08em;
        color: inherit;
        white-space: nowrap;
        line-height: 1;
        pointer-events: none;
        margin-top: 5px;
      }

      #sync-toolbar-guests {
        display: none;
        position: absolute;
        bottom: 1px;
        right: 2px;
        font-size: 8px;
        font-weight: 800;
        font-family: monospace;
        color: inherit;
        line-height: 1;
        pointer-events: none;
      }

      .sync-btn-tooltip {
        position: absolute;
        bottom: calc(100% + 6px);
        left: 50%;
        transform: translateX(-50%);
        background: #000;
        color: inherit;
        font-size: 13px;
        font-weight: 400;
        font-family: inherit;
        padding: 4px 8px;
        border-radius: 4px;
        white-space: nowrap;
        pointer-events: none;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.1s;
        box-shadow: 0 1px 4px rgba(0,0,0,0.25);
      }
      .sync-btn-tooltip--visible { opacity: 1; }

      .sync-toggle {
        position: relative; display: inline-block;
        width: 42px; height: 24px; flex-shrink: 0; cursor: pointer;
      }
      .sync-toggle input { opacity: 0; width: 0; height: 0; position: absolute; }
      .sync-toggle-track {
        position: absolute; inset: 0;
        background: rgba(255,255,255,0.18);
        border-radius: 24px;
        transition: background 0.2s;
        pointer-events: none;
      }
      .sync-toggle-track::before {
        content: '';
        position: absolute; height: 18px; width: 18px;
        left: 3px; top: 3px;
        background: white; border-radius: 50%;
        transition: transform 0.2s;
        box-shadow: 0 1px 4px rgba(0,0,0,0.4);
      }
      .sync-toggle input:checked + .sync-toggle-track { background: var(--spice-button, #1db954); }
      .sync-toggle input:checked + .sync-toggle-track::before { transform: translateX(18px); }

      .sync-select {
        width: 100%;
        padding: 8px 10px;
        background: var(--spice-main, rgba(0,0,0,0.25));
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 6px;
        color: var(--spice-text, #fff);
        font-size: 12px;
        font-family: inherit;
        outline: none;
        cursor: pointer;
        -webkit-appearance: none;
        appearance: none;
      }
      .sync-select:focus { border-color: rgba(255,255,255,0.25); }

      .sync-slider {
        width: 100%;
        -webkit-appearance: none;
        appearance: none;
        height: 4px;
        border-radius: 2px;
        background: rgba(255,255,255,0.18);
        outline: none;
        cursor: pointer;
      }
      .sync-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 14px; height: 14px;
        border-radius: 50%;
        background: var(--spice-button, #1db954);
        cursor: pointer;
      }
      .sync-slider::-moz-range-thumb {
        width: 14px; height: 14px;
        border-radius: 50%;
        background: var(--spice-button, #1db954);
        cursor: pointer;
        border: none;
      }
    `;
    document.head.appendChild(s);
  }

  // --------------------------------------------------------------------------
  // Panel
  // --------------------------------------------------------------------------
  function closePanel() {
    const p = getPanel(); if (!p) return;
    p.style.animation = "syncPopOut 0.16s cubic-bezier(0.4,0,0.2,1) forwards";
    p.addEventListener("animationend", () => p.remove(), { once: true });
  }

  function buildPanel() {
    injectStyles();
    const panel = document.createElement("div");
    panel.id = "sync-panel";
    panel.style.cssText = [
      "position:fixed", "bottom:96px", "right:16px", "width:272px",
      "z-index:9999",
      "background:var(--spice-card,#282828)",
      "border-radius:12px",
      "border:1px solid rgba(255,255,255,0.08)",
      "box-shadow:0 8px 32px rgba(0,0,0,0.6),0 2px 8px rgba(0,0,0,0.25)",
      "display:flex", "flex-direction:column", "overflow:hidden",
      "font-family:var(--font-family,CircularSp,-apple-system,sans-serif)",
      "color:var(--spice-text,#ffffff)", "font-size:13px",
    ].join(";");

    const INP = [
      "width:100%", "box-sizing:border-box", "padding:8px 10px",
      "background:var(--spice-main,rgba(0,0,0,0.25))",
      "border:1px solid rgba(255,255,255,0.08)", "border-radius:6px",
      "color:var(--spice-text,#fff)", "font-size:12px",
      "outline:none", "font-family:inherit", "transition:border-color 0.15s",
    ].join(";");

    const LBL = [
      "font-size:10px", "font-weight:700", "letter-spacing:0.08em",
      "text-transform:uppercase", "color:var(--spice-subtext,#a7a7a7)",
      "margin-bottom:5px", "display:block",
    ].join(";");

    const BTN_PRI = [
      "flex:1", "padding:9px",
      "background:var(--spice-button,#1db954)", "border:none",
      "border-radius:50px", "color:var(--spice-button-text,#000)",
      "font-weight:700", "cursor:pointer", "font-size:12px",
      "letter-spacing:0.02em", "font-family:inherit",
      "transition:opacity 0.15s,transform 0.1s",
    ].join(";");

    const BTN_GHO = [
      "flex:1", "padding:9px", "background:transparent",
      "border:1px solid rgba(255,255,255,0.35)", "border-radius:50px",
      "color:var(--spice-text,#fff)", "font-weight:700", "cursor:pointer",
      "font-size:12px", "letter-spacing:0.02em", "font-family:inherit",
      "transition:opacity 0.15s,transform 0.1s",
    ].join(";");

    const ICON_BTN =
      "background:none;border:none;cursor:pointer;" +
      "color:var(--spice-subtext,#a7a7a7);" +
      "display:flex;align-items:center;justify-content:center;" +
      "width:24px;height:24px;border-radius:50%;padding:0;transition:background 0.15s";

    const SROW =
      "display:flex;align-items:center;justify-content:space-between;" +
      "padding:10px 12px;background:rgba(255,255,255,0.04);" +
      "border-radius:8px;border:1px solid rgba(255,255,255,0.06)";

    const SDESC = "font-size:10px;color:var(--spice-subtext,#a7a7a7);line-height:1.4";

    panel.innerHTML = `
<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 14px 10px;border-bottom:1px solid rgba(255,255,255,0.06);flex-shrink:0">
  <div style="display:flex;align-items:center;gap:8px">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--spice-button,#1db954)">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
    </svg>
    <span style="font-size:13px;font-weight:700;letter-spacing:-0.01em">${t("appName")}</span>
  </div>
  <div style="display:flex;gap:2px;align-items:center">
    <button id="sync-settings-btn" style="${ICON_BTN}" title="${t("settingsTitle")}"
      onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='none'">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    </button>
    <button id="sync-panel-close" style="${ICON_BTN}"
      onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='none'">
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <line x1="1" y1="1" x2="11" y2="11"/><line x1="11" y1="1" x2="1" y2="11"/>
      </svg>
    </button>
  </div>
</div>

<div id="sync-main-content" style="padding:14px;display:flex;flex-direction:column;gap:12px">
  <div id="sync-inputs-section" style="display:flex;flex-direction:column;gap:10px">
    <div>
      <span style="${LBL}">${t("server")}</span>
      <input id="sync-ip" type="text" placeholder="${t("serverPh")}" style="${INP}"
        onfocus="this.style.borderColor='rgba(255,255,255,0.25)'"
        onblur="this.style.borderColor='rgba(255,255,255,0.08)'"/>
    </div>
    <div>
      <span style="${LBL}">${t("username")}</span>
      <input id="sync-username" type="text" placeholder="${t("usernamePh")}" style="${INP}"
        onfocus="this.style.borderColor='rgba(255,255,255,0.25)'"
        onblur="this.style.borderColor='rgba(255,255,255,0.08)'"/>
    </div>
    <div>
      <span style="${LBL}">${t("roomCode")}</span>
      <input id="sync-room-code" type="text" placeholder="${t("roomCodePh")}" style="${INP}" maxlength="6"
        onfocus="this.style.borderColor='rgba(255,255,255,0.25)'"
        onblur="this.style.borderColor='rgba(255,255,255,0.08)'"
        oninput="this.value=this.value.toUpperCase().replace(/[^A-Z0-9]/g,'')"/>
    </div>
  </div>
  <div id="sync-connect-btns" style="display:flex;gap:6px">
    <button id="sync-host-btn" style="${BTN_PRI}"
      onmouseover="this.style.opacity='.85'" onmouseout="this.style.opacity='1'"
      onmousedown="this.style.transform='scale(0.97)'" onmouseup="this.style.transform=''">${t("host")}</button>
    <button id="sync-guest-btn" style="${BTN_GHO}"
      onmouseover="this.style.opacity='.7'" onmouseout="this.style.opacity='1'"
      onmousedown="this.style.transform='scale(0.97)'" onmouseup="this.style.transform=''">${t("guest")}</button>
  </div>
  <div id="sync-status-section" style="display:none;flex-direction:column;gap:10px">
    <div id="sync-status-text" style="font-size:13px;font-weight:600;color:var(--spice-button,#1db954)">…</div>
    <div id="sync-host-code-section" style="display:none;padding:10px 12px;background:rgba(29,185,84,0.07);border:1px solid rgba(29,185,84,0.2);border-radius:8px;text-align:center">
      <div style="font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--spice-subtext,#a7a7a7);margin-bottom:8px">${t("yourCode")}</div>
      <div id="sync-host-room-code" style="font-size:26px;font-weight:900;letter-spacing:0.25em;color:var(--spice-button,#1db954);font-family:monospace">______</div>
      <button id="sync-copy-code-btn" style="margin-top:8px;padding:4px 14px;background:transparent;border:1px solid rgba(29,185,84,0.4);border-radius:50px;color:var(--spice-button,#1db954);font-size:11px;font-weight:700;cursor:pointer;font-family:inherit;transition:background 0.15s"
        onmouseover="this.style.background='rgba(29,185,84,0.12)'" onmouseout="this.style.background='transparent'">${t("copyCode")}</button>
    </div>
    <div id="sync-guest-cohost-note" style="display:none;padding:8px 10px;background:rgba(29,185,84,0.09);border:1px solid rgba(29,185,84,0.18);border-radius:7px;font-size:11px;color:var(--spice-button,#1db954);line-height:1.4">
      ${t("cohostNote")}
    </div>
  </div>
  <div id="sync-room-info" style="display:none;align-items:center;justify-content:center;flex-wrap:wrap;gap:4px;font-size:11px;color:var(--spice-subtext,#a7a7a7)"></div>
  <div id="sync-cohost-row" style="display:none;${SROW}">
    <div style="flex:1;min-width:0;margin-right:10px">
      <div style="font-size:12px;font-weight:600;margin-bottom:2px">${t("cohostLabel")}</div>
      <div style="${SDESC}">${t("cohostDesc")}</div>
    </div>
    <label class="sync-toggle">
      <input type="checkbox" id="sync-cohost-toggle">
      <span class="sync-toggle-track"></span>
    </label>
  </div>
  <button id="sync-disconnect-btn" style="display:none;width:100%;padding:9px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:50px;color:var(--spice-text,#fff);font-weight:700;cursor:pointer;font-size:12px;letter-spacing:0.02em;font-family:inherit;transition:opacity 0.15s"
    onmouseover="this.style.opacity='.7'" onmouseout="this.style.opacity='1'">${t("disconnect")}</button>
</div>

<div id="sync-settings-content" style="display:none;padding:14px;flex-direction:column;gap:14px">
  <button id="sync-settings-back" style="width:100%;padding:9px 12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;color:var(--spice-text,#fff);font-weight:600;cursor:pointer;font-size:12px;font-family:inherit;text-align:left;transition:opacity 0.15s"
    onmouseover="this.style.opacity='.75'" onmouseout="this.style.opacity='1'">${t("back")}</button>

  <div style="font-size:9px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:var(--spice-subtext,#a7a7a7)">${t("sectionGeneral")}</div>

  <div>
    <span style="${LBL}">${t("language")}</span>
    <select id="sync-s-lang" class="sync-select">
      <option value="auto">${t("langAuto")}</option>
      <option value="fr">${t("langFr")}</option>
      <option value="en">${t("langEn")}</option>
    </select>
  </div>

  <div style="${SROW}">
    <div style="flex:1;min-width:0;margin-right:10px">
      <div style="font-size:12px;font-weight:600;margin-bottom:2px">${t("autoConnect")}</div>
      <div style="${SDESC}">${t("autoConnectDesc")}</div>
    </div>
    <label class="sync-toggle"><input type="checkbox" id="sync-s-autoconnect"><span class="sync-toggle-track"></span></label>
  </div>

  <div style="${SROW}">
    <div style="flex:1;min-width:0;margin-right:10px">
      <div style="font-size:12px;font-weight:600;margin-bottom:2px">${t("soundNotif")}</div>
      <div style="${SDESC}">${t("soundNotifDesc")}</div>
    </div>
    <label class="sync-toggle"><input type="checkbox" id="sync-s-soundnotif"><span class="sync-toggle-track"></span></label>
  </div>

  <div style="font-size:9px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:var(--spice-subtext,#a7a7a7);margin-top:4px">${t("sectionSession")}</div>

  <div style="${SROW}">
    <div style="flex:1;min-width:0;margin-right:10px">
      <div style="font-size:12px;font-weight:600;margin-bottom:2px">${t("showCode")}</div>
      <div style="${SDESC}">${t("showCodeDesc")}</div>
    </div>
    <label class="sync-toggle"><input type="checkbox" id="sync-s-showcode"><span class="sync-toggle-track"></span></label>
  </div>

  <div style="${SROW}">
    <div style="flex:1;min-width:0;margin-right:10px">
      <div style="font-size:12px;font-weight:600;margin-bottom:2px">${t("volumeSync")}</div>
      <div style="${SDESC}">${t("volumeSyncDesc")}</div>
    </div>
    <label class="sync-toggle"><input type="checkbox" id="sync-s-volumesync"><span class="sync-toggle-track"></span></label>
  </div>

  <div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px">
      <span style="${LBL};margin-bottom:0">${t("syncDelay")}</span>
      <span id="sync-s-delay-val" style="font-size:11px;font-weight:600;color:var(--spice-button,#1db954)">${settings.syncDelay} ms</span>
    </div>
    <div style="${SDESC};margin-bottom:6px">${t("syncDelayDesc")}</div>
    <input type="range" id="sync-s-delay" class="sync-slider" min="0" max="500" step="10" value="${settings.syncDelay}"/>
  </div>
</div>`;

    document.body.appendChild(panel);
    qs(panel, "#sync-cohost-row").style.display = "none";

    qs(panel, "#sync-ip").value        = serverIP;
    qs(panel, "#sync-username").value  = username;
    qs(panel, "#sync-room-code").value = "";

    function saveInputs() {
      serverIP = qs(panel, "#sync-ip").value.trim() || "spicetify-sync-server.onrender.com";
      username = qs(panel, "#sync-username").value.trim() || "User";
      const inputCode = qs(panel, "#sync-room-code").value.trim().toUpperCase();
      roomCode = inputCode || roomCode;
      localStorage.setItem("sync_serverIP", serverIP);
      localStorage.setItem("sync_username", username);
      localStorage.setItem("sync_roomCode", roomCode);
    }

    qs(panel, "#sync-host-btn").addEventListener("click", () => { saveInputs(); connect("host"); });
    qs(panel, "#sync-guest-btn").addEventListener("click", () => { saveInputs(); connect("guest"); });
    qs(panel, "#sync-disconnect-btn").addEventListener("click", () => { disconnect(); resetPanelUI(); });
    qs(panel, "#sync-copy-code-btn").addEventListener("click", () => {
      if (!roomCode) return;
      navigator.clipboard.writeText(roomCode).then(() => showNotification(t("codeCopied"))).catch(() => {});
    });
    qs(panel, "#sync-panel-close").addEventListener("click", () => closePanel());

    qs(panel, "#sync-settings-btn").addEventListener("click", () => {
      qs(panel, "#sync-main-content").style.display    = "none";
      qs(panel, "#sync-settings-content").style.display = "flex";
    });
    qs(panel, "#sync-settings-back").addEventListener("click", () => {
      qs(panel, "#sync-settings-content").style.display = "none";
      qs(panel, "#sync-main-content").style.display     = "flex";
    });

    qs(panel, "#sync-cohost-toggle").addEventListener("change", (e) => {
      if (role !== "host" || !socket?.connected) { e.target.checked = cohostMode; return; }
      socket.emit("set_cohost_mode", { enabled: e.target.checked });
    });

    const autoEl = qs(panel, "#sync-s-autoconnect");
    autoEl.checked = settings.autoConnect;
    autoEl.addEventListener("change", (e) => saveSetting("autoConnect", e.target.checked));

    const langEl = qs(panel, "#sync-s-lang");
    langEl.value = settings.lang;
    langEl.addEventListener("change", (e) => {
      saveSetting("lang", e.target.value);
      panel.remove();
      buildPanel();
      const np = getPanel();
      if (np) {
        qs(np, "#sync-main-content").style.display    = "none";
        qs(np, "#sync-settings-content").style.display = "flex";
      }
    });

    const showCodeEl = qs(panel, "#sync-s-showcode");
    showCodeEl.checked = settings.showCode;
    showCodeEl.addEventListener("change", (e) => {
      saveSetting("showCode", e.target.checked);
      updateToolbarCode();
    });

    const volumeSyncEl = qs(panel, "#sync-s-volumesync");
    volumeSyncEl.checked = settings.volumeSync;
    volumeSyncEl.addEventListener("change", (e) => saveSetting("volumeSync", e.target.checked));

    const soundNotifEl = qs(panel, "#sync-s-soundnotif");
    soundNotifEl.checked = settings.soundNotif;
    soundNotifEl.addEventListener("change", (e) => saveSetting("soundNotif", e.target.checked));

    const delaySlider = qs(panel, "#sync-s-delay");
    const delayVal    = qs(panel, "#sync-s-delay-val");
    delaySlider.addEventListener("input", (e) => {
      const v = parseInt(e.target.value, 10);
      delayVal.textContent = `${v} ms`;
      saveSetting("syncDelay", v);
    });

    if (isConnected) {
      setConnectedPanelUI(role);
      qs(panel, "#sync-cohost-toggle").checked = cohostMode;
      if (role === "guest" && cohostMode) qs(panel, "#sync-guest-cohost-note").style.display = "block";
    } else if (reconnecting) {
      setReconnectingPanelUI();
    }
  }

  // --------------------------------------------------------------------------
  // Toolbar button
  // --------------------------------------------------------------------------
  function createToolbarButton() {
    const btn = document.createElement("button");
    btn.id = "sync-toggle-btn";
    btn.setAttribute("aria-label", t("appName"));
    btn.setAttribute("data-tooltip", t("appName"));
    // IMPORTANT: copy classes from native button — do not change this mechanism
    const nativeBtn = document.querySelector(".main-nowPlayingBar-extraControls button");
    if (nativeBtn && nativeBtn.className) {
      btn.className = nativeBtn.className;
    } else {
      btn.style.cssText = "background:none;border:none;padding:4px 8px;border-radius:4px";
    }
    btn.style.cursor         = "default";
    btn.style.display        = "flex";
    btn.style.alignItems     = "center";
    btn.style.justifyContent = "center";
    btn.style.position       = "relative";

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "20");
    svg.setAttribute("height", "20");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "currentColor");
    svg.innerHTML =
      '<circle cx="6" cy="12" r="3"/>' +
      '<circle cx="18" cy="6" r="3"/>' +
      '<circle cx="18" cy="18" r="3"/>' +
      '<line x1="8.83" y1="10.59" x2="15.17" y2="7.41" stroke="currentColor" stroke-width="1.5"/>' +
      '<line x1="8.83" y1="13.41" x2="15.17" y2="16.59" stroke="currentColor" stroke-width="1.5"/>';
    btn.appendChild(svg);

    const codeLabel = document.createElement("span");
    codeLabel.id = "sync-toolbar-code";
    btn.appendChild(codeLabel);

    const guestBadge = document.createElement("span");
    guestBadge.id = "sync-toolbar-guests";
    btn.appendChild(guestBadge);

    const tooltip = document.createElement("div");
    tooltip.className = "sync-btn-tooltip";
    tooltip.textContent = "Spicetify Sync";
    btn.appendChild(tooltip);

    btn.addEventListener("mouseenter", () => tooltip.classList.add("sync-btn-tooltip--visible"));
    btn.addEventListener("mouseleave", () => tooltip.classList.remove("sync-btn-tooltip--visible"));
    btn.addEventListener("click", () => {
      if (getPanel()) { closePanel(); return; }
      buildPanel();
    });

    const bar =
      document.querySelector(".main-nowPlayingBar-extraControls") ||
      document.querySelector("[class*='extraControls']") ||
      document.querySelector(".player-controls__right");

    if (bar) {
      bar.prepend(btn);
    } else {
      btn.style.cssText +=
        ";position:fixed;bottom:20px;right:20px;z-index:9998;" +
        "background:var(--spice-sidebar,#1a1a1a);border-radius:50%;width:36px;height:36px";
      document.body.appendChild(btn);
    }

    updateButtonState();
  }

  // --------------------------------------------------------------------------
  // Auto-connect
  // --------------------------------------------------------------------------
  function maybeAutoConnect() {
    if (!settings.autoConnect) return;
    const lastRole = localStorage.getItem("sync_lastRole");
    if (!lastRole || isConnected || reconnecting) return;
    setTimeout(() => {
      if (!isConnected && !reconnecting) connect(lastRole);
    }, 1500);
  }

  // --------------------------------------------------------------------------
  // Init
  // --------------------------------------------------------------------------
  function init() {
    const ready =
      document.querySelector(".main-nowPlayingBar-extraControls") ||
      document.querySelector("[class*='extraControls']") ||
      document.querySelector(".player-controls__right");
    if (ready) {
      injectStyles();
      createToolbarButton();
      maybeAutoConnect();
    } else {
      setTimeout(init, 500);
    }
  }

  init();
})();
