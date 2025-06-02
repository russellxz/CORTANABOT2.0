const fs = require("fs");
const path = require("path");

const isOwner = (num) => {
  num = num.replace(/[^0-9]/g, "");
  const owners = global.owner.map(([id]) => id);
  return owners.includes(num);
};

const handler = async (msg, { conn }) => {
  const senderId = msg.key.participant || msg.key.remoteJid;
  const senderClean = senderId.replace(/[^0-9]/g, '');

  if (!isOwner(senderClean)) {
    return conn.sendMessage(msg.key.remoteJid, {
      text: "❌ Solo el owner del bot puede usar este comando."
    }, { quoted: msg });
  }

  const subbotsPath = path.resolve('./subbots');

  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: "⏳", key: msg.key }
  });

  if (!fs.existsSync(subbotsPath)) {
    return conn.sendMessage(msg.key.remoteJid, {
      text: "📂 No hay carpeta de subbots encontrada."
    }, { quoted: msg });
  }

  const carpetas = fs.readdirSync(subbotsPath);
  let totalEliminados = 0;
  let logs = [];

  for (const carpeta of carpetas) {
    const rutaSesion = path.join(subbotsPath, carpeta);
    if (!fs.existsSync(rutaSesion)) continue;

    const archivos = fs.readdirSync(rutaSesion);
    let eliminados = 0;

    for (const archivo of archivos) {
      if (archivo !== 'creds.json') {
        try {
          fs.unlinkSync(path.join(rutaSesion, archivo));
          eliminados++;
          totalEliminados++;
        } catch (e) {
          console.error(`❌ Error al eliminar ${archivo} de ${carpeta}:`, e);
        }
      }
    }

    logs.push(`📁 *${carpeta}*: ${eliminados} archivo(s) eliminados`);
  }

  await conn.sendMessage(msg.key.remoteJid, {
    text: `✅ *Sesiones limpiadas exitosamente*\n\n${logs.join('\n')}\n\n🧹 Total eliminados: *${totalEliminados}* archivo(s)`,
  }, { quoted: msg });

  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: "✅", key: msg.key }
  });
};

handler.command = ['delsubbots'];
module.exports = handler;
