const fs = require("fs");
const path = require("path");
const axios = require("axios");

const handler = async (msg, { conn, text, args, command }) => {
  const rawID = conn.user?.id || "";
  const subbotID = rawID.split(":")[0] + "@s.whatsapp.net";

  const prefixPath = path.resolve("prefixes.json");
  let prefixes = {};
  if (fs.existsSync(prefixPath)) {
    prefixes = JSON.parse(fs.readFileSync(prefixPath, "utf-8"));
  }
  const usedPrefix = prefixes[subbotID] || ".";

  if (!text) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: `⚠️ *Ejemplo de uso:*\n📌 ${usedPrefix + command} https://vm.tiktok.com/ZMjdrFCtg/`
    }, { quoted: msg });
  }

  if (!isUrl(args[0]) || !args[0].includes("tiktok")) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: "❌ *Enlace de TikTok inválido.*"
    }, { quoted: msg });
  }

  try {
    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: "⏱️", key: msg.key }
    });

    const response = await axios.get(`https://api.dorratz.com/v2/tiktok-dl?url=${args[0]}`);

    if (!response.data || !response.data.data || !response.data.data.media) {
      throw new Error("La API no devolvió un video válido.");
    }

    const videoData = response.data.data;
    const videoUrl = videoData.media.org;
    const videoTitle = videoData.title || "Sin título";
    const videoAuthor = videoData.author.nickname || "Desconocido";
    const videoDuration = videoData.duration ? `${videoData.duration} segundos` : "No especificado";
    const videoLikes = videoData.like || "0";
    const videoComments = videoData.comment || "0";

    const mensaje = `🎥 *Video de TikTok* 🎥\n\n` +
      `📌 *Título:* ${videoTitle}\n` +
      `👤 *Autor:* ${videoAuthor}\n` +
      `⏱️ *Duración:* ${videoDuration}\n` +
      `❤️ *Likes:* ${videoLikes} | 💬 *Comentarios:* ${videoComments}\n\n` +
      `───────\n🍧 *API utilizada:* https://api.dorratz.com\n© Azura Ultra & Cortana SubBot`;

    await conn.sendMessage(msg.key.remoteJid, {
      video: { url: videoUrl },
      caption: mensaje
    }, { quoted: msg });

    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: "✅", key: msg.key }
    });

  } catch (error) {
    await conn.sendMessage(msg.key.remoteJid, {
      text: "❌ *Ocurrió un error al procesar el enlace de TikTok.*\n🔹 _Inténtalo más tarde._"
    }, { quoted: msg });

    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: "❌", key: msg.key }
    });
  }
};

handler.command = ["tiktok", "tt"];
module.exports = handler;

function isUrl(url) {
  const pattern = /^https?:\/\/[^\s$.?#].[^\s]*$/gm;
  return pattern.test(url);
}
