/**************************  plugins2/cargabots.js  **************************
   • Verifica cada carpeta de sesión en ./subbots/
   • Si la credencial se conecta ⇒ la mantiene y la añade a “reconectados”
   • Si no se conecta en ≤ 10 s ⇒ elimina la carpeta y la añade a “eliminados”
   • Al terminar llama  cargarSubbots()  para que el sistema vuelva a leer
     todo desde cero (igual que hace serbot.js cuando crea una sesión nueva)
*****************************************************************************/
const fs   = require("fs");
const path = require("path");
const pino = require("pino");
const { Boom } = require("@hapi/boom");
const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore
} = require("@whiskeysockets/baileys");

/* función del sistema de sub-bots */
const { cargarSubbots } = require("../indexsubbots");

module.exports = async (msg, { conn, args }) => {
  /* ── Sólo owners o el propio bot ───────────────────────── */
  const sender = (msg.key.participant || msg.key.remoteJid)
                  .replace("@s.whatsapp.net", "");
  const botNum = conn.user.id.split(":")[0];
  const isOwner     = global.owner?.some(([n]) => String(n) === sender);
  const isBotAuthor = msg.key.fromMe;
  if (!isOwner && !isBotAuthor) {
    return conn.sendMessage(msg.key.remoteJid,
      { text: "⛔ *Solo los dueños del bot pueden ejecutar este comando.*" },
      { quoted: msg });
  }

  await conn.sendMessage(msg.key.remoteJid,
    { react:{ text:"♻️", key:msg.key } });

  /* ── Recorre ./subbots ─────────────────────────────────── */
  const subDir = "./subbots";
  const live   = [];
  const dead   = [];

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
          logger: pino({ level:"silent" }),
          auth:{
            creds: state.creds,
            keys : makeCacheableSignalKeyStore(state.keys, pino({ level:"silent" }))
          },
          connectTimeoutMs: 8_000,          // conexión rápida
          browser:["Azura Check","Firefox","1.0"]
        });

        const ok = await new Promise(res => {
          let done = false;
          const to = setTimeout(() => { if (!done){ done=true; res(false);} }, 10_000);

          testSock.ev.on("connection.update", ({ connection }) => {
            if (connection==="open" && !done){ done=true; clearTimeout(to); res(true); }
            if (connection==="close"&& !done){ done=true; clearTimeout(to); res(false);}
          });

          testSock.ev.on("creds.update", saveCreds);
        });

        if (ok) {
          live.push(d);
        } else {
          fs.rmSync(sessPath,{recursive:true,force:true});
          dead.push(d);
        }
      } catch {
        fs.rmSync(sessPath,{recursive:true,force:true});
        dead.push(d);
      }
    }
  }

  /* ── Informe ───────────────────────────────────────────── */
  const text = [
    "✅ *Sesiones operativas:*",
    live.length ? live.map(x=>"• "+x).join("\n") : "_ninguna_",
    "",
    "🗑️ *Sesiones eliminadas (sin conexión):*",
    dead.length ? dead.map(x=>"• "+x).join("\n") : "_ninguna_"
  ].join("\n");

  await conn.sendMessage(msg.key.remoteJid,{ text },{ quoted:msg });

  /* ── Re-carga todo el sistema de sub-bots ─────────────── */
  try { await cargarSubbots(); } catch(e){ console.error(e); }

  await conn.sendMessage(msg.key.remoteJid,
    { react:{ text:"✅", key:msg.key } });
};

module.exports.command = ["cargabots"];
module.exports.desc    = "Verifica sub-bots, elimina sesiones caídas y recarga el sistema";
