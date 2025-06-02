const fs = require("fs");
const path = require("path");
const { downloadContentFromMessage } = require("@whiskeysockets/baileys");

const handler = async (msg, { conn, args }) => {
  const chatId = msg.key.remoteJid;
  const senderId = msg.key.participant || msg.key.remoteJid;
  const filePath = "./ventas365.json";

  if (!chatId.endsWith("@g.us")) {
    return conn.sendMessage(chatId, {
      text: "❌ Este comando solo funciona en grupos.",
    }, { quoted: msg });
  }

  // Verificar si es admin
  const metadata = await conn.groupMetadata(chatId);
  const participante = metadata.participants.find(p => p.id === senderId);
  const isAdmin = participante?.admin === "admin" || participante?.admin === "superadmin";

  if (!isAdmin && !msg.key.fromMe) {
    return conn.sendMessage(chatId, {
      text: "🚫 Este comando solo puede ser usado por administradores.",
    }, { quoted: msg });
  }

  let ventas = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : {};

  const texto = args.join(" ").trim();
  const ctx = msg.message?.extendedTextMessage?.contextInfo;
  const quotedImage = ctx?.quotedMessage?.imageMessage;

  if (!texto && !quotedImage) {
    return conn.sendMessage(chatId, {
      text: `✏️ Usa el comando así:\n\n*• setnetflix [texto]*\n*• O responde a una imagen con: setnetflix [texto]*`,
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
  ventas[chatId]["setnetflix"] = {
    texto,
    imagen: imagenBase64
  };

  fs.writeFileSync(filePath, JSON.stringify(ventas, null, 2));
  await conn.sendMessage(chatId, { text: "✅ *NETFLIX actualizado con éxito.*" }, { quoted: msg });
};

handler.command = ["setnetflix"];
module.exports = handler;
