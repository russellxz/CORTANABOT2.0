const fs = require("fs");
const path = require("path");

const handler = async (msg, { conn, text }) => {
  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: "✅", key: msg.key }
  });

  const fromMe = msg.key.fromMe;
  if (!fromMe) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: "⛔ *Solo el dueño del subbot* puede usar este comando."
    }, { quoted: msg });
  }

  let target;
  if (msg.message?.extendedTextMessage?.contextInfo?.participant) {
    target = msg.message.extendedTextMessage.contextInfo.participant;
  } else if (text && text.trim() !== "") {
    target = text;
  }

  if (!target) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: "⚠️ Cita un mensaje o escribe el número del usuario a agregar."
    }, { quoted: msg });
  }

  target = target.replace(/\D/g, "");
  if (!target || isNaN(target)) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: "❌ Número inválido."
    }, { quoted: msg });
  }

  const rawID = conn.user?.id || "";
  const subbotID = rawID.split(":")[0] + "@s.whatsapp.net";

  // Ruta absoluta a la raíz del proyecto
  const filePath = path.join(process.cwd(), "listasubots.json");
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
      text: `ℹ️ El número *${target}* ya estaba en la lista.`
    }, { quoted: msg });
  }

  data[subbotID].push(target);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  await conn.sendMessage(msg.key.remoteJid, {
    text: `✅ *${target}* fue agregado correctamente a la lista del subbot.`
  }, { quoted: msg });
};

handler.command = ['addlista'];
module.exports = handler;
