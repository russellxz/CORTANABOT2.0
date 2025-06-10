const fetch = require('node-fetch');

const handler = async (msg, { conn, text, args, usedPrefix, command }) => {
  if (!args.length) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: `⚠️ *Uso incorrecto.*\n📌 Ejemplo: \`${usedPrefix + command} Hola, ¿cómo estás?\``
    }, { quoted: msg });
  }

  const query = args.join(" ");
  const apiUrl = `https://api.neoxr.eu/api/gpt4-session?q=${encodeURIComponent(query)}&session=1727468410446638&apikey=russellxz`;
  const userId = msg.key.participant || msg.key.remoteJid;

  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: "🤖", key: msg.key }
  });

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`Error de la API: ${response.status} ${response.statusText}`);

    const data = await response.json();
    if (!data?.status || !data?.data?.message) throw new Error("No se pudo obtener una respuesta de GPT-4.");

    const respuestaGPT = data.data.message;

    await conn.sendMessage(msg.key.remoteJid, {
      text: `✨ *GPT-4 responde a @${userId.replace("@s.whatsapp.net", "")}:*\n\n${respuestaGPT}\n\n🔹 *Powered by Azura Ultra Subbot* 🤖`,
      mentions: [userId]
    }, { quoted: msg });

    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: "✅", key: msg.key }
    });

  } catch (err) {
    console.error("❌ Error en el comando chatgpt:", err.message);
    await conn.sendMessage(msg.key.remoteJid, {
      text: `❌ *Error al obtener respuesta de GPT-4:*\n_${err.message}_\n\n🔹 Inténtalo más tarde.`
    }, { quoted: msg });

    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: "❌", key: msg.key }
    });
  }
};

handler.command = ['chatgpt', 'ia'];
module.exports = handler;
