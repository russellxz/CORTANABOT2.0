const fs = require("fs");
const path = require("path");

const handler = async (msg, { conn }) => {
  const rawID = conn.user?.id || "";
  const subbotID = rawID.split(":")[0] + "@s.whatsapp.net";

  const prefixPath = path.resolve("prefixes.json");
  let prefixes = {};
  if (fs.existsSync(prefixPath)) {
    prefixes = JSON.parse(fs.readFileSync(prefixPath, "utf-8"));
  }
  const usedPrefix = prefixes[subbotID] || ".";
  const userId = msg.key.participant || msg.key.remoteJid;

  // Reacción normal (no cambia)
  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: "📜", key: msg.key }
  });

  const menu = `
╔⌬AZURA & CORTANA SUBBOT⌬╗
║   Menú por categorías  
╚═──────────────────═╝

〔 👇Has Que Tus Amigos Sean *SUBBOTS* Tambien Diles que envien estos comandos👇 〕
⟢ ${usedPrefix}serbot / qr
⟢ ${usedPrefix}code / codigo 
⟢ ${usedPrefix}sercode / codigo

〔 AI & Respuestas 〕
⟢ ${usedPrefix}chatgpt
⟢ ${usedPrefix}geminis

〔 Descargas 〕
⟢ ${usedPrefix}play / ${usedPrefix}playdoc
⟢ ${usedPrefix}play2 / ${usedPrefix}play2doc
⟢ ${usedPrefix}play5
⟢ ${usedPrefix}play6
⟢ ${usedPrefix}ytmp3 / ${usedPrefix}ytmp3doc
⟢ ${usedPrefix}ytmp35
⟢ ${usedPrefix}ytmp4 / ${usedPrefix}ytmp4doc
⟢ ${usedPrefix}ytmp45
⟢ ${usedPrefix}apk
⟢ ${usedPrefix}instagram / ${usedPrefix}ig
⟢ ${usedPrefix}tiktok / ${usedPrefix}tt
⟢ ${usedPrefix}facebook / ${usedPrefix}fb

〔 Stickers & Multimedia 〕
⟢ ${usedPrefix}s
⟢ ${usedPrefix}ver
⟢ ${usedPrefix}toaudio 
⟢ ${usedPrefix}hd
⟢ ${usedPrefix}toimg
⟢ ${usedPrefix}whatmusic
⟢ ${usedPrefix}tts
⟢ ${usedPrefix}perfil

〔 Grupos 〕
⟢ ${usedPrefix}abrirgrupo
⟢ ${usedPrefix}cerrargrupo
⟢ ${usedPrefix}infogrupo
⟢ ${usedPrefix}kick
⟢ ${usedPrefix}modoadmins on o off
⟢ ${usedPrefix}antilink on o off
⟢ ${usedPrefix}welcome on o off
⟢ ${usedPrefix}tag
⟢ ${usedPrefix}tagall / ${usedPrefix}invocar / ${usedPrefix}todos
⟢ ${usedPrefix}infogrupo
⟢ ${usedPrefix}damelink

〔 Comandos De Juegos 〕
⟢ ${usedPrefix}verdad
⟢ ${usedPrefix}reto
⟢ ${usedPrefix}memes o meme

〔 Configuración & Dueño 〕

▣ ${usedPrefix}setprefix ↷
  Cambiar prefijo del subbot
▣ ${usedPrefix}creador ↷
  Contacto del creador
▣ ${usedPrefix}get ↷
  Descargar estados
▣ ${usedPrefix}addgrupo ↷
  Autorizar grupo pa que lo usen.
▣ ${usedPrefix}addlista ↷
  Autorizar usuario privado pa lo usen.
▣ ${usedPrefix}dellista ↷
  Quitar usuario autorizado pa que o lo usen.
▣ ${usedPrefix}delgrupo ↷
  Eliminar grupo autorizado pa que no lo usen.
▣ ${usedPrefix}pong ↷
  Medir latencia del bot

═⌬Azura Ultra & cortana Subbot⌬═`;

  // Mensaje principal con sendMessage2
  await conn.sendMessage2(
    msg.key.remoteJid,
    {
      image: { url: `https://cdn.russellxz.click/d06910d4.PNG` },
      caption: menu
    },
    msg
  );

  // Reacción final normal (no cambia)
  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: "✅", key: msg.key }
  });
};

handler.command = ['menu', 'help', 'ayuda', 'comandos'];
module.exports = handler;
