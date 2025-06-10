const fs = require("fs");
const path = require("path");

const handler = async (msg, { conn }) => {
  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: "➕", key: msg.key }
  });

  const groupID = msg.key.remoteJid;
  if (!groupID.endsWith("@g.us")) {
    return await conn.sendMessage(groupID, {
      text: "⚠️ Este comando solo funciona dentro de un grupo. y es para que subbots responda en ese grupo donde uses este comando💠"
    }, { quoted: msg });
  }

  const rawID = conn.user?.id || "";
  const subbotID = rawID.split(":")[0] + "@s.whatsapp.net";
  const botNumber = rawID.split(":")[0];

  const senderJid = msg.key.participant || msg.key.remoteJid;
  const sender = senderJid.replace(/[^0-9]/g, "");

  const isOwner = sender === botNumber;

  if (!isOwner) {
    return await conn.sendMessage(groupID, {
      text: "⛔ Solo el *dueño del subbot* puede usar este comando."
    }, { quoted: msg });
  }

  const filePath = path.resolve("grupo.json");
  let data = {};

  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }

  if (!Array.isArray(data[subbotID])) {
    data[subbotID] = [];
  }

  if (data[subbotID].includes(groupID)) {
    return await conn.sendMessage(groupID, {
      text: "ℹ️ Este grupo ya está autorizado."
    }, { quoted: msg });
  }

  data[subbotID].push(groupID);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  await conn.sendMessage(groupID, {
    text: `✅ Grupo autorizado correctamente. Ahora el subbot responderá a los usuarios en este grupo 💠.`
  }, { quoted: msg });
};

handler.command = ['addgrupo'];
module.exports = handler;
