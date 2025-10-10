const fs = require("fs");
const path = require("path");
const axios = require("axios");

const handler = async (msg, { conn, text, command }) => {
  // Obtener ID del subbot y su prefijo personalizado
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
      text: `✳️ Ejemplo de uso:\n${usedPrefix + command} https://www.instagram.com/p/CCoI4DQBGVQ/`
    }, { quoted: msg });
  }

  try {
    // ⏳ Reacción mientras se procesa
    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: "⏳", key: msg.key }
    });

    // ==== CONFIG DE TU API SKY ====
    const API_BASE = process.env.API_BASE || "https://api-sky.ultraplus.click";
    const API_KEY  = process.env.API_KEY  || "Russellxz";

    // Llamar a tu API de Instagram
    const response = await axios.get(`${API_BASE}/api/download/instagram.js`, {
      params: { url: text },
      headers: { 
        Authorization: `Bearer ${API_KEY}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'
      },
      timeout: 30000
    });

    if (!response.data || response.data.status !== "true" || !response.data.data) {
      throw new Error("La API no devolvió datos válidos.");
    }

    const mediaData = response.data.data;
    const mediaItems = mediaData.media || [];
    const soliRemaining = response.data.soli_remaining || 0;

    // Buscar el primer video
    const videoItem = mediaItems.find(item => item.type === 'video');
    
    if (!videoItem) {
      throw new Error("No se encontró un video en la publicación.");
    }

    const caption = `🎬 *Video de Instagram*\n\n> 🍧 Solicitud procesada por api-sky.ultraplus.click\n🎫 *Soli restantes:* ${soliRemaining}\n\n───────\n© Cortana SubBot`;

    // Enviar el video directamente desde la URL
    await conn.sendMessage(msg.key.remoteJid, {
      video: { url: videoItem.url },
      caption
    }, { quoted: msg });

    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: "✅", key: msg.key }
    });

  } catch (error) {
    console.error("❌ Error en instagram:", error);
    
    let errorMsg = "❌ Ocurrió un error al procesar el enlace de Instagram.";
    
    if (error.response?.status === 401) {
      errorMsg = "❌ Error de autenticación en la API. Verifica tu API Key.";
    } else if (error.response?.status === 402) {
      errorMsg = "❌ No tienes suficientes soli. Recarga tus créditos.";
    } else if (error.message.includes('No se encontró un video')) {
      errorMsg = "❌ No se encontró un video en la publicación de Instagram.";
    }
    
    await conn.sendMessage(msg.key.remoteJid, {
      text: errorMsg
    }, { quoted: msg });

    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: "❌", key: msg.key }
    });
  }
};

handler.command = ["instagram", "ig"];
module.exports = handler;
