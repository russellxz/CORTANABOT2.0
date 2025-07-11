const fs = require("fs");
const path = require("path");
const { subBots } = require("../indexsubbots");

const handler = async (msg, { conn }) => {
  const number = msg.key?.participant || msg.key.remoteJid;
  const sessionDir = path.join(__dirname, "../subbots");
  const sessionPath = path.join(sessionDir, number);

  const index = subBots.indexOf(sessionPath);
  if (index !== -1) {
    subBots.splice(index, 1);
  }

  if (fs.existsSync(sessionPath)) {
    fs.rmSync(sessionPath, { recursive: true, force: true });
    await conn.sendMessage(msg.key.remoteJid, {
      text: "🗑️ *Tu sesión ha sido eliminada correctamente.*\n\nPuedes volver a usar *#sercode o #code* cuando gustes.",
      quoted: msg,
    });
    console.log(`✅ Carpeta del subbot ${number} eliminada por comando.`);
  } else {
    await conn.sendMessage(msg.key.remoteJid, {
      text: "⚠️ *No se encontró ninguna carpeta activa para eliminar.*",
      quoted: msg,
    });
  }
};

handler.command = ["delbots"];
module.exports = handler;
