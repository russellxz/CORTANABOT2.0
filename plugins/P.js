const os = require("os");

const handler = async (msg, { conn }) => {
  const chatId = msg.key.remoteJid;
  const start = performance.now();

  await conn.sendMessage(chatId, {
    react: { text: '📡', key: msg.key }
  });

  const temp = await conn.sendMessage(chatId, { text: '🏓 Calculando ping...' }, { quoted: msg });

  const latency = (performance.now() - start).toFixed(2); // en milisegundos con decimales
  const memoryUsage = process.memoryUsage();
  const totalMemGB = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
  const usedMemMB = (memoryUsage.rss / 1024 / 1024).toFixed(0);
  const uptimeSec = process.uptime().toFixed(2); // segundos con milisegundos

  const info = `*📍 LATENCIA DEL BOT*\n\n` +
    `🏓 *Velocidad:* ${latency} ms\n` +
    `📦 *RAM usada:* ${usedMemMB} MB / ${totalMemGB} GB\n` +
    `📡 *Estado del bot:* En línea ✅\n` +
    `🧠 *CPU:* ${os.cpus()[0].model}\n\n` +
    `⏱️ *Uptime:* ${uptimeSec} segundos`;

  await conn.sendMessage(chatId, {
    edit: temp.key,
    text: info
  });
};

handler.command = ['p'];
module.exports = handler;
