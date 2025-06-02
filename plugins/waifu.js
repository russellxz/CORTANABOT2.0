const axios = require('axios');

const handler = async (msg, { conn }) => {
  const chatId = msg.key.remoteJid;

  // Reacción inicial
  await conn.sendMessage(chatId, {
    react: { text: '🔄', key: msg.key }
  });

  try {
    // Llamada a la API
    const res = await axios.get('https://api.waifu.pics/sfw/waifu');
    const imageUrl = res.data.url;

    // Enviar la imagen
    await conn.sendMessage(chatId, {
      image: { url: imageUrl },
      caption: '💖 Aquí tienes tu Waifu 💖'
    }, { quoted: msg });

    // Reacción de éxito
    await conn.sendMessage(chatId, {
      react: { text: '✅', key: msg.key }
    });
  } catch (err) {
    console.error('❌ Error en comando waifu:', err);
    await conn.sendMessage(chatId, {
      text: '❌ No pude obtener una Waifu en este momento. Intenta más tarde.'
    }, { quoted: msg });
  }
};

handler.command = ['waifu'];
handler.tags = ['sfw'];
handler.help = ['waifu'];
handler.reaction = '🔄';

module.exports = handler;
