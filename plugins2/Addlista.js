const fs = require("fs");
const path = require("path");

const handler = async (msg, { conn, text }) => {
  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: "➕", key: msg.key }
  });

  const fromMe = msg.key.fromMe;
  if (!fromMe) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: "⛔ Solo el *dueño del subbot* puede usar este comando."
    }, { quoted: msg });
  }

  let target;
  const contextInfo = msg.message?.extendedTextMessage?.contextInfo;

  if (contextInfo?.participant) {
    target = contextInfo.participant;
  } else if (text && text.trim() !== "") {
    target = text;
  }

  if (!target) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: "⚠️ Cita un mensaje o escribe el número para agregar a la lista de acceso privado."
    }, { quoted: msg });
  }

  target = target.replace(/[^0-9]/g, ""); // solo números

  // Obtener ID del subbot
  const rawID = conn.user?.id || "";
  const subbotID = rawID.split(":")[0] + "@s.whatsapp.net";

  const filePath = path.resolve("listasubots.json");
  let data = {};

  if (fs.existsSync(filePath)) {
    try {
      data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch (e) {
      data = {};
    }
  }

  if (!Array.isArray(data[subbotID])) {
    data[subbotID] = [];
  }

  if (data[subbotID].includes(target)) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: "ℹ️ Ese número ya está en tu lista."
    }, { quoted: msg });
  }

  data[subbotID].push(target);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  await conn.sendMessage(msg.key.remoteJid, {
    text: `✅ Usuario *${target}* agregado a tu lista. Ahora el subbot le responderá en privado.`
  }, { quoted: msg });
};

handler.command = ['addlista'];
module.exports = handler;
