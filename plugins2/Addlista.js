const fs = require("fs");
const path = require("path");

const handler = async (msg, { conn, text }) => {
  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: "➕", key: msg.key }
  });

  const isFromMe = msg.key.fromMe;
  if (!isFromMe) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: "⛔ Solo el *dueño del subbot* puede usar este comando."
    }, { quoted: msg });
  }

  // Obtener el número citado o ingresado
  let target;
  const contextInfo = msg.message?.extendedTextMessage?.contextInfo;

  if (contextInfo?.participant) {
    target = contextInfo.participant;
  } else if (text && text.trim() !== "") {
    target = text.trim();
  }

  if (!target) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: "⚠️ Cita un mensaje o escribe el número que deseas agregar a la lista."
    }, { quoted: msg });
  }

  target = target.replace(/[^0-9]/g, "");

  if (target.length < 5) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: "❌ El número no es válido."
    }, { quoted: msg });
  }

  // Obtener ID limpio del subbot
  const rawID = conn.user?.id || "";
  const subbotID = rawID.split(":")[0] + "@s.whatsapp.net";

  const filePath = path.join(__dirname, "..", "listasubots.json");
  let data = {};

  try {
    if (fs.existsSync(filePath)) {
      data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
  } catch (e) {
    console.error("❌ Error leyendo listasubots.json:", e);
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

  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("❌ Error escribiendo listasubots.json:", e);
    return await conn.sendMessage(msg.key.remoteJid, {
      text: "❌ No se pudo guardar la lista."
    }, { quoted: msg });
  }

  await conn.sendMessage(msg.key.remoteJid, {
    text: `✅ Usuario *${target}* agregado correctamente a tu lista.`
  }, { quoted: msg });
};

handler.command = ['addlista'];
module.exports = handler;
