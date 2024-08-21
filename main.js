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
//global.db.data.sticker = global.db.data.sticker || {} 
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
const userSender = m.key.fromMe ? botnm : m.isGroup && m.key.participant.includes(":") ? m.key.participant.split(":")[0] + "@s.whatsapp.net" : m.key.remoteJid.includes(":") ? m.key.remoteJid.split(":")[0] + "@s.whatsapp.net" : m.key.fromMe ? botnm : m.isGroup ? m.key.participant : m.key.remoteJid  
const isCreator = [conn.decodeJid(conn.user.id), ...global.owner.map(([numero]) => numero)].map((v) => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
const isOwner = isCreator || m.fromMe;
const isMods = isOwner || global.mods.map((v) => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
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
function sendMessage(conn, chat, text, m) {conn.sendMessage(chat, { text: text, contextInfo: { forwardedNewsletterMessageInfo: {newsletterJid: '120363266665814365@newsletter', serverMessageId: '', newsletterName: `${ucapan()} ${pushname}` }, forwardingScore: 9999999, isForwarded: true }}, {quoted: m, ephemeralExpiration: 24*60*60*1000, disappearingMessagesInChat: 24*60*60*1000 // Ajustado a milisegundos
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
if (m.message) {
conn.readMessages([m.key])}	

//Marcar como (Escribiendo...) 
// if (command) {
// await conn.sendPresenceUpdate('composing', m.chat)
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
if (budy.match(`g0re|g0r3|g.o.r.e|sap0|sap4|malparido|malparida|malparidos|malparidas|m4lp4rid0|m4lp4rido|m4lparido|malp4rido|m4lparid0|malp4rid0|chocha|chup4la|chup4l4|chupalo|chup4lo|chup4l0|chupal0|chupon|chupameesta|sabandija|hijodelagranputa|hijodeputa|hijadeputa|hijadelagranputa|kbron|kbrona|cajetuda|laconchadedios|putita|putito|put1t4|putit4|putit0|put1to|put1ta|pr0stitut4s|pr0stitutas|pr05titutas|pr0stitut45|prostitut45|prostituta5|pr0stitut45|fanax|f4nax|drogas|droga|dr0g4|nepe|p3ne|p3n3|pen3|p.e.n.e|pvt0|puto|pvto|put0|hijodelagransetentamilparesdeputa|Chingadamadre|coño|c0ño|coñ0|c0ñ0|afeminado|drog4|cocaína|marihuana|chocho|chocha|cagon|pedorro|agrandado|agrandada|pedorra|sape|nmms|mamar|chigadamadre|hijueputa|chupa|kaka|caca|bobo|boba|loco|loca|chupapolla|estupido|estupida|estupidos|polla|pollas|idiota|maricon|chucha|verga|vrga|naco|zorra|zorro|zorras|zorros|pito|huevon|huevona|huevones|rctmre|mrd|ctm|csm|cp|cepe|sepe|sepesito|cepecito|cepesito|hldv|ptm|baboso|babosa|babosos|babosas|feo|fea|feos|feas|webo|webos|mamawebos|chupame|bolas|qliao|imbecil|embeciles|kbrones|cabron|capullo|carajo|gore|gorre|gorreo|sapo|sapa|mierda|cerdo|cerda|puerco|puerca|perra|perro|joden|jodemos|dumb|fuck|shit|bullshit|cunt|cum|semen|bitch|motherfucker|foker|fucking`)) { 
if (m.isBaileys && m.fromMe) { 
return !0 }   
if (!m.isGroup) { 
return !1 }
if (isGroupAdmins) return
const user = global.db.data.users[m.sender];
const chat = global.db.data.chats[m.chat];
const bot = global.db.data.settings[conn.user.jid] || {};
const isToxic = budy.match; 
user.warn += 1;
if (!(user.warn >= 4)) await conn.sendMessage(m.chat, {text: `Hey @${m.sender.split('@')[0]} decir la palabra *(${budy})* Esta prohibida En este grupo, No seas Toxico(a)\n\nADVERTENCIA\n⚠️ *${user.warn}/4*\n\n${botname}`, mentions: [m.sender]}, {quoted: m})
if (user.warn >= 4) {
user.warn = 0;
await conn.sendMessage(m.chat, {text: `*@${m.sender.split('@')[0]} superaste las 4 advertencias serás eliminado de este grupo 😐....*`, mentions: [m.sender]}, {quoted: m})
user.banned = true
await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')}
return !1;
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
// await conn.sendPresenceUpdate('composing', m.chat)
let gpt = await fetch(`https://delirius-api-oficial.vercel.app/api/simi?text=${encodeURIComponent(textodem)}`)
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

//ARRANCA LA DIVERSIÓN 
switch (prefix && command) { 
case 'yts': case 'playlist': case 'ytsearch': case 'acortar': case 'google': case 'imagen': case 'traducir': case 'translate': case "tts": case 'ia': case 'chatgpt': case 'dalle': case 'ia2': case 'aimg': case 'imagine': case 'dall-e': case 'ss': case 'ssweb': case 'wallpaper': case 'hd': case 'horario': case 'bard': case 'wikipedia': case 'wiki': case 'pinterest': case 'style': case 'styletext': case 'npmsearch': await buscadores(m, command, conn, text, budy, from, fkontak, prefix, args, quoted, lolkeysapi)
break   
       
//jadibot/serbot 
case 'serbot': case 'jadibot': case 'qr':
jadibot(conn, m, command, text, args, sender)
break  
case 'deljadibot': case 'stop': 
killJadibot(conn, m, prefix, command, sender)
break 
case 'bots': case 'listbots':  
const user = [...new Set([...global.listJadibot.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];
const message = user.map((v, index) => `[${index + 1}] ${v.user.name || '•'}\nwa.me/${v.user.jid.replace(/[^0-9]/g, '')}?text=${prefix}estado`).join('\n\n');
const replyMessage = message.length === 0 ? '' : message;
const totalUsers = user.length;
const responseMessage = `*🚩 𝐀𝐪𝐮𝐢 𝐭𝐢𝐞𝐧𝐞𝐬 𝐥𝐚 𝐥𝐢𝐬𝐭𝐚𝐬 𝐝𝐞 𝐒𝐮𝐛𝐁𝐨𝐭𝐬 𝐀𝐜𝐭𝐢𝐯𝐨𝐬 🤖️*\n\n*• 𝐏𝐮𝐞𝐝𝐞𝐬 𝐜𝐨𝐧𝐭𝐚𝐜𝐭𝐚𝐫𝐥𝐨𝐬 𝐩𝐚𝐫𝐚 𝐩𝐞𝐝𝐢𝐫 𝐪𝐮𝐞 𝐬𝐞 𝐮𝐧𝐚𝐧 𝐚 𝐭𝐮 𝐠𝐫𝐮𝐩𝐨, 𝐬𝐞𝐫 𝐫𝐞𝐬𝐩𝐞𝐭𝐮𝐨𝐬𝐨!!*\n\n*⚠️ ${wm} 𝐒𝐞 𝐝𝐞𝐬𝐥𝐢𝐧𝐝𝐚 𝐝𝐞 𝐭𝐨𝐝𝐚𝐬 𝐫𝐞𝐬𝐩𝐨𝐧𝐬𝐚𝐛𝐢𝐥𝐢𝐝𝐚𝐝 𝐨 𝐬𝐮𝐜𝐞𝐬𝐨 𝐨𝐜𝐮𝐫𝐫𝐢𝐝𝐨 𝐜𝐨𝐧 𝐫𝐞𝐬𝐩𝐞𝐜𝐭𝐨 𝐚𝐥 𝐛𝐨𝐭 𝐨 𝐒𝐮𝐛𝐁𝐨𝐭𝐬*\n\n🟢 ${lenguaje.jadibot.text18} ${totalUsers || '0'}\n\n${replyMessage.trim()}`.trim();
await conn.sendMessage(m.chat, {text: responseMessage, mentions: conn.parseMention(responseMessage)}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100});
break
              
//Info  
case 'menu': case 'help': case 'menucompleto': case 'allmenu': case 'menu2': case 'audio': case 'nuevo': case 'extreno': case 'reglas': case 'menu1': case 'menu3': case 'menu4': case 'menu5': case 'menu6': case 'menu7': case 'menu8': case 'menu9': case 'menu10': case 'menu11': case 'menu18': case 'descarga': case 'menugrupos': case 'menubuscadores': case 'menujuegos': case 'menuefecto': case 'menuconvertidores': case 'Menuhony': case 'menurandow': case 'menuRPG': case 'menuSticker': case 'menuOwner': menu(m, command, conn, prefix, pushname, sender, pickRandom, fkontak)  
break        
case 'estado': case 'infobot': case 'owner': case 'creador': case 'contacto': case 'grupos': case 'grupoficiales': case 'instalarbot': case 'crearbot': case 'ping': case '5492266613038': case '447700179665': case '595975740803': case 'report': case 'sc': case 'donar': case 'solicitud': case 'cuenta': case 'cuentas': case 'cuentaoficiales': case 'cuentaofc': case 'cafirexos': case 'Cafirexos': case 'velocidad': case 'status': case 'speedtest': case 'speed': case 'host': case 'infohost': info(command, conn, m, speed, sender, fkontak, pickRandom, pushname, from, msg, text) 
break      
     
//activar/desactivar  
case 'welcome': case 'bienvenida': case 'antilink': case 'antienlace': case 'antifake': case 'antiFake': case 'antiarabe': case 'antiArabe': case 'autodetect': case 'detect': case 'audios': case 'autosticker': case 'stickers': case 'modocaliente': case 'game2': case 'antinsfw': case 'modoadmin': case 'modoadmins': case 'soloadmin': case 'antiprivado': case 'antipv': case 'anticall': case 'antillamada': case 'modojadibot': case 'jadibot': case 'autoread': case 'autovisto': case 'antispam': case 'chatbot': case 'simsimi': case 'autolevelup': case 'autonivel': case 'antitoxic': case 'antilink2': case 'AntiTwiter': case 'antitwiter': case 'antitiktok': case 'AntiTikTok': case 'antitelegram': case 'AntiTelegram': case 'antifacebook': case 'AntiFb': case 'AntiFacebook': case 'antinstagram': case 'AntInstagram': case 'antiyoutube': case 'AntiYoutube': case 'AntiIg': case 'enable': case 'configuracion': case 'configurar': case 'antiviewonce': enable(m, command, isGroupAdmins, text, command, args, conn, isBotAdmins, isGroupAdmins, isCreator, conn) 
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
case 'play': case 'musica': case 'play2': case 'video': case 'play3': case 'playdoc': case 'playaudiodoc': case 'ytmp3doc': case 'play4': case 'playdoc2': case 'playvideodoc': case 'ytmp4doc': case "ytmp3": case "ytaudio": case 'ytmp4': case 'ytvideo': case 'music': case 'spotify': case 'gitclone': case 'tiktok': case 'tt': case 'lyrics': case 'letra': case 'mediafire': case 'tiktokimg': case 'tik2': case 'ttimg': case 'play.1': case 'play.2': descarga(m, command, conn, text, command, args, fkontak, from, lolkeysapi)   
break
case 'facebook': case 'fb': case 'instagram': case 'ig': case 'igstalk': case 'tiktokstalk': case 'apk': case 'modoapk': case 'gdrive': case 'tw': case 'twitter': descarga2(m, command, text, args, conn, lolkeysapi, isCreator) 
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
      
case 'tienda': case 'tiendas': 
conn.sendButton(m.chat, `꧁🪼𝐂𝐎𝐑𝐓𝐀𝐍𝐀 𝐒𝐓𝐎𝐑𝐄🪼꧂
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
💳𝑽𝑼𝑬𝑳𝑽𝑨 𝑷𝑹𝑶𝑵𝑻𝑶.💳`, botname, null, [['IR A MI ARTICULO', '.misarticulos'], ['VER TOP MILLONARIO', '.millonarios'], ['COMPRAR ADMINS', '.buy2 1']], null, null, m)
break

case 'cartera': {
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let user = global.db.data.users[who]
if (!(who in global.db.data.users)) return m.reply(lenguaje.grupos.text31)
conn.sendButton(m.chat, `El usuarios ${pushname} en sus cartera tiene:

${user.limit} Crédito 💳
${user.exp} Exp ⚒️
${user.money} Coins 🪙`, botname, "https://telegra.ph/file/8fe1fd3c2138c1b7aeae7.jpg", [['TIENDA', `.tienda`], ['MIS MASCOTA', `.mismascota`], ['IR AL MENU', `.menu`]], null, null, m)   
}
break

case 'mismascotas': case 'mismascota': {
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let user = global.db.data.users[who]
if (!(who in global.db.data.users)) return m.reply(lenguaje.grupos.text31)
conn.sendButton(m.chat, `⊰᯽⊱┈─────╌❊╌────┈⊰᯽⊱

❤️${pushname}: TUS MASCOTAS❤️

👇𝑇𝐼𝐸𝑁𝐸𝑆:👇
➫ .ᴘᴇʀʀᴏ (${user.perro}) 🐕 
➫ .ɢᴀᴛᴏ (${user.gato}) 🐈‍
➫ .ʟᴏʙᴏ (${user.lobos}) 🐺
➫ .ᴍᴏɴᴏ (${user.monos}) 🙉 

⊰᯽⊱┈─────╌❊╌─────┈⊰᯽⊱`, botname, "https://telegra.ph/file/8fe1fd3c2138c1b7aeae7.jpg", [['Ir al menu', `.menu`]], null, null, m)   
}
break

case 'misarticulos': case 'articulo': case 'inventario': case 'inventory': {
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let user = global.db.data.users[who]
if (!(who in global.db.data.users)) return m.reply(lenguaje.grupos.text31)
//m.reply() 
conn.sendButton(m.chat, `⊰᯽⊱┈─────╌❊╌────┈⊰᯽⊱
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
⊰᯽⊱┈─────╌❊╌─────┈⊰᯽⊱`, `🤑ᴘᴀʀᴀ ᴠᴇʀ ᴇɴ ǫᴜᴇ ᴛᴏᴘ ᴇsᴛᴀs ᴘᴏɴ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ ᴛᴏᴘ: #ᴍɪʟʟᴏɴᴀʀɪᴏs`, null, [['TOP MILLONARIOS', `.topmillonario`], ['TIENDA', `.tienda`], ['IR AL MENU', '.menu']], null, null, m)
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
function pickRandom(list) {return list[Math.floor(list.length * Math.random())]}       

function isNumber(x) {return !isNaN(x)}    
//-------------------[ AUDIO/TEXTOS ]----------------------
default:   
if (budy.includes(`Todo bien`)) {
// conn.sendPresenceUpdate('composing', m.chat)
await m.reply(`${pickRandom(['Si amigo todo bien, vite', 'Todo bien capo y tu 😎'])}`)} 
if (budy.includes(`Autodestruction`)) { 
//let e = fs.readFileSync('./src/autodestruction.webp')
let e = 'https://qu.ax/gCQo.webp'
let or = ['texto', 'sticker']; 
let media = or[Math.floor(Math.random() * 2)]  
if (media === 'texto')
m.reply('*Mi jefe no me quiere 😢*')        
if (media === 'sticker')         
conn.sendFile(m.chat, e, 'sticker.webp', '',m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: 'ᶜ ᴬᵘᵗᵒᵈᵉˢᶜʳᵘʸᵉ', mediaType: 2, sourceUrl: nna, thumbnail: imagen4}}}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})}
if (budy.includes(`NovaBot`) || budy.includes(`novabot`) || budy.includes(`CortanaBot-𝟸.𝟶`) || budy.includes(`Cortana`)) {
m.react(`${pickRandom(['💠', '👀', '😈', '💢', '🤠'])}`)}
if (budy.includes(`Avisos`) || budy.includes(`Atencion`)) {
m.react(`${pickRandom(['📣', '👀', '‼️'])}`)}
if (budy.includes(`Bot`)) {   
let vn = 'https://qu.ax/hJA.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.includes(`simi`)) {  
game(m, budy, command, text, pickRandom, pushname, conn, participants, sender, who, body, sendImageAsUrl)}
//if (m.mentionedJid.includes(conn.user.jid)) {
if (budy.includes("@"+ conn.user.id.split('@')[0])) {
let noetiqueta = 'https://qu.ax/lqFC.webp'
let or = ['texto', 'sticker']; 
let media = or[Math.floor(Math.random() * 2)]
if (media === 'sticker')     
conn.sendFile(m.chat, noetiqueta, 'sticker.webp', '',m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: 'Yo que?', mediaType: 2, sourceUrl: nna, thumbnail: imagen4}}}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
if (media === 'texto')
await conn.sendMessage(m.chat, {text: `${pickRandom(['*QUE YO QUE?*', 'Que?'])}`}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})}
if (budy.includes(`Yaoi`)) {
m.react(`${pickRandom(['😐', '👀', '😹'])}`)
m.reply(`${pickRandom(['Que mamada? vete a estudiar mejor', 'Soy un bot hetero, no pida mamada (︶｡︶)zzZ '])}`)}
if (budy.startsWith(`a`)) {
if (!global.db.data.chats[m.chat].audios) return
let vn = './media/a.mp3'
await conn.sendPresenceUpdate('recording', m.chat)
conn.sendMessage(m.chat, { audio: { url: vn }, contextInfo: { "externalAdReply": { "title": botname, "body": ``, "previewType": "PHOTO", "thumbnailUrl": null,"thumbnail": imagen4, "sourceUrl": md, "showAdAttribution": true}}, seconds: '4556', ptt: true, mimetype: 'audio/mpeg', fileName: `error.mp3` }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})}
if (/^Hola|hello|Hello|hola|ola$/i.test(budy)) {
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
let s = 'https://qu.ax/DbMX.webp'
let s2 = 'https://qu.ax/zXa.webp'
let vn = 'https://qu.ax/hapR.mp3'
let or = ['sticker', 'audio'];  
let media = or[Math.floor(Math.random() * 2)]
if (media === 'sticker') conn.sendFile(m.chat, pickRandom([s, s2]), 'sticker.webp', '',m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: wm, mediaType: 2, sourceUrl: nna, thumbnail: imagen4}}}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})    
if (media === 'audio') conn.sendAudio(m.chat, vn, m)}
if (/^anadieleimporta|a nadie le importa|y que|no importa|literal$/i.test(budy)) {
let s = 'https://qu.ax/SHgM.webp' 
let s2 = 'https://qu.ax/glpp.webp'
let vn = 'https://qu.ax/JocM.mp3'
let or = ['sticker', 'audio'];   
let media = or[Math.floor(Math.random() * 2)]
if (media === 'sticker') conn.sendFile(m.chat, pickRandom([s, s2]), 'sticker.webp', '',m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: wm, mediaType: 2, sourceUrl: tiktok, thumbnail: imagen4}}}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})   
if (media === 'audio') conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Feliz cumpleaños`)) {
const vn = 'https://qu.ax/UtmZ.mp3'
conn.sendAudio(m.chat, vn, m)
m.react(`${pickRandom(['🥳', '💫', '🎊'])}`)} 
if (budy.startsWith(`Feliz navidad`) || budy.startsWith(`Merry Christmas`) || budy.startsWith(`feliz navidad`)) {
const vn = 'https://qu.ax/XYyY.m4a'
conn.sendAudio(m.chat, vn, m)} 
if (/^Hermosa|hermosa|guada|luuk$/i.test(budy)) {
const vn = 'https://qu.ax/GLuo.mp4'
conn.sendMessage(m.chat, {video: {url: vn}, caption: ``}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})} 
if (/^riko|rico|sabraso|tetas|nepe|pene|Pene|Teta|Tetas|Rico|RiKo$/i.test(budy)) {
const vn = 'https://qu.ax/Mwjf.mp4'
conn.sendMessage(m.chat, {video: {url: vn}, caption: ``}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})} 
if (/^novio|Novio$/i.test(budy)) {
const vn = 'https://qu.ax/xzDx.mp4'
conn.sendMessage(m.chat, {video: {url: vn}, caption: ``}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})} 
if (budy.startsWith(`admin`) || budy.startsWith(`adminitración`) || budy.startsWith(`administrador`) || budy.startsWith(`administradores`) || budy.startsWith(`AdMiN`)) {
const vn = 'https://qu.ax/teCT.mp3'
conn.sendAudio(m.chat, vn, m)}
if (/^frio|Frio$/i.test(budy)) { 
const vn = 'https://qu.ax/croh.mp3'
conn.sendAudio(m.chat, vn, m)}
if (/^novia|Novia$/i.test(budy)) {
const vn = 'https://qu.ax/OBYM.mp4'
conn.sendMessage(m.chat, {video: {url: vn}, caption: ``}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})} 
if (/^cojer|follar|Cojer|cojemos|Follar|folla$/i.test(budy)) {
const vid = 'https://qu.ax/BcgR.mp4'
conn.sendMessage(m.chat, {video: {url: vid}, caption: ``}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})}
if (budy.startsWith(`+58 416-3393168`) || budy.startsWith(`@584163393168`)) {
const vn = 'https://qu.ax/tkLb.mp3';
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`+58 412-3552078`) || budy.startsWith(`@584123552078`)) {
const vn = 'https://qu.ax/kziX.mp3';
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`+57 324 2402359`) || budy.startsWith(`@573242402359`)) {
const vn = 'https://qu.ax/GWBA.mp3';
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`+52 686 526 8215`) || budy.startsWith(`@5216865268215`)) {
const vn = 'https://qu.ax/WrRT.mp3';
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`+52 653 137 4035`) || budy.startsWith(`@5216531374035`)) {
const vn = 'https://qu.ax/uoDX.mp3';
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Lotex`)) {
const vn = 'https://qu.ax/oXGa.mp3';
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Broken`)) {
const vn = 'https://qu.ax/BcXf.mp3';
conn.sendAudio(m.chat, vn, m)}
if (/^bienveni|🥳|🤗|welcome$/i.test(budy)) {
const vn = 'https://qu.ax/cUYg.mp3'
conn.sendAudio(m.chat, vn, m)}
if (/^Te quiero cortana|Te amo Cortana$/i.test(budy)) {
const vn = 'https://qu.ax/Npoz.mp3';
conn.sendAudio(m.chat, vn, m)}
if (/^te gusta los hombres|Yoce que vez porno gay|Mi amiga es trapito|Te gusta el yaoi$/i.test(budy)) {
const vn = 'https://qu.ax/PtaB.mp3';
conn.sendAudio(m.chat, vn, m)}
if (/^quien para jugar|br mj jugar|Kien pa jugar|Quien pa jugar|quien pa jugar|Juegar|jugar|Jugar|🎮$/i.test(budy)) {
const vn = 'https://qu.ax/nRfU.mp3';
conn.sendAudio(m.chat, vn, m)}
if (/^Maldito|Mal pario|Mmgb|Mmwb|Hijo de puta|Hdp|Cara de verga|Marico|Marica|te Gusta el pito|Hijo de perra|Mamate un wuebo$/i.test(budy)) {
const vn = 'https://qu.ax/ftaR.mp3';
conn.sendAudio(m.chat, vn, m)}
if (/^Gay|gay$/i.test(budy)) {
const vn = 'https://qu.ax/hPEG.mp3';
conn.sendAudio(m.chat, vn, m)}
if (/^Buenos Dias|buenos dias|Bueno dias|Buenos dias$/i.test(budy)) {
const vn = 'https://qu.ax/VrnK.mp3';
conn.sendAudio(m.chat, vn, m)}
if (/^Broken vs lotex|broken vs lotex|Broken vs Loten$/i.test(budy)) {
const vn = 'https://qu.ax/Kosf.mp3';
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`+507 6791-4578`) || budy.startsWith(`@50767914578`)) {
const vn = 'https://qu.ax/enOL.mp3';
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`+1 516-709-6032`) || budy.startsWith(`@15167096032`)) {
const vn = 'https://qu.ax/VSNH.mp3';
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`+1 929-371-9827`) || budy.startsWith(`@19293719827`)) {
const vn = 'https://qu.ax/FPeg.mp3';
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Vete a la verga`)) {
const vn = 'https://qu.ax/pXts.mp3';
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Uwu`)) {
const vn = 'https://qu.ax/lOCR.mp3';
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Siuuu`)) {
const vn = 'https://qu.ax/bfC.mp3';
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Pasa pack`)) {
const vn = 'https://qu.ax/KjHR.mp3';
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Audio hentai`)) {
const vn = 'https://qu.ax/GSUY.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Pasen porno`)) {
const vn = 'https://qu.ax/JDZB.mp3'
conn.sendAudio(m.chat, vn, m)}			
if (budy.startsWith(`VAMOOO`)) {
const vn = 'https://qu.ax/XGAp.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Hora del sexito`)) {
const vn = 'https://qu.ax/Jpjm.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Cuentate un chiste`)) {
const vn = 'https://qu.ax/MSiQ.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Admin party`)) {
const vn = 'https://qu.ax/MpnG.mp3' 
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Fiesta del admin`)) {
const vn = 'https://qu.ax/jDVi.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Viernes`)) {
const vn = 'https://qu.ax/wqXs.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`:v`)) {
const vn = 'https://qu.ax/cxDg.mp3'
const stic = 'https://qu.ax/ahLV.webp'
let or = ['sticker', 'audio'];   
let media = or[Math.floor(Math.random() * 2)] 
if (media === 'sticker') conn.sendFile(m.chat, stic, 'sticker.webp', '',m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: `${pushname}`, mediaType: 2, sourceUrl: nn2, thumbnail: imagen4}}}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})   
if (media === 'audio') conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`La toca 7w7`)) {
const vn = 'https://qu.ax/Payh.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Quien es tu sempai botsito`)) {
const vn = 'https://qu.ax/likr.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Me gimes 7u7`)) {
const vn = 'https://qu.ax/kebK.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Te amo botsito uwu`)) {
const vn = 'https://qu.ax/tEpE.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Onichan`)) {
const vn = 'https://qu.ax/oZj.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Pasen sexo`)) {
const vn = 'https://qu.ax/xJMQ.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Paraguayo`)) {
const vn = 'https://qu.ax/wTxz.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Venezolano`)) {
const vn = 'https://qu.ax/hXh.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Gaspi corte`)) {
const vn = 'https://qu.ax/vYSf.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Gaspi buenos dias`)) {
const vn = 'https://qu.ax/kEsc.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Enano`)) {
const vn = 'https://qu.ax/XRgo.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`feliz`)) {
const vn = 'https://qu.ax/NcPR.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`triste`)) {
const vn = 'https://qu.ax/BGbf.mp3'
conn.sendAudio(m.chat, vn, m)}
if (/^Buenas Tardes|buenas tardes|buena tarde|Buenas tarde$/i.test(budy)) {
const vn = 'https://qu.ax/AMjs.mp3'
conn.sendAudio(m.chat, vn, m)}
if (/^Buenas noches|Buenas Noches|buenas noches|buena noche|Buena noches$/i.test(budy)) {
const vn = 'https://qu.ax/PDBb.mp3'
conn.sendAudio(m.chat, vn, m)}
if (/^nepe|Nepe|Pene|pene$/i.test(budy)) {
const vn = 'https://qu.ax/WdGF.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Peruano`)) {
const vn = 'https://qu.ax/avLe.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Alto temazo`)) {
const vn = 'https://qu.ax/SWYV.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`GOOOOD`)) {
const vn = 'https://qu.ax/wlJD.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Ya me voy a dormir`)) {
const vn = 'https://qu.ax/jeKb.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Calefon`)) {
const vn = 'https://qu.ax/UeXx.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Bot de mierda`)) {
const vn = 'https://qu.ax/oZfD.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Apurate bot`)) {
const vn = 'https://qu.ax/slhL.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Un chino`)) {
const vn = 'https://qu.ax/zfBR.mp3'
conn.sendAudio(m.chat, vn, m)}				
if (budy.startsWith(`No funciona`)) {
const vn = 'https://qu.ax/BEnA.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Boliviano`)) {
const vn = 'https://qu.ax/KsCp.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Corte`)) {
const vn = 'https://qu.ax/glrC.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Gaspi me saludas`)) {
const vn = 'https://qu.ax/xZRW.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Gaspi y las minitas`)) {
const vn = 'https://qu.ax/wYil.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Gaspi todo bien`)) {
const vn = 'https://qu.ax/MSpr.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Me quiero suicidar`)) {
const vn = 'https://qu.ax/ksFd.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Gaspi ya no aguanto`)) {
const vn = 'https://qu.ax/gNwU.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Contate algo bot`)) {
const vn = 'https://qu.ax/cFnb.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Sexo`)) { 
const vn = 'https://qu.ax/VZYF.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Pongan cuties`)) { 
const vn = 'https://qu.ax/cDFj.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Momento epico`)) {
const vn = 'https://qu.ax/pDNC.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`El bot del orto no funciona`)) {
const vn = 'https://qu.ax/STib.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Epicardo`)) {
const vn = 'https://qu.ax/FTaB.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Insta de la minita`)) {
const vn = 'https://qu.ax/JYh.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Una mierda de bot`)) {
const vn = 'https://qu.ax/keKg.mp3'
conn.sendAudio(m.chat, vn, m)}
if (budy.startsWith(`Ultimo momento`)) {
const vn = 'https://qu.ax/tleA.mp3'
conn.sendAudio(m.chat, vn, m)}			
if (budy.startsWith(`Nefasto`)) {
const vn = 'https://qu.ax/MaJu.mp3'
conn.sendAudio(m.chat, vn, m)}
                  
//--------------------[ OWNER ]-----------------------     
if (budy.startsWith('>')) {
if (!isCreator) return reply(info.owner)
try {
return reply(JSON.stringify(eval(budy.slice(2)), null, '\t'))
} catch (e) {
e = String(e)
reply(e)
}}
if (budy.startsWith('=>')) {
if (!isCreator) return
try {
return reply(JSON.stringify(eval(`(async () => { ${budy.slice(3)} })()`), null, '\t'))  
} catch (e) {
e = String(e)
reply(e)
}}
if (budy.startsWith('$')) {
if (!isCreator) return reply(info.owner) 
try {
return reply(String(execSync(budy.slice(2), { encoding: 'utf-8' })))
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
conn.sendMessage("6283114761386@s.whatsapp.net", { text: "Hola Creador/desarrollador, parece haber un error, por favor arreglarlo 🥲\n\n" + util.format(e), 
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

