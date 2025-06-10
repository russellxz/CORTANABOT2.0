const handler = async (msg, { conn }) => {
  const fs = require("fs");
  const path = require("path");

  const subbotsFolder = "./subbots";
  const prefixPath = path.join(__dirname, "..", "prefixes.json");

  const subDirs = fs.existsSync(subbotsFolder)
    ? fs.readdirSync(subbotsFolder).filter(d => fs.existsSync(path.join(subbotsFolder, d, "creds.json")))
    : [];

  if (subDirs.length === 0) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: "⚠️ No hay subbots conectados actualmente.",
      quoted: msg
    });
  }

  // Cargar prefijos si existen
  let dataPrefijos = {};
  if (fs.existsSync(prefixPath)) {
    dataPrefijos = JSON.parse(fs.readFileSync(prefixPath, "utf-8"));
  }

  const total = subDirs.length;
  const lista = subDirs.map((id, i) => {
    const jid = id.split("@")[0];
    const subbotJid = id.includes("@s.whatsapp.net") ? id : `${jid}@s.whatsapp.net`;
    const prefijo = dataPrefijos[subbotJid] || ".";

    return `╭➤ *Subbot ${i + 1}*\n│ Número: @${jid}\n│ Prefijo: *${prefijo}*\n╰───────────────`;
  }).join("\n\n");

  const menu = `╭━〔 *AZURA ULTRA 2.0* 〕━⬣\n│  🤖 Subbots Conectados\n│  Total: *${total}*\n╰━━━━━━━━━━━━⬣\n\n${lista}`;

  await conn.sendMessage(msg.key.remoteJid, {
    text: menu,
    mentions: subDirs.map(id => id),
    quoted: msg
  });
};

handler.command = ['bots'];
module.exports = handler;
