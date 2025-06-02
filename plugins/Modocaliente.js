const fs = require("fs");
const path = require("path");

const handler = async (msg, { conn, args }) => {
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
      text: "🚫 Solo los administradores del grupo, el owner o el bot pueden usar este comando."
    }, { quoted: msg });
    return;
  }

  if (!args[0] || !["on", "off"].includes(args[0].toLowerCase())) {
    await conn.sendMessage(chatId, {
      text: "⚙️ Usa: *modocaliente on/off* para activar o desactivar el modo caliente en este grupo."
    }, { quoted: msg });
    return;
  }

  const activosPath = path.resolve("activos.json");
  let activos = {};
  if (fs.existsSync(activosPath)) {
    activos = JSON.parse(fs.readFileSync(activosPath, "utf-8"));
  }

  if (!activos.modocaliente) activos.modocaliente = {};

  if (args[0].toLowerCase() === "on") {
    activos.modocaliente[chatId] = true;
    await conn.sendMessage(chatId, {
      text: "✅ *Modo caliente activado* en este grupo."
    }, { quoted: msg });
  } else {
    delete activos.modocaliente[chatId];
    await conn.sendMessage(chatId, {
      text: "🛑 *Modo caliente desactivado* en este grupo."
    }, { quoted: msg });
  }

  fs.writeFileSync(activosPath, JSON.stringify(activos, null, 2));

  // Reacción al comando
  await conn.sendMessage(chatId, {
    react: { text: "✅", key: msg.key }
  });
};

handler.command = ["modocaliente"];
module.exports = handler;
