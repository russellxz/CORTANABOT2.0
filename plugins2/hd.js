const fs = require('fs');
const path = require('path');
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const FormData = require('form-data');
const axios = require('axios');

const remini = async (imageBuffer, operation = "enhance") => {
    const validOperations = ["enhance", "recolor", "dehaze"];
    operation = validOperations.includes(operation) ? operation : "enhance";
    
    const form = new FormData();
    form.append('image', imageBuffer, {
        filename: 'image_to_enhance.jpg',
        contentType: 'image/jpeg'
    });
    form.append('model_version', '1');

    try {
        const { data } = await axios({
            method: 'post',
            url: `https://inferenceengine.vyro.ai/${operation}.vyro`,
            data: form,
            headers: {
                ...form.getHeaders(),
                'User-Agent': 'okhttp/4.9.3',
                'Accept-Encoding': 'gzip'
            },
            responseType: 'arraybuffer',
            timeout: 30000
        });

        return data;
    } catch (error) {
        console.error('Error en API remini:', error.message);
        throw new Error('No se pudo procesar la imagen. Inténtalo de nuevo más tarde.');
    }
};

const handler = async (msg, { conn }) => {
    try {
        // Verificar mensaje citado
        const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        if (!quoted) {
            return await conn.sendMessage(msg.key.remoteJid, {
                text: "🚫 *Debes responder a una imagen con el comando* `.hd`"
            }, { quoted: msg });
        }

        // Verificar tipo de archivo
        const mime = quoted.imageMessage?.mimetype || "";
        if (!/image\/(jpe?g|png)/.test(mime)) {
            return await conn.sendMessage(msg.key.remoteJid, {
                text: "⚠️ *Formato no soportado. Solo se permiten imágenes JPG/PNG*"
            }, { quoted: msg });
        }

        // Reacción de procesamiento
        await conn.sendMessage(msg.key.remoteJid, {
            react: { text: "🔄", key: msg.key }
        });

        // Descargar imagen
        const mediaStream = await downloadContentFromMessage(quoted.imageMessage, "image");
        let buffer = Buffer.alloc(0);
        
        for await (const chunk of mediaStream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        if (buffer.length === 0) {
            throw new Error("La imagen está vacía o no se pudo descargar");
        }

        // Crear directorio temporal si no existe
        const tmpDir = path.join(__dirname, '../tmp');
        if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

        // Procesar imagen
        const startTime = Date.now();
        const enhancedImage = await remini(buffer);
        console.log(`Procesamiento completado en ${(Date.now() - startTime)/1000} segundos`);

        // Enviar resultado
        await conn.sendMessage(msg.key.remoteJid, {
            image: enhancedImage,
            caption: "🖼️ *Imagen mejorada con tecnología HD*\n\n💡 *Sugerencia:* Para mejores resultados use fotos con buena iluminación\n\n🤖 *Azura Ultra 2.0*"
        }, { quoted: msg });

        // Reacción de éxito
        await conn.sendMessage(msg.key.remoteJid, {
            react: { text: "✅", key: msg.key }
        });

    } catch (error) {
        console.error("Error en comando hd:", error);
        
        let errorMessage = "❌ *Error al procesar la imagen*";
        if (error.message.includes("timeout")) {
            errorMessage = "⌛ *El servidor tardó demasiado en responder. Intenta con una imagen más pequeña*";
        }

        await conn.sendMessage(msg.key.remoteJid, {
            text: errorMessage
        }, { quoted: msg });

        await conn.sendMessage(msg.key.remoteJid, {
            react: { text: "❌", key: msg.key }
        });
    }
};

// Configuración del plugin
handler.command = ['hd', 'enhance', 'remini'];
handler.tags = ['tools'];
handler.help = [
    'hd <responde a imagen> - Mejora la calidad de la imagen',
    'enhance <responde a imagen> - Alternativa para mejorar imágenes',
    'remini <responde a imagen> - Usa IA para mejorar fotos'
];

module.exports = handler;
