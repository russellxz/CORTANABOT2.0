const fs = require("fs");
const path = require("path");
const pino = require("pino");
const { Boom } = require("@hapi/boom");
const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore
} = require("@whiskeysockets/baileys");

module.exports = async (msg, { conn }) => {
  const sender = (msg.key.participant || msg.key.remoteJid).replace("@s.whatsapp.net", "");
  const botNum = conn.user.id.split(":")[0];
  const isOwner = global.owner?.some(([n]) => String(n) === sender);
  const isBotAuthor = msg.key.fromMe;

  if (!isOwner && !isBotAuthor) {
    return conn.sendMessage(msg.key.remoteJid, {
      text: "⛔ *Solo los dueños del bot pueden ejecutar este comando.*"
    }, { quoted: msg });
  }

  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: "♻️", key: msg.key }
  });

  const subDir = "./subbots";
  const live = [];
  const dead = [];

  if (fs.existsSync(subDir)) {
    const dirs = fs.readdirSync(subDir)
      .filter(d => fs.existsSync(path.join(subDir, d, "creds.json")));

    for (const d of dirs) {
      const sessPath = path.join(subDir, d);

      try {
        const { state, saveCreds } = await useMultiFileAuthState(sessPath);
        const { version } = await fetchLatestBaileysVersion();

        const testSock = makeWASocket({
          version,
          logger: pino({ level: "silent" }),
          auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" }))
          },
          connectTimeoutMs: 8000,
          browser: ["Azura Check", "Firefox", "1.0"]
        });

        const result = await new Promise((res) => {
          let timeout = setTimeout(() => res(false), 10000);
          testSock.ev.on("connection.update", ({ connection }) => {
            if (connection === "open") {
              clearTimeout(timeout);
              res(true);
            }
            if (connection === "close") {
              clearTimeout(timeout);
              res(false);
            }
          });
          testSock.ev.on("creds.update", saveCreds);
        });

        if (result) {
          live.push(d);
        } else {
          fs.rmSync(sessPath, { recursive: true, force: true });
          dead.push(d);
        }
      } catch {
        fs.rmSync(sessPath, { recursive: true, force: true });
        dead.push(d);
      }
    }
  }

  const text = [
    "✅ *Sesiones operativas:*",
    live.length ? live.map(x => "• " + x).join("\n") : "_ninguna_",
    "",
    "🗑️ *Sesiones eliminadas (sin conexión o error):*",
    dead.length ? dead.map(x => "• " + x).join("\n") : "_ninguna_"
  ].join("\n");

  await conn.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });

  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: "✅", key: msg.key }
  });
};

module.exports.command = ["cargabots"];
module.exports.desc = "Verifica sub-bots y elimina solo las sesiones cerradas o corruptas";
