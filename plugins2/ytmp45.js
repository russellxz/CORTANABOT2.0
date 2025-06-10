const yts = require('yt-search');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream');
const { promisify } = require('util');
const ffmpeg = require('fluent-ffmpeg');
const streamPipeline = promisify(pipeline);

const formatVideo = ['360', '480', '720', '1080', '1440', '4k'];

const ddownr = {
  download: async (url, quality = '720') => {
    if (!formatVideo.includes(quality)) {
      throw new Error('Calidad de video no soportada. Use: 360, 480, 720, 1080, 1440 o 4k');
    }

    const config = {
      method: 'GET',
      url: `https://p.oceansaver.in/ajax/download.php?format=${quality}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`,
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    };

    const response = await axios.request(config);
    if (response.data && response.data.success) {
      const { id, title, info } = response.data;
      const downloadUrl = await ddownr.cekProgress(id);
      return { 
        title, 
        downloadUrl, 
        thumbnail: info.image, 
        duration: info.duration,
        quality 
      };
    } else {
      throw new Error('No se pudo obtener la información del video.');
    }
  },
  
  cekProgress: async (id) => {
    const config = {
      method: 'GET',
      url: `https://p.oceansaver.in/ajax/progress.php?id=${id}`,
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    };

    while (true) {
      const response = await axios.request(config);
      if (response.data?.success && response.data.progress === 1000) {
        return response.data.download_url;
      }
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

const handler = async (msg, { conn, text, command }) => {
  if (!text) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: `🎥 *Uso correcto:*\n\nEjemplo: *${command} Bad Bunny - Diles*\nOpcional: *${command} 720 Bad Bunny - Diles* (para calidad específica)`
    }, { quoted: msg });
  }

  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: '⏳', key: msg.key }
  });

  try {
    let quality = '720';
    const args = text.split(' ');
    
    if (formatVideo.includes(args[0])) {
      quality = args[0];
      text = args.slice(1).join(' ');
    }

    const search = await yts(text);
    if (!search.videos || search.videos.length === 0) {
      throw new Error('No se encontraron resultados para tu búsqueda.');
    }

    const video = search.videos[0];
    const { title, url, thumbnail, timestamp, views, author } = video;

    await conn.sendMessage(msg.key.remoteJid, {
      image: { url: thumbnail },
      caption: `╭───🎬 *DESCARGADOR YTMP45* ───╮
│
│ 📌 *Título:* ${title}
│ 👤 *Autor:* ${author?.name || 'Desconocido'}
│ 🕒 *Duración:* ${timestamp}
│ 👀 *Vistas:* ${views.toLocaleString()}
│ 🎚️ *Calidad:* ${quality}p
│
│ ⏳ *Procesando video...*
│
╰──────────────────────────╯`
    }, { quoted: msg });

    const { downloadUrl } = await ddownr.download(url, quality);

    const tmpDir = path.join(__dirname, '../tmp');
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);
    
    const videoPath = path.join(tmpDir, `${Date.now()}_${quality}p.mp4`);

    const videoRes = await axios.get(downloadUrl, {
      responseType: 'stream',
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    await streamPipeline(videoRes.data, fs.createWriteStream(videoPath));

    await conn.sendMessage(msg.key.remoteJid, {
      video: fs.readFileSync(videoPath),
      caption: `✅ *${title}*\n📏 Calidad: ${quality}p`,
      mimetype: 'video/mp4',
      fileName: `${title.substring(0, 100)}.mp4`.replace(/[^\w\s.-]/gi, '')
    }, { quoted: msg });

    fs.unlinkSync(videoPath);

    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: '✅', key: msg.key }
    });

  } catch (err) {
    console.error('Error en ytmp45 (video):', err);
    
    await conn.sendMessage(msg.key.remoteJid, {
      text: `❌ *Error al descargar el video:*\n${err.message}`
    }, { quoted: msg });

    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: '❌', key: msg.key }
    });
  }
};

handler.command = ['ytmp45', 'ytvideo'];
handler.tags = ['downloader'];
handler.help = [
  'ytmp45 <búsqueda> - Descarga video de YouTube (720p por defecto)',
  'ytmp45 <calidad> <búsqueda> - Ejemplo: ytmp45 1080 Bad Bunny'
];

module.exports = handler;
