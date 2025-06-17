const fs = require("fs");
const path = require("path");

const gifUrls = [
  "https://cdn.russellxz.click/5b056a4b.mp4",
  "https://cdn.russellxz.click/5c5a4f5c.mp4",
  "https://cdn.russellxz.click/f70fb41b.mp4",
  "https://cdn.russellxz.click/45e2ec30.mp4"
];

const textos = [
  "💋 *@1 besó apasionadamente a @2* 😳",
  "😍 *@1 le plantó un beso intenso a @2* 💕",
  "😘 *@1 no resistió y besó a @2* 💖",
  "🔥 *@1 y @2 se dieron un beso ardiente* 💦",
  "💘 *@1 besó con ternura a @2* 😚",
  "💞 *@1 no dudó y besó a @2 bajo la luna* 🌙",
  "😳 *@1 robó un beso a @2* 💫",
  "🥵 *@1 no aguantó las ganas y besó a @2* 😍",
  "👄 *@1 y @2 se dieron un beso inolvidable* ✨",
  "❤️ *@1 besó a @2 como en una novela romántica* 📖"
];

const KISS_PATH = path.resolve("kiss_data.json");
const KISS_COOLDOWN = 10 * 60 * 1000; // 10 minutos

const handler = async (msg, { conn, args }) => {
  const isGroup = msg.key.remoteJid.endsWith("@g.us");
  if (!isGroup) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: "⚠️ Este comando solo se puede usar en grupos."
    }, { quoted: msg });
  }

  // ✅ Reacción inicial
  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: "💋", key: msg.key }
  });

  const sender = (msg.key.participant || msg.key.remoteJid).replace(/[^0-9]/g, "");
  const groupId = msg.key.remoteJid;

  // Obtener destinatario: citado o mencionado
  const ctx = msg.message?.extendedTextMessage?.contextInfo;
  let target;
  if (ctx?.participant) {
    target = ctx.participant.replace(/[^0-9]/g, "");
  } else if (args[0]) {
    target = args[0].replace(/[^0-9]/g, "");
  }

  if (!target) {
    return conn.sendMessage(groupId, {
      text: "💡 Responde al mensaje o menciona a alguien para besarlo 💋"
    }, { quoted: msg });
  }

  if (target === sender) {
    return conn.sendMessage(groupId, {
      text: "😅 No puedes besarte a ti mismo..."
    }, { quoted: msg });
  }

  let data = fs.existsSync(KISS_PATH) ? JSON.parse(fs.readFileSync(KISS_PATH)) : {};
  if (!data[groupId]) data[groupId] = { besosDados: {}, besosRecibidos: {} };

  const ahora = Date.now();
  const dados = data[groupId].besosDados[sender]?.usuarios?.[target];
  const ultimaVez = dados?.last || 0;

  if (ahora - ultimaVez < KISS_COOLDOWN) {
    const waitMin = Math.ceil((KISS_COOLDOWN - (ahora - ultimaVez)) / 60000);
    return conn.sendMessage(groupId, {
      text: `⏳ Debes esperar *${waitMin} minuto(s)* antes de volver a besar a @${target}.`,
      mentions: [`${target}@s.whatsapp.net`]
    }, { quoted: msg });
  }

  // Actualizar besos dados
  if (!data[groupId].besosDados[sender]) {
    data[groupId].besosDados[sender] = { total: 0, usuarios: {} };
  }
  if (!data[groupId].besosDados[sender].usuarios[target]) {
    data[groupId].besosDados[sender].usuarios[target] = { count: 0, last: 0 };
  }

  data[groupId].besosDados[sender].total += 1;
  data[groupId].besosDados[sender].usuarios[target].count += 1;
  data[groupId].besosDados[sender].usuarios[target].last = ahora;

  // Actualizar besos recibidos
  if (!data[groupId].besosRecibidos[target]) {
    data[groupId].besosRecibidos[target] = { total: 0, usuarios: {} };
  }
  if (!data[groupId].besosRecibidos[target].usuarios[sender]) {
    data[groupId].besosRecibidos[target].usuarios[sender] = 0;
  }

  data[groupId].besosRecibidos[target].total += 1;
  data[groupId].besosRecibidos[target].usuarios[sender] += 1;

  fs.writeFileSync(KISS_PATH, JSON.stringify(data, null, 2));

  // Elegir gif y texto aleatorio
  const gif = gifUrls[Math.floor(Math.random() * gifUrls.length)];
  const texto = textos[Math.floor(Math.random() * textos.length)]
    .replace("@1", `@${sender}`)
    .replace("@2", `@${target}`);

  await conn.sendMessage(groupId, {
    video: { url: gif },
    gifPlayback: true,
    caption: texto,
    mentions: [`${sender}@s.whatsapp.net`, `${target}@s.whatsapp.net`]
  }, { quoted: msg });
};

handler.command = ["kiss"];
module.exports = handler;
