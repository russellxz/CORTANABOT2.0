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
      text: "✳️ Usa el comando así:\n*.12vs12 [hora]*\nEjemplo: *.12vs12 6:00pm*"
    }, { quoted: msg });
  }

  await conn.sendMessage(chatId, { react: { text: '⚔️', key: msg.key } });

  // Conversión de hora base
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

  const participantes = meta.participants.filter(p => p.id !== conn.user.id);
  if (participantes.length < 32) {
    return conn.sendMessage(chatId, {
      text: "⚠️ Se necesitan al menos *32 usuarios* para formar 4 escuadras con suplentes."
    }, { quoted: msg });
  }

  const tempMsg = await conn.sendMessage(chatId, {
    text: "🎮 Preparando escuadras de Free Fire..."
  }, { quoted: msg });

  const pasos = [
    "⚙️ Configurando batalla 12 vs 12...",
    "🎲 Barajando escuadras...",
    "📋 Dividiendo jugadores...",
    "✅ ¡Listo! Revisa los equipos:"
  ];

  for (let i = 0; i < pasos.length; i++) {
    await new Promise(r => setTimeout(r, 1500));
    await conn.sendMessage(chatId, {
      edit: tempMsg.key,
      text: pasos[i]
    });
  }

  const shuffled = participantes.sort(() => Math.random() - 0.5);
  const e1 = shuffled.slice(0, 4);
  const s1 = shuffled.slice(4, 6);
  const e2 = shuffled.slice(6, 10);
  const s2 = shuffled.slice(10, 12);
  const e3 = shuffled.slice(12, 16);
  const s3 = shuffled.slice(16, 18);
  const e4 = shuffled.slice(18, 22);
  const s4 = shuffled.slice(22, 24);

  const renderJugadores = (arr) => arr.map((u, i) => `${i === 0 ? "👑" : "🥷🏻"} ┇ @${u.id.split("@")[0]}`).join("\n");

  const textoFinal = `*🔥 12 𝐕𝐒 12 - 4 ESCUADRAS 🔥*\n\n⏱ 𝐇𝐎𝐑𝐀𝐑𝐈𝐎\n${horaMsg}\n\n➥ 𝐌𝐎𝐃𝐀𝐋𝐈𝐃𝐀𝐃: 🔫 Clásico\n➥ 𝐉𝐔𝐆𝐀𝐃𝐎𝐑𝐄𝐒:\n
     𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 1\n\n${renderJugadores(e1)}\n\n    ㅤʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒:\n${renderJugadores(s1)}\n
     𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 2\n\n${renderJugadores(e2)}\n\n    ㅤʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒:\n${renderJugadores(s2)}\n
     𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 3\n\n${renderJugadores(e3)}\n\n    ㅤʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒:\n${renderJugadores(s3)}\n
     𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 4\n\n${renderJugadores(e4)}\n\n    ㅤʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒:\n${renderJugadores(s4)}`;

  const mentions = [...e1, ...e2, ...e3, ...e4, ...s1, ...s2, ...s3, ...s4].map(p => p.id);

  await conn.sendMessage(chatId, {
    edit: tempMsg.key,
    text: textoFinal,
    mentions
  });
};

handler.command = ['12vs12'];
module.exports = handler;
