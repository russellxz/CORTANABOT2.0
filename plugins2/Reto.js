function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

const handler = async (msg, { conn }) => {
  try {
    const reto = pickRandom(global.reto); // Selecciona un reto aleatorio

    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: "🎲", key: msg.key } // Reacción al usar el comando
    });

    await conn.sendMessage(msg.key.remoteJid, {
      image: { url: 'https://cdn.russellxz.click/0560b360.PNG' },
      caption: `𝘏𝘢𝘴 𝘦𝘴𝘤𝘰𝘨𝘪𝘥𝘰 *𝘙𝘌𝘛𝘖*\n\n╱╲❀╱╲╱╲❀╱╲╱╲❀╱╲\n◆ ${reto}\n╲╱❀╲╱╲╱❀╲╱╲╱❀╲╱\n\n© Azura Ultra & Cortana subbots`
    }, { quoted: msg });

  } catch (e) {
    console.error("❌ Error en el comando .reto:", e);
    await conn.sendMessage(msg.key.remoteJid, { 
      text: "❌ *Hubo un error al enviar el reto. Inténtalo de nuevo.*" 
    }, { quoted: msg });

    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: "❌", key: msg.key } // Reacción de error
    });
  }
};

handler.command = ['reto'];
module.exports = handler;
