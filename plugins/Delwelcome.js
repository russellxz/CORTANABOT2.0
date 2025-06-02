const fs = require("fs");
const path = require("path");

const handler = async (msg, { conn }) => {
  const chatId = msg.key.remoteJid;

  if (!chatId.endsWith('@g.us')) {
    return conn.sendMessage(chatId, {
      text: '❌ Este comando solo puede usarse en grupos.'
    }, { quoted: msg });
  }

  // Verificar si es admin o owner
  try {
    const metadata = await conn.groupMetadata(chatId);
    const senderId = msg.key.participant || msg.key.remoteJid;
    const senderClean = senderId.replace(/[^0-9]/g, '');
    const participant = metadata.participants.find(p => p.id.includes(senderClean));
    const isAdmin = participant?.admin === 'admin' || participant?.admin === 'superadmin';
    const isOwner = global.owner.includes(senderClean);

    if (!isAdmin && !isOwner) {
      return conn.sendMessage(chatId, {
        text: '❌ Solo los administradores del grupo o el owner del bot pueden usar este comando.'
      }, { quoted: msg });
    }

    const filePath = path.resolve('./welcome.json');
    if (!fs.existsSync(filePath)) {
      return conn.sendMessage(chatId, {
        text: '⚠️ No hay mensajes personalizados guardados.'
      }, { quoted: msg });
    }

    const welcomeData = JSON.parse(fs.readFileSync(filePath));
    if (!welcomeData[chatId]) {
      return conn.sendMessage(chatId, {
        text: '⚠️ Este grupo no tiene un mensaje de bienvenida personalizado.'
      }, { quoted: msg });
    }

    delete welcomeData[chatId];
    fs.writeFileSync(filePath, JSON.stringify(welcomeData, null, 2));

    await conn.sendMessage(chatId, {
      text: '✅ Mensaje de bienvenida personalizado eliminado correctamente.'
    }, { quoted: msg });

  } catch (error) {
    console.error('❌ Error al eliminar bienvenida:', error);
    await conn.sendMessage(chatId, {
      text: '❌ Hubo un error al intentar eliminar el mensaje.'
    }, { quoted: msg });
  }
};

handler.command = ['delwelcome'];
module.exports = handler;
