const fs = require("fs");

const handler = async (msg, { conn }) => {
  const chatId = msg.key.remoteJid;
  const filePath = "./ventas365.json";

  if (!fs.existsSync(filePath)) {
    return conn.sendMessage(chatId, { text: "❌ No hay datos guardados aún." }, { quoted: msg });
  }

  const ventas = JSON.parse(fs.readFileSync(filePath));
  const data = ventas[chatId]?.setpago;

  if (!data || (!data.texto && !data.imagen)) {
    return conn.sendMessage(chatId, { text: "❌ No hay información de pago guardada con setpago." }, { quoted: msg });
  }

  if (data.imagen) {
    const buffer = Buffer.from(data.imagen, "base64");
    await conn.sendMessage(chatId, {
      image: buffer,
      caption: data.texto || "💳 Información de pago"
    }, { quoted: msg });
  } else {
    await conn.sendMessage(chatId, { text: data.texto }, { quoted: msg });
  }
};

handler.command = ["pago"];
module.exports = handler;
