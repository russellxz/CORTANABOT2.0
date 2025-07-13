const fs = require("fs");
const path = require("path");
const { Boom } = require("@hapi/boom");
const pino = require("pino");
const QRCode = require("qrcode");
const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  DisconnectReason,
} = require("@whiskeysockets/baileys");

const { subBots, socketEvents, reconnectionAttempts } = require("../indexsubbots");

const MAX_SUBBOTS = 200;

const handler = async (msg, { conn, command, sock }) => {
  const usarPairingCode = ["sercode", "code"].includes(command);
  let sentCodeMessage = false;

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function serbot() {
    const number = msg.key?.participant || msg.key.remoteJid;
    const sessionDir = path.join(__dirname, "../subbots");
    const sessionPath = path.join(sessionDir, number);
    const rid = number.split("@")[0];
    try {
      if (subBots.includes(sessionPath)) {
        return await conn.sendMessage(
          msg.key.remoteJid,
          {
            text: "ℹ️ *Ese subbot ya existe.* 🧹 Usa *.delbots* para borrar tu sesión actual🔁 Luego pide un nuevo código con: *.code* o *.sercode*",
          },
          { quoted: msg },
        );
      }

      subBots.push(sessionPath);

      /* ───────── VERIFICACIÓN DE LÍMITE ───────── */
      if (!fs.existsSync(sessionDir)) {
        fs.mkdirSync(sessionDir, { recursive: true });
      }

      const subbotDirs = fs
        .readdirSync(sessionDir)
        .filter((d) => fs.existsSync(path.join(sessionDir, d, "creds.json")));

      if (subbotDirs.length >= MAX_SUBBOTS) {
        await conn.sendMessage(
          msg.key.remoteJid,
          {
            text: `🚫 *Límite alcanzado:* existen ${subbotDirs.length}/${MAX_SUBBOTS} sesiones de sub-bot activas.\nVuelve a intentarlo más tarde.`,
          },
          { quoted: msg },
        );
        return;
      }
      const restantes = MAX_SUBBOTS - subbotDirs.length;
      await conn.sendMessage(
        msg.key.remoteJid,
        {
          text: `ℹ️ Quedan *${restantes}* espacios disponibles para conectar nuevos sub-bots.`,
        },
        { quoted: msg },
      );
      /* ─────────────────────────────────────────── */

      await conn.sendMessage(msg.key.remoteJid, { react: { text: "⌛", key: msg.key } });

      let socky;
      async function createSocket() {
        const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
        const { version } = await fetchLatestBaileysVersion();
        const logger = pino({ level: "silent" });

        socky = makeWASocket({
          version,
          logger,
          auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, logger),
          },
          printQRInTerminal: !usarPairingCode,
          browser: ["Windows", "Chrome"],
          syncFullHistory: false,
        });

        return { socky, saveCreds };
      }

      let readyBot = false;
      let connectionTimeout;

      async function setupSocketEvents() {
        const { socky, saveCreds } = await createSocket();

        connectionTimeout = setTimeout(async () => {
          if (!readyBot) {
            await conn.sendMessage(
              msg.key.remoteJid,
              {
                text: "⏰ *Tiempo de espera agotado.*\nNo se escaneó el código a tiempo. Vuelve a intentarlo.",
              },
              { quoted: msg },
            );

            const index = subBots.indexOf(sessionPath);
            if (index !== -1) subBots.splice(index, 1);

            socky.end(new Error("Timeout"));
            if (fs.existsSync(sessionPath)) {
              fs.rmSync(sessionPath, { recursive: true, force: true });
            }
          }
        }, 120_000);

        socky.ev.on("connection.update", async ({ qr, connection, lastDisconnect }) => {
          if (qr && !sentCodeMessage) {
            if (usarPairingCode) {
              const code = await socky.requestPairingCode(rid);
              await conn.sendMessage(
                msg.key.remoteJid,
                {
                  video: { url: "https://cdn.russellxz.click/b0cbbbd3.mp4" },
                  caption:
                    "🔐 *Código generado:*\nAbre WhatsApp > Vincular dispositivo y pega el siguiente código:",
                  gifPlayback: true,
                },
                { quoted: msg },
              );
              await sleep(1000);
              await conn.sendMessage(
                msg.key.remoteJid,
                { text: `${code}` },
                { quoted: msg },
              );
            } else {
              const qrImage = await QRCode.toBuffer(qr);
              await conn.sendMessage(
                msg.key.remoteJid,
                {
                  image: qrImage,
                  caption:
                    "📲 Escanea este código QR desde *WhatsApp > Vincular dispositivo* para conectarte como sub-bot.",
                },
                { quoted: msg },
              );
            }
            sentCodeMessage = true;
          }

          if (connection === "open") {
            readyBot = true;
            clearTimeout(connectionTimeout);
            reconnectionAttempts.set(sessionPath, 0);
            await conn.sendMessage(
              msg.key.remoteJid,
              {
                text: `🤖 𝙎𝙐𝘽𝘽𝙊𝙏 𝘾𝙊𝙉𝙀𝘾𝙏𝘼𝘿𝙊 - CORTANA 2.0

✅ 𝘽𝙞𝙚𝙣𝙫𝙚𝙣𝙞𝙙𝙤 𝙖𝙡 𝙨𝙞𝙨𝙩𝙚𝙢𝙖 𝙥𝙧𝙚𝙢𝙞𝙪𝙢 𝙙𝙚 CORTANA 2.0 𝘽𝙊𝙏  
🛰️ 𝙏𝙪 𝙨𝙪𝙗𝙗𝙤𝙩 𝙮𝙖 𝙚𝙨𝙩á 𝙚𝙣 𝙡í𝙣𝙚𝙖 𝙮 𝙤𝙥𝙚𝙧𝙖𝙩𝙞𝙫𝙤.

📩 *𝙄𝙈𝙋𝙊𝙍𝙏𝘼𝙉𝙏𝙀*  
𝙍𝙚𝙫𝙞𝙨𝙖 𝙩𝙪 𝙢𝙚𝙣𝙨𝙖𝙟𝙚 𝙥𝙧𝙞𝙫𝙖𝙙𝙤.  
𝘼𝙝í 𝙚𝙣𝙘𝙤𝙣𝙩𝙧𝙖𝙧á𝙨 𝙞𝙣𝙨𝙩𝙧𝙪𝙘𝙘𝙞𝙤𝙣𝙚𝙨 𝙘𝙡𝙖𝙧𝙖𝙨 𝙙𝙚 𝙪𝙨𝙤.  
*Si no entiendes es porque la inteligencia te intenta alcanzar, pero tú eres más rápido que ella.*  
_𝙊 𝙨𝙚𝙖... 𝙚𝙧𝙚𝙨 𝙪𝙣 𝙗𝙤𝙗𝙤 UN TREMENDO ESTÚPIDO_ 🤖💀

🛠️ 𝘾𝙤𝙢𝙖𝙣𝙙𝙤𝙨 𝙗á𝙨𝙞𝙘𝙤𝙨:  
• \`help\` → 𝘼𝙮𝙪𝙙𝙖 𝙜𝙚𝙣𝙚𝙧𝙖𝙡  
• \`menu\` → 𝙇𝙞𝙨𝙩𝙖 𝙙𝙚 𝙘𝙤𝙢𝙖𝙣𝙙𝙤𝙨

ℹ️ 𝙈𝙤𝙙𝙤 𝙖𝙘𝙩𝙪𝙖𝙡: 𝙋𝙍𝙄𝙑𝘼𝘿𝙊  
☑️ 𝙎ó𝙡𝙤 𝙩ú 𝙥𝙪𝙚𝙙𝙚𝙨 𝙪𝙨𝙖𝙧𝙡𝙤 𝙥𝙤𝙧 𝙖𝙝𝙤𝙧𝙖.
🤡 *mira tu privado para que sepas
como hacer que otros puedan usarlo* 🤡

✨ *𝘾𝙖𝙢𝙗𝙞𝙖𝙧 𝙥𝙧𝙚𝙛𝙞𝙟𝙤:*  
Usa: \`.setprefix ✨\`  
Después deberás usar ese nuevo prefijo para activar comandos.  
(𝙀𝙟: \`✨menu\`)

🧹 *𝘽𝙤𝙧𝙧𝙖𝙧 𝙩𝙪 𝙨𝙚𝙨𝙞ó𝙣:*  
• \`.delbots\`  
• Solicita un nuevo código con: \`.code\` o \`.sercode\`

💎 *BY 𝙎𝙠𝙮 𝙐𝙡𝙩𝙧𝙖 𝙋𝙡𝙪𝙨* 💎`,
              },
              { quoted: msg },
            );
            await conn.sendMessage(msg.key.remoteJid, { react: { text: "✅", key: msg.key } });
            const ownerJid = `${socky.user.id.split(":")[0]}@s.whatsapp.net`;
            socky
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
              .catch(() => {
                return;
              });
            await socketEvents(socky);
          }

          if (connection === "close") {
            clearTimeout(connectionTimeout);
            const statusCode = new Boom(lastDisconnect?.error)?.output?.statusCode;
            console.log(`❌ Subbot ${sessionPath} desconectado (status: ${statusCode}).`);

            const shouldReconnect =
              statusCode !== DisconnectReason.loggedOut &&
              statusCode !== DisconnectReason.badSession &&
              statusCode !== DisconnectReason.forbidden &&
              statusCode !== 403;

            if (shouldReconnect) {
              const attempts = (reconnectionAttempts.get(sessionPath) || 0) + 1;
              reconnectionAttempts.set(sessionPath, attempts);

              if (attempts <= 3) {
                console.log(`💱 Intentando reconectar! (Intento ${attempts}/3)`);
                if (!readyBot && statusCode !== DisconnectReason.restartRequired) {
                  await conn.sendMessage(
                    msg.key.remoteJid,
                    {
                      text: `╭───〔 *⚠️ SUBBOT* 〕───╮
│
│⚠️ *Problema de conexión detectado:*
│ Razón: ${statusCode}
│ Intentando reconectar...
│
│ 🔄 Si el problema persiste, ejecuta:
│ #delbots
│ para eliminar tu sesión y solicita una nueva con:
│ #sercode / #code
│
╰────✦ *Sky Ultra Plus* ✦────╯`,
                    },
                    { quoted: msg },
                  );
                }
                const index = subBots.indexOf(sessionPath);
                if (index !== -1) subBots.splice(index, 1);

                setTimeout(() => {
                  if (fs.existsSync(sessionPath)) {
                    subBots.push(sessionPath);
                    setupSocketEvents().catch((e) => console.error("Error en reconexión:", e));
                  } else {
                    console.log(`ℹ️ La sesión ${sessionPath} fue eliminada. Cancelando reconexión.`);
                    reconnectionAttempts.delete(sessionPath);
                  }
                }, 3000);
              } else {
                console.log(
                  `❌ Límite de reconexión alcanzado para ${sessionPath}. Eliminando sesión.`,
                );
                await conn.sendMessage(
                  msg.key.remoteJid,
                  {
                    text: `⚠️ *Límite de reconexión alcanzado.*\nLa sesión ha sido eliminada. Usa ${global.prefix}sercode para volver a conectar.`,
                  },
                  { quoted: msg },
                );

                const index = subBots.indexOf(sessionPath);
                if (index !== -1) subBots.splice(index, 1);

                if (fs.existsSync(sessionPath)) {
                  fs.rmSync(sessionPath, { recursive: true, force: true });
                }
                reconnectionAttempts.delete(sessionPath);
              }
            } else {
              console.log(`❌ No se puede reconectar con el bot ${sessionPath}.`);
              if (!readyBot) {
                await conn.sendMessage(
                  msg.key.remoteJid,
                  {
                    text: `⚠️ *Sesión eliminada.*\n${statusCode}\nUsa ${global.prefix}sercode para volver a conectar.`,
                  },
                  { quoted: msg },
                );
              }
              const index = subBots.indexOf(sessionPath);
              if (index !== -1) subBots.splice(index, 1);
              if (fs.existsSync(sessionPath)) {
                fs.rmSync(sessionPath, { recursive: true, force: true });
              }
            }
          }
        });

        socky.ev.on("creds.update", saveCreds);
      }

      await setupSocketEvents();
    } catch (e) {
      console.error("❌ Error en serbot:", e);

      const index = subBots.indexOf(sessionPath);
      if (index !== -1) {
        subBots.splice(index, 1);
      }
      await conn.sendMessage(
        msg.key.remoteJid,
        { text: `❌ *Error inesperado:* ${e.message}` },
        { quoted: msg },
      );
    }
  }

  await serbot();
};

handler.command = ["sercode", "code", "jadibot", "serbot", "qr"];
handler.tags = ["owner"];
handler.help = ["serbot", "code"];
module.exports = handler;
