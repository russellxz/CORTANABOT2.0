const fs = require("fs");
const path = require("path");

const handler = async (msg, { conn }) => {
  const senderId = msg.key.participant || msg.key.remoteJid;
  const senderClean = senderId.replace(/[^0-9]/g, '');

  if (!isOwner(senderClean)) {
    return conn.sendMessage(msg.key.remoteJid, {
      text: '❌ Solo el owner del bot puede usar este comando.'
    }, { quoted: msg });
  }

  const sessionPath = path.resolve('./sessions');

  try {
    if (!fs.existsSync(sessionPath)) {
      return conn.sendMessage(msg.key.remoteJid, {
        text: '📂 La carpeta /sessions no existe.'
      }, { quoted: msg });
    }

    const archivos = fs.readdirSync(sessionPath);
    let eliminados = 0;

    for (const archivo of archivos) {
      if (archivo !== 'creds.json') {
        fs.unlinkSync(path.join(sessionPath, archivo));
        eliminados++;
      }
    }

    if (eliminados === 0) {
      await conn.sendMessage(msg.key.remoteJid, {
        text: '✅ No se eliminaron archivos. Solo existe creds.json.'
      }, { quoted: msg });
    } else {
      await conn.sendMessage(msg.key.remoteJid, {
        text: `✅ Se eliminaron ${eliminados} archivo(s) de /sessions (excepto creds.json).`
      }, { quoted: msg });
    }

  } catch (error) {
    console.error('❌ Error al limpiar /sessions:', error);
    await conn.sendMessage(msg.key.remoteJid, {
      text: '❌ Ocurrió un error al intentar limpiar la carpeta.'
    }, { quoted: msg });
  }
};

handler.command = ['delsesion'];
module.exports = handler;
