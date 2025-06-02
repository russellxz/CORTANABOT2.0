const fs = require('fs');

const handler = async (msg, { conn, isAdmin }) => {
  const chatId = msg.key.remoteJid;
  const isGroup = chatId.endsWith('@g.us');
  const sender = msg.key.participant || msg.key.remoteJid;
  const senderNum = sender.replace(/[^0-9]/g, '');
  const botNum = conn.user.id.split(':')[0];
  const isOwner = global.owner.some(([id]) => id === senderNum);
  const isBot = msg.key.fromMe || senderNum === botNum;

  if (isGroup && !isAdmin && !isOwner && !isBot) {
    return conn.sendMessage(chatId, {
      text: '❌ Solo *admins*, *dueños* o el *bot* pueden usar este comando.'
    }, { quoted: msg });
  }

  if (!isGroup && !isOwner && !isBot) {
    return conn.sendMessage(chatId, {
      text: '❌ Solo el *dueño* o el *bot* pueden usar este comando en privado.'
    }, { quoted: msg });
  }

  const files = ['./antidelete.json', './antideletepri.json'];
  for (const file of files) {
    if (fs.existsSync(file)) {
      fs.writeFileSync(file, JSON.stringify({}, null, 2));
    }
  }

  await conn.sendMessage(chatId, {
    text: '✅ *Los registros del sistema antidelete fueron limpiados correctamente.*'
  }, { quoted: msg });
};

handler.command = ['limpiar'];
module.exports = handler;
