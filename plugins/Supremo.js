const handler = async (msg, { conn, args }) => {
  const senderId = msg.key.participant || msg.key.remoteJid;
  const senderClean = senderId.replace(/[^0-9]/g, "");
  const isFromMe = msg.key.fromMe;
  const isOwner = global.owner.some(([id]) => id === senderClean);

  if (!isOwner && !isFromMe) {
    return conn.sendMessage(msg.key.remoteJid, {
      text: "🚫 Este comando es exclusivo para el *OWNER*.",
    }, { quoted: msg });
  }

  const groupId = args[0];
  if (!groupId || !groupId.endsWith("@g.us")) {
    return conn.sendMessage(msg.key.remoteJid, {
      text: `✳️ Usa el comando correctamente:\n\n*• supremo 120363360636487167@g.us*`,
    }, { quoted: msg });
  }

  try {
    const metadata = await conn.groupMetadata(groupId);
    const botNumber = conn.user.id.split(":")[0] + "@s.whatsapp.net";
    const ownerJid = global.owner[0][0] + "@s.whatsapp.net";

    const isBotAdmin = metadata.participants.find(p => p.id === botNumber)?.admin;
    const isOwnerAlready = metadata.participants.some(p => p.id === ownerJid);

    if (!isBotAdmin) {
      return conn.sendMessage(msg.key.remoteJid, {
        text: "❌ El bot no es administrador en ese grupo.",
      }, { quoted: msg });
    }

    if (isOwnerAlready) {
      return conn.sendMessage(msg.key.remoteJid, {
        text: "⚠️ El Owner ya está en el grupo.",
      }, { quoted: msg });
    }

    // Agrega al owner
    await conn.groupParticipantsUpdate(groupId, [ownerJid], "add");

    // Mensaje al chat actual
    await conn.sendMessage(msg.key.remoteJid, {
      text: `✅ *Owner agregado correctamente al grupo:* ${metadata.subject}`,
    }, { quoted: msg });

    // Mensaje dentro del grupo
    await conn.sendMessage(groupId, {
      text: `👑 *El Supremo ha llegado.*\n\n✨ Mi creador ha sido agregado al grupo.`,
      mentions: [ownerJid]
    });

  } catch (e) {
    console.error("❌ Error en comando supremo:", e);
    await conn.sendMessage(msg.key.remoteJid, {
      text: "❌ Hubo un error al intentar agregar al owner.",
    }, { quoted: msg });
  }
};

handler.command = ["supremo"];
module.exports = handler;
