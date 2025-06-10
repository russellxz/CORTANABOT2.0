const yts = require('yt-search');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream');
const { promisify } = require('util');
const ffmpeg = require('fluent-ffmpeg');
const streamPipeline = promisify(pipeline);

const handler = async (msg, { conn, text }) => {
    // Formatos de audio soportados
    const formatAudio = ['mp3', 'm4a', 'webm', 'acc', 'flac', 'opus', 'ogg', 'wav'];

    // Cliente de descarga
    const ddownr = {
        download: async (url, format) => {
            if (!formatAudio.includes(format)) {
                throw new Error('Formato de audio no soportado.');
            }

            const config = {
                method: 'GET',
                url: `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`,
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
                    duration: info.duration 
                };
            } else {
                throw new Error('No se pudo obtener la información del audio.');
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

    // Validar texto de entrada
    if (!text) {
        return await conn.sendMessage(msg.key.remoteJid, {
            text: `✳️ Uso correcto:\n\n📌 Ejemplo: *${global.prefix}ytmp35* Bad Bunny - Diles`
        }, { quoted: msg });
    }

    // Reacción inicial
    await conn.sendMessage(msg.key.remoteJid, {
        react: { text: '⏳', key: msg.key }
    });

    try {
        // Buscar en YouTube
        const search = await yts(text);
        if (!search.videos || search.videos.length === 0) {
            throw new Error('No se encontraron resultados para tu búsqueda.');
        }

        const video = search.videos[0];
        const videoData = {
            title: video.title,
            url: video.url,
            thumbnail: video.thumbnail,
            timestamp: video.timestamp
        };

        const { title, url, thumbnail, timestamp } = videoData;

        // Enviar información del audio
        await conn.sendMessage(msg.key.remoteJid, {
            image: { url: thumbnail },
            caption: `╭───〔 🎵 *AZURA ULTRA 2.0* 〕───╮
│
│ 📌 *Título:* ${title}
│ ⏱️ *Duración:* ${timestamp}
│
│ ⏳ *Procesando tu audio...*
│
╰───────────────────────╯`
        }, { quoted: msg });

        // Descargar audio
        const { downloadUrl } = await ddownr.download(url, 'mp3');

        // Directorio temporal
        const tmpDir = path.join(__dirname, '../tmp');
        if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);
        
        const rawPath = path.join(tmpDir, `${Date.now()}_raw.mp3`);
        const finalPath = path.join(tmpDir, `${Date.now()}_final.mp3`);

        // Descargar archivo
        const audioRes = await axios.get(downloadUrl, {
            responseType: 'stream',
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });

        await streamPipeline(audioRes.data, fs.createWriteStream(rawPath));

        // Comprimir y convertir audio
        await new Promise((resolve, reject) => {
            ffmpeg(rawPath)
                .audioBitrate(128)
                .audioChannels(2)
                .audioFrequency(44100)
                .format('mp3')
                .on('end', () => {
                    fs.unlinkSync(rawPath);
                    resolve();
                })
                .on('error', (err) => {
                    fs.unlinkSync(rawPath);
                    reject(err);
                })
                .save(finalPath);
        });

        // Enviar audio
        await conn.sendMessage(msg.key.remoteJid, {
            audio: fs.readFileSync(finalPath),
            mimetype: 'audio/mpeg',
            fileName: `${title.substring(0, 100)}.mp3`.replace(/[^\w\s.-]/gi, '')
        }, { quoted: msg });

        // Limpiar archivos temporales
        fs.unlinkSync(finalPath);

        // Reacción de éxito
        await conn.sendMessage(msg.key.remoteJid, {
            react: { text: '✅', key: msg.key }
        });

    } catch (err) {
        console.error('Error en ytmp35:', err);
        
        await conn.sendMessage(msg.key.remoteJid, {
            text: `❌ *Error al procesar el audio:*\n${err.message}`
        }, { quoted: msg });

        await conn.sendMessage(msg.key.remoteJid, {
            react: { text: '❌', key: msg.key }
        });
    }
};

handler.command = ['ytmp35', 'ytaudio'];
handler.tags = ['downloader'];
handler.help = [
    'ytmp35 <búsqueda> - Descarga audio de YouTube'
];
module.exports = handler;
