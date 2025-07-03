const fs = require("fs");

module.exports = async (msg, { conn, args }) => {
  const sender = (msg.key.participant || msg.key.remoteJid).replace(/[^0-9]/g, "");
  const isOwner = global.owner.some(([id]) => id === sender);

  if (!isOwner) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: "⛔ Este comando solo lo puede usar el *propietario del bot*."
    }, { quoted: msg });
  }

  const activosPath = "./activos.json";
  let activos = fs.existsSync(activosPath)
    ? JSON.parse(fs.readFileSync(activosPath, "utf-8"))
    : {};

  const opcion = args[0]?.toLowerCase();
  if (!opcion || !["on", "off"].includes(opcion)) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: "⚙️ Usa: *.antiprivado on* o *.antiprivado off*"
    }, { quoted: msg });
  }

  if (opcion === "on") {
    activos.antiprivado = true;
    await conn.sendMessage(msg.key.remoteJid, {
      text: "✅ Modo *antiprivado* activado correctamente."
    }, { quoted: msg });
  } else if (opcion === "off") {
    activos.antiprivado = false;
    await conn.sendMessage(msg.key.remoteJid, {
      text: "❎ Modo *antiprivado* desactivado correctamente."
    }, { quoted: msg });
  }

  fs.writeFileSync(activosPath, JSON.stringify(activos, null, 2));
};

module.exports.command = ["antiprivado"];
