const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream');
const { promisify } = require('util');
const streamPipeline = promisify(pipeline);

const handler = async (msg, { conn, text, usedPrefix }) => {
  if (!text || (!text.includes('youtube.com') && !text.includes('youtu.be'))) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: `✳️ Usa el comando correctamente:\n\n📌 Ejemplo: *${usedPrefix}ytmp4* https://youtube.com/watch?v=...`
    }, { quoted: msg });
  }

  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: '⏳', key: msg.key }
  });

  try {
    // ==== CONFIG DE TU API SKY ====
    const API_BASE = process.env.API_BASE || "https://api-sky.ultraplus.click";
    const API_KEY  = process.env.API_KEY  || "Russellxz";

    // Llamar a tu API de YouTube para video
    const response = await axios.get(`${API_BASE}/api/download/yt.js`, {
      params: { 
        url: text,
        format: 'video'
      },
      headers: { 
        Authorization: `Bearer ${API_KEY}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'
      },
      timeout: 30000
    });

    if (!response.data || response.data.status !== "true" || !response.data.data) {
      throw new Error('No se pudo obtener el video');
    }

    const videoData = response.data.data;
    const videoUrl = videoData.video || videoData.audio;
    const videoTitle = videoData.title || 'video';
    const videoThumbnail = videoData.thumbnail;
    const videoDuration = videoData.duration ? `${videoData.duration} segundos` : 'Desconocido';
    const soliRemaining = response.data.soli_remaining || 0;

    if (!videoUrl) {
      throw new Error('No se pudo obtener el video');
    }

    const tmpDir = path.join(__dirname, '../tmp');
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });
    const filePath = path.join(tmpDir, `${Date.now()}_video.mp4`);

    // Descargar el video
    const videoRes = await axios.get(videoUrl, {
      responseType: 'stream',
      timeout: 60000,
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
        'Referer': 'https://www.youtube.com/'
      }
    });
    
    await streamPipeline(videoRes.data, fs.createWriteStream(filePath));

    const stats = fs.statSync(filePath);
    const sizeMB = stats.size / (1024 * 1024);
    
    if (!stats || stats.size < 100000) {
      fs.unlinkSync(filePath);
      throw new Error('El video descargado está vacío o incompleto');
    }

    if (sizeMB > 99) {
      fs.unlinkSync(filePath);
      throw new Error(`El video pesa ${sizeMB.toFixed(2)}MB y excede el límite de 99MB`);
    }

    const caption = `
✦ 𝘾𝙤𝙧𝙩𝙖𝙣𝙖 2.0 𝗦𝘂𝗯𝗯𝗼𝘁 ✦

📀 *Info del video:*  
❀ 🎼 *Título:* ${videoTitle}
❀ ⏱️ *Duración:* ${videoDuration}
❀ 📦 *Tamaño:* ${sizeMB.toFixed(2)}MB
❀ 🎫 *Soli restantes:* ${soliRemaining}
❀ 🔗 *Link:* ${text}

⚠️ ¿No se reproduce? Usa _${usedPrefix}ff_

⏳ *Procesado por Cortana Subbot*`;

    await conn.sendMessage(msg.key.remoteJid, {
      video: fs.readFileSync(filePath),
      mimetype: 'video/mp4',
      fileName: `${videoTitle}.mp4`,
      caption,
      gifPlayback: false
    }, { quoted: msg });

    fs.unlinkSync(filePath);

    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: '✅', key: msg.key }
    });

  } catch (err) {
    console.error(err);
    
    let errorMsg = `❌ *Error:* ${err.message}`;
    
    if (err.response?.status === 401) {
      errorMsg = "❌ *Error de autenticación en la API.*\n🔹 Verifica tu API Key.";
    } else if (err.response?.status === 402) {
      errorMsg = "❌ *No tienes suficientes soli.*\n🔹 Recarga tus créditos para continuar.";
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

handler.command = ['ytmp4'];
module.exports = handler;
