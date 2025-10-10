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

    // ==== CONFIG DE TU API SKY ====
    const API_BASE = process.env.API_BASE || "https://api-sky.ultraplus.click";
    const API_KEY  = process.env.API_KEY  || "Russellxz";

    // Llamar a tu API de TikTok
    const response = await axios.get(`${API_BASE}/api/download/tiktok.js`, {
      params: { url: args[0] },
      headers: { 
        Authorization: `Bearer ${API_KEY}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'
      },
      timeout: 30000
    });

    if (!response.data || response.data.status !== "true" || !response.data.data) {
      throw new Error("La API no devolvió un video válido.");
    }

    const videoData = response.data.data;
    const videoUrl = videoData.video;
    const videoTitle = videoData.title || "Sin título";
    const videoAuthor = videoData.author?.name || "Desconocido";
    const videoDuration = videoData.duration ? `${videoData.duration} segundos` : "No especificado";
    const videoLikes = videoData.likes?.toLocaleString() || "0";
    const videoComments = videoData.comments?.toLocaleString() || "0";
    const videoShares = videoData.shares?.toLocaleString() || "0";
    const videoViews = videoData.views?.toLocaleString() || "0";
    const soliRemaining = response.data.soli_remaining || 0;

    if (!videoUrl) {
      throw new Error("No se pudo obtener el video de TikTok.");
    }

    const mensaje = `🎥 *Video de TikTok* 🎥\n\n` +
      `📌 *Título:* ${videoTitle}\n` +
      `👤 *Autor:* ${videoAuthor}\n` +
      `⏱️ *Duración:* ${videoDuration}\n` +
      `❤️ *Likes:* ${videoLikes} | 💬 *Comentarios:* ${videoComments}\n` +
      `🔄 *Compartidos:* ${videoShares} | 👀 *Vistas:* ${videoViews}\n` +
      `🎫 *Soli restantes:* ${soliRemaining}\n\n` +
      `───────\n🍧 *API utilizada:* ${API_BASE}\n© Cortana SubBot`;

    await conn.sendMessage(msg.key.remoteJid, {
      video: { url: videoUrl },
      caption: mensaje
    }, { quoted: msg });

    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: "✅", key: msg.key }
    });

  } catch (error) {
    console.error("❌ Error en tiktok:", error.message);
    
    let errorMsg = "❌ *Ocurrió un error al procesar el enlace de TikTok.*\n🔹 _Inténtalo más tarde._";
    
    if (error.response?.status === 401) {
      errorMsg = "❌ *Error de autenticación en la API.*\n🔹 Verifica tu API Key.";
    } else if (error.response?.status === 402) {
      errorMsg = "❌ *No tienes suficientes soli.*\n🔹 Recarga tus créditos para continuar.";
    } else if (error.code === 'ECONNABORTED') {
      errorMsg = "❌ *Tiempo de espera agotado.*\n🔹 El servidor tardó demasiado en responder.";
    } else if (error.message.includes('No se pudo obtener')) {
      errorMsg = "❌ *No se pudo obtener el video.*\n🔹 El enlace puede ser inválido o privado.";
    }
    
    await conn.sendMessage(msg.key.remoteJid, {
      text: errorMsg
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
