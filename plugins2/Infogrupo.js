const fs = require("fs");
const path = require("path");

const handler = async (msg, { conn }) => {
  const rawID = conn.user?.id || "";
  const subbotID = rawID.split(":")[0] + "@s.whatsapp.net";

  const prefixPath = path.resolve("prefixes.json");
  let prefixes = {};
  if (fs.existsSync(prefixPath)) {
    prefixes = JSON.parse(fs.readFileSync(prefixPath, "utf-8"));
  }
  const usedPrefix = prefixes[subbotID] || ".";

  if (!msg.key.remoteJid.endsWith("@g.us")) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: "⚠️ *Este comando solo funciona en grupos.*"
    }, { quoted: msg });
  }

  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: "🔍", key: msg.key }
  });

  try {
    const meta = await conn.groupMetadata(msg.key.remoteJid);
    const subject = meta.subject || "Sin nombre";
    const description = meta.desc || "No hay descripción.";

    const messageText = `*Información del Grupo:*\n\n*Nombre:* ${subject}\n*Descripción:* ${description}`;

    await conn.sendMessage(msg.key.remoteJid, {
      text: messageText
    }, { quoted: msg });

    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: "✅", key: msg.key }
    });

  } catch {
    await conn.sendMessage(msg.key.remoteJid, {
      text: "❌ *Error al obtener la información del grupo.*"
    }, { quoted: msg });
  }
};

handler.command = ["infogrupo"];
module.exports = handler;
