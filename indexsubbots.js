const path = require("path");
const fs = require("fs");
const pino = require("pino");
// Lista en memoria de subbots ya conectados
const subbotsActivos = new Set();
const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore
} = require("@whiskeysockets/baileys");

async function cargarSubbots() {
  const subbotFolder = "./subbots";

  // Crear carpeta ./subbots si no existe
  if (!fs.existsSync(subbotFolder)) {
    fs.mkdirSync(subbotFolder, { recursive: true });
    console.log("📁 Carpeta ./subbots creada automáticamente.");
  }

  function loadSubPlugins() {
    const plugins = [];
    const pluginDir = path.join(__dirname, "plugins2");
    if (!fs.existsSync(pluginDir)) return plugins;
    const files = fs.readdirSync(pluginDir).filter(f => f.endsWith(".js"));
    for (const file of files) {
      const plugin = require(path.join(pluginDir, file));
      if (plugin && plugin.command) plugins.push(plugin);
    }
    return plugins;
  }

  async function handleSubCommand(sock, msg, command, args) {
    const subPlugins = loadSubPlugins();
    const lowerCommand = command.toLowerCase();
    const text = args.join(" ");
    const plugin = subPlugins.find(p => p.command.includes(lowerCommand));
    if (plugin) {
      return plugin(msg, {
        conn: sock,
        text,
        args,
        command: lowerCommand,
        usedPrefix: ".",
      });
    }
  }

  const subDirs = fs
    .readdirSync(subbotFolder)
    .filter(d => fs.existsSync(`${subbotFolder}/${d}/creds.json`));

  console.log(`🤖 Cargando ${subDirs.length} subbot(s) conectados...`);

  for (const dir of subDirs) {
    const sessionPath = path.join(subbotFolder, dir);
    let reconnectionTimer = null;

    const iniciarSubbot = async () => {
      try {
        const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
        const { version } = await fetchLatestBaileysVersion();
        const subSock = makeWASocket({
          version,
          logger: pino({ level: "silent" }),
          auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" }))
          },
          browser: ["Cortana Subbot", "Firefox", "2.0"]
        });

        subSock.ev.on("creds.update", saveCreds);


subSock.ev.on("connection.update", async ({ connection, lastDisconnect }) => {
  const sessionID = dir; // nombre de la carpeta, normalmente es el JID

  if (connection === "open") {
    console.log(`✅ Subbot ${sessionID} conectado.`);

    if (reconnectionTimer) {
      clearTimeout(reconnectionTimer);
      reconnectionTimer = null;
    }

    // ✅ Solo ejecutar lógica si es una sesión nueva no registrada aún
    if (!subbotsActivos.has(sessionID)) {
      console.log(`🆕 Nueva sesión detectada (${sessionID}), cargando lógica del subbot...`);
      subbotsActivos.add(sessionID);

      try {
        await iniciarSubbot(); // solo se lanza una vez para sesiones nuevas
      } catch (err) {
        console.error(`❌ Error cargando nueva sesión ${sessionID}:`, err);
      }
    } else {
      console.log(`ℹ️ Sesión ${sessionID} ya estaba activa. No se recarga.`);
    }

  } else if (connection === "close") {
    const statusCode = lastDisconnect?.error?.output?.statusCode;

    console.log(`❌ Subbot ${sessionID} desconectado (status: ${statusCode}). Eliminación en 30s...`);

    reconnectionTimer = setTimeout(() => {
      if (fs.existsSync(sessionPath)) {
        fs.rmSync(sessionPath, { recursive: true, force: true });
        console.log(`🗑️ Subbot ${sessionID} eliminado por desconexión prolongada.`);
        subbotsActivos.delete(sessionID); // 🧼 También quitamos del registro
      }
    }, 30_000);

    // ⏱️ Intento de reconexión
    setTimeout(() => iniciarSubbot(), 5000);
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
          profilePic = "https://cdn.russellxz.click/8d278a49.jpeg";
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
        
subSock.ev.on("messages.upsert", async msg => {
  const m = msg.messages[0];
  if (!m || !m.message) return;

  const from = m.key.remoteJid;
  const isGroup = from.endsWith("@g.us");
  const isFromSelf = m.key.fromMe;
  const senderJid = m.key.participant || from;
  const senderNum = senderJid.split("@")[0];
  const rawID = subSock.user?.id || "";
  const subbotID = rawID.split(":")[0] + "@s.whatsapp.net";

  const listaPath = path.join(__dirname, "listasubots.json");
  const prefixPath = path.join(__dirname, "prefixes.json");

  let dataPriv = {}, dataPrefijos = {};
  try { if (fs.existsSync(listaPath)) dataPriv = JSON.parse(fs.readFileSync(listaPath, "utf-8")); } catch (_) {}
  try { if (fs.existsSync(prefixPath)) dataPrefijos = JSON.parse(fs.readFileSync(prefixPath, "utf-8")); } catch (_) {}

  const listaPermitidos = Array.isArray(dataPriv[subbotID]) ? dataPriv[subbotID] : [];

  // ✅ Nueva lógica simplificada:
  if (!isGroup) {
    if (!isFromSelf && !listaPermitidos.includes(senderNum)) return;
  }
  // En grupos no se restringe a nadie

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

    const allowedCommands = ['addgrupo']; // Solo este se permite sin estar en lista

    let dataGrupos = {};
    if (fs.existsSync(grupoPath)) {
      dataGrupos = JSON.parse(fs.readFileSync(grupoPath, "utf-8"));
    }

    const gruposPermitidos = Array.isArray(dataGrupos[subbotID]) ? dataGrupos[subbotID] : [];

    if (!gruposPermitidos.includes(from) && !allowedCommands.includes(command)) {
      return; // Grupo no autorizado y no es comando permitido
    }

  } catch (err) {
    console.error("❌ Error en verificación de grupo autorizado:", err);
    return;
  }
}
// === FIN LÓGICA GRUPO AUTORIZADO ===

  
  const customPrefix = dataPrefijos[subbotID];
  const allowedPrefixes = customPrefix ? [customPrefix] : [".", "#"];
  const usedPrefix = allowedPrefixes.find(p => messageText.startsWith(p));
  if (!usedPrefix) return;

  const body = messageText.slice(usedPrefix.length).trim();
  const command = body.split(" ")[0].toLowerCase();
  const args = body.split(" ").slice(1);

  await handleSubCommand(subSock, m, command, args);
});


      } catch (err) {
        console.error(`❌ Error cargando subbot ${dir}:`, err);
      }
    };

    await iniciarSubbot();
  }
}

// Ejecutar automáticamente al correr este archivo (opcional)
cargarSubbots();

// ✅ Exportar para usar desde `index.js`
module.exports = { cargarSubbots };
