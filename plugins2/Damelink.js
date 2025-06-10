const handler = async (msg, { conn }) => {
  const chatId = msg.key.remoteJid;

  if (!chatId.endsWith("@g.us")) {
    return await conn.sendMessage(chatId, {
      text: "⚠️ Este comando solo funciona en grupos."
    }, { quoted: msg });
  }

  await conn.sendMessage(chatId, {
    react: { text: "🔗", key: msg.key }
  });

  try {
    const code = await conn.groupInviteCode(chatId);
    const link = `https://chat.whatsapp.com/${code}`;

    await conn.sendMessage(chatId, {
      text: `🔗 *Enlace del grupo:*\n${link}`
    }, { quoted: msg });

  } catch (e) {
    await conn.sendMessage(chatId, {
      text: "❌ No se pudo obtener el enlace. Asegúrate de ser administrador."
    }, { quoted: msg });
  }
};

handler.command = ["damelink"];
module.exports = handler;
