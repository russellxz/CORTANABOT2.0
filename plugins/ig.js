// comandos/ig.js — Instagram SOLO VIDEO
// ✅ Reacciones: 👍 (Normal) / ❤️ (Documento) o Respuestas 1 / 2
// ✅ Mensaje de espera: "Descargando su video..."
// ✅ Branding: Cᴏʀᴛᴀɴᴀ Bᴏᴛ 2.0 + Link API + Thumbnail
// ✅ Multiuso: No se borra al instante (10 min activo)

"use strict";

const axios = require("axios");
const fs = require("fs");
const path = require("path");

const API_BASE = (process.env.API_BASE || "https://api-sky.ultraplus.click").replace(/\/+$/, "");
const SKY_API_KEY = process.env.API_KEY || "Russellxz";
const MAX_MB = Number(process.env.MAX_MB || 200);

const pendingIG = Object.create(null);

const mb = (n) => n / (1024 * 1024);

function isIG(u = "") {
  return /(instagram\.com|instagr\.am)/i.test(String(u || ""));
}
function isUrl(u = "") {
  return /^https?:\/\//i.test(String(u || ""));
}

function normalizeIGUrl(input = "") {
  let u = String(input || "").trim();
  u = u.replace(/^<|>$/g, "").trim();
  if (/^(www\.)?instagram\.com\//i.test(u) || /^instagr\.am\//i.test(u)) {
    u = "https://" + u.replace(/^\/+/, "");
  }
  return u;
}

function safeFileName(name = "instagram") {
  return (
    String(name || "instagram")
      .slice(0, 70)
      .replace(/[^A-Za-z0-9_\-.]+/g, "_") || "instagram"
  );
}

async function react(conn, chatId, key, emoji) {
  try { await conn.sendMessage(chatId, { react: { text: emoji, key } }); } catch {}
}

// 1. LLAMADA A LA API (POST /instagram)
async function callSkyInstagram(url) {
  const endpoint = `${API_BASE}/instagram`;

  const r = await axios.post(
    endpoint,
    { url },
    {
      timeout: 60000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json,*/*",
        apikey: SKY_API_KEY,
      },
      validateStatus: () => true,
    }
  );

  let data = r.data;
  if (typeof data === "string") {
    try { data = JSON.parse(data.trim()); } catch { throw new Error("Respuesta no JSON del servidor"); }
  }

  const ok = data?.status === true || data?.status === "true";
  if (!ok) throw new Error(data?.message || data?.error || `HTTP ${r.status}`);

  return data.result;
}

function extractItems(result) {
  const items = result?.media?.items;
  return Array.isArray(items) ? items : [];
}

function pickFirstVideo(items) {
  let v = items.find((it) => String(it?.type || "").toLowerCase() === "video" && it?.url);
  if (v?.url) return String(v.url);
  v = items.find((it) => /\.mp4(\?|#|$)/i.test(String(it?.url || "")));
  if (v?.url) return String(v.url);
  return null;
}

// 2. DESCARGA PROXY (GET /instagram/dl)
async function downloadVideoToTmpFromProxy(srcUrl, filenameBase = "instagram") {
  const tmp = path.resolve("./tmp");
  if (!fs.existsSync(tmp)) fs.mkdirSync(tmp, { recursive: true });

  const base = safeFileName(filenameBase);
  const fname = `${base}.mp4`;

  const dlUrl =
    `${API_BASE}/instagram/dl` +
    `?type=video` +
    `&src=${encodeURIComponent(srcUrl)}` +
    `&filename=${encodeURIComponent(fname)}` +
    `&download=1`;

  const res = await axios.get(dlUrl, {
    responseType: "stream",
    timeout: 180000,
    headers: {
      apikey: SKY_API_KEY,
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124.0.0.0 Safari/537.36",
      Accept: "*/*",
    },
    maxRedirects: 5,
    validateStatus: (s) => s < 400,
  });

  const filePath = path.join(tmp, `ig-${Date.now()}.mp4`);

  await new Promise((resolve, reject) => {
    const w = fs.createWriteStream(filePath);
    res.data.pipe(w);
    w.on("finish", resolve);
    w.on("error", reject);
  });

  return filePath;
}

// 3. HANDLER PRINCIPAL
module.exports = async (msg, { conn, args, command }) => {
  const chatId = msg.key.remoteJid;
  const pref = global.prefixes?.[0] || ".";
  let text = (args.join(" ") || "").trim();

  if (!text) {
    return conn.sendMessage(
      chatId,
      {
        text:
`✳️ Usa:
${pref}${command} <enlace IG>
Ej: ${pref}${command} https://www.instagram.com/reel/XXXX/`,
      },
      { quoted: msg }
    );
  }

  text = normalizeIGUrl(text);

  if (!isUrl(text) || !isIG(text)) {
    return conn.sendMessage(
      chatId,
      { text: `❌ Enlace inválido.\nUsa: ${pref}${command} <url de Instagram>` },
      { quoted: msg }
    );
  }

  try {
    await react(conn, chatId, msg.key, "⏳");

    // A) Consultar API
    const result = await callSkyInstagram(text);
    const items = extractItems(result);
    const videoUrl = pickFirstVideo(items);

    if (!videoUrl) {
      await react(conn, chatId, msg.key, "❌");
      return conn.sendMessage(chatId, { text: "🚫 Ese enlace no tiene un video descargable." }, { quoted: msg });
    }

    // Datos extra
    const title = result?.title || "Instagram Video";
    const thumb = result?.thumbnail || result?.image || ""; // Banner

    // B) Mensaje de Opciones
    const caption =
`⚡ 𝗜𝗻𝘀𝘁𝗮𝗴𝗿𝗮𝗺 — 𝗢𝗽𝗰𝗶𝗼𝗻𝗲𝘀

Elige cómo enviarlo:
👍 𝗩𝗶𝗱𝗲𝗼 (normal)
❤️ 𝗩𝗶𝗱𝗲𝗼 𝗰𝗼𝗺𝗼 𝗱𝗼𝗰𝘂𝗺𝗲𝗻𝘁𝗼
— o responde: 1 = normal · 2 = documento

🤖 𝗕𝗼𝘁: ℂ𝕠𝕣𝕥𝕒𝕟𝕒 𝔹𝕠𝕥 𝟚.𝟘
🔗 𝗔𝗣𝗜: https://api-sky.ultraplus.click`;

    let preview;
    if (thumb && isUrl(thumb)) {
        preview = await conn.sendMessage(chatId, { image: { url: thumb }, caption }, { quoted: msg });
    } else {
        preview = await conn.sendMessage(chatId, { text: caption }, { quoted: msg });
    }

    // C) Guardar trabajo (10 min de vida)
    pendingIG[preview.key.id] = {
      chatId,
      url: videoUrl,
      title, // Guardamos título para el archivo
      quotedBase: msg,
      previewKey: preview.key,
      isBusy: false,
    };

    // Auto-limpieza
    setTimeout(() => {
        if (pendingIG[preview.key.id]) delete pendingIG[preview.key.id];
    }, 10 * 60 * 1000);

    await react(conn, chatId, msg.key, "✅");

    // D) Listener
    if (!conn._igListener) {
      conn._igListener = true;

      conn.ev.on("messages.upsert", async (ev) => {
        for (const m of ev.messages) {
          try {
            // Reacciones
            if (m.message?.reactionMessage) {
              const { key: reactKey, text: emoji } = m.message.reactionMessage;
              const job = pendingIG[reactKey.id];
              
              if (!job || job.chatId !== m.key.remoteJid) continue;
              if (emoji !== "👍" && emoji !== "❤️") continue;

              if (job.isBusy) continue;
              const asDoc = emoji === "❤️";
              await processSend(conn, job, asDoc, m);
              continue;
            }

            // Respuestas texto
            const ctx = m.message?.extendedTextMessage?.contextInfo;
            const replyTo = ctx?.stanzaId;
            if (replyTo && pendingIG[replyTo]) {
              const job = pendingIG[replyTo];
              if (job.chatId !== m.key.remoteJid) continue;

              const body = (m.message?.conversation || m.message?.extendedTextMessage?.text || "").trim();
              if (body !== "1" && body !== "2") continue;

              if (job.isBusy) continue;
              const asDoc = body === "2";
              await processSend(conn, job, asDoc, m);
            }
          } catch (e) {
            console.error("IG listener error:", e);
          }
        }
      });
    }
  } catch (err) {
    const s = String(err?.message || "");
    console.error("❌ IG error:", s);
    await conn.sendMessage(chatId, { text: `❌ Error: ${s}` }, { quoted: msg });
    await react(conn, chatId, msg.key, "❌");
  }
};

// 4. FUNCIÓN DE ENVÍO
async function processSend(conn, job, asDocument, triggerMsg) {
  job.isBusy = true;
  const { chatId, url, previewKey, quotedBase } = job;
  const title = job.title || "instagram";

  try {
    // Feedback visual
    await react(conn, chatId, triggerMsg.key, asDocument ? "📁" : "🎬");
    // Mensaje de espera (LO QUE PEDISTE)
    await conn.sendMessage(chatId, { text: "⏳ Espere, descargando su video..." }, { quoted: quotedBase });

    // Descarga
    const filePath = await downloadVideoToTmpFromProxy(url, title);
    const sizeMB = mb(fs.statSync(filePath).size);

    if (sizeMB > MAX_MB) {
      try { fs.unlinkSync(filePath); } catch {}
      return conn.sendMessage(chatId, { text: `❌ Video muy pesado (${sizeMB.toFixed(2)} MB). Límite ${MAX_MB} MB.` }, { quoted: quotedBase });
    }

    const buf = fs.readFileSync(filePath);

    // Caption Final
    const finalCaption = 
`✅ 𝗜𝗻𝘀𝘁𝗮𝗴𝗿𝗮𝗺 𝗩𝗶𝗱𝗲𝗼

🤖 𝗕𝗼𝘁: Cᴏʀᴛᴀɴᴀ Bᴏᴛ 2.0
🔗 𝗔𝗣𝗜: https://api-sky.ultraplus.click`;

    await conn.sendMessage(
      chatId,
      {
        [asDocument ? "document" : "video"]: buf,
        mimetype: "video/mp4",
        fileName: `${safeFileName(title)}.mp4`,
        caption: asDocument ? finalCaption : finalCaption,
      },
      { quoted: quotedBase }
    );

    try { fs.unlinkSync(filePath); } catch {}
    await react(conn, chatId, triggerMsg.key, "✅");

  } catch (e) {
    await react(conn, chatId, triggerMsg.key, "❌");
    await conn.sendMessage(chatId, { text: `❌ Error enviando: ${e?.message || "unknown"}` }, { quoted: quotedBase });
  } finally {
    job.isBusy = false; // Liberar para otra descarga
  }
}

module.exports.command = ["instagram", "ig"];
module.exports.help = ["instagram <url>", "ig <url>"];
module.exports.tags = ["descargas"];
module.exports.register = true;
                           
