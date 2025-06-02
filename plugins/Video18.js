const handler = async (msg, { conn }) => {
  const urls = [
    'https://telegra.ph/file/4a270d9945ac46f42d95c.mp4',
    'https://telegra.ph/file/f753759342337c4012b3f.mp4',
    'https://telegra.ph/file/411d8f59a5cefc2a1d227.mp4',
    'https://telegra.ph/file/76ba0dc2a07f491756377.mp4',
    'https://telegra.ph/file/831bb88f562bef3f1a15d.mp4'
  ];
  const url = urls[Math.floor(Math.random() * urls.length)];

  await conn.sendMessage(msg.key.remoteJid, {
    video: { url },
    caption: "🎥 Disfruta del video +18"
  }, { quoted: msg });
};

handler.command = ["videoxxx", "vídeoxxx"];
handler.tags = ["nsfw"];
handler.help = ["videoxxx"];
module.exports = handler;
