const path = require("path");
const fs = require("fs").promises;
const fsSync = require("fs");
const pino = require("pino");
const { Boom } = require("@hapi/boom");
const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  DisconnectReason,
  downloadContentFromMessage,
} = require("@whiskeysockets/baileys");

/* ─── Constantes de configuración ────────────────────────── */
const MAX_RECONEXION_INTENTOS = 3;
const RETRY_DELAY_MS = 5000; // 5 segundos

/* ─── Registro global para evitar duplicados ─────────────── */
global.subBots = global.subBots || {};

/* ─── Carga dinámica de plugins ──────────────────────────── */
function loadSubPlugins() {
  const out = [];
  const dir = path.join(__dirname, "plugins2");
  if (!fsSync.existsSync(dir)) return out;

  for (const file of fsSync.readdirSync(dir).filter((f) => f.endsWith(".js"))) {
    try {
      const plugin = require(path.join(dir, file));
      if (plugin?.command) out.push(plugin);
    } catch (e) {
      console.error(`Error cargando plugin de subbot ${file}:`, e);
    }
  }
  return out;
}

const subPlugins = loadSubPlugins();

async function handleSubCommand(sock, msg, command, args) {
  const plugin = subPlugins.find((p) => p.command.includes(command.toLowerCase()));
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

/**
 * Elimina de forma segura una sesión de subbot.
 * @param {string} sessionPath - La ruta a la carpeta de la sesión.
 */
async function cleanupSession(sessionPath) {
  const dirName = path.basename(sessionPath);
  if (global.subBots[dirName]) {
    delete global.subBots[dirName];
  }
  if (fsSync.existsSync(sessionPath)) {
    await fs.rm(sessionPath, { recursive: true, force: true });
    console.log(`🧹 Sesión eliminada en: ${dirName}`);
  }
}

async function iniciarSubbot(sessionPath, retryCount = 0) {
  const dir = path.basename(sessionPath);
  if (global.subBots[dir]) return;

  console.log(`🟡 Intentando iniciar subbot: ${dir} (Intento: ${retryCount + 1})`);

  if (!fsSync.existsSync(sessionPath)) {
    await fs.mkdir(sessionPath, { recursive: true });
  }

  try {
    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
    const { version } = await fetchLatestBaileysVersion();

    const subSock = makeWASocket({
      version,
      logger: pino({ level: "silent" }),
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" })),
      },
      browser: ["Azura Subbot", "Firefox", "2.0"],
      syncFullHistory: false,
    });

    global.subBots[dir] = subSock; // Registra el socket

    subSock.ev.on("creds.update", saveCreds);

    /* ─── Manejador de conexión / reconexión ────────── */
    subSock.ev.on("connection.update", async (update) => {
      const { connection, lastDisconnect } = update;
      const statusCode =
        lastDisconnect?.error instanceof Boom
          ? lastDisconnect.error.output.statusCode
          : lastDisconnect?.error;

      if (connection === "open") {
        console.log(`✅ Subbot ${dir} conectado exitosamente.`);
        retryCount = 0;

        subSock
          .sendMessage("status@broadcast", { text: "🟢 sub-bot online" })
          .then((r) => subSock.sendMessage("status@broadcast", { delete: r.key }))
          .catch(() => {});

        /* ── 📩 Mensaje de bienvenida SOLO la primera vez ── */
        const marker = path.join(sessionPath, ".welcomeSent");
        if (!fsSync.existsSync(marker)) {
          const ownerJid = subSock.user.id.split(":")[0] + "@s.whatsapp.net";
          subSock
            .sendMessage(ownerJid, {
              text: `✨ ¡Hola! Bienvenido al sistema de SubBots Premium de CORTANA 2.0 ✨

✅ Estado: tu SubBot ya está *en línea y conectado*.
A continuación, algunas cosas importantes que debes saber para comenzar:

📌 *IMPORTANTE*:
🧠 Por defecto, el bot **solo se responde a sí mismo** en el chat privado.
Si deseas que funcione en grupos, haz lo siguiente:

🔹 Ve al grupo donde lo quieras usar.
🔹 Escribe el comando: \`.addgrupo\`
🔹 ¡Listo! Ahora el bot responderá a todos los miembros de ese grupo.

👤 ¿Quieres que el bot también le responda a otras personas en privado?

🔸 Usa el comando: \`.addlista número\`
  Ejemplo: \`.addlista 5491123456789\`
🔸 O responde (cita) un mensaje de la persona y escribe: \`.addlista\`
🔸 Esto autorizará al bot a responderle directamente en su chat privado.

🔧 ¿Deseas personalizar el símbolo o letra para activar los comandos?

🔸 Usa: \`.setprefix\` seguido del nuevo prefijo que quieras usar.
  Ejemplo: \`.setprefix ✨\`
🔸 Una vez cambiado, deberás usar ese prefijo para todos los comandos.
  (Por ejemplo, si pusiste \`✨\`, ahora escribirías \`✨menu\` en lugar de \`.menu\`)

📖 Para ver la lista completa de comandos disponibles, simplemente escribe:
\`.menu\` o \`.help\`

🚀 ¡Disfruta del poder de CORTANA 2.0 y automatiza tu experiencia como nunca antes!`,
            })
            .catch(() => {});

          await fs.writeFile(marker, "ok");
        }
      } else if (connection === "close") {
        console.log(
          `❌ Subbot ${dir} desconectado (Razón: ${DisconnectReason[statusCode] || "Desconocida"}, Código: ${statusCode}).`,
        );

        const isFatalError = [
          DisconnectReason.badSession,
          DisconnectReason.loggedOut,
          DisconnectReason.connectionClosed,
          DisconnectReason.connectionReplaced,
          DisconnectReason.multideviceMismatch,
          DisconnectReason.forbidden,
        ].includes(statusCode);

        if (isFatalError) {
          await cleanupSession(sessionPath);
        } else {
          delete global.subBots[dir];
          if (retryCount < MAX_RECONEXION_INTENTOS) {
            console.log(`🔄 Reintentando conectar ${dir} en ${RETRY_DELAY_MS / 1000} segundos...`);
            setTimeout(() => iniciarSubbot(sessionPath, retryCount + 1), RETRY_DELAY_MS);
          } else {
            console.error(
              `🚫 Se superó el número máximo de reintentos para ${dir}. Se eliminará la sesión.`,
            );
            await cleanupSession(sessionPath);
          }
        }
      }
    });

    /* ── Eventos del bot (mensajes, participantes, etc.) ── */
    subSock.ev.on("group-participants.update", async (update) => {
      try {
        if (!update.id.endsWith("@g.us")) return;

        const chatId = update.id;
        const subbotID = subSock.user.id;
        const filePath = path.join(__dirname, "activossubbots.json");

        let activos = {};
        if (fsSync.existsSync(filePath)) {
          activos = JSON.parse(await fs.readFile(filePath, "utf-8"));
        }

        if (!activos.welcome || !activos.welcome[subbotID] || !activos.welcome[subbotID][chatId])
          return;

        const welcomeTexts = [
          "🎉 ¡Bienvenido(a)! Gracias por unirte al grupo.",
          "👋 ¡Hola! Qué bueno tenerte con nosotros.",
          "🌟 ¡Saludos! Esperamos que la pases genial aquí.",
          "🚀 ¡Bienvenido(a)! Disfruta y participa activamente.",
          "✨ ¡Qué alegría verte por aquí! Pásala bien.",
        ];

        const farewellTexts = [
          "👋 ¡Adiós! Esperamos verte pronto de nuevo.",
          "😢 Se ha ido un miembro del grupo, ¡suerte!",
          "📤 Gracias por estar con nosotros, hasta luego.",
          "🔚 Un miembro se ha retirado. ¡Buena suerte!",
          "💨 ¡Chao! Esperamos que hayas disfrutado del grupo.",
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
              mentions: [participant],
            });
          } else {
            await subSock.sendMessage(chatId, {
              text: `👋 ${mention}\n\n${mensaje}`,
              mentions: [participant],
            });
          }
        }
      } catch (err) {
        console.error("❌ Error en bienvenida/despedida del subbot:", err);
      }
    });

    /* ── Mensajes ────────────────────────────────────────── */
    subSock.ev.on("messages.upsert", async (msg) => {
      try {
        const m = msg.messages[0];
        if (!m || !m.message) return;

        const from = m.key.remoteJid;
        const isGroup = from.endsWith("@g.us");
        const isFromSelf = m.key.fromMe;
        const senderJid = m.key.participant || from;
        const senderNum = senderJid.split("@")[0];
        const rawID = subSock.user?.id || "";
        const subbotID = `${rawID.split(":")[0]}@s.whatsapp.net`;
        const botNum = rawID.split(":")[0].replace(/[^0-9]/g, "");

        const messageText =
          m.message?.conversation ||
          m.message?.extendedTextMessage?.text ||
          m.message?.imageMessage?.caption ||
          m.message?.videoMessage?.caption ||
          "";

        const [dataPrefijos, dataGrupos, dataPriv, activossubbots] = await Promise.all([
          readJsonFile(path.join(__dirname, "prefixes.json")),
          readJsonFile(path.join(__dirname, "grupo.json")),
          readJsonFile(path.join(__dirname, "listasubots.json")),
          readJsonFile(path.join(__dirname, "activossubbots.json")),
        ]);

        await handleAntiDelete(subSock, m, from, isGroup);

        if (isGroup && !isFromSelf) {
          const antilinkActivo = activossubbots.antilink?.[subbotID]?.[from];
          if (antilinkActivo && /https:\/\/chat\.whatsapp\.com\//i.test(messageText)) {
            try {
              const metadata = await subSock.groupMetadata(from);
              const participant = metadata.participants.find((p) => p.id === senderJid);
              const isAdmin = participant?.admin === "admin" || participant?.admin === "superadmin";
              const isOwner = global.owner.some((o) => o[0] === senderNum);
              if (!isAdmin && !isOwner) {
                await subSock.sendMessage(from, { delete: m.key });
                await subSock.sendMessage(from, {
                  text: `⚠️ @${senderNum} envió un enlace de grupo y fue eliminado.`,
                  mentions: [senderJid],
                });
                await subSock.groupParticipantsUpdate(from, [senderJid], "remove");
                return;
              }
            } catch (err) {
              console.error("❌ Error procesando antilink:", err);
            }
          }

          const modoAdminsActivo = activossubbots.modoadmins?.[subbotID]?.[from];
          if (modoAdminsActivo) {
            try {
              const metadata = await subSock.groupMetadata(from);
              const participante = metadata.participants.find((p) => p.id === senderJid);
              const isAdmin =
                participante?.admin === "admin" || participante?.admin === "superadmin";
              const isOwner = global.owner.some(([id]) => id === senderNum);
              const isBot = botNum === senderNum;
              if (!isAdmin && !isOwner && !isBot) return;
            } catch (err) {
              console.error("❌ Error en verificación de modo admins:", err);
              return;
            }
          }
        }

        const customPrefix = dataPrefijos[subbotID];
        const allowedPrefixes = customPrefix ? [customPrefix] : [".", "#"];
        const usedPrefix = allowedPrefixes.find((p) => messageText.startsWith(p));
        if (!usedPrefix) return;

        const body = messageText.slice(usedPrefix.length).trim();
        const command = body.split(" ")[0].toLowerCase();
        const args = body.split(" ").slice(1);

        if (isGroup) {
          const gruposPermitidos = dataGrupos[subbotID] || [];
          if (senderNum !== botNum && !gruposPermitidos.includes(from) && command !== "addgrupo") {
            return;
          }
        } else if (!isFromSelf) {
          const listaPermitidos = dataPriv[subbotID] || [];
          if (!listaPermitidos.includes(senderNum)) {
            return;
          }
        }

        await handleSubCommand(subSock, m, command, args).catch((err) => {
          console.error("❌ Error ejecutando comando del subbot:", err);
        });
      } catch (err) {
        console.error("❌ Error interno en messages.upsert:", err);
      }
    });
  } catch (err) {
    console.error(`❌ Error irrecuperable al cargar el subbot ${dir}:`, err);
    await cleanupSession(sessionPath);
  }
}

async function readJsonFile(filePath) {
  try {
    if (fsSync.existsSync(filePath)) {
      const data = await fs.readFile(filePath, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error(`Error leyendo ${filePath}:`, e);
  }
  return {};
}

async function handleAntiDelete(subSock, m, from, isGroup) {
  const botID = `${subSock.user.id.split(":")[0]}@s.whatsapp.net`;
  const cfgFile = "./activossu.json";
  const cfg = await readJsonFile(cfgFile);

  if (m.message?.protocolMessage?.type === 0) {
    try {
      const delId = m.message.protocolMessage.key.id;
      const whoDel =
        m.message.protocolMessage.key.participant || m.key.participant || m.key.remoteJid;
      const adGroup = cfg.antidelete?.[botID]?.[from] === true;
      const adPriv = cfg.antideletepri?.[botID] === true;
      if (!((isGroup && adGroup) || (!isGroup && adPriv))) return;

      const storeFile = isGroup ? "./gruposu.json" : "./prisu.json";
      const db = await readJsonFile(storeFile);
      const dat = db[delId];
      if (!dat || (dat.sender || "").split("@")[0] !== whoDel.split("@")[0]) return;

      if (isGroup) {
        const grp = await subSock.groupMetadata(from);
        const adm = grp.participants.find((p) => p.id === whoDel)?.admin;
        if (adm) return;
      }

      const mention = [`${whoDel.split("@")[0]}@s.whatsapp.net`];
      if (dat.media) {
        const buf = Buffer.from(dat.media, "base64");
        const tp = dat.type.replace("Message", "");
        const opts = { [tp]: buf, mimetype: dat.mimetype, quoted: m };
        const sent = await subSock.sendMessage(from, opts);
        const caption =
          tp === "sticker"
            ? "📌 El sticker fue eliminado por @"
            : tp === "audio"
              ? "🎧 El audio fue eliminado por @"
              : "📦 Mensaje eliminado por @";
        await subSock.sendMessage(from, {
          text: `${caption}${whoDel.split("@")[0]}`,
          mentions: mention,
          quoted: sent,
        });
      } else if (dat.text) {
        await subSock.sendMessage(
          from,
          {
            text: `📝 *Mensaje eliminado:* ${dat.text}\n👤 *Usuario:* @${whoDel.split("@")[0]}`,
            mentions: mention,
          },
          { quoted: m },
        );
      }
    } catch (e) {
      console.error("❌ Antidelete-restore:", e);
    }
    return;
  }

  try {
    const adGroup = cfg.antidelete?.[botID]?.[from] === true;
    const adPriv = cfg.antideletepri?.[botID] === true;
    if (!((isGroup && adGroup) || (!isGroup && adPriv))) return;

    const storeFile = isGroup ? "./gruposu.json" : "./prisu.json";
    const type = Object.keys(m.message || {})[0];
    const content = m.message[type];
    if (
      [
        "imageMessage",
        "videoMessage",
        "audioMessage",
        "documentMessage",
        "stickerMessage",
      ].includes(type) &&
      (content.fileLength ?? 0) > 8 * 1024 * 1024
    )
      return;

    const reg = {
      chatId: from,
      sender: m.key.participant || (m.key.fromMe ? botID : m.key.remoteJid),
      type,
      timestamp: Date.now(),
    };
    const save64 = async (medType, data) => {
      const stream = await downloadContentFromMessage(data, medType);
      let buff = Buffer.alloc(0);
      for await (const ch of stream) buff = Buffer.concat([buff, ch]);
      reg.media = buff.toString("base64");
      reg.mimetype = data.mimetype;
    };

    if (m.message?.viewOnceMessageV2) {
      const inner = m.message.viewOnceMessageV2.message;
      const iType = Object.keys(inner)[0];
      await save64(iType.replace("Message", ""), inner[iType]);
      reg.type = iType;
    } else if (
      [
        "imageMessage",
        "videoMessage",
        "audioMessage",
        "documentMessage",
        "stickerMessage",
      ].includes(type)
    ) {
      await save64(type.replace("Message", ""), content);
    } else {
      reg.text = m.message.conversation || m.message.extendedTextMessage?.text || "";
    }

    const db = await readJsonFile(storeFile);
    db[m.key.id] = reg;
    await fs.writeFile(storeFile, JSON.stringify(db, null, 2));
  } catch (e) {
    console.error("❌ Antidelete-save:", e);
  }
}

async function cargarSubbots() {
  const base = path.resolve(__dirname, "subbots");
  if (!fsSync.existsSync(base)) {
    fsSync.mkdirSync(base, { recursive: true });
    console.log("📁 Carpeta ./subbots creada automáticamente.");
  }

  const dirs = fsSync
    .readdirSync(base)
    .filter((d) => fsSync.existsSync(path.join(base, d, "creds.json")));

  console.log(`🤖 Cargando ${dirs.length} subbot(s) existentes...`);
  for (const d of dirs) {
    await iniciarSubbot(path.join(base, d)).catch((e) => console.error(`Fallo al cargar ${d}:`, e));
  }
}

/* ─── Ejecución inmediata ──────────────────────────────── */
cargarSubbots();

/* ─── Exportaciones ─────────────────────────────────────── */
module.exports = { cargarSubbots, iniciarSubbot };
