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
    const qualities = ['720p', '480p', '360p'];
    let videoData = null;

    for (let quality of qualities) {
      try {
        const apiUrl = `https://api.neoxr.eu/api/youtube?url=${encodeURIComponent(text)}&type=video&quality=${quality}&apikey=russellxz`;
        const response = await axios.get(apiUrl);
        if (response.data?.status && response.data?.data?.url) {
          videoData = {
            url: response.data.data.url,
            title: response.data.title || 'video',
            thumbnail: response.data.thumbnail,
            duration: response.data.fduration,
            views: response.data.views,
            channel: response.data.channel,
            quality: response.data.data.quality || quality,
            size: response.data.data.size || 'Desconocido',
            publish: response.data.publish || 'Desconocido',
            id: response.data.id || ''
          };
          break;
        }
      } catch {
        continue;
      }
    }

    if (!videoData) throw new Error('No se pudo obtener el video en ninguna calidad');

    const tmpDir = path.join(__dirname, '../tmp');
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);
    const filePath = path.join(tmpDir, `${Date.now()}_video.mp4`);

    const response = await axios.get(videoData.url, {
      responseType: 'stream',
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    await streamPipeline(response.data, fs.createWriteStream(filePath));

    const stats = fs.statSync(filePath);
    if (!stats || stats.size < 100000) {
      fs.unlinkSync(filePath);
      throw new Error('El video descargado está vacío o incompleto');
    }

    const caption = `
╔═════════════════╗
║ ✦ 𝗔𝘇𝘂𝗿𝗮 𝗨𝗹𝘁𝗿𝗮 & 𝘾𝙤𝙧𝙩𝙖𝙣𝙖 𝗦𝘂𝗯𝗯𝗼𝘁 ✦
╚═════════════════╝

📀 *Info del video:*  
├ 🎼 *Título:* ${videoData.title}
├ ⏱️ *Duración:* ${videoData.duration}
├ 👁️ *Vistas:* ${videoData.views}
├ 👤 *Canal:* ${videoData.channel}
├ 🗓️ *Publicado:* ${videoData.publish}
├ 📦 *Tamaño:* ${videoData.size}
├ 📹 *Calidad:* ${videoData.quality}
└ 🔗 *Link:* https://youtu.be/${videoData.id}

⚠️ ¿No se reproduce? Usa _${usedPrefix}ff_

⏳ *Procesado por Azura Ultra & Cortana Subbot*`;

    await conn.sendMessage(msg.key.remoteJid, {
      video: fs.readFileSync(filePath),
      mimetype: 'video/mp4',
      fileName: `${videoData.title}.mp4`,
      caption,
      gifPlayback: false
    }, { quoted: msg });

    fs.unlinkSync(filePath);

    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: '✅', key: msg.key }
    });

  } catch (err) {
    console.error(err);
    await conn.sendMessage(msg.key.remoteJid, {
      text: `❌ *Error:* ${err.message}`
    }, { quoted: msg });
    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: '❌', key: msg.key }
    });
  }
};

handler.command = ['ytmp4'];
module.exports = handler;
