// plugins/delco.js
const fs = require("fs");
const path = require("path");

const handler = async (msg, { conn }) => {
  const chatId = msg.key.remoteJid;
  const isGroup = chatId.endsWith("@g.us");
  const senderId = msg.key.participant || msg.key.remoteJid;
  const senderNum = senderId.replace(/[^0-9]/g, "");
  const isOwner = global.owner.some(([id]) => id === senderNum);
  const isFromMe = msg.key.fromMe;

  // Verificación de permisos
  if (isGroup && !isOwner && !isFromMe) {
    const metadata = await conn.groupMetadata(chatId);
    const participant = metadata.participants.find(p => p.id === senderId);
    const isAdmin = participant?.admin === "admin" || participant?.admin === "superadmin";

    if (!isAdmin) {
      return conn.sendMessage(chatId, {
        text: "🚫 *Solo los administradores, el owner o el bot pueden usar este comando.*"
      }, { quoted: msg });
    }
  } else if (!isGroup && !isOwner && !isFromMe) {
    return conn.sendMessage(chatId, {
      text: "🚫 *Solo el owner o el mismo bot pueden usar este comando en privado.*"
    }, { quoted: msg });
  }

  // Verifica que se responda a un sticker
  const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
  if (!quoted?.stickerMessage) {
    return conn.sendMessage(chatId, {
      text: "❌ *Responde a un sticker que tenga comando asignado.*"
    }, { quoted: msg });
  }

  const fileSha = quoted.stickerMessage.fileSha256?.toString("base64");
  if (!fileSha) {
    return conn.sendMessage(chatId, {
      text: "❌ *No se pudo identificar el sticker.*"
    }, { quoted: msg });
  }

  const jsonPath = path.resolve("./comandos.json");
  if (!fs.existsSync(jsonPath)) {
    return conn.sendMessage(chatId, {
      text: "❌ *No hay comandos registrados aún.*"
    }, { quoted: msg });
  }

  const data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

  if (!data[fileSha]) {
    return conn.sendMessage(chatId, {
      text: "⚠️ *Este sticker no tiene ningún comando asignado.*",
      quoted: msg
    });
  }

  delete data[fileSha];
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));

  await conn.sendMessage(chatId, {
    react: { text: "🗑️", key: msg.key }
  });

  return conn.sendMessage(chatId, {
    text: "✅ *Comando del sticker eliminado correctamente.*",
    quoted: msg
  });
};

handler.command = ["delco"];
handler.tags = ["tools"];
handler.help = ["delco <responder al sticker>"];
module.exports = handler;
