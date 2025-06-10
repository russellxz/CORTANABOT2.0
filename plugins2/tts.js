const SpeakEngine = require("google-tts-api");

const handler = async (msg, { conn, text, usedPrefix }) => {
  try {
    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: "🗣️", key: msg.key }
    });

    let textToSay = (text || "").trim();

    if (!textToSay && msg.message?.extendedTextMessage?.contextInfo?.quotedMessage?.conversation) {
      textToSay = msg.message.extendedTextMessage.contextInfo.quotedMessage.conversation.trim();
    }

    if (!textToSay) {
      return await conn.sendMessage(msg.key.remoteJid, {
        text: `✳️ *Uso correcto del comando:*\n\n📌 Ejemplo: *${usedPrefix}tts Hola mi amor* o responde a un mensaje con *${usedPrefix}tts*`
      }, { quoted: msg });
    }

    await conn.sendPresenceUpdate('recording', msg.key.remoteJid);

    const ttsUrl = SpeakEngine.getAudioUrl(textToSay, {
      lang: "es",
      slow: false,
      host: "https://translate.google.com"
    });

    await conn.sendMessage(msg.key.remoteJid, {
      audio: { url: ttsUrl },
      ptt: true,
      mimetype: 'audio/mpeg',
      fileName: `tts.mp3`
    }, { quoted: msg });

    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: "✅", key: msg.key }
    });

  } catch (err) {
    console.error("❌ Error en el comando tts:", err);
    await conn.sendMessage(msg.key.remoteJid, {
      text: "❌ Ocurrió un error al procesar el texto a voz. Intenta más tarde."
    }, { quoted: msg });

    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: "❌", key: msg.key }
    });
  }
};

handler.command = ['tts'];
module.exports = handler;
