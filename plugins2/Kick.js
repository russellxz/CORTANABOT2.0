const fs = require("fs");
const path = require("path");

const handler = async (msg, { conn }) => {
  const rawID = conn.user?.id || "";
  const subbotID = rawID.split(":")[0] + "@s.whatsapp.net";

  const prefixPath = path.resolve("prefixes.json");
  let prefixes = {};
  if (fs.existsSync(prefixPath)) {
    prefixes = JSON.parse(fs.readFileSync(prefixPath, "utf-8"));
  }
  const usedPrefix = prefixes[subbotID] || ".";

  if (!msg.key.remoteJid.includes("@g.us")) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: "❌ *Este comando solo funciona en grupos.*"
    }, { quoted: msg });
  }

  const chat = await conn.groupMetadata(msg.key.remoteJid);
  const senderId = msg.key.participant.replace(/@s\.whatsapp\.net/, "");
  const groupAdmins = chat.participants.filter(p => p.admin);
  const isAdmin = groupAdmins.some(admin => admin.id === msg.key.participant);

  let isOwner = false;
  try {
    const ownerFile = path.join(__dirname, "../../../config.js");
    if (fs.existsSync(ownerFile)) {
      const config = require(ownerFile);
      if (config.owner) isOwner = config.owner.some(o => o[0] === senderId);
    }
  } catch {}

  if (!isAdmin && !isOwner) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: "🚫 *No tienes permisos para expulsar a miembros del grupo.*\n⚠️ *Solo los administradores o el dueño del bot pueden usar este comando.*"
    }, { quoted: msg });
  }

  let userToKick = null;
  const mention = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
  if (mention?.length > 0) userToKick = mention[0];

  if (!userToKick && msg.message?.extendedTextMessage?.contextInfo?.participant) {
    userToKick = msg.message.extendedTextMessage.contextInfo.participant;
  }

  if (!userToKick) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: "⚠️ *Debes mencionar o responder a un usuario para expulsarlo.*"
    }, { quoted: msg });
  }

  // ⚠️ Verificar si el objetivo también es admin
  const isTargetAdmin = groupAdmins.some(admin => admin.id === userToKick);
  if (isTargetAdmin) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: "❌ *No puedes expulsar a un administrador del grupo.*"
    }, { quoted: msg });
  }

  await conn.groupParticipantsUpdate(msg.key.remoteJid, [userToKick], "remove");

  return await conn.sendMessage(msg.key.remoteJid, {
    text: `🚷 *El usuario @${userToKick.split("@")[0]} ha sido expulsado del grupo.*`,
    mentions: [userToKick]
  }, { quoted: msg });
};

handler.command = ["kick"];
module.exports = handler;
