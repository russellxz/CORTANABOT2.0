const fs = require("fs");
const path = require("path");

const gifUrls = [
  "https://cdn.russellxz.click/f66ec014.mp4",
  "https://cdn.russellxz.click/d0df072f.mp4",
  "https://cdn.russellxz.click/b0a1bc6a.mp4",
  "https://cdn.russellxz.click/cb323398.mp4",
  "https://cdn.russellxz.click/59bc9653.mp4"
];

const textos = [
  "👋 *@1 le dio una cachetada a @2 con estilo dramático!* 🎭",
  "😤 *@1 le soltó una bofetada épica a @2* 💥",
  "💢 *@1 no se aguantó y cacheteó a @2 con fuerza!*",
  "🙃 *@1 le dio un buen sopapo a @2!*",
  "🔥 *@1 aplicó la cachetada legendaria a @2* ⚡",
  "🤚 *@1 le estampó una buena a @2!*",
  "💨 *@1 reaccionó y *¡PUM!* cacheteó a @2!*",
  "💥 *@1 y @2 protagonizan una escena de telenovela... ¡cachetada incluida!*"
];

const SLAP_PATH = path.resolve("slap_data.json");
const SLAP_COOLDOWN = 2 * 60 * 1000; // 2 minutos

const handler = async (msg, { conn, args }) => {
  const isGroup = msg.key.remoteJid.endsWith("@g.us");
  if (!isGroup) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: "⚠️ Este comando solo se puede usar en grupos."
    }, { quoted: msg });
  }

  // Reacción inicial 👋
  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: "👋", key: msg.key }
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
      text: "💡 Responde al mensaje o menciona a alguien para darle una cachetada 👋"
    }, { quoted: msg });
  }

  if (target === sender) {
    return conn.sendMessage(groupId, {
      text: "😅 No puedes cachetearte a ti mismo..."
    }, { quoted: msg });
  }

  let data = fs.existsSync(SLAP_PATH) ? JSON.parse(fs.readFileSync(SLAP_PATH)) : {};
  if (!data[groupId]) data[groupId] = { slapDados: {}, slapRecibidos: {} };

  const ahora = Date.now();
  const dados = data[groupId].slapDados[sender]?.usuarios?.[target];
  const ultimaVez = dados?.last || 0;

  if (ahora - ultimaVez < SLAP_COOLDOWN) {
    const waitMin = Math.ceil((SLAP_COOLDOWN - (ahora - ultimaVez)) / 60000);
    return conn.sendMessage(groupId, {
      text: `⏳ Debes esperar *${waitMin} minuto(s)* antes de volver a cachetear a @${target}.`,
      mentions: [`${target}@s.whatsapp.net`]
    }, { quoted: msg });
  }

  // Actualizar cachetadas dadas
  if (!data[groupId].slapDados[sender]) {
    data[groupId].slapDados[sender] = { total: 0, usuarios: {} };
  }
  if (!data[groupId].slapDados[sender].usuarios[target]) {
    data[groupId].slapDados[sender].usuarios[target] = { count: 0, last: 0 };
  }

  data[groupId].slapDados[sender].total += 1;
  data[groupId].slapDados[sender].usuarios[target].count += 1;
  data[groupId].slapDados[sender].usuarios[target].last = ahora;

  // Actualizar cachetadas recibidas
  if (!data[groupId].slapRecibidos[target]) {
    data[groupId].slapRecibidos[target] = { total: 0, usuarios: {} };
  }
  if (!data[groupId].slapRecibidos[target].usuarios[sender]) {
    data[groupId].slapRecibidos[target].usuarios[sender] = 0;
  }

  data[groupId].slapRecibidos[target].total += 1;
  data[groupId].slapRecibidos[target].usuarios[sender] += 1;

  fs.writeFileSync(SLAP_PATH, JSON.stringify(data, null, 2));

  // Elegir gif y texto aleatorio de forma más aleatoria
  const gif = gifUrls.sort(() => 0.5 - Math.random())[0];
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

handler.command = ["slap"];
module.exports = handler;
