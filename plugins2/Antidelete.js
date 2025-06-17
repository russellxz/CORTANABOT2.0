// plugins2/antidelete.js
const fs   = require("fs");
const path = require("path");

module.exports = async (msg, { conn, args }) => {
  const chatId   = msg.key.remoteJid;
  const isGroup  = chatId.endsWith("@g.us");
  if (!isGroup) {
    return conn.sendMessage(chatId, { text: "❌ Este comando sólo funciona en grupos." }, { quoted: msg });
  }

  const subbotID = conn.user.id.split(":")[0] + "@s.whatsapp.net";
  const sender   = msg.key.participant || msg.key.remoteJid;

  /* ── Verifica que el solicitante sea admin o el propio sub-bot ── */
  const meta     = await conn.groupMetadata(chatId);
  const who      = meta.participants.find(p => p.id === sender);
  const isAdmin  = who?.admin === "admin" || who?.admin === "superadmin";
  const isBot    = sender === subbotID;
  if (!isAdmin && !isBot) {
    return conn.sendMessage(chatId,
      { text: "🚫 Sólo los administradores pueden usar este comando." },
      { quoted: msg });
  }

  /* ── Parsea argumento (on/off) ── */
  const choice = (args[0] || "").toLowerCase();
  if (!["on","off"].includes(choice)) {
    return conn.sendMessage(chatId,
      { text: "ℹ️ Uso: *.antidelete on*  |  *.antidelete off*" },
      { quoted: msg });
  }

  /* ── Carga y actualiza activossu.json ── */
  const file = "./activossu.json";
  const data = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file,"utf8")) : {};

  data.antidelete     = data.antidelete     || {};
  data.antidelete[subbotID] = data.antidelete[subbotID] || {};

  if (choice === "on") {
    data.antidelete[subbotID][chatId] = true;
  } else {
    delete data.antidelete[subbotID][chatId];
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2));

  /* ── Mensaje de confirmación ── */
  const txt = choice === "on"
    ? "✅ Antidelete *activado* en este grupo."
    : "❌ Antidelete *desactivado* en este grupo.";
  await conn.sendMessage(chatId, { text: txt }, { quoted: msg });
};

/* Métadatos del plugin */
module.exports.command = ["antidelete"];
module.exports.desc    = "Activa o desactiva antidelete en el grupo (admins sólo)";
