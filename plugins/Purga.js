const fs = require("fs");
const path = require("path");
const { subBots } = require("../indexsubbots");

const handler = async (msg, { conn }) => {
  const senderId = msg.key.participant || msg.key.remoteJid;
  const senderNum = senderId.replace(/[^0-9]/g, "");
  const isOwner = global.owner?.some(([num]) => num === senderNum);
  if (!isOwner) {
    return conn.sendMessage(msg.key.remoteJid, {
      text: "🚫 *Solo el owner puede usar este comando.*",
      quoted: msg,
    });
  }

  // Obtener número objetivo por mención o cita
  const contextInfo = msg.message?.extendedTextMessage?.contextInfo;
  const mentioned = contextInfo?.mentionedJid?.[0];
  const quoted = contextInfo?.participant;
  const targetJid = mentioned || quoted;

  if (!targetJid) {
    return conn.sendMessage(msg.key.remoteJid, {
      text: "⚠️ *Debes mencionar o responder al subbot que deseas eliminar.*",
      quoted: msg,
    });
  }

  const cleanNumber = targetJid.replace(/[^0-9]/g, "");
  const sessionDir = path.join(__dirname, "../subbots");
  const sessionPath = path.join(sessionDir, `${cleanNumber}@s.whatsapp.net`);

  const index = subBots.indexOf(sessionPath);
  if (index !== -1) {
    subBots.splice(index, 1);
  }

  if (fs.existsSync(sessionPath)) {
    fs.rmSync(sessionPath, { recursive: true, force: true });
    await conn.sendMessage(msg.key.remoteJid, {
      text: `🧹 *Sesión del subbot @${cleanNumber} eliminada correctamente.*`,
      mentions: [`${cleanNumber}@s.whatsapp.net`],
      quoted: msg,
    });
    console.log(`✅ Carpeta de subbot ${cleanNumber} purgada por owner.`);
  } else {
    await conn.sendMessage(msg.key.remoteJid, {
      text: `⚠️ *No se encontró ninguna sesión activa para @${cleanNumber}.*`,
      mentions: [`${cleanNumber}@s.whatsapp.net`],
      quoted: msg,
    });
  }
};

handler.command = ["purga"];
handler.tags = ["owner"];
handler.help = ["purga"];
module.exports = handler;
