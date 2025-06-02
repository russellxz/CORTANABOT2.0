const fs = require("fs");
const path = require("path");

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
      text: "🚫 Solo administradores o owners pueden usar este comando."
    }, { quoted: msg });
    return;
  }

  const fantasmas = global.listaFantasmas?.[chatId] || [];

  if (fantasmas.length === 0) {
    await conn.sendMessage(chatId, {
      text: "⚠️ No hay fantasmas pendientes por eliminar. Usa .fankick primero."
    }, { quoted: msg });
    return;
  }

  try {
    let eliminados = 0;
    let noEliminados = 0;

    for (const jid of fantasmas) {
      const target = metadata.participants.find(p => p.id === jid);

      // Si el usuario es admin, no intentar eliminarlo
      if (target?.admin === "admin" || target?.admin === "superadmin") {
        console.log(`❌ No se puede eliminar admin: ${jid}`);
        noEliminados++;
        continue;
      }

      await conn.groupParticipantsUpdate(chatId, [jid], "remove");
      eliminados++;

      await new Promise(resolve => setTimeout(resolve, 2000)); // Retraso de 2 segundos
    }

    await conn.sendMessage(chatId, {
      text: `✅ Eliminados ${eliminados} fantasmas.\n❌ No eliminados (eran admins): ${noEliminados}`,
    }, { quoted: msg });

    delete global.listaFantasmas[chatId]; // Limpiar la lista

  } catch (error) {
    console.error("❌ Error eliminando fantasmas:", error);
    await conn.sendMessage(chatId, {
      text: "❌ Error al intentar eliminar a los fantasmas."
    }, { quoted: msg });
  }
};

handler.command = ["okfan"];
module.exports = handler;
