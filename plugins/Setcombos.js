const fs = require("fs");
const path = require("path");
const { downloadContentFromMessage } = require("@whiskeysockets/baileys");

const handler = async (msg, { conn, args }) => {
  const chatId = msg.key.remoteJid;
  const senderId = msg.key.participant || msg.key.remoteJid;
  const senderClean = senderId.replace(/[^0-9]/g, "");
  const metadata = await conn.groupMetadata(chatId);
  const isAdmin = metadata.participants.find(p => p.id === senderId)?.admin;
  const isOwner = global.owner.some(([id]) => id === senderClean);
  const isFromMe = msg.key.fromMe;

  if (!isAdmin && !isOwner && !isFromMe) {
    return conn.sendMessage(chatId, {
      text: "🚫 Solo administradores o owner pueden usar este comando.",
    }, { quoted: msg });
  }

  const filePath = "./ventas365.json";
  let ventas = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : {};

  const texto = args.join(" ").trim();
  const ctx = msg.message?.extendedTextMessage?.contextInfo;
  const quotedImage = ctx?.quotedMessage?.imageMessage;

  if (!texto && !quotedImage) {
    return conn.sendMessage(chatId, {
      text: `✏️ Usa el comando así:\n\n*• setcombos [texto]*\n*• O responde a una imagen con: setcombos [texto]*`,
    }, { quoted: msg });
  }

  let imagenBase64 = null;
  if (quotedImage) {
    const stream = await downloadContentFromMessage(quotedImage, "image");
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    imagenBase64 = buffer.toString("base64");
  }

  if (!ventas[chatId]) ventas[chatId] = {};
  ventas[chatId]["setcombos"] = {
    texto,
    imagen: imagenBase64
  };

  fs.writeFileSync(filePath, JSON.stringify(ventas, null, 2));
  await conn.sendMessage(chatId, { text: "✅ *COMBOS actualizado con éxito.*" }, { quoted: msg });
};

handler.command = ["setcombos"];
module.exports = handler;
