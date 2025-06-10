const fs = require("fs");
const path = require("path");

const handler = async (msg, { conn, text }) => {
  // Reacción inicial
  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: "⚙️", key: msg.key }
  });

  const fromMe = msg.key.fromMe;
  if (!fromMe) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: "⛔ Solo el *dueño del subbot* puede usar este comando."
    }, { quoted: msg });
  }

  if (!text || text.length > 2) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: "⚠️ Usa el comando con el prefijo que desees (máx. 2 caracteres).\n\n✅ Ejemplo:\n.setprefix 🔥"
    }, { quoted: msg });
  }

  // Obtener ID limpio del subbot
  const rawID = conn.user?.id || "";
  const subbotID = rawID.split(":")[0] + "@s.whatsapp.net";

  // Cargar archivo de prefijos
  const filePath = path.resolve("prefixes.json");
  let data = {};
  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }

  data[subbotID] = text;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  await conn.sendMessage(msg.key.remoteJid, {
    text: `✅ Prefijo actualizado correctamente a: *${text}*`
  }, { quoted: msg });
};

handler.command = ['setprefix'];
module.exports = handler;
