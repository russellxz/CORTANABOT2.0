const fs = require("fs");
const path = require("path");

const handler = async (msg, { conn, text }) => {
  // Reacción inicial
  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: "✅", key: msg.key }
  });

  // Verificar si el mensaje proviene del dueño (desde su mismo número/subbot)
  const fromMe = msg.key.fromMe;
  if (!fromMe) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: "⛔ *Solo el dueño del subbot* puede usar este comando."
    }, { quoted: msg });
  }

  // Determinar el número objetivo
  let target;
  if (msg.message?.extendedTextMessage?.contextInfo?.participant) {
    target = msg.message.extendedTextMessage.contextInfo.participant;
  } else if (text && text.trim() !== "") {
    target = text;
  }

  if (!target) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: "⚠️ Cita un mensaje o escribe el número para agregarlo a la lista."
    }, { quoted: msg });
  }

  target = target.replace(/\D/g, ""); // Limpiar formato
  if (!target || isNaN(target)) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: "❌ Número inválido."
    }, { quoted: msg });
  }

  // Obtener el ID del subbot
  const rawID = conn.user?.id || "";
  const subbotID = rawID.split(":")[0] + "@s.whatsapp.net";

  // Leer archivo
  const filePath = path.resolve("listasubots.json");
  let data = {};

  if (fs.existsSync(filePath)) {
    try {
      data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch {
      data = {};
    }
  }

  if (!Array.isArray(data[subbotID])) {
    data[subbotID] = [];
  }

  if (data[subbotID].includes(target)) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: `ℹ️ El número *${target}* ya está en la lista.`
    }, { quoted: msg });
  }

  // Agregar y guardar
  data[subbotID].push(target);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  await conn.sendMessage(msg.key.remoteJid, {
    text: `✅ *${target}* agregado correctamente a la lista del subbot.`
  }, { quoted: msg });
};

handler.command = ['addlista'];
module.exports = handler;
