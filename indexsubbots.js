const path = require("path");
const fs = require("fs");
const pino = require("pino");
const { Boom } = require("@hapi/boom");

// --- Cargar Baileys (ESM) desde CommonJS usando import() dinámico ---
let makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  DisconnectReason,
  downloadContentFromMessage,
  Browsers;

async function loadBaileys() {
  const m = await import("@whiskeysockets/baileys");
  // Compatibilidad: algunas versiones exportan default y otras named
  makeWASocket = m.default ?? m.makeWASocket;
  useMultiFileAuthState = m.useMultiFileAuthState;
  fetchLatestBaileysVersion = m.fetchLatestBaileysVersion;
  makeCacheableSignalKeyStore = m.makeCacheableSignalKeyStore;
  DisconnectReason = m.DisconnectReason;
  downloadContentFromMessage = m.downloadContentFromMessage;
  Browsers = m.Browsers;
}

// Manejo de errores global para evitar que el subbot se detenga
process.on("uncaughtException", (err) => {
  console.error("\x1b[31m%s\x1b[0m", "⚠️ Error no manejado:", err);
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("\x1b[31m%s\x1b[0m", "🚨 Promesa rechazada sin manejar:", promise, "razón:", reason);
});

const subBots = [];
const reconnectionAttempts = new Map();

function loadSubPlugins() {
  const out = [];
  const dir = path.join(__dirname, "plugins2");
  if (!fs.existsSync(dir)) return out;

  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".js"))) {
    const plugin = require(path.join(dir, file));
    if (plugin?.command) out.push(plugin);
  }
  return out;
}

async function handleSubCommand(sock, msg, command, args) {
  const plugin = loadSubPlugins().find((p) => p.command.includes(command.toLowerCase()));
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

async function iniciarSubBot(sessionPath) {
  // Asegura que Baileys esté cargado (ESM -> CJS)
  if (!makeWASocket) await loadBaileys();

  if (subBots.includes(sessionPath)) return;
  subBots.push(sessionPath);
  if (!fs.existsSync(sessionPath)) return;

  const dir = path.basename(sessionPath);
  const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
  const { version } = await fetchLatestBaileysVersion();

  const browser =
    Browsers?.windows?.("Chrome") ?? ["Windows", "Chrome", "121.0.0"];

  const subSock = makeWASocket({
    version,
    logger: pino({ level: "silent" }),
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" })),
    },
    browser, // ["Azura Subbot", "Firefox", "2.0"] si prefieres fijo
    syncFullHistory: false,
  });

  subSock.ev.on("creds.update", saveCreds);

  subSock.ev.on("connection.update", async ({ connection, lastDisconnect }) => {
    if (connection === "open") {
      console.log(`✔️ Subbot ${dir} online.`);
      reconnectionAttempts.set(sessionPath, 0);
    }
    if (connection === "close") {
      const statusCode = new Boom(lastDisconnect?.error)?.output?.statusCode;
      console.log(`❌ Subbot ${dir} desconectado (status: ${statusCode}).`);

      const shouldReconnect =
        statusCode !== DisconnectReason?.loggedOut &&
        statusCode !== DisconnectReason?.badSession &&
        statusCode !== DisconnectReason?.forbidden &&
        statusCode !== 403;

      if (shouldReconnect) {
        if (!fs.existsSync(sessionPath)) {
          console.log(`ℹ️ La sesión para ${dir} fue eliminada. Cancelando reconexión.`);
          reconnectionAttempts.delete(sessionPath);
          const idx = subBots.indexOf(sessionPath);
          if (idx !== -1) subBots.splice(idx, 1);
          return;
        }

        const attempts = (reconnectionAttempts.get(sessionPath) || 0) + 1;
        reconnectionAttempts.set(sessionPath, attempts);

        if (attempts <= 3) {
          console.log(`💱 Intentando reconectar a ${dir}... (Intento ${attempts}/3)`);
          const idx = subBots.indexOf(sessionPath);
          if (idx !== -1) subBots.splice(idx, 1);
          setTimeout(() => {
            iniciarSubBot(sessionPath).catch((e) =>
              console.error(`Error al reiniciar subbot ${dir}:`, e),
            );
          }, 5000);
        } else {
          console.log(`❌ Límite de reconexión alcanzado para ${dir}. Eliminando sesión permanentemente.`);
          const idx = subBots.indexOf(sessionPath);
          if (idx !== -1) subBots.splice(idx, 1);
          if (fs.existsSync(sessionPath)) fs.rmSync(sessionPath, { recursive: true, force: true });
          reconnectionAttempts.delete(sessionPath);
        }
      } else {
        console.log(`❌ No se pudo reconectar con el bot ${dir}. Eliminando sesión.`);
        const idx = subBots.indexOf(sessionPath);
        if (idx !== -1) subBots.splice(idx, 1);
        if (fs.existsSync(sessionPath)) fs.rmSync(sessionPath, { recursive: true, force: true });
        reconnectionAttempts.delete(sessionPath);
      }
    }
  });

  await socketEvents(subSock);
}

async function socketEvents(subSock) {
  subSock.ev.on("group-participants.update", async (update) => {
    try {
      if (!update.id.endsWith("@g.us")) return;

      if (!["add", "remove"].includes(update.action)) return;

      const chatId = update.id;
      const subbotID = subSock.user.id;
      const filePath = path.join(__dirname, "activossubbots.json");

      let activos = {};
      if (fs.existsSync(filePath)) {
        activos = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      }

      if (!activos.welcome || !activos.welcome[subbotID] || !activos.welcome[subbotID][chatId]) {
        return;
      }

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

  subSock.ev.on("messages.upsert", async (msg) => {
    try {
      const m = msg.messages[0];
      if (!m || !m.message) {
        return;
      }
      const from = m.key.remoteJid;
      const isGroup = from.endsWith("@g.us");
      const isFromSelf = m.key.fromMe;
      const senderJid = m.key.participant || from;
      const senderNum = senderJid.split("@")[0];
      const rawID = subSock.user?.id || "";
      const subbotID = `${rawID.split(":")[0]}@s.whatsapp.net`;

      // === LÓGICA COMANDOS DESDE STICKER (SUBBOT) ===
try {
  const rawID = subSock.user?.id || "";
  const subbotID = `${rawID.split(":")[0]}@s.whatsapp.net`;
  const jsonPath = path.resolve("./comandossubbots.json");

  if (m.message?.stickerMessage && fs.existsSync(jsonPath)) {
    const fileSha = m.message.stickerMessage.fileSha256?.toString("base64");
    const comandosData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

    if (comandosData?.[subbotID]?.[fileSha]) {
      const commandText = comandosData[subbotID][fileSha].trim();
      const parts = commandText.split(" ");
      const mainCommand = parts[0].toLowerCase(); // sin prefijo
      const args = parts.slice(1);

      const chatId = m.key.remoteJid;
      const sender = m.key.participant || m.key.remoteJid;

      const contextInfo = m.message?.stickerMessage?.contextInfo || {};
      const quotedMsg = contextInfo.quotedMessage || null;
      const quotedParticipant = contextInfo.participant || null;

      const fakeMessage = {
        ...m,
        message: {
          extendedTextMessage: {
            text: commandText,
            contextInfo: {
              quotedMessage: quotedMsg,
              participant: quotedParticipant,
              stanzaId: contextInfo.stanzaId || "",
              remoteJid: contextInfo.remoteJid || chatId
            }
          }
        },
        body: commandText,
        text: commandText,
        command: mainCommand,
        key: {
          ...m.key,
          fromMe: false,
          participant: sender
        }
      };

      await handleSubCommand(subSock, fakeMessage, mainCommand, args);
      return; // ⛔️ MUY IMPORTANTE: que no ejecute el comando 2 veces
    }
  }
} catch (err) {
  console.error("❌ Error ejecutando comando desde sticker:", err);
}
// === FIN LÓGICA STICKER ===
      
      
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

// === BLOQUEO AUTOMÁTICO A NÚMEROS ÁRABES EN PRIVADO ===
if (!isGroup && !isFromSelf) {
  const arabicPrefixes = [
  "20",   // Egipto 🇪🇬
  "212",  // Marruecos 🇲🇦
  "213",  // Argelia 🇩🇿
  "216",  // Túnez 🇹🇳
  "218",  // Libia 🇱🇾
  "220",  // Gambia (aunque no árabe, algunos números se confunden)
  "222",  // Mauritania 🇲🇷
  "224",  // Guinea (usado también por usuarios árabes)
  "230",  // Mauricio
  "249",  // Sudán 🇸🇩
  "963",  // Siria 🇸🇾
  "964",  // Irak 🇮🇶
  "965",  // Kuwait 🇰🇼
  "966",  // Arabia Saudita 🇸🇦
  "967",  // Yemen 🇾🇪
  "968",  // Omán 🇴🇲
  "970",  // Palestina 🇵🇸
  "971",  // Emiratos Árabes Unidos 🇦🇪
  "972",  // Israel (muchos árabes usan sim ahí) 🇮🇱
  "973",  // Baréin 🇧🇭
  "974",  // Catar 🇶🇦
  "975",  // Bután (no árabe, pero se cuelan algunos)
  "976",  // Mongolia (a veces mal identificado)
  "980",  // Número temporal en WhatsApp usado por cuentas árabes
  "961",  // Líbano 🇱🇧
  "962",  // Jordania 🇯🇴
  "960",  // Maldivas (islámico, algunos bots árabes)
  "992",  // Tayikistán (minoría musulmana árabe)
  "998",  // Uzbekistán (ídem anterior)
];

  const senderID = m.key.participant || m.key.remoteJid;
  const senderNum = senderID.split("@")[0];

  const isArabic = arabicPrefixes.some(prefix => senderNum.startsWith(prefix));

  if (isArabic) {
    try {
      await subSock.updateBlockStatus(`${senderNum}@s.whatsapp.net`, "block");

      const myNumber = `${subSock.user?.id.split(":")[0]}@s.whatsapp.net`;

      await subSock.sendMessage(myNumber, {
        text: `🚫 *Se bloqueó automáticamente al número árabe:* +${senderNum}\n\n📵 Razón: sistema de protección de subbots (anti árabes).\n\nSi fue un error, desbloquéalo manualmente.`
      });

      console.log(`☪️ Subbot bloqueó al árabe +${senderNum}`);
    } catch (err) {
      console.error("❌ Error al bloquear número árabe:", err.message);
    }

    return; // No procesar más ese mensaje
  }
}
      //fin de la logica de bloqueo de arabe


      
      /* ========== GUARDADO ANTIDELETE (SUB-BOT) ========== */
      try {
        const isGroup = from.endsWith("@g.us");
        const botID = subSock.user.id.split(":")[0] + "@s.whatsapp.net";

        const cfgFile = "./activossu.json";
        const cfg = fs.existsSync(cfgFile) ? JSON.parse(fs.readFileSync(cfgFile, "utf8")) : {};

        const adGroup = cfg.antidelete?.[botID]?.[from] === true;
        const adPriv = cfg.antideletepri?.[botID] === true;
        if ((isGroup && !adGroup) || (!isGroup && !adPriv)) {
          /* off */
        } else {
          const store = isGroup ? "./gruposu.json" : "./prisu.json";
          if (!fs.existsSync(store)) {
            fs.writeFileSync(store, "{}");
          }
          const type = Object.keys(m.message || {})[0];
          const content = m.message[type];
          const msgId = m.key.id;
          const senderId = m.key.participant || (m.key.fromMe ? botID : m.key.remoteJid);
          const bigMedia = [
            "imageMessage",
            "videoMessage",
            "audioMessage",
            "documentMessage",
            "stickerMessage",
          ];
          const sizeOk = !bigMedia.includes(type) || (content.fileLength ?? 0) <= 8 * 1024 * 1024;
          if (!sizeOk) {
            /* demasiado grande; no se guarda */
          } else {
            const reg = { chatId: from, sender: senderId, type, timestamp: Date.now() };

            const save64 = async (medType, data) => {
              const stream = await downloadContentFromMessage(data, medType);
              let buff = Buffer.alloc(0);
              for await (const ch of stream) {
                buff = Buffer.concat([buff, ch]);
              }
              reg.media = buff.toString("base64");
              reg.mimetype = data.mimetype;
            };

            if (m.message?.viewOnceMessageV2) {
              const inner = m.message.viewOnceMessageV2.message;
              const iType = Object.keys(inner)[0];
              await save64(iType.replace("Message", ""), inner[iType]);
              reg.type = iType;
            } else if (bigMedia.includes(type)) {
              await save64(type.replace("Message", ""), content);
            } else {
              reg.text = m.message.conversation || m.message.extendedTextMessage?.text || "";
            }

            const db = JSON.parse(fs.readFileSync(store, "utf8"));
            db[msgId] = reg;
            fs.writeFileSync(store, JSON.stringify(db, null, 2));
          }
        }
      } catch (e) {
        console.error("❌ Antidelete-save:", e);
      }
      /* ========== DETECCIÓN Y REPOSICIÓN ========== */
      if (m.message?.protocolMessage?.type === 0) {
        try {
          const delId = m.message.protocolMessage.key.id;
          const whoDel = m.message.protocolMessage.key.participant || senderJid;
          const isGroup = from.endsWith("@g.us");
          const botID = `${subSock.user.id.split(":")[0]}@s.whatsapp.net`;
          const cfgFile = "./activossu.json";
          const cfg = fs.existsSync(cfgFile) ? JSON.parse(fs.readFileSync(cfgFile, "utf8")) : {};
          const adGroup = cfg.antidelete?.[botID]?.[from] === true;
          const adPriv = cfg.antideletepri?.[botID] === true;
          if ((isGroup && !adGroup) || (!isGroup && !adPriv)) {
            return;
          }
          const store = isGroup ? "./gruposu.json" : "./prisu.json";
          if (!fs.existsSync(store)) {
            return;
          }
          const db = JSON.parse(fs.readFileSync(store, "utf8"));
          const dat = db[delId];
          if (!dat) {
            return;
          }
          if (isGroup) {
            const grp = await subSock.groupMetadata(from);
            const adm = grp.participants.find((p) => p.id === whoDel)?.admin;
            if (adm) {
              return;
            }
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
      }
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
            const participant = metadata.participants.find((p) => p.id === senderJid);
            const isAdmin = participant?.admin === "admin" || participant?.admin === "superadmin";
            const isOwner = global.owner.some((o) => o[0] === senderNum);

            if (!isAdmin && !isOwner) {
              await subSock.sendMessage(from, { delete: m.key });

              await subSock.sendMessage(from, {
                text: `⚠️ @${senderNum} envió un enlace de grupo de WhatsApp y fue eliminado.`,
                mentions: [senderJid],
              });

              await subSock.groupParticipantsUpdate(from, [senderJid], "remove");
            }
          } catch (err) {
            console.error("❌ Error procesando antilink:", err);
          }
        }
      }
      
// === INICIO LÓGICA GRUPO AUTORIZADO ===
if (isGroup) {
  try {
    const grupoPath = path.resolve("./grupo.json");
    const activosPath = path.resolve("./activossubbots.json");
    const prefixPath = path.resolve("./prefixes.json");

    const rawID = subSock.user?.id || "";
    const subbotID = `${rawID.split(":")[0]}@s.whatsapp.net`;
    const botNum = rawID.split(":")[0].replace(/[^0-9]/g, "");

    const messageText =
      m.message?.conversation ||
      m.message?.extendedTextMessage?.text ||
      m.message?.imageMessage?.caption ||
      m.message?.videoMessage?.caption ||
      "";

    let dataPrefijos = {};
    try {
      if (fs.existsSync(prefixPath)) {
        dataPrefijos = JSON.parse(fs.readFileSync(prefixPath, "utf-8"));
      }
    } catch {}

    const customPrefix = dataPrefijos[subbotID];
    const allowedPrefixes = customPrefix ? [customPrefix] : [".", "#"];
    const usedPrefix = allowedPrefixes.find((p) => messageText.startsWith(p));
    if (!usedPrefix) return;

    const body = messageText.slice(usedPrefix.length).trim();
    const command = body.split(" ")[0].toLowerCase();
    const allowedCommands = ["addgrupo"];

    let dataGrupos = {};
    if (fs.existsSync(grupoPath)) {
      dataGrupos = JSON.parse(fs.readFileSync(grupoPath, "utf-8"));
    }

    let modoActivo = false;
    if (fs.existsSync(activosPath)) {
      const activos = JSON.parse(fs.readFileSync(activosPath, "utf-8"));
      modoActivo = activos[from] === true;
    }

    const gruposPermitidos = Array.isArray(dataGrupos[subbotID]) ? dataGrupos[subbotID] : [];

    const isOwner = global.owner?.some(([id]) => id === senderNum);

    if (
      senderNum !== botNum &&
      !gruposPermitidos.includes(from) &&
      !allowedCommands.includes(command) &&
      !(modoActivo && isOwner)
    ) {
      return;
    }

  } catch (err) {
    console.error("❌ Error en verificación de grupo autorizado:", err);
    return;
  }
}
// === FIN LÓGICA GRUPO AUTORIZADO ===
// === INICIO BLOQUEO DE MENSAJES DE USUARIOS MUTEADOS (SUBBOTS) ===
try {
  const chatId = m.key.remoteJid;
  const isGroup = chatId.endsWith("@g.us");

  if (isGroup) {
    const senderId = m.key.participant || m.key.remoteJid;
    const mutePath = "./mutesubbots.json";
    const muteData = fs.existsSync(mutePath) ? JSON.parse(fs.readFileSync(mutePath)) : {};
    const muteList = muteData[chatId] || [];

    if (muteList.includes(senderId)) {
      global._muteCounter = global._muteCounter || {};
      const key = `${chatId}:${senderId}`;
      global._muteCounter[key] = (global._muteCounter[key] || 0) + 1;

      const count = global._muteCounter[key];

      if (count === 8) {
        await subSock.sendMessage(chatId, {
          text: `⚠️ @${senderId.split("@")[0]} estás *muteado*.\nSigue enviando mensajes y podrías ser eliminado.`,
          mentions: [senderId]
        });
      }

      if (count === 13) {
        await subSock.sendMessage(chatId, {
          text: `⛔ @${senderId.split("@")[0]} estás al *límite*.\nSi envías *otro mensaje*, serás eliminado del grupo.`,
          mentions: [senderId]
        });
      }

      if (count >= 15) {
        const metadata = await subSock.groupMetadata(chatId);
        const user = metadata.participants.find(p => p.id === senderId);
        const isAdmin = user?.admin === 'admin' || user?.admin === 'superadmin';

        if (!isAdmin) {
          await subSock.groupParticipantsUpdate(chatId, [senderId], "remove");
          await subSock.sendMessage(chatId, {
            text: `❌ @${senderId.split("@")[0]} fue eliminado por ignorar el mute.`,
            mentions: [senderId]
          });
          delete global._muteCounter[key];
        } else {
          await subSock.sendMessage(chatId, {
            text: `🔇 @${senderId.split("@")[0]} es administrador y no se puede eliminar.`,
            mentions: [senderId]
          });
        }
      }

      // eliminar mensaje del usuario muteado
      await subSock.sendMessage(chatId, {
        delete: {
          remoteJid: chatId,
          fromMe: false,
          id: m.key.id,
          participant: senderId
        }
      });

      return; // ⛔ Detener aquí si está muteado
    }
  }
} catch (err) {
  console.error("❌ Error en lógica de muteo subbots:", err);
}
// === FIN BLOQUEO DE MENSAJES DE USUARIOS MUTEADOS (SUBBOTS) ===
// === INICIO LÓGICA MODOADMINS SUBBOT ===
      if (isGroup && !isFromSelf) {
        try {
          const activossubPath = path.resolve("./activossubbots.json");
          if (!fs.existsSync(activossubPath)) {
            return;
          }
          const dataActivados = JSON.parse(fs.readFileSync(activossubPath, "utf-8"));
          const subbotID = subSock.user?.id || "";
          const modoAdminsActivo = dataActivados.modoadmins?.[subbotID]?.[from];

          if (modoAdminsActivo) {
            const metadata = await subSock.groupMetadata(from);
            const participante = metadata.participants.find((p) => p.id === senderJid);
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

          if (
            !listaPermitidos.includes(senderNum) &&
            !global.owner.some(([id]) => id === senderNum)
          ) {
            return; // 🚫 Usuario no autorizado, ignorar mensaje privado
          }
        }
      }
      // === FIN LÓGICA PRIVADO AUTORIZADO ===
      const customPrefix = dataPrefijos[subbotID];
      const allowedPrefixes = customPrefix ? [customPrefix] : [".", "#"];
      const usedPrefix = allowedPrefixes.find((p) => messageText.startsWith(p));
      if (!usedPrefix) {
        return;
      }

      const body = messageText.slice(usedPrefix.length).trim();
      const command = body.split(" ")[0].toLowerCase();
      const args = body.split(" ").slice(1);

      await handleSubCommand(subSock, m, command, args).catch((err) => {
        console.error("❌ Error ejecutando comando del subbot:", err);
      });
    } catch (err) {
      console.error("❌ Error interno en mensajes.upsert:", err);
    }
  });
}

async function cargarSubBots() {
  const base = path.resolve(__dirname, "subbots");
  if (!fs.existsSync(base)) {
    fs.mkdirSync(base, { recursive: true });
    console.log("📁 Carpeta ./subbots creada automáticamente.");
  }

  const dirs = fs.readdirSync(base).filter((d) => fs.existsSync(path.join(base, d, "creds.json")));

  console.log(`🤖 Cargando ${dirs.length} subbot(s) conectados…`);
  await Promise.all(dirs.map((d) => iniciarSubBot(path.join(base, d))));
}

module.exports = { subBots, cargarSubBots, socketEvents, iniciarSubBot, reconnectionAttempts };
