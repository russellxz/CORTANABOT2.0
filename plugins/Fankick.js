const fs = require("fs");
const path = require("path");

global.listaFantasmas = {}; // Necesario para guardar los fantasmas detectados

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
      text: "🚫 Solo administradores o owners pueden usar este comando."
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
    return !groupConteo[id]; // Solo los que no tienen mensajes registrados
  });

  if (fantasmas.length === 0) {
    await conn.sendMessage(chatId, {
      text: "✅ No hay fantasmas en este grupo. ¡Todos han enviado mensajes!"
    }, { quoted: msg });
    return;
  }

  global.listaFantasmas[chatId] = fantasmas.map(u => u.id); // Guardar lista para usar luego en .okfan

  let texto = `⚠️ *Se detectaron ${fantasmas.length} usuarios fantasmas.*\n`;
  texto += `Para eliminar a estos usuarios escribe el comando *okfan*.\n\n`;

  for (const usuario of fantasmas) {
    texto += `@${usuario.id.split("@")[0]}\n`;
  }

  await conn.sendMessage(chatId, {
    text: texto,
    mentions: fantasmas.map(u => u.id)
  }, { quoted: msg });
};

handler.command = ["fankick"];
module.exports = handler;
