const handler = async (msg, { conn, args }) => {
  const chatId = msg.key.remoteJid;
  const text = args.join(" ").trim();
  const sender = msg.key.participant || msg.key.remoteJid;
  const senderNum = sender.replace(/[^0-9]/g, "");
  const isOwner = global.owner.some(([id]) => id === senderNum);

  if (!chatId.endsWith("@g.us")) {
    return conn.sendMessage(chatId, { text: "❌ Este comando solo puede usarse en grupos." }, { quoted: msg });
  }

  const meta = await conn.groupMetadata(chatId);
  const isAdmin = meta.participants.find(p => p.id === sender)?.admin;
  const isFromMe = msg.key.fromMe;

  if (!isAdmin && !isOwner && !isFromMe) {
    return conn.sendMessage(chatId, {
      text: "❌ Solo *admins* o *el dueño del bot* pueden usar este comando."
    }, { quoted: msg });
  }

  if (!text) {
    return conn.sendMessage(chatId, {
      text: `✳️ Usa el comando así:\n\n*.sorteo [premio o motivo]*\nEjemplo:\n*.sorteo Carro Fino*`
    }, { quoted: msg });
  }

  await conn.sendMessage(chatId, { react: { text: '🎲', key: msg.key } });

  const participantes = meta.participants.filter(p => !p.admin && p.id !== conn.user.id);

  if (participantes.length === 0) {
    return conn.sendMessage(chatId, {
      text: "⚠️ No hay suficientes participantes para hacer el sorteo."
    }, { quoted: msg });
  }

  const ganador = participantes[Math.floor(Math.random() * participantes.length)].id;

  const pasos = [
    "🎁 Preparando el sorteo...",
    "🎰 Revolviendo nombres...",
    "🌀 Cargando suerte...",
    "🎯 Apuntando al ganador..."
  ];

  const tempMsg = await conn.sendMessage(chatId, {
    text: pasos[0]
  }, { quoted: msg });

  for (let i = 1; i < pasos.length; i++) {
    await new Promise(r => setTimeout(r, 1500));
    await conn.sendMessage(chatId, {
      edit: tempMsg.key,
      text: pasos[i]
    });
  }

  await new Promise(r => setTimeout(r, 1500));
  await conn.sendMessage(chatId, {
    edit: tempMsg.key,
    text: `🎉 *SORTEO REALIZADO*\n\n🏆 *Premio:* ${text}\n👑 *Ganador:* @${ganador.split("@")[0]}`,
    mentions: [ganador]
  });
};

handler.command = ['sorteo'];
module.exports = handler;
