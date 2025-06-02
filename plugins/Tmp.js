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

  const tmpPath = path.resolve('./tmp');

  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: "⏳", key: msg.key }
  });

  if (!fs.existsSync(tmpPath)) {
    return conn.sendMessage(msg.key.remoteJid, {
      text: "📂 La carpeta /tmp no existe."
    }, { quoted: msg });
  }

  const archivos = fs.readdirSync(tmpPath);
  let eliminados = 0;

  for (const archivo of archivos) {
    try {
      fs.unlinkSync(path.join(tmpPath, archivo));
      eliminados++;
    } catch (e) {
      console.error(`❌ Error al eliminar ${archivo}:`, e);
    }
  }

  const respuesta = eliminados === 0
    ? '✅ No había archivos que eliminar en /tmp.'
    : `✅ Se eliminaron ${eliminados} archivo(s) de /tmp.`;

  await conn.sendMessage(msg.key.remoteJid, {
    text: respuesta
  }, { quoted: msg });

  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: "✅", key: msg.key }
  });
};

handler.command = ['deltmp'];
module.exports = handler;
