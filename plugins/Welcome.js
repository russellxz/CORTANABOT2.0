const fs = require('fs');
const path = require('path');

const handler = async (msg, { conn, text, usedPrefix }) => {
  const chatId = msg.key.remoteJid;

  if (!chatId.endsWith('@g.us')) {
    return conn.sendMessage(chatId, {
      text: '❌ Este comando solo puede usarse en grupos.'
    }, { quoted: msg });
  }

  if (!text) {
    return conn.sendMessage(chatId, {
      text: `✳️ Usa el comando correctamente:\n\n📌 Ejemplo: *${usedPrefix}setwelcome* Hola, bienvenido al grupo Azura Ultra.`
    }, { quoted: msg });
  }

  // Obtener metadata y verificar si es admin o owner
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
  } catch (e) {
    console.error('❌ Error obteniendo metadata del grupo:', e);
    return conn.sendMessage(chatId, {
      text: '❌ No se pudo verificar si eres administrador.'
    }, { quoted: msg });
  }

  await conn.sendMessage(chatId, {
    react: { text: '⏳', key: msg.key }
  });

  try {
    const filePath = path.resolve('./welcome.json');

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify({}, null, 2));
    }

    const welcomeData = JSON.parse(fs.readFileSync(filePath));
    welcomeData[chatId] = text;
    fs.writeFileSync(filePath, JSON.stringify(welcomeData, null, 2));

    await conn.sendMessage(chatId, {
      text: `✅ Mensaje de bienvenida personalizado guardado:\n\n📝 *${text}*`
    }, { quoted: msg });

    await conn.sendMessage(chatId, {
      react: { text: '✅', key: msg.key }
    });

  } catch (err) {
    console.error('❌ Error guardando welcome.json:', err);

    await conn.sendMessage(chatId, {
      text: '❌ Hubo un error al guardar el mensaje.'
    }, { quoted: msg });

    await conn.sendMessage(chatId, {
      react: { text: '❌', key: msg.key }
    });
  }
};

handler.command = ['setwelcome'];
module.exports = handler;
