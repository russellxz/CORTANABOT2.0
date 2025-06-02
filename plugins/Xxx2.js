// plugins/xxx2.js
const Checker = require("../libs/nsfw");
const { downloadContentFromMessage } = require("@whiskeysockets/baileys");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const os = require("os");
const path = require("path");

const handler = async (msg, { conn }) => {
  const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
  const chatId = msg.key.remoteJid;

  // Reacción inicial
  await conn.sendMessage(chatId, { react: { text: "🔍", key: msg.key } });

  if (!quoted) {
    return conn.sendMessage(
      chatId,
      { text: "❌ *Responde a un video, imagen o sticker para analizar NSFW.*" },
      { quoted: msg }
    );
  }

  let buffer, mimeType;

  if (quoted.videoMessage) {
    // --- Video: conviértelo a WebP (una sola imagen estática) ---
    const stream = await downloadContentFromMessage(quoted.videoMessage, "video");
    buffer = Buffer.alloc(0);
    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

    // Archivos temporales
    const tmpId = msg.key.id.replace(/[^a-zA-Z0-9]/g, "");
    const inputPath = path.join(os.tmpdir(), `${tmpId}.mp4`);
    const outputPath = path.join(os.tmpdir(), `${tmpId}.webp`);
    await fs.promises.writeFile(inputPath, buffer);

    // Extrae un frame y guarda como WebP
    await new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .outputOptions([
          "-vframes 1",                                // solo 1 fotograma
          "-vf scale=512:512:force_original_aspect_ratio=decrease,pad=512:512:-1:-1:color=white@0.0",
          "-vcodec libwebp",
          "-qscale 80"
        ])
        .save(outputPath)
        .on("end", resolve)
        .on("error", reject);
    });

    buffer = await fs.promises.readFile(outputPath);
    mimeType = "image/webp";

    // Limpia temporales
    fs.unlink(inputPath, ()=>{});
    fs.unlink(outputPath, ()=>{});

  } else if (quoted.imageMessage || quoted.stickerMessage) {
    // --- Imagen o sticker: igual que antes ---
    const mediaType = quoted.imageMessage ? "image" : "sticker";
    const media = quoted.imageMessage || quoted.stickerMessage;
    mimeType = media.mimetype || "image/png";

    const stream = await downloadContentFromMessage(media, mediaType);
    buffer = Buffer.alloc(0);
    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
  } else {
    return conn.sendMessage(
      chatId,
      { text: "❌ *Tipo no soportado. Usa video, imagen o sticker.*" },
      { quoted: msg }
    );
  }

  try {
    // Analiza con Checker NSFW
    const checker = new Checker();
    const result = await checker.response(buffer, mimeType);

    if (!result.status) throw new Error(result.msg || "Error desconocido.");

    const { NSFW, percentage, response } = result.result;
    const estado = NSFW
      ? "🔞 *NSFW detectado*"
      : "✅ *Contenido seguro*";

    // Envía resultado
    await conn.sendMessage(
      chatId,
      { text: `${estado}\n📊 *Confianza:* ${percentage}\n\n${response}` },
      { quoted: msg }
    );

  } catch (err) {
    console.error("❌ Error en comando xxx2:", err);
    await conn.sendMessage(
      chatId,
      { text: `❌ *Error al analizar el archivo:* ${err.message}` },
      { quoted: msg }
    );
  }
};

handler.command = ["xxx"];
handler.tags = ["tools"];
handler.help = ["xxx <responde a un video, imagen o sticker>"];
module.exports = handler;
