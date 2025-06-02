const fs = require("fs");
const path = require("path");

const handler = async (msg, { conn, args }) => {
  const chatId = msg.key.remoteJid;
  const senderId = msg.key.participant || msg.key.remoteJid;
  const senderClean = senderId.replace(/[^0-9]/g, "");
  const isOwner = global.owner.some(([id]) => id === senderClean);
  const isFromMe = msg.key.fromMe;

  if (chatId.endsWith("@g.us")) {
    return conn.sendMessage(chatId, {
      text: "❌ Este comando solo se usa en chats privados."
    }, { quoted: msg });
  }

  if (!isOwner && !isFromMe) {
    return conn.sendMessage(chatId, {
      text: "🚫 Solo el owner o el mismo bot pueden usar este comando."
    }, { quoted: msg });
  }

  if (!args[0] || !["on", "off"].includes(args[0].toLowerCase())) {
    return conn.sendMessage(chatId, {
      text: "⚙️ Usa: *antideletepri on/off*"
    }, { quoted: msg });
  }

  const activosPath = path.resolve("activos2.json");
  let activos = {};
  if (fs.existsSync(activosPath)) {
    activos = JSON.parse(fs.readFileSync(activosPath, "utf-8"));
  }

  if (args[0].toLowerCase() === "on") {
    activos.antideletepri = true;
    await conn.sendMessage(chatId, {
      text: "✅ Antidelete privado *activado*."
    }, { quoted: msg });
  } else {
    delete activos.antideletepri;
    await conn.sendMessage(chatId, {
      text: "✅ Antidelete privado *desactivado*."
    }, { quoted: msg });
  }

  fs.writeFileSync(activosPath, JSON.stringify(activos, null, 2));

  await conn.sendMessage(chatId, {
    react: { text: "✅", key: msg.key }
  });
};

handler.command = ["antideletepri"];
module.exports = handler;
