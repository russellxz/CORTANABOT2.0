const axios = require('axios');

const handler = async (msg, { conn }) => {
  const chatId = msg.key.remoteJid;

  // Reacción inicial
  await conn.sendMessage(chatId, {
    react: { text: '🔄', key: msg.key }
  });

  try {
    // Llamada a la API
    const res = await axios.get('https://api.waifu.pics/sfw/neko');
    const imageUrl = res.data.url;

    // Enviar la imagen
    await conn.sendMessage(chatId, {
      image: { url: imageUrl },
      caption: '🐱 Aquí tienes tu Neko 🐱'
    }, { quoted: msg });

    // Reacción de éxito
    await conn.sendMessage(chatId, {
      react: { text: '✅', key: msg.key }
    });
  } catch (err) {
    console.error('❌ Error en comando neko:', err);
    await conn.sendMessage(chatId, {
      text: '❌ No pude obtener un Neko en este momento. Intenta más tarde.'
    }, { quoted: msg });
  }
};

handler.command = ['neko'];
handler.tags = ['sfw'];
handler.help = ['neko'];
handler.reaction = '🔄';

module.exports = handler;
