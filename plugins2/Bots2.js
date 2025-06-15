const handler = async (msg, { conn }) => {
  const fs = require("fs");
  const path = require("path");

  const subbotsFolder = "./subbots";
  const prefixPath = path.join(__dirname, "..", "prefixes.json");

  // Leer subbots conectados
  const subDirs = fs.existsSync(subbotsFolder)
    ? fs.readdirSync(subbotsFolder).filter(d => 
        fs.existsSync(path.join(subbotsFolder, d, "creds.json"))
      )
    : [];

  if (subDirs.length === 0) {
    return await conn.sendMessage2(
      msg.key.remoteJid,
      "⚠️ No hay subbots conectados actualmente.",
      msg
    );
  }

  // Cargar prefijos personalizados
  let dataPrefijos = {};
  if (fs.existsSync(prefixPath)) {
    dataPrefijos = JSON.parse(fs.readFileSync(prefixPath, "utf-8"));
  }

  // Generar lista de subbots
  const total = subDirs.length;
  const maxSubbots = 100;
  const disponibles = maxSubbots - total;
  const mentions = [];

  const lista = subDirs.map((dir, i) => {
    const jid = dir.split("@")[0];
    const fullJid = `${jid}@s.whatsapp.net`;
    mentions.push(fullJid);
    const prefijo = dataPrefijos[fullJid] || ".";

    return `╭➤ *Subbot ${i + 1}*\n│ Número: @${jid}\n│ Prefijo: *${prefijo}*\n╰───────────────`;
  }).join("\n\n");

  // Construir mensaje final
  const menu = `╭━〔 *CORTANA 2.0 BOT* 〕━⬣
│ 🤖 Subbots Conectados: *${total}*
│ 💼 Disponibles: *${disponibles} de ${maxSubbots}*
╰━━━━━━━━━━━━⬣

${lista}`;

  // Enviar usando sendMessage2
  await conn.sendMessage(
    msg.key.remoteJid,
    {
      text: menu,
      mentions: mentions
    },
    msg
  );
};

handler.command = ['bots', 'subbots'];
handler.tags = ['owner'];
handler.help = ['bots'];
module.exports = handler;
