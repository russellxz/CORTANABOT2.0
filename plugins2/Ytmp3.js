const axios = require('axios');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const { promisify } = require('util');
const { pipeline } = require('stream');
const streamPipeline = promisify(pipeline);

const handler = async (msg, { conn, text, usedPrefix }) => {
  const isYoutubeUrl = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|music\.youtube\.com)\//i.test(text);

  if (!text || !isYoutubeUrl) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: `✳️ Usa el comando correctamente:\n\n📌 Ejemplo: *${usedPrefix}ytmp3* https://music.youtube.com/watch?v=abc123`
    }, { quoted: msg });
  }

  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: '⏳', key: msg.key }
  });

  try {
    // ==== CONFIG DE TU API SKY ====
    const API_BASE = process.env.API_BASE || "https://api-sky.ultraplus.click";
    const API_KEY  = process.env.API_KEY  || "Russellxz";

    // Llamar a tu API de YouTube para audio
    const response = await axios.get(`${API_BASE}/api/download/yt.js`, {
      params: { 
        url: text,
        format: 'audio'
      },
      headers: { 
        Authorization: `Bearer ${API_KEY}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'
      },
      timeout: 30000
    });

    if (!response.data || response.data.status !== "true" || !response.data.data) {
      throw new Error("La API no devolvió datos válidos.");
    }

    const videoData = response.data.data;
    const audioUrl = videoData.audio || videoData.video;
    const videoTitle = videoData.title || "Sin título";
    const videoThumbnail = videoData.thumbnail;
    const videoDuration = videoData.duration ? `${videoData.duration} segundos` : "No especificado";
    const soliRemaining = response.data.soli_remaining || 0;

    if (!audioUrl) {
      throw new Error("No se pudo obtener el audio.");
    }

    await conn.sendMessage(msg.key.remoteJid, {
      image: { url: videoThumbnail },
      caption: `🎧 *Título:* ${videoTitle}\n🕒 *Duración:* ${videoDuration}\n🎫 *Soli restantes:* ${soliRemaining}\n\n⏳ Descargando audio...`
    }, { quoted: msg });

    const tmpDir = path.join(__dirname, '../tmp');
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

    const rawPath = path.join(tmpDir, `${Date.now()}_raw.m4a`);
    const finalPath = path.join(tmpDir, `${Date.now()}_final.mp3`);

    // Descargar el audio
    const audioRes = await axios.get(audioUrl, { 
      responseType: 'stream',
      timeout: 45000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
        'Referer': 'https://www.youtube.com/',
        'Accept': '*/*'
      }
    });

    await streamPipeline(audioRes.data, fs.createWriteStream(rawPath));

    // Verificar tamaño antes de convertir
    const rawStats = fs.statSync(rawPath);
    const rawSizeMB = rawStats.size / (1024 * 1024);

    if (rawSizeMB > 99) {
      fs.unlinkSync(rawPath);
      throw new Error(`El audio pesa ${rawSizeMB.toFixed(2)}MB y excede el límite de 99MB.`);
    }

    // Convertir a MP3
    await new Promise((resolve, reject) => {
      ffmpeg(rawPath)
        .audioCodec('libmp3lame')
        .audioBitrate('128k')
        .save(finalPath)
        .on('end', resolve)
        .on('error', reject);
    });

    // Verificar tamaño final
    const finalStats = fs.statSync(finalPath);
    const finalSizeMB = finalStats.size / (1024 * 1024);

    if (finalSizeMB > 99) {
      fs.unlinkSync(rawPath);
      fs.unlinkSync(finalPath);
      throw new Error(`El audio convertido pesa ${finalSizeMB.toFixed(2)}MB y excede el límite de 99MB.`);
    }

    const caption = `🎧 *Audio Descargado*\n\n` +
      `📀 *Título:* ${videoTitle}\n` +
      `⏱️ *Duración:* ${videoDuration}\n` +
      `📦 *Tamaño:* ${finalSizeMB.toFixed(2)}MB\n` +
      `🎫 *Soli restantes:* ${soliRemaining}\n\n` +
      `🔧 *API:* api-sky.ultraplus.click`;

    await conn.sendMessage(msg.key.remoteJid, {
      audio: fs.readFileSync(finalPath),
      mimetype: 'audio/mpeg',
      fileName: `${videoTitle}.mp3`,
      caption: caption
    }, { quoted: msg });

    // Limpiar archivos temporales
    fs.unlinkSync(rawPath);
    fs.unlinkSync(finalPath);

    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: '✅', key: msg.key }
    });

  } catch (err) {
    console.error("❌ Error en ytmp3:", err.message);
    
    let errorMsg = `❌ *Error:* ${err.message}`;
    
    if (err.response?.status === 401) {
      errorMsg = "❌ *Error de autenticación en la API.*\n🔹 Verifica tu API Key.";
    } else if (err.response?.status === 402) {
      errorMsg = "❌ *No tienes suficientes soli.*\n🔹 Recarga tus créditos para continuar.";
    } else if (err.code === 'ECONNABORTED') {
      errorMsg = "❌ *Tiempo de espera agotado.*\n🔹 El servidor tardó demasiado en responder.";
    } else if (err.message.includes('excede el límite')) {
      errorMsg = `❌ ${err.message}\n\n🔒 Solo se permiten descargas menores a 99MB.`;
    }
    
    await conn.sendMessage(msg.key.remoteJid, {
      text: errorMsg
    }, { quoted: msg });

    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: '❌', key: msg.key }
    });
  }
};

handler.command = ['ytmp3'];
module.exports = handler;
