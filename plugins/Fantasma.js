const fs = require("fs");
const path = require("path");

const handler = async (msg, { conn }) => {
  const chatId = msg.key.remoteJid;
  const senderId = msg.key.participant || msg.key.remoteJid;
  const senderClean = senderId.replace(/[^0-9]/g, "");
  const isGroup = chatId.endsWith("@g.us");

  if (!isGroup) {
    await conn.sendMessage(chatId, {
      text: "❌ Este comando solo puede usarse en grupos."
    }, { quoted: msg });
    return;
  }

  const metadata = await conn.groupMetadata(chatId);
  const participante = metadata.participants.find(p => p.id === senderId);
  const isAdmin = participante?.admin === "admin" || participante?.admin === "superadmin";
  const isOwner = global.owner.some(([id]) => id === senderClean);
  const isFromMe = msg.key.fromMe;

  if (!isAdmin && !isOwner && !isFromMe) {
    await conn.sendMessage(chatId, {
      text: "🚫 Solo los administradores del grupo o el owner pueden usar este comando."
    }, { quoted: msg });
    return;
  }

  const conteoPath = path.resolve("./conteo.json");
  let conteoData = {};

  if (fs.existsSync(conteoPath)) {
    conteoData = JSON.parse(fs.readFileSync(conteoPath, "utf-8"));
  }

  const groupConteo = conteoData[chatId] || {};

  const fantasmas = metadata.participants.filter(p => {
    const id = p.id;
    // Filtrar: solo usuarios normales (no administradores ni el bot mismo)
    return !groupConteo[id];
  });

  if (fantasmas.length === 0) {
    await conn.sendMessage(chatId, {
      text: "✅ No hay fantasmas en este grupo. Todos han enviado mensajes."
    }, { quoted: msg });
    return;
  }

  let texto = `⚠️ *Puedes usar .fankick para eliminar a los que no chatean toma en cuenta que el bot lleva un conteo desde que entro al grupo si rencien entro no recomiendo que uses fankick👀.*\n\n`;
  texto += `👻 *Lista de fantasmas detectados:*\n\n`;

  const menciones = [];

  for (const usuario of fantasmas) {
    const num = usuario.id.split("@")[0];
    texto += `@${num}\n`;
    menciones.push(usuario.id);
  }

  await conn.sendMessage(chatId, {
    text: texto,
    mentions: menciones
  }, { quoted: msg });
};

handler.command = ["fantasmas", "fantasma"];
module.exports = handler;
