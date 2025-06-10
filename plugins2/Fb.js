const axios = require('axios');

const handler = async (msg, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: `✳️ Ejemplo de uso:\n\n📌 *${usedPrefix + command}* https://fb.watch/ncowLHMp-x/`
    }, { quoted: msg });
  }

  if (!text.match(/(www\.facebook\.com|fb\.watch)/gi)) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: `❌ Enlace de Facebook inválido.\n\n📌 Ejemplo de uso:\n*${usedPrefix + command}* https://fb.watch/ncowLHMp-x/`
    }, { quoted: msg });
  }

  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: '⏳', key: msg.key }
  });

  try {
    const response = await axios.get(`https://api.dorratz.com/fbvideo?url=${encodeURIComponent(text)}`);
    const results = response.data;

    if (!results || results.length === 0) {
      return await conn.sendMessage(msg.key.remoteJid, {
        text: "❌ No se pudo obtener el video."
      }, { quoted: msg });
    }

    const message = `📺 *Resoluciones disponibles:*\n${results.map(r => `- ${r.resolution}`).join('\n')}\n\n🔥 Enviado en *720p*\n\n> 🍧 Procesado por *api.dorratz.com*\n───────\n© *Azura Ultra & Cortana Subbot*`;

    await conn.sendMessage(msg.key.remoteJid, {
      video: { url: results[0].url },
      caption: message
    }, { quoted: msg });

    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: '✅', key: msg.key }
    });

  } catch (err) {
    console.error(err);
    await conn.sendMessage(msg.key.remoteJid, {
      text: "❌ Ocurrió un error al procesar el enlace de Facebook."
    }, { quoted: msg });

    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: '❌', key: msg.key }
    });
  }
};

handler.command = ['facebook', 'fb'];
module.exports = handler;
