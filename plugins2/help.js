const fs = require("fs");
const path = require("path");

const handler = async (msg, { conn }) => {
  try {
    const rawID = conn.user?.id || "";
    const subbotID = rawID.split(":")[0] + "@s.whatsapp.net";

    const prefixPath = path.resolve("prefixes.json");
    const menuConfigPath = path.resolve("setmenu.json");

    let prefixes = {};
    if (fs.existsSync(prefixPath)) {
      prefixes = JSON.parse(fs.readFileSync(prefixPath, "utf-8"));
    }

    const usedPrefix = prefixes[subbotID] || ".";
    const userId = msg.key.participant || msg.key.remoteJid;

    // Reacción de carga
    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: "📜", key: msg.key }
    });

    let customData = {};
    if (fs.existsSync(menuConfigPath)) {
      customData = JSON.parse(fs.readFileSync(menuConfigPath, "utf8"));
    }

    const personal = customData[subbotID];
    const imageBuffer = personal?.imagen ? Buffer.from(personal.imagen, "base64") : null;
    const nombreMenu = personal?.nombre || "CORTANA 2.0 SUBBOT";

    let footer = "";
    if (personal) {
      footer = `
━━━━━━━━━━━━━━━━━━━━━━
📍 TikTok: https://www.tiktok.com/@azuritabot?_t=ZT-8xpG3PgDQeT&_r=1
🖼️ Subbot personalizado por el usuario.`;
    }

    const caption = `
╔⌬${nombreMenu}⌬╗
║   Menú por categorías  
╚═─────────────═╝

〔 👇Haz Que Tus Amigos Sean *SUBBOTS* También Diles Que Envíen Estos Comandos👇 〕
⚘ ${usedPrefix}serbot / qr
⚘ ${usedPrefix}code / codigo 
⚘ ${usedPrefix}sercode / codigo

〔 AI & Respuestas 〕
⚘ ${usedPrefix}chatgpt
⚘ ${usedPrefix}geminis

〔 Descargas 〕
⚘ ${usedPrefix}play / ${usedPrefix}playdoc
⚘ ${usedPrefix}play2 / ${usedPrefix}play2doc
⚘ ${usedPrefix}play5 ${usedPrefix}play6
⚘ ${usedPrefix}ytmp3 / ${usedPrefix}ytmp3doc
⚘ ${usedPrefix}ytmp35
⚘ ${usedPrefix}ytmp4 / ${usedPrefix}ytmp4doc
⚘ ${usedPrefix}ytmp45
⚘ ${usedPrefix}apk
⚘ ${usedPrefix}instagram / ${usedPrefix}ig
⚘ ${usedPrefix}tiktok / ${usedPrefix}tt
⚘ ${usedPrefix}facebook / ${usedPrefix}fb

〔 Stickers & Multimedia 〕
⚘ ${usedPrefix}s
⚘ ${usedPrefix}ver
⚘ ${usedPrefix}toaudio 
⚘ ${usedPrefix}hd
⚘ ${usedPrefix}toimg
⚘ ${usedPrefix}whatmusic
⚘ ${usedPrefix}tts
⚘ ${usedPrefix}perfil

〔 Grupos 〕
⚘ ${usedPrefix}abrirgrupo
⚘ ${usedPrefix}cerrargrupo
⚘ ${usedPrefix}infogrupo
⚘ ${usedPrefix}kick
⚘ ${usedPrefix}modoadmins on o off
⚘ ${usedPrefix}antilink on o off
⚘ ${usedPrefix}welcome on o off
⚘ ${usedPrefix}tag
⚘ ${usedPrefix}tagall / ${usedPrefix}invocar / ${usedPrefix}todos
⚘ ${usedPrefix}infogrupo
⚘ ${usedPrefix}damelink
⚘ ${usedPrefix}antidelete on o off

〔 Comandos De Juegos 〕
⚘ ${usedPrefix}verdad
⚘ ${usedPrefix}reto
⚘ ${usedPrefix}memes o meme
⚘ ${usedPrefix}kiss
⚘ ${usedPrefix}topkiss
⚘ ${usedPrefix}slap
⚘ ${usedPrefix}topslap

〔 Configuración & Dueño 〕
⚘ ${usedPrefix}antideletepri on o off
⚘ ${usedPrefix}setprefix ↷ Cambiar prefijo del subbot
⚘ ${usedPrefix}creador ↷ Contacto del creador
⚘ ${usedPrefix}get ↷ Descargar estados
⚘ ${usedPrefix}addgrupo ↷ Autorizar grupo pa que lo usen.
⚘ ${usedPrefix}addlista ↷ Autorizar usuario privado pa lo usen.
⚘ ${usedPrefix}dellista ↷ Quitar usuario autorizado pa que no lo usen.
⚘ ${usedPrefix}delgrupo ↷ Eliminar grupo autorizado pa que no lo usen.
⚘ ${usedPrefix}ping ↷ Medir latencia del bot
${footer}`;

    await conn.sendMessage(
      msg.key.remoteJid,
      {
        image: imageBuffer ? imageBuffer : { url: `https://cdn.russellxz.click/139f04e1.jpeg` },
        caption,
      },
      { quoted: msg }
    );

    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: "✅", key: msg.key }
    });

  } catch (err) {
    console.error("❌ Error en el comando de Cortana menu:", err);
    await conn.sendMessage(msg.key.remoteJid, {
      text: "❌ Hubo un error mostrando el menú.",
      quoted: msg
    });
  }
};

handler.command = ['menu', 'help', 'ayuda', 'comandos'];
module.exports = handler;
