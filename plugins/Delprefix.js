const fs = require("fs");
const path = require("path");

const handler = async (msg, { conn, text }) => {
  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: "🗑️", key: msg.key }
  });

  const sender = msg.key.participant || msg.key.remoteJid;
  const senderNum = sender.replace(/\D/g, "");
  const isFromMe = msg.key.fromMe;
  const isOwner = global.owner.some(([id]) => id === senderNum);

  if (!isOwner && !isFromMe) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: "⛔ Este comando solo puede ser usado por *owners del bot principal*."
    }, { quoted: msg });
  }

  let target;
  if (msg.message?.extendedTextMessage?.contextInfo?.participant) {
    target = msg.message.extendedTextMessage.contextInfo.participant;
  } else if (text && text.trim() !== "") {
    target = text;
  }

  if (!target) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: "⚠️ Debes citar un mensaje o escribir el número del subbot para eliminar su prefijo."
    }, { quoted: msg });
  }

  target = target.replace(/\D/g, "") + "@s.whatsapp.net";

  const filePath = path.resolve("prefixes.json");
  let data = {};

  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }

  if (!data[target]) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: "ℹ️ Ese subbot no tiene un prefijo asignado."
    }, { quoted: msg });
  }

  delete data[target];
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  await conn.sendMessage(msg.key.remoteJid, {
    text: `✅ Prefijo eliminado correctamente para *@${target.split("@")[0]}*.`,
    mentions: [target]
  }, { quoted: msg });
};

handler.command = ['delprefix'];
module.exports = handler;
