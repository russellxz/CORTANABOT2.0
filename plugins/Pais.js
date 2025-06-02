const fs = require("fs");

const handler = async (msg, { conn, args }) => {
  const chatId = msg.key.remoteJid;
  const metadata = await conn.groupMetadata(chatId);
  const senderId = msg.key.participant || msg.key.remoteJid;
  const senderNum = senderId.replace(/[^0-9]/g, '');
  const isOwner = global.owner.some(([id]) => id === senderNum);
  const isAdmin = metadata.participants.find(p => p.id === senderId)?.admin;

  if (!isAdmin && !isOwner) {
    return conn.sendMessage(chatId, {
      text: "❌ Este comando solo puede ser usado por *admins* o *el owner*."
    }, { quoted: msg });
  }

  const code = (args[0] || "").replace(/\D/g, "");
  if (!code) {
    return conn.sendMessage(chatId, {
      text: "⚠️ Usa el comando correctamente:\n\n*.pais +507*"
    }, { quoted: msg });
  }

  const flagMap = {
    "591": "🇧🇴", "593": "🇪🇨", "595": "🇵🇾", "598": "🇺🇾", "507": "🇵🇦",
    "505": "🇳🇮", "506": "🇨🇷", "502": "🇬🇹", "503": "🇸🇻", "504": "🇭🇳",
    "509": "🇭🇹", "549": "🇦🇷", "54": "🇦🇷", "55": "🇧🇷", "56": "🇨🇱",
    "57": "🇨🇴", "58": "🇻🇪", "52": "🇲🇽", "53": "🇨🇺", "51": "🇵🇪",
    "1": "🇺🇸", "34": "🇪🇸"
  };
  const flag = flagMap[code] || "🌐";

  const participants = metadata.participants;
  const matched = participants.filter(p => {
    const jid = p.id || "";
    return jid.endsWith("@s.whatsapp.net") && jid.replace(/[^0-9]/g, "").startsWith(code);
  });

  if (matched.length === 0) {
    return conn.sendMessage(chatId, {
      text: `❌ No hay usuarios con número visible del país +${code} en este grupo.\n\n⚠️ WhatsApp puede ocultar números como @lid y no se puede detectar su país.`
    }, { quoted: msg });
  }

  const mentions = matched.map(p => p.id);
  const list = mentions.map(id => `• @${id.split("@")[0]}`).join("\n");

  const textMsg = `🌍 *Usuarios del país +${code} ${flag} convocados:*\n\n${list}`;

  await conn.sendMessage(chatId, {
    text: textMsg,
    mentions
  }, { quoted: msg });

  await conn.sendMessage(chatId, {
    react: { text: "🌐", key: msg.key }
  });
};

handler.command = ["pais"];
module.exports = handler;
