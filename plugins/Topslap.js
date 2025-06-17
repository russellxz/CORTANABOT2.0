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

  // Obtener metadata del grupo para menciones correctas
  const metadata = await conn.groupMetadata(groupId);
  const participantes = metadata.participants;

  const obtenerEtiqueta = (idNum) => {
    const jid = `${idNum}@s.whatsapp.net`;
    const p = participantes.find(p => p.id === jid);
    if (!p) return "👤 Usuario desconocido";
    return `@${jid.split("@")[0]}`;
  };

  const mentions = new Set();

  const dados = Object.entries(grupo.slapDados || {})
    .map(([id, info]) => ({ id, total: info.total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  const recibidos = Object.entries(grupo.slapRecibidos || {})
    .map(([id, info]) => ({ id, total: info.total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  const topSlappers = dados.map((user, i) => {
    const tag = obtenerEtiqueta(user.id);
    mentions.add(`${user.id}@s.whatsapp.net`);
    return `🥊 ${i + 1}. ${tag} — *${user.total}* cachetadas dadas`;
  }).join("\n");

  const topSlappees = recibidos.map((user, i) => {
    const tag = obtenerEtiqueta(user.id);
    mentions.add(`${user.id}@s.whatsapp.net`);
    return `💥 ${i + 1}. ${tag} — *${user.total}* cachetadas recibidas`;
  }).join("\n");

  const texto = `╭─〔 *TOP SLAP DEL GRUPO* 〕─╮

🖐️ *Usuarios que MÁS cachetearon:*
${topSlappers || "— Sin datos —"}

─────────────────────

😵 *Usuarios MÁS cacheteados:*
${topSlappees || "— Sin datos —"}

╰────────────────────╯`;

  await conn.sendMessage(groupId, {
    text: texto,
    mentions: [...mentions]
  }, { quoted: msg });
};

handler.command = ["topslap"];
module.exports = handler;
