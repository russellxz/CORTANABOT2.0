const fs = require("fs");
const path = require("path");

const handler = async (msg, { conn }) => {
  const groupId = msg.key.remoteJid;
  const isGroup = groupId.endsWith("@g.us");
  const SLAP_PATH = path.resolve("slap_data.json");

  if (!isGroup) {
    return conn.sendMessage(groupId, {
      text: "⚠️ Este comando solo funciona en grupos."
    }, { quoted: msg });
  }

  // Reacción inicial
  await conn.sendMessage(groupId, {
    react: { text: "🖐️", key: msg.key }
  });

  if (!fs.existsSync(SLAP_PATH)) {
    return conn.sendMessage(groupId, {
      text: "📭 No hay datos de bofetadas todavía en este grupo."
    }, { quoted: msg });
  }

  const data = JSON.parse(fs.readFileSync(SLAP_PATH));
  const grupo = data[groupId];
  if (!grupo) {
    return conn.sendMessage(groupId, {
      text: "📭 Este grupo aún no tiene bofetadas registradas."
    }, { quoted: msg });
  }

  const mentions = [];

  const slapsDados = Object.entries(grupo.slapsDados || {}).map(([id, info]) => ({
    id,
    total: info.total
  })).sort((a, b) => b.total - a.total).slice(0, 5);

  const slapsRecibidos = Object.entries(grupo.slapsRecibidos || {}).map(([id, info]) => ({
    id,
    total: info.total
  })).sort((a, b) => b.total - a.total).slice(0, 5);

  const topSlappers = slapsDados.map((user, i) => {
    mentions.push(user.id);
    return `👊 ${i + 1}. @${user.id.split("@")[0]} — ${user.total} 🖐️`;
  }).join("\n");

  const topSlappeados = slapsRecibidos.map((user, i) => {
    mentions.push(user.id);
    return `😵 ${i + 1}. @${user.id.split("@")[0]} — ${user.total} 💥`;
  }).join("\n");

  const text = `╭〔 *TOP SLAP DEL GRUPO* 〕╮

🖐️ *Usuarios que MÁS bofetearon:*
${topSlappers || "— Sin datos —"}

────────────────

💢 *Usuarios MÁS bofeteados:*
${topSlappeados || "— Sin datos —"}

╰────────────────╯`;

  await conn.sendMessage(groupId, {
    text,
    mentions
  }, { quoted: msg });
};

handler.command = ["topslap"];
module.exports = handler;
