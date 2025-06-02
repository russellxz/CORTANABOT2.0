const axios = require("axios");
const FormData = require("form-data");

const handler = async (msg, { conn }) => {
  const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
  const chat = msg.key.remoteJid;

  if (!quoted?.imageMessage) {
    return await conn.sendMessage(chat, {
      text: "❌ *Debes responder a una imagen para convertirla a estilo anime.*"
    }, { quoted: msg });
  }

  // Reacción
  await conn.sendMessage(chat, {
    react: { text: "✨", key: msg.key }
  });

  try {
    const { downloadContentFromMessage } = require("@whiskeysockets/baileys");
    const stream = await downloadContentFromMessage(quoted.imageMessage, "image");

    let buffer = Buffer.alloc(0);
    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

    // Subir a russell.click
    const form = new FormData();
    form.append("file", buffer, { filename: "anime.jpg" });

    const uploadRes = await axios.post("https://cdn.russellxz.click/upload.php", form, {
      headers: form.getHeaders()
    });

    const imageUrl = uploadRes.data?.url;
    if (!imageUrl) {
      throw new Error("No se pudo subir la imagen.");
    }

    // Enviar a API de neoxr
    const api = `https://api.neoxr.eu/api/toanime?image=${encodeURIComponent(imageUrl)}&apikey=russellxz`;
    const animeRes = await axios.get(api);
    const resultUrl = animeRes.data?.data?.url;

    if (!resultUrl) {
      throw new Error("No se pudo generar la imagen anime.");
    }

    await conn.sendMessage(chat, {
      image: { url: resultUrl },
      caption: `🖼️ *Aquí tienes tu versión anime estilo waifu!*\n\n© Azura Ultra 2.0`
    }, { quoted: msg });

    await conn.sendMessage(chat, {
      react: { text: "✅", key: msg.key }
    });

  } catch (e) {
    console.error("❌ Error en toanime2:", e);
    await conn.sendMessage(chat, {
      text: "❌ *Ocurrió un error al convertir la imagen. Intenta con otra.*"
    }, { quoted: msg });

    await conn.sendMessage(chat, {
      react: { text: "❌", key: msg.key }
    });
  }
};

handler.command = ["toanime2"];
module.exports = handler;
