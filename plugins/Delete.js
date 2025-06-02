const handler = async (msg, { conn }) => {
  const chatId = msg.key.remoteJid;
  const senderId = msg.key.participant || msg.key.remoteJid;
  const senderClean = senderId.replace(/[^0-9]/g, "");
  const isGroup = chatId.endsWith("@g.us");

  if (!isGroup) {
    await conn.sendMessage(chatId, {
      text: "❌ Este comando solo puede usarse en grupos."
    }, { quoted: msg });
    return;
  }

  const metadata = await conn.groupMetadata(chatId);
  const participante = metadata.participants.find(p => p.id === senderId);
  const isAdmin = participante?.admin === "admin" || participante?.admin === "superadmin";
  const isOwner = global.owner.some(([id]) => id === senderClean);
  const isFromMe = msg.key.fromMe;

  if (!isAdmin && !isOwner && !isFromMe) {
    await conn.sendMessage(chatId, {
      text: "🚫 Solo los administradores del grupo o el owner pueden usar este comando."
    }, { quoted: msg });
    return;
  }

  const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage ||
                  msg.message?.extendedTextMessage?.contextInfo?.stanzaId;

  if (!quoted) {
    await conn.sendMessage(chatId, {
      text: "⚠️ Responde a un mensaje para eliminarlo usando *delete*."
    }, { quoted: msg });
    return;
  }

  try {
    await conn.sendMessage(chatId, {
      delete: {
        remoteJid: chatId,
        fromMe: false,
        id: msg.message.extendedTextMessage.contextInfo.stanzaId,
        participant: msg.message.extendedTextMessage.contextInfo.participant
      }
    });

    // Reacción ✅ al eliminar
    await conn.sendMessage(chatId, {
      react: { text: "✅", key: msg.key }
    });

  } catch (e) {
    console.error("❌ Error eliminando mensaje:", e);
    await conn.sendMessage(chatId, {
      text: "❌ Error al intentar eliminar el mensaje."
    }, { quoted: msg });
  }
};

handler.command = ["delete"];
module.exports = handler;
