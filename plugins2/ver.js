// plugins/ver.js
const fs = require("fs");
const path = require("path");
const { downloadContentFromMessage } = require("@adiwajshing/baileys");

module.exports = async (msg, { conn }) => {
  try {
    // Obtener mensaje citado
    const context = msg.message?.extendedTextMessage?.contextInfo;
    const stanzaId = context?.stanzaId;
    const quotedMsg = context?.quotedMessage;
    if (!stanzaId || !quotedMsg) {
      return conn.sendMessage(
        msg.key.remoteJid,
        { text: "❌ *Error:* Debes responder a una imagen, vídeo o nota de voz para reenviarla." },
        { quoted: msg }
      );
    }

    // Desempaquetar viewOnce / ephemeral
    const unwrap = (node) => {
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
          node.ephemeralMessage?.message ||
          node;
      }
      return node;
    };
    const inner = unwrap(quotedMsg);

    // Detectar tipo de medio
    let mediaType, mediaNode;
    if (inner.imageMessage) {
      mediaType = "image";
      mediaNode = inner.imageMessage;
    } else if (inner.videoMessage) {
      mediaType = "video";
      mediaNode = inner.videoMessage;
    } else if (inner.audioMessage || inner.voiceMessage || inner.pttMessage) {
      mediaType = "audio";
      mediaNode = inner.audioMessage || inner.voiceMessage || inner.pttMessage;
    } else {
      return conn.sendMessage(
        msg.key.remoteJid,
        { text: "❌ *Error:* El mensaje citado no contiene un archivo compatible." },
        { quoted: msg }
      );
    }

    // Mostrar reacción de carga
    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: "⏳", key: msg.key }
    });

    // Descargar contenido
    const tmpDir = path.join(__dirname, "../tmp");
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

    const stream = await downloadContentFromMessage(mediaNode, mediaType);
    let buffer = Buffer.alloc(0);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    if (!buffer.length) {
      return conn.sendMessage(
        msg.key.remoteJid,
        { text: "❌ *Error:* No se pudo descargar el archivo. Intenta de nuevo." },
        { quoted: msg }
      );
    }

    // Prepara opciones de envío
    const creditText = "> 🔓 Recuperado por:\n`CORTANA 2.0 BOT`";
    const opts = { mimetype: mediaNode.mimetype };
    if (mediaType === "image") {
      opts.image = buffer;
      opts.caption = creditText;
    } else if (mediaType === "video") {
      opts.video = buffer;
      opts.caption = creditText;
    } else {
      opts.audio = buffer;
      opts.ptt = mediaNode.ptt ?? true;
      if (mediaNode.seconds) opts.seconds = mediaNode.seconds;
    }

    // Enviar medio
    await conn.sendMessage(msg.key.remoteJid, opts, { quoted: msg });

    // Si es audio, enviar crédito aparte para que no se convierta en PTT
    if (mediaType === "audio") {
      await conn.sendMessage(
        msg.key.remoteJid,
        { text: creditText },
        { quoted: msg }
      );
    }

    // Confirmación final
    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: "✅", key: msg.key }
    });

  } catch (err) {
    console.error("❌ Error en comando ver:", err);
    await conn.sendMessage(
      msg.key.remoteJid,
      { text: "❌ *Error:* Hubo un problema al procesar el archivo." },
      { quoted: msg }
    );
  }
};

module.exports.command = ["ver"];
