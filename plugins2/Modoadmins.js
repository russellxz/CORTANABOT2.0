const fs = require('fs');
const path = require('path');

const handler = async (msg, { conn, args }) => {
  const chatId = msg.key.remoteJid;
  const senderJid = msg.key.participant || msg.key.remoteJid;
  const senderNum = senderJid.replace(/[^0-9]/g, '');
  const subbotID = conn.user?.id || "";

  if (!chatId.endsWith("@g.us")) {
    return conn.sendMessage(chatId, {
      text: "❌ Este comando solo puede usarse en grupos."
    }, { quoted: msg });
  }

  if (!args[0] || !['on', 'off'].includes(args[0])) {
    return conn.sendMessage(chatId, {
      text: "⚙️ Usa el comando así:\n\n📌 *modoadmins on* (activar)\n📌 *modoadmins off* (desactivar)"
    }, { quoted: msg });
  }

  try {
    // Obtener metadata del grupo
    const metadata = await conn.groupMetadata(chatId);
    const participant = metadata.participants.find(p => p.id.includes(senderNum));
    const isAdmin = participant?.admin === 'admin' || participant?.admin === 'superadmin';
    const isOwner = global.owner.some(o => o[0] === senderNum);

    if (!isAdmin && !isOwner) {
      return conn.sendMessage(chatId, {
        text: "❌ Solo los administradores del grupo o el owner del bot pueden usar este comando."
      }, { quoted: msg });
    }

    // Leer y preparar archivo activossubbots.json
    const filePath = path.resolve("./activossubbots.json");
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify({ modoadmins: {} }, null, 2));
    }

    const data = JSON.parse(fs.readFileSync(filePath));
    if (!data.modoadmins) data.modoadmins = {};
    if (!data.modoadmins[subbotID]) data.modoadmins[subbotID] = {};

    // Activar o desactivar
    if (args[0] === 'on') {
      data.modoadmins[subbotID][chatId] = true;
      await conn.sendMessage(chatId, {
        text: "✅ Modo solo admins *activado* en este grupo."
      }, { quoted: msg });
    } else {
      delete data.modoadmins[subbotID][chatId];
      await conn.sendMessage(chatId, {
        text: "✅ Modo solo admins *desactivado* en este grupo."
      }, { quoted: msg });
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    // Reacción
    await conn.sendMessage(chatId, {
      react: { text: "✅", key: msg.key }
    });

  } catch (e) {
    console.error("❌ Error en comando modoadmins:", e);
    await conn.sendMessage(chatId, {
      text: "❌ Ocurrió un error al procesar el comando."
    }, { quoted: msg });
  }
};

handler.command = ['modoadmins'];
module.exports = handler;
