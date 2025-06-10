function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

const handler = async (msg, { conn }) => {
  try {
    // 🔄 Reacción antes de procesar el comando
    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: "🧐", key: msg.key }
    });

    const verdad = pickRandom(global.verdad); // Selecciona una verdad aleatoria

    await conn.sendMessage(msg.key.remoteJid, {
      image: { url: 'https://cdn.russellxz.click/878c3136.jpg' },
      caption: `𝘏𝘢𝘴 𝘦𝘴𝘤𝘰𝘨𝘪𝘥𝘰 *𝘝𝘌𝘙𝘋𝘈𝘋*\n\n╱╲❀╱╲╱╲❀╱╲╱╲❀╱╲\n◆ ${verdad}\n╲╱❀╲╱╲╱❀╲╱╲╱❀╲╱\n\n© Azura Ulta & Cortana subbots`
    }, { quoted: msg });

    // ✅ Reacción de éxito
    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: "✅", key: msg.key }
    });

  } catch (e) {
    console.error("❌ Error en el comando .verdad:", e);
    await conn.sendMessage(msg.key.remoteJid, {
      text: "❌ *Hubo un error al enviar la verdad. Inténtalo de nuevo.*"
    }, { quoted: msg });

    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: "❌", key: msg.key }
    });
  }
};

handler.command = ['verdad'];
module.exports = handler;
