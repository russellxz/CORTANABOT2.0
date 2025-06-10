const fs = require("fs");
const path = require("path");
const { downloadContentFromMessage } = require("@whiskeysockets/baileys");

const handler = async (msg, { conn, args }) => {
  const rawID = conn.user?.id || "";
  const subbotID = rawID.split(":")[0] + "@s.whatsapp.net";

  const prefixPath = path.resolve("prefixes.json");
  let prefixes = {};
  if (fs.existsSync(prefixPath)) {
    prefixes = JSON.parse(fs.readFileSync(prefixPath, "utf-8"));
  }
  const usedPrefix = prefixes[subbotID] || ".";

  const chatId = msg.key.remoteJid;
  const senderJid = msg.key.participant || msg.key.remoteJid;
  const senderNum = senderJid.replace(/[^0-9]/g, "");
  const botNumber = conn.user?.id.split(":")[0].replace(/[^0-9]/g, "");

  if (!chatId.endsWith("@g.us")) {
    return await conn.sendMessage(chatId, {
      text: "⚠️ Este comando solo se puede usar en grupos."
    }, { quoted: msg });
  }

  const groupMetadata = await conn.groupMetadata(chatId);
  const participant = groupMetadata.participants.find(p => p.id.includes(senderNum));
  const isAdmin = participant?.admin === "admin" || participant?.admin === "superadmin";
  const isBot = botNumber === senderNum;

  if (!isAdmin && !isBot) {
    return await conn.sendMessage(chatId, {
      text: "❌ Solo los administradores del grupo o el subbot pueden usar este comando."
    }, { quoted: msg });
  }

  const allMentions = groupMetadata.participants.map(p => p.id);
  let messageToForward = null;
  let hasMedia = false;

  if (msg.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
    const quoted = msg.message.extendedTextMessage.contextInfo.quotedMessage;

    if (quoted.conversation) {
      messageToForward = { text: quoted.conversation };
    } else if (quoted.extendedTextMessage?.text) {
      messageToForward = { text: quoted.extendedTextMessage.text };
    } else if (quoted.imageMessage) {
      const stream = await downloadContentFromMessage(quoted.imageMessage, "image");
      let buffer = Buffer.alloc(0);
      for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
      const mimetype = quoted.imageMessage.mimetype || "image/jpeg";
      const caption = quoted.imageMessage.caption || "";
      messageToForward = { image: buffer, mimetype, caption };
      hasMedia = true;
    } else if (quoted.videoMessage) {
      const stream = await downloadContentFromMessage(quoted.videoMessage, "video");
      let buffer = Buffer.alloc(0);
      for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
      const mimetype = quoted.videoMessage.mimetype || "video/mp4";
      const caption = quoted.videoMessage.caption || "";
      messageToForward = { video: buffer, mimetype, caption };
      hasMedia = true;
    } else if (quoted.audioMessage) {
      const stream = await downloadContentFromMessage(quoted.audioMessage, "audio");
      let buffer = Buffer.alloc(0);
      for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
      const mimetype = quoted.audioMessage.mimetype || "audio/mp3";
      messageToForward = { audio: buffer, mimetype };
      hasMedia = true;
    } else if (quoted.stickerMessage) {
      const stream = await downloadContentFromMessage(quoted.stickerMessage, "sticker");
      let buffer = Buffer.alloc(0);
      for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
      messageToForward = { sticker: buffer };
      hasMedia = true;
    } else if (quoted.documentMessage) {
      const stream = await downloadContentFromMessage(quoted.documentMessage, "document");
      let buffer = Buffer.alloc(0);
      for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
      const mimetype = quoted.documentMessage.mimetype || "application/pdf";
      const caption = quoted.documentMessage.caption || "";
      messageToForward = { document: buffer, mimetype, caption };
      hasMedia = true;
    }
  }

  if (!hasMedia && args.join(" ").trim().length > 0) {
    messageToForward = { text: args.join(" ") };
  }

  if (!messageToForward) {
    return await conn.sendMessage(chatId, {
      text: "⚠️ Debes responder a un mensaje o proporcionar un texto para reenviar."
    }, { quoted: msg });
  }

  await conn.sendMessage(chatId, {
    ...messageToForward,
    mentions: allMentions
  }, { quoted: msg });
};

handler.command = ["tag"];
module.exports = handler;
