function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const handler = async (msg, { conn }) => {
  try {
    const { proto } = await import("@whiskeysockets/baileys");

    const chatId = msg.key.remoteJid;
    const isGroup = chatId.endsWith("@g.us");
    const start = Date.now();

    const sent = await conn.sendMessage(
      chatId,
      { text: "🏓 Pong..." },
      { quoted: msg }
    );

    const ping = Date.now() - start;
    const resultText = `🏓 Pong\n\n✅ Ping: ${ping} ms`;

    if (isGroup) {
      await sleep(100);
      try {
        await conn.relayMessage(
          chatId,
          {
            protocolMessage: {
              key: sent.key,
              type: 14,
              editedMessage: proto.Message.fromObject({
                conversation: resultText
              })
            }
          },
          { messageId: sent.key.id }
        );
      } catch {
        await conn.sendMessage(chatId, { text: resultText }, { quoted: msg });
      }
    } else {
      await conn.sendMessage(chatId, { text: resultText }, { quoted: msg });
    }
  } catch {
    await conn.sendMessage(
      msg.key.remoteJid,
      { text: "Error calculando el ping." },
      { quoted: msg }
    );
  }
};

handler.command = ["ping"];
module.exports = handler;
