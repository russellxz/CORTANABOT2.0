const fs = require("fs");
const path = require("path");

const handler = async (msg, { conn }) => {
  const chatId = msg.key.remoteJid;
  const sender = msg.key.participant || msg.key.remoteJid;
  const senderNum = sender.replace(/[^0-9]/g, "");
  const isOwner = global.owner.some(([id]) => id === senderNum);

  if (!isOwner) {
    return conn.sendMessage(chatId, {
      text: "❌ Este comando solo puede usarlo el *dueño del bot*."
    }, { quoted: msg });
  }

  const filePath = "./activos.json";
  const data = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
    : {};

  if (!data.apagado) data.apagado = {};
  data.apagado[chatId] = true;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  await conn.sendMessage(chatId, {
    text: "🔒 *Bot apagado en este grupo.*"
  }, { quoted: msg });
};

handler.command = ["apagar"];
module.exports = handler;
