const handler = async (msg, { conn }) => {
  const chatId = msg.key.remoteJid;
  const prefix = global.prefix;

  try {
    // Reacción al comando
    await conn.sendMessage(chatId, { react: { text: "🎮", key: msg.key } });

    // Imagen del menú
    const imgUrl = 'https://cdn.russellxz.click/8b0e4c2c.jpeg';

    // Texto del menú rediseñado
    const texto = `🎮 𓆩 𝐂𝐎𝐑𝐓𝐀𝐍𝐀 𝟐.𝟎 — 𝐌𝐄𝐍𝐔́ 𝐅𝐑𝐄𝐄 𝐅𝐈𝐑𝐄 𓆪

🍉 𝐌𝐀𝐏𝐀𝐒 𝐃𝐄 𝐉𝐔𝐄𝐆𝐎  
📍 ➤ ${prefix}mapas

📃 𝐑𝐄𝐆𝐋𝐀𝐒 𝐃𝐄 𝐄𝐍𝐅𝐑𝐄𝐍𝐓𝐀𝐌𝐈𝐄𝐍𝐓𝐎  
📘 ➤ ${prefix}reglas  
🖊️ ➤ ${prefix}setreglas

⚔️ 𝐋𝐈𝐒𝐓𝐀 𝐕𝐄𝐑𝐒𝐔𝐒 𝐃𝐄 𝐂𝐋𝐀𝐍𝐄𝐒  
🛡️ ➤ ${prefix}4vs4  
🛡️ ➤ ${prefix}6vs6  
🛡️ ➤ ${prefix}12vs12  
🛡️ ➤ ${prefix}16vs16  
🛡️ ➤ ${prefix}20vs20  
🛡️ ➤ ${prefix}24vs24  
🏹 ➤ ${prefix}guerr

───────────────────
👨‍💻 *Desarrollado por:* Russell XZ  
🤖 *Cortana 2.0 Bot — Sección Free Fire*`;

    await conn.sendMessage(chatId, {
      image: { url: imgUrl },
      caption: texto
    }, { quoted: msg });

  } catch (err) {
    console.error("❌ Error en .menufree:", err);
    await conn.sendMessage(chatId, {
      text: "❌ No se pudo mostrar el menú."
    }, { quoted: msg });
  }
};

handler.command = ['menufree'];
module.exports = handler;
