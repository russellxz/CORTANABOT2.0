// plugins2/delpri.js
const handler = async (msg, { conn }) => {
  const senderId = msg.key.participant || msg.key.remoteJid;
  const senderNum = senderId.replace(/[^0-9]/g, "");
  const isOwner = global.owner.some(([id]) => id === senderNum);
  const isFromMe = msg.key.fromMe;

  if (!isOwner && !isFromMe) {
    return conn.sendMessage(msg.key.remoteJid, {
      text: "🚫 *Este comando solo puede usarlo el owner del bot o el subbot mismo.*"
    }, { quoted: msg });
  }

  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: "🧹", key: msg.key }
  });

  const chats = await conn.chats.all();
  let eliminados = 0;

  for (const chat of chats) {
    const jid = chat.id;
    if (!jid.endsWith("@g.us")) { // Solo chats privados
      await conn.chatModify({ clear: { messages: [{ id: chat.lastMessage?.key?.id, fromMe: true }] } }, jid);
      await conn.chatModify({ delete: true }, jid);
      eliminados++;
    }
  }

  await conn.sendMessage(msg.key.remoteJid, {
    text: `✅ *Se eliminaron ${eliminados} chats privados.*`
  }, { quoted: msg });
};

handler.command = ["delpri"];
handler.tags = ["owner"];
handler.help = ["delpri"];
module.exports = handler;
