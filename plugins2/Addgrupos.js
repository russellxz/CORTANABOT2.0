const fs = require("fs");
const path = require("path");

const handler = async (msg, { conn }) => {
  const groupID = msg.key.remoteJid;
  if (!groupID.endsWith("@g.us")) return;

  const sender = msg.key.participant || msg.key.remoteJid;
  const rawID = conn.user?.id || "";
  const subbotID = rawID.split(":")[0] + "@s.whatsapp.net";

  let metadata;
  try {
    metadata = await conn.groupMetadata(groupID);
  } catch {
    return;
  }

  const isAdmin = metadata.participants.some(p =>
    p.id === sender && (p.admin === "admin" || p.admin === "superadmin")
  );
  const isSelf = sender === subbotID;

  if (!isAdmin && !isSelf) {
    await conn.sendMessage(groupID, {
      react: { text: "❌", key: msg.key }
    });
    return;
  }

  await conn.sendMessage(groupID, {
    react: { text: "➕", key: msg.key }
  });

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

  if (!data[subbotID].includes(groupID)) {
    data[subbotID].push(groupID);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    await conn.sendMessage(groupID, {
      text: "✅ *Grupo autorizado correctamente.* Ahora el subbot responderá a todos los usuarios en este grupo.",
      quoted: msg
    });
  }
};

handler.command = ['addgrupo'];
module.exports = handler;
