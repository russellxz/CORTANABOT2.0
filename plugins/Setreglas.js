const fs = require("fs");
const path = require("path");

// ——— Helpers LID-aware ———
const DIGITS = (s = "") => String(s).replace(/\D/g, "");

/** Normaliza: si participante viene como @lid y trae .jid (real), usa .jid */
function lidParser(participants = []) {
  try {
    return participants.map(v => ({
      id: (typeof v?.id === "string" && v.id.endsWith("@lid") && v.jid) ? v.jid : v.id,
      admin: v?.admin ?? null,
      raw: v
    }));
  } catch {
    return participants || [];
  }
}

/** Admin por NÚMERO real (funciona en LID y no-LID) */
async function isAdminByNumber(conn, chatId, number) {
  try {
    const meta = await conn.groupMetadata(chatId);
    const raw  = Array.isArray(meta?.participants) ? meta.participants : [];
    const norm = lidParser(raw);

    const adminNums = new Set();
    for (let i = 0; i < raw.length; i++) {
      const r = raw[i], n = norm[i];
      const isAdm = (r?.admin === "admin" || r?.admin === "superadmin" ||
                     n?.admin === "admin" || n?.admin === "superadmin");
      if (isAdm) {
        [r?.id, r?.jid, n?.id].forEach(x => {
          const d = DIGITS(x || "");
          if (d) adminNums.add(d);
        });
      }
    }
    return adminNums.has(number);
  } catch {
    return false;
  }
}

/** Desencapsula viewOnce/ephemeral y retorna el mensaje interno real */
function unwrapMessage(m) {
  let node = m;
  while (
    node?.viewOnceMessage?.message ||
    node?.viewOnceMessageV2?.message ||
    node?.viewOnceMessageV2Extension?.message ||
    node?.ephemeralMessage?.message
  ) {
    node =
      node.viewOnceMessage?.message ||
      node.viewOnceMessageV2?.message ||
      node.viewOnceMessageV2Extension?.message ||
      node.ephemeralMessage?.message;
  }
  return node;
}

/** Extrae texto del mensaje citado (manteniendo saltos/espacios) */
function getQuotedText(msg) {
  const q = msg?.message?.extendedTextMessage?.contextInfo?.quotedMessage;
  if (!q) return null;
  const inner = unwrapMessage(q);
  return inner?.conversation || inner?.extendedTextMessage?.text || null;
}

/** Extrae imageMessage del citado (soporta ephemeral/viewOnce) */
function getQuotedImageMessage(msg) {
  const q = msg?.message?.extendedTextMessage?.contextInfo?.quotedMessage;
  if (!q) return null;
  const inner = unwrapMessage(q);
  return inner?.imageMessage || null;
}

/** Asegura acceso a wa.downloadContentFromMessage inyectado */
function ensureWA(wa, conn) {
  if (wa && typeof wa.downloadContentFromMessage === "function") return wa;
  if (conn && conn.wa && typeof conn.wa.downloadContentFromMessage === "function") return conn.wa;
  if (global.wa && typeof global.wa.downloadContentFromMessage === "function") return global.wa;
  return null;
}

const handler = async (msg, { conn, text, args, wa }) => {
  const chatId    = msg.key.remoteJid;
  const isGroup   = chatId.endsWith("@g.us");
  const senderJid = msg.key.participant || msg.key.remoteJid; // puede ser @lid
  const senderNum = DIGITS(senderJid);
  const isFromMe  = !!msg.key.fromMe;

  if (!isGroup) {
    return conn.sendMessage(chatId, { text: "❌ *Este comando solo se puede usar en grupos.*" }, { quoted: msg });
  }

  // Permisos: admin u owner (LID-aware)
  const isAdmin = await isAdminByNumber(conn, chatId, senderNum);
  const isOwner = Array.isArray(global.owner) && global.owner.some(([id]) => id === senderNum);

  if (!isAdmin && !isOwner && !isFromMe) {
    return conn.sendMessage(chatId, {
      text: "🚫 Solo administradores u owner pueden usar este comando."
    }, { quoted: msg });
  }

  // ——— Texto crudo (preserva saltos/espacios) ———
  const rawFromDispatcher = typeof text === "string" ? text : "";
  const textoCrudo = rawFromDispatcher.startsWith(" ") ? rawFromDispatcher.slice(1) : rawFromDispatcher;

  // Además, si el user respondió a un texto, podemos usarlo (solo si no escribió nada tras el comando)
  const quotedText = !textoCrudo ? getQuotedText(msg) : null;

  // Imagen citada (opcional; soporta viewOnce/ephemeral)
  const quotedImage = getQuotedImageMessage(msg);

  if (!textoCrudo && !quotedText && !quotedImage) {
    return conn.sendMessage(chatId, {
      text: `✏️ Usa el comando así:\n\n• *setreglas <texto>*  (multilínea permitido)\n• O responde a una *imagen* (opcional) y escribe: *setreglas <texto>*`
    }, { quoted: msg });
  }

  // Si hay imagen citada, la convertimos a base64
  let imagenBase64 = null;
  if (quotedImage) {
    try {
      const WA = ensureWA(wa, conn);
      if (!WA) throw new Error("downloadContentFromMessage no disponible");
      const stream = await WA.downloadContentFromMessage(quotedImage, "image");
      let buffer = Buffer.alloc(0);
      for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
      if (buffer.length) imagenBase64 = buffer.toString("base64");
    } catch (e) {
      console.error("[setreglas] error leyendo imagen citada:", e);
    }
  }

  // Texto final (conserva formato exactamente como escribió el user)
  const textoFinal = (textoCrudo || quotedText || "");

  const filePath = "./ventas365.json";
  let ventas = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, "utf-8")) : {};
  if (!ventas[chatId]) ventas[chatId] = {};

  ventas[chatId]["setreglas"] = {
    texto: textoFinal,   // tal cual (con \n y espacios)
    imagen: imagenBase64 // base64 o null
  };

  fs.writeFileSync(filePath, JSON.stringify(ventas, null, 2));

  await conn.sendMessage(chatId, { text: "✅ *REGLAS del grupo actualizadas con éxito.*" }, { quoted: msg });
};

handler.command = ["setreglas"];
module.exports = handler;
