const fs = require("fs");
const path = require("path");

const handler = async (msg, { conn }) => {
  try {
    const rawID = conn.user?.id || "";
    const subbotID = rawID.split(":")[0] + "@s.whatsapp.net";

    const chatJid = msg.key.remoteJid;
    const isGroup = chatJid.endsWith("@g.us");
    const isFromSubbot = msg.key.fromMe === true && !isGroup;

    if (!isFromSubbot) {
      return await conn.sendMessage(chatJid, {
        text: "❌ Este comando solo puede ser usado por el *subbot desde su propio chat privado*.",
      }, { quoted: msg });
    }

    const configPath = path.resolve("setmenu.json");

    if (!fs.existsSync(configPath)) {
      return await conn.sendMessage(chatJid, {
        text: "⚠️ No hay ningún menú personalizado configurado aún.",
        quoted: msg
      });
    }

    let data = JSON.parse(fs.readFileSync(configPath, "utf-8"));

    if (!data[subbotID]) {
      return await conn.sendMessage(chatJid, {
        text: "❌ Este subbot no tiene un menú personalizado.",
        quoted: msg
      });
    }

    delete data[subbotID];
    fs.writeFileSync(configPath, JSON.stringify(data, null, 2));

    await conn.sendMessage(chatJid, {
      text: "✅ Menú personalizado eliminado. Ahora se usará el menú por defecto.",
      quoted: msg
    });

    await conn.sendMessage(chatJid, {
      react: { text: "🗑️", key: msg.key }
    });

  } catch (e) {
    console.error("❌ Error en delmenu:", e);
    await conn.sendMessage(msg.key.remoteJid, {
      text: "❌ Ocurrió un error al intentar eliminar el menú personalizado.",
      quoted: msg
    });
  }
};

handler.command = ["delmenu"];
module.exports = handler;
