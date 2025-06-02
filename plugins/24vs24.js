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
      text: "✳️ Usa el comando así:\n*.24vs24 [hora]*\nEjemplo: *.24vs24 8:30pm*"
    }, { quoted: msg });
  }

  await conn.sendMessage(chatId, { react: { text: '🎮', key: msg.key } });

  // Funciones de hora
  const to24Hour = (str) => {
    let [time, mod] = str.toLowerCase().split(/(am|pm)/);
    let [h, m] = time.split(":").map(Number);
    if (mod === 'pm' && h !== 12) h += 12;
    if (mod === 'am' && h === 12) h = 0;
    return { h, m: m || 0 };
  };
  const to12Hour = (h, m) => {
    const ampm = h >= 12 ? 'pm' : 'am';
    h = h % 12 || 12;
    return `${h}:${m.toString().padStart(2, '0')}${ampm}`;
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
  if (participantes.length < 42) {
    return conn.sendMessage(chatId, {
      text: "⚠️ Se necesitan al menos *42 usuarios* (28 titulares + 14 suplentes) para 7 escuadras."
    }, { quoted: msg });
  }

  const pasos = [
    "⚙️ Configurando partida 24 vs 24...",
    "🎲 Barajando jugadores...",
    "📋 Repartiendo escuadras...",
    "✅ ¡Listo! Aquí están los equipos:"
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

  const shuffled = participantes.sort(() => Math.random() - 0.5);
  const equipos = [];
  const suplentes = [];

  for (let i = 0; i < 7; i++) {
    equipos.push(shuffled.slice(i * 4, i * 4 + 4));
    suplentes.push(shuffled.slice(28 + i * 2, 28 + i * 2 + 2));
  }

  const renderJugadores = (arr) => arr.map((u, i) => `${i === 0 ? "👑" : "🥷🏻"} ┇ @${u.id.split("@")[0]}`).join("\n");

  let textoFinal = `*🔥 24 𝐕𝐒 24 - 7 ESCUADRAS 🔥*\n\n⏱ 𝐇𝐎𝐑𝐀𝐑𝐈𝐎\n${horaMsg}\n\n➥ 𝐌𝐎𝐃𝐀𝐋𝐈𝐃𝐀𝐃: 🔫 Clásico\n➥ 𝐉𝐔𝐆𝐀𝐃𝐎𝐑𝐄𝐒:\n`;

  for (let i = 0; i < 7; i++) {
    textoFinal += `\n     𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 ${i + 1}\n\n${renderJugadores(equipos[i])}\n\n    ㅤʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒:\n${renderJugadores(suplentes[i])}\n`;
  }

  const mentions = [...equipos.flat(), ...suplentes.flat()].map(p => p.id);

  await conn.sendMessage(chatId, {
    edit: tempMsg.key,
    text: textoFinal,
    mentions
  });
};

handler.command = ['24vs24'];
module.exports = handler;
