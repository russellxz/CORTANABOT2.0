const path  = require("path");
const fs    = require("fs");
const pino  = require("pino");
const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  DisconnectReason        // ← NUEVO
} = require("@whiskeysockets/baileys");
const { Boom } = require("@hapi/boom");         // ← NUEVO

/* ─── Manejo global de errores ─────────────────────────────── */
process.on("uncaughtException",  err => console.error("❌ Excepción no atrapada:", err));
process.on("unhandledRejection", err => console.error("❌ Promesa rechazada sin manejar:", err));

/* ─── Registro de sockets activos ──────────────────────────── */
global.subBots = global.subBots || {};

/* ─── Helpers de plugins ──────────────────────────────────── */
function loadSubPlugins() {
  const plugins   = [];
  const pluginDir = path.join(__dirname, "plugins2");
  if (!fs.existsSync(pluginDir)) return plugins;

  const files = fs.readdirSync(pluginDir).filter(f => f.endsWith(".js"));
  for (const file of files) {
    delete require.cache[path.join(pluginDir, file)];     // hot-reload
    const plugin = require(path.join(pluginDir, file));
    if (plugin && plugin.command) plugins.push(plugin);
  }
  return plugins;
}

async function handleSubCommand(sock, msg, command, args) {
  const subPlugins = loadSubPlugins();
  const plugin     = subPlugins.find(p => p.command.includes(command.toLowerCase()));
  if (plugin) {
    return plugin(msg, {
      conn: sock,
      text: args.join(" "),
      args,
      command,
      usedPrefix: ".",
    });
  }
}

/* ─── Arranque de UN sub-bot ───────────────────────────────── */
async function iniciarSubbot(sessionPath) {
  if (global.subBots[sessionPath]) return;       // ya activo

  const dir = path.basename(sessionPath);
  let reconTimer = null;

  try {
    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
    const { version }          = await fetchLatestBaileysVersion();

    const subSock = makeWASocket({
      version,
      logger: pino({ level: "silent" }),
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" })),
      },
      browser: ["Cortana Subbot", "Firefox", "2.0"],
    });

    global.subBots[sessionPath] = subSock;
    subSock.ev.on("creds.update", saveCreds);

    /* ── Conexión / Reconexión – Lógica ajustada ─────────── */
subSock.ev.on("connection.update", ({ connection, lastDisconnect }) => {
  if (connection === "open") {
    console.log(`✅ Subbot ${dir} conectado.`);
    if (reconTimer)  { clearTimeout(reconTimer);  reconTimer  = null; }
    if (deleteTimer) { clearTimeout(deleteTimer); deleteTimer = null; }   // ← limpia el borrado
    return;
  }

  if (connection === "close") {
    const reasonCode = new Boom(lastDisconnect?.error)?.output.statusCode ||
                       lastDisconnect?.error?.output?.statusCode;
    const readable   = DisconnectReason[reasonCode] || `Desconocido (${reasonCode})`;
    console.log(`⚠️  ${dir} desconectado ⇒ ${readable}`);

    /* 1️⃣  Cierre definitivo: borra tras 15 s */
    const cierreDefinitivo = [
      DisconnectReason.loggedOut,
      DisconnectReason.badSession,
      401
    ].includes(reasonCode);

    if (cierreDefinitivo) {
      console.log(`🗑️  Eliminando sesión de ${dir} en 15 s (cierre definitivo).`);
      setTimeout(() => {
        if (fs.existsSync(sessionPath)) fs.rmSync(sessionPath, { recursive: true, force: true });
        delete global.subBots[sessionPath];
      }, 15_000);                                                // ← 15 s
      return;
    }

    /* 2️⃣  Reconexión suave: reintento a 5 s y borrado a 30 s si falla */
    if (!reconTimer) {
      reconTimer = setTimeout(() => {
        console.log(`🔄 Reintentando conexión de ${dir}…`);
        delete global.subBots[sessionPath];
        iniciarSubbot(sessionPath);

        /* Programa limpieza si no se reconecta en 30 s */
        deleteTimer = setTimeout(() => {
          console.log(`🗑️  Sin éxito tras 30 s — eliminando sesión de ${dir}.`);
          if (fs.existsSync(sessionPath)) fs.rmSync(sessionPath, { recursive: true, force: true });
          delete global.subBots[sessionPath];
        }, 30_000);                                             // ← 30 s
      }, 5_000);                                                // reintento en 5 s
    }
  }
});
      subSock.ev.on("group-participants.update", async (update) => {
  try {
    if (!update.id.endsWith("@g.us")) return;

    const chatId = update.id;
    const subbotID = subSock.user.id;
    const filePath = path.join(__dirname, "activossubbots.json");

    let activos = {};
    if (fs.existsSync(filePath)) {
      activos = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }

    if (!activos.welcome || !activos.welcome[subbotID] || !activos.welcome[subbotID][chatId]) return;

    const welcomeTexts = [
      "🎉 ¡Bienvenido(a)! Gracias por unirte al grupo.",
      "👋 ¡Hola! Qué bueno tenerte con nosotros.",
      "🌟 ¡Saludos! Esperamos que la pases genial aquí.",
      "🚀 ¡Bienvenido(a)! Disfruta y participa activamente.",
      "✨ ¡Qué alegría verte por aquí! Pásala bien."
    ];

    const farewellTexts = [
      "👋 ¡Adiós! Esperamos verte pronto de nuevo.",
      "😢 Se ha ido un miembro del grupo, ¡suerte!",
      "📤 Gracias por estar con nosotros, hasta luego.",
      "🔚 Un miembro se ha retirado. ¡Buena suerte!",
      "💨 ¡Chao! Esperamos que hayas disfrutado del grupo."
    ];

    const texts = update.action === "add" ? welcomeTexts : farewellTexts;
    const mensajeAleatorio = () => texts[Math.floor(Math.random() * texts.length)];

    for (const participant of update.participants) {
      const mention = `@${participant.split("@")[0]}`;
      const mensaje = mensajeAleatorio();
      const tipo = Math.random();

      if (tipo < 0.5) {
        let profilePic;
        try {
          profilePic = await subSock.profilePictureUrl(participant, "image");
        } catch {
          profilePic = "https://cdn.dorratz.com/files/1741323171822.jpg";
        }

        await subSock.sendMessage(chatId, {
          image: { url: profilePic },
          caption: `👋 ${mention}\n\n${mensaje}`,
          mentions: [participant]
        });
      } else {
        await subSock.sendMessage(chatId, {
          text: `👋 ${mention}\n\n${mensaje}`,
          mentions: [participant]
        });
      }
    }
  } catch (err) {
    console.error("❌ Error en bienvenida/despedida del subbot:", err);
  }
});
    
    /* ── Mensajes ────────────────────────────────────────── */
            subSock.ev.on("messages.upsert", async msg => {
          try {
            const m = msg.messages[0];
            if (!m || !m.message) return;

            const from = m.key.remoteJid;
            const isGroup = from.endsWith("@g.us");
            const isFromSelf = m.key.fromMe;
            const senderJid = m.key.participant || from;
            const senderNum = senderJid.split("@")[0];
            const rawID = subSock.user?.id || "";
            const subbotID = rawID.split(":")[0] + "@s.whatsapp.net";

            const prefixPath = path.join(__dirname, "prefixes.json");
            let dataPrefijos = {};
            if (fs.existsSync(prefixPath)) {
              dataPrefijos = JSON.parse(fs.readFileSync(prefixPath, "utf-8"));
            }

            const messageText =
              m.message?.conversation ||
              m.message?.extendedTextMessage?.text ||
              m.message?.imageMessage?.caption ||
              m.message?.videoMessage?.caption ||
              "";
            // === LÓGICA ANTILINK AUTOMÁTICO SOLO WHATSAPP POR SUBBOT ===
if (isGroup && !isFromSelf) {
  const activossubPath = path.resolve("./activossubbots.json");
  let dataActivados = {};

  if (fs.existsSync(activossubPath)) {
    dataActivados = JSON.parse(fs.readFileSync(activossubPath, "utf-8"));
  }

  const subbotID = subSock.user?.id || "";
  const antilinkActivo = dataActivados.antilink?.[subbotID]?.[from];
  const contieneLinkWhatsApp = /https:\/\/chat\.whatsapp\.com\//i.test(messageText);

  if (antilinkActivo && contieneLinkWhatsApp) {
    try {
      const metadata = await subSock.groupMetadata(from);
      const participant = metadata.participants.find(p => p.id === senderJid);
      const isAdmin = participant?.admin === "admin" || participant?.admin === "superadmin";
      const isOwner = global.owner.some(o => o[0] === senderNum);

      if (!isAdmin && !isOwner) {
        await subSock.sendMessage(from, { delete: m.key });

        await subSock.sendMessage(from, {
          text: `⚠️ @${senderNum} envió un enlace de grupo de WhatsApp y fue eliminado.`,
          mentions: [senderJid]
        });

        await subSock.groupParticipantsUpdate(from, [senderJid], "remove");
      }
    } catch (err) {
      console.error("❌ Error procesando antilink:", err);
    }
  }
}
// === FIN LÓGICA ANTILINK ===
// === INICIO LÓGICA MODOADMINS SUBBOT ===
if (isGroup && !isFromSelf) {
  try {
    const activossubPath = path.resolve("./activossubbots.json");
    if (!fs.existsSync(activossubPath)) return;

    const dataActivados = JSON.parse(fs.readFileSync(activossubPath, "utf-8"));
    
    // Obtener subbotID en el formato correcto
    const subbotID = subSock.user?.id || ""; // ejemplo: 15167096032:20@s.whatsapp.net
    const modoAdminsActivo = dataActivados.modoadmins?.[subbotID]?.[from];

    if (modoAdminsActivo) {
      const metadata = await subSock.groupMetadata(from);
      const participante = metadata.participants.find(p => p.id === senderJid);
      const isAdmin = participante?.admin === "admin" || participante?.admin === "superadmin";

      const botNum = subSock.user?.id.split(":")[0].replace(/[^0-9]/g, "");
      const isBot = botNum === senderNum;

      const isOwner = global.owner.some(([id]) => id === senderNum);

      if (!isAdmin && !isOwner && !isBot) {
        return;
      }
    }
  } catch (err) {
    console.error("❌ Error en verificación de modo admins:", err);
    return;
  }
}
// === FIN LÓGICA MODOADMINS SUBBOT ===
  
// === INICIO LÓGICA GRUPO AUTORIZADO ===
if (isGroup) {
  try {
    const grupoPath = path.resolve("./grupo.json");
    const prefixPath = path.resolve("./prefixes.json");

    const rawID = subSock.user?.id || "";
    const subbotID = rawID.split(":")[0] + "@s.whatsapp.net";
    const botNum = rawID.split(":")[0].replace(/[^0-9]/g, "");

    // Obtener el texto completo del mensaje
    const messageText =
      m.message?.conversation ||
      m.message?.extendedTextMessage?.text ||
      m.message?.imageMessage?.caption ||
      m.message?.videoMessage?.caption ||
      "";

    // Leer el prefijo personalizado
    let dataPrefijos = {};
    try {
      if (fs.existsSync(prefixPath)) {
        dataPrefijos = JSON.parse(fs.readFileSync(prefixPath, "utf-8"));
      }
    } catch (_) {}

    const customPrefix = dataPrefijos[subbotID];
    const allowedPrefixes = customPrefix ? [customPrefix] : [".", "#"];
    const usedPrefix = allowedPrefixes.find(p => messageText.startsWith(p));
    if (!usedPrefix) return; // No tiene prefijo válido

    const body = messageText.slice(usedPrefix.length).trim();
    const command = body.split(" ")[0].toLowerCase();

    const allowedCommands = ['addgrupo']; // Comando permitido aún si no está autorizado el grupo

    let dataGrupos = {};
    if (fs.existsSync(grupoPath)) {
      dataGrupos = JSON.parse(fs.readFileSync(grupoPath, "utf-8"));
    }

    const gruposPermitidos = Array.isArray(dataGrupos[subbotID]) ? dataGrupos[subbotID] : [];

    // ⚠️ Solo bloquear si NO es el subbot hablando
    if (senderNum !== botNum && !gruposPermitidos.includes(from) && !allowedCommands.includes(command)) {
      return; // Otro usuario y grupo no autorizado
    }

  } catch (err) {
    console.error("❌ Error en verificación de grupo autorizado:", err);
    return;
  }
}
// === FIN LÓGICA GRUPO AUTORIZADO ===
// === INICIO LÓGICA PRIVADO AUTORIZADO ===
if (!isGroup) {
  const isFromSelf = m.key.fromMe;
  const rawID = subSock.user?.id || "";
  const subbotID = rawID.split(":")[0] + "@s.whatsapp.net";

  if (!isFromSelf) {
    const listaPath = path.join(__dirname, "listasubots.json");
    let dataPriv = {};

    try {
      if (fs.existsSync(listaPath)) {
        dataPriv = JSON.parse(fs.readFileSync(listaPath, "utf-8"));
      }
    } catch (e) {
      console.error("❌ Error leyendo listasubots.json:", e);
    }

    const listaPermitidos = Array.isArray(dataPriv[subbotID]) ? dataPriv[subbotID] : [];

    if (!listaPermitidos.includes(senderNum)) {
      return; // 🚫 Usuario no autorizado, ignorar mensaje privado
    }
  }
}
// === FIN LÓGICA PRIVADO AUTORIZADO ===
            
            const customPrefix = dataPrefijos[subbotID];
            const allowedPrefixes = customPrefix ? [customPrefix] : [".", "#"];
            const usedPrefix = allowedPrefixes.find(p => messageText.startsWith(p));
            if (!usedPrefix) return;

            const body = messageText.slice(usedPrefix.length).trim();
            const command = body.split(" ")[0].toLowerCase();
            const args = body.split(" ").slice(1);

            await handleSubCommand(subSock, m, command, args).catch(err => {
              console.error("❌ Error ejecutando comando del subbot:", err);
            });
          } catch (err) {
            console.error("❌ Error interno en mensajes.upsert:", err);
          }
        });

  } catch (err) {
    console.error(`❌ Error iniciando ${dir}:`, err);
  }
}

/* ─── Carga inicial ───────────────────────────────────────── */
async function cargarSubbots() {
  const base = path.resolve(__dirname, "subbots");
  if (!fs.existsSync(base)) fs.mkdirSync(base, { recursive: true });

  const dirs = fs.readdirSync(base).filter(d =>
    fs.existsSync(path.join(base, d, "creds.json"))
  );
  console.log(`🤖 Inicializando ${dirs.length} sub-bot(s)…`);
  for (const d of dirs) await iniciarSubbot(path.join(base, d));
}

cargarSubbots();

/* ─── Exportaciones ───────────────────────────────────────── */
module.exports = { cargarSubbots, iniciarSubbot };
