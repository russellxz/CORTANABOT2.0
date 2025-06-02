const handler = async (msg, { conn, args }) => {
  const chatId = msg.key.remoteJid;
  const sender = msg.key.participant || msg.key.remoteJid;
  const senderNum = sender.replace(/[^0-9]/g, "");
  const isOwner = global.owner.some(([id]) => id === senderNum);
  const isFromMe = msg.key.fromMe;

  if (!chatId.endsWith("@g.us")) {
    return conn.sendMessage(chatId, { text: "❌ Este comando solo puede usarse en grupos." }, { quoted: msg });
  }

  const meta = await conn.groupMetadata(chatId);
  const isAdmin = meta.participants.find(p => p.id === sender)?.admin;

  if (!isAdmin && !isOwner && !isFromMe) {
    return conn.sendMessage(chatId, {
      text: "❌ Solo *admins* o *el dueño del bot* pueden usar este comando."
    }, { quoted: msg });
  }

  const horaTexto = args.join(" ").trim();
  if (!horaTexto) {
    return conn.sendMessage(chatId, {
      text: "✳️ Usa el comando así:\n*.6vs6 [hora]*\nEjemplo: *.6vs6 6:00pm*"
    }, { quoted: msg });
  }

  // Convertir hora base (México) a 24h
  const to24Hour = (str) => {
    let [time, modifier] = str.toLowerCase().split(/(am|pm)/);
    let [h, m] = time.split(":").map(n => parseInt(n));
    if (modifier === 'pm' && h !== 12) h += 12;
    if (modifier === 'am' && h === 12) h = 0;
    return { h, m: m || 0 };
  };

  const to12Hour = (h, m) => {
    const suffix = h >= 12 ? 'pm' : 'am';
    h = h % 12 || 12;
    return `${h}:${m.toString().padStart(2, '0')}${suffix}`;
  };

  const base = to24Hour(horaTexto);

  const zonas = [
    { pais: "🇲🇽 MÉXICO", offset: 0 },
    { pais: "🇨🇴 COLOMBIA", offset: 0 },
    { pais: "🇵🇪 PERÚ", offset: 0 },
    { pais: "🇵🇦 PANAMÁ", offset: 0 },
    { pais: "🇸🇻 EL SALVADOR", offset: 0 },
    { pais: "🇨🇱 CHILE", offset: 2 },
    { pais: "🇦🇷 ARGENTINA", offset: 2 },
    { pais: "🇪🇸 ESPAÑA", offset: 7 }
  ];

  const horaMsg = zonas.map(z => {
    let newH = base.h + z.offset;
    if (newH >= 24) newH -= 24;
    return `${z.pais} : ${to12Hour(newH, base.m)}`;
  }).join("\n");

  await conn.sendMessage(chatId, { react: { text: '🎮', key: msg.key } });

  const participantes = meta.participants.filter(p => p.id !== conn.user.id);
  if (participantes.length < 18) {
    return conn.sendMessage(chatId, {
      text: "⚠️ Se necesitan al menos *18 usuarios* para formar 3 escuadras y suplentes."
    }, { quoted: msg });
  }

  const tempMsg = await conn.sendMessage(chatId, {
    text: "🎮 Preparando escuadras de Free Fire..."
  }, { quoted: msg });

  const pasos = [
    "🧠 Pensando estrategias...",
    "🎲 Mezclando nombres...",
    "📊 Seleccionando jugadores...",
    "✅ ¡Listo! Escuadras generadas:"
  ];

  for (let i = 0; i < pasos.length; i++) {
    await new Promise(r => setTimeout(r, 1500));
    await conn.sendMessage(chatId, {
      edit: tempMsg.key,
      text: pasos[i]
    });
  }

  const shuffled = participantes.sort(() => Math.random() - 0.5);
  const escuadra1 = shuffled.slice(0, 4);
  const suplentes1 = shuffled.slice(4, 6);
  const escuadra2 = shuffled.slice(6, 10);
  const suplentes2 = shuffled.slice(10, 12);
  const escuadra3 = shuffled.slice(12, 16);
  const suplentes3 = shuffled.slice(16, 18);

  const renderJugadores = (arr) => arr.map((u, i) => `${i === 0 ? "👑" : "🥷🏻"} ┇ @${u.id.split("@")[0]}`).join("\n");

  const textoFinal = `*6 𝐕𝐄𝐑𝐒𝐔𝐒 6*\n\n⏱ 𝐇𝐎𝐑𝐀𝐑𝐈𝐎\n${horaMsg}\n\n➥ 𝐌𝐎𝐃𝐀𝐋𝐈𝐃𝐀𝐃: 🔫 Clásico\n➥ 𝐉𝐔𝐆𝐀𝐃𝐎𝐑𝐄𝐒:\n\n     𝗘𝗦𝗖𝗨𝗔𝐃𝗥𝗔 1\n\n${renderJugadores(escuadra1)}\n\n    ㅤʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒:\n${renderJugadores(suplentes1)}\n\n     𝗘𝗦𝗖𝗨𝗔𝐃𝗥𝗔 2\n\n${renderJugadores(escuadra2)}\n\n    ㅤʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒:\n${renderJugadores(suplentes2)}\n\n     𝗘𝗦𝗖𝗨𝗔𝐃𝗥𝗔 3\n\n${renderJugadores(escuadra3)}\n\n    ㅤʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒:\n${renderJugadores(suplentes3)}`;

  const mentions = [...escuadra1, ...escuadra2, ...escuadra3, ...suplentes1, ...suplentes2, ...suplentes3].map(p => p.id);

  await conn.sendMessage(chatId, {
    edit: tempMsg.key,
    text: textoFinal,
    mentions
  });
};

handler.command = ['6vs6'];
module.exports = handler;
