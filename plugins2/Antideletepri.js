// plugins2/antideletepri.js
const fs   = require("fs");

module.exports = async (msg, { conn, args }) => {
  const chatId  = msg.key.remoteJid;
  const isGroup = chatId.endsWith("@g.us");
  if (isGroup) {
    return conn.sendMessage(chatId,
      { text: "❌ Este comando es sólo para chats privados." },
      { quoted: msg });
  }

  const choice = (args[0] || "").toLowerCase();
  if (!["on", "off"].includes(choice)) {
    return conn.sendMessage(chatId,
      { text: "ℹ️ Uso: *.antideletepri on*  |  *.antideletepri off*" },
      { quoted: msg });
  }

  /* ── Cargar y actualizar activossu.json ── */
  const file     = "./activossu.json";
  const subbotID = conn.user.id.split(":")[0] + "@s.whatsapp.net";
  const data     = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file,"utf8")) : {};

  data.antideletepri = data.antideletepri || {};

  if (choice === "on") {
    data.antideletepri[subbotID] = true;
  } else {
    delete data.antideletepri[subbotID];
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2));

  /* ── Confirmación ── */
  const txt = choice === "on"
    ? "✅ Antidelete *activado* en privado."
    : "❌ Antidelete *desactivado* en privado.";
  await conn.sendMessage(chatId, { text: txt }, { quoted: msg });
};

module.exports.command = ["antideletepri"];
module.exports.desc    = "Activa / desactiva antidelete en privado";
