const fs = require("fs");
const path = require("path");

const isOwner = (num) => {
  num = num.replace(/[^0-9]/g, "");
  const owners = global.owner.map(([id]) => id);
  return owners.includes(num);
};

const handler = async (msg, { conn }) => {
  const senderId = msg.key.participant || msg.key.remoteJid;
  const senderClean = senderId.replace(/[^0-9]/g, '');

  if (!isOwner(senderClean)) {
    return conn.sendMessage(msg.key.remoteJid, {
      text: "❌ Solo el owner del bot puede usar este comando."
    }, { quoted: msg });
  }

  const subbotsPath = path.resolve('./subbots');

  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: "⏳", key: msg.key }
  });

  if (!fs.existsSync(subbotsPath)) {
    return conn.sendMessage(msg.key.remoteJid, {
      text: "📂 La carpeta /subbots no existe."
    }, { quoted: msg });
  }

  const carpetas = fs.readdirSync(subbotsPath);
  let corruptos = [];
  let validos = [];

  for (const carpeta of carpetas) {
    const rutaCreds = path.join(subbotsPath, carpeta, "creds.json");

    if (!fs.existsSync(rutaCreds)) {
      corruptos.push(carpeta);
      continue;
    }

    try {
      const contenido = fs.readFileSync(rutaCreds, "utf-8");
      const creds = JSON.parse(contenido);

      if (!creds?.me || !creds?.pairingCode) {
        corruptos.push(carpeta);
      } else {
        validos.push(carpeta);
      }

    } catch (e) {
      corruptos.push(carpeta);
    }
  }

  const texto = `
🤖 *Análisis de subbots (v2)*

✅ Subbots válidos (${validos.length}):
${validos.length > 0 ? validos.map(n => "• " + n).join("\n") : "Ninguno"}

⚠️ Subbots corruptos (${corruptos.length}):
${corruptos.length > 0 ? corruptos.map(n => "• " + n).join("\n") : "Ninguno"}

🧩 Usa *.delcosubbots* para eliminar las sesiones corruptas.
`.trim();

  await conn.sendMessage(msg.key.remoteJid, {
    text: texto
  }, { quoted: msg });

  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: "✅", key: msg.key }
  });
};

handler.command = ['cosubbots'];
module.exports = handler;
