const fs = require("fs");
const path = require("path");

const handler = async (msg, { conn }) => {
  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: "➕", key: msg.key }
  });

  const groupID = msg.key.remoteJid;
  if (!groupID.endsWith("@g.us")) {
    return await conn.sendMessage(groupID, {
      text: "⚠️ Este comando solo se puede usar dentro de un grupo.\n\n🛠️ *Sirve para activar el subbot en este grupo*."
    }, { quoted: msg });
  }

  // Obtener metadata del grupo y verificar si el remitente es admin
  let metadata;
  try {
    metadata = await conn.groupMetadata(groupID);
  } catch (err) {
    return await conn.sendMessage(groupID, {
      text: "❌ Error al obtener la metadata del grupo."
    }, { quoted: msg });
  }

  const sender = msg.key.participant || msg.key.remoteJid;
  const isAdmin = metadata.participants.find(p => p.id === sender && (p.admin === "admin" || p.admin === "superadmin"));

  if (!isAdmin) {
    return await conn.sendMessage(groupID, {
      text: "⛔ Solo *administradores del grupo* pueden usar este comando."
    }, { quoted: msg });
  }

  const rawID = conn.user?.id || "";
  const subbotID = rawID.split(":")[0] + "@s.whatsapp.net";

  const filePath = path.join(process.cwd(), "grupo.json");
  let data = {};

  if (fs.existsSync(filePath)) {
    try {
      data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch {
      data = {};
    }
  }

  if (!Array.isArray(data[subbotID])) {
    data[subbotID] = [];
  }

  if (data[subbotID].includes(groupID)) {
    return await conn.sendMessage(groupID, {
      text: "ℹ️ Este grupo ya está autorizado para usar el subbot."
    }, { quoted: msg });
  }

  data[subbotID].push(groupID);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  await conn.sendMessage(groupID, {
    text: "✅ *Grupo autorizado correctamente.* Ahora el subbot responderá a todos los usuarios en este grupo. 💠"
  }, { quoted: msg });
};

handler.command = ['addgrupo'];
module.exports = handler;
