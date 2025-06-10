const handler = async (msg, { conn }) => {
  const ownerNumber = "15167096032@s.whatsapp.net"; // Número del creador
  const ownerName = "Russell xz 🤖"; // Nombre visible del creador

  const messageText = `📞 *Contacto del Creador del Subbot:*

Si tienes dudas, preguntas o sugerencias sobre el funcionamiento de *Azura Ultra Subbot*, puedes contactar a su creador.

📌 *Nombre:* Russell
📌 *Número:* +1 (516) 709-6032
💬 *Toca el contacto para enviarle un mensaje directo.`;

  // Enviar contacto vCard
  await conn.sendMessage(msg.key.remoteJid, {
    contacts: {
      displayName: ownerName,
      contacts: [
        {
          vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${ownerName}\nTEL;waid=${ownerNumber.split('@')[0]}:+${ownerNumber.split('@')[0]}\nEND:VCARD`
        }
      ]
    }
  });

  // Enviar texto informativo
  await conn.sendMessage(msg.key.remoteJid, {
    text: messageText
  }, { quoted: msg });
};

handler.command = ['creador'];
module.exports = handler;
