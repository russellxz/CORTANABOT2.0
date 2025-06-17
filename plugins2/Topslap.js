const fs = require("fs");
const path = require("path");

const SLAP_PATH = path.resolve("slap_data.json");

const handler = async (msg, { conn }) => {
  const isGroup = msg.key.remoteJid.endsWith("@g.us");
  const chatId = msg.key.remoteJid;
  if (!isGroup) {
    return conn.sendMessage(chatId, {
      text: "⚠️ Este comando solo se puede usar en grupos."
    }, { quoted: msg });
  }

  // Reacción inicial 👋
  await conn.sendMessage(chatId, {
    react: { text: "📊", key: msg.key }
  });

  if (!fs.existsSync(SLAP_PATH)) {
    return conn.sendMessage(chatId, {
      text: "📉 Aún no hay datos de cachetadas en este grupo."
    }, { quoted: msg });
  }

  const data = JSON.parse(fs.readFileSync(SLAP_PATH));
  const grupo = data[chatId];
  if (!grupo || (!grupo.slapDados && !grupo.slapRecibidos)) {
    return conn.sendMessage(chatId, {
      text: "📉 Aún no hay datos suficientes para mostrar el top."
    }, { quoted: msg });
  }

  const menciones = new Set();

  // TOP que más cachetean
  const dados = Object.entries(grupo.slapDados || {}).map(([user, info]) => ({
    user,
    total: info.total
  })).sort((a, b) => b.total - a.total).slice(0, 5);

  const topDados = dados.length
    ? dados.map((u, i) => {
        menciones.add(`${u.user}@s.whatsapp.net`);
        return `🥇 ${i + 1}. @${u.user} — *${u.total}* cachetadas dadas`;
      }).join("\n")
    : "❌ Nadie ha cacheteado a nadie aún.";

  // TOP más cacheteados
  const recibidos = Object.entries(grupo.slapRecibidos || {}).map(([user, info]) => ({
    user,
    total: info.total
  })).sort((a, b) => b.total - a.total).slice(0, 5);

  const topRecibidos = recibidos.length
    ? recibidos.map((u, i) => {
        menciones.add(`${u.user}@s.whatsapp.net`);
        return `🤕 ${i + 1}. @${u.user} — *${u.total}* cachetadas recibidas`;
      }).join("\n")
    : "❌ Nadie ha recibido cachetadas todavía.";

  const mensaje = `📊 *TOP DE CACHETAZOS* 👋\n\n` +
                  `👊 *Más violentos:*\n${topDados}\n\n` +
                  `────────────────────────\n\n` +
                  `😵 *Más cacheteados:*\n${topRecibidos}`;

  await conn.sendMessage(chatId, {
    text: mensaje,
    mentions: [...menciones]
  }, { quoted: msg });
};

handler.command = ["topslap"];
module.exports = handler;
