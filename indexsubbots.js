const path = require("path");
const fs = require("fs");
const pino = require("pino");
const { Boom } = require("@hapi/boom");
const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  DisconnectReason,
  downloadContentFromMessage, // ← función para descargar multimedia
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
  if (!fs.existsSync(dir)) return out;

  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".js"))) {
    try {
      const plugin = require(path.join(dir, file));
      if (plugin && plugin.command) out.push(plugin);
    } catch (e) {
      console.error(`Error cargando plugin de subbot ${file}:`, e);
    }
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

/**
 * Elimina de forma segura una sesión de subbot.
 * @param {string} sessionPath - La ruta a la carpeta de la sesión.
 */
function cleanupSession(sessionPath) {
  if (global.subBots[sessionPath]) {
    delete global.subBots[sessionPath];
  }
  if (fs.existsSync(sessionPath)) {
    fs.rmSync(sessionPath, { recursive: true, force: true });
    console.log(`🧹 Sesión eliminada en: ${path.basename(sessionPath)}`);
  }
}

/* ─── Iniciar un sub-bot (exportado) ─────────────────────── */
async function iniciarSubbot(sessionPath, retryCount = 0) {
  if (global.subBots[sessionPath]) return; // Ya está activo o en proceso

  const dir = path.basename(sessionPath);
  console.log(`🟡 Intentando iniciar subbot: ${dir} (Intento: ${retryCount + 1})`);

  /* ⭐ Si la carpeta no existe, créala */
  if (!fs.existsSync(sessionPath)) {
    fs.mkdirSync(sessionPath, { recursive: true });
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
    });

    global.subBots[sessionPath] = subSock; // Registra el socket

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
        retryCount = 0; // Reinicia el contador de reintentos en una conexión exitosa

        /* Mantiene el mensaje fantasma para inicializar sender-key */
        subSock
          .sendMessage("status@broadcast", { text: "🟢 sub-bot online" })
          .then((r) => subSock.sendMessage("status@broadcast", { delete: r.key }))
          .catch(() => {});

        /* ── 📩 Mensaje de bienvenida SOLO la primera vez ── */
        const marker = path.join(sessionPath, ".welcomeSent");
        if (!fs.existsSync(marker)) {
          const ownerJid = subSock.user.id.split(":")[0] + "@s.whatsapp.net";
          subSock
            .sendMessage(ownerJid, {
              text: `✨ ¡Hola! Bienvenido al sistema de SubBots Premium de Azura Ultra 2.0 ✨

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

🚀 ¡Disfruta del poder de Azura Ultra 2.0 y automatiza tu experiencia como nunca antes!`,
            })
            .catch(() => {}); // silencia si usuario bloqueó al bot

          fs.writeFileSync(marker, "ok"); // crea el marcador
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

        // Si es un error fatal, elimina la sesión por completo.
        if (isFatalError) {
          cleanupSession(sessionPath);
        } else {
          // Si es un error temporal, intenta reconectar.
          delete global.subBots[sessionPath]; // Elimina del registro para permitir el reintento
          if (retryCount < MAX_RECONEXION_INTENTOS) {
            console.log(`🔄 Reintentando conectar ${dir} en ${RETRY_DELAY_MS / 1000} segundos...`);
            setTimeout(() => iniciarSubbot(sessionPath, retryCount + 1), RETRY_DELAY_MS);
          } else {
            console.error(
              `🚫 Se superó el número máximo de reintentos para ${dir}. Se eliminará la sesión.`,
            );
            cleanupSession(sessionPath);
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
        if (fs.existsSync(filePath)) {
          activos = JSON.parse(fs.readFileSync(filePath, "utf-8"));
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
            if (!fs.existsSync(store)) fs.writeFileSync(store, "{}");

            const type = Object.keys(m.message || {})[0];
            const content = m.message[type];
            const msgId = m.key.id;

            /* quién envió */
            const senderId = m.key.participant || (m.key.fromMe ? botID : m.key.remoteJid);

            /* límite 8 MB */
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
              const reg = {
                chatId: from,
                sender: senderId,
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
        /* ========== FIN GUARDADO ========== */

        /* ========== DETECCIÓN Y REPOSICIÓN ========== */
        if (m.message?.protocolMessage?.type === 0) {
          try {
            const delId = m.message.protocolMessage.key.id;
            const whoDel = m.message.protocolMessage.key.participant || senderJid;
            const isGroup = from.endsWith("@g.us");
            const botID = subSock.user.id.split(":")[0] + "@s.whatsapp.net";

            const cfgFile = "./activossu.json";
            const cfg = fs.existsSync(cfgFile) ? JSON.parse(fs.readFileSync(cfgFile, "utf8")) : {};
            const adGroup = cfg.antidelete?.[botID]?.[from] === true;
            const adPriv = cfg.antideletepri?.[botID] === true;
            if ((isGroup && !adGroup) || (!isGroup && !adPriv)) return;

            const store = isGroup ? "./gruposu.json" : "./prisu.json";
            if (!fs.existsSync(store)) return;

            const db = JSON.parse(fs.readFileSync(store, "utf8"));
            const dat = db[delId];
            if (!dat) return;

            /* sólo si autor = quien borró */
            if ((dat.sender || "").split("@")[0] !== whoDel.split("@")[0]) return;

            /* omite si era admin borrando en grupo */
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
        }
        /* ========== FIN DETECCIÓN/REPOSICIÓN ========== */

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
              const participante = metadata.participants.find((p) => p.id === senderJid);
              const isAdmin =
                participante?.admin === "admin" || participante?.admin === "superadmin";

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
            const usedPrefix = allowedPrefixes.find((p) => messageText.startsWith(p));
            if (!usedPrefix) return; // No tiene prefijo válido

            const body = messageText.slice(usedPrefix.length).trim();
            const command = body.split(" ")[0].toLowerCase();

            const allowedCommands = ["addgrupo"]; // Comando permitido aún si no está autorizado el grupo

            let dataGrupos = {};
            if (fs.existsSync(grupoPath)) {
              dataGrupos = JSON.parse(fs.readFileSync(grupoPath, "utf-8"));
            }

            const gruposPermitidos = Array.isArray(dataGrupos[subbotID])
              ? dataGrupos[subbotID]
              : [];

            // ⚠️ Solo bloquear si NO es el subbot hablando
            if (
              senderNum !== botNum &&
              !gruposPermitidos.includes(from) &&
              !allowedCommands.includes(command)
            ) {
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
        const usedPrefix = allowedPrefixes.find((p) => messageText.startsWith(p));
        if (!usedPrefix) return;

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
  } catch (err) {
    console.error(`❌ Error irrecuperable al cargar el subbot ${dir}:`, err);
    cleanupSession(sessionPath); // Limpia la sesión si hay un error en la carga inicial
  }
}

/* ─── Carga inicial al arrancar ─────────────────────────── */
async function cargarSubbots() {
  const base = path.resolve(__dirname, "subbots");
  if (!fs.existsSync(base)) {
    fs.mkdirSync(base, { recursive: true });
    console.log("📁 Carpeta ./subbots creada automáticamente.");
  }

  const dirs = fs.readdirSync(base).filter((d) => fs.existsSync(path.join(base, d, "creds.json")));

  console.log(`🤖 Cargando ${dirs.length} subbot(s) existentes...`);
  for (const d of dirs) {
    await iniciarSubbot(path.join(base, d)).catch((e) => console.error(`Fallo al cargar ${d}:`, e));
  }
}

/* ─── Ejecución inmediata ──────────────────────────────── */
cargarSubbots();

/* ─── Exportaciones ─────────────────────────────────────── */
module.exports = { cargarSubbots, iniciarSubbot };
