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
      text: `✳️ Usa el comando correctamente:\n\n📌 Ejemplo: *${usedPrefix}ytmp3doc* https://music.youtube.com/watch?v=abc123`
    }, { quoted: msg });
  }

  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: '⏳', key: msg.key }
  });

  try {
    const apiURL = `https://api.neoxr.eu/api/youtube?url=${encodeURIComponent(text)}&type=audio&quality=128kbps&apikey=russellxz`;
    const res = await axios.get(apiURL);
    const json = res.data;

    if (!json.status || !json.data?.url) throw new Error("No se pudo obtener el audio");

    const { data, title, fduration, thumbnail } = json;
    const sizeNum = parseFloat((data.size || "0").replace("MB", "").trim());

    await conn.sendMessage(msg.key.remoteJid, {
      image: { url: thumbnail },
      caption: `╭──〔 🎶 𝐃𝐄𝐓𝐀𝐋𝐋𝐄𝐒 𝐃𝐄𝐋 𝐀𝐔𝐃𝐈𝐎 〕──╮
🎧 𝐓𝐢́𝐭𝐮𝐥𝐨: ${title}
🕒 𝐃𝐮𝐫𝐚𝐜𝐢𝐨́𝐧: ${fduration}
📦 𝐓𝐚𝐦𝐚𝐧̃𝐨: ${sizeNum.toFixed(2)} MB
╰──────────────────────────╯

🔄 *Procesando con precisión...*
⚙️ *Aguarda un momento mientras finalizamos la descarga.*

╭─────⟡
│ 🤖 𝐂𝐎𝐑𝐓𝐀𝐍𝐀 𝟐.𝟎 𝐁𝐎𝐓
╰─────⟡`
    }, { quoted: msg });

    const tmpDir = path.join(__dirname, '../tmp');
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

    const rawPath = path.join(tmpDir, `${Date.now()}_raw.m4a`);
    const finalPath = path.join(tmpDir, `${Date.now()}_final.mp3`);

    const audioRes = await axios.get(data.url, { responseType: 'stream' });
    await streamPipeline(audioRes.data, fs.createWriteStream(rawPath));

    await new Promise((resolve, reject) => {
      ffmpeg(rawPath)
        .audioCodec('libmp3lame')
        .audioBitrate('128k')
        .format('mp3')
        .save(finalPath)
        .on('end', resolve)
        .on('error', reject);
    });

    await conn.sendMessage(msg.key.remoteJid, {
      document: fs.readFileSync(finalPath),
      mimetype: 'audio/mpeg',
      fileName: data.filename || `${title}.mp3`
    }, { quoted: msg });

    fs.unlinkSync(rawPath);
    fs.unlinkSync(finalPath);

    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: '✅', key: msg.key }
    });

  } catch (err) {
    console.error(err);
    await conn.sendMessage(msg.key.remoteJid, {
      text: `❌ *Error Tal vez excede el límite de 99MB:* ${err.message}`
    }, { quoted: msg });

    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: '❌', key: msg.key }
    });
  }
};

handler.command = ['ytmp3doc'];
module.exports = handler;
