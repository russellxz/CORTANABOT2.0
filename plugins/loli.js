const axios = require("axios");

const handler = async (msg, { conn }) => {
  try {
    const res = await axios.get("https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/nsfwloli.json");
    const url = res.data[Math.floor(Math.random() * res.data.length)];

    await conn.sendMessage(msg.key.remoteJid, {
      image: { url },
      caption: "🥵"
    }, { quoted: msg });
  } catch (e) {
    console.error("❌ Error en comando pornololi:", e);
    await msg.reply("❌ No se pudo obtener el contenido.");
  }
};

handler.command = ["pornololi"];
handler.tags = ["nsfw"];
handler.help = ["pornololi"];
module.exports = handler;
