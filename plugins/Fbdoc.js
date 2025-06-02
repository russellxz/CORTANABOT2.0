const axios = require("axios");
const fs = require("fs");
const path = require("path");

const handler = async (msg, { conn, text, command }) => {
  const chatId = msg.key.remoteJid;

  if (!text) {
    return await conn.sendMessage(chatId, {
      text: `✳️ Ejemplo de uso:\n📌 *${global.prefix + command}* https://fb.watch/ncowLHMp-x/`
    }, { quoted: msg });
  }

  if (!text.match(/(www\.facebook\.com|fb\.watch)/gi)) {
    return await conn.sendMessage(chatId, {
      text: `❌ *Enlace de Facebook inválido.*\n\n📌 Ejemplo:\n${global.prefix + command} https://fb.watch/ncowLHMp-x/`
    }, { quoted: msg });
  }

  await conn.sendMessage(chatId, {
    react: { text: '⏳', key: msg.key }
  });

  try {
    const res = await axios.get(`https://api.dorratz.com/fbvideo?url=${encodeURIComponent(text)}`);
    const results = res.data;

    if (!results || results.length === 0 || !results[0].url) {
      return await conn.sendMessage(chatId, {
        text: "❌ No se pudo obtener el video."
      }, { quoted: msg });
    }

    const videoUrl = results[0].url;

    const tmpDir = path.resolve('./tmp');
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

    const filePath = path.join(tmpDir, `fb-${Date.now()}.mp4`);

    // Descargar y guardar el archivo
    const videoRes = await axios.get(videoUrl, { responseType: "stream" });
    const writer = fs.createWriteStream(filePath);

    await new Promise((resolve, reject) => {
      videoRes.data.pipe(writer);
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    // Verificamos que existe antes de continuar
    if (!fs.existsSync(filePath)) {
      return await conn.sendMessage(chatId, {
        text: "❌ El archivo no se guardó correctamente. Intenta nuevamente."
      }, { quoted: msg });
    }

    // Validar tamaño
    const stats = fs.statSync(filePath);
    const sizeMB = stats.size / (1024 * 1024);
    if (sizeMB > 500) {
      fs.unlinkSync(filePath);
      return await conn.sendMessage(chatId, {
        text: `❌ *El archivo pesa ${sizeMB.toFixed(2)}MB y excede el límite de 500MB.*`
      }, { quoted: msg });
    }

    // Enviar el archivo guardado
    const caption = `📄 *Resoluciones disponibles:*\n${results.map(r => `- ${r.resolution}`).join('\n')}\n\n📥 *Video descargado como documento (720p)*\n🍧 *API:* api.dorratz.com\n\n───────\n© Azura Ultra`;

    await conn.sendMessage(chatId, {
      document: fs.readFileSync(filePath),
      mimetype: "video/mp4",
      fileName: "facebook_video.mp4",
      caption
    }, { quoted: msg });

    fs.unlinkSync(filePath);
    await conn.sendMessage(chatId, {
      react: { text: "✅", key: msg.key }
    });

  } catch (err) {
    console.error("❌ Error en fbdoc:", err);
    await conn.sendMessage(chatId, {
      text: "❌ Ocurrió un error al procesar o enviar el video."
    }, { quoted: msg });
  }
};

handler.command = ["fbdoc", "facebookdoc"];
module.exports = handler;
