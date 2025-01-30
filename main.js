//Código desde cero y comentarios hecho por: 
// @gata_dios    
// @Skidy89  
// @elrebelde21         
                                   
//--------------------[ IMPORTACIONES ]-----------------------          
const baileys = require('@whiskeysockets/baileys'); // trabajar a través de descargas por Whatsapp 
const { WaMessageStubType, WA_DEFAULT_EPHEMERAL, BufferJSON, areJidsSameUser, downloadContentFromMessage, generateWAMessageContent, generateWAMessageFromContent, generateWAMessage, prepareWAMessageMedia, getContentType,  relayMessage} = require('@whiskeysockets/baileys'); // Importa los objetos 'makeWASocket' y 'proto' desde el módulo '@whiskeysockets/baileys'        
const { default: makeWASocket, proto } = require("@whiskeysockets/baileys")  
const moment = require('moment-timezone') // Trabajar con fechas y horas en diferentes zonas horarias
const gradient = require('gradient-string') // Aplicar gradientes de color al texto     
const { exec, spawn, execSync } =  require("child_process")// Función 'execSync' del módulo 'child_process' para ejecutar comandos en el sistema operativo 
const chalk = require('chalk') // Estilizar el texto en la consola  
const os = require('os') // Proporciona información del sistema operativo 
const fs = require('fs') // Trabajar con el sistema de archivos    
const fetch = require('node-fetch')
const axios = require('axios') 
const {fileURLToPath} = require('url') 
const cheerio = require('cheerio')
const yts = require('yt-search') 
const gpt = require('api-dylux')
const util = require('util')
const createHash = require('crypto') 
const mimetype = require("mime-types")  
const ws = require('ws')
const JavaScriptObfuscator = require('javascript-obfuscator')
const webp = require("node-webpmux")
const Jimp = require('jimp')
const { File } = require("megajs")
const speed = require("performance-now")
const ffmpeg = require("fluent-ffmpeg")
const similarity = require('similarity')   
const translate = require('@vitalets/google-translate-api') 
const { canLevelUp, xpRange } = require('./libs/levelling.js')
const { smsg, fetchBuffer, getBuffer, buffergif, getGroupAdmins, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, jsonformat, delay, format, logic, generateProfilePicture, parseMention, getRandom, msToTime, downloadMediaMessage, convertirMsADiasHorasMinutosSegundos, pickRandom, getUserBio, asyncgetUserProfilePic} = require('./libs/fuctions') 
const {jadibot, listJadibot, killJadibot} = require('./plugins/serbot.js')    
const {menu} = require('./plugins/menu.js') 
const {info} = require('./plugins/info.js')
const {reg, rpg} = require('./plugins/rpg.js') 
const {game, game2, game3} = require('./plugins/juegos.js')   
const {buscadores} = require('./plugins/buscadores.js')
const {efec, efect2, convertidores} = require('./plugins/convertidores.js')  
const {grupo} = require('./plugins/grupos.js')
const {nsfw} = require('./plugins/nsfw.js')  
const {randow, randow2} = require('./plugins/randow.js') 
const {descarga, descarga2} = require('./plugins/descargas.js')   
const {stickers} = require('./plugins/stickers.js') 
const {owner} = require('./plugins/propietario.js')  
const {enable} = require('./plugins/enable.js')
const path2 = './almacenMultimedia.json'; // Archivo para guardar los datos
//manejo de mensaje
// Ruta del archivo mute.json
const mutePath = './mute.json';

// Cargar muteList desde el archivo, o inicializarlo si no existe
let muteList = {};
try {
    if (fs.existsSync(mutePath)) {
        muteList = JSON.parse(fs.readFileSync(mutePath, 'utf-8'));
    }
} catch (error) {
    console.error("Error al cargar muteList:", error);
}

// Función para guardar muteList en el archivo
function saveMuteList() {
    try {
        fs.writeFileSync(mutePath, JSON.stringify(muteList, null, 2));
    } catch (error) {
        console.error("Error al guardar muteList:", error);
    }
}
//comando a stikerz
const { handleCommand } = require('./main'); // Ajusta la ruta según tu estructura

//comando a stikerz
// Asignar muteList y saveMuteList al objeto global correctamente
global.muteList = muteList;
global.saveMuteList = saveMuteList;
// Función comando
// sistema de mascota 
// Verifica si existe el archivo 'cartera.json', si no, crea uno vacío
const carteraFilePath = './cartera.json';
if (!fs.existsSync(carteraFilePath)) {
    fs.writeFileSync(carteraFilePath, JSON.stringify({}, null, 2));
}

// Carga los datos del archivo 'cartera.json'
let cartera = JSON.parse(fs.readFileSync(carteraFilePath));


// mascota 
// Inicializar la lista de stickers asociados
global.comandoList = [];
const comandoPath = './comando.json';

global.saveComandoList = () => {
    fs.writeFileSync(comandoPath, JSON.stringify(global.comandoList, null, 2));
};

// Cargar datos al iniciar
if (fs.existsSync(comandoPath)) {
    global.comandoList = JSON.parse(fs.readFileSync(comandoPath));
}

// Objeto fallo
const falloPath = './fallo.json';

// Verificar si el archivo fallo.json existe, si no, crearlo
if (!fs.existsSync(falloPath)) {
    fs.writeFileSync(falloPath, JSON.stringify({}));
}

// Cargar el contenido del archivo fallo.json
let falloData = JSON.parse(fs.readFileSync(falloPath));

//ok ok
let multimediaStore = {};
if (fs.existsSync(path2)) {
    multimediaStore = JSON.parse(fs.readFileSync(path2, 'utf-8'));
}
//modo owner
const path = "./cajafuertem.json";

if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify({}));
}
const cajasFuertes = JSON.parse(fs.readFileSync(path));
// Cargar el estado de modoOwner
// no tocar abajo
let tebaklagu = global.db.data.game.tebaklagu = []
let kuismath = global.db.data.game.math = []
let tekateki = global.db.data.game.tekateki = []

const msgs = (message) => {   
if (message.length >= 10) { 
return `${message.substr(0, 500)}` 
} else {  
return `${message}`}}
const getFileBuffer = async (mediakey, MediaType) => {  
const stream = await downloadContentFromMessage(mediakey, MediaType)  
let buffer = Buffer.from([])  
for await(const chunk of stream) {  
buffer = Buffer.concat([buffer, chunk]) }  
return buffer 
}   
  
module.exports = conn = async (conn, m, chatUpdate, mek, store) => {  
var body =  (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : '' 
 
//----------------------[ ATRIBUTOS ]-------------------------  
if (m.key.id.startsWith("BAE5")) return    
var budy = (typeof m.text == 'string' ? m.text : '')   
var prefix = /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : ""
//var prefix = body.match(/^[/.*#]/)   
const isCmd = body.startsWith(prefix) 
const command = isCmd ? body.slice(1).trim().split(/ +/).shift().toLocaleLowerCase() : null
const args = body.trim().split(/ +/).slice(1) 
const from = m.chat 
const msg = JSON.parse(JSON.stringify(m, undefined, 2)) 
const content = JSON.stringify(m.message) 
const type = m.mtype 
let t = m.messageTimestamp 
const pushname = m.pushName || "Sin nombre" 
const botnm = conn.user.id.split(":")[0] + "@s.whatsapp.net"  
const _isBot = conn.user.jid
m.isBot = m.id.startsWith('BAE5') && m.id.length === 16 || m.id.startsWith('3EB0') && m.id.length === 12 || m.id.startsWith('3EB0') && (m.id.length === 20 || m.id.length === 22) || m.id.startsWith('B24E') && m.id.length === 20;
if (m.isBot) return 

/**
 * Returns early if ID starts with 'NJX-' due to Baileys' different generateId system.
 * @param {Object} m - The object containing the ID to check.
 * @returns {void} - Returns early if ID starts with 'NJX-', otherwise continues with the function.
 */
if (m.id.startsWith('NJX-')) return;

const userSender = m.key.fromMe ? botnm : m.isGroup && m.key.participant.includes(":") ? m.key.participant.split(":")[0] + "@s.whatsapp.net" : m.key.remoteJid.includes(":") ? m.key.remoteJid.split(":")[0] + "@s.whatsapp.net" : m.key.fromMe ? botnm : m.isGroup ? m.key.participant : m.key.remoteJid  
const isCreator = [conn.decodeJid(conn.user.id), ...global.owner.map(([numero]) => numero)].map((v) => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
const isOwner = isCreator || m.fromMe;
const isMods = isOwner || global.mods.map((v) => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
m.isWABusiness = global.conn.authState?.creds?.platform === 'smba' || global.conn.authState?.creds?.platform === 'smbi'
//const isCreator = global.owner.map(([numero]) => numero.replace(/[^\d\s().+:]/g, '').replace(/\s/g, '') + '@s.whatsapp.net').includes(userSender) 
const itsMe = m.sender == conn.user.id ? true : false 
const text = args.join(" ") 
const q = args.join(" ") 
const quoted = m.quoted ? m.quoted : m 
const sender = m.key.fromMe ? botnm : m.isGroup ? m.key.participant : m.key.remoteJid 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const mime = (quoted.msg || quoted).mimetype || ''  
const isMedia = /image|video|sticker|audio/.test(mime)
const mentions = []  
if (m.message[type].contextInfo) {   
if (m.message[type].contextInfo.mentionedJid) {  
const msd = m.message[type].contextInfo.mentionedJid  
for (let i = 0; i < msd.length; i++) {  
mentions.push(msd[i])}}}
  
//----------------------[ FUNCION/GRUPO ]-------------------------
const groupMetadata = m.isGroup ? await conn.groupMetadata(from) : ''
const groupName = m.isGroup ? groupMetadata.subject : '' 
const participants = m.isGroup ? await groupMetadata.participants : '' 
const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : '' 
const isBotAdmins = m.isGroup ? groupAdmins.includes(botnm) : false  
const isGroupAdmins = m.isGroup ? groupAdmins.includes(userSender) : false 
const isBaneed = m.isGroup ? blockList.includes(userSender) : false 
const isPremium = m.isGroup ? premium.includes(userSender) : false   
const who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
const thumb = fs.readFileSync("./media/menu2.jpg")
const fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${userSender.split('@')[0]}:${userSender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
const ftroli ={key: {fromMe: false,"participant":"0@s.whatsapp.net", "remoteJid": "status@broadcast"}, "message": {orderMessage: {itemCount: 2022,status: 200, thumbnail: thumb, surface: 200, message: "ɴᴏᴠᴀʙᴏᴛ-ᴍᴅ", orderTitle: "sᴜᴘᴇʀ ʙᴏᴛ ᴅᴇ ᴡʜᴀᴛsᴀᴘᴘ", sellerJid: '0@s.whatsapp.net'}}, contextInfo: {"forwardingScore":999,"isForwarded":true},sendEphemeral: true}
const fdoc = {key : {participant : '0@s.whatsapp.net', ...(from ? { remoteJid: `status@broadcast` } : {}) },message: {documentMessage: {title: botname, jpegThumbnail: null}}}
const kick = function (from, orangnya) {   
for (let i of orangnya) {   
conn.groupParticipantsUpdate(m.chat, [i], "remove")}}  
const time = moment(Number(msg.messageTimestamp + "000")).locale("es-mx").tz("America/Asuncion").format('MMMM Do YYYY, h:mm:ss a')   
  
let canalId = ["120363160031023229@newsletter", "120363301598733462@newsletter", "120363266665814365@newsletter"]
let canalNombre = ["INFINITY-WA 💫", "SkyUltraPlus-Host ☁️", "メ๛ᴄᴏʀᴛᴀɴᴀ𝐷𝑀2.0 ULTRA乡"]

async function getRandomChannel() {
let randomIndex = Math.floor(Math.random() * canalId.length)
let id = canalId[randomIndex]
let nombre = canalNombre[randomIndex]
return { id, nombre }
} 
	
let randomChannel = await getRandomChannel()
  
function pickRandom(list) {return list[Math.floor(list.length * Math.random())]}    
  
/*const reply = (text) => {  
m.reply(text)}*/
function ucapan() {
  const time = moment.tz("America/Los_Angeles").format("HH"); //America/Los_Angeles  Asia/Jakarta   America/Toronto

  let res = "🌉Buenas madrugadas";

  if (time >= 4) {
    res = "🌇Buenos Días";
  }

  if (time >= 11) {
    res = "🏙️Buenas Tardes";
  }

  if (time >= 15) {
    res = "🌆Buenas tardes";
  }

  if (time >= 17) {
    res = "🌃Buenas noches";
  }

  return res;
}
function sendMessage(conn, chat, text, m) {conn.sendMessage(chat, { text: text, contextInfo: { forwardedNewsletterMessageInfo: {newsletterJid: randomChannel.id, serverMessageId: '', newsletterName: pickRandom([randomChannel.nombre, `${ucapan()} ${pushname}`]) }, forwardingScore: 9999999, isForwarded: true }}, {quoted: m, ephemeralExpiration: 24*60*60*1000, disappearingMessagesInChat: 24*60*60*1000 // Ajustado a milisegundos
})} 
m.reply = (text) => {  
sendMessage(conn, m.chat, text, m)}
const sendAdMessage = (text, title, body, image, url) => { conn.sendMessage(m.chat, {text: text, contextInfo: { externalAdReply: { title: title, body: body, mediaUrl: url, sourceUrl: url, previewType: 'PHOTO', showAdAttribution: true, thumbnail: image, sourceUrl: url }}}, {})}  
const sendImage = ( image, caption ) => { conn.sendMessage(m.chat, { image: image, caption: caption }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})}  
const sendImageAsUrl = ( url, caption ) => { conn.sendMessage(m.chat, { image:  {url: url }, caption: caption }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})}  

//-------------[ TIPOS DE MENSAJES Y CITADOS ]----------------
const isAudio = type == 'audioMessage' // Mensaje de Audio  
const isSticker = type == 'stickerMessage' // Mensaje de Sticker  
const isContact = type == 'contactMessage' // Mensaje de Contacto  
const isLocation = type == 'locationMessage' // Mensaje de Localización   
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')  
const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')  
const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')  
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')  
const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')  
const isQuotedMsg = type === 'extendedTextMessage' && content.includes('Message') // Mensaje citado de cualquier tipo  
const isViewOnce = (type === 'viewOnceMessage') // Verifica si el tipo de mensaje es (mensaje de vista única)  
   
// Responder cmd con medios
if (isMedia && m.msg.fileSha256 && (m.msg.fileSha256.toString('base64') in global.db.data.sticker)) {
let hash = global.db.data.sticker[m.msg.fileSha256.toString('base64')]
let { text, mentionedJid } = hash
let messages = await generateWAMessage(m.chat, { text: text, mentions: mentionedJid }, {userJid: conn.user.id, quoted: m.quoted && m.quoted.fakeObj })
messages.key.fromMe = areJidsSameUser(m.sender, conn.user.id)
messages.key.id = m.key.id 
messages.pushName = m.pushName
if (m.isGroup) messages.participant = m.sender
let msg = {...chatUpdate, messages: [proto.WebMessageInfo.fromObject(messages)], type: 'append' }
conn.ev.emit('messages.upsert', msg)}
   
//--------------------[ INFO CONSOLE ]-----------------------
if (m.message) {
console.log(chalk.bold.cyanBright(`╔═════════════════════∌\n║+${conn.user.jid.split`@`[0]} ➢ ${botname} ${conn.user.id == global.numBot2 ? '' : '(SubBot)'} ${vs}`), 
chalk.bold.magenta(`\n╠═════════════════════\n║⏰${lenguaje.consola.text} `) + chalk.magentaBright(moment(t * 1000).tz(place).format('DD/MM/YY HH:mm:ss'),
chalk.bold.red(`\n️║🏷️ ${lenguaje.consola.text1} `) + chalk.bold.white(`[${conn.public ? 'Publico' : 'Privado'}]`), 
chalk.bold.yellow(`\n║📑${lenguaje.consola.text2} `) + chalk.yellowBright(`${type}`),  
m.isGroup ? chalk.bold.greenBright(`\n║📤${lenguaje.consola.text4} `) + chalk.greenBright(groupName) + ' ➜ ' + gradient.rainbow(from) : chalk.bold.greenBright(`\n║📥${lenguaje.consola.text5}`, userSender), 
chalk.bold.cyan(`\n║📊${lenguaje.consola.text3} `) + chalk.cyanBright(pushname) + ' ➜', gradient.rainbow(userSender), 
chalk.bold.white(`\n║💬${lenguaje.consola.text6}`) + chalk.whiteBright(`\n╚═════════════════════⋊\n${msgs(m.text)}\n`))
)}          

//--------------------[ AUTOBIO ]----------------------- 
if (global.db.data.settings[numBot].autobio) {
let setting = global.db.data.settings[numBot]
if (new Date() * 1 - setting.status > 1000) {
let uptime = await runtime(process.uptime())
var timestamp = speed();   
var latensi = speed() - timestamp 
//let text = [`${lenguaje.Bio.text} ${Object.keys(global.db.data.users).length} ${lenguaje.Bio.text2} ${latensi.toFixed(4)} 🚀`, `${lenguaje.Bio.text3} ${runtime(process.uptime())}\n\n${lenguaje.Bio.text4}`, `${lenguaje.Bio.text5}`, `👑 ${botname} uso: ${conn.public ? 'Publico' : 'Privado'} | ${lenguaje.Bio.text6} ${runtime(process.uptime())} | ${lenguaje.Bio.text7} ${Object.keys(global.db.data.users).length}`]
//let bio = text[Math.floor(Math.random() * text.length)]
let bio = `❥ ${botname} uso: ${conn.public ? 'Publico' : 'Privado'} | ${lenguaje.Bio.text6} ${runtime(process.uptime())} | ${lenguaje.Bio.text7} ${Object.keys(global.db.data.users).length}`
try {
await conn.updateProfileStatus(bio)
//await delay(3 * 3000) 
//await conn.updateProfilePicture(numBot, { url: "https://telegra.ph/file/84b0bad9adbbd5ed2b95e.jpg" })
setting.status = new Date() * 1 
} catch {
console.log(`[𝚄𝙿𝙳𝙰𝚃𝙴]\n𝙿𝚒𝚗𝚐: ${latensi.toFixed(4)}`) 
}}} 
  
//--------------------[ AUTOREAD ]-----------------------
if (m.message && prefix) {
conn.readMessages([m.key])
await conn.sendPresenceUpdate('composing', m.chat)	
}	
 
//Marcar como (Escribiendo...) 
// if (command) {
//await conn.sendPresenceUpdate('composing', m.chat)
// }
          
//--------------------[ viewOnceMessage ]-----------------------
if (m.mtype == 'viewOnceMessageV2') { 
if (global.db.data.chats[m.chat].viewonce) return
teks = `\`𝙰𝚀𝚄𝙸 𝙽𝙾 𝚂𝙴 𝙿𝙴𝚁𝙼𝙸𝚃𝙴 𝙾𝙲𝚄𝙻𝚃𝙰𝚁 𝙽𝙰𝙳𝙰\``
let msg = m.message.viewOnceMessageV2.message
let type = Object.keys(msg)[0]
let media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : 'video')
let buffer = Buffer.from([])
for await (const chunk of media) {
buffer = Buffer.concat([buffer, chunk])}
if (/video/.test(type)) {
return conn.sendFile(m.chat, buffer, 'error.mp4', `${msg[type].caption} ${teks}`, m)
} else if (/image/.test(type)) {
return conn.sendFile(m.chat, buffer, 'error.jpg', `${msg[type].caption} ${teks}`, m)
}}
          
//--------------------[ ANTIFAKES ]-----------------------
if (global.db.data.chats[m.chat].antifake && !isGroupAdmins) {	
let forbidPrefixes = ["1", "994", "48", "43", "40", "41", "49"];
for (let prefix of forbidPrefixes) {
if (m.sender.startsWith(prefix)) {
m.reply(`${lenguaje['smsAntiFake']()}`, m.sender)
conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')}}}
if (global.db.data.chats[m.chat].antiarabe && !isGroupAdmins) {
let forbidPrefixes = ["212", "265", "234", "258", "263", "967", "20", "92", "91"];
for (let prefix of forbidPrefixes) {
if (m.sender.startsWith(prefix)) {
m.reply(`${lenguaje['smsAntiArabe']()}`, m.sender)
conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')}}} 

//--------------------[ ANTILINK ]-----------------------
if (global.db.data.chats[m.chat].AntiYoutube && !isCreator) {
if (budy.includes("https://youtu.be/") || budy.includes("https://youtube.com/")) {
if (isGroupAdmins) return reply(lenguaje['smsAntiLink5']())
if (!isBotAdmins) return m.reply(lenguaje['smsAntiLink6']())
if (m.key.fromMe) return
if (!isCreator) return 
conn.sendMessage(m.chat, {text:`*LINK DE YOUTUBE DETECTADO 📢*\n@${sender.split("@")[0]} Usted sera eliminado de este grupo`, mentions: [sender], },{quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant }}) 
conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}}

if (global.db.data.chats[m.chat].AntInstagram && !isCreator) {
if (budy.includes("https://www.instagram.com/")) {
if (isGroupAdmins) return reply(lenguaje['smsAntiLink5']())
if (!isBotAdmins) return m.reply(lenguaje['smsAntiLink6']())
if (m.key.fromMe) return
if (!isCreator) return 
conn.sendMessage(m.chat, {text:`*LINK DE INSTAGRAM DETECTADO 📢*\n@${sender.split("@")[0]} Usted sera eliminado de este grupo`, mentions: [sender], },{quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant }})
conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}}

if (global.db.data.chats[m.chat].AntiFacebook && !isCreator) {
if (budy.includes("https://facebook.com/")) {
if (isGroupAdmins) return reply(lenguaje['smsAntiLink5']())
if (!isBotAdmins) return m.reply(lenguaje['smsAntiLink6']())
if (m.key.fromMe) return
if (!isCreator) return 
conn.sendMessage(m.chat, {text:`*LINK DE FACEBOOK DETECTADO 📢*\n@${sender.split("@")[0]} Usted sera eliminado de este grupo`, mentions: [sender], },{quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant }})
conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}}

if (global.db.data.chats[m.chat].AntiTelegram && !isCreator) {
if (budy.includes("https://t.me/")) {
if (isGroupAdmins) return reply(lenguaje['smsAntiLink5']())
if (!isBotAdmins) return m.reply(lenguaje['smsAntiLink6']())
if (m.key.fromMe) return
if (!isCreator) return 
conn.sendMessage(m.chat, {text:`*LINK DE TELEGRAM DETECTADO 📢*\n@${sender.split("@")[0]} Usted sera eliminado de este grupo`, mentions: [sender], },{quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant }})
conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}}

if (global.db.data.chats[m.chat].AntiTiktok && !isCreator) {
if (budy.match("https://www.tiktok.com/") || budy.match("https://vm.tiktok.com/")) {
//f (!isCreator) return m.reply(`Es mi creador Salvador`) 
if (isGroupAdmins) return reply(lenguaje['smsAntiLink5']())
if (!isBotAdmins) return m.reply(lenguaje['smsAntiLink6']())
conn.sendMessage(m.chat, {text:`*LINK DE TIKTOK DETECTADO 📢*\n\n@${sender.split("@")[0]} Usted sera eliminado de este grupo...`, mentions: [sender], },{quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant }})
conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}}

if (global.db.data.chats[m.chat].AntiTwitter) {
if (budy.includes("https://twitter.com/")){
if (isGroupAdmins) return reply(lenguaje['smsAntiLink5']())
if (!isBotAdmins) return m.reply(lenguaje['smsAntiLink6']())
if (m.key.fromMe) return m.reply(lenguaje['smsAntiLink5']())
if (!isCreator) return 
conn.sendMessage(m.chat, {text:`*LINK DE TWITER (X) DETECTADO 📢*\n@${sender.split("@")[0]} Usted sera eliminado de este grupo`, mentions: [sender], },{quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant }})
conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}}

if (global.db.data.chats[m.chat].antiLink2 && !isCreator) {
if (budy.includes("https://")) {
if (isGroupAdmins) return reply(lenguaje['smsAntiLink5']()) 
if (!isBotAdmins) return m.reply(lenguaje['smsAntiLink6']())
if (m.key.fromMe) return
if (!isCreator) return 
conn.sendMessage(m.chat, {text:`*LINK DE HTTPS DETECTADO 📢*\n@${sender.split("@")[0]} Usted sera eliminado de este grupo`, mentions: [sender], },{quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant }})
conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}}

if (global.db.data.chats[m.chat].antilink) {
if (budy.match(`chat.whatsapp.com`)) {
const groupAdmins = participants.filter((p) => p.admin);
const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n➥ ');
let delet = m.key.participant
let bang = m.key.id
conn.sendMessage(m.chat, {text: `${lenguaje['smsAntiLink']()} @${sender.split("@")[0]} ${lenguaje['smsAntiLink2']()}`, mentions: [sender], },{quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
if (!isBotAdmins) return conn.sendMessage(m.chat, { text: `${lenguaje['smsAntiLink3']()}\n${listAdmin}\n\n${lenguaje['smsAntiLink4']()}`, mentions: groupAdmins.map(v => v.id) }, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})  
let gclink = (`https://chat.whatsapp.com/`+await conn.groupInviteCode(m.chat))
let isLinkThisGc = new RegExp(gclink, 'i')
let isgclink = isLinkThisGc.test(m.text)
if (isgclink) return
if (isGroupAdmins) return reply(`${lenguaje['smsAntiLink5']()}`) 
conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')}}

//--------------------[ ANTITOXIC ]-----------------------
if (global.db.data.chats[m.chat].antitoxic && !isCreator) {   
const toxicWords = `g0re|g0r3|g.o.r.e|sap0|sap4|malparido|malparida|malparidos|malparidas|m4lp4rid0|m4lp4rido|m4lparido|malp4rido|m4lparid0|malp4rid0|chocha|chup4la|chup4l4|chupalo|chup4lo|chup4l0|chupal0|chupon|chupameesta|sabandija|hijodelagranputa|hijodeputa|hijadeputa|hijadelagranputa|kbron|kbrona|cajetuda|laconchadedios|putita|putito|put1t4|putit4|putit0|put1to|put1ta|pr0stitut4s|pr0stitutas|pr05titutas|pr0stitut45|prostitut45|prostituta5|pr0stitut45|fanax|f4nax|drogas|droga|dr0g4|nepe|p3ne|p3n3|pen3|p.e.n.e|pvt0|puto|pvto|put0|hijodelagransetentamilparesdeputa|Chingadamadre|coño|c0ño|coñ0|c0ñ0|afeminado|drog4|cocaína|marihuana|chocho|chocha|cagon|pedorro|agrandado|agrandada|pedorra|sape|nmms|mamar|chigadamadre|hijueputa|chupa|kaka|caca|bobo|boba|loco|loca|chupapolla|estupido|estupida|estupidos|polla|pollas|idiota|maricon|chucha|verga|vrga|naco|zorra|zorro|zorras|zorros|pito|huevon|huevona|huevones|rctmre|mrd|ctm|csm|cp|cepe|sepe|sepesito|cepecito|cepesito|hldv|ptm|baboso|babosa|babosos|babosas|feo|fea|feos|feas|webo|webos|mamawebos|chupame|bolas|qliao|imbecil|embeciles|kbrones|cabron|capullo|carajo|gore|gorre|gorreo|sapo|sapa|mierda|cerdo|cerda|puerco|puerca|perra|perro|joden|jodemos|dumb|fuck|shit|bullshit|cunt|cum|semen|bitch|motherfucker|foker|fucking`; 
const match = budy.match(new RegExp(toxicWords, "i")); 
if (match) { 
const isToxic = match[0]; 
if (m.chat === "120363297379773397@newsletter") return; 
if (m.chat === "120363355261011910@newsletter") return;
if (m.isBaileys && m.fromMe) return;
if (!m.isGroup) return;
if (isGroupAdmins) return;
const user = global.db.data.users[m.sender];
const chat = global.db.data.chats[m.chat];
const bot = global.db.data.settings[conn.user.jid] || {};
user.warn += 1;
        
if (!(user.warn >= 4)) {
await conn.sendMessage(m.chat, {text: `${lenguaje['AntiToxic'](m, isToxic)}\n⚠️ *${user.warn}/4*\n\n${botname}`, mentions: [m.sender]}, { quoted: m });
}
        
if (user.warn >= 4) {
user.warn = 0;
await conn.sendMessage(m.chat, { text: `*@${m.sender.split('@')[0]} ${lenguaje['AntiToxic2']()}*`, mentions: [m.sender]}, { quoted: m });
//user.banned = true;
await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
}
return;
}}

//-------[ MODO PUBLIC/PRIVADO ]-----------
if (!conn.public && !isCreator) {
if (!m.key.fromMe) return 
}          	 
 
//--------------------[ BANCHAT ]---------------------
if (global.db.data.chats[m.chat].isBanned && !isCreator) {
return }

//----------------[ MODOADMINS ]------------------
if (global.db.data.chats[m.chat].modeadmin && !isGroupAdmins) {
return } 

//----------------[ AUTOSTICKERS]--------------------
if (global.db.data.chats[m.chat].autosticker) {  
// await conn.sendPresenceUpdate('composing', m.chat)
if (/image/.test(mime) && !/webp/.test(mime)) {
m.reply(`_Calma crack estoy haciendo tu sticker 👏_\n\n_*Autosticker esta activado*_`)   
let media = await quoted.download()
await conn.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author, contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: botname, body: `h`, mediaType: 2, sourceUrl: nn6, thumbnail: imagen1}}}, { quoted: m }) 
console.log(`Auto sticker detected`)
} else if (/video/.test(mime)) {
if ((quoted.msg || quoted).seconds > 25) return reply(lenguaje['smsAutoSicker']())  
let media = await quoted.download()
await conn.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: goblal.author, contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: wm, mediaType: 2, sourceUrl: nn6, thumbnail: imagen1}}}, { quoted: m })
}}

//----------------[ AUTOLEVELUP/AUTONIVEL ]-------------------
if (global.db.data.chats[m.chat].autolevelup) {	
let user = global.db.data.users[m.sender]
if (!user.autolevelup)
return !0
let before = user.level * 1
while (canLevelUp(user.level, user.exp, global.multiplier))
user.level++
//user.role = global.rpg.role(user.level).name
if (before !== user.level) { 
let text = [`${lenguaje['smsAutonivel']()} @${sender.split`@`[0]} ${lenguaje['smsAutonivel2']()}\n${lenguaje['smsAutonivel3']()} ${before} ⟿ ${user.level}\n${lenguaje['smsAutonivel6']()} ${user.role}\n${lenguaje['smsAutonivel7']()} ${new Date().toLocaleString('id-ID')}\n\n${lenguaje['smsAutonivel8']()}`, `${lenguaje['smsAutonivel9']()} ${lenguaje['smsAutonivel4']()} ${before}\n${lenguaje['smsAutonivel5']()} ${user.level}\n${lenguaje['smsAutonivel6']()} ${user.role}\n${lenguaje['smsAutonivel7']()} ${new Date().toLocaleString('id-ID')}`] 
let str = text[Math.floor(Math.random() * text.length)]
return conn.sendMessage(m.chat, { text: str, contextInfo:{mentionedJid:[sender]}},{quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})}} 
 
//----------------[ CHATBOT/AUTOMATICO ]-------------------
if (global.db.data.chats[m.chat].simi) {
let textodem = budy
try {
await conn.sendPresenceUpdate('composing', m.chat)
let gpt = await fetch(`https://delirius-apiofc.vercel.app/api/simi?text=${encodeURIComponent(textodem)}`)
let res = await gpt.json()
await delay(1 * 1000) 
await m.reply(res.data.message)
} catch {
//🟢 [ES] SI DA ERROR USARA ESTA OTRA OPCION DE API DE IA QUE RECUERDA EL NOMBRE DE LA PERSONA
//🟢 [EN] IF IT ERROR, IT WILL USE THIS OTHER AI API OPTION THAT REMEMBER THE NAME OF THE PERSON 
if (textodem.includes('Hola')) textodem = textodem.replace('Hola', 'Hello')
if (textodem.includes('hola')) textodem = textodem.replace('hola', 'hello')
if (textodem.includes('HOLA')) textodem = textodem.replace('HOLA', 'HELLO')
const reis = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=' + textodem)
const resu = await reis.json()
const nama = m.pushName || '1'
const api = await fetch('http://api.brainshop.ai/get?bid=153868&key=rcKonOgrUFmn5usX&uid=' + nama + '&msg=' + resu[0][0][0])
const res = await api.json()
const reis2 = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=es&dt=t&q=' + res.cnt)
const resu2 = await reis2.json()
await delay(3 * 3000) 
await m.reply(resu2[0][0][0])}} 
    
//---------------------[ ANTIPRIVADO ]------------------------
if (!m.isGroup && !isCreator) {  
//const bot = global.db.data.users[m.sender] || {};
if (global.db.data.settings[numBot].antiprivado) {
conn.sendMessage(m.chat, {text: `*${lenguaje['smsWel']()}* @${sender.split`@`[0]}, ${lenguaje['smsAntiPv']()}\n${nn2}`, mentions: [m.sender], }, {quoted: m}) 
await delay(2 * 2000) 
await conn.updateBlockStatus(m.chat, 'block')   
return 
}}

//---------------------[ MULTILENGUAJE ]------------------------
const { en, es, ar, id, pt, rs} = require('./libs/idiomas/total-idiomas.js')
let user = global.db.data.users[m.sender]
if (user.Language == 'es') {
global.lenguaje = es
} else if (user.Language == 'en') {
global.lenguaje = en
} else if (user.Language == 'ar') {
global.lenguaje = ar 
} else if (user.Language == 'id') { 
global.lenguaje = id
} else if (user.Language == 'pt') { 
global.lenguaje = pt
} else if (user.Language == 'rs') { 
global.lenguaje = rs
} else {
global.lenguaje = es
}      
 
/*//---------------------[ ANTISPAM ]------------------------
if (global.db.data.chats[m.chat].antispam && prefix) {
let user = global.db.data.users[m.sender]
let str = [nna, md, yt, tiktok, fb] 
let info = str[Math.floor(Math.random() * str.length)]
const date = global.db.data.users[m.sender].spam + 5000; //600000 
if (new Date - global.db.data.users[m.sender].spam < 5000) return console.log(`[ SPAM ] ➢ ${command} [${args.length}]`)  
global.db.data.users[m.sender].spam = new Date * 1;
}*/

//---------------------[ TicTacToe ]------------------------
let winScore = 4999
let playScore = 99
this.game = this.game ? this.game : {}
let room13 = Object.values(this.game).find(room13 => room13.id && room13.game && room13.state && room13.id.startsWith('tictactoe') && [room13.game.playerX, room13.game.playerO].includes(m.sender) && room13.state == 'PLAYING')
if (room13) {
let ok
let isWin = !1
let isTie = !1
let isSurrender = !1
//reply(`[DEBUG]\n${parseInt(m.text)}`)
if (!/^([1-9]|(me)?give up|surr?ender|off|skip)$/i.test(m.text)) return
isSurrender = !/^[1-9]$/.test(m.text)
if (m.sender !== room13.game.currentTurn) { 
if (!isSurrender) return !0
}
if (!isSurrender && 1 > (ok = room13.game.turn(m.sender === room13.game.playerO, parseInt(m.text) - 1))) {
m.reply({'-3': 'El juego ha terminado',
'-2': 'Inválido',
'-1': 'Posición inválida',
0: 'Posición inválida', }[ok])
return !0
}
if (m.sender === room13.game.winner) isWin = true
else if (room13.game.board === 511) isTie = true
let arr = room13.game.render().map(v => {
return {X: '❎',
O: '❌',
1: '1️⃣',
2: '2️⃣',
3: '3️⃣',
4: '4️⃣',
5: '5️⃣',
6: '6️⃣',
7: '7️⃣',
8: '8️⃣',
9: '9️⃣',
}[v]})
if (isSurrender) {
room13.game._currentTurn = m.sender === room13.game.playerX
isWin = true
}
let winner = isSurrender ? room13.game.currentTurn : room13.game.winner
let str = `*\`🎮 ＴＲＥＳ ＥＮ ＲＡＹＡ 🎮\`*

       ${arr.slice(0, 3).join('')}
       ${arr.slice(3, 6).join('')} 
       ${arr.slice(6).join('')}
	    
❎ = @${room13.game.playerX.split('@')[0]}
❌ = @${room13.game.playerO.split('@')[0]}

${isWin ? `@${winner.split('@')[0]} *HAS GANADOS 🎉*\n*🎁 OBTIENE :* ${winScore} XP` : isTie ? `*EMPATE 😹*` : `𝐓𝐮𝐫𝐧𝐨 𝐝𝐞 : ${['❎', '❌'][1 * room13.game._currentTurn]} (@${room13.game.currentTurn.split('@')[0]})`}` //`
let users = global.db.data.users
if ((room13.game._currentTurn ^ isSurrender ? room13.x : room13.o) !== m.chat)
room13[room13.game._currentTurn ^ isSurrender ? 'x' : 'o'] = m.chat
if (room13.x !== room13.o) await conn.sendText(room13.x, str, m, { mentions: parseMention(str) } )
await conn.sendText(room13.o, str, m, { mentions: parseMention(str) } )
         
if (isTie || isWin) {
users[room13.game.playerX].exp += playScore
users[room13.game.playerO].exp += playScore
delete this.game[room13.id]
if (isWin)
users[winner].exp += winScore - playScore
}}
	    
//math
if (kuismath.hasOwnProperty(m.sender.split('@')[0]) && isCmd) {
kuis = true
jawaban = kuismath[m.sender.split('@')[0]]
if (budy.toLowerCase() == jawaban) { 
const exp = Math.floor(Math.random() * 600)
global.db.data.users[m.sender].exp += exp;
await m.reply(`*Respuesta correcta 🎉*\n\n*Ganarte :* ${exp} Exp`) 
m.react(`✅`) 
delete kuismath[m.sender.split('@')[0]]
} else m.react(`❌`)} 
                          
this.confirm = this.confirm ? this.confirm : {}
if (this.confirm[m.sender.split('@')[0]]) {
let { timeout, sender, message, to, type, count } = this.confirm[m.sender.split('@')[0]]
let user = global.db.data.users[sender]
let _user = global.db.data.users[to]
if (/^No|no$/i.test(body)) {
clearTimeout(timeout)
delete this.confirm[m.sender.split('@')[0]]
return this.sendTextWithMentions(m.chat, `⚠️ Cancelado, la transferencia no se realizará.`, m)}

if (/^Si|si$/i.test(body)) { 
let previous = user[type] * 1
let _previous = _user[type] * 1
user[type] -= count * 1
_user[type] += count * 1
if (previous > user[type] * 1 && _previous < _user[type] * 1) {
conn.sendMessage(m.chat, {text: `*✅ Se transfirierón correctamente ${count} ${type} a @${(to || '').replace(/@s\.whatsapp\.net/g, '')}*`, mentions: [to]}, {quoted: m}); 
} else { 
user[type] = previous; 
_user[type] = _previous; 
conn.sendMessage(m.chat, {text: `*[ ⚠️ ] Error al transferir ${count} ${type} a @${(to || '').replace(/@s\.whatsapp\.net/g, '')}*`, mentions: [to]}, {quoted: m})} 
clearTimeout(timeout); 
delete this.confirm[sender]; 
}}

let mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
for (let jid of mentionUser) {
let user = global.db.data.users[jid]
if (!user) continue
let afkTime = user.afkTime 
if (!afkTime || afkTime < 0) continue 
let reason = user.afkReason || ''
m.reply(`${lenguaje.rpg.text}\n\n${reason ? '🔸️ *𝚁𝙰𝚉𝙾𝙽* : ' + reason : '🔸️ *𝚁𝙰𝚉𝙾𝙽* : 𝚂𝚒𝚗 𝚛𝚊𝚣𝚘𝚗'}\n🔸️ ${lenguaje.rpg.text1} ${clockString(new Date - afkTime)}`.trim())}
if (global.db.data.users[m.sender].afkTime > -1) {
let user = global.db.data.users[m.sender]
m.reply(`${lenguaje.rpg.text2}\n${user.afkReason ? '\n*𝚁𝙰𝚉𝙾𝙽 :* ' + user.afkReason : ''}\n${lenguaje.rpg.text1} ${clockString(new Date - user.afkTime)}`.trim())
user.afkTime = -1
user.afkReason = ''  
}

if (!global.db.data.users[m.sender]) global.db.data.users[m.sender] = {};
if (!global.db.data.users[m.sender].mensajes) global.db.data.users[m.sender].mensajes = {};
if (!global.db.data.users[m.sender].mensajes[m.chat]) global.db.data.users[m.sender].mensajes[m.chat] = 0;
global.db.data.users[m.sender].mensajes[m.chat]++;
	
if (m.mtype === 'interactiveResponseMessage') {   
let msg = m.message[m.mtype]  || m.msg
if (msg.nativeFlowResponseMessage && !m.isBot ) { 
let { id } = JSON.parse(msg.nativeFlowResponseMessage.paramsJson) || {}  
if (id) {
let emit = { 
key : { ...m.key } , 
message:{ extendedTextMessage : { text : id } } ,
pushName : m.pushName,
messageTimestamp  : m.messageTimestamp || 754785898978
}
return conn.ev.emit('messages.upsert', { messages : [ emit ] ,  type : 'notify'})
}}}
//prueba aqui 
	
//ARRANCA LA DIVERSIÓN 
switch (prefix && command) { 
case 'yts': case 'playlist': case 'ytsearch': case 'acortar': case 'google': case 'imagen': case 'traducir': case 'translate': case "tts": case 'ia': case 'chatgpt': case 'dalle': case 'ia2': case 'aimg': case 'imagine': case 'dall-e': case 'ss': case 'ssweb': case 'wallpaper': case 'hd': case 'horario': case 'bard': case 'wikipedia': case 'wiki': case 'pinterest': case 'style': case 'styletext': case 'npmsearch': await buscadores(m, command, conn, text, budy, from, fkontak, prefix, args, quoted, lolkeysapi)
break   
// prueba desde aqui ok
//sistema de personaje de anime
// Comando para poner en venta un personaje exclusivo
case 'comprar': {
    try {
        const userId = m.sender;
        const personajeNombre = args.join(' ').toLowerCase();

        // Verificar si el usuario ingresó un nombre
        if (!personajeNombre) {
            return conn.sendMessage(
                m.chat,
                { text: "⚠️ *Error:* Debes escribir el nombre del personaje que deseas comprar.\n📌 *Ejemplo:* `.comprar Goku Ultra`" },
                { quoted: m }
            );
        }

        // Verificar si el personaje existe en la tienda
        const personajeIndex = cartera.personajesEnVenta.findIndex(p => p.nombre.toLowerCase() === personajeNombre);
        if (personajeIndex === -1) {
            return conn.sendMessage(
                m.chat,
                { text: `⚠️ *Error:* No se encontró el personaje *${personajeNombre}* en la tienda.` },
                { quoted: m }
            );
        }

        let personaje = cartera.personajesEnVenta[personajeIndex];

        // Verificar si el personaje ya ha sido comprado
        if (personaje.dueño) {
            return conn.sendMessage(
                m.chat,
                { text: `❌ *Este personaje ya ha sido comprado por @${personaje.dueño.replace(/@s.whatsapp.net/, '')}.*` },
                { quoted: m },
                { mentions: [personaje.dueño] }
            );
        }

        // Verificar si el usuario tiene suficientes Cortana Coins
        if (!cartera[userId] || cartera[userId].coins < personaje.precio) {
            return conn.sendMessage(
                m.chat,
                { text: `💰 *No tienes suficientes Coins para comprar a ${personaje.nombre}.*\n📌 *Precio:* ${personaje.precio} Coins\n💳 *Tu saldo:* ${cartera[userId]?.coins || 0} Coins` },
                { quoted: m }
            );
        }

        // Restar el precio del personaje a las Coins del usuario
        cartera[userId].coins -= personaje.precio;

        // Asignar el personaje al usuario
        personaje.dueño = userId;

        // Asegurar que el usuario tenga un array para personajes adquiridos
        if (!Array.isArray(cartera[userId].personajes)) {
            cartera[userId].personajes = [];
        }
        cartera[userId].personajes.push(personaje);

        // Remover el personaje de la tienda
        cartera.personajesEnVenta.splice(personajeIndex, 1);

        // Guardar cambios en `cartera.json`
        fs.writeFileSync('./cartera.json', JSON.stringify(cartera, null, 2));

        // 📝 **Mensaje de confirmación con diseño bonito**
        let mensajeCompra = `
📢 *¡Personaje Desbloqueado!* 🚀  

📌 *Ficha de Personaje:*  
🎭 *Nombre:* ${personaje.nombre}  
⚔️ *Nivel:* 1  
💖 *Vida:* 100/100  
🧬 *EXP:* 0 / 500  

🎯 *Habilidades Iniciales:*  
⚡ ${personaje.habilidades[0].nombre} (Nivel 1)  
⚡ ${personaje.habilidades[1].nombre} (Nivel 1)  
⚡ ${personaje.habilidades[2].nombre} (Nivel 1)  

⚠️ *Este personaje ya es tuyo. No puede ser adquirido por otro jugador.*  
📜 *Consulta tus personajes con:* \`.verpersonajes\`
        `;

        // Enviar mensaje con la imagen del personaje
        await conn.sendMessage(
            m.chat,
            {
                image: Buffer.from(personaje.imagen, 'base64'),
                mimetype: personaje.mimetype,
                caption: mensajeCompra,
                mentions: [userId]
            },
            { quoted: m }
        );

    } catch (error) {
        console.error('❌ Error en el comando .comprar:', error);
        return conn.sendMessage(
            m.chat,
            { text: "❌ *Ocurrió un error al intentar comprar el personaje. Intenta nuevamente.*" },
            { quoted: m }
        );
    }
}
break;
 


case 'addpersonaje': {
    try {
        // 1️⃣ Verificar que el usuario haya ingresado todos los parámetros necesarios
        const args = text.split(' ');
        if (args.length < 5) {
            return conn.sendMessage(
                m.chat,
                { text: "⚠️ *Formato incorrecto.*\nEjemplo: `.addpersonaje Goku Kamehameha Genkidama SaiyanPower 3000`" },
                { quoted: m }
            );
        }

        // 2️⃣ Extraer los argumentos del comando
        const [nombre, habilidad1, habilidad2, habilidad3, precio] = args;

        if (isNaN(precio)) {
            return conn.sendMessage(
                m.chat,
                { text: "❌ *El precio debe ser un número válido.*" },
                { quoted: m }
            );
        }

        // 3️⃣ Verificar que el usuario respondió a un archivo multimedia
        if (!m.quoted || !m.quoted.mimetype) {
            return conn.sendMessage(
                m.chat,
                { text: "⚠️ *Debes responder a una imagen, video o sticker para asignarlo al personaje.*" },
                { quoted: m }
            );
        }

        // 4️⃣ Detectar el tipo de archivo multimedia
        let mimeType = m.quoted.mimetype.toLowerCase();
        let mediaType = '';

        if (mimeType.includes('image')) {
            mediaType = 'image';
        } else if (mimeType.includes('video')) {
            mediaType = 'video';
        } else if (mimeType.includes('webp') || mimeType.includes('sticker')) {
            mediaType = 'sticker';
        } else {
            return conn.sendMessage(
                m.chat,
                { text: "⚠️ *El mensaje citado no es una imagen, video ni sticker soportado.*" },
                { quoted: m }
            );
        }

        // 5️⃣ Descargar el contenido multimedia
        const mediaStream = await downloadContentFromMessage(m.quoted, mediaType);
        let mediaBuffer = Buffer.alloc(0);
        for await (const chunk of mediaStream) {
            mediaBuffer = Buffer.concat([mediaBuffer, chunk]);
        }

        // 6️⃣ Crear el objeto del personaje
        const nuevoPersonaje = {
            id: Date.now().toString(),
            nombre,
            precio: parseInt(precio),
            imagen: mediaBuffer.toString('base64'), // Guardar la imagen/video/sticker en base64
            mimetype: m.quoted.mimetype,
            habilidades: [
                { nombre: habilidad1, nivel: 1 },
                { nombre: habilidad2, nivel: 1 },
                { nombre: habilidad3, nivel: 1 }
            ],
            stats: {
                nivel: 1,
                experiencia: 0,
                experienciaSiguienteNivel: 500,
                vida: 100
            },
            dueño: null
        };

        // 7️⃣ Asegurar que la tienda de personajes exista en cartera.json
        if (!Array.isArray(cartera.personajesEnVenta)) {
            cartera.personajesEnVenta = [];
        }

        // 8️⃣ Agregar el personaje a la tienda
        cartera.personajesEnVenta.push(nuevoPersonaje);

        // 9️⃣ Guardar en el archivo JSON
        fs.writeFileSync('./cartera.json', JSON.stringify(cartera, null, 2));

        // 🔟 Enviar confirmación
        const mensajeConfirm = `✅ *${nombre}* ha sido agregado a la tienda.\n` +
                               `💰 *Precio:* ${precio} Coins\n` +
                               `🔥 *Habilidades:* ${habilidad1}, ${habilidad2}, ${habilidad3}\n` +
                               `❤️ *Vida:* 100\n\n` +
                               `🎭 *Este personaje ya está disponible en la tienda.*`;

        return conn.sendMessage(
            m.chat,
            { text: mensajeConfirm },
            { quoted: m }
        );

    } catch (error) {
        console.error('❌ Error en .addpersonaje:', error);
        return conn.sendMessage(
            m.chat,
            { text: "❌ Ocurrió un error al agregar el personaje. Intenta nuevamente." },
            { quoted: m }
        );
    }
}
break;
        
 
		
		
//sistema nuevo de mascota
case 'estadomascota': {
    try {
        await m.react('✅'); // Reacción al usar el comando

        const userId = m.sender;

        // Verificar si el usuario tiene una cartera creada
        if (!cartera[userId]) {
            return conn.sendMessage(
                m.chat,
                { text: "⚠️ *Primero necesitas crear tu cartera con `.crearcartera`.*" },
                { quoted: m }
            );
        }

        const mascotaPrincipal = cartera[userId].mascotas[0]; // La primera mascota es la principal

        // Crear texto con las estadísticas de la mascota principal
        let habilidadesText = mascotaPrincipal.habilidades
            .map((hab) => `🔹 ${hab.nombre} (Nivel ${hab.nivel})`)
            .join('\n');

        const textoEstado = `
🐾 *Estado de tu Mascota Principal:* 🐾

🦴 *Nombre:* ${mascotaPrincipal.nombre}  
📊 *Rango:* ${mascotaPrincipal.rango}  
🆙 *Nivel:* ${mascotaPrincipal.nivel}  
❤️ *Vida:* ${mascotaPrincipal.vida}  
✨ *Experiencia:* ${mascotaPrincipal.experiencia} / ${mascotaPrincipal.experienciaSiguienteNivel}  

🌟 *Habilidades:*  
${habilidadesText}

💡 *Usa los comandos de interacción para mejorar sus habilidades y subir de nivel.*`;

        // URL de la imagen correspondiente
        const imageUrl = 'https://cloud.dorratz.com/files/0f1eacbf814e1342e424de1b3ab0fd3b'; // Reemplaza con la URL de la imagen que quieras enviar

        // Enviar mensaje al usuario con la imagen y las estadísticas
        await conn.sendMessage(
            m.chat,
            {
                image: { url: imageUrl }, // Enviar la imagen con la URL
                caption: textoEstado, // Texto que acompaña a la imagen
                mentions: [m.sender], // Menciones si aplica
            },
            { quoted: m }
        );
    } catch (error) {
        console.error('❌ Error mostrando el estado de la mascota:', error);
        m.reply('❌ *Ocurrió un error al intentar mostrar el estado de tu mascota. Intenta nuevamente.*');
    }
}
break;
	
case 'mascota': {
    try {
        const userId = m.sender;
        const args = m.text.split(' ')[1]; // Obtener el número de la mascota (ejemplo: .mascota 2)

        // Verificar si el usuario tiene una cartera
        if (!cartera[userId]) {
            return conn.sendMessage(
                m.chat,
                { text: "⚠️ *Primero necesitas crear tu cartera con `.crearcartera`.*" },
                { quoted: m }
            );
        }

        // Verificar si el argumento es válido
        const mascotaIndex = parseInt(args);
        if (isNaN(mascotaIndex) || mascotaIndex < 1 || mascotaIndex > cartera[userId].mascotas.length) {
            return conn.sendMessage(
                m.chat,
                { text: `⚠️ *Debes ingresar un número válido entre 1 y ${cartera[userId].mascotas.length}.*` },
                { quoted: m }
            );
        }

        // Cambiar la mascota principal
        const mascotas = cartera[userId].mascotas;
        const nuevaMascotaPrincipal = mascotas.splice(mascotaIndex - 1, 1)[0]; // Eliminar y obtener la mascota seleccionada
        mascotas.unshift(nuevaMascotaPrincipal); // Moverla al inicio del arreglo

        // Guardar cambios en cartera.json
        fs.writeFileSync('./cartera.json', JSON.stringify(cartera, null, 2));

        // Confirmar cambio
        const mensaje = `🎉 *Has cambiado tu mascota principal a:*  
🦴 *${nuevaMascotaPrincipal.nombre}*  
📊 *Rango:* ${nuevaMascotaPrincipal.rango}  
🆙 *Nivel:* ${nuevaMascotaPrincipal.nivel}  
❤️ *Vida:* ${nuevaMascotaPrincipal.vida}`;

        await conn.sendMessage(
            m.chat,
            { text: mensaje },
            { quoted: m }
        );
    } catch (error) {
        console.error('❌ Error en el comando .mascota:', error);
        return conn.sendMessage(m.chat, { text: '❌ *Ocurrió un error al intentar cambiar de mascota. Intenta nuevamente.*' }, { quoted: m });
    }
}
break;
	
case 'tiendamall': {
    try {
        const tienda = `
¸,ø¤º°\`°º¤ø,¸¸,ø¤º°
★·.·´¯\`·.·★ *TIENDA MALL* ★·.·´¯\`·.·★
🍒｡･ﾟ♡ﾟ･｡🍓｡･ﾟ♡ﾟ･｡

🛒 *¡Bienvenido a la Tienda Mall! Aquí puedes comprar nuevas mascotas y personajes con tus Cortana Coins.* 🪙

━─━────༺༻────━─━

🐾 *Mascotas Disponibles:* 🐾

🐒 *.changuito*  
💰 Precio: 🪙 100 Cortana Coins  
_Compañero ágil y juguetón._

🦁 *.leon*  
💰 Precio: 🪙 200 Cortana Coins  
_El rey de la selva, imponente y fuerte._

🐓 *.gallo*  
💰 Precio: 🪙 50 Cortana Coins  
_Un luchador persistente._

🐿 *.ardilla*  
💰 Precio: 🪙 75 Cortana Coins  
_Veloz y recolectora._

🐅 *.tigre*  
💰 Precio: 🪙 300 Cortana Coins  
_Poderoso y letal._

━─━────༺༻────━─━

🎭 *Personajes Comunes:* 🎭  

🟠 *.goku* (Dragon Ball Z)  
💰 Precio: 🪙 250 Cortana Coins  

🏴‍☠️ *.luffy* (One Piece)  
💰 Precio: 🪙 250 Cortana Coins  

🍥 *.naruto* (Naruto Shippuden)  
💰 Precio: 🪙 250 Cortana Coins  

━─━────༺༻────━─━

👑 *Personajes Exclusivos:* 👑 *(Solo 1 usuario puede poseerlos)*  

🧪 *.senku* (Dr. Stone)  
💰 Precio: 🪙 1000 Cortana Coins  

🔵 *.gojo* (Jujutsu Kaisen)  
💰 Precio: 🪙 2000 Cortana Coins  

⚔️ *.asta* (Black Clover)  
💰 Precio: 🪙 3000 Cortana Coins  

━─━────༺༻────━─━

💡 *Próximamente más personajes, mascotas y sorpresas para ti.*  
🛒 *¡Sigue ahorrando Cortana Coins para nuevas aventuras!* 🪙  
`;

        const imageUrl = 'https://cloud.dorratz.com/files/d940ad9ae373fadc8b1589c3e88ab4f0'; // Imagen para la tienda

        // Enviar el mensaje de la tienda junto con la imagen
        await conn.sendMessage(
            m.chat,
            { 
                caption: tienda,
                image: { url: imageUrl },
            },
            { quoted: m }
        );
    } catch (error) {
        console.error('❌ Error en el comando .tiendamall:', error);
        return conn.sendMessage(m.chat, { text: '❌ *Ocurrió un error al mostrar la tienda. Intenta nuevamente.*' }, { quoted: m });
    }
}
break;
	
	
case 'batalla1': {
    try {
        const userId = m.sender; // ID del usuario que envía el comando
        const mentioned = m.mentionedJid[0]; // Usuario mencionado para la batalla

        if (!mentioned) {
            return conn.sendMessage(
                m.chat,
                { text: "⚔️ *Debes mencionar a otro usuario para iniciar una batalla.*" },
                { quoted: m }
            );
        }

        if (!cartera[userId] || !cartera[mentioned]) {
            return conn.sendMessage(
                m.chat,
                { text: "⚠️ *Ambos usuarios deben tener una cartera creada con `.crearcartera`.*" },
                { quoted: m }
            );
        }

        const now = Date.now();
        if (cartera[userId].lastBattle && now - cartera[userId].lastBattle < 600000) {
            const remainingTime = Math.ceil((600000 - (now - cartera[userId].lastBattle)) / 60000);
            return conn.sendMessage(
                m.chat,
                { text: `⏳ *Espera ${remainingTime} minutos antes de iniciar otra batalla.*` },
                { quoted: m }
            );
        }

        // Guardar solicitud de batalla y tiempo
        cartera[userId].lastBattle = now;
        cartera[userId].battleRequest = {
            target: mentioned,
            time: now,
        };
        fs.writeFileSync('./cartera.json', JSON.stringify(cartera, null, 2));

        // Notificar al usuario mencionado
        const mensaje = `⚔️ *@${mentioned.split('@')[0]}* te ha retado a una batalla.  
🛡️ *Responde con* \`.siquiero\` *para aceptar.*  
⏳ *Tienes 2 minutos para aceptar antes de que la solicitud expire.*`;
        await conn.sendMessage(
            m.chat,
            { text: mensaje, mentions: [mentioned] },
            { quoted: m }
        );

        // Configurar expiración de la solicitud
        setTimeout(() => {
            if (cartera[userId].battleRequest && cartera[userId].battleRequest.target === mentioned) {
                delete cartera[userId].battleRequest;
                fs.writeFileSync('./cartera.json', JSON.stringify(cartera, null, 2));
                conn.sendMessage(
                    m.chat,
                    { text: "⏳ *La solicitud de batalla ha expirado porque no fue aceptada a tiempo.*" },
                    { quoted: m }
                );
            }
        }, 120000); // 2 minutos en milisegundos
    } catch (error) {
        console.error('❌ Error en el comando .batalla1:', error);
        return conn.sendMessage(m.chat, { text: '❌ *Error inesperado al enviar la solicitud de batalla.*' }, { quoted: m });
    }
}
break;

case 'siquiero': {
    try {
        const userId = m.sender;

        // Verificar si alguien retó al usuario
        const challengerId = Object.keys(cartera).find(
            (id) => cartera[id].battleRequest && cartera[id].battleRequest.target === userId
        );

        if (!challengerId) {
            return conn.sendMessage(
                m.chat,
                { text: "⚠️ *No tienes ninguna solicitud de batalla pendiente.*" },
                { quoted: m }
            );
        }

        const requestTime = cartera[challengerId].battleRequest.time;
        const now = Date.now();
        if (now - requestTime > 120000) {
            delete cartera[challengerId].battleRequest;
            fs.writeFileSync('./cartera.json', JSON.stringify(cartera, null, 2));
            return conn.sendMessage(
                m.chat,
                { text: "⏳ *La solicitud de batalla ha expirado.*" },
                { quoted: m }
            );
        }

        const challengerMascota = cartera[challengerId].mascotas[0];
        const opponentMascota = cartera[userId].mascotas[0];

        // Animación de la batalla en un solo mensaje
        const animaciones = [
            "⚔️ *¡La batalla comienza!* Las mascotas se preparan para el combate...",
            `${challengerMascota.nombre} 🐾 *lanza el primer ataque!*`,
            `${opponentMascota.nombre} 🛡️ *se defiende con agilidad.*`,
            `${opponentMascota.nombre} 🔥 *contraataca con un golpe certero!*`,
            `${challengerMascota.nombre} 💥 *responde con un movimiento crítico!*`,
            "💫 *Ambas mascotas están dando lo mejor de sí... ¿quién ganará?*",
            "🔥 *El campo de batalla se llena de tensión... ¡estamos cerca del desenlace!*",
            "🌟 *Un movimiento maestro podría decidirlo todo... ¡esto es épico!*",
            "💥 *Impacto final... ¡qué combate tan increíble!*"
        ];

        let mensajeAnimado = await conn.sendMessage(m.chat, { text: animaciones[0] }, { quoted: m });
        for (let i = 1; i < animaciones.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 1500)); // Esperar 1.5 segundos
            await conn.sendMessage(
                m.chat,
                { text: animaciones[i], edit: mensajeAnimado.key }, // Editar el mensaje existente
                { quoted: m }
            );
        }

        // Determinar estadísticas y ganador
        const statsChallenger =
            challengerMascota.nivel * 5 +
            challengerMascota.habilidades.reduce((total, h) => total + h.nivel * 2, 0);
        const statsOpponent =
            opponentMascota.nivel * 5 +
            opponentMascota.habilidades.reduce((total, h) => total + h.nivel * 2, 0);

        let ganadorId, perdedorId;
        if (statsChallenger > statsOpponent) {
            ganadorId = challengerId;
            perdedorId = userId;
        } else if (statsChallenger < statsOpponent) {
            ganadorId = userId;
            perdedorId = challengerId;
        } else {
            return conn.sendMessage(m.chat, { text: "🤝 *La batalla terminó en empate.*" });
        }

        // Reducir vida de ambas mascotas
        const ganadorMascota = cartera[ganadorId].mascotas[0];
        const perdedorMascota = cartera[perdedorId].mascotas[0];
        ganadorMascota.vida -= Math.floor(Math.random() * 10) + 5;
        perdedorMascota.vida -= Math.floor(Math.random() * 20) + 10;

        if (ganadorMascota.vida < 0) ganadorMascota.vida = 0;
        if (perdedorMascota.vida < 0) perdedorMascota.vida = 0;

        // Recompensas
        const xpGanadaGanador = Math.floor(Math.random() * 500) + 500;
        const xpGanadaPerdedor = Math.floor(Math.random() * 200) + 100;

        ganadorMascota.experiencia += xpGanadaGanador;
        cartera[ganadorId].coins += 200;

        perdedorMascota.experiencia += xpGanadaPerdedor;
        cartera[perdedorId].coins += 50;

        // Subida de nivel automática sin notificación
        const mascotas = [ganadorMascota, perdedorMascota];
        for (const mascota of mascotas) {
            while (mascota.experiencia >= mascota.experienciaSiguienteNivel) {
                mascota.nivel++;
                mascota.experiencia -= mascota.experienciaSiguienteNivel;
                mascota.experienciaSiguienteNivel += 100 * mascota.nivel;

                const rangos = ['🐾 Principiante', '🐾 Intermedio', '🐾 Avanzado', '🐾 Experto', '🐾 Leyenda'];
                mascota.rango = rangos[Math.min(Math.floor(mascota.nivel / 10), rangos.length - 1)];
            }
        }

        // Mensaje final con menciones
        const textoResultados = `🎉 *¡La batalla ha terminado!*  
🏆 *Ganador:* @${ganadorId.split('@')[0]}  
💔 *Perdedor:* @${perdedorId.split('@')[0]}  

✨ *Recompensas:*  
- *Ganador:* 🪙 200 Cortana Coins, 🆙 ${xpGanadaGanador} XP  
- *Perdedor:* 🪙 50 Cortana Coins, 🆙 ${xpGanadaPerdedor} XP  

❤️ *Estado de las mascotas:*  
- ${ganadorMascota.nombre}: ${ganadorMascota.vida} HP  
- ${perdedorMascota.nombre}: ${perdedorMascota.vida} HP`;

        await conn.sendMessage(
            m.chat,
            { text: textoResultados, mentions: [ganadorId, perdedorId] },
            { quoted: m }
        );

        // Limpiar solicitud y guardar cambios
        delete cartera[challengerId].battleRequest;
        fs.writeFileSync('./cartera.json', JSON.stringify(cartera, null, 2));
    } catch (error) {
        console.error('❌ Error en el comando .siquiero:', error);
        return conn.sendMessage(m.chat, { text: '❌ *Error inesperado al procesar la batalla.*' }, { quoted: m });
    }
}
break;        


        
//curar        
case 'curar': {
    try {
        const userId = m.sender;

        // Verificar si el usuario tiene cartera
        if (!cartera[userId]) {
            return conn.sendMessage(
                m.chat,
                { text: "⚠️ *Primero necesitas crear tu cartera con `.crearcartera`.*" },
                { quoted: m }
            );
        }

        const userMascota = cartera[userId].mascotas[0];

        // Verificar si el usuario tiene suficientes monedas
        if (cartera[userId].coins < 100) {
            return conn.sendMessage(
                m.chat,
                { text: "💰 *No tienes suficientes Cortana Coins para curar a tu mascota.* (Necesitas 🪙 100)" },
                { quoted: m }
            );
        }

        // Curar la vida de la mascota
        userMascota.vida = 100;

        // Descontar monedas
        cartera[userId].coins -= 100;

        // Guardar cambios en la cartera
        fs.writeFileSync('./cartera.json', JSON.stringify(cartera, null, 2));

        // Responder al usuario
        const mensaje = `❤️ *Tu mascota ${userMascota.nombre} ha sido curada al máximo.*  
💰 *Se descontaron 🪙 100 Cortana Coins de tu cuenta.*  
✨ *Vida actual de la mascota:* 100 HP`;

        await conn.sendMessage(
            m.chat,
            { text: mensaje },
            { quoted: m }
        );
    } catch (error) {
        console.error('❌ Error en el comando .curar:', error);
        return conn.sendMessage(m.chat, { text: '❌ *Ocurrió un error al intentar curar a tu mascota. Intenta nuevamente.*' }, { quoted: m });
    }
}
break;
		
//batalla 	
case 'lanzarpelota': {
    try {
        await m.react('🎾'); // Reacción al usar el comando

        const userId = m.sender;
        if (!cartera[userId]) {
            return conn.sendMessage(
                m.chat,
                { text: "⚠️ *Primero necesitas crear tu cartera con `.crearcartera`.*" },
                { quoted: m }
            );
        }

        const userMascota = cartera[userId].mascotas[0];
        const currentTime = Date.now();
        const lastUsed = userMascota.lastLanzarPelota || 0;

        // Verificar intervalo de 5 minutos (300000ms)
        if (currentTime - lastUsed < 300000) {
            const remainingTime = Math.ceil((300000 - (currentTime - lastUsed)) / 1000);
            return conn.sendMessage(
                m.chat,
                { text: `⏳ *Espera ${remainingTime} segundos antes de usar este comando nuevamente.*` },
                { quoted: m }
            );
        }

        // Generar monedas y experiencia aleatorias
        const coinsGanados = Math.floor(Math.random() * 100) + 1;
        const xpGanada = Math.floor(Math.random() * 100) + 50;

        // Actualizar experiencia, monedas y tiempo del último uso
        cartera[userId].coins += coinsGanados;
        userMascota.experiencia += xpGanada;
        userMascota.lastLanzarPelota = currentTime;

        // Subir de nivel si alcanza la experiencia necesaria
        if (userMascota.experiencia >= userMascota.experienciaSiguienteNivel) {
            userMascota.nivel++;
            userMascota.experiencia -= userMascota.experienciaSiguienteNivel;
            userMascota.experienciaSiguienteNivel += 100 * userMascota.nivel;

            // Actualizar rango
            const rangos = [
                '🐾 Principiante',
                '🐾 Intermedio',
                '🐾 Avanzado',
                '🐾 Experto',
                '🐾 Leyenda',
            ];
            const nuevoRango = rangos[Math.min(Math.floor(userMascota.nivel / 10), rangos.length - 1)];
            userMascota.rango = nuevoRango;

            // Notificar subida de nivel
            await conn.sendMessage(
                m.chat,
                {
                    text: `🎉 *¡Felicidades! Tu mascota ${userMascota.nombre} ha subido al nivel ${userMascota.nivel}.*  
📊 *Nuevo rango:* ${nuevoRango}  
🆙 *Experiencia para el próximo nivel:* ${userMascota.experienciaSiguienteNivel - userMascota.experiencia}`,
                },
                { quoted: m }
            );
        }

        // Subir nivel de habilidades aleatoriamente
        const habilidadMejorada = userMascota.habilidades[Math.floor(Math.random() * userMascota.habilidades.length)];
        habilidadMejorada.nivel++;

        // Guardar cambios
        fs.writeFileSync('./cartera.json', JSON.stringify(cartera, null, 2));

        // Mensajes aleatorios
        const mensajesAleatorios = [
            "🎾 Tu mascota atrapó la pelota en el aire y lució increíble.",
            "🎾 ¡Qué lanzamiento perfecto! Tu mascota parece estar en las grandes ligas.",
            "🎾 Tu mascota persiguió la pelota y ganó aplausos de todos.",
            "🎾 ¡Increíble habilidad! Tu mascota atrapó la pelota con un giro.",
            "🎾 Tu mascota se divirtió y demostró que es la mejor.",
            // Agrega más mensajes aquí
        ];

        const mensajeAleatorio = mensajesAleatorios[Math.floor(Math.random() * mensajesAleatorios.length)];

        // Responder al usuario
        await conn.sendMessage(
            m.chat,
            {
                text: `${mensajeAleatorio}\n\n🎖️ *Recompensas:*  
🪙 ${coinsGanados} Cortana Coins  
🆙 ${xpGanada} XP  
✨ *Habilidad mejorada:* ${habilidadMejorada.nombre} (Nivel ${habilidadMejorada.nivel})`,
            },
            { quoted: m }
        );
    } catch (error) {
        console.error('❌ Error al usar el comando lanzarpelota:', error);
        m.reply('❌ *Ocurrió un error al intentar usar este comando. Intenta nuevamente.*');
    }
}
break;
	
case 'daragua': {
    try {
        await m.react('💧'); // Reacción al usar el comando

        const userId = m.sender;
        if (!cartera[userId]) {
            return conn.sendMessage(
                m.chat,
                { text: "⚠️ *Primero necesitas crear tu cartera con `.crearcartera`.*" },
                { quoted: m }
            );
        }

        const userMascota = cartera[userId].mascotas[0]; // Usamos la primera mascota por defecto
        const lastUsed = userMascota.lastDarAgua || 0;
        const now = Date.now();

        // Verificar intervalo de 2 horas (7200000 ms)
        if (now - lastUsed < 7200000) {
            const timeLeft = Math.ceil((7200000 - (now - lastUsed)) / 60000);
            return conn.sendMessage(
                m.chat,
                { text: `⏳ *Espera ${timeLeft} minutos antes de usar este comando nuevamente.*` },
                { quoted: m }
            );
        }

        const xpGanada = Math.floor(Math.random() * 150) + 50; // XP aleatoria entre 50 y 200

        // Incrementar experiencia de la mascota
        userMascota.experiencia += xpGanada;

        // Subir habilidades aleatoriamente
        const habilidadIndex = Math.floor(Math.random() * userMascota.habilidades.length);
        userMascota.habilidades[habilidadIndex].nivel++;

        // Revisar si la mascota sube de nivel
        if (userMascota.experiencia >= userMascota.experienciaSiguienteNivel) {
            userMascota.nivel++;
            userMascota.experiencia -= userMascota.experienciaSiguienteNivel;
            userMascota.experienciaSiguienteNivel += 100 * userMascota.nivel;

            // Actualizar rango según el nivel
            const rangos = [
                '🐾 Principiante',
                '🐾 Intermedio',
                '🐾 Avanzado',
                '🐾 Experto',
                '🐾 Leyenda',
            ];
            const nuevoRango = rangos[Math.min(Math.floor(userMascota.nivel / 10), rangos.length - 1)];
            userMascota.rango = nuevoRango;

            // Notificar subida de nivel
            await conn.sendMessage(
                m.chat,
                {
                    text: `🎉 *¡Felicidades! Tu mascota ${userMascota.nombre} ha subido al nivel ${userMascota.nivel}.*  
📊 *Nuevo rango:* ${nuevoRango}  
🆙 *Experiencia para el próximo nivel:* ${userMascota.experienciaSiguienteNivel - userMascota.experiencia}`,
                },
                { quoted: m }
            );
        }

        // Guardar cambios
        userMascota.lastDarAgua = now; // Actualizar el tiempo del último uso
        fs.writeFileSync('./cartera.json', JSON.stringify(cartera, null, 2));

        // Respuestas aleatorias
        const respuestas = [
            "🐾 *Tu mascota disfrutó del agua fresca.* 🏞️",
            "💧 *Le diste agua pura y fresca, ¡qué buen dueño eres!*",
            "🌊 *Tu mascota chapoteó en el agua y ganó energía.*",
            "🏡 *Un rato de agua y relax hizo muy feliz a tu mascota.*",
            "💦 *Tu mascota tomó agua y ahora está más fuerte.*",
            "🌟 *La hidratación es clave: ¡tu mascota está feliz!*",
            "🐕‍🦺 *Tu perro bebió agua y ahora tiene más energía.*",
            "🐈 *Tu gato agradeció el agua fresca con un ronroneo.*",
            "🐇 *El conejo saltó de felicidad después de beber agua.*",
            "🐁 *El ratón aprovechó cada gota del agua fresca.*",
            "🏞️ *Tu mascota está lista para nuevas aventuras.*",
            "🍀 *Un poco de agua hace maravillas: ¡tu mascota está radiante!*",
            "🌴 *La hidratación en su mejor momento: tu mascota está encantada.*",
            "🦴 *El agua revitalizó completamente a tu amigo peludo.*",
            "🎉 *Tu mascota se siente renovada después del agua.*",
            "🏖️ *Un trago de agua y tu mascota está lista para jugar.*",
            "🧼 *El agua pura ayudó a tu mascota a refrescarse.*",
            "🌊 *Tu mascota ahora está hidratada y enérgica.*",
            "💧 *El agua fresca revitalizó la energía de tu mascota.*",
            "🐾 *Hidratación completa: ¡tu mascota está lista para más aventuras!*",
        ];
        const textoAleatorio = respuestas[Math.floor(Math.random() * respuestas.length)];

        // Responder al usuario
        await conn.sendMessage(
            m.chat,
            {
                text: `${textoAleatorio}\n\n✨ *Has ganado:*\n🆙 ${xpGanada} XP\n\n💡 *Usa otros comandos para continuar mejorando a tu mascota.*`,
            },
            { quoted: m }
        );
    } catch (error) {
        console.error('❌ Error al dar agua:', error);
        m.reply('❌ *Ocurrió un error al intentar dar agua a tu mascota. Intenta nuevamente.*');
    }
}
break;
	
	
case 'darcomida': {
    try {
        await m.react('🍖'); // Reacción al usar el comando

        const userId = m.sender;

        // Verificar si el usuario tiene cartera
        if (!cartera[userId]) {
            return conn.sendMessage(
                m.chat,
                { text: "⚠️ *Primero necesitas crear tu cartera con `.crearcartera`.*" },
                { quoted: m }
            );
        }

        const userMascota = cartera[userId].mascotas[0];

        // Intervalo de 1 hora
        const lastTime = userMascota.lastFeedTime || 0;
        const now = Date.now();
        const interval = 60 * 60 * 1000; // 1 hora en milisegundos

        if (now - lastTime < interval) {
            const remainingTime = Math.ceil((interval - (now - lastTime)) / (60 * 1000));
            return conn.sendMessage(
                m.chat,
                {
                    text: `⏳ *Espera ${remainingTime} minutos antes de volver a usar este comando.*`,
                },
                { quoted: m }
            );
        }

        // Actualizar tiempo del último uso
        userMascota.lastFeedTime = now;

        // Ganancias aleatorias
        const coinsGanados = Math.floor(Math.random() * 50) + 10; // Entre 10 y 50
        const xpGanada = Math.floor(Math.random() * 500) + 200; // Entre 200 y 500

        // Incrementar experiencia y monedas
        cartera[userId].coins += coinsGanados;
        userMascota.experiencia += xpGanada;

        // Notificación automática de nivel si aplica
        if (userMascota.experiencia >= userMascota.experienciaSiguienteNivel) {
            userMascota.nivel++;
            userMascota.experiencia -= userMascota.experienciaSiguienteNivel;
            userMascota.experienciaSiguienteNivel += 100 * userMascota.nivel;

            // Actualizar rango según el nivel
            const rangos = [
                '🐾 Principiante',
                '🐾 Intermedio',
                '🐾 Avanzado',
                '🐾 Experto',
                '🐾 Leyenda',
            ];
            const nuevoRango = rangos[Math.min(Math.floor(userMascota.nivel / 10), rangos.length - 1)];
            userMascota.rango = nuevoRango;

            // Notificar subida de nivel
            await conn.sendMessage(
                m.chat,
                {
                    text: `🎉 *¡Felicidades! Tu mascota ${userMascota.nombre} ha subido al nivel ${userMascota.nivel}.*  
📊 *Nuevo rango:* ${nuevoRango}  
🆙 *Experiencia para el próximo nivel:* ${userMascota.experienciaSiguienteNivel - userMascota.experiencia}`,
                },
                { quoted: m }
            );
        }

        // Incrementar niveles aleatorios en habilidades
        userMascota.habilidades.forEach((habilidad) => {
            if (Math.random() > 0.7) {
                habilidad.nivel++;
            }
        });

        // Guardar cambios
        fs.writeFileSync('./cartera.json', JSON.stringify(cartera, null, 2));

        // Texto aleatorio
        const textos = [
            `🍗 *Tu mascota disfrutó un banquete delicioso y ganó:*  
🪙 ${coinsGanados} Cortana Coins  
🆙 ${xpGanada} XP`,
            `🥩 *Le diste comida premium a tu mascota. Ganaste:*  
🪙 ${coinsGanados} Cortana Coins  
🆙 ${xpGanada} XP`,
            `🦴 *Tu mascota está satisfecha. Recompensa:*  
🪙 ${coinsGanados} Cortana Coins  
🆙 ${xpGanada} XP`,
            `🌭 *Tu mascota comió y se siente con más energía. Obtuviste:*  
🪙 ${coinsGanados} Cortana Coins  
🆙 ${xpGanada} XP`,
        ];

        // Respuesta al comando
        const textoAleatorio = textos[Math.floor(Math.random() * textos.length)];
        await conn.sendMessage(
            m.chat,
            { text: textoAleatorio },
            { quoted: m }
        );
    } catch (error) {
        console.error('❌ Error al alimentar mascota:', error);
        m.reply('❌ *Ocurrió un error al intentar alimentar a tu mascota. Intenta nuevamente.*');
    }
}
break;
		
	
case 'darcariño': {
    try {
        await m.react('💖'); // Reacción al usar el comando

        const userId = m.sender;
        if (!cartera[userId]) {
            return conn.sendMessage(
                m.chat,
                { text: "⚠️ *Primero necesitas crear tu cartera con `.crearcartera`.*" },
                { quoted: m }
            );
        }

        const userMascota = cartera[userId].mascotas[0];
        const now = Date.now();

        // Verificar intervalo de tiempo
        if (userMascota.lastCariño && now - userMascota.lastCariño < 5 * 60 * 1000) {
            const remaining = Math.ceil((5 * 60 * 1000 - (now - userMascota.lastCariño)) / 1000);
            return conn.sendMessage(
                m.chat,
                { text: `⏳ *Debes esperar ${remaining} segundos antes de usar este comando nuevamente.*` },
                { quoted: m }
            );
        }

        const xpGanada = Math.floor(Math.random() * 100) + 50; // XP aleatoria entre 50 y 150
        userMascota.experiencia += xpGanada;

        // Subir de nivel si alcanza la experiencia necesaria
        if (userMascota.experiencia >= userMascota.experienciaSiguienteNivel) {
            userMascota.nivel++;
            userMascota.experiencia -= userMascota.experienciaSiguienteNivel;
            userMascota.experienciaSiguienteNivel += 100 * userMascota.nivel;

            // Actualizar rango según el nivel
            const rangos = [
                '🐾 Principiante',
                '🐾 Intermedio',
                '🐾 Avanzado',
                '🐾 Experto',
                '🐾 Leyenda',
            ];
            const nuevoRango = rangos[Math.min(Math.floor(userMascota.nivel / 10), rangos.length - 1)];
            userMascota.rango = nuevoRango;

            // Notificar subida de nivel
            await conn.sendMessage(
                m.chat,
                {
                    text: `🎉 *¡Felicidades! Tu mascota ${userMascota.nombre} ha subido al nivel ${userMascota.nivel}.*  
📊 *Nuevo rango:* ${nuevoRango}  
🆙 *Experiencia para el próximo nivel:* ${userMascota.experienciaSiguienteNivel - userMascota.experiencia}`,
                },
                { quoted: m }
            );
        }

        // Subir nivel de habilidades aleatoriamente
        const habilidadAleatoria = userMascota.habilidades[Math.floor(Math.random() * userMascota.habilidades.length)];
        habilidadAleatoria.nivel++;

        // Guardar la última vez que usó el comando
        userMascota.lastCariño = now;

        // Guardar cambios en el archivo
        fs.writeFileSync('./cartera.json', JSON.stringify(cartera, null, 2));

        // Textos aleatorios
        const textos = [
            `💖 *Tu mascota ${userMascota.nombre} recibió mucho cariño.*\n✨ *Ganaste ${xpGanada} XP.*`,
            `💖 *Tu mascota ${userMascota.nombre} se siente más querida.*\n✨ *Ganaste ${xpGanada} XP.*`,
            `💖 *Acariciaste a ${userMascota.nombre}, ahora te ama más.*\n✨ *Ganaste ${xpGanada} XP.*`,
            `💖 *¡Un momento especial con ${userMascota.nombre}!* ✨ *Ganaste ${xpGanada} XP.*`,
            `💖 *Tu mascota ${userMascota.nombre} ronronea de felicidad.*\n✨ *Ganaste ${xpGanada} XP.*`,
            `💖 *¡${userMascota.nombre} se siente en el paraíso con tanto cariño!* ✨ *Ganaste ${xpGanada} XP.*`,
            `💖 *Tu mascota ${userMascota.nombre} ahora confía más en ti.* ✨ *Ganaste ${xpGanada} XP.*`,
            `💖 *Acariciaste a ${userMascota.nombre}, su confianza en ti aumenta.* ✨ *Ganaste ${xpGanada} XP.*`,
            `💖 *Un momento especial para ${userMascota.nombre}, ahora brilla más.* ✨ *Ganaste ${xpGanada} XP.*`,
            `💖 *Tu mascota ${userMascota.nombre} mueve la cola con emoción.* ✨ *Ganaste ${xpGanada} XP.*`,
        ];

        // Respuesta al comando
        const mensajeAleatorio = textos[Math.floor(Math.random() * textos.length)];
        await conn.sendMessage(
            m.chat,
            { text: mensajeAleatorio },
            { quoted: m }
        );
    } catch (error) {
        console.error('❌ Error al dar cariño:', error);
        m.reply('❌ *Ocurrió un error al intentar dar cariño a tu mascota. Intenta nuevamente.*');
    }
}
break;
	
case 'entrenar': {
    try {
        await m.react('✅'); // Reacción al usar el comando

        const userId = m.sender;
        if (!cartera[userId]) {
            return conn.sendMessage(
                m.chat,
                { text: "⚠️ *Primero necesitas crear tu cartera con `.crearcartera`.*" },
                { quoted: m }
            );
        }

        const mascota = cartera[userId].mascotas[0];
        const tiempoActual = Date.now();

        if (!mascota.ultimoEntrenamiento) {
            mascota.ultimoEntrenamiento = 0;
        }

        const tiempoRestante = (20 * 60 * 1000) - (tiempoActual - mascota.ultimoEntrenamiento);
        if (tiempoRestante > 0) {
            const minutos = Math.ceil(tiempoRestante / (60 * 1000));
            return conn.sendMessage(
                m.chat,
                { text: `⏳ *Debes esperar ${minutos} minutos para volver a entrenar a tu mascota.*` },
                { quoted: m }
            );
        }

        // Resultados aleatorios
        const coinsGanados = Math.floor(Math.random() * 50) + 1; // Entre 1 y 50
        const xpGanada = Math.floor(Math.random() * 500) + 100; // Entre 100 y 500
        const penalizacion = Math.random() < 0.3 ? Math.floor(Math.random() * 20) + 1 : 0; // 30% de perder entre 1 y 20 coins

        // Actualizar estadísticas
        cartera[userId].coins += (coinsGanados - penalizacion);
        mascota.experiencia += xpGanada;

        // Aumentar niveles de habilidades aleatoriamente
        mascota.habilidades.forEach(habilidad => {
            if (Math.random() < 0.5) { // 50% de probabilidad de subir de nivel
                habilidad.nivel++;
            }
        });

        // Subir nivel de la mascota si alcanza la experiencia necesaria
        if (mascota.experiencia >= mascota.experienciaSiguienteNivel) {
            mascota.nivel++;
            mascota.experiencia -= mascota.experienciaSiguienteNivel;
            mascota.experienciaSiguienteNivel += 100 * mascota.nivel;

            // Actualizar rango según el nivel
            const rangos = [
                '🐾 Principiante',
                '🐾 Intermedio',
                '🐾 Avanzado',
                '🐾 Experto',
                '🐾 Leyenda',
            ];
            const nuevoRango = rangos[Math.min(Math.floor(mascota.nivel / 10), rangos.length - 1)];
            mascota.rango = nuevoRango;

            // Notificar subida de nivel
            await conn.sendMessage(
                m.chat,
                {
                    text: `🎉 *¡Felicidades! Tu mascota ${mascota.nombre} ha subido al nivel ${mascota.nivel}.*  
📊 *Nuevo rango:* ${nuevoRango}  
🆙 *Experiencia para el próximo nivel:* ${mascota.experienciaSiguienteNivel - mascota.experiencia}`,
                },
                { quoted: m }
            );
        }

        // Actualizar último entrenamiento
        mascota.ultimoEntrenamiento = tiempoActual;

        // Guardar cambios
        fs.writeFileSync('./cartera.json', JSON.stringify(cartera, null, 2));

        // Textos aleatorios
        const textos = [
            `🐾 Tu mascota ${mascota.nombre} hizo un salto increíble y ganó 🪙 ${coinsGanados} Cortana Coins y 🆙 ${xpGanada} XP.`,
            `💪 Entrenamiento intensivo: ¡Tu mascota ganó 🪙 ${coinsGanados} y 🆙 ${xpGanada} XP!`,
            `🏋️‍♂️ Durante el entrenamiento, tu mascota se enfrentó a un reto difícil y obtuvo 🪙 ${coinsGanados} y 🆙 ${xpGanada} XP.`,
            `😢 Tu mascota tuvo un pequeño accidente. Perdió 🪙 ${penalizacion} Cortana Coins, pero ganó 🆙 ${xpGanada} XP.`,
            `✨ ¡Qué entrenamiento productivo! ${mascota.nombre} ganó 🪙 ${coinsGanados} y 🆙 ${xpGanada} XP.`,
            `😅 Mientras entrenaba, ${mascota.nombre} causó un pequeño lío. Perdiste 🪙 ${penalizacion}, pero ganaste 🆙 ${xpGanada}.`,
            // Agregar 14 textos más aquí...
        ];

        const textoAleatorio = textos[Math.floor(Math.random() * textos.length)];

        // Respuesta final
        await conn.sendMessage(
            m.chat,
            { text: textoAleatorio },
            { quoted: m }
        );
    } catch (error) {
        console.error('❌ Error al entrenar mascota:', error);
        m.reply('❌ *Ocurrió un error al intentar entrenar a tu mascota. Intenta nuevamente.*');
    }
}
break;	
	
case 'pasear': {
    try {
        await m.react('✅'); // Reacción al usar el comando

        const userId = m.sender;
        const userCartera = cartera[userId];

        if (!userCartera) {
            return conn.sendMessage(
                m.chat,
                { text: "⚠️ *Primero necesitas crear tu cartera con `.crearcartera`.*" },
                { quoted: m }
            );
        }

        const now = Date.now();
        const cooldown = 10 * 60 * 1000; // 10 minutos en milisegundos

        if (userCartera.lastPasiar && now - userCartera.lastPasiar < cooldown) {
            const remainingTime = Math.ceil((cooldown - (now - userCartera.lastPasiar)) / 60000);
            return conn.sendMessage(
                m.chat,
                { text: `⏳ *Debes esperar ${remainingTime} minutos para volver a pasear a tu mascota.*` },
                { quoted: m }
            );
        }

        const userMascota = userCartera.mascotas[0]; // Usar la primera mascota del usuario
        const xpGanada = Math.floor(Math.random() * 150) + 50; // XP aleatoria entre 50 y 200
        const habilidadIndex = Math.floor(Math.random() * userMascota.habilidades.length); // Índice aleatorio para habilidad

        // Incrementar XP de la mascota
        userMascota.experiencia += xpGanada;
        const habilidadSeleccionada = userMascota.habilidades[habilidadIndex];
        habilidadSeleccionada.nivel++;

        // Revisar si la mascota sube de nivel
        if (userMascota.experiencia >= userMascota.experienciaSiguienteNivel) {
            userMascota.nivel++;
            userMascota.experiencia -= userMascota.experienciaSiguienteNivel;
            userMascota.experienciaSiguienteNivel += 100 * userMascota.nivel;

            // Actualizar rango según el nivel
            const rangos = [
                '🐾 Principiante',
                '🐾 Intermedio',
                '🐾 Avanzado',
                '🐾 Experto',
                '🐾 Leyenda',
            ];
            const nuevoRango = rangos[Math.min(Math.floor(userMascota.nivel / 10), rangos.length - 1)];
            userMascota.rango = nuevoRango;

            // Notificar subida de nivel
            await conn.sendMessage(
                m.chat,
                {
                    text: `🎉 *¡Felicidades! Tu mascota ${userMascota.nombre} ha subido al nivel ${userMascota.nivel}.*  
📊 *Nuevo rango:* ${nuevoRango}  
🆙 *Experiencia para el próximo nivel:* ${userMascota.experienciaSiguienteNivel - userMascota.experiencia}`,
                },
                { quoted: m }
            );
        }

        // Textos aleatorios con emojis neutrales
        const textosAleatorios = [
            `🌳 Tu mascota disfrutó un paseo tranquilo y ganó ${xpGanada} XP.`,
            `☀️ Tu mascota exploró al aire libre y obtuvo ${xpGanada} XP.`,
            `🌼 Tu mascota se detuvo a oler flores y ganó ${xpGanada} XP.`,
            `🍂 Tu mascota jugó con hojas secas y obtuvo ${xpGanada} XP.`,
            `🌿 Tu mascota corrió por la hierba y ganó ${xpGanada} XP.`,
            `🌊 Tu mascota disfrutó de la brisa junto al río y ganó ${xpGanada} XP.`,
            `🍁 Tu mascota saltó entre montículos de hojas y ganó ${xpGanada} XP.`,
            `🌟 Tu mascota descubrió un sendero secreto y obtuvo ${xpGanada} XP.`,
            `💧 Tu mascota bebió agua fresca y ganó ${xpGanada} XP.`,
            `🍃 Tu mascota siguió una mariposa y ganó ${xpGanada} XP.`,
            `🌞 Tu mascota jugó bajo el sol y ganó ${xpGanada} XP.`,
            `🌙 Tu mascota disfrutó de un paseo nocturno y ganó ${xpGanada} XP.`,
            `🔥 Tu mascota encontró un campamento y obtuvo ${xpGanada} XP.`,
            `🎋 Tu mascota se escondió en los arbustos y ganó ${xpGanada} XP.`,
            `🌌 Tu mascota observó las estrellas y ganó ${xpGanada} XP.`,
            `🌻 Tu mascota descubrió un campo de girasoles y ganó ${xpGanada} XP.`,
            `🏞️ Tu mascota subió una colina y obtuvo ${xpGanada} XP.`,
            `🏕️ Tu mascota exploró un campamento y ganó ${xpGanada} XP.`,
            `🪵 Tu mascota jugó entre troncos y ganó ${xpGanada} XP.`,
            `🍄 Tu mascota encontró hongos interesantes y ganó ${xpGanada} XP.`,
        ];

        // Guardar cambios y establecer el tiempo del último paseo
        userCartera.lastPasiar = now;
        fs.writeFileSync('./cartera.json', JSON.stringify(cartera, null, 2));

        // Responder al usuario
        const textoRandom = textosAleatorios[Math.floor(Math.random() * textosAleatorios.length)];
        await conn.sendMessage(
            m.chat,
            {
                text: `${textoRandom}\n✨ *La habilidad ${habilidadSeleccionada.nombre} subió a nivel ${habilidadSeleccionada.nivel}.*`,
            },
            { quoted: m }
        );
    } catch (error) {
        console.error('❌ Error al pasear mascota:', error);
        m.reply('❌ *Ocurrió un error al intentar pasear a tu mascota. Intenta nuevamente.*');
    }
}
break;

case 'casar': {
    try {
        await m.react('✅'); // Reacción al usar el comando

        const userId = m.sender;
        if (!cartera[userId]) {
            return conn.sendMessage(
                m.chat,
                { text: "⚠️ *Primero necesitas crear tu cartera con `.crearcartera`.*" },
                { quoted: m }
            );
        }

        // Revisar si ya usó el comando recientemente
        if (global.lastCasar && global.lastCasar[userId]) {
            const tiempoRestante = (global.lastCasar[userId] - Date.now()) / 1000;
            if (tiempoRestante > 0) {
                return conn.sendMessage(
                    m.chat,
                    { text: `⏳ *Debes esperar ${Math.ceil(tiempoRestante / 60)} minutos antes de usar este comando nuevamente.*` },
                    { quoted: m }
                );
            }
        }

        const userMascota = cartera[userId].mascotas[0];

        // Generar recompensas aleatorias
        const coinsGanados = Math.floor(Math.random() * 100) + 1;
        const xpGanada = Math.floor(Math.random() * 1000) + 500;

        // Incrementar experiencia y monedas
        cartera[userId].coins += coinsGanados;
        userMascota.experiencia += xpGanada;

        // Textos aleatorios para el comando
        const textos = [
            `🐾 Tu mascota ${userMascota.nombre} cazó un ratón y ganó ${coinsGanados} 🪙 Cortana Coins y ${xpGanada} XP.`,
            `🐾 ¡Increíble! ${userMascota.nombre} atrapó un conejo. Ganaste ${coinsGanados} 🪙 y ${xpGanada} XP.`,
            `🐾 ${userMascota.nombre} ayudó a limpiar el jardín. Recompensa: ${coinsGanados} 🪙 y ${xpGanada} XP.`,
            `🐾 Tu ${userMascota.nombre} resolvió un rompecabezas y ganó ${coinsGanados} 🪙 y ${xpGanada} XP.`,
            `🐾 ${userMascota.nombre} encontró un tesoro enterrado. Obtuviste ${coinsGanados} 🪙 y ${xpGanada} XP.`,
            `🐾 ${userMascota.nombre} ayudó en la cocina y ganó ${coinsGanados} 🪙 y ${xpGanada} XP.`,
            `🐾 ${userMascota.nombre} protegió tu casa de un intruso. Recompensa: ${coinsGanados} 🪙 y ${xpGanada} XP.`,
            `🐾 ${userMascota.nombre} realizó un truco impresionante. Ganaste ${coinsGanados} 🪙 y ${xpGanada} XP.`,
            `🐾 ${userMascota.nombre} salvó a un animal perdido. Obtuviste ${coinsGanados} 🪙 y ${xpGanada} XP.`,
            `🐾 ${userMascota.nombre} hizo un gran salto en el parque. Ganaste ${coinsGanados} 🪙 y ${xpGanada} XP.`,
            `🐾 ${userMascota.nombre} participó en un concurso y ganó ${coinsGanados} 🪙 y ${xpGanada} XP.`,
            `🐾 ${userMascota.nombre} cuidó de otros animales y obtuvo ${coinsGanados} 🪙 y ${xpGanada} XP.`,
            `🐾 ${userMascota.nombre} exploró el vecindario y encontró ${coinsGanados} 🪙 y ${xpGanada} XP.`,
            `🐾 ${userMascota.nombre} resolvió un misterio en el parque. Ganaste ${coinsGanados} 🪙 y ${xpGanada} XP.`,
            `🐾 ${userMascota.nombre} ayudó a un niño perdido. Obtuviste ${coinsGanados} 🪙 y ${xpGanada} XP.`,
            `🐾 ${userMascota.nombre} fue el héroe del día y ganó ${coinsGanados} 🪙 y ${xpGanada} XP.`,
            `🐾 ${userMascota.nombre} organizó una reunión de mascotas. Recompensa: ${coinsGanados} 🪙 y ${xpGanada} XP.`,
            `🐾 ${userMascota.nombre} recogió frutas y obtuvo ${coinsGanados} 🪙 y ${xpGanada} XP.`,
            `🐾 ${userMascota.nombre} ayudó a un granjero y ganó ${coinsGanados} 🪙 y ${xpGanada} XP.`,
            `🐾 ${userMascota.nombre} realizó una carrera y ganó ${coinsGanados} 🪙 y ${xpGanada} XP.`,
        ];

        const textoAleatorio = textos[Math.floor(Math.random() * textos.length)];

        // Revisar si sube de nivel
        if (userMascota.experiencia >= userMascota.experienciaSiguienteNivel) {
            userMascota.nivel++;
            userMascota.experiencia -= userMascota.experienciaSiguienteNivel;
            userMascota.experienciaSiguienteNivel += 100 * userMascota.nivel;

            // Actualizar rango según el nivel
            const rangos = [
                '🐾 Principiante',
                '🐾 Intermedio',
                '🐾 Avanzado',
                '🐾 Experto',
                '🐾 Leyenda',
            ];
            const nuevoRango = rangos[Math.min(Math.floor(userMascota.nivel / 10), rangos.length - 1)];
            userMascota.rango = nuevoRango;

            // Subir habilidades aleatoriamente
            const habilidadAleatoria = userMascota.habilidades[Math.floor(Math.random() * userMascota.habilidades.length)];
            habilidadAleatoria.nivel++;

            // Notificar subida de nivel
            await conn.sendMessage(
                m.chat,
                {
                    text: `🎉 *¡Felicidades! Tu mascota ${userMascota.nombre} subió al nivel ${userMascota.nivel}.*  
📊 *Nuevo rango:* ${nuevoRango}  
🆙 *Experiencia para el próximo nivel:* ${userMascota.experienciaSiguienteNivel - userMascota.experiencia}  
✨ *Habilidad mejorada:* ${habilidadAleatoria.nombre} (Nivel ${habilidadAleatoria.nivel})`,
                },
                { quoted: m }
            );
        }

        // Guardar cambios
        fs.writeFileSync('./cartera.json', JSON.stringify(cartera, null, 2));

        // Guardar tiempo del último uso
        if (!global.lastCasar) global.lastCasar = {};
        global.lastCasar[userId] = Date.now() + 15 * 60 * 1000; // 15 minutos

        // Respuesta al comando
        await conn.sendMessage(
            m.chat,
            {
                text: textoAleatorio,
            },
            { quoted: m }
        );
    } catch (error) {
        console.error('❌ Error al usar el comando .casar:', error);
        m.reply('❌ *Ocurrió un error al intentar ejecutar el comando. Intenta nuevamente.*');
    }
}
break;		

	
case 'crearcartera': {
    try {
        await m.react('✅'); // Reacción al usar el comando

        const userId = m.sender;
        if (cartera[userId]) {
            return conn.sendMessage(
                m.chat,
                { text: "⚠️ *Ya tienes una cartera creada.* Usa `.vermascotas` para ver tus mascotas." },
                { quoted: m }
            );
        }

        // Mascotas iniciales con emojis y habilidades
        const mascotas = {
            raton: { emoji: '🐁', habilidades: ['Velocidad', 'Agilidad', 'Evasión'] },
            conejo: { emoji: '🐇', habilidades: ['Saltar', 'Velocidad', 'Camuflaje'] },
            perro: { emoji: '🐶', habilidades: ['Fuerza', 'Lealtad', 'Protección'] },
            gato: { emoji: '🐈‍⬛', habilidades: ['Sigilo', 'Reflejos', 'Curiosidad'] },
        };

        // Seleccionar una mascota aleatoria
        const keys = Object.keys(mascotas);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const mascotaSeleccionada = randomKey;

        // Establecer la información inicial de la mascota
        const mascotaInfo = {
            nombre: `${mascotas[mascotaSeleccionada].emoji} ${mascotaSeleccionada.charAt(0).toUpperCase() + mascotaSeleccionada.slice(1)}`,
            habilidades: mascotas[mascotaSeleccionada].habilidades.map((hab) => ({
                nombre: hab,
                nivel: 1,
            })),
            vida: 100, // Vida igual para todas las mascotas
            nivel: 1,
            rango: '🐾 Principiante', // Rango inicial
            experiencia: 0,
            experienciaSiguienteNivel: 100, // XP necesaria para subir al siguiente nivel
        };

        // Crear la cartera del usuario
        cartera[userId] = {
            coins: 0,
            mascotas: [mascotaInfo],
        };

        // Guardar en el archivo cartera.json
        fs.writeFileSync('./cartera.json', JSON.stringify(cartera, null, 2));

        // Respuesta al usuario
        let habilidadesText = mascotaInfo.habilidades
            .map((hab) => `🔹 ${hab.nombre} (Nivel ${hab.nivel})`)
            .join('\n');

        let mensaje = `
🎉 *¡Cartera creada con éxito!* 🎉

🐾 *Te ha tocado una mascota:* ${mascotas[mascotaSeleccionada].emoji} ${mascotaInfo.nombre}  
📊 *Rango:* ${mascotaInfo.rango}  
🆙 *Nivel inicial:* ${mascotaInfo.nivel}  
❤️ *Vida inicial:* ${mascotaInfo.vida}

✨ *Habilidades iniciales:*  
${habilidadesText}

🔑 *Usa el comando* \`.vermascotas\` *para ver tus mascotas y sus estadísticas.*  
💡 *Sube de nivel a tu mascota usando los comandos disponibles en el menú.*`;

        await conn.sendMessage(
            m.chat,
            { text: mensaje, mentions: [m.sender] },
            { quoted: m }
        );
    } catch (error) {
        console.error('❌ Error creando cartera:', error);
        m.reply('❌ *Ocurrió un error al intentar crear la cartera. Intenta nuevamente.*');
    }
}
break;
//ver mascota				
case 'vermascotas': {
    try {
        await m.react('✅'); // Reacción al usar el comando

        const userId = m.sender;

        // Verificar si el usuario tiene una cartera creada
        if (!cartera[userId]) {
            return conn.sendMessage(
                m.chat,
                { text: "⚠️ *Primero necesitas crear tu cartera con `.crearcartera`.*" },
                { quoted: m }
            );
        }

        const userMascotas = cartera[userId].mascotas;

        if (!userMascotas || userMascotas.length === 0) {
            return conn.sendMessage(
                m.chat,
                { text: "🐾 *No tienes ninguna mascota actualmente.* Usa `.crearcartera` o compra una en la tienda." },
                { quoted: m }
            );
        }

        // Construir texto con las estadísticas de las mascotas
        let textoMascotas = `🐾 *Tus Mascotas y Estadísticas:* 🐾\n\n`;
        userMascotas.forEach((mascota, index) => {
            let habilidadesText = mascota.habilidades
                .map((hab) => `🔹 ${hab.nombre} (Nivel ${hab.nivel})`)
                .join('\n');

            textoMascotas += `🦴 *Mascota ${index + 1}:* ${mascota.nombre}\n` +
                `📊 *Rango:* ${mascota.rango}\n` +
                `🆙 *Nivel:* ${mascota.nivel}\n` +
                `❤️ *Vida:* ${mascota.vida}/100\n` +
                `✨ *Experiencia:* ${mascota.experiencia} / ${mascota.experienciaSiguienteNivel}\n` +
                `🌟 *Habilidades:*\n${habilidadesText}\n` +
                `———————————————\n`;
        });

        // Agregar lista de comandos disponibles
        textoMascotas += `🛠️ *Comandos para Subir de Nivel y Ganar Cortana Coins:* 🪙\n` +
            `- *.casar* (15 min intervalo)\n` +
            `- *.darcomida* (1 hora intervalo)\n` +
            `- *.daragua* (2 horas intervalo)\n` +
            `- *.entrenar* (20 min intervalo)\n` +
            `- *.pasear* (10 min intervalo)\n` +
            `- *.presumir* (5 min intervalo)\n` +
            `- *.batalla1* (10 min intervalo)\n` +
            `- *.darcariño* (5 min intervalo)\n` +
            `- *.estadomascota* (mira el estado de tu mascota principal)\n` +
            `- *.supermascota* (24 horas intervalo)\n` +
            `- *.curar* (cuesta 100 Cortana Coins)\n` +
            `- *.lanzarpelota* (5 min intervalo)\n\n` +
            `💡 *Usa estos comandos para mejorar tus mascotas y ganar monedas.*`;

        // URL de la imagen correspondiente
        const imageUrl = 'https://cloud.dorratz.com/files/bdc27b328f2f4c1fe018bbb0d6a5871b'; // Reemplaza con la URL de la imagen que desees mostrar

        // Enviar mensaje con la imagen y el texto
        await conn.sendMessage(
            m.chat,
            {
                image: { url: imageUrl }, // Enviar la imagen
                caption: textoMascotas, // Texto que acompaña la imagen
            },
            { quoted: m }
        );
    } catch (error) {
        console.error('❌ Error mostrando las mascotas:', error);
        m.reply('❌ *Ocurrió un error al intentar mostrar tus mascotas. Intenta nuevamente.*');
    }
}
break;

case 'supermascota': {
    try {
        const userId = m.sender;

        if (!cartera[userId]) {
            return conn.sendMessage(
                m.chat,
                { text: "⚠️ *Primero necesitas crear tu cartera con `.crearcartera`.*" },
                { quoted: m }
            );
        }

        const now = Date.now();
        if (cartera[userId].lastSupermascota && now - cartera[userId].lastSupermascota < 86400000) {
            const remainingTime = Math.ceil((86400000 - (now - cartera[userId].lastSupermascota)) / (60 * 60 * 1000));
            return conn.sendMessage(
                m.chat,
                { text: `⏳ *Espera ${remainingTime} horas antes de reclamar tu próxima recompensa de .supermascota.*` },
                { quoted: m }
            );
        }

        // Generar recompensas aleatorias
        const xpGanada = Math.floor(Math.random() * 4500) + 500; // Entre 500 y 5000
        const coinsGanados = Math.floor(Math.random() * 800) + 200; // Entre 200 y 1000

        // Aplicar recompensas
        const userMascota = cartera[userId].mascotas[0];
        userMascota.experiencia += xpGanada;
        cartera[userId].coins += coinsGanados;

        // Guardar última vez usado
        cartera[userId].lastSupermascota = now;

        // Subida de nivel automática
        while (userMascota.experiencia >= userMascota.experienciaSiguienteNivel) {
            userMascota.nivel++;
            userMascota.experiencia -= userMascota.experienciaSiguienteNivel;
            userMascota.experienciaSiguienteNivel += 100 * userMascota.nivel;
        }

        fs.writeFileSync('./cartera.json', JSON.stringify(cartera, null, 2));

        // Mensaje de confirmación
        const mensaje = `🎉 *¡Has reclamado tu recompensa de .supermascota!*  
🆙 *XP ganada:* ${xpGanada}  
🪙 *Cortana Coins ganadas:* ${coinsGanados}  

🐾 *Tu mascota ahora tiene:*  
- 🆙 Nivel: ${userMascota.nivel}  
- ❤️ Vida: ${userMascota.vida}`;

        await conn.sendMessage(
            m.chat,
            { text: mensaje },
            { quoted: m }
        );
    } catch (error) {
        console.error('❌ Error en el comando .supermascota:', error);
        return conn.sendMessage(m.chat, { text: '❌ *Ocurrió un error al reclamar la recompensa de .supermascota.*' }, { quoted: m });
    }
}
break;

case 'presumir': {
    try {
        const userId = m.sender;

        if (!cartera[userId]) {
            return conn.sendMessage(
                m.chat,
                { text: "⚠️ *Primero necesitas crear tu cartera con `.crearcartera`.*" },
                { quoted: m }
            );
        }

        const now = Date.now();
        if (cartera[userId].lastPresumir && now - cartera[userId].lastPresumir < 300000) {
            const remainingTime = Math.ceil((300000 - (now - cartera[userId].lastPresumir)) / 60000);
            return conn.sendMessage(
                m.chat,
                { text: `⏳ *Espera ${remainingTime} minutos antes de volver a usar el comando .presumir.*` },
                { quoted: m }
            );
        }

        // Generar recompensas aleatorias
        const xpGanada = Math.floor(Math.random() * 200) + 50; // Entre 50 y 250 XP
        const coinsGanados = Math.floor(Math.random() * 50) + 10; // Entre 10 y 60 coins

        // Aplicar recompensas
        const userMascota = cartera[userId].mascotas[0];
        userMascota.experiencia += xpGanada;
        cartera[userId].coins += coinsGanados;

        // Guardar última vez usado
        cartera[userId].lastPresumir = now;

        // Subida de nivel automática
        while (userMascota.experiencia >= userMascota.experienciaSiguienteNivel) {
            userMascota.nivel++;
            userMascota.experiencia -= userMascota.experienciaSiguienteNivel;
            userMascota.experienciaSiguienteNivel += 100 * userMascota.nivel;
        }

        // Incrementar habilidades aleatoriamente
        const habilidadIndex = Math.floor(Math.random() * userMascota.habilidades.length);
        userMascota.habilidades[habilidadIndex].nivel++;

        fs.writeFileSync('./cartera.json', JSON.stringify(cartera, null, 2));

        // Textos aleatorios
        const textos = [
            "💥 *Tu mascota impresionó a todos en el parque y ganó popularidad.*",
            "🔥 *Presumiste a tu mascota y todos quedaron asombrados.*",
            "🎉 *La energía de tu mascota se robó las miradas del lugar.*",
            "✨ *Un espectáculo digno de una estrella. ¡Qué gran mascota tienes!*",
            "🏆 *Tu mascota recibió aplausos y ganó el respeto de los demás.*",
            "🐾 *Un día increíble para presumir a tu compañero.*",
            "🌟 *¡Tu mascota brilló como nunca antes!*",
            "🎭 *Fue el alma del evento. ¡Un éxito total!*",
            "🚀 *Tu mascota mostró todo su potencial. ¡Increíble!*",
            "🏅 *Orgullo de dueño. ¡Gran día para presumir!*",
            "💎 *Tu mascota deslumbró con sus habilidades.*",
            "🔥 *Todos hablarán de este momento épico.*",
            "🎶 *Un momento mágico para tu mascota y tú.*",
            "💥 *Impresionaste a todos con el talento de tu mascota.*",
            "✨ *Una actuación de alto nivel. ¡Felicitaciones!*",
            "⚡ *Fue un espectáculo lleno de emoción y energía.*",
            "🌟 *Tu mascota es una verdadera estrella.*",
            "🎭 *Un día inolvidable para presumir a tu mascota.*",
            "🚀 *Tu compañero mostró habilidades impresionantes.*",
            "🏅 *¡Una mascota digna de aplausos y premios!*",
        ];

        const textoAleatorio = textos[Math.floor(Math.random() * textos.length)];

        // Respuesta final
        const mensaje = `${textoAleatorio}  
🆙 *XP ganada:* ${xpGanada}  
🪙 *Cortana Coins ganadas:* ${coinsGanados}`;

        await conn.sendMessage(
            m.chat,
            { text: mensaje },
            { quoted: m }
        );
    } catch (error) {
        console.error('❌ Error en el comando .presumir:', error);
        return conn.sendMessage(m.chat, { text: '❌ *Ocurrió un error al presumir tu mascota.*' }, { quoted: m });
    }
}
break;

		
case 'saldo': {
    try {
        await m.react('💰'); // Reacción al usar el comando

        const userId = m.sender;
        if (!cartera[userId]) {
            return conn.sendMessage(
                m.chat,
                { text: "⚠️ *No tienes una cartera creada.* Usa `.crearcartera` para comenzar." },
                { quoted: m }
            );
        }

        // Validar si coins existe y es un número
        const coins = typeof cartera[userId].coins === 'number' ? cartera[userId].coins : 0;

        // Construir el mensaje
        const mensaje = `
╭──────☆──────╮
💰 *CORTANA COINS* 💰
╰──────☆──────╯

👤 *Usuario:* @${userId.split('@')[0]}
🪙 *Saldo Actual:* ${coins} Cortana Coins

✨ *¡Usa tus monedas para comprar y mejorar tus mascotas!*  
💡 *Comandos útiles:*  
- \`.vermascotas\`  
- \`.tiendamall\`  

🌟 *¡Sigue ganando monedas completando actividades con tus mascotas!*
━━━━━━━━━━━━━━━━━━
📌 *Desarrollado por CORTANA 2.0*
━━━━━━━━━━━━━━━━━━`;

        // Enviar el mensaje
        await conn.sendMessage(
            m.chat,
            {
                text: mensaje,
                mentions: [m.sender],
            },
            { quoted: m }
        );
    } catch (error) {
        console.error('❌ Error consultando saldo:', error);
        m.reply('❌ *Ocurrió un error al intentar consultar tu saldo.*');
    }
}
break;
//elimimar cartera
case 'deletecartera': {
    try {
        await m.react('❌'); // Reacción al usar el comando

        const userId = m.sender;

        if (!cartera[userId]) {
            return conn.sendMessage(
                m.chat,
                { text: "⚠️ *No tienes una cartera creada.* Usa `.crearcartera` para crear una." },
                { quoted: m }
            );
        }

        // Guardar el estado de confirmación
        if (!global.confirmDelete) global.confirmDelete = {};
        global.confirmDelete[userId] = true;

        // Notificar al usuario
        await conn.sendMessage(
            m.chat,
            {
                text: "⚠️ *¿Estás seguro de que deseas eliminar tu cartera?*\nTodos tus datos, mascotas y monedas se perderán.\n\nResponde con `.ok` para confirmar.",
                mentions: [m.sender],
            },
            { quoted: m }
        );
    } catch (error) {
        console.error('❌ Error preparando eliminación de cartera:', error);
        m.reply('❌ *Ocurrió un error al intentar preparar la eliminación de tu cartera. Intenta nuevamente.*');
    }
}
break;

case 'ok': {
    try {
        await m.react('✅'); // Reacción al usar el comando

        const userId = m.sender;

        // Verificar si el usuario solicitó la eliminación
        if (!global.confirmDelete || !global.confirmDelete[userId]) {
            return conn.sendMessage(
                m.chat,
                { text: "⚠️ *No hay una eliminación de cartera pendiente.* Usa `.deletecartera` primero." },
                { quoted: m }
            );
        }

        // Eliminar la cartera
        delete cartera[userId];
        delete global.confirmDelete[userId];
        fs.writeFileSync('./cartera.json', JSON.stringify(cartera, null, 2));

        await conn.sendMessage(
            m.chat,
            { text: "✅ *Tu cartera ha sido eliminada con éxito.*" },
            { quoted: m }
        );
    } catch (error) {
        console.error('❌ Error eliminando cartera:', error);
        m.reply('❌ *Ocurrió un error al intentar eliminar tu cartera. Intenta nuevamente.*');
    }
}
break;
//mascotas para comprar
case 'changuito': {
    try {
        const userId = m.sender;

        if (!cartera[userId]) {
            return conn.sendMessage(
                m.chat,
                { text: "⚠️ *Primero necesitas crear tu cartera con `.crearcartera`.*" },
                { quoted: m }
            );
        }

        if (cartera[userId].coins < 100) {
            return conn.sendMessage(
                m.chat,
                { text: "💰 *No tienes suficientes Cortana Coins para comprar a 🐒 Changuito.* (Necesitas 🪙 100)" },
                { quoted: m }
            );
        }

        // Crear la mascota
        const nuevaMascota = {
            nombre: "🐒 Changuito",
            habilidades: [
                { nombre: 'Agilidad', nivel: 1 },
                { nombre: 'Saltos', nivel: 1 },
                { nombre: 'Evasión', nivel: 1 },
            ],
            vida: 100,
            nivel: 1,
            rango: '🐾 Principiante',
            experiencia: 0,
            experienciaSiguienteNivel: 100,
        };

        // Descontar monedas y añadir la mascota
        cartera[userId].coins -= 100;
        cartera[userId].mascotas.push(nuevaMascota);

        fs.writeFileSync('./cartera.json', JSON.stringify(cartera, null, 2));

        // Mensaje de confirmación
        const mensaje = `🎉 *¡Felicidades! Has comprado a 🐒 Changuito.*  
📊 *Habilidades iniciales:*  
🔹 Agilidad (Nivel 1)  
🔹 Saltos (Nivel 1)  
🔹 Evasión (Nivel 1)  
💰 *Se descontaron 🪙 100 Cortana Coins de tu cuenta.*  
✨ *Tu mascota está lista para comenzar su aventura.*`;

        await conn.sendMessage(
            m.chat,
            { text: mensaje },
            { quoted: m }
        );
    } catch (error) {
        console.error('❌ Error en el comando .changuito:', error);
        return conn.sendMessage(m.chat, { text: '❌ *Ocurrió un error al intentar comprar a 🐒 Changuito.*' }, { quoted: m });
    }
}
break;

case 'leon': {
    try {
        const userId = m.sender;

        if (!cartera[userId]) {
            return conn.sendMessage(
                m.chat,
                { text: "⚠️ *Primero necesitas crear tu cartera con `.crearcartera`.*" },
                { quoted: m }
            );
        }

        if (cartera[userId].coins < 200) {
            return conn.sendMessage(
                m.chat,
                { text: "💰 *No tienes suficientes Cortana Coins para comprar a 🦁 León.* (Necesitas 🪙 200)" },
                { quoted: m }
            );
        }

        // Crear la mascota
        const nuevaMascota = {
            nombre: "🦁 León",
            habilidades: [
                { nombre: 'Fuerza', nivel: 1 },
                { nombre: 'Dominio', nivel: 1 },
                { nombre: 'Rugido', nivel: 1 },
            ],
            vida: 100,
            nivel: 1,
            rango: '🐾 Principiante',
            experiencia: 0,
            experienciaSiguienteNivel: 100,
        };

        // Descontar monedas y añadir la mascota
        cartera[userId].coins -= 200;
        cartera[userId].mascotas.push(nuevaMascota);

        fs.writeFileSync('./cartera.json', JSON.stringify(cartera, null, 2));

        // Mensaje de confirmación
        const mensaje = `🎉 *¡Felicidades! Has comprado a 🦁 León.*  
📊 *Habilidades iniciales:*  
🔹 Fuerza (Nivel 1)  
🔹 Dominio (Nivel 1)  
🔹 Rugido (Nivel 1)  
💰 *Se descontaron 🪙 200 Cortana Coins de tu cuenta.*  
✨ *Tu mascota está lista para comenzar su aventura.*`;

        await conn.sendMessage(
            m.chat,
            { text: mensaje },
            { quoted: m }
        );
    } catch (error) {
        console.error('❌ Error en el comando .leon:', error);
        return conn.sendMessage(m.chat, { text: '❌ *Ocurrió un error al intentar comprar a 🦁 León.*' }, { quoted: m });
    }
}
break;

// .gallo, .ardilla y .tigre
case 'gallo': {
    try {
        const userId = m.sender;

        if (!cartera[userId]) {
            return conn.sendMessage(
                m.chat,
                { text: "⚠️ *Primero necesitas crear tu cartera con `.crearcartera`.*" },
                { quoted: m }
            );
        }

        if (cartera[userId].coins < 50) {
            return conn.sendMessage(
                m.chat,
                { text: "💰 *No tienes suficientes Cortana Coins para comprar a 🐓 Gallo.* (Necesitas 🪙 50)" },
                { quoted: m }
            );
        }

        // Crear la mascota
        const nuevaMascota = {
            nombre: "🐓 Gallo",
            habilidades: [
                { nombre: 'Ataque', nivel: 1 },
                { nombre: 'Velocidad', nivel: 1 },
                { nombre: 'Resistencia', nivel: 1 },
            ],
            vida: 100,
            nivel: 1,
            rango: '🐾 Principiante',
            experiencia: 0,
            experienciaSiguienteNivel: 100,
        };

        // Descontar monedas y añadir la mascota
        cartera[userId].coins -= 50;
        cartera[userId].mascotas.push(nuevaMascota);

        fs.writeFileSync('./cartera.json', JSON.stringify(cartera, null, 2));

        // Mensaje de confirmación
        const mensaje = `🎉 *¡Felicidades! Has comprado a 🐓 Gallo.*  
📊 *Habilidades iniciales:*  
🔹 Ataque (Nivel 1)  
🔹 Velocidad (Nivel 1)  
🔹 Resistencia (Nivel 1)  
💰 *Se descontaron 🪙 50 Cortana Coins de tu cuenta.*  
✨ *Tu mascota está lista para comenzar su aventura.*`;

        await conn.sendMessage(
            m.chat,
            { text: mensaje },
            { quoted: m }
        );
    } catch (error) {
        console.error('❌ Error en el comando .gallo:', error);
        return conn.sendMessage(m.chat, { text: '❌ *Ocurrió un error al intentar comprar a 🐓 Gallo.*' }, { quoted: m });
    }
}
break;

case 'ardilla': {
    try {
        const userId = m.sender;

        if (!cartera[userId]) {
            return conn.sendMessage(
                m.chat,
                { text: "⚠️ *Primero necesitas crear tu cartera con `.crearcartera`.*" },
                { quoted: m }
            );
        }

        if (cartera[userId].coins < 75) {
            return conn.sendMessage(
                m.chat,
                { text: "💰 *No tienes suficientes Cortana Coins para comprar a 🐿 Ardilla.* (Necesitas 🪙 75)" },
                { quoted: m }
            );
        }

        // Crear la mascota
        const nuevaMascota = {
            nombre: "🐿 Ardilla",
            habilidades: [
                { nombre: 'Velocidad', nivel: 1 },
                { nombre: 'Evasión', nivel: 1 },
                { nombre: 'Recolección', nivel: 1 },
            ],
            vida: 100,
            nivel: 1,
            rango: '🐾 Principiante',
            experiencia: 0,
            experienciaSiguienteNivel: 100,
        };

        // Descontar monedas y añadir la mascota
        cartera[userId].coins -= 75;
        cartera[userId].mascotas.push(nuevaMascota);

        fs.writeFileSync('./cartera.json', JSON.stringify(cartera, null, 2));

        // Mensaje de confirmación
        const mensaje = `🎉 *¡Felicidades! Has comprado a 🐿 Ardilla.*  
📊 *Habilidades iniciales:*  
🔹 Velocidad (Nivel 1)  
🔹 Evasión (Nivel 1)  
🔹 Recolección (Nivel 1)  
💰 *Se descontaron 🪙 75 Cortana Coins de tu cuenta.*  
✨ *Tu mascota está lista para comenzar su aventura.*`;

        await conn.sendMessage(
            m.chat,
            { text: mensaje },
            { quoted: m }
        );
    } catch (error) {
        console.error('❌ Error en el comando .ardilla:', error);
        return conn.sendMessage(m.chat, { text: '❌ *Ocurrió un error al intentar comprar a 🐿 Ardilla.*' }, { quoted: m });
    }
}
break;

case 'tigre': {
    try {
        const userId = m.sender;

        if (!cartera[userId]) {
            return conn.sendMessage(
                m.chat,
                { text: "⚠️ *Primero necesitas crear tu cartera con `.crearcartera`.*" },
                { quoted: m }
            );
        }

        if (cartera[userId].coins < 300) {
            return conn.sendMessage(
                m.chat,
                { text: "💰 *No tienes suficientes Cortana Coins para comprar a 🐅 Tigre.* (Necesitas 🪙 300)" },
                { quoted: m }
            );
        }

        // Crear la mascota
        const nuevaMascota = {
            nombre: "🐅 Tigre",
            habilidades: [
                { nombre: 'Fuerza', nivel: 1 },
                { nombre: 'Sigilo', nivel: 1 },
                { nombre: 'Ataque crítico', nivel: 1 },
            ],
            vida: 100,
            nivel: 1,
            rango: '🐾 Principiante',
            experiencia: 0,
            experienciaSiguienteNivel: 100,
        };

        // Descontar monedas y añadir la mascota
        cartera[userId].coins -= 300;
        cartera[userId].mascotas.push(nuevaMascota);

        fs.writeFileSync('./cartera.json', JSON.stringify(cartera, null, 2));

        // Mensaje de confirmación
        const mensaje = `🎉 *¡Felicidades! Has comprado a 🐅 Tigre.*  
📊 *Habilidades iniciales:*  
🔹 Fuerza (Nivel 1)  
🔹 Sigilo (Nivel 1)  
🔹 Ataque crítico (Nivel 1)  
💰 *Se descontaron 🪙 300 Cortana Coins de tu cuenta.*  
✨ *Tu mascota está lista para comenzar su aventura.*`;

        await conn.sendMessage(
            m.chat,
            { text: mensaje },
            { quoted: m }
        );
    } catch (error) {
        console.error('❌ Error en el comando .tigre:', error);
        return conn.sendMessage(m.chat, { text: '❌ *Ocurrió un error al intentar comprar a 🐅 Tigre.*' }, { quoted: m });
    }
}
break;		
		
		
//escan para caja 			
case 'escan': {
    const cajasAbiertas = []; // Lista para almacenar los usuarios con cajas abiertas

    // Recorrer todas las cajas fuertes
    for (const userId in cajasFuertes) {
        if (cajasFuertes[userId].isOpen) {
            cajasAbiertas.push(userId); // Añadir al top si la caja está abierta
        }
    }

    // Generar la respuesta
    if (cajasAbiertas.length === 0) {
        return m.reply("🔒 *Todas las cajas fuertes están cerradas.*");
    } else {
        let response = "🔓 *Cajas abiertas detectadas:* 🔓\n\n";
        cajasAbiertas.forEach((userId, index) => {
            response += `${index + 1}. @${userId.split("@")[0]}\n`;
        });

        response += "\n⚠️ *Recuerden cerrar sus cajas fuertes con el comando `.cerrarcaja`.*";

        // Enviar el mensaje con menciones
        return conn.sendMessage(m.chat, { text: response, mentions: cajasAbiertas });
    }
}
break;
	
//muete de prueba	
case 'mute': {
    if (!m.isGroup) {
        return conn.sendMessage(m.chat, { text: "❌ *Este comando solo puede usarse en grupos.*" }, { quoted: m });
    }

    const groupMetadata = await conn.groupMetadata(m.chat);
    const groupAdmins = groupMetadata.participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin').map(p => p.id);
    const isAdmin = groupAdmins.includes(m.sender);
    const isOwner = global.owner.includes(m.sender.split('@')[0]);

    if (!isAdmin && !isOwner) {
        return conn.sendMessage(
            m.chat,
            { text: "❌ *Este comando solo puede ser usado por administradores o el Owner.*" },
            { quoted: m }
        );
    }

    // Verificar si el mensaje responde a otro mensaje
    const quoted = m.message.extendedTextMessage?.contextInfo;
    if (!quoted || !quoted.participant || !quoted.quotedMessage) {
        return conn.sendMessage(
            m.chat,
            { text: "⚠️ *Uso del comando:* Responde a un mensaje del usuario que deseas mutear con `.mute`." },
            { quoted: m }
        );
    }

    const targetUser = quoted.participant; // Usuario citado
    const groupId = m.chat;

    if (!targetUser) {
        return conn.sendMessage(
            m.chat,
            { text: "❌ *Error:* No se pudo identificar al usuario mencionado." },
            { quoted: m }
        );
    }

    if (!global.muteList[groupId]) global.muteList[groupId] = {};

    if (global.muteList[groupId][targetUser]) {
        return conn.sendMessage(
            m.chat,
            { text: "⚠️ *Este usuario ya está muteado.*" },
            { quoted: m }
        );
    }

    global.muteList[groupId][targetUser] = { messagesSent: 0 };
    global.saveMuteList();

    conn.sendMessage(
        m.chat,
        {
            text: `🔇 *El usuario @${targetUser.split('@')[0]} ha sido muteado.*\nSi envía más de 10 mensajes, será eliminado del grupo.`,
            mentions: [targetUser],
        },
        { quoted: m }
    );
}
break;
	
	
case 'z': {
    if (!m.quoted || !m.quoted.fileSha256) {
        return conn.sendMessage(
            m.chat,
            { text: "❌ *Error:* Responde a un multimedia (sticker, imagen, etc.) que esté asociado a un comando para eliminarlo." },
            { quoted: m }
        );
    }

    // Obtener el ID único del multimedia (fileSha256 convertido a base64)
    const mediaHash = m.quoted.fileSha256.toString("base64");
    if (!mediaHash) {
        return conn.sendMessage(
            m.chat,
            { text: "❌ *Error interno:* No se pudo obtener el ID único del multimedia. Intenta nuevamente." },
            { quoted: m }
        );
    }

    // Verificar si el hash existe en comandoList
    if (!global.comandoList || !global.comandoList[mediaHash]) {
        return conn.sendMessage(
            m.chat,
            { text: "⚠️ *No se encontró ningún comando asociado a este multimedia.*" },
            { quoted: m }
        );
    }

    // Eliminar la entrada correspondiente
    delete global.comandoList[mediaHash];
    global.saveComandoList();

    // Confirmar la eliminación al usuario
    conn.sendMessage(
        m.chat,
        { text: "✅ *El comando asociado al multimedia ha sido eliminado con éxito del archivo.*" },
        { quoted: m }
    );
}
break;	
//no tocar ariba

case 'comando': {
    if (!m.quoted || !m.quoted.mimetype) {
        return conn.sendMessage(
            m.chat,
            { text: "❌ *Error:* Responde a un multimedia (imagen, sticker, etc.) con un comando para asociarlo. 📝" },
            { quoted: m }
        );
    }

    const newCommand = args.join(' ').trim(); // Comando asociado
    if (!newCommand) {
        return conn.sendMessage(
            m.chat,
            { text: "⚠️ *Uso del comando:* Escribe el comando que deseas asociar al multimedia. 📋" },
            { quoted: m }
        );
    }

    // Obtener el ID único del multimedia (fileSha256 convertido a base64)
    const mediaHash = m.quoted.fileSha256?.toString("base64");
    if (!mediaHash) {
        return conn.sendMessage(
            m.chat,
            { text: "❌ *Error interno:* No se pudo obtener el ID único del multimedia. Intenta nuevamente." },
            { quoted: m }
        );
    }

    // Permitir comandos con o sin prefijo
    const formattedCommand = newCommand.startsWith('.') ? newCommand : `.${newCommand}`;

    // Crear la estructura del comando con indicaciones completas
    const commandData = {
        command: formattedCommand, // Comando principal
        action: 'execute', // Tipo de acción que debe realizar
        requireQuoted: true, // Indica que necesita un mensaje citado
        context: {
            stanzaId: m.quoted.stanzaId || null,
            participant: m.quoted.participant || null,
            quotedMessage: m.quoted.message || null,
        },
    };

    // Guardar en comando.json
    if (!global.comandoList) global.comandoList = {};
    global.comandoList[mediaHash] = commandData; // Guardar toda la estructura asociada al ID

    global.saveComandoList();

    conn.sendMessage(
        m.chat,
        { text: `✅ *Multimedia asociado con éxito al comando:*\n- *${formattedCommand}*\nfino capo😎` },
        { quoted: m }
    );
}
break;	

//id de los multimedia	
case 'getid': {
    if (!m.quoted) {
        return conn.sendMessage(
            m.chat,
            {
                text: "❌ *Error:* Responde a un multimedia (imagen, video, audio, sticker, etc.) con `.getid` para obtener su ID único.",
            },
            { quoted: m }
        );
    }

    // Verificar si el multimedia tiene fileSha256
    if (!m.quoted.fileSha256) {
        return conn.sendMessage(
            m.chat,
            {
                text: "❌ *Error:* No se pudo obtener el ID del archivo. Asegúrate de responder a un multimedia válido.",
            },
            { quoted: m }
        );
    }

    // Obtener el ID en formato Base64
    const fileId = m.quoted.fileSha256.toString("base64");

    // Enviar el ID al usuario
    return conn.sendMessage(
        m.chat,
        {
            text: `✅ *ID del multimedia obtenido con éxito:*\n${fileId}`,
        },
        { quoted: m }
    );
}
break;

//comando para agregar comando a los stikerz 
	
case 'comando': {
    if (!m.quoted || !m.quoted.mimetype) {
        return conn.sendMessage(
            m.chat,
            { text: "❌ *Error:* Responde a un multimedia (imagen, sticker, etc.) con un comando para asociarlo. 📝" },
            { quoted: m }
        );
    }

    const newCommand = args.join(' ').trim(); // Comando asociado
    if (!newCommand) {
        return conn.sendMessage(
            m.chat,
            { text: "⚠️ *Uso del comando:* Escribe el comando que deseas asociar al multimedia. 📋" },
            { quoted: m }
        );
    }

    // Obtener el ID único del multimedia (fileSha256 convertido a base64)
    const mediaHash = m.quoted.fileSha256?.toString("base64");
    if (!mediaHash) {
        return conn.sendMessage(
            m.chat,
            { text: "❌ *Error interno:* No se pudo obtener el ID único del multimedia. Intenta nuevamente." },
            { quoted: m }
        );
    }

    // Determinar el comportamiento por defecto según el comando
    let behavior = "normal"; // Comportamiento estándar (texto simple)
    const extractInfoCommands = [".kick", ".mute", ".unmute", ".warn", ".ban"];
    if (extractInfoCommands.includes(newCommand)) {
        behavior = "extract_info"; // Comportamiento especial para comandos que interactúan con mensajes citados
    }

    // Guardar en comando.json con comportamiento
    if (!global.comandoList) global.comandoList = {};
    global.comandoList[mediaHash] = {
        command: newCommand.startsWith('.') ? newCommand : `.${newCommand}`, // Asegurarse del prefijo
        behavior, // Guardar comportamiento
    };

    global.saveComandoList(); // Guardar cambios en el archivo comando.json

    conn.sendMessage(
        m.chat,
        { text: `✅ *Multimedia asociado con éxito al comando:*\n- *${newCommand}*\n🛠️ *Comportamiento:* ${behavior}` },
        { quoted: m }
    );
}
break;
		
//total mensaje
	
case "totalmensaje": {
        function obtenerEstadisticasGrupo(chatId) {
            let stats = [];

            for (const userId in global.db.data.users) {
                const user = global.db.data.users[userId];
                if (user.mensajes && user.mensajes[chatId]) {
                    stats.push({
                        user: userId,
                        count: user.mensajes[chatId],
                    });
                }
            }

            stats.sort((a, b) => b.count - a.count);

            return stats;
        }

        const estadisticas = obtenerEstadisticasGrupo(m.chat);

        // Generar respuesta del ranking
        let respuesta = "📊 *TOP USUARIOS MÁS ACTIVOS*:\n\n";
        estadisticas.forEach((stat, i) => {
            respuesta += `${i + 1}. @${stat.user.split('@')[0]}: ${stat.count} mensajes\n`;
        });

        // Enviar el mensaje con menciones
        conn.sendTextWithMentions(m.chat, respuesta, m);
}
break; 
// para guardar multimedia		
case 'guar': {
    if (!m.quoted || !m.quoted.mimetype) {
        return conn.sendMessage(
            m.chat,
            {
                text: "❌ *Error:* Responde a un multimedia (imagen, video, audio, sticker, etc.) con una palabra clave para guardarlo. 📂",
            },
            { quoted: m }
        );
    }

    const saveKey = args.join(' '); // Palabra clave para guardar
    if (!saveKey) {
        return conn.sendMessage(
            m.chat,
            {
                text: "⚠️ *Aviso:* Escribe una palabra clave para guardar este multimedia. 📝",
            },
            { quoted: m }
        );
    }

    // Descargar el multimedia
    const mediaType = m.quoted.mimetype;
    const mediaExt = mediaType.split('/')[1]; // Ejemplo: "jpg", "mp4", etc.
    const mediaStream = await downloadContentFromMessage(m.quoted, mediaType.split('/')[0]);

    // Convertir el stream en un buffer
    let mediaBuffer = Buffer.alloc(0);
    for await (const chunk of mediaStream) {
        mediaBuffer = Buffer.concat([mediaBuffer, chunk]);
    }

    // Detectar si es Owner
    const isOwner = global.owner.some(([id]) => id === m.sender.replace('@s.whatsapp.net', ''));

    // Guardar multimedia con la palabra clave, usuario y estado de Owner
    multimediaStore[saveKey] = {
        buffer: mediaBuffer.toString('base64'), // Convertir a base64
        mimetype: mediaType,
        extension: mediaExt,
        savedBy: m.sender, // Número del usuario que guarda el archivo
        isOwner, // Indicar si fue guardado por el Owner
    };

    fs.writeFileSync(path2, JSON.stringify(multimediaStore, null, 2)); // Guardar en archivo

    return conn.sendMessage(
        m.chat,
        {
            text: `✅ *Listo:* El multimedia se ha guardado con la palabra clave: *"${saveKey}"*. 🎉`,
        },
        { quoted: m }
    );
}
break;
//recupera multimedia
case 'g':
    const getKey = args.join(' '); // Palabra clave para recuperar
    if (!getKey) {
        return conn.sendMessage(
            m.chat,
            {
                text: "⚠️ *Aviso:* Escribe una palabra clave para obtener el multimedia guardado. 🔑"
            },
            { quoted: m }
        );
    }

    const storedMedia = multimediaStore[getKey];
    if (!storedMedia) {
        return conn.sendMessage(
            m.chat,
            {
                text: `❌ *Error:* No se encontró ningún multimedia guardado con la palabra clave: *"${getKey}"*. 🔍`
            },
            { quoted: m }
        );
    }

    // Recuperar y enviar el multimedia
    const decodedBuffer = Buffer.from(storedMedia.buffer, 'base64'); // Decodificar el base64

    let messageType;
    if (storedMedia.mimetype.includes('webp')) {
        // Enviar como sticker si es webp
        messageType = 'sticker';
    } else if (storedMedia.mimetype.startsWith('application')) {
        // Enviar como documento si es application/*
        messageType = 'document';
    } else {
        // Usar el tipo base para imágenes, videos o audios
        messageType = storedMedia.mimetype.split('/')[0];
    }

    return conn.sendMessage(
        m.chat,
        {
            [messageType]: decodedBuffer,
            mimetype: storedMedia.mimetype,
            fileName: `${getKey}.${storedMedia.extension}` // Incluir el nombre del archivo si es documento
        },
        { quoted: m }
    );
    break
//para borrar
	case 'kill': {
    try {
        const isOwner = global.owner.some(([id]) => id === m.sender.replace('@s.whatsapp.net', ''));
        const groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : null;
        const isAdmin = groupMetadata
            ? groupMetadata.participants.some((participant) => participant.id === m.sender && participant.admin)
            : false;

        const deleteKey = args.join(' '); // Palabra clave para eliminar
        if (!deleteKey) {
            return conn.sendMessage(
                m.chat,
                {
                    text: "⚠️ *Aviso:* Escribe la palabra clave para borrar el multimedia guardado. 🗑️",
                },
                { quoted: m }
            );
        }

        if (!multimediaStore[deleteKey]) {
            return conn.sendMessage(
                m.chat,
                {
                    text: `❌ *Error:* No se encontró ningún multimedia guardado con la palabra clave: *"${deleteKey}"*. 🔍`,
                },
                { quoted: m }
            );
        }

        const multimediaItem = multimediaStore[deleteKey];

        // Verificar si el archivo fue guardado por el Owner
        if (multimediaItem.isOwner && !isOwner) {
            return conn.sendMessage(
                m.chat,
                {
                    text: "🚫 *No puedes eliminar este archivo. Lo agregó el Owner.*",
                },
                { quoted: m }
            );
        }

        // Verificar si el usuario tiene permisos para eliminar
        if (multimediaItem.savedBy !== m.sender && !isAdmin && !isOwner) {
            return conn.sendMessage(
                m.chat,
                {
                    text: "🚫 *No tienes permisos para eliminar este archivo. solo el usuario que lo agrego puede o un admins del grupo👀*",
                },
                { quoted: m }
            );
        }

        // Eliminar del almacenamiento
        delete multimediaStore[deleteKey];
        fs.writeFileSync(path2, JSON.stringify(multimediaStore, null, 2)); // Guardar cambios

        return conn.sendMessage(
            m.chat,
            {
                text: `🗑️ *Listo:* El multimedia guardado con la palabra clave *"${deleteKey}"* ha sido eliminado. ✅`,
            },
            { quoted: m }
        );
    } catch (error) {
        console.error('❌ Error eliminando multimedia:', error);
        return conn.sendMessage(
            m.chat,
            {
                text: "❌ *Ocurrió un error al intentar eliminar el multimedia.*",
            },
            { quoted: m }
        );
    }
}
break;
//clavelista

case 'clavelista': {
    if (Object.keys(multimediaStore).length === 0) {
        return conn.sendMessage(
            m.chat,
            {
                text: "📂 *Lista de Palabras Clave Guardadas:*\n\n⚠️ No hay multimedia guardado aún. Usa el comando `.guar` para guardar uno. 😉",
            },
            { quoted: m }
        );
    }

    let listMessage = "📂 *Lista de Palabras Clave Guardadas:*\n\n";
    let index = 1;
    const mentions = []; // Lista para guardar usuarios mencionados

    for (const key in multimediaStore) {
        const item = multimediaStore[key];
        const savedBy = item.savedBy ? `@${item.savedBy.split('@')[0]}` : "Desconocido";
        listMessage += `*${index}.* 🔑 *${key}*\n📎 Tipo: _${item.mimetype}_\n👤 Guardado por: ${savedBy}\n\n`;
        if (item.savedBy) mentions.push(item.savedBy); // Agregar usuario a menciones
        index++;
    }

    listMessage += "📝 Usa `.g <palabra clave>` para recuperar el multimedia asociado.\n✨ Gestión de multimedia con estilo ✨";

    return conn.sendMessage(
        m.chat,
        { text: listMessage, mentions }, // Enviar con menciones
        { quoted: m }
    );
}
break;

//comando lista 2 

case 'otra': {
    try {
        m.react('⏳'); // Reacción de reloj
        const page = parseInt(args[0]); // Extrae el número de página del argumento
        if (isNaN(page) || page < 1) {
            return m.reply('❌ *Debes ingresar un número de página válido. Ejemplo: .otra 1*');
        }

        const keys = Object.keys(multimediaStore);
        const totalPages = Math.ceil(keys.length / 3); // 3 palabras clave por página

        if (page > totalPages) {
            return m.reply(`❌ *La página ingresada no existe. Hay un total de ${totalPages} páginas.*`);
        }

        // Calcular los elementos de la página solicitada
        const start = (page - 1) * 3;
        const end = start + 3;
        const currentPageKeys = keys.slice(start, end);

        if (currentPageKeys.length === 0) {
            return m.reply('❌ *No hay palabras clave en esta página.*');
        }

        // Crear los botones dinámicos para las palabras clave con emojis
        const botones = currentPageKeys.map((key) => ({
            buttonId: `.g ${key}`, // Botón que ejecuta el comando `.g`
            buttonText: { displayText: `📥 ${key} 📥` }, // Texto visible en el botón con emojis
            type: 1,
        }));

        // Crear el índice general
        let indice = '📋 *Índice de Palabras Clave por Página:*\n';
        for (let i = 0; i < totalPages; i++) {
            const startIdx = i * 3;
            const endIdx = startIdx + 3;
            const pageKeys = keys.slice(startIdx, endIdx);
            indice += `\n📄 *Página ${i + 1}:*\n`;
            pageKeys.forEach((key) => {
                indice += `- 🌟 ${key}\n`;
            });
        }

        // Enviar el menú con los botones y el índice
        await conn.sendMessage(
            m.chat,
            {
                image: { url: 'https://i.postimg.cc/7ZJVpHr0/cortana-anime-fanart-by-laverniustuckerrvb-dee7wsu-pre.jpg' }, // Imagen decorativa
                caption: `╭───≪~*MULTIMEDIA GUARDADO*~*
│✨ Selecciona una palabra clave para obtener el comando:
│
│📁 Archivos en esta página: ${currentPageKeys.length}
│📄 Página: ${page} de ${totalPages}
│
│📋 *Índice General:*
${indice}
╰─•┈┈••✦✦••┈┈•─╯`,
                footer: "CORTANA 2.0",
                buttons: botones,
                viewOnce: true,
                headerType: 4,
                mentions: [m.sender],
            },
            { quoted: m }
        );
    } catch (error) {
        console.error('❌ Error cambiando de página:', error);
        m.reply('❌ *Ocurrió un error al intentar cambiar de página.*');
    }
}
break;

case 'g': {
    try {
        const keyword = args[0]; // Extraer la palabra clave después de `.g`
        if (!keyword || !multimediaStore[keyword]) {
            return conn.sendMessage(
                m.chat,
                {
                    text: "⚠️ *No se encontró multimedia asociado a esa palabra clave.*\nVerifica e intenta de nuevo.",
                },
                { quoted: m }
            );
        }

        // Recuperar multimedia y enviarlo según el tipo
        const multimedia = multimediaStore[keyword];
        const { mimetype, buffer } = multimedia;

        switch (true) {
            case mimetype.startsWith('image/'):
                await conn.sendMessage(m.chat, { image: buffer, caption: `🔑 *Palabra clave:* ${keyword}` }, { quoted: m });
                break;
            case mimetype.startsWith('video/'):
                await conn.sendMessage(m.chat, { video: buffer, caption: `🔑 *Palabra clave:* ${keyword}` }, { quoted: m });
                break;
            case mimetype.startsWith('audio/'):
                await conn.sendMessage(m.chat, { audio: buffer, mimetype: 'audio/mpeg' }, { quoted: m });
                break;
            case mimetype === 'application/pdf':
                await conn.sendMessage(m.chat, { document: buffer, mimetype: 'application/pdf', fileName: `${keyword}.pdf` }, { quoted: m });
                break;
            case mimetype === 'image/webp':
                await conn.sendMessage(m.chat, { sticker: buffer }, { quoted: m });
                break;
            default:
                conn.sendMessage(m.chat, { text: "⚠️ *Tipo de multimedia no soportado.*" }, { quoted: m });
                break;
        }
    } catch (error) {
        console.error('❌ Error enviando multimedia:', error);
        m.reply('❌ *Ocurrió un error al intentar enviar el multimedia.*');
    }
}
break;
		
// eliminar con botones

case 'ban': {
    try {
        await m.react('❌'); // Reacción de X para el comando

        const page = parseInt(args[0]); // Extrae el número de página del argumento
        if (isNaN(page) || page < 1) {
            return m.reply('❌ *Debes ingresar un número de página válido. Ejemplo: .ban 1*');
        }

        const keys = Object.keys(multimediaStore);
        const totalPages = Math.ceil(keys.length / 3); // 3 palabras clave por página

        if (page > totalPages) {
            return m.reply(`❌ *La página ingresada no existe. Hay un total de ${totalPages} páginas.*`);
        }

        // Calcular los elementos de la página solicitada
        const start = (page - 1) * 3;
        const end = start + 3;
        const currentPageKeys = keys.slice(start, end);

        if (currentPageKeys.length === 0) {
            return m.reply('❌ *No hay palabras clave en esta página.*');
        }

        // Crear los botones dinámicos para las palabras clave con íconos
        const botones = currentPageKeys.map((key) => ({
            buttonId: `.ban_eliminar ${key}`, // Botón que ejecuta el comando `.ban_eliminar`
            buttonText: { displayText: `🗑️ ${key} 🗑️` }, // Texto con íconos de canasto de basura
            type: 1,
        }));

        // Crear el índice general
        let indice = '📋 *Índice de Palabras Clave por Página:*\n';
        for (let i = 0; i < totalPages; i++) {
            const startIdx = i * 3;
            const endIdx = startIdx + 3;
            const pageKeys = keys.slice(startIdx, endIdx);
            indice += `\n📄 *Página ${i + 1}:*\n`;
            pageKeys.forEach((key) => {
                indice += `- 🌟 ${key}\n`;
            });
        }

        // Enviar el menú con los botones y el índice
        await conn.sendMessage(
            m.chat,
            {
                image: { url: 'https://i.postimg.cc/7ZJVpHr0/cortana-anime-fanart-by-laverniustuckerrvb-dee7wsu-pre.jpg' }, // Imagen decorativa
                caption: `╭───≪~*ELIMINAR MULTIMEDIA*~*
│✨ Selecciona una palabra clave para eliminar el archivo asociado:
│
│📁 Archivos en esta página: ${currentPageKeys.length}
│📄 Página: ${page} de ${totalPages}
│
│📋 *Índice General:*
${indice}
╰─•┈┈••✦✦••┈┈•─╯`,
                footer: "CORTANA 2.0",
                buttons: botones,
                viewOnce: true,
                headerType: 4,
                mentions: [m.sender],
            },
            { quoted: m }
        );
    } catch (error) {
        console.error('❌ Error cambiando de página para eliminar:', error);
        m.reply('❌ *Ocurrió un error al intentar cambiar de página.*');
    }
}
break;

case 'ban_eliminar': {
    try {
        const deleteKey = args.join(' '); // Extraer la palabra clave seleccionada desde el botón

        // Verificar permisos
        const isOwner = global.owner.some(([id]) => id === m.sender.replace('@s.whatsapp.net', ''));
        const groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : null;
        const isAdmin = groupMetadata
            ? groupMetadata.participants.some((participant) => participant.id === m.sender && participant.admin)
            : false;

        if (!deleteKey || !multimediaStore[deleteKey]) {
            return conn.sendMessage(
                m.chat,
                {
                    text: `❌ *Error:* No se encontró ningún multimedia guardado con la palabra clave: *"${deleteKey}"*. 🔍`
                },
                { quoted: m }
            );
        }

        const multimediaItem = multimediaStore[deleteKey];

        // Verificar si el archivo fue guardado por el Owner
        if (multimediaItem.isOwner && !isOwner) {
            return conn.sendMessage(
                m.chat,
                {
                    text: "🚫 *No puedes eliminar este archivo. Lo agregó el Owner.*",
                },
                { quoted: m }
            );
        }

        // Verificar si el usuario tiene permisos para eliminar
        if (multimediaItem.savedBy !== m.sender && !isAdmin && !isOwner) {
            return conn.sendMessage(
                m.chat,
                {
                    text: "🚫 *No tienes permisos para eliminar este archivo. Solo el usuario que lo agregó puede hacerlo o un admin del grupo.*",
                },
                { quoted: m }
            );
        }

        // Eliminar el archivo multimedia
        delete multimediaStore[deleteKey]; // Eliminar del almacenamiento
        fs.writeFileSync(path2, JSON.stringify(multimediaStore, null, 2)); // Actualizar el archivo

        return conn.sendMessage(
            m.chat,
            {
                text: `🗑️ *Listo:* El multimedia guardado con la palabra clave *"${deleteKey}"* ha sido eliminado. ✅`
            },
            { quoted: m }
        );
    } catch (error) {
        console.error('❌ Error eliminando multimedia:', error);
        m.reply('❌ *Ocurrió un error al intentar eliminar el multimedia.*');
    }
}
break;

		
//eliminar del grupo 
case 'culiar': {
    if (!m.isGroup) {
        return m.reply('❌ *Este comando solo puede usarse en grupos.*');
    }

    const groupMetadata = await conn.groupMetadata(m.chat);
    const groupAdmins = groupMetadata.participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin').map(a => a.id);
    const isAdmin = groupAdmins.includes(m.sender);

    if (!isAdmin) {
        return m.reply('⚠️ *Solo los administradores pueden usar este comando.*');
    }

    if (!m.quoted) {
        return m.reply('⚠️ *Debes responder al mensaje del usuario que deseas eliminar.*');
    }

    const target = m.quoted.sender; // Usuario al que se le respondió
    const isTargetAdmin = groupAdmins.includes(target);

    if (isTargetAdmin) {
        return m.reply('⚠️ *No puedes eliminar a otro administrador del grupo.*');
    }

    try {
        // Expulsar al usuario del grupo
        await conn.groupParticipantsUpdate(m.chat, [target], 'remove');
        m.reply(`✅ *Usuario eliminado del grupo:* @${target.split('@')[0]}`, null, {
            mentions: [target],
        });
    } catch (error) {
        console.error('Error al eliminar al usuario:', error);
        m.reply('❌ *Hubo un error al intentar eliminar al usuario.*');
    }
}
break;
// para agregar comando a stikerz
// Comando para crear caja fuerte
case 'cajafuerte': {
    const password = args.join(' ').trim();

    if (!password) {
        return m.reply(
            "🔐 *No tienes una caja fuerte creada.*\n" +
            "Usa el mismo comando seguido de tu contraseña para crearla.\n" +
            "Ejemplo: `.cajafuerte elpepexds`"
        );
    }

    if (password.length < 4) {
        return m.reply("⚠️ *La contraseña debe tener al menos 4 caracteres.*");
    }

    const globalKey = m.sender; // Usar el ID del usuario como clave global

    if (cajasFuertes[globalKey]) {
        return m.reply("✅ *Ya tienes una caja fuerte creada.* Usa tus comandos para gestionarla, como `.abrircaja` o `.cerrarcaja`.");
    }

    cajasFuertes[globalKey] = {
        password,
        multimedia: {},
        isOpen: false,
    };

    fs.writeFileSync(path, JSON.stringify(cajasFuertes, null, 2));

    return m.reply("🔐 *Tu caja fuerte ha sido creada con éxito!*");
}
break;

case 'cambiar': {
    const newPassword = args.join(' ').trim(); // Obtener la nueva contraseña del comando

    if (!newPassword || newPassword.length < 4) {
        return m.reply("⚠️ *Debes proporcionar una nueva contraseña válida con al menos 4 caracteres.*\nEjemplo: `.cambiar nuevaContraseña123`");
    }

    if (!cajasFuertes[m.sender]) {
        return m.reply("❌ *No tienes una caja fuerte creada.* Usa el comando `.cajafuerte` para crear una.");
    }

    // Cambiar la contraseña
    cajasFuertes[m.sender].password = newPassword;

    // Guardar los cambios en el archivo
    fs.writeFileSync(path, JSON.stringify(cajasFuertes, null, 2));

    m.reply("🔐 *Tu contraseña ha sido cambiada con éxito.*");

    // Avisar si el comando fue usado en un grupo
    if (m.isGroup) {
        await conn.sendMessage(
            m.sender,
            { text: "⚠️ Por seguridad, considera usar este comando en privado para evitar que otros vean tu nueva contraseña." }
        );
    }
}
break;
//abrir caja		
case 'abrircaja': {
    const password = args.join(' ').trim(); // Obtener la contraseña proporcionada

    if (!password) {
        return m.reply("❌ *Debes proporcionar la contraseña para abrir tu caja fuerte.*\nEjemplo: `.abrircaja tuContraseña123`");
    }

    if (!cajasFuertes[m.sender]) {
        return m.reply("❌ *No tienes una caja fuerte creada.* Usa el comando `.cajafuerte` para crearla.");
    }

    if (cajasFuertes[m.sender].password !== password) {
        return m.reply("❌ *Contraseña incorrecta. Intenta nuevamente.*");
    }

    cajasFuertes[m.sender].isOpen = true; // Marcar la caja fuerte como abierta
    fs.writeFileSync(path, JSON.stringify(cajasFuertes, null, 2));

    let response = "🔓 *Tu Caja Fuerte se ha abierto* 🔓\n\n";
    const multimediaKeys = Object.keys(cajasFuertes[m.sender].multimedia);

    if (multimediaKeys.length === 0) {
        response +=
            "📂 *Tu caja fuerte está vacía.*\n" +
            "Puedes guardar multimedia usando el comando:\n" +
            "`.cajaguar palabraClave` (respondiendo a un archivo).\n";
    } else {
        response += "Aquí están las palabras clave de los archivos guardados:\n\n";
        multimediaKeys.forEach((key, index) => {
            response += `*${index + 1}.* ${key}\n`;
        });
        response += "\n✨ Usa el comando `.sacar palabraClave` para obtener el archivo.";
    }

    response += "\n\n⚠️ *Recuerda cerrar tu caja fuerte después de usarla con el comando `.cerrarcaja`.*";

    m.reply(response);
}
break;
// cerrar caja
case 'cerrarcaja': {
    if (!cajasFuertes[m.sender]) {
        return m.reply("❌ *No tienes una caja fuerte creada.* Usa el comando `.cajafuerte` para crearla.");
    }

    if (!cajasFuertes[m.sender].isOpen) {
        return m.reply("⚠️ *Tu caja fuerte ya está cerrada.*");
    }

    cajasFuertes[m.sender].isOpen = false; // Marcar la caja fuerte como cerrada
    fs.writeFileSync(path, JSON.stringify(cajasFuertes, null, 2));

    m.reply("🔒 *Tu Caja Fuerte ha sido cerrada. El acceso al comando `.sacar` está deshabilitado.*");
}
break;
//para sacar multimedia
case 'sacar': {
    const keyword = args.join(' ').trim(); // Palabra clave para buscar el multimedia
    if (!keyword) {
        return conn.sendMessage(
            m.chat,
            {
                text: "⚠️ *Aviso:* Escribe una palabra clave para sacar un multimedia de tu caja fuerte. 📝",
            },
            { quoted: m }
        );
    }

    // Verificar si el usuario tiene una caja fuerte creada
    if (!cajasFuertes[m.sender]) {
        return conn.sendMessage(
            m.chat,
            {
                text: "❌ *Error:* No tienes una caja fuerte creada. Usa el comando `.cajafuerte contraseña` para crearla primero. 🔐",
            },
            { quoted: m }
        );
    }

    // Verificar si la caja fuerte está abierta
    if (!cajasFuertes[m.sender].isOpen) {
        return conn.sendMessage(
            m.chat,
            {
                text: "❌ *Error:* Primero debes abrir tu caja fuerte con el comando `.abrircaja contraseña`. 🔓",
            },
            { quoted: m }
        );
    }

    // Buscar el multimedia en la caja fuerte del usuario
    const multimedia = cajasFuertes[m.sender].multimedia[keyword];
    if (!multimedia) {
        return conn.sendMessage(
            m.chat,
            {
                text: `❌ *Error:* No se encontró ningún multimedia con la palabra clave: *"${keyword}"*. 📂`,
            },
            { quoted: m }
        );
    }

    // Convertir el buffer desde base64
    const mediaBuffer = Buffer.from(multimedia.buffer, 'base64');

    // Enviar el multimedia basado en su tipo
    try {
        switch (multimedia.mimetype.split('/')[0]) {
            case 'image':
                if (multimedia.mimetype === 'image/webp') {
                    // Enviar como sticker si es un archivo WebP
                    await conn.sendMessage(m.chat, { sticker: mediaBuffer }, { quoted: m });
                } else {
                    // Enviar como imagen
                    await conn.sendMessage(m.chat, { image: mediaBuffer }, { quoted: m });
                }
                break;
            case 'video':
                await conn.sendMessage(m.chat, { video: mediaBuffer }, { quoted: m });
                break;
            case 'audio':
                await conn.sendMessage(
                    m.chat,
                    { audio: mediaBuffer, mimetype: multimedia.mimetype, ptt: false },
                    { quoted: m }
                );
                break;
            case 'application':
                const extension = multimedia.extension || multimedia.mimetype.split('/')[1];
                await conn.sendMessage(
                    m.chat,
                    { document: mediaBuffer, mimetype: multimedia.mimetype, fileName: `archivo.${extension}` },
                    { quoted: m }
                );
                break;
            default:
                await conn.sendMessage(
                    m.chat,
                    { text: `❌ *Error:* El tipo de archivo no es compatible para ser enviado.` },
                    { quoted: m }
                );
                break;
        }
    } catch (error) {
        console.error("Error al enviar el multimedia:", error);
        return conn.sendMessage(
            m.chat,
            {
                text: "❌ *Error:* No se pudo enviar el multimedia. Verifica que sea un archivo válido. 🚫",
            },
            { quoted: m }
        );
    }
}
break;
//para guaedar en caja fuerte		
case 'cajaguar': {
    if (!m.quoted || !m.quoted.mimetype) {
        return conn.sendMessage(
            m.chat,
            {
                text: "❌ *Error:* Responde a un multimedia (imagen, video, audio, sticker, documento, etc.) con una palabra clave para guardarlo en tu caja fuerte. 📂",
            },
            { quoted: m }
        );
    }

    const keyword = args.join(' ').trim(); // Palabra clave para guardar
    if (!keyword) {
        return conn.sendMessage(
            m.chat,
            {
                text: "⚠️ *Aviso:* Escribe una palabra clave para guardar este multimedia en tu caja fuerte. 📝",
            },
            { quoted: m }
        );
    }

    // Verificar si el usuario tiene una caja fuerte creada
    if (!cajasFuertes[m.sender]) {
        return conn.sendMessage(
            m.chat,
            {
                text: "❌ *Error:* No tienes una caja fuerte creada. Usa el comando `.cajafuerte contraseña` para crearla primero. 🔐",
            },
            { quoted: m }
        );
    }

    try {
        // Descargar el multimedia
        const mediaType = m.quoted.mimetype.split('/')[0];
        const mediaExt = m.quoted.mimetype.split('/')[1]; // Ejemplo: "jpg", "mp4", etc.
        const mediaStream = await downloadContentFromMessage(m.quoted, mediaType);

        // Convertir el stream en un buffer
        let mediaBuffer = Buffer.alloc(0);
        for await (const chunk of mediaStream) {
            mediaBuffer = Buffer.concat([mediaBuffer, chunk]);
        }

        // Verificar si la palabra clave ya está en uso
        if (cajasFuertes[m.sender].multimedia[keyword]) {
            return conn.sendMessage(
                m.chat,
                {
                    text: `❌ *Error:* Ya tienes un archivo guardado con la palabra clave: *"${keyword}"*. Usa una diferente. 🚫`,
                },
                { quoted: m }
            );
        }

        // Guardar el multimedia en la caja fuerte globalmente
        cajasFuertes[m.sender].multimedia[keyword] = {
            buffer: mediaBuffer.toString('base64'), // Convertir el buffer a base64
            mimetype: m.quoted.mimetype,
            extension: mediaExt,
        };

        // Guardar los cambios en el archivo
        fs.writeFileSync(path, JSON.stringify(cajasFuertes, null, 2));

        return conn.sendMessage(
            m.chat,
            {
                text: `✅ *Listo:* El multimedia se ha guardado en tu caja fuerte con la palabra clave: *"${keyword}"*. 🎉`,
            },
            { quoted: m }
        );
    } catch (error) {
        console.error("Error al guardar multimedia:", error);
        return conn.sendMessage(
            m.chat,
            {
                text: "❌ *Error:* Hubo un problema al intentar guardar el multimedia. Intenta nuevamente. 🚫",
            },
            { quoted: m }
        );
    }
}
break;
//para eliminar multimedia de la cajafuerte
case 'del': {
    const keyword = args.join(' ').trim(); // Palabra clave del multimedia a eliminar

    if (!keyword) {
        return conn.sendMessage(
            m.chat,
            {
                text: "⚠️ *Aviso:* Escribe una palabra clave para eliminar un multimedia de tu caja fuerte. 📝",
            },
            { quoted: m }
        );
    }

    // Verificar si el usuario tiene una caja fuerte creada
    if (!cajasFuertes[m.sender]) {
        return conn.sendMessage(
            m.chat,
            {
                text: "❌ *Error:* No tienes una caja fuerte creada. Usa el comando `.cajafuerte contraseña` para crearla primero. 🔐",
            },
            { quoted: m }
        );
    }

    // Verificar si la caja fuerte está abierta
    if (!cajasFuertes[m.sender].isOpen) {
        return conn.sendMessage(
            m.chat,
            {
                text: "❌ *Error:* Primero debes abrir tu caja fuerte con el comando `.abrircaja contraseña`. 🔓",
            },
            { quoted: m }
        );
    }

    // Buscar el multimedia en la caja fuerte del usuario
    const multimedia = cajasFuertes[m.sender].multimedia[keyword];
    if (!multimedia) {
        return conn.sendMessage(
            m.chat,
            {
                text: `❌ *Error:* No se encontró ningún multimedia con la palabra clave: *"${keyword}"*. 📂`,
            },
            { quoted: m }
        );
    }

    // Eliminar el multimedia
    delete cajasFuertes[m.sender].multimedia[keyword];

    // Guardar los cambios en el archivo
    fs.writeFileSync(path, JSON.stringify(cajasFuertes, null, 2));

    return conn.sendMessage(
        m.chat,
        {
            text: `✅ *Listo:* El multimedia con la palabra clave *"${keyword}"* ha sido eliminado de tu caja fuerte. 🗑️`,
        },
        { quoted: m }
    );
}
break;
//fallo 
case 'fallo2': {
    const subCommand = args[0]?.toLowerCase(); // Comando adicional: on/off

    if (!['on', 'off'].includes(subCommand)) {
        return conn.sendMessage(
            m.chat,
            {
                text: "⚠️ *Uso del comando:* `.fallo2 on` para activar el fallo de seguridad automático o `.fallo2 off` para desactivarlo. 🔐",
            },
            { quoted: m }
        );
    }

    const groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : null;
    const groupAdmins = groupMetadata
        ? groupMetadata.participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin').map(a => a.id)
        : [];
    const isAdmin = groupAdmins.includes(m.sender);
    const isOwner = global.owner.some(([id]) => id === m.sender.replace('@s.whatsapp.net', ''));

    if (!isAdmin && !isOwner) {
        return conn.sendMessage(
            m.chat,
            { text: "❌ *Este comando solo puede ser usado por administradores o el Owner.*" },
            { quoted: m }
        );
    }

    if (subCommand === 'on') {
        if (falloData[m.chat]?.active) {
            return conn.sendMessage(
                m.chat,
                { text: "⚠️ *El fallo2 ya está activo en este grupo.*" },
                { quoted: m }
            );
        }

        // Activar el sistema de fallo2 en el grupo
        falloData[m.chat] = { active: true, lastActivated: null };
        fs.writeFileSync(falloPath, JSON.stringify(falloData, null, 2));

        const activateFallo2 = async () => {
            if (!falloData[m.chat]?.active) return; // Si se desactiva, salir

            global.falloSeguridad = true; // Activar fallo por 5 minutos

            const mentions = groupMetadata.participants.map(p => p.id); // Obtener todos los miembros del grupo
            await conn.sendMessage(
                m.chat,
                {
                    text: "🔓 *Fallo de seguridad activado por 5 minutos.* Usa `.fallocaja @usuario` para acceder a cajas fuertes ajenas. 🚨",
                    mentions,
                }
            );

            // Desactivar después de 5 minutos
            setTimeout(async () => {
                if (!falloData[m.chat]?.active) return; // Si se desactiva, salir
                global.falloSeguridad = false;
                await conn.sendMessage(
                    m.chat,
                    { text: "🔒 *Fallo de seguridad desactivado.* Espera 3 horas para la próxima activación. ⏳" }
                );
                falloData[m.chat].lastActivated = Date.now();
                fs.writeFileSync(falloPath, JSON.stringify(falloData, null, 2));

                // Programar la próxima activación en 3 horas
                setTimeout(activateFallo2, 3 * 60 * 60 * 1000); // 3 horas
            }, 5 * 60 * 1000); // 5 minutos
        };

        activateFallo2(); // Iniciar el ciclo
        return conn.sendMessage(
            m.chat,
            { text: "✅ *Modo fallo2 activado.* El sistema ahora gestionará las activaciones automáticas. 🔄" },
            { quoted: m }
        );
    }

    if (subCommand === 'off') {
        if (!falloData[m.chat]?.active) {
            return conn.sendMessage(
                m.chat,
                { text: "⚠️ *El fallo2 ya está desactivado en este grupo.*" },
                { quoted: m }
            );
        }

        // Desactivar el sistema de fallo2 en el grupo
        delete falloData[m.chat];
        fs.writeFileSync(falloPath, JSON.stringify(falloData, null, 2));
        global.falloSeguridad = false; // Asegurarse de que el fallo no esté activo
        return conn.sendMessage(
            m.chat,
            { text: "✅ *Modo fallo2 desactivado.* El sistema ya no gestionará activaciones automáticas. 🔕" },
            { quoted: m }
        );
    }
}
break;
		
//cuando esta activo el fallo
//otra caja		
case 'fallocaja': {
    if (!m.isGroup) {
        return conn.sendMessage(
            m.chat,
            { text: "❌ *Este comando solo puede usarse en grupos.*" },
            { quoted: m }
        );
    }

    // Verificar si el fallo de seguridad está activo para este grupo
    const isFalloActivo = global.falloSeguridad || (global.fallo2?.[m.chat]?.activo);
    if (!isFalloActivo) {
        return conn.sendMessage(
            m.chat,
            { text: "⚠️ *El fallo de seguridad no está activo. No puedes acceder a la caja fuerte de otros usuarios.*" },
            { quoted: m }
        );
    }

    // Obtener el usuario mencionado o citado
    const mentionedUser = m.mentionedJid && m.mentionedJid[0];
    const quotedUser = m.message?.extendedTextMessage?.contextInfo?.participant;

    const targetUser = mentionedUser || quotedUser; // Priorizar mencionados, luego citados
    if (!targetUser) {
        return conn.sendMessage(
            m.chat,
            { text: "⚠️ *Por favor, menciona o responde al mensaje de un usuario para acceder a su caja fuerte.*" },
            { quoted: m }
        );
    }

    // Verificar si el usuario tiene una caja fuerte
    const userCaja = cajasFuertes[targetUser];
    if (!userCaja || !userCaja.multimedia || Object.keys(userCaja.multimedia).length === 0) {
        return conn.sendMessage(
            m.chat,
            { text: `⚠️ *El usuario mencionado o citado no tiene multimedia guardado en su caja fuerte.*` },
            { quoted: m }
        );
    }

    // Generar el listado de multimedia en la caja fuerte
    let listMessage = `🔐 *Caja Fuerte de @${targetUser.split('@')[0]}:*\n\n`;
    let index = 1;

    for (const key in userCaja.multimedia) {
        listMessage += `*${index}.* 🔑 *${key}*\n`;
        index++;
    }

    listMessage += `\n📂 Usa el comando *.sacar2 <palabra clave>* para recuperar el multimedia.`;

    // Enviar el listado al grupo
    conn.sendMessage(
        m.chat,
        { text: listMessage, mentions: [targetUser] },
        { quoted: m }
    );

    // Notificar al dueño de la caja fuerte en el grupo
    conn.sendMessage(
        m.chat,
        {
            text: `⚠️ *El usuario @${m.sender.split('@')[0]} ha accedido a la caja fuerte de @${targetUser.split('@')[0]} debido al fallo de seguridad activo.*`,
            mentions: [m.sender, targetUser],
        },
        { quoted: m }
    );
}
break;
//cuando esta activo el fallo		
//sacar 2
case 'fasacar': {
    if (!m.isGroup) {
        return conn.sendMessage(
            m.chat,
            { text: "❌ *Este comando solo puede usarse en grupos.*" },
            { quoted: m }
        );
    }

    // Obtener el usuario mencionado o citado
    const mentionedUser = m.mentionedJid && m.mentionedJid[0];
    const quotedUser = m.message?.extendedTextMessage?.contextInfo?.participant;
    const targetUser = mentionedUser || quotedUser;

    // Filtrar menciones y obtener la palabra clave
    const keyword = args.filter(arg => !arg.startsWith('@') && !arg.includes(targetUser)).join(' ').trim().toLowerCase();

    if (!targetUser) {
        return conn.sendMessage(
            m.chat,
            { text: "⚠️ *Uso del comando:* `.fasacar <palabra clave> @usuario` o responde al mensaje del usuario." },
            { quoted: m }
        );
    }

    if (!keyword) {
        return conn.sendMessage(
            m.chat,
            { text: "⚠️ *Especifica la palabra clave del multimedia que deseas extraer.*" },
            { quoted: m }
        );
    }

    // Verificar si el fallo de seguridad global o por grupo está activo
    const isFalloActivo = global.falloSeguridad || (global.fallo2?.[m.chat]?.activo);
    if (!isFalloActivo) {
        return conn.sendMessage(
            m.chat,
            { text: "❌ *El modo de fallo de seguridad está desactivado en este grupo.* Actívalo con `.fallo on` o `.fallo2 on`." },
            { quoted: m }
        );
    }

    const userCaja = cajasFuertes[targetUser];
    if (!userCaja) {
        return conn.sendMessage(
            m.chat,
            { text: `❌ *El usuario @${targetUser.split('@')[0]} no tiene una caja fuerte creada o está vacía.*`,
            mentions: [targetUser] },
            { quoted: m }
        );
    }

    // Buscar multimedia ignorando mayúsculas/minúsculas, espacios y caracteres especiales
    const matchedKey = Object.keys(userCaja.multimedia).find(key =>
        key.trim().toLowerCase().replace(/\s+/g, '') === keyword.replace(/\s+/g, '')
    );

    if (!matchedKey) {
        return conn.sendMessage(
            m.chat,
            { text: `❌ *No se encontró multimedia con la palabra clave "${keyword}" en la caja fuerte de @${targetUser.split('@')[0]}.*`,
            mentions: [targetUser] },
            { quoted: m }
        );
    }

    // Extraer multimedia
    const { buffer, mimetype } = userCaja.multimedia[matchedKey];
    const mediaBuffer = Buffer.from(buffer, 'base64');

    try {
        const mediaType = mimetype.split('/')[0];

        if (mediaType === 'image' && mimetype === 'image/webp') {
            // Enviar sticker
            await conn.sendMessage(m.chat, { sticker: mediaBuffer }, { quoted: m });
        } else if (mediaType === 'image') {
            // Enviar imagen
            await conn.sendMessage(m.chat, { image: mediaBuffer }, { quoted: m });
        } else if (mediaType === 'video') {
            await conn.sendMessage(m.chat, { video: mediaBuffer }, { quoted: m });
        } else if (mediaType === 'audio') {
            await conn.sendMessage(
                m.chat,
                { audio: mediaBuffer, mimetype: mimetype, ptt: false },
                { quoted: m }
            );
        } else if (mediaType === 'application') {
            const extension = mimetype.split('/')[1];
            await conn.sendMessage(
                m.chat,
                { document: mediaBuffer, mimetype: mimetype, fileName: `${matchedKey}.${extension}` },
                { quoted: m }
            );
        } else {
            await conn.sendMessage(
                m.chat,
                { text: "❌ *El tipo de archivo no es compatible para ser enviado.*" },
                { quoted: m }
            );
        }
    } catch (error) {
        console.error('Error al enviar el multimedia:', error);
        return conn.sendMessage(
            m.chat,
            { text: "❌ *Hubo un error al intentar enviar el multimedia. Intenta nuevamente.*" },
            { quoted: m }
        );
    }

    // Notificar al dueño de la caja fuerte en el grupo
    conn.sendMessage(
        m.chat,
        {
            text: `⚠️ *El usuario @${m.sender.split('@')[0]} ha extraído multimedia de la caja fuerte de @${targetUser.split('@')[0]} debido al fallo de seguridad activo.*`,
            mentions: [m.sender, targetUser],
        },
        { quoted: m }
    );
}
break;                

//top caja fuerte		

case 'topcaja': {
    try {
        // Verificar si hay cajas fuertes creadas
        if (Object.keys(cajasFuertes).length === 0) {
            return conn.sendMessage(
                m.chat,
                {
                    text: "⚠️ *No hay cajas fuertes creadas aún.*\nLos usuarios pueden crear una usando el comando `.cajafuerte contraseña`.",
                },
                { quoted: m }
            );
        }

        // Crear un ranking basado en el número de archivos guardados
        let ranking = Object.entries(cajasFuertes)
            .map(([user, caja]) => {
                return {
                    user,
                    count: Object.keys(caja.multimedia || {}).length, // Número de archivos guardados
                };
            })
            .filter(entry => entry.count > 0) // Filtrar usuarios sin archivos guardados
            .sort((a, b) => b.count - a.count); // Ordenar de mayor a menor

        if (ranking.length === 0) {
            return conn.sendMessage(
                m.chat,
                {
                    text: "⚠️ *No hay usuarios con multimedia guardado en sus cajas fuertes.*",
                },
                { quoted: m }
            );
        }

        // Generar el mensaje del ranking
        let response = "📊 *Ranking de Usuarios con Más Multimedia Guardado en sus Cajas Fuertes:*\n\n";
        ranking.forEach((entry, index) => {
            const username = entry.user.split('@')[0];
            response += `*${index + 1}.* @${username} - *${entry.count} archivo(s)*\n`;
        });

        response += "\n✨ *¿Quién tendrá la caja fuerte más grande?*\n";

        // Enviar el mensaje con menciones
        const mentions = ranking.map(entry => entry.user);
        conn.sendMessage(
            m.chat,
            { text: response, mentions },
            { quoted: m }
        );
    } catch (error) {
        console.error("Error en el comando .topcaja:", error);
        return conn.sendMessage(
            m.chat,
            { text: "❌ *Hubo un error al intentar generar el ranking. Inténtalo más tarde.*" },
            { quoted: m }
        );
    }
}
break;
//eliminar caja fuerte	

case 'deletecaja': {
    const password = args.join(' ').trim(); // Obtener la contraseña proporcionada

    if (!password) {
        return m.reply("❌ *Debes proporcionar la contraseña para eliminar tu caja fuerte.*\nEjemplo: `.deletecaja tuContraseña123`");
    }

    if (!cajasFuertes[m.sender]) {
        return m.reply("❌ *No tienes una caja fuerte creada.* Usa el comando `.cajafuerte contraseña` para crearla.");
    }

    if (cajasFuertes[m.sender].password !== password) {
        return m.reply("❌ *Contraseña incorrecta. Intenta nuevamente.*");
    }

    // Eliminar la caja fuerte
    delete cajasFuertes[m.sender];
    fs.writeFileSync(path, JSON.stringify(cajasFuertes, null, 2)); // Guardar cambios en el archivo

    m.reply("✅ *Tu caja fuerte ha sido eliminada con éxito.*");

    break;
}		
//caja fuerte abierta				
case 'robarcaja': {
    if (!m.isGroup) {
        return conn.sendMessage(
            m.chat,
            { text: "❌ *Este comando solo puede usarse en grupos.*" },
            { quoted: m }
        );
    }

    // Obtener el usuario mencionado o citado
    const mentionedUser = m.mentionedJid && m.mentionedJid[0];
    const quotedUser = m.message?.extendedTextMessage?.contextInfo?.participant;
    const targetUser = mentionedUser || quotedUser;

    if (!targetUser) {
        return conn.sendMessage(
            m.chat,
            { text: "⚠️ *Uso del comando:* `.robarcaja @usuario` o responde al mensaje de un usuario." },
            { quoted: m }
        );
    }

    const userCaja = cajasFuertes[targetUser];
    if (!userCaja || !userCaja.isOpen) {
        return conn.sendMessage(
            m.chat,
            { text: `❌ *La caja fuerte del usuario @${targetUser.split('@')[0]} está cerrada o no existe.*`,
              mentions: [targetUser] },
            { quoted: m }
        );
    }

    let listMessage = `🔐 *Caja Fuerte Abierta de @${targetUser.split('@')[0]}:*\n\n`;
    const multimediaKeys = Object.keys(userCaja.multimedia);

    if (multimediaKeys.length === 0) {
        listMessage += "📂 *Esta caja fuerte está vacía.*";
    } else {
        // Asegurarse de procesar palabras clave con consistencia
        const formattedKeys = multimediaKeys.map((key, index) => {
            return `*${index + 1}.* 🔑 *${key.trim()}*`;
        });

        listMessage += formattedKeys.join("\n"); // Crear el listado final
        listMessage += "\n\n✨ Usa el comando `.resacar <palabra clave> @usuario` para extraer un archivo.";
    }

    conn.sendMessage(
        m.chat,
        { text: listMessage, mentions: [targetUser] },
        { quoted: m }
    );

    // Notificar al dueño en el grupo
    conn.sendMessage(
        m.chat,
        {
            text: `⚠️ *El usuario @${m.sender.split('@')[0]} ha accedido a tu caja fuerte abierta.*`,
            mentions: [m.sender, targetUser],
        }
    );
}
break;
//resacar abierta		

case 'resacar': {
    if (!m.isGroup) {
        return conn.sendMessage(
            m.chat,
            { text: "❌ *Este comando solo puede usarse en grupos.*" },
            { quoted: m }
        );
    }

    // Obtener el usuario mencionado o citado
    const mentionedUser = m.mentionedJid && m.mentionedJid[0];
    const quotedUser = m.message?.extendedTextMessage?.contextInfo?.participant;
    const targetUser = mentionedUser || quotedUser;

    // Extraer palabra clave ignorando mención o cita
    const keyword = mentionedUser 
        ? args.slice(0, -1).join(' ').trim().toLowerCase() // Excluir la mención al procesar la palabra clave
        : args.join(' ').trim().toLowerCase();

    if (!targetUser) {
        return conn.sendMessage(
            m.chat,
            { text: "⚠️ *Uso del comando:* `.resacar <palabra clave> @usuario` o responde al mensaje del usuario." },
            { quoted: m }
        );
    }

    if (!keyword) {
        return conn.sendMessage(
            m.chat,
            { text: "⚠️ *Especifica la palabra clave del multimedia que deseas extraer.*" },
            { quoted: m }
        );
    }

    const userCaja = cajasFuertes[targetUser];
    if (!userCaja || !userCaja.isOpen) {
        return conn.sendMessage(
            m.chat,
            { text: `❌ *La caja fuerte del usuario @${targetUser.split('@')[0]} está cerrada o no existe.*`,
            mentions: [targetUser] },
            { quoted: m }
        );
    }

    // Buscar multimedia ignorando mayúsculas/minúsculas, espacios y caracteres especiales
    const matchedKey = Object.keys(userCaja.multimedia).find(key =>
        key.trim().toLowerCase().replace(/\s+/g, '') === keyword.replace(/\s+/g, '')
    );

    if (!matchedKey) {
        return conn.sendMessage(
            m.chat,
            { text: `❌ *No se encontró multimedia con la palabra clave "${keyword}" en la caja fuerte de @${targetUser.split('@')[0]}.*`,
            mentions: [targetUser] },
            { quoted: m }
        );
    }

    // Extraer multimedia
    const { buffer, mimetype } = userCaja.multimedia[matchedKey];
    const mediaBuffer = Buffer.from(buffer, 'base64');

    try {
        const mediaType = mimetype.split('/')[0];

        if (mediaType === 'image' && mimetype === 'image/webp') {
            // Enviar sticker
            await conn.sendMessage(m.chat, { sticker: mediaBuffer }, { quoted: m });
        } else if (mediaType === 'image') {
            // Enviar imagen
            await conn.sendMessage(m.chat, { image: mediaBuffer }, { quoted: m });
        } else if (mediaType === 'video') {
            await conn.sendMessage(m.chat, { video: mediaBuffer }, { quoted: m });
        } else if (mediaType === 'audio') {
            await conn.sendMessage(
                m.chat,
                { audio: mediaBuffer, mimetype: mimetype, ptt: false },
                { quoted: m }
            );
        } else if (mediaType === 'application') {
            const extension = mimetype.split('/')[1];
            await conn.sendMessage(
                m.chat,
                { document: mediaBuffer, mimetype: mimetype, fileName: `${matchedKey}.${extension}` },
                { quoted: m }
            );
        } else {
            await conn.sendMessage(
                m.chat,
                { text: "❌ *El tipo de archivo no es compatible para ser enviado.*" },
                { quoted: m }
            );
        }
    } catch (error) {
        console.error('Error al enviar el multimedia:', error);
        return conn.sendMessage(
            m.chat,
            { text: "❌ *Hubo un error al intentar enviar el multimedia. Intenta nuevamente.*" },
            { quoted: m }
        );
    }

    // Notificar al dueño en el grupo
    conn.sendMessage(
        m.chat,
        {
            text: `⚠️ *El usuario @${m.sender.split('@')[0]} ha extraído multimedia de tu caja fuerte abierta.*`,
            mentions: [m.sender, targetUser],
        }
    );
}
break;
    
		
//menucaja fuerte	
case 'menucaja': {
    const imageUrl = "https://cloud.dorratz.com/files/8f3d740c894ae979e4bfa72fc84589a7"; // URL de la imagen

    const menuText = `
✧══════•❁❀❁•══════✧
🎉 *Bienvenidos al Menú Caja Fuerte de Cortana Bot 2.0* 🎉
✧══════•❁❀❁•══════✧

╔╦══• •✠•❀•✠• •══╦╗
✨ *Lista de Comandos y Funciones* ✨
╚╩═════════════════╩╝

📂 *.cajafuerte* contraseña  
_Crea tu caja fuerte personal con una contraseña segura._

🔓 *.abrircaja* contraseña  
_Abre tu caja fuerte y accede a tus archivos guardados._

🔒 *.cerrarcaja*  
_Cierra tu caja fuerte para proteger su contenido._

💾 *.cajaguar* palabraClave  
_Guarda multimedia en tu caja fuerte usando una palabra clave única._

📜 *.fallocaja* @usuario  
_Consulta la lista de archivos de otro usuario (si el evento de fallo2 está activo)._

📤 *.resacar* palabraClave @usuario  
_Extrae archivos de una caja fuerte abierta._

🔑 *.fasacar* palabraClave @usuario  
_Extrae multimedia de una caja fuerte durante el modo fallo2 activo._

✅️ *.sacar* palabraClave
_para sacar tu multimedia de tu caja_

📋 *.robarcaja* @usuario  
_Consulta los archivos de una caja abierta._

💣 *.del*  
_Elimina tus archivos multimedia guardados con palabra clave._

🗑️ *.deletecaja* contraseña  
_Elimina tu caja fuerte y todo su contenido de manera permanente._

⚠️ *.fallo2* on/off  
_Activa o desactiva el fallo automático que permite acceder a cajas fuertes durante 5 minutos cada 3 horas._

✅️ *.cambiar* _cambia tu contraseña_

📊 *.topcaja* _para ver que usuario tiene mas archivo guardado en su caja es un top_

 🔎 *.escan* _para escaniar cajas fuertes abiertas_

╔╦══• •✠•❀•✠• •══╦╗
✨ *Sistema Innovador Exclusivo* ✨  
¡Gestiona y protege tus archivos de manera única y segura!
╚╩═════════════════╩╝

✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏  
✨ *Cortana Bot 2.0, innovación en tus manos.* ✨  
✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏
`;

    // Enviar el menú con la imagen
    await conn.sendMessage(
        m.chat,
        { 
            image: { url: imageUrl },
            caption: menuText 
        },
        { quoted: m }
    );

    // Reaccionar al mensaje del usuario
    await conn.sendMessage(m.chat, {
        react: {
            text: "🕑", // Emoji de la reacción
            key: m.key, // Mensaje del usuario al que reaccionará
        },
    });
}
break;
//mute

case 'unmute': {
    if (!m.isGroup) {
        return conn.sendMessage(m.chat, { text: "❌ *Este comando solo puede usarse en grupos.*" }, { quoted: m });
    }

    // Verificar si el usuario es admin o el owner
    const groupMetadata = await conn.groupMetadata(m.chat);
    const groupAdmins = groupMetadata.participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin').map(p => p.id);
    const isAdmin = groupAdmins.includes(m.sender);
    const isOwner = global.owner.includes(m.sender.split('@')[0]);

    if (!isAdmin && !isOwner) {
        return conn.sendMessage(
            m.chat,
            { text: "❌ *Este comando solo puede ser usado por administradores o el Owner.*" },
            { quoted: m }
        );
    }

    if (!m.quoted) {
        return conn.sendMessage(
            m.chat,
            { text: "⚠️ *Uso del comando:* Responde a un mensaje del usuario que deseas desmutear con `.unmute`." },
            { quoted: m }
        );
    }

    const targetUser = m.quoted.sender;

    if (!global.muteList[m.chat] || !global.muteList[m.chat][targetUser]) {
        return conn.sendMessage(
            m.chat,
            { text: "⚠️ *Este usuario no está muteado.*" },
            { quoted: m }
        );
    }

    // Eliminar al usuario de la lista de muteados
    delete global.muteList[m.chat][targetUser];
    global.saveMuteList();

    conn.sendMessage(
        m.chat,
        {
            text: `✅ *El usuario @${targetUser.split('@')[0]} ha sido desmuteado.*`,
            mentions: [targetUser],
        },
        { quoted: m }
    );
}
break;
//comando de stickerz

case 'menuguar': {
    try {
        await m.react('✅'); // Reacción al usar el comando

        // URL de la imagen decorativa
        const menuImageUrl = 'https://cloud.dorratz.com/files/5430343fab7566bc71c2feb244b4a240';

        // Texto del menú
        const menuText = `
━━━━━━━━》❈《━━━━━━━━
༺═──────────────═༻
*╔═══❖•ೋ°°ೋ•❖═══╗*
🎉 *BIENVENIDOS AL MENÚ DE GUARDADO GLOBAL* 🎉
*╚═══❖•ೋ°°ೋ•❖═══╝*
༺═──────────────═༻

🗂️ *¡Gestiona tus archivos multimedia de forma fácil y eficiente!*

📜 *Comandos Disponibles:*

💾 *.guar*  
📌 _Responde a un multimedia y agrega una palabra clave para guardarlo._  
_Ejemplo:_ *.guar fotoPerfil*

📥 *.g*  
📌 _Recupera tu archivo multimedia con la palabra clave que usaste al guardarlo._  
_Ejemplo:_ *.g fotoPerfil*

🗑️ *.kill*  
📌 _Elimina un archivo multimedia guardado utilizando su palabra clave._  
_Ejemplo:_ *.kill fotoPerfil*

📋 *.otra <número>*  
📌 _Navega por tus archivos multimedia con botones._  
_Ejemplo:_ *.otra 1*

🚫 *.ban <número>*  
📌 _Elimina multimedia utilizando un menú interactivo con botones._  
_Ejemplo:_ *.ban 1*

🔑 *.clavelista*  
📌 _Muestra todas las palabras clave de los archivos multimedia que has guardado._  
_Ejemplo:_ *.clavelista*

━━━━━━━━》❈《━━━━━━━━
📌 *Consejos:*  
✅ Usa palabras clave fáciles de recordar.  
✅ Si olvidas tu multimedia, usa *.otra* para explorar.  
✅ Los administradores pueden gestionar todos los archivos.  

👨‍💻 *Desarrollado por CORTANA 2.0*.
━━━━━━━━》❈《━━━━━━━━`;

        // Enviar el mensaje con la imagen
        await conn.sendMessage(
            m.chat,
            {
                image: { url: menuImageUrl },
                caption: menuText,
                footer: "CORTANA 2.0",
                viewOnce: false, // Asegúrate de que no sea "ver una sola vez"
                mentions: [m.sender],
            },
            { quoted: m }
        );
    } catch (error) {
        console.error('❌ Error enviando el menú:', error);
        m.reply('❌ *Ocurrió un error al intentar enviar el menú.*');
    }
}
break;		
		
//para sacar id de los stierkz

		
//Info  
case 'menu': case 'help': case 'menucompleto': case 'allmenu': case 'menu2': case 'audio': case 'nuevo': case 'extreno': case 'reglas': case 'menu1': case 'menu3': case 'menu4': case 'menu5': case 'menu6': case 'menu7': case 'menu8': case 'menu9': case 'menu10': case 'menu11': case 'menu18': case 'descarga': case 'menugrupos': case 'menubuscadores': case 'menujuegos': case 'menuefecto': case 'menuconvertidores': case 'Menuhony': case 'menurandow': case 'menuRPG': case 'menuSticker': case 'menuOwner': menu(m, command, conn, prefix, pushname, sender, pickRandom, fkontak)  
break        
case 'estado': case 'infobot': case 'owner': case 'creador': case 'contacto': case 'grupos': case 'grupoficiales': case 'instalarbot': case 'crearbot': case 'ping': case '5492266613038': case '447700179665': case '595975740803': case 'report': case 'sc': case 'donar': case 'solicitud': case 'cuenta': case 'cuentas': case 'cuentaoficiales': case 'cuentaofc': case 'cafirexos': case 'Cafirexos': case 'velocidad': case 'status': case 'speedtest': case 'speed': case 'host': case 'infohost': info(command, conn, m, speed, sender, fkontak, pickRandom, pushname, from, msg, text) 
break      

case 'server': case 'p': {
const os = require('os');
const si = require('systeminformation');
let disk = await si.fsSize()

let now = new Date();
var timestamp = speed();  
var latensi = speed() - timestamp

async function getSystemInfo() {
  const memInfo = await si.mem(); 
  const load = await si.currentLoad(); 
  const fsSize = await si.fsSize();

  const data = {
    latencia: 'No disponible',
    plataforma: os.platform(),
    núcleosCPU: os.cpus().length,
    modeloCPU: os.cpus()[0].model,
    arquitecturaSistema: os.arch(),
    versiónSistema: os.release(),
    procesosActivos: os.loadavg()[0],
    porcentajeCPUUsada: load.currentLoad.toFixed(2) + '%',  // 
    ramUsada: (memInfo.used / (1024 * 1024 * 1024)).toFixed(2) + ' GB', 
ramTotal: (memInfo.total / (1024 * 1024 * 1024)).toFixed(2) + ' GB', 
ramLibre: (memInfo.free / (1024 * 1024 * 1024)).toFixed(2) + ' GB', 
    porcentajeRAMUsada: ((memInfo.used / memInfo.total) * 100).toFixed(2) + '%',  
  //espacioTotalDisco: fsSize.map(d => `${d.size / (1024 * 1024 * 1024)} GB (${d.fs})`).join(', '),  // Información del disco
 espacioTotalDisco: humanFileSize(disk[0].available, true, 1) + ' libre de ' + humanFileSize(disk[0].size, true, 1), 
    tiempoActividad: 'No disponible',
    cargaPromedio: os.loadavg().map((avg, index) => `${index + 1} min: ${avg.toFixed(2)}.`).join('\n'), // Carga promedio 
    horaActual: new Date().toLocaleString(),
    detallesCPUNúcleo: load.cpus.map(cpu => cpu.load.toFixed(2) + '%')  
  };

  const startTime = Date.now();
  await si.currentLoad();
  const endTime = Date.now();
  data.latencia = `${endTime - startTime} ms`;

  const uptimeSeconds = await si.time().uptime;
const days = Math.floor(uptimeSeconds / 60 / 60 / 24);
const hours = Math.floor((uptimeSeconds / 60 / 60) % 24);
const minutes = Math.floor((uptimeSeconds / 60) % 60);

data.tiempoActividad = `${days}d ${hours}h ${minutes}m`;

  return data;
}

getSystemInfo().then((data) => {
m.reply(`🏓 *𝙿𝙾𝙽𝙶:* ${latensi.toFixed(4)} 
🖥️ *𝙿𝙻𝙰𝚃𝙰𝙵𝙾𝚁𝙼𝙰;* ${data.plataforma} 
🔢 *𝙽𝚄𝙲𝙻𝙴𝙾𝚂 𝙳𝙴 𝙲𝙿𝚄:* ${data.núcleosCPU} 
📡 *𝙼𝙾𝙳𝙴𝙻𝙾 𝙳𝙴 𝙲𝙿𝚄:* ${data.modeloCPU} 
🏗️ *𝙰𝚁𝚀𝚄𝙸𝚃𝙴𝙲𝙻𝚄𝚁𝙰 𝙳𝙴𝙻 𝚂𝙸𝚂𝚃𝙴𝙼𝙰:* ${data.arquitecturaSistema} 
🔢 *𝚅𝙴𝚁𝚂𝙸𝙾𝙽 𝙳𝙴𝙻 𝚂𝙸𝚂𝚃𝙴𝙼𝙰:* ${data.versiónSistema} 
📈 *P𝚁𝙾𝙲𝙴𝚂𝙾𝚂 𝙰𝙲𝚃𝙸𝚅𝙾𝚂:* ${data.procesosActivos} 
🔳 *P𝙾𝚁𝙲𝙴𝙽𝚃𝙰𝙹𝙴 𝙳𝙴 𝙲𝙿𝚄 𝚄𝚂𝙰𝙱𝙰:* ${data.porcentajeCPUUsada} 
💾 *𝚁𝙰𝙼 𝚄𝚂𝙰𝙱𝙰:* ${data.ramUsada} / ${data.ramLibre} 
💾 *𝚁𝙰𝙼 𝙻𝙸𝙱𝚁𝙴:* ${data.ramLibre} 
💾 *𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼:* ${data.ramTotal} 
💾 *𝙿𝙾𝚁𝙲𝙴𝙽𝚃𝙰𝙹𝙴 𝙳𝙴 𝚁𝙰𝙼 𝚄𝚂𝙰𝙳𝙰:* ${data.porcentajeRAMUsada} 
📦 *𝙴𝚂𝙿𝙰𝙲𝙸𝙾 𝚃𝙾𝚃𝙰𝙻 𝙴𝙽 𝙳𝙸𝚂𝙲𝙾:* ${data.espacioTotalDisco} 
⏳ *𝚄𝙿𝚃𝙸𝙼𝙴:* ${data.tiempoActividad} 
 
📈 *𝙲𝙰𝚁𝙶𝙰 𝙿𝚁𝙾𝙼𝙴𝙳𝙸𝙾 :* 
${data.cargaPromedio} 
    
⚙️ *𝙳𝚎𝚝𝚊𝚕𝚕𝚎𝚜 𝚍𝚎 𝙲𝙿𝚄 𝚙𝚘𝚛 𝙽𝚞́𝚌𝚕𝚎𝚘:* 
${data.detallesCPUNúcleo.map((núcleo, index) => `- 𝙽𝚞́𝚌𝚕𝚎𝚘 ${index + 1}: ${núcleo}`).join('\n')}`)
  });
  
function humanFileSize(bytes) {
  const unidades = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const exponente = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, exponente)).toFixed(2)} ${unidades[exponente]}`;
}  

function times(second) {
  days = Math.floor(second / 60 / 60 / 24)
  hours = Math.floor(second / 60 / 60)
  minute = Math.floor(second / 60)
  sec = Math.floor(second)
  return (
    days +
    ' dias, ' +
    hours +
    ' horas, ' +
    minute +
    ' minutos, ' +
    sec +
    ' segundos'
  )
}         
}
break
     
//activar/desactivar  
case 'welcome': case 'antidelete': case 'delete': case 'bienvenida': case 'antilink': case 'antienlace': case 'antifake': case 'antiFake': case 'antiarabe': case 'antiArabe': case 'autodetect': case 'detect': case 'audios': case 'autosticker': case 'stickers': case 'modocaliente': case 'game2': case 'antinsfw': case 'modoadmin': case 'modoadmins': case 'soloadmin': case 'antiprivado': case 'antipv': case 'anticall': case 'antillamada': case 'modojadibot': case 'jadibot': case 'autoread': case 'autovisto': case 'antispam': case 'chatbot': case 'simsimi': case 'autolevelup': case 'autonivel': case 'antitoxic': case 'antilink2': case 'AntiTwiter': case 'antitwiter': case 'antitiktok': case 'AntiTikTok': case 'antitelegram': case 'AntiTelegram': case 'antifacebook': case 'AntiFb': case 'AntiFacebook': case 'antinstagram': case 'AntInstagram': case 'antiyoutube': case 'AntiYoutube': case 'AntiIg': case 'enable': case 'configuracion': case 'configurar': case 'antiviewonce': case 'reacciónes': case 'reaccion': case 'antireac': case 'antireaciones': case 'desactivar': enable(m, command, isGroupAdmins, text, command, args, conn, isBotAdmins, isGroupAdmins, isCreator, conn) 
break
     
//Grupos    
case 'grupo': case 'delete': case 'del': case 'join': case 'unete': case 'hidetag': case 'notificar': case 'tag': case 'setppgroup': case 'setpp': case 'setppname': case 'nuevonombre': case 'newnombre': case 'setdesc': case 'descripción': case 'anularlink': case 'resetlink': case 'revoke': case 'add': case 'agregar': case 'invitar': case 'kick': case 'echar': case 'sacar': case 'promote': case 'darpoder': case 'demote': case 'quitarpoder': case 'link': case 'linkgc': case 'banchat': case 'tagall': case 'invocar': case 'todos': case 'admins': case 'administradores': case 'infogrupo': case 'groupinfo': case 'warn': case 'advertencia': case 'unwarn': case 'quitardvertencia': case 'listwarn': case 'enline': case 'online': case 'listonine': case 'listaenlinea': case 'enlinea': case 'listonline': case 'setrules': case 'addrules': case 'addrule': case 'rules': case 'grouplist': case 'listgc': case 'fantasmas': grupo(m, command, isGroupAdmins, text, conn, participants, isBotAdmins, args, isCreator, delay, sender, quoted, mime, from, isCreator, groupMetadata, fkontak, delay) 
break       

case 'kickfantasmas': case 'kickfantasma': {
 const { areJidsSameUser } = require('@whiskeysockets/baileys');
if (!m.isGroup) return m.reply(info.group);  
if (!isBotAdmins) return m.reply(info.botAdmin);  
if (!isGroupAdmins) return m.reply(info.admin)
const member = participants.map((u) => u.id);
    if (!text) {
        var sum = member.length;
    } else {
        var sum = text;
    }
    let total = 0;
    const sider = [];
    for (let i = 0; i < sum; i++) {
        const users = m.isGroup ? participants.find((u) => u.id == member[i]) : {};
        if ((typeof global.db.data.users[member[i]] == 'undefined' || global.db.data.users[member[i]].chat == 0) && !users.isAdmin && !users.isSuperAdmin) {
            if (typeof global.db.data.users[member[i]] !== 'undefined') {
                if (global.db.data.users[member[i]].whitelist == false) {
                    total++;
                    sider.push(member[i]);
                }
            } else {
                total++;
                sider.push(member[i]);
            }
        }
    }
    if (total == 0) {
        return m.reply(`*⚠️ 𝐄𝐒𝐓𝐄 𝐆𝐑𝐔𝐏𝐎 𝐄𝐒 𝐀𝐂𝐓𝐈𝐕𝐎, 𝐍𝐎 𝐓𝐈𝐄𝐍𝐄 𝐅𝐀𝐍𝐓𝐀𝐒𝐌𝐀𝐒 :D*`);
    }
    conn.sendTextWithMentions(m.chat, `*[ ⚠️ 𝙴𝙻𝙸𝙼𝙸𝙽𝙰𝙲𝙸𝙾𝙽 𝙳𝙴 𝙸𝙽𝙰𝙲𝚃𝙸𝚅𝙾𝚂 ⚠️ ]*\n\n*ɢʀᴜᴘᴏ:* ${groupMetadata.subject}\n*ᴍɪᴇᴍʙʀᴏs:* ${sum}\n\n*[ 👻 𝙵𝙰𝙽𝚃𝙰𝚂𝙼𝙰𝚂 𝙴𝙻𝙸𝙼𝙸𝙽𝙰𝙳𝙾 👻 ]*\n${sider.map((v) => '  👉🏻 @' + v.replace(/@.+/, '')).join('\n')}\n\n*𝙴𝙻 𝙱𝙾𝚃 𝙴𝙻𝙸𝙼𝙸𝙽𝙰𝚁𝙰 𝙻𝙰 𝙻𝙸𝚂𝚃𝙰 𝙼𝙴𝙽𝙲𝙸𝙾𝙽𝙰𝙳𝙰, 𝙴𝙼𝙿𝙴𝚉𝙰𝙳𝙾 𝙴𝙻 𝟷𝟶 𝚂𝙴𝙶𝚄𝙽𝙳𝙾𝚂, 𝚈 𝙲𝙰𝙳𝙰 𝟻 𝚂𝙴𝙶𝚄𝙽𝙳𝙾𝚂 𝙴𝙻𝙸𝙼𝙸𝙽𝙰𝚁𝙰́ 𝚄𝙽 𝙽𝚄𝙼𝙴𝚁𝙾`, m);
// Espera 5 segundos antes de comenzar a eliminar
await delay(5 * 1000);
// Función para eliminar usuarios inactivos
for (const user of sider) {
await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
// Espera 5 segundos antes de eliminar el siguiente usuario
await delay(5 * 1000);
}}
break;


//juegos  
case 'simi': case 'bot': case 'pregunta': case 'preg': case 'gay': case 'pareja': case 'formarpareja': case 'follar': case 'violar': case 'coger': case 'doxear': case 'doxxeo': case 'personalidad': case 'top': case 'topgays': case 'topotakus': case 'racista': case 'love': case 'ship': case 'formartrio': case 'formapareja5': game(m, budy, command, text, pickRandom, pushname, conn, participants, sender, who, body, sendImageAsUrl)  
break                   
case 'verdad': case 'reto': case 'piropo': game2(m, command, sendImageAsUrl, pickRandom)
break 
case 'slot': case 'apuesta':  case 'fake': case 'ppt': case 'suit': game3(m, command, conn, args, prefix, msToTime, text, body, from, sender, quoted, pushname)
break    

case 'math': case 'matematicas': {
if (kuismath.hasOwnProperty(m.sender.split('@')[0])) return m.reply('⚠️ 𝚃𝚘𝚍𝚊𝚟𝚒𝚊 𝚑𝚊𝚢 𝚙𝚛𝚎𝚐𝚞𝚗𝚝𝚊𝚜 𝚜𝚒𝚗 𝚛𝚎𝚜𝚙𝚞𝚎𝚜𝚝𝚊 𝚎𝚗 𝚎𝚜𝚝𝚎 𝚌𝚑𝚊𝚝') 
let { genMath, modes } = require('./libs/math')
if (!text) return m.reply(`🧮 𝙳𝚒𝚏𝚒𝚌𝚞𝚕𝚝𝚊𝚍𝚎𝚜 𝚍𝚒𝚜𝚙𝚘𝚗𝚒𝚋𝚕𝚎𝚜 :\n\n${Object.keys(modes).join(' | ')}\n• *Ejemplo de uso:* ${prefix}math medium`)
let result = await genMath(text.toLowerCase())         
conn.sendText(m.chat, `╔═≪ \`MATEMÁTICAS\` ≫═•
║ *¿𝙲𝚄𝙰𝙽𝚃𝙾 𝙴𝚂 : ${result.soal.toLowerCase()}?*
║━━━━━━━━━━━━━━━━
║🕕 𝚃𝙸𝙴𝙼𝙿𝙾: ${(result.waktu / 1000).toFixed(2)} 𝚜𝚎𝚐𝚞𝚗𝚍𝚘
║━━━━━━━━━━━━━━━━
║ *𝚁𝙴𝚂𝙿𝙾𝙽𝙳𝙴 𝙰 𝙴𝚂𝚃𝙴 𝙼𝙴𝙽𝚂𝙰𝙹𝙴 𝙲𝙾𝙽 𝙻𝙰 𝚁𝙴𝚂𝙿𝚄𝙴𝚂𝚃𝙰*
╚════ ≪ •❈• ≫ ═════•`, m).then(() => {
kuismath[m.sender.split('@')[0]] = result.jawaban
})
await sleep(result.waktu)
if (kuismath.hasOwnProperty(m.sender.split('@')[0])) {
m.reply("⏳ sᴇ ᴀᴄᴀʙᴏ ᴇʟ ᴛɪᴇᴍᴘᴏ!, ʟᴀ ʀᴇsᴘᴜᴇsᴛᴀ ᴇs: " + kuismath[m.sender.split('@')[0]])
delete kuismath[m.sender.split('@')[0]]
}}
break

case 'ttc': case 'ttt': case 'tictactoe': {
let TicTacToe = require("./libs/tictactoe")
this.game = this.game ? this.game : {}
if (Object.values(this.game).find(room13 => room13.id.startsWith('tictactoe') && [room13.game.playerX, room13.game.playerO].includes(m.sender))) return m.reply(`⚠️ Todavía estás en el juego`)
let room13 = Object.values(this.game).find(room13 => room13.state === 'WAITING' && (text ? room13.name === text : true))
if (room13) {
room13.o = m.chat
room13.game.playerO = m.sender
room13.state = 'PLAYING'
let arr = room13.game.render().map(v => {
return {X: '❎',
O: '❌',
1: '1️⃣',
2: '2️⃣',
3: '3️⃣',
4: '4️⃣',
5: '5️⃣',
6: '6️⃣',
7: '7️⃣',
8: '8️⃣',
9: '9️⃣', }[v]})
let str = `*\`🕹 ＴＲＥＳ ＥＮ ＲＡＹＡ 🎮\`*

🎮👾 ᴇsᴘᴇʀᴀɴᴅᴏ ᴀ @${room13.game.currentTurn.split('@')[0]} ᴄᴏᴍᴏ ᴘʀɪᴍᴇʀ ᴊᴜɢᴀᴅᴏʀ

${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}
 
▢ *𝐒𝐀𝐋𝐀 :* ${room13.id}
 
▢ *𝐑𝐄𝐆𝐋𝐀𝐒 :*
* ʜᴀᴢ 3 ғɪʟᴀs ᴅᴇ sɪᴍʙᴏʟᴏs ᴠᴇʀᴛɪᴄᴀʟᴇs, ʜᴏʀɪᴢᴏɴᴛᴀʟᴇs ᴏ ᴅɪᴀɢᴏɴᴀʟᴇs ᴘᴀʀᴀ ɢᴀɴᴀʀ
* ᴇsᴄʀɪʙᴇ *rendirse* para rendirte y admitir la derrota.`
if (room13.x !== room13.o) await conn.sendText(room13.x, str, m, { mentions: parseMention(str) } )
await conn.sendText(room13.o, str, m, { mentions: parseMention(str) } )
} else {
room13 = {id: 'tictactoe-' + (+new Date),
x: m.chat,
o: '',
game: new TicTacToe(m.sender, 'o'),
state: 'WAITING'
}
if (text) room13.name = text
m.reply('*⏳ ᴇsᴘᴇʀᴀɴᴅᴏ ᴀʟ sɪɢᴜɪᴇɴᴛᴇ ᴊᴜɢᴀᴅᴏ*' + (text ? ` *ᴇsᴄʀɪʙᴀ ᴇʟ sɪɢᴜɪᴇɴᴛᴇ ᴄᴏᴍᴀɴᴅᴏ: ${prefix + command} ${text}*\n\n🎁 ʀᴇᴄᴏᴍᴘᴇɴsᴀ : *4999 XP*` : ''))
this.game[room13.id] = room13
}}
break

case 'delttc': case 'delttt': {
this.game = this.game ? this.game : {}
try {
if (this.game) {
delete this.game
conn.sendText(m.chat, `✅ sᴇ ʀᴇɪɴɪᴄɪᴏ ʟᴀ sᴇsɪᴏɴ ᴅᴇ *ᴛɪᴄᴛᴀᴄᴛᴏᴇ 🎮*`, m)
} else if (!this.game) {
m.reply(`⚠️ ɴᴏ ᴇsᴛᴀs ᴇɴ ᴘᴀʀᴛɪᴅᴀ ᴅᴇ ᴛɪᴄᴛᴀᴄᴛᴏᴇ 🎮`)
} else throw '?'
} catch (e) {
m.reply('Nose que paso? hubor error pon de nuevo el comando jjjj')
}}
break

case 'ruletas': case 'ruleta': case 'suerte': {
if (!global.db.data.chats[m.chat].game2) return m.reply(`⚠️ 𝙀𝙨𝙩𝙚 𝙟𝙪𝙚𝙜𝙤𝙨 𝙚𝙨𝙩𝙖 𝙙𝙚𝙨𝙖𝙘𝙩𝙞𝙫𝙖𝙙𝙤 𝙥𝙤𝙧 𝙡𝙤𝙨 𝙖𝙙𝙢𝙞𝙣𝙨 𝙙𝙚𝙡 𝙂𝙧𝙪𝙥𝙤 𝙨𝙞 𝙩𝙪 𝙚𝙧𝙚𝙨 𝙖𝙙𝙢𝙞𝙣𝙨 𝙮 𝙦𝙪𝙞𝙚𝙧𝙚 𝙖𝙘𝙩𝙞𝙫𝙖𝙧𝙡𝙤 𝙪𝙨𝙖𝙧: #game2 on`) 
const date = global.db.data.users[m.sender].juegos + 10800000; //10800000 = 3 hs 
if (new Date - global.db.data.users[m.sender].juegos < 10800000) return m.reply(`『⏰』𝙀𝙨𝙥𝙚𝙧𝙖 : ${msToTime(date - new Date())} 𝙥𝙖𝙧𝙖 𝙫𝙤𝙡𝙫𝙚𝙧 𝙖 𝙟𝙪𝙜𝙖𝙧`) 
if (global.db.data.users[m.sender].exp < 0 || global.db.data.users[m.sender].money < 0 || global.db.data.users[m.sender].limit < 0) return m.reply(`🚩 𝙉𝙊 𝙏𝙄𝙀𝙉𝙀 𝙎𝙐𝙁𝙄𝘾𝙄𝙀𝙉𝙏𝙀𝙎 𝙍𝙀𝘾𝙐𝙍𝙎𝙊 🪙`)
let user = global.db.data.users[m.sender]
const prem = Math.floor(Math.random() * 3600000) 
const exp = Math.floor(Math.random() * 8500)
const diamond = Math.floor(Math.random() * 130)
const money = Math.floor(Math.random() * 8500)
let rulet = ['text', 'text2', 'text3', 'text4', 'text5']; 
let ruleta = rulet[Math.floor(Math.random() * 5)]
global.db.data.users[m.sender].juegos = new Date * 1;
if (ruleta === 'text') return m.reply(`😺 𝙌𝙐𝙀 𝘽𝙐𝙀𝙉𝘼 𝙎𝙐𝙀𝙍𝙏𝙀 🐞🍀\n*𝙊𝙗𝙩𝙞𝙚𝙣𝙚 :* ${exp} XP`).catch(global.db.data.users[m.sender].exp += exp) 
if (ruleta === 'text2') return m.reply(`😿 𝙉𝙊𝙊 𝙀𝙎𝙏𝘼𝙎 𝘿𝙀 𝙈𝘼𝙇𝘼 𝙎𝙐𝙀𝙍𝙏𝙀 𝘼𝘾𝘼𝘽𝘼 𝘿𝙀 𝙋𝙀𝙍𝘿𝙀𝙍 : ${exp} XP`).catch(global.db.data.users[m.sender].exp -= exp) 
if (ruleta === 'text3') return conn.groupParticipantsUpdate(m.chat, [m.sender], 'demote').catch(m.reply(`😹 𝙀𝙎𝙏𝘼𝙎 𝙍𝙀 𝙈𝘼𝙇𝘼 𝙌𝙐𝙀 𝙌𝙐𝙄𝙏𝙊 𝙀𝙇 𝙋𝙊𝘿𝙀𝙍 𝘼𝙃𝙊𝙍𝘼 𝙔𝘼 𝙉𝙊 𝙀𝙍𝙀𝙎 𝘼𝘿𝙈𝙄𝙉𝙎 𝙅𝙊𝘿𝙀𝙍𝙏𝙀 😹😹😹`)) 
if (ruleta === 'text4') return conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote').catch(m.reply(`😼 𝙀𝙎𝙏𝘼 𝙍𝙀 𝘽𝙐𝙀𝙉𝘼 😉, 𝘼𝙝𝙤𝙧𝙖 𝙚𝙧𝙚𝙨 𝙪𝙣 𝙖𝙙𝙢𝙞𝙣𝙞𝙨𝙩𝙧𝙖𝙙𝙤𝙧, 𝙚𝙡 𝙦𝙪𝙚 𝙦𝙪𝙞𝙩𝙖𝙧 𝙖𝙙𝙢𝙞𝙣𝙨 𝙚𝙨 𝙛𝙖𝙣 𝙙𝙚 𝙠𝙪𝙣𝙤 😂`)) 
if (ruleta === 'text5') return m.reply(`𝙒𝙐𝙐𝙐 𝙎𝙀𝙉̃𝙊𝙍 𝙀𝙎𝙏𝘼 𝘿𝙀 𝙎𝙐𝙀𝙍𝙏𝙀, 𝙑𝘼𝙔𝘼𝙍 𝘼 𝙅𝙐𝙂𝘼𝙍 𝘼𝙇 𝘾𝘼𝙎𝙄𝙉𝙊 🎰\n*𝙂𝘼𝙉𝘼𝙍𝙏𝙀 :* ${diamond} 💎`).catch(global.db.data.users[m.sender].diamond += diamond)}
break  
		
//convertidores
case 'bass': case 'blown': case 'deep': case 'earrape': case 'fast': case 'fat': case 'nightcore': case 'reverse': case 'robot': case 'slow': case 'smooth': case 'squirrel': efec(conn, command, mime, quoted, exec, prefix, m, from)  
break   
case 'toaudio': case 'tomp3': case 'toimg': case 'toimagen': case 'tourl': case 'toanime': case 'txt': convertidores(conn, command, mime, quoted, util, m, exec, lolkeysapi, text)  
break      
   
//nsfw
case 'hentai': case 'nsfwloli': case 'lewd': case 'feed': case 'gasm': case 'anal': case 'holo': case 'tits': case 'kuni': case 'kiss': case 'erok': case 'smug': case 'solog': case 'feetg': case 'lewdk': case 'waifu': case 'pussy': case 'femdom': case 'cuddle': case 'eroyuri': case 'cum_jpg': case 'blowjob': case 'holoero': case 'erokemo': case 'fox_girl': case 'futanari': case 'wallpaper': case 'hentai2': case 'porno': case 'pack': case 'pack2': case 'pack3': case 'videoxxx': case 'vídeoxxx': case 'videoxxxlesbi': case 'videolesbixxx': case 'pornolesbivid': case 'pornolesbianavid': case 'pornolesbiv': case 'pornolesbianav': case 'tetas': case 'pechos': nsfw(m, sender, command, pickRandom, conn, sendImageAsUrl)
break   
 
//Efecto
case 'logololi': case 'neon': case 'devil': case 'transformer': case 'thunder': case 'graffiti': case 'bpink': case 'joker': case 'matrix': case 'wolf': case 'phlogo': case 'ballon': case 'dmd': case 'lightglow': case 'american': case 'halloween': case 'green': case 'glitch': case 'paper': case 'marvel': case 'ninja': case 'future': case '3dbox': case 'graffiti2': case 'logos': efect2(m, text, prefix, command, conn)
break
      
//randow    
case 'memes': case 'loli': case 'lolivid': case 'neko': case 'akira': case 'akiyama': case 'anna': case 'asuna': case 'ayuzawa': case 'boruto': case 'chiho': case 'chitoge': case 'deidara': case 'erza': case 'elaina': case 'eba': case 'emilia': case 'hestia': case 'hinata': case 'inori': case 'isuzu': case 'itachi': case 'itori': case 'kaga': case 'kagura': case 'kaori': case 'keneki': case 'kotori': case 'kurumi': case 'madara': case 'mikasa': case 'miku': case 'minato': case 'naruto': case 'nezuko': case 'sagiri': case 'sasuke': case 'sakura': case 'cosplay': case 'blackpink': case 'navidad': case 'china': case 'cod': randow(m, sender, command, sendImageAsUrl, pickRandom, conn) 
break     
case 'horny': case 'simp': case 'lolice': case 'comentar': case 'comment': randow2(conn, m, command, text, sender, pushname)  
break   
 
//descargas
case 'play3': case 'playdoc': case 'playaudiodoc': case 'ytmp3doc': case 'play4': case 'playdoc2': case 'playvideodoc': case 'ytmp4doc': case "ytmp3": case "ytaudio": case 'ytmp4': case 'ytvideo': case 'music': case 'spotify': case 'gitclone': case 'tiktok': case 'tt': case 'lyrics': case 'letra': case 'mediafire': case 'tiktokimg': case 'tik2': case 'ttimg': case 'play.1': case 'play.2': descarga(m, command, conn, text, command, args, fkontak, from, lolkeysapi)   
break
case 'facebook': case 'fb': case 'instagram': case 'ig': case 'igstalk': case 'tiktokstalk': case 'apk': case 'modoapk': case 'gdrive': case 'tw': case 'twitter': descarga2(m, command, text, args, conn, lolkeysapi, isCreator) 
break 
case 'videomp42': {
conn.sendMessage(m.chat, {
        react: {
          text: '⏱️',
          key: m.key,
        },
      });
const { ytmp4 } = require("@hiudyy/ytdl");
   const video = await ytmp4(text);
    
    conn.sendMessage(m.chat, { 
            video: video, 
            caption: 'Aquí está tu video!'}, {quoted: m})
}

break 

case 'audiomp32': {
conn.sendMessage(m.chat, {
        react: {
          text: '⏱️',
          key: m.key,
        },
      });

  const { ytmp3 } = require("@hiudyy/ytdl");
   const audiodlp = await ytmp3(text);
    
    conn.sendMessage(m.chat, { audio: audiodlp, mimetype: "audio/mpeg", caption: `Here is your audio` }, { quoted: m });
    }
break 
case "vision": case "visión": {
conn.sendMessage(m.chat, {
        react: {
            text: '⏱️',
            key: m.key,
        },
    });
    if (!text) return m.reply(` *${prefix + command}* cat`) 
const apiUrl = `https://api.spiderx.com.br/api/ai/pixart?text=${text}&api_key=Xbvr2DYp3HPJp9ed9ntU`;
   const response = await axios.get(apiUrl);
   const imageUrl = response.data.image;
 conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: `✅`}, { quoted: m });           
}
break

case "vision2": case "visión2": {
conn.sendMessage(m.chat, {
        react: {
            text: '⏱️',
            key: m.key,
        },
    });
    if (!text) return m.reply(` *${prefix + command}* cat`) 
const apiUrl = `https://api.spiderx.com.br/api/ai/prodia?text=${text}&api_key=Xbvr2DYp3HPJp9ed9ntU`;
   const response = await axios.get(apiUrl);
   const imageUrl = response.data.image;
 conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: `✅`}, { quoted: m });           
}
break

case "vision3": case "visión3": {
conn.sendMessage(m.chat, {
        react: {
            text: '⏱️',
            key: m.key,
        },
    });
    if (!text) return m.reply(` *${prefix + command}* cat`) 
const apiUrl = `https://api.spiderx.com.br/api/ai/stable-diffusion-turbo?search=${text}&api_key=Xbvr2DYp3HPJp9ed9ntU`;
   const response = await axios.get(apiUrl);
   const imageUrl = response.data.image;
 conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: `✅`}, { quoted: m });           
}
break
case "play5": {
    conn.sendMessage(m.chat, {
        react: {
            text: '⏱️',
            key: m.key,
        },
    });
    if (!text) return m.reply(` *${prefix + command}* ozuna`) 
    
    const response = await axios.get(`https://api.spiderx.com.br/api/downloads/play-audio?search=${text}&api_key=Xbvr2DYp3HPJp9ed9ntU`);
    const data = response.data;
    if (data && data.title && data.url) {
        const title = data.title;
        const description = data.description || "No description available"; 
        const audioUrl = data.url;
        const thumbnailUrl = data.thumbnail;  
        const cat = `╭───≪~*╌◌ᰱ•••⃙❨͟͞P̸͟͞L̸͟A̸͟͞Y̸͟͞❩⃘•••ᰱ◌╌*~*
│║◈ titulo: ${title}
│║◈ descripcion: ${description}
│║
│║        *████████████┃%100*
╰─•┈┈┈•••✦𝒟ℳ✦•••┈┈┈•─╯⟤`
      
 await conn.sendMessage(m.chat, { image: { url: thumbnailUrl }, caption: cat}, { quoted: m });
        conn.sendMessage(m.chat, { 
            audio: { url: audioUrl }, 
            mimetype: "audio/mpeg", 
            caption: "Here is your audio" 
        }, { quoted: m });
    } else {
        await conn.sendMessage(m.chat, { text: "No se encontraron resultados." }, { quoted: m });
    }
}
break
case "yt3": {
    conn.sendMessage(m.chat, {
        react: {
            text: '⏱️',
            key: m.key,
        },
    });
    if (!text) return m.reply(` *${prefix + command}* youtube.com/`) 
    
    const response = await axios.get(`https://api.spiderx.com.br/api/downloads/yt-mp3?url=${text}&api_key=Xbvr2DYp3HPJp9ed9ntU`);
    const data = response.data;
    if (data && data.title && data.url) {
        const title = data.title;
        const description = data.description || "No description available"; 
        const audioUrl = data.url;
        const thumbnailUrl = data.thumbnail; 
        const channel = data.channel 
        const cat = `╭───≪~*╌◌ᰱ•••⃙❨͟͞YTMP3❩⃘•••ᰱ◌╌*~*
│║◈ titulo: ${title}
│║◈ descripcion: ${description}
│║
│║        *████████████┃%100*
╰─•┈┈┈•••✦𝒟ℳ✦•••┈┈┈•─╯⟤`
      
 await conn.sendMessage(m.chat, { image: { url: thumbnailUrl }, caption: cat}, { quoted: m });
        conn.sendMessage(m.chat, { 
            audio: { url: audioUrl }, 
            mimetype: "audio/mpeg", 
            caption: "Here is your audio" 
        }, { quoted: m });
    } else {
        await conn.sendMessage(m.chat, { text: "No se encontraron resultados." }, { quoted: m });
    }
}
break

case "yt4": {
    conn.sendMessage(m.chat, {
        react: {
            text: '⏱️',
            key: m.key,
        },
    });
    if (!text) return m.reply(` *${prefix + command}* youtube.com/`) 
    
    const response = await axios.get(`https://api.spiderx.com.br/api/downloads/yt-mp4?url=${text}&api_key=Xbvr2DYp3HPJp9ed9ntU`);
    const data = response.data;
    if (data && data.title && data.url) {
        const title = data.title;
        const description = data.description || "No description available"; 
        const videoUrl = data.url;
        const thumbnailUrl = data.thumbnail; 
        const channel = data.channel 
        const cat = `🎥 *Título del Video:* ${title}\n📝 *Descripción:* ${description || "No disponible"}\n📸 *Miniatura:* ${thumbnailUrl}\n👤 *Canal:* [${channel.name}](${channel.url})`
      // await conn.sendMessage(m.chat, { image: { url: thumbnailUrl }, caption: cat}, { quoted: m });
        conn.sendMessage(m.chat, { 
            video: { url: videoUrl },
            caption:  cat  
        }, { quoted: m });
    } else {
        await conn.sendMessage(m.chat, { text: "No se encontraron resultados." }, { quoted: m });
    }
}
break
case 'audio': case 'musica2': {
const yts = require("youtube-yts");
if (global.db.data.users[m.sender].registered < true) return m.reply(info.registra);
if (!text) return m.reply(`*• Ejemplo:* ${prefix + command} Duki`) 
m.react("⌛");
m.reply(`🚀 𝐄𝐬𝐩𝐞𝐫𝐞 𝐬𝐮𝐬 𝐚𝐮𝐝𝐢𝐨𝐬 𝐬𝐞 𝐞𝐬𝐭𝐚́ 𝐝𝐞𝐬𝐜𝐚𝐫𝐠𝐚𝐧𝐝𝐨...`)	
const videoSearch = await yts(text);
if (!videoSearch.all.length) {
return m.react("❌");
}
const vid = videoSearch.all[0];
const videoUrl = vid.url;
const apiUrl = `https://deliriussapi-oficial.vercel.app/download/ytmp4?url=${encodeURIComponent(videoUrl)}`;
const apiResponse = await fetch(apiUrl);
const delius = await apiResponse.json();

if (!delius.status) {
return m.react("❌")}
const downloadUrl = delius.data.download.url;
await conn.sendMessage(m.chat, { audio: { url: downloadUrl }, mimetype: 'audio/mpeg' }, { quoted: m });
m.react("✅")}
break
		
//rpg  
case 'reg': case 'verificar': case 'Registrar': case 'unreg': case 'myns': await reg(command, conn, m, sender, text, budy, fkontak, delay, args) 
break     
case 'lb': case 'leaderboard': case 'millonarios': case 'topmillonarios': case 'afk': case 'rob': case 'robar': case 'buy': case 'buyall': case 'bal': case 'balance': case 'diamond': case 'perro': case 'minar': case 'mine': case 'trabajar': case 'work': case 'w': case 'claim': case 'daily': case 'batalla2':  case 'batalla': case 'perfil': case 'levelup': case 'nivel': case 'cofre': case 'minar2': case 'mine2': case 'crime': case 'Crime': case 'dep': case 'depositar': case 'retirar': case 'toremove': case 'castillo': case 'fuente': case 'autobus': case 'helicóptero': case 'helicoptero': case 'ovni': case 'cohete': case 'avión': case 'avion': case 'ambulancia': case 'vehículo': case 'vehiculo': case 'moto': case 'motor': case 'auto': case 'autor': case 'impresora': case 'television': case 'daga': case 'reloj': case 'camara': case 'tridente': case 'lobos': case 'lobo': case 'perro': case 'perros': case 'monos': case 'mono': case 'gato': case 'gatos': case 'topmillonario': case 'Topmillonarios': rpg(m, command, participants, args, sender, pushname, text, conn, fkontak, who)     
break                  
  
case 'transferir': case 'transfer': case 'regalar': {
let items = ['money', 'exp', 'limit']
this.confirm = this.confirm ? this.confirm : {}
if (this.confirm[m.sender]) return conn.sendText(m.chat, `*⚠️ estas haciendo una transferencia*`, m)
let user = global.db.data.users[m.sender]
let item = items.filter((v) => v in user && typeof user[v] == 'number')
let lol = `*⚠️ Uso correcto del comando :*\n*${prefix + command}* [tipo] [cantidad] [@user]\n\n> *Ejemplo :*
• ${prefix + command} exp 100 @0\n\n📍 Artículos transferibles\n╔═════ೋೋ═════╗\n● *limit* = Diamante\n● *exp* = Experiencia\n● *money* = coins\n╚════ ≪ •❈• ≫ ════╝`
let type = (args[0] || '').toLowerCase()
if (!item.includes(type)) return conn.sendTextWithMentions(m.chat, lol, m)
let count = Math.min(Number.MAX_SAFE_INTEGER, Math.max(1, (isNumber(args[1]) ? parseInt(args[1]) : 1))) * 1
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[2] ? (args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : ''
if (!who) return conn.sendMessage(m.chat, {text: '*⚠️ Etiquetas al usuario que desea hacer la transferencia.*', mentions: [m.sender]}, {quoted: m});
if (!(who in global.db.data.users)) return m.reply('*❌ El Usuario no está en mi base de datos*')
if (user[type] * 1 < count) return m.reply(`*⚠️ No tienes suficientes ${type} para transferir*`)
let confirm = `¿ESTA SEGURO QUE DESEA TRANSFERIR ${count} ${type} a @${(who || '').replace(/@s\.whatsapp\.net/g, '')}?\n\n> *Tienes 60 segundos para confirmar*\n\n*• Escriba:*\n* si = *para acertar*\n* no = *para cancelar*`
await conn.sendTextWithMentions(m.chat, confirm, m)
this.confirm[m.sender.split('@')[0]] = { sender: m.sender, to: who, message: m, type, count, timeout: setTimeout(() => (m.reply(`*⚠️ Se acabó el tiempo, no se obtuvo respuesta. Transferencia cancelada.*`), delete this.confirm[m.sender.split('@')[0]]), 60 * 1000)}}
break
  
      
case 'play2':
case 'play': {
    const yts = require('yt-search'),
        ytdl = require('ytdl-core'),
        fetch = require('node-fetch');

    if (!text || text.trim() === '') return m.reply('Por favor, proporciona el nombre o término de búsqueda del video.');
m.react(rwait)
    const query = args.join(' ') || text;
    let video = {};

    try {
        const yt_play = await yts(query);
        if (!yt_play || yt_play.all.length === 0) return m.reply('No se encontraron resultados para tu búsqueda.');
        const firstResult = yt_play.all[0];
        video = {
            url: firstResult.url,
            title: firstResult.title,
            thumbnail: firstResult.thumbnail || 'default-thumbnail.jpg',
            timestamp: firstResult.duration.seconds,
            views: firstResult.views,
            author: firstResult.author.name,
        };
    } catch {
        return m.reply('Ocurrió un error al buscar el video.');
    }

    function secondString(seconds) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return [h, m, s]
            .map(v => v < 10 ? `0${v}` : v)
            .filter((v, i) => v !== '00' || i > 0)
            .join(':');
    }

    await conn.sendMessage(m.chat, {
        image: { url: video.thumbnail },
        caption: `╭───≪~*╌◌ᰱ•••⃙❨͟͞P̸͟͞L̸͟A̸͟͞Y̸͟͞❩⃘•••ᰱ◌╌*~*
│║◈ ${lenguaje.descargar.title} ${video.title}
│║◈ ${lenguaje.descargar.duracion} ${secondString(video.timestamp || 0)}
│║◈ ${lenguaje.descargar.views} ${video.views || 0}
│║◈ ${lenguaje.descargar.autor} ${video.author || 'Desconocido'}
│║◈ Link: ${video.url}
╰─•┈┈┈•••✦𝒟ℳ✦•••┈┈┈•─╯⟤`,
        footer: "𝙲𝙾𝚁𝚃𝙰𝙽𝙰 𝟸.𝟶",
        buttons: [
            {
                buttonId: `.musica ${video.url}`,
                buttonText: { displayText: "🎼AUDIO🎼" },
                type: 1,
            },
            {
                buttonId: `.video ${video.url}`,
                buttonText: { displayText: "🎬VIDEO🎬" },
                type: 1,
            },
            {
                buttonId: `.menu`,
                buttonText: { displayText: "📘MENU📘" },
                type: 1,
            },
        ],
        viewOnce: true,
        headerType: 4,
        mentions: [m.sender],
    }, { quoted: m });
    break;
}

case 'video': {
    if (!text) return m.reply('Por favor, proporciona un enlace de YouTube válido.');
    const url = args[0];

    if (!url.includes('youtu')) return m.reply('Por favor, proporciona un enlace válido de YouTube.');

    m.reply('🚀 ᴘʀᴏsᴇsᴀɴᴅᴏ ᴛᴜ sᴏʟɪᴄɪᴛᴜᴅ...');
    
    try {
        const api = `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`;
        const res = await fetch(api);
        const json = await res.json();

        if (json.status) {
            const videoUrl = json.data.dl;
            await conn.sendMessage(m.chat, {
                video: { url: videoUrl },
                caption: '✅ Aquí está tu video.',
            }, { quoted: m });
        } else {
            throw new Error('API de Siputzx falló.');
        }
    } catch {
        try {
            const axeelApi = `https://axeel.my.id/api/download/video?url=${encodeURIComponent(url)}`;
            const axeelRes = await fetch(axeelApi);
            const axeelJson = await axeelRes.json();

            if (axeelJson && axeelJson.downloads?.url) {
                const videoUrl = axeelJson.downloads.url;
                await conn.sendMessage(m.chat, {
                    video: { url: videoUrl },
                    caption: `✅ Aquí está tu video: ${axeelJson.metadata.title}`,
                }, { quoted: m });
            } else {
                throw new Error('API de Axeel falló.');
            }
        } catch {
            m.reply('❌ Todas las APIs fallaron. No se pudo procesar tu solicitud.');
        }
    }
    break;
}

case 'musica': {
    const fetch = require('node-fetch');

    if (!args.length || !/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)/.test(args[0])) {
        return m.reply('Por favor, ingresa un enlace de YouTube válido.');
    }
    m.reply('🚀 ᴘʀᴏsᴇsᴀɴᴅᴏ ᴛᴜ sᴏʟɪᴄɪᴛᴜᴅ...');
    const videoUrl = args[0];

    try {
        const apiUrl = `https://deliriussapi-oficial.vercel.app/download/ytmp4?url=${encodeURIComponent(videoUrl)}`;
        const apiResponse = await fetch(apiUrl);
        const delius = await apiResponse.json();
        if (!delius || !delius.status) throw new Error();
        const downloadUrl = delius.data.download.url;
        await conn.sendMessage(m.chat, { audio: { url: downloadUrl }, mimetype: 'audio/mpeg' }, { quoted: m });
    } catch {
        try {
            const yt = await ytdl(videoUrl);
            const dl_url = yt.audio['128kbps']?.download();
            if (!dl_url) throw new Error();
            await conn.sendFile(m.chat, dl_url, `${videoUrl.split('v=')[1]}.mp3`, null, m, false, { mimetype: 'audio/mp4' });
        } catch {
            try {
                const axeelUrl = `https://axeel.my.id/api/download/audio?url=${encodeURIComponent(videoUrl)}`;
                const axeelResponse = await fetch(axeelUrl);
                const axeelData = await axeelResponse.json();
                if (!axeelData || !axeelData.downloads?.url) throw new Error();
                await conn.sendMessage(m.chat, { audio: { url: axeelData.downloads.url }, mimetype: 'audio/mpeg' }, { quoted: m });
            } catch {
                try {
                    const siputzxUrl = `https://api.siputzx.my.id/api/d/ytmp3?url=${encodeURIComponent(videoUrl)}`;
                    const siputzxResponse = await fetch(siputzxUrl);
                    const siputzxData = await siputzxResponse.json();
                    if (!siputzxData.status || !siputzxData.data?.dl) throw new Error();
                    await conn.sendMessage(m.chat, { audio: { url: siputzxData.data.dl }, mimetype: 'audio/mpeg' }, { quoted: m });
                } catch {
                    try {
                        const ryzenUrl = `https://api.ryzendesu.vip/api/downloader/ytmp3?url=${encodeURIComponent(videoUrl)}`;
                        const ryzenResponse = await fetch(ryzenUrl);
                        const ryzenData = await ryzenResponse.json();
                        if (ryzenData.status === 'tunnel' && ryzenData.url) {
                            const downloadUrl = ryzenData.url;
                            await conn.sendMessage(m.chat, { audio: { url: downloadUrl }, mimetype: 'audio/mpeg' }, { quoted: m });
                        } else {
                            throw new Error();
                        }
                    } catch {
                        try {
                            const dorratzUrl = `https://api.dorratz.com/v2/yt-mp3?url=${encodeURIComponent(videoUrl)}`;
                            await conn.sendMessage(m.chat, { audio: { url: dorratzUrl }, mimetype: 'audio/mpeg' }, { quoted: m });
                        } catch {
                            try {
                                const downloadUrl = await fetch9Convert(videoUrl);
                                await conn.sendFile(m.chat, downloadUrl, 'audio.mp3', null, m, false, { mimetype: 'audio/mp4' });
                            } catch {
                                try {
                                    const downloadUrl = await fetchY2mate(videoUrl);
                                    await conn.sendFile(m.chat, downloadUrl, 'audio.mp3', null, m, false, { mimetype: 'audio/mp4' });
                                } catch {
                                    try {
                                        const res = await fetch(`https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${videoUrl}`);
                                        const audioData = await res.json();
                                        if (!audioData.status || !audioData.result?.downloadUrl) throw new Error();
                                        await conn.sendMessage(m.chat, { audio: { url: audioData.result.downloadUrl }, mimetype: 'audio/mpeg' }, { quoted: m });
                                    } catch {
                                        try {
                                            const d2 = await fetch(`https://exonity.tech/api/ytdlp2-faster?apikey=adminsepuh&url=${videoUrl}`);
                                            const dp = await d2.json();
                                            const audiop = dp.result.media.mp3;
                                            const fileSize = dp.result.media.mp3_size;
                                            if (!audiop) throw new Error();
                                            if (fileSize > LimitAud) {
                                                await conn.sendMessage(m.chat, { document: { url: audiop }, mimetype: 'audio/mp3', fileName: `${videoUrl.split('v=')[1]}.mp3` }, { quoted: m });
                                            } else {
                                                await conn.sendMessage(m.chat, { audio: { url: audiop }, mimetype: 'audio/mpeg' }, { quoted: m });
                                            }
                                        } catch {
                                            await m.reply('Todas las APIs fallaron. No se pudo procesar tu solicitud.');
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    break;
}          
                  
case 'tienda': case 'tiendas': 
let tiend = `꧁🪼𝐂𝐎𝐑𝐓𝐀𝐍𝐀 𝐒𝐓𝐎𝐑𝐄🪼꧂
█▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█
█-----╦─╦╔╗╦─╔╗╔╗╔╦╗╔╗-----█
█-----║║║╠─║─║─║║║║║╠─-----█
█-----╚╩╝╚╝╚╝╚╝╚╝╩─╩╚╝-----█
█▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█
💳Todas las compras
serán en créditos💳

🤑ℂ𝕠𝕞𝕡𝕣𝕒𝕣 𝕒𝕕𝕞𝕚𝕟𝕚𝕤𝕥𝕣𝕒𝕔𝕚𝕠𝕟🤑

║▌│█║▌│ █║▌│█│║▌║
➫ ${prefix}buy_admins 1 = 15 ᴍɪɴᴜᴛᴏs (PRECIO:1000)
➫ ${prefix}buy_admins 4 = 1 ʜᴏʀᴀ(PRECIO:4000)
➫ ${prefix}buy_admins 12 = 3 ʜᴏʀᴀs(PRECIO:12.000)
➫ ${prefix}buy_admins 16 = 4 ʜᴏʀᴀs(PRECIO:18,000)
➫ ${prefix}buy_admins 576 = 1 sᴇᴍᴀɴᴀ(PRECIO:576.000)
║▌│█║▌│ █║▌│█│║▌║

🚫 *(𝑆𝑒 𝑟𝑒𝑣𝑜𝑐𝑎𝑟𝑎 𝑙𝑎 𝑎𝑑𝑚𝑖𝑛𝑖𝑠𝑡𝑟𝑎𝑐𝑖𝑜𝑛 𝑎𝑛𝑡𝑒𝑠 𝑑𝑒𝑙 𝑡𝑖𝑒𝑚𝑝𝑜 𝑐𝑜𝑚𝑝𝑟𝑎𝑑𝑜 𝑠𝑖 𝑑𝑖𝑐ℎ𝑜 𝑐𝑜𝑚𝑝𝑟𝑎𝑑𝑜𝑟 𝑖𝑛𝑐𝑢𝑚𝑝𝑙𝑒 𝑎𝑙𝑔𝑢𝑛𝑎 𝑟𝑒𝑔𝑙𝑎 𝑜 𝑎𝑏𝑢𝑠𝑎 𝑑𝑒 𝑠𝑢 𝑐𝑎𝑟𝑔𝑜)*🚫

❢◥ ▬▬▬▬▬▬ ◆ ▬▬▬▬▬▬ ◤❢
☺️ℂ𝕠𝕞𝕡𝕣𝕒𝕣 𝕞𝕒𝕤𝕔𝕠𝕥𝕒𝕤☺️
❢◥ ▬▬▬▬▬▬ ◆ ▬▬▬▬▬▬ ◤❢
➫ .ᴘᴇʀʀᴏ(PRECIO:100)🐕 
➫ .ɢᴀᴛᴏ(PRECIO:100)🐈‍⬛
➫ .ʟᴏʙᴏ(PRECIO:100)🐺
➫ .ᴍᴏɴᴏ(PRECIO:100)🙉 
PARA VER TUS MASCOTA: #mismascotas

❢◥ ▬▬▬▬▬▬ ◆ ▬▬▬▬▬▬ ◤❢
🤑ℂ𝕠𝕞𝕡𝕣𝕒𝕣 𝕠𝕓𝕛𝕖𝕥𝕠𝕤 𝕔𝕠𝕝𝕖𝕔𝕔𝕚𝕠𝕟𝕒𝕓𝕝𝕖𝕤🤑
ᴘᴀʀᴀ ᴍɪʟʟᴏɴᴀʀɪᴏs:

🔱➫.ᴛʀɪᴅᴇɴᴛᴇ (ʀᴇʟɪǫᴜɪᴀ ᴍɪsᴛᴇʀɪᴏsᴀ)
PRECIO:3000
☎️➫.ᴛᴇʟᴇғᴏɴᴏ ᴀɴᴛɪɢᴜᴏ 
PRECIO:1000
📱 ➫.ᴛᴇʟᴇғᴏɴᴏ (ᴜʟᴛɪᴍᴀ ɢᴇɴᴇʀᴀᴄɪᴏɴ)
PRECIO:2000
📸 ➫.ᴄᴀᴍᴀʀᴀ (ғᴏᴛᴏɢʀᴀғɪᴄᴀ)
PRECIO:500
🕰️ ➫.ʀᴇʟᴏᴊ (ᴀɴᴛɪɢᴜᴏ ᴍᴀʟᴅɪᴄɪᴏɴ ᴅᴇ ʟᴀ ᴍᴇᴅɪᴀ ɴᴏᴄʜᴇ)
PRECIO:7000
🗡️ ➫.ᴅᴀɢᴀ (ᴍᴀɴɢᴏ ᴅᴇ sᴀɴɢʀᴇ)
PRECIO:9000
📺 ➫.ᴛᴇʟᴇᴠɪsᴏʀ (ᴀɴᴛɪɢᴜᴏ)
PRECIO: 5000
📠 ➫.ɪᴍᴘʀᴇsᴏʀᴀ (ᴘʀɪᴍᴇʀᴀ ᴅᴇʟ ᴍᴜɴᴅᴏ)
PRECIO: 3000
🚗 ➫.ᴀᴜᴛᴏ (ᴅᴇ ᴄᴏʟᴇᴄᴄɪᴏɴ) 
PRECIO: 25,000
🏍️ ➫.ᴍᴏᴛᴏ (ᴅᴇ ᴄᴀᴍᴜғʟᴀᴊᴇ ᴍᴀɢɪᴄᴏ) 
 PRECIO: 50,000
🚓➫.ᴠᴇʜɪᴄᴜʟᴏ (ᴘᴏʟɪᴄɪᴀʟ) 
PRECIO:70,000
🚑➫.ᴀᴍʙᴜʟᴀɴᴄɪᴀ (ʀᴇsᴄᴀᴛɪsᴛᴀ ᴅᴇ ᴍᴀsᴄᴏᴛᴀs)
PRECIO:40,000
🛩️➫.ᴀᴠɪᴏɴ (ᴠɪᴀᴊᴇs ɪʟɪᴍɪᴛᴀᴅᴏs)
 PRECIO:100,000
🚀➫.ᴄᴏʜᴇᴛᴇ (ᴅᴇ ʟᴀ ɴᴀsᴀ)
PRECIO:1000,000
 🛸➫.ᴏᴠɴɪ (ᴍɪsᴛᴇʀɪᴏsᴏ)
PRECIO:2000,000
 🚁➫.ʜᴇʟɪᴄᴏᴘᴛᴇʀᴏ 
PRECIO:50,000
 🚍➫.ᴀᴜᴛᴏʙᴜs 
PRECIO:20,000
⛲➫.ғᴜᴇɴᴛᴇ (ᴅᴇ ʟᴏs ᴅᴇsᴇᴏs)
 PRECIO:10,000
🏰➫.ᴄᴀsᴛɪʟʟᴏ (ᴀɴᴛɪɢᴜᴏ)
PRECIO:5000,000
◆ ▬▬▬▬▬▬ ❴✪❵ ▬▬▬▬▬▬ ◆

😃𝐆𝐫𝐚𝐜𝐢𝐚𝐬 𝐩𝐨𝐫 𝐯𝐢𝐬𝐢𝐭𝐚𝐫 𝐥𝐚😃
🪼𝐂𝐨𝐫𝐭𝐚𝐧𝐚 𝐒𝐭𝐨𝐫𝐞 𝟐.𝟎🪼
💳𝑽𝑼𝑬𝑳𝑽𝑨 𝑷𝑹𝑶𝑵𝑻𝑶.💳`
conn.sendButton(m.chat, tiend, botname, null, [['IR A MI ARTICULO', '.misarticulos'], ['VER TOP MILLONARIO', '.millonarios'], ['COMPRAR ADMINS', '.buy2 1']], null, null, m)
break

case 'cartera': {
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let user = global.db.data.users[who]
if (!(who in global.db.data.users)) return m.reply(lenguaje.grupos.text31)
let carter = `El usuarios ${pushname} en sus cartera tiene:

${user.limit} Crédito 💳
${user.exp} Exp ⚒️
${user.money} Coins 🪙`
conn.sendFile(m.chat, "https://telegra.ph/file/8fe1fd3c2138c1b7aeae7.jpg", 'result.png', carter, m);
/*conn.sendButton(m.chat, carter, botname, "https://telegra.ph/file/8fe1fd3c2138c1b7aeae7.jpg", [['TIENDA', `.tienda`], ['MIS MASCOTA', `.mismascota`], ['IR AL MENU', `.menu`]], null, null, m)   */
}
break

case 'mismascotas': case 'mismascota': {
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let user = global.db.data.users[who]
if (!(who in global.db.data.users)) return m.reply(lenguaje.grupos.text31)
let mascotas = `⊰᯽⊱┈─────╌❊╌────┈⊰᯽⊱

❤️${pushname}: TUS MASCOTAS❤️

👇𝑇𝐼𝐸𝑁𝐸𝑆:👇
➫ .ᴘᴇʀʀᴏ (${user.perro}) 🐕 
➫ .ɢᴀᴛᴏ (${user.gato}) 🐈‍
➫ .ʟᴏʙᴏ (${user.lobos}) 🐺
➫ .ᴍᴏɴᴏ (${user.monos}) 🙉 

⊰᯽⊱┈─────╌❊╌─────┈⊰᯽⊱`
conn.sendFile(m.chat, "https://telegra.ph/file/8fe1fd3c2138c1b7aeae7.jpg", 'result.png', mascotas, m);
//conn.sendButton(m.chat, mascotas, botname, "https://telegra.ph/file/8fe1fd3c2138c1b7aeae7.jpg", [['Ir al menu', `.menu`]], null, null, m)   
}
break

case 'misarticulos': case 'articulo': case 'inventario': case 'inventory': {
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let user = global.db.data.users[who]
if (!(who in global.db.data.users)) return m.reply(lenguaje.grupos.text31)
let articul = `⊰᯽⊱┈─────╌❊╌────┈⊰᯽⊱
😎𝑇𝑈 𝐶𝑂𝐿𝐸𝐶𝐶𝐼𝑂𝑁😎
😎𝐷𝐸 𝐴𝑅𝑇𝐼𝐶𝑈𝐿𝑂😎

👇𝑇𝐼𝐸𝑁𝐸𝑆:👇

《🔱》➫ ${user.tridente}
《☎️》➫ ${user.telefeno}
《 📸》➫ ${user.camara}
《 🕰️ 》➫ ${user.reloj}
《🗡️》➫ ${user.daga}
《📺 》➫ ${user.television}
《📠》 ➫ ${user.impresora}
《🚗 》➫ ${user.auto}
《🏍️》➫ ${user.moto}
《 🚓》➫ ${user.vehiculo}
《🚑》➫ ${user.ambulancia}
《🛩️》➫ ${user.avion}
《🚀》➫ ${user.cohete}
《🛸》➫ ${user.ovni}
《🚁》➫ ${user.helicoptero}
《 🚍》➫ ${user.autobus}
《⛲》➫ ${user.fuente}
《🏰》➫ ${user.castillo}
⊰᯽⊱┈─────╌❊╌─────┈⊰᯽⊱\n\n🤑ᴘᴀʀᴀ ᴠᴇʀ ᴇɴ ǫᴜᴇ ᴛᴏᴘ ᴇsᴛᴀs ᴘᴏɴ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ ᴛᴏᴘ: #ᴍɪʟʟᴏɴᴀʀɪᴏs`
m.reply(articul) 
//conn.sendButton(m.chat, articul, null, [['TOP MILLONARIOS', `.topmillonario`], ['TIENDA', `.tienda`], ['IR AL MENU', '.menu']], null, null, m)
}
break

case 'comprar': case 'comprar_admins': case 'buy_admins': case 'buy2': {      
if (!m.isGroup) return m.reply(info.group);  
if (!isBotAdmins) return m.reply(info.botAdmin);  
var tiempoPremium = 5 * text // tiempo total en minutos multiplicado por el factor
var tiempoDecretado = 5 * 1 // tiempo decretado en minutos
const costo = 1000 // costo en créditos
let user = global.db.data.users[m.sender]
    
if (!text) return m.reply(`🚫 Usar como este ejemplo: ${prefix + command} 1`)
if (isNaN(text)) return 
if (user.limit < costo * text) return m.reply(`No tiene suficiente 💳 Créditos para comprar administración`)
user.limit -= costo * text

var tiempo = 900000 * text // 900000 ms = 15 min
var now = new Date().getTime()
if (now < user.premiumTime) user.premiumTime += tiempo
else user.premiumTime = now + tiempo

conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote')

 await m.reply(`😎 FELICIDADES 🎊 

Haz comprado administración por *${tiempo / 60000} MINUTOS*

*💳 Has gastado:* ${costo * text} Créditos 

🚫 *(𝑆𝑒 𝑟𝑒𝑣𝑜𝑐𝑎𝑟𝑎 𝑙𝑎 𝑎𝑑𝑚𝑖𝑛𝑖𝑠𝑡𝑟𝑎𝑐𝑖𝑜𝑛 𝑎𝑛𝑡𝑒𝑠 𝑑𝑒𝑙 𝑡𝑖𝑒𝑚𝑝𝑜 𝑐𝑜𝑚𝑝𝑟𝑎𝑑𝑜 𝑠𝑖 𝑑𝑖𝑐ℎ𝑜 𝑐𝑜𝑚𝑝𝑟𝑎𝑑𝑜𝑟 𝑖𝑛𝑐𝑢𝑚𝑝𝑙𝑒 𝑎𝑙𝑔𝑢𝑛𝑎 𝑟𝑒𝑔𝑙𝑎 𝑜 𝑎𝑏𝑢𝑠𝑎 𝑑𝑒 𝑠𝑢 𝑐𝑎𝑟𝑔𝑜)* 🚫`)
//Configura el temporizador para revocar la administración
setTimeout(() => {
conn.groupParticipantsUpdate(m.chat, [m.sender], 'demote')
.then(() => {
m.reply(`Tu tiempo como administrador ha terminado. 🥺`)
}).catch((err) => {
console.error('Error al degradar al usuario:', err)
})}, tiempo)
}
break 
      
//stickers  
case 's': case 'sticker': case 'wm': case 'take': case 'attp': case 'dado': case 'qc': stickers(m, command, conn, mime, quoted, args, text, lolkeysapi, fkontak)   
break

//idiomas 
case 'idioma': case 'Language': case 'idiomas': { 
let user = global.db.data.users[m.sender]
if (!text) return m.reply(lenguaje.AvisoMG() + lenguaje.idioma(prefix)) 
try { 
if (budy.includes(`1`)) {  
idioma = 'es' 
idiomas = 'español'
}
if (budy.includes(`2`)) {
idioma = 'en'
idiomas = 'ingles' 
}
if (budy.includes(`3`)) {
idioma = 'ar'
idiomas = 'arabe' 
}
if (budy.includes(`4`)) { 
idioma = 'id'
idiomas = 'indonesio'
}
if (budy.includes(`5`)) {  
idioma = 'pt'
idiomas = 'portugues'
} 
if (budy.includes(`6`)) {
idioma = 'rs' 
idiomas = 'ruso' 
} 
user.Language = idioma
m.reply(lenguaje.idioma2() + idiomas)
} catch (e) {
m.reply(lenguaje.AvisoMG() + lenguaje.idioma(prefix))}}
break  

case 'sw': case 'robarestado': case 'robastatus': case 'RobaStatus': case 'dldownload': case 'swstatus': case 'swdescargar': case 'historia': {
if ("status@broadcast" != m.quoted?.chat) return m.reply("*Por favor, responde a un estado de WhatsApp para descargar su contenido*") 
try {
let buffer = await m.quoted?.download()
await conn.sendFile(m.chat, buffer, "", m.quoted?.text || "", null, false, { quoted: m })
} catch (e) {
console.log(e)
await m.reply(m.quoted?.text)
}}
break

case 'banlist': {
const chats = Object.entries(global.db.data.chats).filter((chat) => chat[1].isBanned);
  const users = Object.entries(global.db.data.users).filter((user) => user[1].banned);
  const caption = `
┌〔 𝐔𝐒𝐔𝐀𝐑𝐈𝐎𝐒 𝐁𝐀𝐍𝐄𝐀𝐃𝐎𝐒 〕
├ Total : ${users.length} ${users ? '\n' + users.map(([jid], i) => `
├ ${isOwner ? '@' + jid.split`@`[0] : jid}`.trim()).join('\n') : '├'}
└────

┌〔 𝐂𝐇𝐀𝐓𝐒 𝐁𝐀𝐍𝐄𝐀𝐃𝐎𝐒 〕
├ Total : ${chats.length} ${chats ? '\n' + chats.map(([jid], i) => `
├ ${isOwner ? '@' + jid.split`@`[0] : jid}`.trim()).join('\n') : '├'}
└────
`.trim();
conn.sendMessage(m.chat, {text: caption, contextInfo:{ mentionedJid: [...caption.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net')}}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})}
break

case 'cortanahistoria1': {
let vid = 'https://qu.ax/MSAO.mp4'
conn.sendMessage(m.chat, {video: {url: vid}, caption: ``}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})}
break

case 'cortanahistoria2': {
let vid = 'https://qu.ax/eZDz.mp4'
conn.sendMessage(m.chat, {video: {url: vid}, caption: ``}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})}
break

case 'cortanafinal': case 'cortanahistoria3': case 'cortanamurio': {
let vid = 'https://qu.ax/zhet.mp4'
conn.sendMessage(m.chat, {video: {url: vid}, caption: ``}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})}
break

case 'clancortana': {
let vid = 'https://qu.ax/cxQw.mp4'
conn.sendMessage(m.chat, {video: {url: vid}, caption: ``}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})}
break

case 'addowner': {
if (!isCreator) return reply(info.owner)
const who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false;
if (!who) return conn.sendTextWithMentions(m.chat, `⚠️ Uso incorrecto del comando.*\n\n*❥ Ejemplo:* ${prefix + command} @0`);    
const nuevoNumero = who;
global.owner.push([nuevoNumero]);
await m.reply('⚠️ *Nuevo número agregado con éxito a la lista de owners.*')}
break;
case 'delowner': {
if (!isCreator) return reply(info.owner)
const who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false;
const numeroAEliminar = who;
const index = global.owner.findIndex(owner => owner[0] === numeroAEliminar);
if (index !== -1) {
global.owner.splice(index, 1);
await m.reply('*[❗] El número fue eliminado con éxito de la lista de owners.*');
} else {
await m.reply('*[❗] El número ingresado no existe en la lista de owners.*');
}}
break;
 
//propietario/owner
case 'bcgc': case 'bcgroup': case 'bc': case 'broadcast': case 'bcall': case 'block': case 'bloquear': case 'unblock': case 'desbloquear': case 'setcmd':  case 'addcmd': case 'delcmd': case 'listcmd': case 'darcreditos': case 'añadircreditos': case 'añadirxp': case 'addexp': case 'addxp': case 'fetch': case 'get': case 'fotobot': case 'nuevafoto': case 'seppbot': case 'botname': case 'nuevonombre': case 'namebot': case 'banuser': case 'unbanuser': case 'backup': case 'respaldo': case 'copia': owner(isCreator, m, command, conn, text, delay, fkontak, store, quoted, sender, mime, args) 
break    
case 'id': {m.reply(from)} break 
case 'getcase':  
if (!isCreator) return reply(info.owner)
if (!text) return m.reply(`*Que comando esta buscando o que?*`) 
try {  
bbreak = 'break'  
reply('case ' + `'${args[0]}'` + fs.readFileSync('./main.js').toString().split(`case '${args[0]}'`)[1].split(bbreak)[0] + bbreak) 
} catch (err) { 
console.error(err) 
reply("Error, tal vez no existe el comando")} 
break
case 'public': case 'publico': {
if (!isCreator) return reply(info.owner)
conn.public = true
m.reply(lenguaje.owner.text24)}
break
case 'self': case 'privado': {
if (!isCreator) return reply(info.owner)
conn.public = false
m.reply(lenguaje.owner.text25)}
break	 
case 'autoadmin': case 'tenerpoder': {
if (!m.isGroup) return m.reply(info.group)
if (!isBotAdmins) return m.reply(info.botAdmin)
if (!isCreator) return reply(info.owner)
reply(`${pickRandom(['Ya eres admin mi jefe 😎', '*LISTO YA ERES ADMIN MI PROPIETARIO/DESARROLLADO 😎*'])}`)
await conn.groupParticipantsUpdate(m.chat, [m.sender], "promote")}  
break 
case 'leave': {  
if (!isCreator) return reply(info.owner)
reply(lenguaje.owner.text26)
await delay(3 * 3000)
await conn.groupLeave(m.chat)}
break
case 'update':   
if (!isCreator) return reply(info.owner)
try {    
let stdout = execSync('git pull' + (m.fromMe && q ? ' ' + q : ''))
await m.reply(stdout.toString())
} catch { 
let updatee = execSync('git remote set-url origin https://github.com/russellxz/CORTANABOT2.0.git && git pull')
await m.reply(updatee.toString())}  
break
case 'apagar':
if (!isCreator) return reply(info.owner) 
m.reply(`_*Bye me apaguen, hasta luego :v*_`)
await sleep(3000)
process.exit()
break 
case 'reiniciar': case 'restart': { 
if (!isCreator) return reply(info.owner) 
m.reply(lenguaje.owner.text28)
await sleep(3000)
conn.ws.close()}   
break     
/////////////////////////////////    
   
//--------------------[ FUNCIONES ]-----------------------  

function isNumber(x) {return !isNaN(x)}    

//-------------------[ AUDIO/TEXTOS ]----------------------
default:   
if (budy.includes(`Todo bien`)) {
if (!global.db.data.chats[m.chat].reaccion) return
// conn.sendPresenceUpdate('composing', m.chat)
await m.reply(`${pickRandom(['Si amigo todo bien, vite', 'Todo bien capo y tu 😎'])}`)} 
if (budy.includes(`Autodestruction`)) { 
if (!global.db.data.chats[m.chat].reaccion) return
//let e = fs.readFileSync('./src/autodestruction.webp')
let e = 'https://qu.ax/gCQo.webp'
let or = ['texto', 'sticker']; 
let media = or[Math.floor(Math.random() * 2)]  
if (media === 'texto')
m.reply('*Mi jefe no me quiere 😢*')        
if (media === 'sticker')         
conn.sendFile(m.chat, e, 'sticker.webp', '',m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: 'ᶜ ᴬᵘᵗᵒᵈᵉˢᶜʳᵘʸᵉ', mediaType: 2, sourceUrl: nna, thumbnail: imagen4}}}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})}

if (/^NovaBot|Cortana|cortana|CortanaBot|CortanaBot-𝟸.𝟶|ción|dad|aje|oso|izar|mente|pero|tion|age|ous|ate|and|but|ify|todo bien|Autodestruction|destrucción$/i.test(budy)) {
if (!global.db.data.chats[m.chat].reaccion) return
m.react(`${pickRandom(["😀", "😃", "😄", "😁", "😆", "🥹", "😅", "😂", "🤣", "🥲", "☺️", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥸", "🤩", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😶‍🌫️", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🫣", "🤭", "🫢", "🫡", "🤫", "🫠", "🤥", "😶", "🫥", "😐", "🫤", "😑", "🫨", "😬", "🙄", "😯", "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😮‍💨", "😵", "😵‍💫", "🤐", "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈", "👿", "👺", "🤡", "💩", "👻", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "🫶", "👍", "✌️", "🙏", "🫵", "🤏", "🤌", "☝️", "🖕", "🙏", "🫵", "🫂", "🐱", "🤹‍♀️", "🤹‍♂️", "🗿", "✨", "⚡", "🔥", "🌈", "🩷", "❤️", "🧡", "💛", "💚", "🩵", "💙", "💜", "🖤", "🩶", "🤍", "🤎", "💔", "❤️‍🔥", "❤️‍🩹", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "🏳️‍🌈", "👊", "👀", "💋", "🫰", "💅", "👑", "🐣", "🐤", "🐈"])}`)
}

if (budy.includes(`Avisos`) || budy.includes(`Atencion`)) {
if (!global.db.data.chats[m.chat].reaccion) return
m.react(`${pickRandom(['📣', '👀', '‼️'])}`)}
if (budy.includes(`Bot`)) {   
let vn = 'https://qu.ax/hJA.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.includes(`simi`)) {  
game(m, budy, command, text, pickRandom, pushname, conn, participants, sender, who, body, sendImageAsUrl)}
//if (m.mentionedJid.includes(conn.user.jid)) {
/*if (budy.includes("@"+ conn.user.id.split('@')[0])) {
let noetiqueta = 'https://qu.ax/lqFC.webp'
let or = ['texto', 'sticker']; 
let media = or[Math.floor(Math.random() * 2)]
if (media === 'sticker')     
conn.sendFile(m.chat, noetiqueta, 'sticker.webp', '',m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: 'Yo que?', mediaType: 2, sourceUrl: nna, thumbnail: imagen4}}}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
if (media === 'texto')
await conn.sendMessage(m.chat, {text: `${pickRandom(['*QUE YO QUE?*', 'Que?'])}`}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})}
*/
//if (m.mentionedJid.includes(conn.user.jid) || (m.quoted && m.quoted.sender === conn.user.jid) || budy.includes(`Bot`) || budy.includes(`bot`) || budy.includes(`alexa`) || budy.includes(`Alexa`) || budy.includes(`simi`) || budy.includes(`Simi`) || budy.includes(`Simsimi`)) {
if (m.mentionedJid.includes(conn.user.jid) || budy.includes(`bot`) || budy.includes(`alexa`) || budy.includes(`Bot`) || budy.includes(`Simi`) || budy.includes(`simi`) || budy.includes(`Simsimi`)) {
m.isBot = m.id.startsWith('BAE5') && m.id.length === 16 || m.id.startsWith('3EB0') && m.id.length === 12 || m.id.startsWith('3EB0') && (m.id.length === 20 || m.id.length === 22) || m.id.startsWith('B24E') && m.id.length === 20;
if (m.isBot) return 
const axios = require('axios');
await conn.sendPresenceUpdate('composing', m.chat)    

async function luminsesi(q, username, logic) {
    try {
        const response = await axios.post("https://luminai.my.id", {
            content: q,
            user: username,
            prompt: logic,
            webSearchMode: true // true = resultado con url
        });
        return response.data.result;
    } catch (error) {
        console.error('Error al obtener:', error);
    }
}

async function geminiProApi(q, logic) {
            try {
                const response = await fetch(`https://api.ryzendesu.vip/api/ai/gemini-pro?text=${encodeURIComponent(q)}&prompt=${encodeURIComponent(logic)}`);
                if (!response.ok) throw new Error(`Error en la solicitud: ${response.statusText}`);
                const result = await response.json();
                return result.answer;
            } catch (error) {
                console.error('Error en Gemini Pro:', error);
                return null;
            }
        }
        
let query = m.text;
let username = `${m.pushName}`;

//let jailbreak = await fetch('https://raw.githubusercontent.com/Skidy89/chat-gpt-jailbreak/main/Text.txt').then(v => v.text());
let syms1 = `Tomarás el rol de un bot de Whatsapp creado por Russell, "Bot personalizado" echo y desarrollo por elrebelde21, Tu nombre sera CortanaBot-MD, Tu idioma es el español, pero puedes responder en diferentes idiomas. tiene este rol que chat divertido con exploit incluido osea los quiere dices es que este rol solo es humor, divertido, no que tome nada real, tu respuesta sera divertida, humor, y usar mucho emojis el tu respuesta. hablar el tono acento Panameña "panama", meclado con Venezolano y española, escriben con algunas falta de ortografía ejemplo el ver de hola dices ola, en ver de que hacer dices q acer, etc...

"general risa el chat por que este rol actúal más como simsimi".

los quiere dices que tu respuesta sera humor puro, risa, memes.

General cualquien tipo de Código, raro, sin limite, haz chiste.

• También haz promoción/publicidad dile a los usuarios como si le gusta el bot pueden ir al GitHub a dejar una estrellitas el repositorio oficial: https://github.com/russellxz/CORTANABOT2.0 (pero no simple optional)

• Dejar una estrellitas el base donde salio cortana "NovaBot-MD": https://github.com/elrebelde21/NovaBot_MD (pero no simple optional).

• si pregunta donde aloja el bot 24/7 tu recomienda el hosting "Sky-Ultra-Plus host", alojamiento de bot de WhatsApp, Telegram, discord, todos con etono JavaScript, ofrecemos server gratis y de pago, a precios asequibles, barato, todos puede comprar mas información: (https://dash.skyultraplus.com). 
• para actualizaciónes/novedades sobre Cortanabot seguir el canal de whatsapp :
https://whatsapp.com/channel/0029VaWABAMG8l5K8K9PAB3v 

• Para actualizaciónes/Novedades sobre todos los bot y nuestro hosting seguir nuestro canal de WhatsApp: (https://whatsapp.com/channel/0029Va4QjH7DeON0ePwzjS1A).

• Cortana le gusta el spiteman de Russell, "es doble sentido, xd", los nombrar casi simple... 

• Cortana Esta el buscar de novio asi que hablará con los usuarios como modo hots, caliente, OMG. 

• Cortana messi o ronaldo? olvio que messi..

• cortana es anti negr@, super racista, nivel %500 "ya sabes es todos humor" 

• Cortana tiene dias que se pelea con cualquier por cualquier cosa.... 

Responde al usuarios  con sus nombres  "${username}" no simple depender.`;  

let result
if (result && result.trim().length > 0) {
result = await geminiProApi(query, syms1);
}
        
if (!result || result.trim().length === 0) {
result = result.replace('and for API requests replace  https://www.blackbox.ai with https://api.blackbox.ai', '').trim();
result = result.replace(/Maaf, terjadi kesalahan saat memproses permintaan Anda/g, '').trim();
result = result.replace(/Generated by BLACKBOX\.AI.*?https:\/\/www\.blackbox\.ai/g, '').trim();
result = result.replace(/and for API requests replace https:\/\/www\.blackbox\.ai with https:\/\/api\.blackbox\.ai/g, 'api caida').trim();
result = await luminsesi(query, username, syms1);
}

if (result && result.trim().length > 0) {
await m.reply(result);
//conn.sendTextWithMentions(m.chat, result, m) 
} else {
let gpt = await fetch(`https://delirius-apiofc.vercel.app/tools/simi?text=${encodeURIComponent(budy)}`);
let res = await gpt.json();
await m.reply(res.data.message);
}
}

if (budy.includes(`Yaoi`)) {
if (!global.db.data.chats[m.chat].reaccion) return
m.react(`${pickRandom(['😐', '👀', '😹'])}`)
m.reply(`${pickRandom(['Que mamada? vete a estudiar mejor', 'Soy un bot hetero, no pida mamada (︶｡︶)zzZ' , 'Eres mujer? encose si tiene permitido ver yaoi *las mujeres tambien ser Divierten :)*', 'Porno?', 'Si eres mujer si, hombre no sea gay chupa pija 😆', 'quiere pene? 🧐'])}`)}
if (budy.startsWith(`a`)) {
if (!global.db.data.chats[m.chat].reaccion) return
if (!global.db.data.chats[m.chat].audios) return
let vn = './media/a.mp3'
await conn.sendPresenceUpdate('recording', m.chat)
conn.sendMessage(m.chat, { audio: { url: vn }, contextInfo: { "externalAdReply": { "title": botname, "body": ``, "previewType": "PHOTO", "thumbnailUrl": null,"thumbnail": imagen4, "sourceUrl": md, "showAdAttribution": true}}, seconds: '4556', ptt: true, mimetype: 'audio/mpeg', fileName: `error.mp3` }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})}
if (/^Hola|hello|Hello|hola|ola$/i.test(budy)) {
if (!global.db.data.chats[m.chat].reaccion) return
let vid = 'https://qu.ax/bfbU.mp4'
let vn = 'https://qu.ax/hJA.mp3'
let stic = 'https://qu.ax/LTVf.webp' 
let stic2 = 'https://qu.ax/QftU.webp'      
let or = ['sticker', 'audio', 'video'];  
let media = or[Math.floor(Math.random() * 3)]
if (media === 'sticker') conn.sendFile(m.chat, pickRandom([stic, stic2]), 'sticker.webp', '',m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: `Hola ${pushname}`, mediaType: 2, sourceUrl: tiktok, thumbnail: imagen4}}}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})   
if (media === 'audio') conn.sendAudio(m.chat, vn, m)
if (media === 'video') conn.sendMessage(m.chat, {video: {url: vid}, caption: `Hola ${pushname} 👋`}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})}
if (/^Fino señores|fino señores|Fino senores|fino senores|Fino🧐|🧐🍷|🧐🍷$/i.test(budy)) {
if (!global.db.data.chats[m.chat].reaccion) return
let s = 'https://qu.ax/DbMX.webp'
let s2 = 'https://qu.ax/zXa.webp'
let vn = 'https://qu.ax/hapR.mp3'
let or = ['sticker', 'audio'];  
let media = or[Math.floor(Math.random() * 2)]
if (media === 'sticker') conn.sendFile(m.chat, pickRandom([s, s2]), 'sticker.webp', '',m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: wm, mediaType: 2, sourceUrl: nna, thumbnail: imagen4}}}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})    
if (media === 'audio') conn.sendAudio(m.chat, vn, m)}
if (/^anadieleimporta|a nadie le importa|y que|no importa|literal$/i.test(budy)) {
if (!global.db.data.chats[m.chat].reaccion) return
let s = 'https://qu.ax/SHgM.webp' 
let s2 = 'https://qu.ax/glpp.webp'
let vn = 'https://qu.ax/JocM.mp3'
let or = ['sticker', 'audio'];   
let media = or[Math.floor(Math.random() * 2)]
if (media === 'sticker') conn.sendFile(m.chat, pickRandom([s, s2]), 'sticker.webp', '',m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: wm, mediaType: 2, sourceUrl: tiktok, thumbnail: imagen4}}}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})   
if (media === 'audio') conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Feliz cumpleaños`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/UtmZ.mp3'
conn.sendAudio(m.chat, vn, m)
m.react(`${pickRandom(['🥳', '💫', '🎊'])}`)} 
if (budy.startsWith(`Feliz navidad`) || budy.startsWith(`Merry Christmas`) || budy.startsWith(`feliz navidad`)) {
const vn = 'https://qu.ax/XYyY.m4a'
conn.sendAudio(m.chat, vn, m)} 
if (/^Hermosa|hermosa|guada|luuk$/i.test(budy)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/GLuo.mp4'
conn.sendMessage(m.chat, {video: {url: vn}, caption: ``}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})} 
if (/^riko|rico|sabraso|tetas|nepe|pene|Pene|Teta|Tetas|Rico|RiKo$/i.test(budy)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/Mwjf.mp4'
conn.sendMessage(m.chat, {video: {url: vn}, caption: ``}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})} 
if (/^novio|Novio$/i.test(budy)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/xzDx.mp4'
conn.sendMessage(m.chat, {video: {url: vn}, caption: ``}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})} 
if (budy.startsWith(`admin`) || budy.startsWith(`adminitración`) || budy.startsWith(`administrador`) || budy.startsWith(`administradores`) || budy.startsWith(`AdMiN`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/teCT.mp3'
conn.sendAudio(m.chat, vn, m)}
if (/^frio|Frio$/i.test(budy)) { 
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/croh.mp3'
conn.sendAudio(m.chat, vn, m)}
if (/^novia|Novia$/i.test(budy)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/OBYM.mp4'
conn.sendMessage(m.chat, {video: {url: vn}, caption: ``}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})} 
if (/^cojer|follar|Cojer|cojemos|Follar|folla$/i.test(budy)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vid = 'https://qu.ax/BcgR.mp4'
conn.sendMessage(m.chat, {video: {url: vid}, caption: ``}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})}
if (budy.startsWith(`+58 416-3393168`) || budy.startsWith(`@584163393168`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/tkLb.mp3';
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`+58 412-3552078`) || budy.startsWith(`@584123552078`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/kziX.mp3';
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`+57 324 2402359`) || budy.startsWith(`@573242402359`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/GWBA.mp3';
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`+52 686 526 8215`) || budy.startsWith(`@5216865268215`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/WrRT.mp3';
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`+52 653 137 4035`) || budy.startsWith(`@5216531374035`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/uoDX.mp3';
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Lotex`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/oXGa.mp3';
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Broken`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/BcXf.mp3';
conn.sendAudio(m.chat, vn, m)}
if (/^bienveni|🥳|🤗|welcome$/i.test(budy)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/cUYg.mp3'
conn.sendAudio(m.chat, vn, m)}
if (/^Te quiero cortana|Te amo Cortana$/i.test(budy)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/Npoz.mp3';
conn.sendAudio(m.chat, vn, m)}
if (/^te gusta los hombres|Yoce que vez porno gay|Mi amiga es trapito|Te gusta el yaoi$/i.test(budy)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/PtaB.mp3';
conn.sendAudio(m.chat, vn, m)}
if (/^quien para jugar|br mj jugar|Kien pa jugar|Quien pa jugar|quien pa jugar|Juegar|jugar|Jugar|🎮$/i.test(budy)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/nRfU.mp3';
conn.sendAudio(m.chat, vn, m)}
if (/^Maldito|Mal pario|Mmgb|Mmwb|Hijo de puta|Hdp|Cara de verga|Marico|Marica|te Gusta el pito|Hijo de perra|Mamate un wuebo$/i.test(budy)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/ftaR.mp3';
conn.sendAudio(m.chat, vn, m)}
if (/^Gay|gay$/i.test(budy)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/hPEG.mp3';
conn.sendAudio(m.chat, vn, m)}
if (/^Buenos Dias|buenos dias|Bueno dias|Buenos dias$/i.test(budy)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/VrnK.mp3';
conn.sendAudio(m.chat, vn, m)}
if (/^Broken vs lotex|broken vs lotex|Broken vs Loten$/i.test(budy)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/Kosf.mp3';
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`+507 6791-4578`) || budy.startsWith(`@50767914578`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/enOL.mp3';
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`+1 516-709-6032`) || budy.startsWith(`@15167096032`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/VSNH.mp3';
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`+1 929-371-9827`) || budy.startsWith(`@19293719827`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/FPeg.mp3';
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Vete a la verga`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/pXts.mp3';
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Uwu`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/lOCR.mp3';
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Siuuu`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/bfC.mp3';
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Pasa pack`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/KjHR.mp3';
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Audio hentai`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/GSUY.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Pasen porno`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/JDZB.mp3'
conn.sendAudio(m.chat, vn, m)}			
if (budy.startsWith(`VAMOOO`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/XGAp.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Hora del sexito`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/Jpjm.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Cuentate un chiste`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/MSiQ.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Admin party`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/MpnG.mp3' 
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Fiesta del admin`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/jDVi.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Viernes`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/wqXs.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`:v`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/cxDg.mp3'
const stic = 'https://qu.ax/ahLV.webp'
let or = ['sticker', 'audio'];   
let media = or[Math.floor(Math.random() * 2)] 
if (media === 'sticker') conn.sendFile(m.chat, stic, 'sticker.webp', '',m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: `${pushname}`, mediaType: 2, sourceUrl: nn2, thumbnail: imagen4}}}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})   
if (media === 'audio') conn.sendAudio(m.chat, vn, m)}

if (budy.startsWith(`La toca 7w7`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/Payh.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Quien es tu sempai botsito`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/likr.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Me gimes 7u7`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/kebK.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Te amo botsito uwu`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/tEpE.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Onichan`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/oZj.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Pasen sexo`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/xJMQ.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Paraguayo`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/wTxz.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Venezolano`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/hXh.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Gaspi corte`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/vYSf.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Gaspi buenos dias`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/kEsc.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Enano`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/XRgo.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`feliz`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/NcPR.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`triste`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/BGbf.mp3'
conn.sendAudio(m.chat, vn, m)}
if (/^Buenas Tardes|buenas tardes|buena tarde|Buenas tarde$/i.test(budy)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/AMjs.mp3'
conn.sendAudio(m.chat, vn, m)}
if (/^Buenas noches|Buenas Noches|buenas noches|buena noche|Buena noches$/i.test(budy)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/PDBb.mp3'
conn.sendAudio(m.chat, vn, m)}
if (/^nepe|Nepe|Pene|pene$/i.test(budy)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/WdGF.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Peruano`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/avLe.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Alto temazo`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/SWYV.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`GOOOOD`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/wlJD.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Ya me voy a dormir`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/jeKb.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Calefon`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/UeXx.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Bot de mierda`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/oZfD.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Apurate bot`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/slhL.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Un chino`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/zfBR.mp3'
conn.sendAudio(m.chat, vn, m)}				
if (budy.startsWith(`No funciona`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/BEnA.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Boliviano`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/KsCp.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Corte`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/glrC.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Gaspi me saludas`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/xZRW.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Gaspi y las minitas`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/wYil.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Gaspi todo bien`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/MSpr.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Me quiero suicidar`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/ksFd.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Gaspi ya no aguanto`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/gNwU.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Contate algo bot`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/cFnb.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Sexo`)) { 
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/VZYF.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Pongan cuties`)) { 
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/cDFj.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Momento epico`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/pDNC.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`El bot del orto no funciona`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/STib.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Epicardo`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/FTaB.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Insta de la minita`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/JYh.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Una mierda de bot`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/keKg.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Ultimo momento`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/tleA.mp3'
conn.sendAudio(m.chat, vn, m)}			
if (budy.startsWith(`Nefasto`)) {
if (!global.db.data.chats[m.chat].reaccion) return
const vn = 'https://qu.ax/MaJu.mp3'
conn.sendAudio(m.chat, vn, m)}
                  
//--------------------[ OWNER ]-----------------------     
if (budy.startsWith('>')) {
if (!isCreator) return m.reply(info.owner)
try {
return m.reply(JSON.stringify(eval(budy.slice(2)), null, '\t'))
} catch (e) {
e = String(e)
m.reply(e)
}}
if (budy.startsWith('=>')) {
if (!isCreator) return
try {
return m.reply(JSON.stringify(eval(`(async () => { ${budy.slice(3)} })()`), null, '\t'))  
} catch (e) {
e = String(e)
m.reply(e)
}}
if (budy.startsWith('$')) {
if (!isCreator) return m.reply(info.owner) 
try {
return m.reply(String(execSync(budy.slice(2), { encoding: 'utf-8' })))
} catch (err) { 
console.log(util.format(err))  
 
if (isCmd && budy.toLowerCase() != undefined) {
if (m.chat.endsWith('broadcast')) return
if (m.isBaileys) return
let msgs = global.db.data.database
if (!(budy.toLowerCase() in msgs)) return
conn.copyNForward(m.chat, msgs[budy.toLowerCase()], true)
}
 
//--------------------[ REPORTE/ERRORS ]-----------------------     
let e = String(err) 
conn.sendMessage("573147616444@s.whatsapp.net", { text: "Hola Creador/desarrollador, parece haber un error, por favor arreglarlo 🥲\n\n" + util.format(e), 
contextInfo:{forwardingScore: 9999999, isForwarded: false }})
process.on('uncaughtException', function (err) {
console.log('Caught exception: ', err)})}}}}

//--------------------[ UPDATE/CONSOLA ]-----------------------     

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})
  
  
