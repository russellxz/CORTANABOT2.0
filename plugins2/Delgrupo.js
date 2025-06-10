const fs = require("fs");
const path = require("path");

const handler = async (msg, { conn }) => {
  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: "🗑️", key: msg.key }
  });

  const fromMe = msg.key.fromMe;
  if (!fromMe) return await conn.sendMessage(msg.key.remoteJid, {
    text: "⛔ Solo el *dueño del subbot* puede usar este comando."
  }, { quoted: msg });

  const groupID = msg.key.remoteJid;
  if (!groupID.endsWith("@g.us")) {
    return await conn.sendMessage(groupID, {
      text: "⚠️ Este comando solo funciona dentro de un grupo."
    }, { quoted: msg });
  }

  const rawID = conn.user?.id || "";
  const subbotID = rawID.split(":")[0] + "@s.whatsapp.net";
  const filePath = path.resolve("grupo.json");
  let data = {};

  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }

  if (!Array.isArray(data[subbotID]) || !data[subbotID].includes(groupID)) {
    return await conn.sendMessage(groupID, {
      text: "ℹ️ Este grupo no está en la lista."
    }, { quoted: msg });
  }

  data[subbotID] = data[subbotID].filter(id => id !== groupID);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  await conn.sendMessage(groupID, {
    text: `✅ Grupo eliminado de la lista. ya no respondera en este grupo el subbots💠`
  }, { quoted: msg });
};

handler.command = ['delgrupo'];
module.exports = handler;
