const fs = require("fs");
const path = require("path");

const handler = async (msg, { conn, args }) => {
  const chatId = msg.key.remoteJid;
  const senderId = msg.key.participant || msg.key.remoteJid;
  const senderClean = senderId.replace(/[^0-9]/g, "");

  // Solo funciona en grupos
  if (!chatId.endsWith("@g.us")) {
    return await conn.sendMessage(chatId, {
      text: "❌ Este comando solo funciona en grupos."
    }, { quoted: msg });
  }

  // Verificar si es admin del grupo o owner del bot
  try {
    const metadata = await conn.groupMetadata(chatId);
    const participant = metadata.participants.find(p => p.id.includes(senderClean));
    const isAdmin = participant?.admin === "admin" || participant?.admin === "superadmin";
    const isOwner = global.owner.some(o => o[0] === senderClean);

    if (!isAdmin && !isOwner) {
      return conn.sendMessage(chatId, {
        text: "❌ Solo los administradores o el owner pueden usar este comando."
      }, { quoted: msg });
    }

    if (!args[0] || !["on", "off"].includes(args[0])) {
      return conn.sendMessage(chatId, {
        text: "✳️ Usa el comando así:\n\n📌 *antiporno on*  (activar)\n📌 *antiporno off* (desactivar)"
      }, { quoted: msg });
    }

    // Reacción ⏳
    await conn.sendMessage(chatId, {
      react: { text: "⏳", key: msg.key }
    });

    const filePath = path.resolve("./activos.json");
    let data = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : {};
    if (!data.antiporno) data.antiporno = {};

    if (args[0] === "on") {
      data.antiporno[chatId] = true;
      await conn.sendMessage(chatId, {
        text: "✅ Antiporno *activado* en este grupo."
      }, { quoted: msg });
    } else {
      delete data.antiporno[chatId];
      await conn.sendMessage(chatId, {
        text: "✅ Antiporno *desactivado* en este grupo."
      }, { quoted: msg });
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    // Reacción final
    await conn.sendMessage(chatId, {
      react: { text: "✅", key: msg.key }
    });

  } catch (err) {
    console.error("❌ Error en comando antiporno:", err);
    await conn.sendMessage(chatId, {
      text: "❌ Ocurrió un error al ejecutar el comando."
    }, { quoted: msg });

    await conn.sendMessage(chatId, {
      react: { text: "❌", key: msg.key }
    });
  }
};

handler.command = ["antiporno"];
module.exports = handler;
