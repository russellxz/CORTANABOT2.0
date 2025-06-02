const fs = require("fs");
const path = require("path");

const handler = async (msg, { conn }) => {
  const chatId = msg.key.remoteJid;
  const senderId = msg.key.participant || msg.key.remoteJid;
  const senderNum = senderId.replace(/[^0-9]/g, "");
  const isGroup = chatId.endsWith("@g.us");
  const isOwner = global.owner.some(([id]) => id === senderNum);

  if (!isGroup) {
    return conn.sendMessage(chatId, {
      text: "❌ Este comando solo puede usarse en grupos."
    }, { quoted: msg });
  }

  const metadata = await conn.groupMetadata(chatId);
  const isAdmin = metadata.participants.find(p => p.id === senderId)?.admin;
  if (!isAdmin && !isOwner) {
    return conn.sendMessage(chatId, {
      text: "❌ Solo *admins* o *dueños* del bot pueden usar este comando."
    }, { quoted: msg });
  }

  const context = msg.message?.extendedTextMessage?.contextInfo;
  const target = context?.participant;

  if (!target) {
    return conn.sendMessage(chatId, {
      text: "⚠️ Responde al mensaje del usuario que quieres mutear."
    }, { quoted: msg });
  }

  const targetNum = target.replace(/[^0-9]/g, "");
  const isTargetOwner = global.owner.some(([id]) => id === targetNum);

  if (isTargetOwner) {
    return conn.sendMessage(chatId, {
      text: "❌ No puedes mutear al *dueño del bot*."
    }, { quoted: msg });
  }

  const mutePath = path.resolve("./mute.json");
  const muteData = fs.existsSync(mutePath) ? JSON.parse(fs.readFileSync(mutePath)) : {};
  if (!muteData[chatId]) muteData[chatId] = [];

  if (!muteData[chatId].includes(target)) {
    muteData[chatId].push(target);
    fs.writeFileSync(mutePath, JSON.stringify(muteData, null, 2));
    await conn.sendMessage(chatId, {
      text: `🔇 Usuario @${target.split("@")[0]} ha sido muteado.`,
      mentions: [target]
    }, { quoted: msg });
  } else {
    await conn.sendMessage(chatId, {
      text: "⚠️ Este usuario ya está muteado.",
      mentions: [target]
    }, { quoted: msg });
  }
};

handler.command = ["mute"];
module.exports = handler;
