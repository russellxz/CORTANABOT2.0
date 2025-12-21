
// comandos/ytmp3.js — YouTube MP3 (URL)
// ✅ Reacciones: 👍 (Audio) / ❤️ (Documento) o Respuestas 1 / 2
// ✅ Mensaje de espera: "Descargando su canción..."
// ✅ Branding: 𝑪𝒐𝒓𝒕𝒂𝒏𝒂 𝑩𝒐𝒕 2.0 + Link API

"use strict";

const axios = require("axios");

// ==== CONFIG API ====
const API_BASE = (process.env.API_BASE || "https://api-sky.ultraplus.click").replace(/\/+$/, "");
const API_KEY  = process.env.API_KEY  || "Russellxz";

// Jobs pendientes por id del mensaje de opciones
const pendingYTA = Object.create(null);

const isYouTube = (u = "") =>
  /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|music\.youtube\.com)\//i.test(String(u || ""));

// Helper para limpiar nombre de archivo
function safeBaseFromTitle(title) {
  return String(title || "youtube").slice(0, 70).replace(/[^A-Za-z0-9_\-.]+/g, "_");
}

async function getYTFromSkyAudio(url) {
  const endpoint = `${API_BASE}/youtube-mp3`;

  const r = await axios.post(
    endpoint,
    { url },
    {
      timeout: 120000,
      headers: {
        "Content-Type": "application/json",
        apikey: API_KEY,
        Accept: "application/json, */*",
      },
      validateStatus: () => true,
    }
  );

  const data = typeof r.data === "object" ? r.data : null;
  if (!data) throw new Error("Respuesta no JSON del servidor");

  const ok =
    data.status === true ||
    data.status === "true" ||
    data.ok === true ||
    data.success === true;

  if (!ok) throw new Error(data.message || data.error || "Error en la API");

  const result = data.result || data.data || data;
  const audioSrc = result?.media?.audio;

  if (!audioSrc) throw new Error("No se pudo obtener audio (sin URL).");

  return {
    title: result?.title || "YouTube Audio",
    thumbnail: result?.thumbnail || result?.image || "", // Capturamos el banner
    audio: audioSrc, 
  };
}

module.exports = async (msg, { conn, args, command }) => {
  const chatId = msg.key.remoteJid;
  const pref = global.prefixes?.[0] || ".";
  let text = (args.join(" ") || "").trim();

  if (!text) {
    return conn.sendMessage(
      chatId,
      { text: `✳️ Usa:\n${pref}${command} <URL YouTube>\nEj: ${pref}${command} https://youtu.be/dQw4w9WgXcQ` },
      { quoted: msg }
    );
  }

  if (!isYouTube(text)) {
    return conn.sendMessage(
      chatId,
      { text: `❌ Enlace inválido. Usa URL de YouTube.` },
      { quoted: msg }
    );
  }

  try {
    await conn.sendMessage(chatId, { react: { text: "⏱️", key: msg.key } });

    // 1. Obtener info de la API
    const d = await getYTFromSkyAudio(text);
    const title = d.title || "YouTube";
    const thumb = d.thumbnail;

    // 2. Construir mensaje CON "LA SUKI BOT"
    const caption =
`⚡ 𝗬𝗼𝘂𝗧𝘂𝗯𝗲 𝗠𝗣𝟯 — 𝗢𝗽𝗰𝗶𝗼𝗻𝗲𝘀

🎵 𝗧𝗶́𝘁𝘂𝗹𝗼: ${title}

Elige cómo enviarlo:
👍 𝗔𝘂𝗱𝗶𝗼 (normal)
❤️ 𝗔𝘂𝗱𝗶𝗼 𝗰𝗼𝗺𝗼 𝗱𝗼𝗰𝘂𝗺𝗲𝗻𝘁𝗼
— o responde: 1 = audio · 2 = documento

🤖 𝗕𝗼𝘁: 𝐂𝐎𝐑𝐓𝐀𝐍𝐀 𝟐.𝟎 𝐁𝐎𝐓
🔗 𝗔𝗣𝗜: https://api-sky.ultraplus.click`;

    let preview;
    
    // Si hay imagen, mandamos imagen con caption. Si no, solo texto.
    if (thumb && thumb.startsWith("http")) {
        preview = await conn.sendMessage(chatId, { 
            image: { url: thumb }, 
            caption: caption 
        }, { quoted: msg });
    } else {
        preview = await conn.sendMessage(chatId, { text: caption }, { quoted: msg });
    }

    // 3. Guardar trabajo en memoria
    pendingYTA[preview.key.id] = {
      chatId,
      audioSrc: d.audio,
      title,
      quotedBase: msg,
      previewKey: preview.key,
      processing: false,
    };

    // 4. Auto-limpieza a los 10 minutos
    setTimeout(() => {
        if (pendingYTA[preview.key.id]) {
            delete pendingYTA[preview.key.id];
        }
    }, 10 * 60 * 1000);

    await conn.sendMessage(chatId, { react: { text: "✅", key: msg.key } });

    // 5. Iniciar Listener Global (si no existe)
    if (!conn._ytaListener) {
      conn._ytaListener = true;

      conn.ev.on("messages.upsert", async (ev) => {
        for (const m of ev.messages) {
          try {
            // --- A) Reacciones (👍 / ❤️) ---
            if (m.message?.reactionMessage) {
              const { key: reactKey, text: emoji } = m.message.reactionMessage;
              const job = pendingYTA[reactKey.id];
              
              if (!job) continue;
              if (job.chatId !== m.key.remoteJid) continue;
              if (emoji !== "👍" && emoji !== "❤️") continue;

              if (job.processing) continue; 
              job.processing = true;

              const asDoc = emoji === "❤️";
              await sendMp3(conn, job, asDoc, m);
              continue;
            }

            // --- B) Respuestas texto (1 / 2) ---
            const ctx = m.message?.extendedTextMessage?.contextInfo;
            const replyTo = ctx?.stanzaId;

            if (replyTo && pendingYTA[replyTo]) {
              const job = pendingYTA[replyTo];
              if (job.chatId !== m.key.remoteJid) continue;

              const body = (m.message?.conversation || m.message?.extendedTextMessage?.text || "").trim();
              if (body !== "1" && body !== "2") continue;

              if (job.processing) continue;
              job.processing = true;

              const asDoc = body === "2";
              await sendMp3(conn, job, asDoc, m);
            }
          } catch (e) {
            console.error("YTMP3 listener error:", e);
          }
        }
      });
    }
  } catch (err) {
    console.error("❌ Error en ytmp3:", err?.message || err);
    await conn.sendMessage(
      chatId,
      { text: `❌ *Error:* ${err?.message || "Fallo al procesar el audio."}` },
      { quoted: msg }
    );
    await conn.sendMessage(chatId, { react: { text: "❌", key: msg.key } });
  }
};

async function sendMp3(conn, job, asDocument, triggerMsg) {
  const { chatId, audioSrc, title, quotedBase } = job;

  try {
      await conn.sendMessage(chatId, { react: { text: asDocument ? "📁" : "🎵", key: triggerMsg.key } });
      
      // ✅ MENSAJE DE ESPERA AGREGADO AQUÍ
      await conn.sendMessage(chatId, { 
          text: "⏳ Espere, descargando su canción..." 
      }, { quoted: quotedBase });

      // Caption final para el documento
      const finalCaption = 
`🎵 𝗧𝗶́𝘁𝘂𝗹𝗼: ${title}

🤖 𝗕𝗼𝘁: 𝑪𝒐𝒓𝒕𝒂𝒏𝒂 𝑩𝒐𝒕 2.0
🔗 𝗔𝗣𝗜 𝘂𝘀𝗮𝗱𝗮: https://api-sky.ultraplus.click`;

      await conn.sendMessage(
        chatId,
        {
          [asDocument ? "document" : "audio"]: { url: audioSrc },
          mimetype: "audio/mpeg",
          fileName: asDocument ? `${safeBaseFromTitle(title)}.mp3` : undefined,
          ptt: false,
          caption: asDocument ? finalCaption : undefined // Caption solo funciona bien en documentos
        },
        { quoted: quotedBase }
      );

      await conn.sendMessage(chatId, { react: { text: "✅", key: triggerMsg.key } });

  } catch (e) {
      console.error("Error enviando MP3", e);
      await conn.sendMessage(chatId, { text: "❌ Error enviando el archivo." }, { quoted: quotedBase });
  } finally {
      job.processing = false; 
  }
}

module.exports.command = ["ytmp3", "yta"];
module.exports.help = ["ytmp3 <url>", "yta <url>"];
module.exports.tags = ["descargas"];
module.exports.register = true;
