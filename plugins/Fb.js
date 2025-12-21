// comandos/fb.js — Facebook (URL)
// ✅ Reacciones: 👍 (Video) / ❤️ (Documento) o Respuestas 1 / 2
// ✅ Mensaje de espera: "Descargando su video..."
// ✅ Branding: Cortana 2.0 Bot + Link API + Thumbnail
// ✅ Multiuso: No se borra al instante

"use strict";

const axios = require("axios");
const fs = require("fs");
const path = require("path");

// === Config API ===
const API_BASE = "https://api-sky.ultraplus.click";
const API_KEY  = "Russellxz"; // Tu API Key

const MAX_MB = 200; // Límite de tamaño (MB)

// Jobs pendientes
const pendingFB = Object.create(null);

const mb = (n) => n / (1024 * 1024);

function isUrl(u = "") {
  return /^https?:\/\//i.test(String(u || ""));
}

function isFB(u = "") {
  u = String(u || "");
  return /(facebook\.com|fb\.watch|fb\.com)/i.test(u);
}

function normalizeUrl(input = "") {
  let u = String(input || "").trim().replace(/^<|>$/g, "").trim();
  // Arregla links cortos sin protocolo
  if (/^(www\.)?facebook\.com\//i.test(u) || /^fb\.watch\//i.test(u)) {
    u = "https://" + u.replace(/^\/+/, "");
  }
  return u;
}

function safeFileName(name = "facebook") {
  const base = String(name || "facebook").slice(0, 70);
  return (base.replace(/[^A-Za-z0-9_\-.]+/g, "_") || "facebook");
}

async function react(conn, chatId, key, emoji) {
  try { await conn.sendMessage(chatId, { react: { text: emoji, key } }); } catch {}
}

// Elige la mejor calidad disponible
function pickBestVideoUrl(result) {
  const hd = String(result?.media?.video_hd || "").trim();
  const sd = String(result?.media?.video_sd || "").trim();

  if (hd && isUrl(hd)) return hd; 
  if (sd && isUrl(sd)) return sd;
  return null;
}

// 1. OBTENER INFO (POST /facebook)
async function getFacebookInfo(url) {
  const endpoint = `${API_BASE}/facebook`;

  const r = await axios.post(endpoint, { url }, {
    headers: { "Content-Type": "application/json", apikey: API_KEY },
    timeout: 60000,
    validateStatus: () => true,
  });

  const data = r.data;
  const ok = data?.status === true || data?.status === "true";
  
  if (!ok) throw new Error(data?.message || "Error en la API de Facebook");
  
  return data.result;
}

// 2. DESCARGAR USANDO PROXY (GET /facebook/dl)
// Esto asegura que se use la IP del servidor para descargar el video
async function downloadVideoToTmp(srcUrl, filenameBase) {
  const tmpDir = path.resolve("./tmp");
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

  const fname = `${safeFileName(filenameBase)}.mp4`;
  
  // Construimos la URL del proxy de tu API
  const dlUrl = `${API_BASE}/facebook/dl` +
    `?type=video` +
    `&src=${encodeURIComponent(srcUrl)}` +
    `&filename=${encodeURIComponent(fname)}` +
    `&download=1`;

  const res = await axios.get(dlUrl, {
    responseType: "stream",
    timeout: 180000,
    headers: { 
      apikey: API_KEY,
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124.0.0.0 Safari/537.36" 
    }
  });

  const filePath = path.join(tmpDir, `fb-${Date.now()}.mp4`);
  
  const writer = fs.createWriteStream(filePath);
  res.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", () => resolve(filePath));
    writer.on("error", reject);
  });
}

// 3. HANDLER PRINCIPAL
module.exports = async (msg, { conn, args, command }) => {
  const chatId = msg.key.remoteJid;
  const pref = global.prefixes?.[0] || ".";
  let text = (args.join(" ") || "").trim();

  if (!text) {
    return conn.sendMessage(
      chatId,
      { text: `✳️ Usa:\n${pref}${command} <enlace>\nEj: ${pref}${command} https://fb.watch/xxxxxx/` },
      { quoted: msg }
    );
  }

  text = normalizeUrl(text);

  if (!isUrl(text) || !isFB(text)) {
    return conn.sendMessage(
      chatId,
      { text: `❌ Enlace inválido. Solo Facebook.` },
      { quoted: msg }
    );
  }

  try {
    await react(conn, chatId, msg.key, "⏳");

    // A) Obtener metadatos
    const result = await getFacebookInfo(text);
    const videoUrl = pickBestVideoUrl(result);

    if (!videoUrl) {
      await react(conn, chatId, msg.key, "❌");
      return conn.sendMessage(chatId, { text: "🚫 No se encontró video (puede ser privado o reel protegido)." }, { quoted: msg });
    }

    const title = result?.title || "Facebook Video";
    const thumb = result?.thumbnail || result?.image || "";

    // B) Construir mensaje de opciones
    const caption =
`⚡ 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 — 𝗢𝗽𝗰𝗶𝗼𝗻𝗲𝘀

📝 𝗧𝗶́𝘁𝘂𝗹𝗼: ${title}

Elige cómo enviarlo:
👍 𝗩𝗶𝗱𝗲𝗼 (normal)
❤️ 𝗩𝗶𝗱𝗲𝗼 𝗰𝗼𝗺𝗼 𝗱𝗼𝗰𝘂𝗺𝗲𝗻𝘁𝗼
— o responde: 1 = normal · 2 = documento

🤖 𝗕𝗼𝘁: *Cortana 2.0 Bot*
🔗 𝗔𝗣𝗜: https://api-sky.ultraplus.click`;

    let preview;
    if (thumb && isUrl(thumb)) {
        preview = await conn.sendMessage(chatId, { image: { url: thumb }, caption }, { quoted: msg });
    } else {
        preview = await conn.sendMessage(chatId, { text: caption }, { quoted: msg });
    }

    // C) Guardar tarea
    pendingFB[preview.key.id] = {
      chatId,
      url: videoUrl,
      title,
      quotedBase: msg,
      previewKey: preview.key,
      isBusy: false,
    };

    // Auto-limpieza (10 minutos)
    setTimeout(() => {
        if (pendingFB[preview.key.id]) delete pendingFB[preview.key.id];
    }, 10 * 60 * 1000);

    await react(conn, chatId, msg.key, "✅");

    // D) Listener de eventos
    if (!conn._fbInteractiveListener) {
      conn._fbInteractiveListener = true;

      conn.ev.on("messages.upsert", async (ev) => {
        for (const m of ev.messages) {
          try {
            // Reacciones
            if (m.message?.reactionMessage) {
              const { key: reactKey, text: emoji } = m.message.reactionMessage;
              const job = pendingFB[reactKey.id];
              
              if (!job || job.chatId !== m.key.remoteJid) continue;
              if (emoji !== "👍" && emoji !== "❤️") continue;

              if (job.isBusy) continue;
              const asDoc = emoji === "❤️";
              await sendVideo(conn, job, asDoc, m);
              continue;
            }

            // Respuestas texto
            const ctx = m.message?.extendedTextMessage?.contextInfo;
            if (ctx?.stanzaId && pendingFB[ctx.stanzaId]) {
              const job = pendingFB[ctx.stanzaId];
              if (job.chatId !== m.key.remoteJid) continue;

              const body = (m.message?.conversation || m.message?.extendedTextMessage?.text || "").trim();
              if (body !== "1" && body !== "2") continue;

              if (job.isBusy) continue;
              const asDoc = body === "2";
              await sendVideo(conn, job, asDoc, m);
            }
          } catch (e) {
            console.error("FB listener error:", e);
          }
        }
      });
    }

  } catch (err) {
    console.error("Error FB:", err);
    await conn.sendMessage(chatId, { text: `❌ Error: ${err.message}` }, { quoted: msg });
    await react(conn, chatId, msg.key, "❌");
  }
};

// 4. FUNCIÓN DE ENVÍO
async function sendVideo(conn, job, asDocument, triggerMsg) {
  job.isBusy = true;
  const { chatId, url, title, previewKey, quotedBase } = job;

  try {
    // Feedback visual
    await react(conn, chatId, triggerMsg.key, asDocument ? "📁" : "🎬");
    await conn.sendMessage(chatId, { text: "⏳ Espere, descargando su video..." }, { quoted: quotedBase });

    // Descarga
    const filePath = await downloadVideoToTmp(url, title);
    const sizeMB = mb(fs.statSync(filePath).size);

    if (sizeMB > MAX_MB) {
      try { fs.unlinkSync(filePath); } catch {}
      return conn.sendMessage(chatId, { text: `❌ El video pesa ${sizeMB.toFixed(2)} MB, excede el límite de ${MAX_MB} MB.` }, { quoted: quotedBase });
    }

    // Caption final
    const finalCaption = 
`📝 𝗧𝗶́𝘁𝘂𝗹𝗼: ${title}

🤖 𝗕𝗼𝘁: *Cortana 2.0 Bot*
🔗 𝗔𝗣𝗜: https://api-sky.ultraplus.click`;

    const buf = fs.readFileSync(filePath);

    await conn.sendMessage(
      chatId,
      {
        [asDocument ? "document" : "video"]: buf,
        mimetype: "video/mp4",
        fileName: `${safeFileName(title)}.mp4`,
        caption: asDocument ? finalCaption : "✅ Facebook video listo\n\n" + finalCaption,
      },
      { quoted: quotedBase }
    );

    try { fs.unlinkSync(filePath); } catch {}
    await react(conn, chatId, triggerMsg.key, "✅");

  } catch (e) {
    console.error("Error enviando FB:", e);
    await conn.sendMessage(chatId, { text: `❌ Falló el envío: ${e.message}` }, { quoted: quotedBase });
    await react(conn, chatId, triggerMsg.key, "❌");
  } finally {
    job.isBusy = false; // Liberar para otra descarga
  }
}

module.exports.command = ["facebook", "fb"];
module.exports.help = ["facebook <url>", "fb <url>"];
module.exports.tags = ["descargas"];
module.exports.register = true;
