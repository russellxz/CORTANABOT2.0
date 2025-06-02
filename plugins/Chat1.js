const axios = require("axios");

const handler = async (msg, { conn, text }) => {
  const chatId = msg.key.remoteJid;

  await conn.sendMessage(chatId, {
    react: { text: "💬", key: msg.key }
  });

  if (!text) {
    return conn.sendMessage(chatId, {
      text: "❌ Escribe algo para preguntarle a la IA.\nEjemplo: *chat1 ¿Quién eres?*"
    }, { quoted: msg });
  }

  try {
    const payload = [{
      role: "user",
      content: text
    }];

    const response = await axios.get("https://api.neoxr.eu/api/chat", {
      params: {
        url_handle: "karl-marx",
        message: JSON.stringify(payload),
        apikey: "russellxz"
      }
    });

    const data = response.data;
    if (!data.status) throw new Error("No se pudo obtener respuesta de la IA");

    const reply = data.data?.message || "⚠️ No hubo respuesta válida.";
    await conn.sendMessage(chatId, {
      text: `🤖 *IA respondió:*\n\n${reply}`
    }, { quoted: msg });

  } catch (e) {
    console.error("❌ Error en comando chat1:", e);
    await conn.sendMessage(chatId, {
      text: "❌ Error al contactar la IA. Intenta más tarde."
    }, { quoted: msg });
  }
};

handler.command = ["chat1"];
handler.tags = ["ai", "fun"];
handler.help = ["chat1 <pregunta>"];
module.exports = handler;
