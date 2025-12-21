// comandos/tt.js — TikTok con opciones (👍 video / ❤️ documento o 1 / 2)
// ✅ Multiuso: Puedes descargar varias veces sin reenviar el comando
// ✅ Persistencia: 10 minutos
// ✅ Branding: Cᴏʀᴛᴀɴᴀ Bᴏᴛ 2.0 + API Link

const axios = require("axios");

const API_BASE = (process.env.API_BASE || "https://api-sky.ultraplus.click").replace(/\/+$/, "");
const API_KEY  = process.env.API_KEY  || "Russellxz";
const MAX_TIMEOUT = 60000; // 60s timeout

const fmtSec = (s) => {
  const n = Number(s || 0);
  const h = Math.floor(n / 3600);
  const m = Math.floor((n % 3600) / 60);
  const sec = n % 60;
  return (h ? `${h}:` : "") + `${m.toString().padStart(2,"0")}:${sec.toString().padStart(2,"0")}`;
};

// Jobs pendientes
const pendingTT = Object.create(null);

async function getTikTokFromSky(url){
  // Endpoint: POST /tiktok
  const { data: res, status: http } = await axios.post(
    `${API_BASE}/tiktok`,
    { url },
    {
      headers: {
        apikey: API_KEY,
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      timeout: MAX_TIMEOUT,
      validateStatus: s => s >= 200 && s < 600
    }
  );

  if (http !== 200) {
    throw new Error(`HTTP ${http}${res?.message ? ` - ${res.message}` : ""}`);
  }

  if (!res || res.status !== true || !res.result?.media?.video) {
    throw new Error(res?.message || "La API no devolvió un video válido.");
  }

  const r = res.result;
  return {
    title: r.title || "TikTok",
    author: r.author || {},
    duration: r.duration || 0,
    likes: r.stats?.likes ?? 0,
    comments: r.stats?.comments ?? 0,
    video: r.media.video,
    audio: r.media.audio || null,
    cover: r.media.cover || null,
  };
}

const handler = async (msg, { conn, args, command }) => {
  const chatId = msg.key.remoteJid;
  const text   = (args || []).join(" ");
  const pref   = (global.prefixes && global.prefixes[0]) || ".";

  if (!text) {
    return conn.sendMessage(chatId, {
      text:
`✳️ 𝙐𝙨𝙖:
${pref}${command} <enlace>
Ej: ${pref}${command} https://vm.tiktok.com/xxxxxx/`
    }, { quoted: msg });
  }

  const url = args[0];
  if (!/^https?:\/\//i.test(url) || !/tiktok\.com|vt\.tiktok\.com|vm\.tiktok\.com/i.test(url)) {
    return conn.sendMessage(chatId, { text: "❌ 𝙀𝙣𝙡𝙖𝙘𝙚 𝙙𝙚 𝙏𝙞𝙠𝙏𝙤𝙠 𝙞𝙣𝙫𝙖́𝙡𝙞𝙙𝙤." }, { quoted: msg });
  }

  try {
    await conn.sendMessage(chatId, { react: { text: "⏱️", key: msg.key } });

    // 1) Llama a tu API
    const d = await getTikTokFromSky(url);

    const title   = d.title || "TikTok";
    const author  = (d.author && (d.author.name || d.author.username)) || "—";
    const durTxt  = d.duration ? fmtSec(d.duration) : "—";
    const likes   = d.likes ?? 0;
    const comments= d.comments ?? 0;

    // 2) Mensaje de opciones
    const txt =
`⚡ 𝗧𝗶𝗸𝗧𝗼𝗸 — 𝗢𝗽𝗰𝗶𝗼𝗻𝗲𝘀

Elige cómo enviarlo:
👍 𝗩𝗶𝗱𝗲𝗼 (normal)
❤️ 𝗩𝗶𝗱𝗲𝗼 𝗰𝗼𝗺𝗼 𝗱𝗼𝗰𝘂𝗺𝗲𝗻𝘁𝗼
— 𝗼 responde: 1 = video · 2 = documento

✦ 𝗧𝗶́𝘁𝘂𝗹𝗼: ${title}
✦ 𝗔𝘂𝘁𝗼𝗿: ${author}
✦ 𝗗𝘂𝗿.: ${durTxt} • 👍 ${likes} · 💬 ${comments}

🤖 𝗕𝗼𝘁: ℂ𝕠𝕣𝕥𝕒𝕟𝕒 𝔹𝕠𝕥 𝟚.𝟘
🔗 𝗔𝗣𝗜: ${API_BASE}`;

    const preview = await conn.sendMessage(chatId, { text: txt }, { quoted: msg });

    // Guardar trabajo
    pendingTT[preview.key.id] = {
      chatId,
      url: d.video,
      caption:
`⚡ 𝗧𝗶𝗸𝗧𝗼𝗸 — 𝗩𝗶𝗱𝗲𝗼

✦ 𝗧𝗶́𝘁𝘂𝗹𝗼: ${title}
✦ 𝗔𝘂𝘁𝗼𝗿: ${author}
✦ 𝗗𝘂𝗿𝗮𝗰𝗶𝗼́𝗻: ${durTxt}

🤖 𝗕𝗼𝘁: Cᴏʀᴛᴀɴᴀ Bᴏᴛ 2.0
🔗 𝗔𝗣𝗜: ${API_BASE}`,
      quotedBase: msg,
      isBusy: false
    };

    // Auto-borrado a los 10 minutos
    setTimeout(() => {
        if (pendingTT[preview.key.id]) delete pendingTT[preview.key.id];
    }, 10 * 60 * 1000);

    await conn.sendMessage(chatId, { react: { text: "✅", key: msg.key } });

    // 3) Listener único global
    if (!conn._ttListener) {
      conn._ttListener = true;

      conn.ev.on("messages.upsert", async ev => {
        for (const m of ev.messages) {
          try {
            // A) REACCIONES 👍 / ❤️
            if (m.message?.reactionMessage) {
              const { key: reactKey, text: emoji } = m.message.reactionMessage;
              const job = pendingTT[reactKey.id];
              
              if (!job) continue;
              if (job.chatId !== m.key.remoteJid) continue;
              if (emoji !== "👍" && emoji !== "❤️") continue;

              // Evitar doble clic rápido
              if (job.isBusy) continue;
              job.isBusy = true;

              const asDoc = emoji === "❤️";
              await processSend(conn, job, asDoc, m);
              continue;
            }

            // B) RESPUESTAS 1/2
            const ctx = m.message?.extendedTextMessage?.contextInfo;
            const replyTo = ctx?.stanzaId;

            if (replyTo && pendingTT[replyTo]) {
              const job = pendingTT[replyTo];
              if (job.chatId !== m.key.remoteJid) continue;

              const textLow = (m.message?.conversation || m.message?.extendedTextMessage?.text || "").trim().toLowerCase();
              if (textLow !== "1" && textLow !== "2") continue;

              // Evitar doble clic rápido
              if (job.isBusy) continue;
              job.isBusy = true;

              const asDoc = textLow === "2";
              await processSend(conn, job, asDoc, m);
            }
          } catch (e) {
            console.error("TT listener error:", e);
          }
        }
      });
    }

  } catch (err) {
    console.error("❌ Error en tt:", err?.message || err);
    await conn.sendMessage(chatId, {
      text: `❌ *Error:* ${err?.message || "Fallo al procesar el TikTok."}`
    }, { quoted: msg });
    await conn.sendMessage(chatId, { react: { text: "❌", key: msg.key } });
  }
};

// Función de envío con feedback
async function processSend(conn, job, asDocument, triggerMsg){
  const { chatId, url, caption, quotedBase } = job;

  try {
    // Reacción "cargando"
    await conn.sendMessage(chatId, { react: { text: asDocument ? "📁" : "🎬", key: triggerMsg.key } });
    
    // Mensaje de espera
    await conn.sendMessage(chatId, {
      text: `⏳ Espere, descargando video${asDocument ? " en documento" : ""}...`
    }, { quoted: quotedBase });

    // Enviar archivo
    if (asDocument) {
      await conn.sendMessage(chatId, {
        document: { url },
        mimetype: "video/mp4",
        fileName: `tiktok-${Date.now()}.mp4`,
        caption
      }, { quoted: quotedBase });
    } else {
      await conn.sendMessage(chatId, {
        video: { url },
        mimetype: "video/mp4",
        caption
      }, { quoted: quotedBase });
    }

    // Confirmación
    await conn.sendMessage(chatId, { react: { text: "✅", key: triggerMsg.key } });

  } catch (e) {
    console.error("TT send error:", e);
    await conn.sendMessage(chatId, { react: { text: "❌", key: triggerMsg.key } });
  } finally {
    // Liberamos el job para que pueda volver a usarse
    job.isBusy = false;
  }
}

handler.command = ["tiktok","tt"];
handler.help = ["tiktok <url>", "tt <url>"];
handler.tags = ["descargas"];
handler.register = true;

module.exports = handler;
