const moment = require("moment-timezone");

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
  const groupName = meta.subject || "Clan";
  const isAdmin = meta.participants.find(p => p.id === sender)?.admin;

  if (!isAdmin && !isOwner && !isFromMe) {
    return conn.sendMessage(chatId, {
      text: "❌ Solo *admins*, *owner* o *el bot* pueden usar este comando."
    }, { quoted: msg });
  }

  const horaTexto = args.join(" ").trim();
  if (!horaTexto) {
    return conn.sendMessage(chatId, {
      text: "✳️ Usa el comando así:\n*.guerr 4:30pm*"
    }, { quoted: msg });
  }

  // === CONFIGURACIÓN DE PAISES ===
  const zonas = [
    { pais: "🇲🇽 MÉXICO", tz: "America/Mexico_City" },
    { pais: "🇨🇴 COLOMBIA", tz: "America/Bogota" },
    { pais: "🇵🇪 PERÚ", tz: "America/Lima" },
    { pais: "🇵🇦 PANAMÁ", tz: "America/Panama" },
    { pais: "🇸🇻 EL SALVADOR", tz: "America/El_Salvador" },
    { pais: "🇨🇱 CHILE", tz: "America/Santiago" },
    { pais: "🇦🇷 ARGENTINA", tz: "America/Argentina/Buenos_Aires" },
    { pais: "🇺🇸 USA", tz: "America/New_York" },
    { pais: "🇪🇸 ESPAÑA", tz: "Europe/Madrid" }
  ];

  // === PARSEAR HORA DE MÉXICO COMO BASE ===
  const match = horaTexto.match(/(\d{1,2}):(\d{2})(am|pm)/i);
  if (!match) {
    return conn.sendMessage(chatId, { text: "❌ Formato inválido. Usa por ejemplo: *.guerr 4:30pm*" }, { quoted: msg });
  }

  let [_, hr, min, ampm] = match;
  hr = parseInt(hr);
  min = parseInt(min);
  if (ampm.toLowerCase() === "pm" && hr < 12) hr += 12;
  if (ampm.toLowerCase() === "am" && hr === 12) hr = 0;

  const horaMX = moment().tz("America/Mexico_City").set({ hour: hr, minute: min, second: 0 });
  const horaMsg = zonas.map(z => `│➥ ${z.pais} : ${horaMX.clone().tz(z.tz).format("hh:mm A")}`).join("\n");

  // === PARTICIPANTES ===
  const participantes = meta.participants.filter(p => p.id !== conn.user.id);
  if (participantes.length < 30) {
    return conn.sendMessage(chatId, {
      text: "⚠️ Se necesitan al menos *30 usuarios* para 6 escuadras y suplentes."
    }, { quoted: msg });
  }

  await conn.sendMessage(chatId, { react: { text: '⚔️', key: msg.key } });

  const shuffled = participantes.sort(() => Math.random() - 0.5);
  const escuadras = [];
  for (let i = 0; i < 6; i++) {
    escuadras.push(shuffled.slice(i * 4, i * 4 + 4));
  }
  const suplentes = shuffled.slice(24, 30);

  const render = (arr, n) => `│\n│    𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 ➹${n}\n│\n` +
    arr.map((u, i) => `│${i === 0 ? "👑" : "⚜️"} ➤ @${u.id.split("@")[0]}`).join("\n");

  const suplenteTxt = suplentes.map(u => `│⚜️ ➤ @${u.id.split("@")[0]}`).join("\n");

  let text = `╭──────>⋆☽⋆ ⋆☾⋆<──────╮
   ㅤ   *GUERRA DE CLANES*
           *${groupName}*
╰──────>⋆☽⋆ ⋆☾⋆<──────╯
╭──────────────╮
│ㅤ⏱ 𝐇𝐎𝐑𝐀𝐑𝐈𝐎 
${horaMsg}
│➥ 𝐉𝐔𝐆𝐀𝐃𝐎𝐑𝐄𝐒:\n`;

  escuadras.forEach((eq, i) => {
    text += render(eq, i + 1) + "\n";
  });

  text += `│\n│ㅤʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒:\n${suplenteTxt}\n╰─────────────╯`;

  const mentions = [...escuadras.flat(), ...suplentes].map(u => u.id);

  try {
    const pp = await conn.profilePictureUrl(chatId, "image");
    await conn.sendMessage(chatId, {
      image: { url: pp },
      caption: text,
      mentions
    }, { quoted: msg });
  } catch (e) {
    await conn.sendMessage(chatId, {
      text,
      mentions
    }, { quoted: msg });
  }
};

handler.command = ['guerr'];
module.exports = handler;
