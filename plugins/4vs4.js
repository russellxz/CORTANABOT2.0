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
      text: "✳️ Usa el comando así:\n*.4vs4 [hora]*\nEjemplo: *.4vs4 5:00pm*"
    }, { quoted: msg });
  }

  // Convertir la hora ingresada a formato 24h base México
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
    let newM = base.m;
    if (newH >= 24) newH -= 24;
    return `${z.pais} : ${to12Hour(newH, newM)}`;
  }).join("\n");

  await conn.sendMessage(chatId, { react: { text: '🎮', key: msg.key } });

  const participantes = meta.participants.filter(p => p.id !== conn.user.id);
  if (participantes.length < 12) {
    return conn.sendMessage(chatId, {
      text: "⚠️ Se necesitan al menos *12 usuarios* para formar 2 escuadras y suplentes."
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
  const escuadra2 = shuffled.slice(4, 8);
  const suplentes = shuffled.slice(8, 12);

  const renderJugadores = (arr) => arr.map((u, i) => `${i === 0 ? "👑" : "🥷🏻"} ┇ @${u.id.split("@")[0]}`).join("\n");

  const textoFinal = `*4 𝐕𝐄𝐑𝐒𝐔𝐒 4*\n\n⏱ 𝐇𝐎𝐑𝐀𝐑𝐈𝐎\n${horaMsg}\n\n➥ 𝐌𝐎𝐃𝐀𝐋𝐈𝐃𝐀𝐃: 🔫 Clásico\n➥ 𝐉𝐔𝐆𝐀𝐃𝐎𝐑𝐄𝐒:\n\n      𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 1\n\n${renderJugadores(escuadra1)}\n\n    ㅤʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒:\n${renderJugadores(suplentes.slice(0, 2))}\n\n     𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 2\n\n${renderJugadores(escuadra2)}\n\n    ㅤʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒:\n${renderJugadores(suplentes.slice(2))}`;

  const mentions = [...escuadra1, ...escuadra2, ...suplentes].map(p => p.id);

  await conn.sendMessage(chatId, {
    edit: tempMsg.key,
    text: textoFinal,
    mentions
  });
};

handler.command = ['4vs4'];
module.exports = handler;
