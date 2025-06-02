const handler = async (msg, { conn }) => {
  const chatId = msg.key.remoteJid;

  await conn.sendMessage(chatId, {
    text: `🔔 ¡Sigue nuestro canal oficial de Azura Ultra 2.0 para recibir actualizaciones, funciones nuevas y más!`,
  }, {
    quoted: msg,
    contextInfo: {
      isForwarded: true,
      forwardingScore: 999,
      remoteJid: "120363266665814365@newsletter"
    }
  });
};

handler.command = ['prueba2'];
module.exports = handler;
