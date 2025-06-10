const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const exec = promisify(require('child_process').exec);

const handler = async (msg, { conn }) => {
    try {
        // Verificar si se está respondiendo a un mensaje con contenido multimedia
        const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        
        if (!quoted) {
            return await conn.sendMessage(msg.key.remoteJid, { 
                text: "⚠️ *Responde a un video o audio con el comando* `.toaudio` *para convertirlo a MP3.*" 
            }, { quoted: msg });
        }

        // Determinar el tipo de medio (video o audio)
        const mediaType = quoted.videoMessage ? "video" : quoted.audioMessage ? "audio" : null;
        
        if (!mediaType) {
            return await conn.sendMessage(msg.key.remoteJid, { 
                text: "⚠️ *Solo puedes convertir videos o audios a MP3.*" 
            }, { quoted: msg });
        }

        // Reacción de proceso
        await conn.sendMessage(msg.key.remoteJid, { 
            react: { text: "🛠️", key: msg.key } 
        });

        // Descargar el contenido multimedia
        const mediaStream = await downloadContentFromMessage(quoted[`${mediaType}Message`], mediaType);
        let buffer = Buffer.alloc(0);
        
        for await (const chunk of mediaStream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        if (buffer.length === 0) {
            throw new Error("No se pudo descargar el archivo multimedia");
        }

        // Crear directorio temporal si no existe
        const tmpDir = path.join(__dirname, '../tmp');
        if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);
        
        // Rutas de archivos temporales
        const inputPath = path.join(tmpDir, `${Date.now()}_input.mp4`);
        const outputPath = path.join(tmpDir, `${Date.now()}_output.mp3`);

        // Guardar archivo temporal de entrada
        fs.writeFileSync(inputPath, buffer);

        // Convertir a MP3 usando FFmpeg
        try {
            await exec(`ffmpeg -i "${inputPath}" -vn -ar 44100 -ac 2 -b:a 192k "${outputPath}"`);
            
            // Verificar si la conversión fue exitosa
            if (!fs.existsSync(outputPath)) {
                throw new Error("La conversión a MP3 falló");
            }

            // Leer el archivo MP3 resultante
            const audioBuffer = fs.readFileSync(outputPath);

            // Enviar el audio convertido
            await conn.sendMessage(msg.key.remoteJid, {
                audio: audioBuffer,
                mimetype: 'audio/mpeg',
                fileName: 'audio-convertido.mp3'
            }, { quoted: msg });

            // Reacción de éxito
            await conn.sendMessage(msg.key.remoteJid, { 
                react: { text: "✅", key: msg.key } 
            });

        } catch (convertError) {
            console.error("Error en conversión:", convertError);
            throw new Error("Error al convertir el archivo a MP3");
        } finally {
            // Eliminar archivos temporales (si existen)
            try {
                if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
                if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
            } catch (cleanError) {
                console.error("Error limpiando archivos temporales:", cleanError);
            }
        }

    } catch (error) {
        console.error("Error en el comando toaudio:", error);
        await conn.sendMessage(msg.key.remoteJid, { 
            text: "❌ *Hubo un error al convertir el contenido a MP3. Asegúrate que es un video o audio válido.*" 
        }, { quoted: msg });
    }
};

handler.command = ['toaudio', 'tomp3'];
handler.tags = ['tools'];
handler.help = [
    'toaudio <responder a video/audio> - Convierte a formato MP3',
    'tomp3 <responder a video/audio> - Convierte a formato MP3'
];

module.exports = handler;
