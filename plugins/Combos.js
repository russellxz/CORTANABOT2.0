const fs = require("fs");
const path = require("path");

const handler = async (msg, { conn }) => {
  const chatId = msg.key.remoteJid;
  const filePath = "./ventas365.json";

  let ventas = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : {};
  const data = ventas[chatId]?.setcombos;

  if (!data) {
    return conn.sendMessage(chatId, {
      text: "⚠️ No se ha establecido ningún texto para *combos* en este grupo.",
    }, { quoted: msg });
  }

  if (data.imagen) {
    const imagenBuffer = Buffer.from(data.imagen, "base64");
    return conn.sendMessage(chatId, {
      image: imagenBuffer,
      caption: data.texto
    }, { quoted: msg });
  } else {
    return conn.sendMessage(chatId, { text: data.texto }, { quoted: msg });
  }
};

handler.command = ["combos"];
module.exports = handler;
