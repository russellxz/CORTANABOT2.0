const fs = require('fs');
const path = require('path');
const Crypto = require('crypto');
const { tmpdir } = require('os');
const ffmpeg = require('fluent-ffmpeg');
const webp = require('node-webpmux');
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');

const tempFolder = path.join(__dirname, '../tmp/');
if (!fs.existsSync(tempFolder)) fs.mkdirSync(tempFolder, { recursive: true });

const handler = async (msg, { conn }) => {
    const rawID = conn.user?.id || "";
  const subbotID = rawID.split(":")[0] + "@s.whatsapp.net";

  // Obtener prefijo del subbot
  const prefixPath = path.resolve("prefixes.json");
  let prefixes = {};
  if (fs.existsSync(prefixPath)) {
    prefixes = JSON.parse(fs.readFileSync(prefixPath, "utf-8"));
  }
  const usedPrefix = prefixes[subbotID] || ".";
  try {
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quoted) {
      return await conn.sendMessage(msg.key.remoteJid, {
        text: `⚠️ *Responde a una imagen o video con el comando \`${usedPrefix}s\` para crear un sticker.*`
      }, { quoted: msg });
    }

    const mediaType = quoted.imageMessage ? 'image' : quoted.videoMessage ? 'video' : null;
    if (!mediaType) {
      return await conn.sendMessage(msg.key.remoteJid, {
        text: '⚠️ *Solo puedes convertir imágenes o videos en stickers.*'
      }, { quoted: msg });
    }

    const senderName = msg.pushName || 'Usuario Desconocido';
    const now = new Date();
    const fechaCreacion = `📅 ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} 🕒 ${now.getHours()}:${now.getMinutes()}`;

    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: '🛠️', key: msg.key }
    });

    const mediaStream = await downloadContentFromMessage(quoted[`${mediaType}Message`], mediaType);
    let buffer = Buffer.alloc(0);
    for await (const chunk of mediaStream) buffer = Buffer.concat([buffer, chunk]);

    const metadata = {
      packname: `✨ Lo Mandó Hacer: ${senderName} ✨`,
      author: `🤖 Bot Creador: Azura Ultra & Cortana Subbot\n🛠️ Desarrollado por: 𝙍𝙪𝙨𝙨𝙚𝙡𝙡 xz 💻\n${fechaCreacion}`
    };

    const sticker = mediaType === 'image'
      ? await writeExifImg(buffer, metadata)
      : await writeExifVid(buffer, metadata);

    await conn.sendMessage(msg.key.remoteJid, {
      sticker: { url: sticker }
    }, { quoted: msg });

    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: '✅', key: msg.key }
    });

  } catch (err) {
    console.error('❌ Error en sticker s:', err);
    await conn.sendMessage(msg.key.remoteJid, {
      text: '❌ *Hubo un error al procesar el sticker. Inténtalo de nuevo.*'
    }, { quoted: msg });

    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: '❌', key: msg.key }
    });
  }
};

handler.command = ['s'];
module.exports = handler;

/* === FUNCIONES DE CONVERSIÓN DE STICKERS CON EXIF Y ALTA CALIDAD === */

async function imageToWebp(media) {
  const tmpIn = path.join(tempFolder, randomFileName('jpg'));
  const tmpOut = path.join(tempFolder, randomFileName('webp'));
  fs.writeFileSync(tmpIn, media);

  await new Promise((resolve, reject) => {
    ffmpeg(tmpIn)
      .on('error', reject)
      .on('end', resolve)
      .addOutputOptions([
        "-vcodec", "libwebp",
        "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15,pad=320:320:-1:-1:color=white@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse"
      ])
      .toFormat('webp')
      .save(tmpOut);
  });

  const buff = fs.readFileSync(tmpOut);
  fs.unlinkSync(tmpIn);
  fs.unlinkSync(tmpOut);
  return buff;
}

async function videoToWebp(media) {
  const tmpIn = path.join(tempFolder, randomFileName('mp4'));
  const tmpOut = path.join(tempFolder, randomFileName('webp'));
  fs.writeFileSync(tmpIn, media);

  await new Promise((resolve, reject) => {
    ffmpeg(tmpIn)
      .on('error', reject)
      .on('end', resolve)
      .addOutputOptions([
        "-vcodec", "libwebp",
        "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15,pad=320:320:-1:-1:color=white@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse",
        "-loop", "0",
        "-ss", "00:00:00",
        "-t", "00:00:05",
        "-preset", "default",
        "-an",
        "-vsync", "0"
      ])
      .toFormat('webp')
      .save(tmpOut);
  });

  const buff = fs.readFileSync(tmpOut);
  fs.unlinkSync(tmpIn);
  fs.unlinkSync(tmpOut);
  return buff;
}

async function writeExifImg(media, metadata) {
  const wMedia = await imageToWebp(media);
  return await addExif(wMedia, metadata);
}

async function writeExifVid(media, metadata) {
  const wMedia = await videoToWebp(media);
  return await addExif(wMedia, metadata);
}

async function addExif(webpBuffer, metadata) {
  const tmpIn = path.join(tempFolder, randomFileName('webp'));
  const tmpOut = path.join(tempFolder, randomFileName('webp'));
  fs.writeFileSync(tmpIn, webpBuffer);

  const json = {
    "sticker-pack-id": "azura-ultra&cortana",
    "sticker-pack-name": metadata.packname,
    "sticker-pack-publisher": metadata.author,
    "emojis": metadata.categories || [""]
  };

  const exifAttr = Buffer.from([
    0x49, 0x49, 0x2A, 0x00,
    0x08, 0x00, 0x00, 0x00,
    0x01, 0x00, 0x41, 0x57,
    0x07, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x16, 0x00,
    0x00, 0x00
  ]);
  const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8");
  const exif = Buffer.concat([exifAttr, jsonBuff]);
  exif.writeUIntLE(jsonBuff.length, 14, 4);

  const img = new webp.Image();
  await img.load(tmpIn);
  img.exif = exif;
  await img.save(tmpOut);
  fs.unlinkSync(tmpIn);
  return tmpOut;
}

function randomFileName(ext) {
  return `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.${ext}`;
}
