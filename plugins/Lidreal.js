const handler = async (msg, { conn }) => {
  const chatId = msg.key.remoteJid;
  const sender = msg.key.participant || msg.key.remoteJid;
  const senderNum = sender.replace(/[^0-9]/g, '');
  const isOwner = global.owner.some(([id]) => id === senderNum);

  if (!isOwner) {
    return conn.sendMessage(chatId, {
      text: '❌ Solo el *owner del bot* puede usar este comando.'
    }, { quoted: msg });
  }

  const context = msg.message?.extendedTextMessage?.contextInfo;
  const lid = context?.participant;

  const target = lid || sender;

  await conn.sendMessage(chatId, { react: { text: '🔍', key: msg.key } });

  try {
    const name = await conn.getName(target);
    const idVisible = target.endsWith('@lid') ? 'Posiblemente oculto (@lid)' : 'Número visible';
    const numero = target.replace(/[^0-9]/g, '');

    await conn.sendMessage(chatId, {
      text: `🔎 *Resultado de análisis:*\n\n🆔 ID: ${target}\n👤 Nombre: ${name}\n📱 Número: +${numero}\n🔐 Estado: ${idVisible}`
    }, { quoted: msg });
  } catch (e) {
    await conn.sendMessage(chatId, {
      text: `❌ No se pudo obtener el número real. WhatsApp está ocultando el número con @lid y no hay permisos suficientes.`
    }, { quoted: msg });
  }
};

handler.command = ['lidreal'];
module.exports = handler;
