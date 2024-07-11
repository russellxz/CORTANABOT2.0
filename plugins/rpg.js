require('../main.js') 
const fs = require("fs")
const path = require("path")
const chalk = require("chalk");
const { smsg, getGroupAdmins, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, delay, format, logic, generateProfilePicture, parseMention, getRandom } = require('../libs/fuctions.js'); 
const moment = require('moment-timezone') 
const gradient = require('gradient-string') 
const fetch = require('node-fetch') 
const axios = require('axios')
const cheerio = require('cheerio')
const Jimp = require('jimp')
const os = require('os')
const {createHash} = require('crypto') 
const { canLevelUp, xpRange } = require('../libs/levelling.js')
let minar = `${pickRandom(['Que pro 😎 has minado',
'🌟✨ Genial!! Obtienes', 'WOW!! eres un(a) gran Minero(a) ⛏️ Obtienes', 'Has Minado!!', '😲 Lograste Minar la cantidad de', 'Tus Ingresos subiran gracias a que minaste', '⛏️⛏️⛏️⛏️⛏️ Minando', '🤩 SII!!! AHORA TIENES', 'La minaria esta de tu lado, por ello obtienes', '😻 La suerte de Minar', '♻️ Tu Mision se ha cumplido, lograste minar', '⛏️ La Mineria te ha beneficiado con', '🛣️ Has encontrado un Lugar y por minar dicho lugar Obtienes', '👾 Gracias a que has minado tus ingresos suman', 'Felicidades!! Ahora tienes','⛏️⛏️⛏️ Obtienes', '⛏️ has obtenido'])}` 
let robar = `${pickRandom(['Robaste un Banco 🏦 y Obtuviste', 'Negociarte con el jefe de la mafia y Obtuviste :', 'Casi te atrapa la policía pero lograste robar una cantidad valiosa de 💰. !Te cuidado la próxima vez! Obtuviste:', 'Los mafiosos te han pagado :', 'Le has robado al Administrador del Grupo', 'Le robarte a tu presidente una sumar de :', 'le robarte a un famoso un valor de :', 'Entraste sigilosamente en el museo y robaste una obra de arte valiosa:', 'Infiltraste una joyería y obtuviste un botín impresionante:', 'Te convertiste en el ladrón más buscado del país, obtuviste:', 'Robaste un camión lleno de productos valiosos y obtuviste', 'Asaltaste un tren y conseguiste', 'Robaste un avión cargado de mercancía y obtuviste', 'Te hiciste pasar por un millonario para robar una joya única, obtuviste', 'Entraste a la casa de un coleccionista de arte y robaste una pieza invaluable, obtuviste', 'Secuestraste a un empresario y conseguiste un rescate importante:', 'Amenazaste a un político y obtuviste una gran suma de dinero:', 'Sobornaste a un oficial de policía para obtener información valiosa, conseguiste'])}` 
let robmal = `${pickRandom(['LA POLICIA TE VIO 🙀👮‍♂️ PERDISTE', 'Fuiste a robar un banco 🏦 y tu ayudarte que vendio a la policía, perdiste', 'No pudiste escapar de la Policía 🚔🤡, perdiste :', 'Intentaste robar un casino pero te descubrieron, perdiste', 'Te atraparon tratando de robar una tienda, perdiste :', 'La alarma sonó cuando intentabas robar un almacén, perdiste', 'El dueño del lugar te atrapó in fraganti, perdiste', 'Intentaste hackear una cuenta bancaria pero te rastrearon, perdiste', 'Fuiste descubierto tratando de sobornar a un oficial, perdiste', 'Tu plan para chantajear a un empresario salió mal, perdiste'])}` 

let batall = `${pickRandom(['🐾 ᴀᴛʀᴀᴘᴀʀᴏɴ ᴀ ᴛᴜ ᴍᴀsᴄᴏᴛᴀ ᴏʀɪɴᴀɴᴅᴏ ᴇʟ ᴊᴀʀᴅɪɴ ᴅᴇʟ ᴠᴇᴄɪɴᴏ, ᴘᴇʀᴅɪsᴛᴇ:', '🐾 ᴛᴜ ᴍᴀsᴄᴏᴛᴀ ɪɴᴛᴇɴᴛᴏ ᴠᴏʟᴀʀ ʏ ɴᴏ ғᴜᴇ ᴘᴏsɪʙʟᴇ, ᴘᴇʀᴅɪᴏ:', '🐾 ᴛᴜ ᴍᴀsᴄᴏᴛᴀ ᴅᴇsᴄᴜʙʀɪᴏ ǫᴜᴇ ʟᴀs ᴀʙᴇᴊᴀs ᴘɪᴄᴀɴ, ʜᴀ ᴘᴇʀᴅɪᴅᴏ:', '🐾 ᴛᴜ ᴍᴀsᴄᴏᴛᴀ ᴄᴀsɪ ᴍᴜᴇʀᴇ ᴘᴏʀ ᴍᴏʀᴅᴇʀ ʟᴀ ʟʟᴀɴᴛᴀ ᴅᴇ ᴜɴ ᴄᴀʀʀᴏ ʏ ᴘᴇʀᴅɪᴏ: 7282xᴘ', '🐾 ᴛᴜ ᴍᴀsᴄᴏᴛᴀ sᴇ ʜᴀ ᴘᴇʀᴅɪᴅᴏ ᴅᴏs ᴅɪᴀs ᴇɴ ᴇʟ ʙᴏsǫᴜᴇ, ʜᴀ ᴘᴇʀᴅɪᴅᴏ:'])}` 

let batall2 = `${pickRandom(['🐾 ᴛᴜ ᴍᴀsᴄᴏᴛᴀ ʀᴏʙᴏ ᴇʟ ᴘᴇʀɪᴏᴅɪᴄᴏ ᴅᴇʟ ᴠᴇᴄɪɴᴏ, ʜᴀ ɢᴀɴᴀᴅᴏ:', '🐾 ᴛᴜ ᴍᴀsᴄᴏᴛᴀ ᴀʜᴜʏᴇɴᴛᴏ ᴀ ᴜɴᴀ ᴀʀᴅɪʟʟᴀ, ʜᴀ ɢᴀɴᴀᴅᴏ:', '🐾 ᴛᴜ ᴍᴀsᴄᴏᴛᴀ ʜᴀ ɢᴀɴᴀᴅᴏ ᴜɴ ᴘᴀᴛᴇᴛɪᴄᴏ ᴅᴇ ᴘᴏᴋᴇʀ... ɴᴏ sᴀʙᴇᴍᴏs ᴄᴏᴍᴏ ʟᴏ ʜɪᴢᴏ ᴘᴇʀᴏ ʜᴀ ɢᴀɴᴀᴅᴏ:', '🐾 ᴛᴜ ᴍᴀsᴄᴏᴛᴀ sᴇ ʜᴀ ᴄᴏᴍɪᴅᴏ ᴛᴏᴅᴀ sᴜ ᴄᴏᴍɪᴅᴀ, ʜᴀs ɢᴀɴᴀᴅᴏ:', '🐾 ᴛᴜ ᴍᴀsᴄᴏᴛᴀ ʜᴀ ᴠᴇɴᴄɪᴅᴏ ᴀ ᴜɴ ᴊᴀʙᴀʟɪ ᴜsᴀɴᴅᴏ ᴛᴇᴄɴɪᴄᴀs ᴘʀᴏʜɪʙɪᴅᴀs ᴘᴏʀ ᴇsᴏ ʀᴇᴄɪʙᴇ:', '🐾 ᴛᴜ ᴍᴀsᴄᴏᴛᴀ ʜᴀ ᴘᴇʟᴇᴀᴅᴏ ᴄᴏɴ ᴜɴ ɢᴀᴛᴏ ᴄᴀʟʟᴇᴊᴇʀᴏ, ʜᴀ ɢᴀɴᴀᴅᴏ:', '🐾 ᴛᴜ ᴍᴀsᴄᴏᴛᴀ ʟᴏɢʀᴏ ᴄʀᴜᴢᴀʀ ᴄᴏɴ ᴇxɪᴛᴏ ᴜɴ ʀɪᴏ, ʜᴀ ɢᴀɴᴀᴅᴏ:', '🐾 ᴛᴜ ᴍᴀsᴄᴏᴛᴀ ʜᴀ ᴘᴇʟᴇᴀᴅᴏ ᴄᴏɴᴛʀᴀ ᴜɴ ᴏsᴏ, ʏ ɢᴀɴᴏ:', '🐾ᴛᴜ ᴍᴀsᴄᴏᴛᴀ ʜᴀ ᴄᴀᴢᴀᴅᴏ ᴜɴ ʀᴀᴛᴏɴ ᴘᴀʀᴀ ᴛɪ, ᴏʙᴛᴜᴠᴏ:', '🐾 ᴛᴜ ᴍᴀsᴄᴏᴛᴀ ʜᴀ ʀᴇsᴄᴀᴛᴀᴅᴏ ᴀ ᴜɴ ɴɪñᴏ ᴅᴇ ᴀʜᴏɢᴀʀsᴇ ᴇɴ ᴜɴᴀ ᴘɪsᴄɪɴᴀ, ʜᴀ ɢᴀɴᴀᴅᴏ:'])}`

let verificados2 = 'https://qu.ax/siRk.mp4'

async function reg(command, conn, m, sender, text, budy, fkontak, delay, args) {
if (global.db.data.users[m.sender].banned) return
if (command == 'reg' || command == 'verificar' || command == 'Registrar') {
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let user = global.db.data.users[m.sender]
let codigosIdiomas = ['es', 'en']
let nombresIdiomas = {'es': 'Español', 'en': 'English' }
if (user.registered === true) return m.reply(lenguaje.smsReg()) 
if (!Reg.test(text)) return conn.sendMessage(m.chat, {video: {url: verificar}, caption: lenguaje.smsReg1(prefix)}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
let [_, name, splitter, age] = text.match(Reg)
if (!name) return m.reply(lenguaje.smsReg2()) 
if (!age) return m.reply(lenguaje.smsReg3()) 
age = parseInt(age)
if (age > 100) return m.reply(lenguaje.smsReg4()) 
if (age < 3) return m.reply(lenguaje.smsReg5()) 
if (name.length >= 99) return m.reply(lenguaje.smsReg6()) 
user.name = name + 'ͧͧͧͦꙶͣͤ✓'.trim()
user.age = age
user.regTime = + new Date
user.registered = true
const sn = createHash('md5').update(m.sender).digest('hex');
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.fromMe ? conn.user.jid : m.sender
const date = moment.tz('America/Bogota').format('DD/MM/YYYY')
const time = moment.tz('America/Argentina/Buenos_Aires').format('LT')
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
global.db.data.users[m.sender].limit += 5
global.db.data.users[m.sender].exp += 600
conn.sendMessage(m.chat, {video: {url: verificados2}, caption: lenguaje.smsReg7(name, user, age, time, date, sender, sn, prefix, rtotalreg), mentionedJid:[name]}, {quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
/*conn.sendMessage(m.chat, { text: lenguaje.smsReg7(name, user, age, time, date, sender, sn, prefix, rtotalreg),
contextInfo:{
mentionedJid:[name],
forwardingScore: 9999999,
isForwarded: false, 
"externalAdReply": {
"showAdAttribution": true,
"containsAutoReply": true,
"title": `${botname}`,
"body": `${name}`,
"previewType": "PHOTO",
"thumbnailUrl": ``,
"thumbnail": imagen5, 
"sourceUrl": md}}},
{ quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})*/
await delay(2 * 2000)
conn.sendMessage(m.chat, { text: sn, contextInfo:{forwardingScore: 9999999, isForwarded: false, }}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
await delay(2 * 2000)
conn.sendMessage(m.chat, { text: lenguaje.smsReg8(), contextInfo:{forwardingScore: 9999999, isForwarded: false, }}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}

if (command == 'unreg') {
const {createHash} = require('crypto') 
if (!args[0]) return m.reply(lenguaje.rpg.unreg) 
const user = global.db.data.users[m.sender];
const sn = createHash('md5').update(m.sender).digest('hex');
if (args[0] !== sn) return m.reply(lenguaje.rpg.myns) 
user.registered = false; 
global.db.data.users[m.sender].limit -= 5
global.db.data.users[m.sender].exp -= 600
m.reply(lenguaje.rpg.delreg)}

if (command == 'myns') {
const {createHash} = require('crypto') 
let sn = createHash('md5').update(m.sender).digest('hex')
conn.fakeReply(m.chat, sn, '0@s.whatsapp.net', `${lenguaje.rpg.myns2}`, 'status@broadcast')}}

async function rpg(m, command, participants, args, sender, pushname, text, conn, fkontak, replace, who) {
if (global.db.data.users[m.sender].registered < true) return  conn.sendMessage(m.chat, {video: {url: verificar}, caption: info.registra}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
if (global.db.data.users[m.sender].banned) return
if (command == 'lb' || command == 'leaderboard') {
if (!m.isGroup) return m.reply(info.group) 
if (!args[0] || (args[0] !== 'local' && args[0] !== 'global')) return m.reply(`⚠️ cual top deseas ver? top Local o global, usar el comando de la siguiente manera:\n\n• ${prefix + command} local\n• ${prefix + command} global`);

const isLocal = args[0] === 'local';
let member = participants.map(u => u.id);
let me = m.split;

const users = Object.entries(global.db.data.users).map(([key, value]) => {
return {...value, jid: key};
});

const sortedExp = users.map(u => ({...u, exp: Number(u.exp)})).sort((a, b) => b.exp - a.exp);
 const sortedLim = users.map(u => ({...u, limit: Number(u.limit)})).sort((a, b) => b.limit - a.limit);
const sortedLevel = users.map(toNumber('level')).sort(sort('level'));
const sortedRole = users.map(toNumber('role')).sort(sort('role'))
const sortedBanc = users.map(toNumber('banco')).sort(sort('banco'))

const len = args[1] && args[1].length > 0 ? Math.min(100, Math.max(parseInt(args[1]), 10)) : Math.min(10, sortedExp.length);

let selectedExpUsers, selectedLimUsers;
if (isLocal) {
selectedExpUsers = sortedExp.filter(u => member.includes(u.jid));
selectedLimUsers = sortedLim.filter(u => member.includes(u.jid));
selectedLevUsers = sortedLevel.filter(u => member.includes(u.jid));
selectedRolUsers = sortedRole.filter(u => member.includes(u.jid));
selectedBancUsers = sortedBanc.filter(u => member.includes(u.jid));
} else {
selectedExpUsers = sortedExp;
selectedLimUsers = sortedLim;
selectedLevUsers = sortedLevel
selectedRolUsers = sortedRole
selectedBancUsers = sortedBanc
}

const txt = `${lenguaje.rpg.text3} ${isLocal ? '𝙻𝙾𝙲𝙰𝙻' : '𝙶𝙻𝙾𝙱𝙰𝙻'} 🎮\n\n> 🪙 ᴛᴏᴘ ${isLocal ? 'ʟᴏᴄᴀʟ' : 'ɢʟᴏʙᴀʟ'} ᴅᴇ ʟᴏs ᴜsᴜᴀʀɪᴏs ᴄᴏɴ ᴍᴀ́s ʀᴇᴄᴜʀsᴏs ᴀᴄᴜᴍᴜʟᴀᴅᴏs ${isLocal ? 'ᴇɴ ᴇʟ ɢʀᴜᴘᴏ' : 'ᴇɴ ᴇʟ ʙᴏᴛ'}

╔═❖ _𝐓𝐎𝐏 ${len} 𝐗𝐏 🧬_
║𝚃𝚢 : ${selectedExpUsers.findIndex(u => u.jid === m.sender) + 1} 𝚍𝚎 ${selectedExpUsers.length}
${selectedExpUsers.slice(0, len).map(({jid, exp}, i) =>
`║${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} ➭ *${exp} exp*`).join`\n`}
╚─━━━━━━░★░━━━━━━─╝

╔═❖ _𝐓𝐎𝐏 ${len} 𝐌𝐀𝐒 𝐂𝐑𝐄𝐃𝐈𝐓𝐎𝐒 💳_
║𝚃𝚢 : ${selectedLimUsers.findIndex(u => u.jid === m.sender) + 1} 𝚍𝚎 ${selectedLimUsers.length}
${selectedLimUsers.slice(0, len).map(({jid, limit}, i) => `║${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]}  ➭ *${limit} ᴄʀᴇᴅɪᴛᴏs*`).join`\n`}
╚─━━━━━━░★░━━━━━━─╝
    
╔═❖ _𝐓𝐎𝐏 ${len} 𝐔𝐒𝐔𝐀𝐑𝐈𝐎𝐒 𝐂𝐎𝐍 𝐌𝐀𝐒 𝐃𝐈𝐍𝐄𝐑𝐎 𝐄𝐍 𝐄𝐋 𝐁𝐀𝐍𝐂𝐎💰🏢_
║𝚃𝚞 : ${selectedBancUsers.findIndex(u => u.jid === m.sender) + 1} 𝚍𝚎 ${selectedBancUsers.length}
${selectedBancUsers.slice(0, len).map(({jid, banco}, i) => `║${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]}  ➭ *${banco} 💰*`).join`\n`} 
╚─━━━━━━░★░━━━━━━─╝
    
╔═❖ _𝐓𝐎𝐏 ${len} 𝐌𝐀𝐒 𝐍𝐈𝐕𝐄𝐋 ⬆️_
║𝚃𝚞 : ${selectedLevUsers.findIndex(u => u.jid === m.sender) + 1} 𝚍𝚎 ${selectedLevUsers.length} 𝚄𝚜𝚞𝚊𝚛𝚒𝚘𝚜
${selectedLevUsers.slice(0, len).map(({jid, level}, i) => `║${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} ➭ *${level}*`).join`\n`} 
╚─━━━━━━░★░━━━━━━─╝

╔═❖ _𝐓𝐎𝐏 ${len} 𝐑𝐎𝐋 | 𝐑𝐀𝐍𝐆𝐎  💪_
║𝚃𝚞 : ${selectedRolUsers.findIndex(u => u.jid === m.sender) + 1} 𝚍𝚎 ${selectedRolUsers.length} 𝚄𝚜𝚞𝚊𝚛𝚒𝚘𝚜
${selectedRolUsers.slice(0, len).map(({jid, role, level}, i) => `║${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} ➭ *${role}*`).join`\n`} 
╚─━━━━━━░★░━━━━━━─╝`.trim();

conn.sendMessage(m.chat, { text: txt, contextInfo: {mentionedJid: [...txt.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net')}}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})}

if (command == 'millonarios' || command == 'topmillonarios' || command == 'Topmillonarios' || command == 'topmillonario') {
//const { telefono, camara, reloj, daga, television, impresora,  auto, moto, vehiculo, ambulancia, avion, cohete, ovni, helicoptero,  autobus, fuente, castillo } = global.db.data.users[who];

//if (!m.isGroup) return m.reply(info.group);
 let member = participants.map(u => u.id);
let me = m.split;
const users = Object.entries(global.db.data.users).map(([key, value]) => {
    const totalArticulos = (value.tridente ?? 0) + (value.telefono ?? 0) + (value.camara ?? 0) + (value.reloj ?? 0) + 
        (value.daga ?? 0) + (value.television ?? 0) + (value.impresora ?? 0) + (value.auto ?? 0) + (value.moto ?? 0) + 
        (value.vehiculo ?? 0) + (value.ambulancia ?? 0) + (value.avion ?? 0) + (value.cohete ?? 0) + (value.ovni ?? 0) + 
        (value.helicoptero ?? 0) + (value.autobus ?? 0) + (value.fuente ?? 0) + (value.castillo ?? 0);
    return { ...value, jid: key, totalArticulos };
});

const sortedUsers = users.sort((a, b) => b.totalArticulos - a.totalArticulos);
const len = args[0] && args[0].length > 0 ? Math.min(100, Math.max(parseInt(args[0]), 10)) : Math.min(10, sortedUsers.length);

const texto = `🤑𝐓𝐎𝐏 ${len} 𝐌𝐈𝐋𝐋𝐎𝐍𝐀𝐑𝐈𝐎𝐒🤑
ᴄᴏɴ ᴀʀᴛɪᴄᴜʟᴏ ᴅᴇ ᴄᴏʟᴇᴄᴄɪᴏɴ:
▂ ▃ ▄ ▅ ▆ ▇ █ █ ▇ ▆ ▅ ▄ ▃ ▂ 

𝚃𝚢: ${sortedUsers.findIndex(u => u.jid === m.sender) + 1} 𝚍𝚎 ${sortedUsers.length} 
${sortedUsers.slice(0, len).map(({jid, totalArticulos}, i) => `║${i + 1}. ${participants.some((p) => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} ➢ TIENE: (${totalArticulos}) ARTICULOS 😎`).join('\n')}
█▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█`.trim();

conn.sendMessage(m.chat, { text: texto, contextInfo: { mentionedJid: [...texto.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }}, { quoted: m, ephemeralExpiration: 24 * 60 * 1000, disappearingMessagesInChat: 24 * 60 * 1000 });
}

if (command == 'afk') {
if (!m.isGroup) return m.reply(info.group) 
let user = global.db.data.users[m.sender]
user.afkTime = + new Date
user.afkReason = text
const afk = `${lenguaje.rpg.text4} ${pushname} ${lenguaje.rpg.text5} ${text ? text : ''}\n\n\n\n\n\n\n`
conn.relayMessage(m.chat, {scheduledCallCreationMessage: {callType: 'VIDEO', scheduledTimestampMs: 0, title: afk }}, {})}

if (command == 'rob' || command == 'robar') {
if (!m.isGroup) return m.reply(info.group) 
const user = global.db.data.users[m.sender]
const date = global.db.data.users[m.sender].robs + 600000; //600000
if (new Date - global.db.data.users[m.sender].robs < 600000) return m.reply(`${lenguaje.rpg.text6} ${msToTime(date - new Date())}`) 
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
else who = m.chat;
if (!who) return m.reply(lenguaje.rpg.rob)
try { 
if (!(who in global.db.data.users)) return m.reply(lenguaje.grupos.text31)
const users = global.db.data.users[who];
let exp = Math.floor(Math.random() * 850) + 95;
let limit = Math.floor(Math.random() * 90) + 6;
const rob = Math.floor(Math.random() * 9999);
if (users.limit < 12) return conn.sendMessage(m.chat, {text: `${lenguaje.rpg.rob5} @${who.split`@`[0]}\n◦ ᴇxᴘ ${exp}\n\n${lenguaje.rpg.rob6} @${m.sender.split("@")[0]}`, mentions: [who, m.sender]}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}).catch(global.db.data.users[m.sender].exp += exp * 1).catch(global.db.data.users[who].exp -= exp * 1) 
//conn.sendMessage(m.chat, {text: `${lenguaje.rpg.rob2} @${who.split`@`[0]} ${lenguaje.rpg.rob3}`, mentions: [who]}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100});  
if (users.exp < 10) return conn.sendMessage(m.chat, {text: `${lenguaje.rpg.rob2} @${who.split`@`[0]} ${lenguaje.rpg.rob4}`, mentions: [who]}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100});   
global.db.data.users[m.sender].exp += exp * 1;
global.db.data.users[m.sender].limit += limit * 1;
global.db.data.users[who].exp -= exp * 1;
global.db.data.users[who].limit -= limit * 1;
conn.sendMessage(m.chat, {text: `${lenguaje.rpg.rob5} @${who.split`@`[0]}\n◦ ᴇxᴘ ${exp}\n◦ ᴅɪᴀᴍᴀɴᴛᴇ: ${limit}\n\n${lenguaje.rpg.rob6} @${m.sender.split("@")[0]}`, mentions: [who, m.sender]}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100});
global.db.data.users[m.sender].robs = new Date * 1;
 } catch {
m.reply(lenguaje.rpg.rob7)}}

if (command == 'crime' || command == 'Crime') {
const date = global.db.data.users[m.sender].crime + 600000; //3600000 = 1 hs
if (new Date - global.db.data.users[m.sender].crime < 600000) return m.reply(`*《🚓︎》LA POLICIA ESTA VIGILANDO EN ESTE MOMENTO, VUELVE EN:* ${msToTime(date - new Date())}`)
const exp = Math.floor(Math.random() * 15000)
const diamond = Math.floor(Math.random() * 150)
const money = Math.floor(Math.random() * 15000)

if (global.db.data.users[m.sender].exp < 0) return m.reply(`《💰》${robar} ${exp} XP`).catch(global.db.data.users[m.sender].exp += exp)
if (global.db.data.users[m.sender].limit < 0) return m.reply(`《💰》${robar} ${diamond} 💳 Créditos`).catch(global.db.data.users[m.sender].limit += diamond)
if (global.db.data.users[m.sender].money < 0) return m.reply(`《💰》${robar} ${money} 🪙 Coins`).catch(global.db.data.users[m.sender].money += money) 

let or = ['text', 'text2', 'text3', 'text4']; 
let media = or[Math.floor(Math.random() * 4)]
global.db.data.users[m.sender].crime = new Date * 1;
if (media === 'text') m.reply(`《💰》${robar} ${exp} XP`).catch(global.db.data.users[m.sender].exp += exp) 
if (media === 'text2') m.reply(`《🚓》${robmal} ${exp} XP`).catch(global.db.data.users[m.sender].exp -= exp) 
if (media === 'text3') m.reply(`《💰》${robar}\n\n💳  ${diamond} créditos\n🪙${money} Coins`).catch(global.db.data.users[m.sender].limit += diamond).catch(global.db.data.users[m.sender].money += money) 
if (media === 'text4') m.reply(`《🚓》${robmal}\n\n💳${diamond} créditos\n🪙 ${money} coins`).catch(global.db.data.users[m.sender].limit -= diamond).catch(global.db.data.users[m.sender].money -= money)}

if (command == 'buy' || command == 'buyall') {
let count = command.replace(/^buy/i, '');
count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].exp / 350) : parseInt(count) : args[0] ? parseInt(args[0]) : 1;
count = Math.max(1, count);
if (global.db.data.users[m.sender].exp >= 350 * count) {
global.db.data.users[m.sender].exp -= 350 * count;
global.db.data.users[m.sender].limit += count;
m.reply(`╔═❖ ${lenguaje.rpg.buy}\n║‣ ${lenguaje.rpg.buy2} ${count}💳\n║‣ ${lenguaje.rpg.buy3} ${350 * count} XP\n╚═══════════════`);
} else m.reply(`${lenguaje.rpg.buy4} *${count}* ${lenguaje.rpg.buy5}`)
}

if (command == 'tridente') {
let count = command.replace(/^tridente/i, '');
count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].limit / 3000) : parseInt(count) : args[0] ? parseInt(args[0]) : 1;
count = Math.max(1, count);
if (global.db.data.users[m.sender].limit >= 3000 * count) {
global.db.data.users[m.sender].limit -= 3000 * count;
global.db.data.users[m.sender].tridente += count;
m.reply(`╔═❖  ${lenguaje.rpg.buy}
║‣ ${lenguaje.rpg.buy2} ${count} *CASTILLO 🏰*
║‣ ${lenguaje.rpg.buy3} ${3000 * count} 💳
╚═══════════════

> _Para ver tus artículos por el comando:_ #misarticulos \n`);
} else m.reply(`No tiene suficiente *${count}* crédito💳 para comprar un tridente`)
}

if (command == 'telefenos') {
let count = command.replace(/^telefeno/i, '');
count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].limit / 1000) : parseInt(count) : args[0] ? parseInt(args[0]) : 1;
count = Math.max(1, count);
if (global.db.data.users[m.sender].limit >= 1000 * count) {
global.db.data.users[m.sender].limit -= 1000 * count;
global.db.data.users[m.sender].telefeno += count;
m.reply(`╔═❖  ${lenguaje.rpg.buy}
║‣ ${lenguaje.rpg.buy2} ${count} *TELÉFONO📞*
║‣ ${lenguaje.rpg.buy3} ${1000 * count} 💳
╚═══════════════

> _Para ver tus artículos por el comando:_ #misarticulos \n`);
} else m.reply(`No tiene suficiente *${count}* crédito💳 para comprar un teléfono`)
}
 
if (command == 'camara') {
let count = command.replace(/^camara/i, '');
count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].limit / 500) : parseInt(count) : args[0] ? parseInt(args[0]) : 1;
count = Math.max(1, count);
if (global.db.data.users[m.sender].limit >= 500 * count) {
global.db.data.users[m.sender].limit -= 500 * count;
global.db.data.users[m.sender].camara += count;
m.reply(`╔═❖  ${lenguaje.rpg.buy}
║‣ ${lenguaje.rpg.buy2} ${count} *CÁMARA📷*
║‣ ${lenguaje.rpg.buy3} ${500 * count} 💳
╚═══════════════

> _Para ver tus artículos por el comando:_ #misarticulos \n`);
} else m.reply(`No tiene suficiente *${count}* crédito💳 para comprar un camara`)
}

if (command == 'reloj') {
let count = command.replace(/^reloj/i, '');
count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].limit / 7000) : parseInt(count) : args[0] ? parseInt(args[0]) : 1;
count = Math.max(1, count);
if (global.db.data.users[m.sender].limit >= 7000 * count) {
global.db.data.users[m.sender].limit -= 7000 * count;
global.db.data.users[m.sender].reloj += count;
m.reply(`╔═❖  ${lenguaje.rpg.buy}
║‣ ${lenguaje.rpg.buy2} ${count} *RELOJ⏰*
║‣ ${lenguaje.rpg.buy3} ${7000 * count} 💳
╚═══════════════

> _Para ver tus artículos por el comando:_ #misarticulos \n`);
} else m.reply(`No tiene suficiente *${count}* crédito💳 para comprar un reloj`)
}

if (command == 'daga') {
let count = command.replace(/^daga/i, '');
count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].limit / 9000) : parseInt(count) : args[0] ? parseInt(args[0]) : 1;
count = Math.max(1, count);
if (global.db.data.users[m.sender].limit >= 9000 * count) {
global.db.data.users[m.sender].limit -= 9000 * count;
global.db.data.users[m.sender].daga += count;
m.reply(`╔═❖  ${lenguaje.rpg.buy}
║‣ ${lenguaje.rpg.buy2} ${count} *DAGA🗡️*
║‣ ${lenguaje.rpg.buy3} ${9000 * count} 💳
╚═══════════════

> _Para ver tus artículos por el comando:_ #misarticulos \n`);
} else m.reply(`No tiene suficiente *${count}* crédito💳 para comprar un daga`)
}

if (command == 'television') {
let count = command.replace(/^television/i, '');
count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].limit / 5000) : parseInt(count) : args[0] ? parseInt(args[0]) : 1;
count = Math.max(1, count);
if (global.db.data.users[m.sender].limit >= 5000 * count) {
global.db.data.users[m.sender].limit -= 5000 * count;
global.db.data.users[m.sender].television += count;
m.reply(`╔═❖  ${lenguaje.rpg.buy}
║‣ ${lenguaje.rpg.buy2} ${count} *TELEVISIÓN📺*
║‣ ${lenguaje.rpg.buy3} ${5000 * count} 💳
╚═══════════════

> _Para ver tus artículos por el comando:_ #misarticulos \n`);
} else m.reply(`No tiene suficiente *${count}* crédito💳 para comprar un televisor`)
}

if (command == 'impresora') {
let count = command.replace(/^impresora/i, '');
count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].limit / 3000) : parseInt(count) : args[0] ? parseInt(args[0]) : 1;
count = Math.max(1, count);
if (global.db.data.users[m.sender].limit >= 3000 * count) {
global.db.data.users[m.sender].limit -= 3000 * count;
global.db.data.users[m.sender].impresora += count;
m.reply(`╔═❖  ${lenguaje.rpg.buy}
║‣ ${lenguaje.rpg.buy2} ${count} *IMPRESORA🖨️*
║‣ ${lenguaje.rpg.buy3} ${3000 * count} 💳
╚═══════════════

> _Para ver tus artículos por el comando:_ #misarticulos \n`);
} else m.reply(`No tiene suficiente *${count}* crédito💳 para comprar un impresora`)
}

if (command == 'auto') {
let count = command.replace(/^auto/i, '');
count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].limit / 25000) : parseInt(count) : args[0] ? parseInt(args[0]) : 1;
count = Math.max(1, count);
if (global.db.data.users[m.sender].limit >= 25000 * count) {
global.db.data.users[m.sender].limit -= 25000 * count;
global.db.data.users[m.sender].auto += count;
m.reply(`╔═❖  ${lenguaje.rpg.buy}
║‣ ${lenguaje.rpg.buy2} ${count} *AUTOR🚗*
║‣ ${lenguaje.rpg.buy3} ${25000 * count} 💳
╚═══════════════

> _Para ver tus artículos por el comando:_ #misarticulos \n`);
} else m.reply(`No tiene suficiente *${count}* crédito💳 para comprar un autor`)
}

if (command == 'moto') {
let count = command.replace(/^moto/i, '');
count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].limit / 50000) : parseInt(count) : args[0] ? parseInt(args[0]) : 1;
count = Math.max(1, count);
if (global.db.data.users[m.sender].limit >= 50000 * count) {
global.db.data.users[m.sender].limit -= 50000 * count;
global.db.data.users[m.sender].moto += count;
m.reply(`╔═❖  ${lenguaje.rpg.buy}
║‣ ${lenguaje.rpg.buy2} ${count} *MOTOR🏍*
║‣ ${lenguaje.rpg.buy3} ${50000 * count} 💳
╚═══════════════

> _Para ver tus artículos por el comando:_ #misarticulos \n`);
} else m.reply(`No tiene suficiente *${count}* crédito💳 para comprar un motor`)
}

if (command == 'vehiculo' || command == 'vehículo') {
let count = command.replace(/^vehiculo/i, '');
count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].limit / 70000) : parseInt(count) : args[0] ? parseInt(args[0]) : 1;
count = Math.max(1, count);
if (global.db.data.users[m.sender].limit >= 70000 * count) {
global.db.data.users[m.sender].limit -= 70000 * count;
global.db.data.users[m.sender].vehiculo += count;
m.reply(`╔═❖  ${lenguaje.rpg.buy}
║‣ ${lenguaje.rpg.buy2} ${count} *VEHÍCULO🚓*
║‣ ${lenguaje.rpg.buy3} ${70000 * count} 💳
╚═══════════════

> _Para ver tus artículos por el comando:_ #misarticulos \n`);
} else m.reply(`No tiene suficiente *${count}* crédito💳 para comprar un Vehículo`)
}

if (command == 'ambulancia') {
let count = command.replace(/^ambulancia/i, '');
count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].limit / 40000) : parseInt(count) : args[0] ? parseInt(args[0]) : 1;
count = Math.max(1, count);
if (global.db.data.users[m.sender].limit >= 40000 * count) {
global.db.data.users[m.sender].limit -= 40000 * count;
global.db.data.users[m.sender].ambulancia += count;
m.reply(`╔═❖  ${lenguaje.rpg.buy}
║‣ ${lenguaje.rpg.buy2} ${count} *AMBULANCIA🚑*
║‣ ${lenguaje.rpg.buy3} ${40000 * count} 💳
╚═══════════════

> _Para ver tus artículos por el comando:_ #misarticulos \n`);
} else m.reply(`No tiene suficiente *${count}* crédito💳 para comprar un ambulancia`)
}

if (command == 'avion' || command == 'avión') {
let count = command.replace(/^avion/i, '');
count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].limit / 100000) : parseInt(count) : args[0] ? parseInt(args[0]) : 1;
count = Math.max(1, count);
if (global.db.data.users[m.sender].limit >= 100000 * count) {
global.db.data.users[m.sender].limit -= 100000 * count;
global.db.data.users[m.sender].avion += count;
m.reply(`╔═❖  ${lenguaje.rpg.buy}
║‣ ${lenguaje.rpg.buy2} ${count} *AVIÓN✈*
║‣ ${lenguaje.rpg.buy3} ${100000 * count} 💳
╚═══════════════

> _Para ver tus artículos por el comando:_ #misarticulos \n`);
} else m.reply(`No tiene suficiente *${count}* crédito💳 para comprar un avión`)
}

if (command == 'cohete') {
let count = command.replace(/^cohete/i, '');
count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].limit / 1000000) : parseInt(count) : args[0] ? parseInt(args[0]) : 1;
count = Math.max(1, count);
if (global.db.data.users[m.sender].limit >= 1000000 * count) {
global.db.data.users[m.sender].limit -= 1000000 * count;
global.db.data.users[m.sender].cohete += count;
m.reply(`╔═❖  ${lenguaje.rpg.buy}
║‣ ${lenguaje.rpg.buy2} ${count} *COHETE🚀*
║‣ ${lenguaje.rpg.buy3} ${1000000 * count} 💳
╚═══════════════

> _Para ver tus artículos por el comando:_ #misarticulos \n`);
} else m.reply(`No tiene suficiente *${count}* crédito💳 para comprar un cohete`)
}

if (command == 'ovni') {
let count = command.replace(/^ovni/i, '');
count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].limit / 2000000) : parseInt(count) : args[0] ? parseInt(args[0]) : 1;
count = Math.max(1, count);
if (global.db.data.users[m.sender].limit >= 2000000 * count) {
global.db.data.users[m.sender].limit -= 2000000 * count;
global.db.data.users[m.sender].ovni += count;
m.reply(`╔═❖  ${lenguaje.rpg.buy}
║‣ ${lenguaje.rpg.buy2} ${count} *ONVI🛸*
║‣ ${lenguaje.rpg.buy3} ${2000000 * count} 💳
╚═══════════════

> _Para ver tus artículos por el comando:_ #misarticulos \n`);
} else m.reply(`No tiene suficiente *${count}* crédito💳 para comprar un onvi`)
}

 if (command == 'helicoptero' || command == 'helicóptero') {
let count = command.replace(/^helicoptero/i, '');
count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].limit / 50000) : parseInt(count) : args[0] ? parseInt(args[0]) : 1;
count = Math.max(1, count);
if (global.db.data.users[m.sender].limit >= 50000 * count) {
global.db.data.users[m.sender].limit -= 50000 * count;
global.db.data.users[m.sender].helicoptero += count;
m.reply(`╔═❖  ${lenguaje.rpg.buy}
║‣ ${lenguaje.rpg.buy2} ${count} *HELICÓPTERO🚁*
║‣ ${lenguaje.rpg.buy3} ${50000 * count} 💳
╚═══════════════

> _Para ver tus artículos por el comando:_ #misarticulos \n`);
} else m.reply(`No tiene suficiente *${count}* crédito💳 para comprar un helicóptero`)
}

 if (command == 'autobus') {
let count = command.replace(/^autobus/i, '');
count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].limit / 30000) : parseInt(count) : args[0] ? parseInt(args[0]) : 1;
count = Math.max(1, count);
if (global.db.data.users[m.sender].limit >= 30000 * count) {
global.db.data.users[m.sender].limit -= 30000 * count;
global.db.data.users[m.sender].autobus += count;
m.reply(`╔═❖  ${lenguaje.rpg.buy}
║‣ ${lenguaje.rpg.buy2} ${count} *AUTOBÚS🚌*
║‣ ${lenguaje.rpg.buy3} ${30000 * count} 💳
╚═══════════════

> _Para ver tus artículos por el comando:_ #misarticulos \n`);
} else m.reply(`No tiene suficiente *${count}* crédito💳 para comprar un autobús`)
}

 if (command == 'fuente') {
let count = command.replace(/^fuente/i, '');
count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].limit / 10000) : parseInt(count) : args[0] ? parseInt(args[0]) : 1;
count = Math.max(1, count);
if (global.db.data.users[m.sender].limit >= 10000 * count) {
global.db.data.users[m.sender].limit -= 10000 * count;
global.db.data.users[m.sender].fuente += count;
m.reply(`╔═❖  ${lenguaje.rpg.buy}
║‣ ${lenguaje.rpg.buy2} ${count} *FUENTE ⛲*
║‣ ${lenguaje.rpg.buy3} ${10000 * count} 💳
╚═══════════════

> _Para ver tus artículos por el comando:_ #misarticulos \n`);
} else m.reply(`No tiene suficiente *${count}* crédito💳 para comprar un fuente`)
}

if (command == 'castillo') {
let count = command.replace(/^castillo/i, '');
count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].limit / 5000000) : parseInt(count) : args[0] ? parseInt(args[0]) : 1;
count = Math.max(1, count);
if (global.db.data.users[m.sender].limit >= 5000000 * count) {
global.db.data.users[m.sender].limit -= 5000000 * count;
global.db.data.users[m.sender].castillo += count;
m.reply(`╔═❖  ${lenguaje.rpg.buy}
║‣ ${lenguaje.rpg.buy2} ${count} *CASTILLO 🏰*
║‣ ${lenguaje.rpg.buy3} ${5000000 * count} 💳
╚═══════════════

> _Para ver tus artículos por el comando:_ #misarticulos \n`);
} else m.reply(`No tiene suficiente *${count}* crédito💳 para comprar un tridente`)
}

if (command == 'perro' || command == 'perros') {
    // Verificar si el usuario ya tiene un perro
    if (global.db.data.users[m.sender].perro > 1) {
        m.reply(`Ya tienes un perro y no puedes comprar otro.`);
        return;
    }

    // Definir el conteo de perros a comprar
    let count = command.replace(/^perro/i, '');
    count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].limit / 100) : parseInt(count) : args[0] ? parseInt(args[0]) : 1;
    count = Math.max(1, count);

    // Verificar si el usuario tiene suficientes recursos para comprar el perro
    if (global.db.data.users[m.sender].limit >= 100 * count) {
        global.db.data.users[m.sender].limit -= 100 * count;
        global.db.data.users[m.sender].perro += count;
        m.reply(`🥳𝐅𝐞𝐥𝐢𝐜𝐢𝐝𝐚𝐝𝐞𝐬! 𝐇𝐚𝐬 𝐚𝐝𝐪𝐮𝐢𝐫𝐢𝐝𝐨🥳
 ᴀ ${count} ᴘᴇʀʀɪᴛᴏ 🐕 

ᴘᴇʀʀɪᴛᴏ🐕 (${pushname}) 
sᴇʀᴀ ᴛᴜ ᴀᴄᴏᴍᴘᴀñᴀɴᴛᴇ ᴇɴ ʙᴀᴛᴀʟʟᴀ. ᴇs ғɪᴇʟ, ᴀᴍᴏʀᴏsᴏ ʏ ᴛᴇ sᴇɢᴜɪʀᴀ ᴀ ᴛᴏᴅᴀs ᴘᴀʀᴛᴇs. ᴘᴇʀᴏ ɴᴏ ʟᴏ ᴍᴀʟᴛʀᴀᴛᴇs ɴɪ ʟᴏ ᴅᴇᴊᴇs ᴍᴏʀɪʀ.🥹

𝕊𝕦𝕤 𝕙𝕒𝕓𝕚𝕝𝕚𝕕𝕒𝕕𝕖𝕤 𝕤𝕠𝕟:
- ᴍᴇᴀʀ 
- ᴄᴀɢᴀʀ
- ᴄᴏᴍᴇʀ 

𝑵𝒊𝒗𝒆𝒍: 1.

💯𝙿𝚊𝚛𝚊 𝚟𝚎𝚛 𝚎𝚗 𝚚𝚞𝚎 𝚝𝚘𝚙 𝚎𝚜𝚝𝚊 𝚝𝚞 𝚖𝚊𝚜𝚌𝚘𝚝𝚊 𝚙𝚘𝚗 𝚎𝚕 𝚌𝚘𝚖𝚊𝚗𝚍𝚘: #𝚖𝚌
💯𝚙𝚊𝚛𝚊 𝚟𝚎𝚛 𝚎𝚕 𝚗𝚒𝚟𝚎𝚕 𝚍𝚎 𝚝𝚞 𝚖𝚊𝚜𝚌𝚘𝚝𝚊 𝚎𝚗 𝚝𝚒𝚎𝚖𝚙𝚘. 𝚛𝚎𝚊𝚕 𝚙𝚘𝚗 𝚎𝚕 𝚌𝚘𝚖𝚊𝚗𝚍𝚘: #𝚗𝚒𝚟𝚎𝚕𝚖𝚊𝚜𝚌𝚘𝚝𝚊`);
    } else {
        m.reply(`No tiene suficiente *${count}* Para hacer la comprar`)
    }
}

if (command == 'lobos' || command == 'lobo') {
let count = command.replace(/^alllobos/i, '');
count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].limit / 100) : parseInt(count) : args[0] ? parseInt(args[0]) : 1;
count = Math.max(1, count);
if (global.db.data.users[m.sender].lobos > 1) return m.reply(`Ya tiene 1 lobos`) 
if (global.db.data.users[m.sender].limit >= 100 * count) {
global.db.data.users[m.sender].limit -= 100 * count;
global.db.data.users[m.sender].lobos += count;
m.reply(`🥳𝐅𝐞𝐥𝐢𝐜𝐢𝐝𝐚𝐝𝐞𝐬! 𝐇𝐚𝐬 𝐚𝐝𝐪𝐮𝐢𝐫𝐢𝐝𝐨🥳
 ᴀ ${count} ʟᴏʙᴏ🐺 

ʟᴏʙᴏ🐺(${pushname}) 
ɢᴜᴇʀʀᴇʀᴏ ʟᴇᴛᴀʟ.
ʟᴏs ʟᴏʙᴏs sᴏɴ ᴀɴɪᴍᴀʟᴇs ǫᴜᴇ ʜᴀɴ ᴇxɪsᴛɪᴅᴏ ᴘᴏʀ ᴍɪʟᴇs ᴅᴇ ᴀñᴏs, ᴅɪғɪᴄɪʟ ᴅᴇ ᴄᴏɴᴛʀᴏʟᴀʀ ᴘᴇʀᴏ ᴇxᴄᴇʟᴇɴᴛᴇ ᴀᴄᴏᴍᴘᴀñᴀɴᴛᴇ, ᴍᴜʏ ɪɴᴛɪᴍɪᴅᴀɴᴛᴇ ʜᴀsᴛᴀ ǫᴜᴇ ʟᴇs ʀᴀsᴄᴀs ʟᴀ ᴘᴀɴᴢᴀ.☺️

𝕊𝕦𝕤 𝕙𝕒𝕓𝕚𝕝𝕚𝕕𝕒𝕕𝕖𝕤 𝕤𝕠𝕟:
- ᴍᴏʀᴅᴇʀ 
- ᴄᴏʀʀᴇʀ 
- ᴄᴀᴢᴀʀ

𝑵𝒊𝒗𝒆𝒍: 1.

💯𝙿𝚊𝚛𝚊 𝚟𝚎𝚛 𝚎𝚗 𝚚𝚞𝚎 𝚝𝚘𝚙 𝚎𝚜𝚝𝚊 𝚝𝚞 𝚖𝚊𝚜𝚌𝚘𝚝𝚊 𝚙𝚘𝚗 𝚎𝚕 𝚌𝚘𝚖𝚊𝚗𝚍𝚘: #𝚖𝚌
💯𝚙𝚊𝚛𝚊 𝚟𝚎𝚛 𝚎𝚕 𝚗𝚒𝚟𝚎𝚕 𝚍𝚎 𝚝𝚞 𝚖𝚊𝚜𝚌𝚘𝚝𝚊 𝚎𝚗 𝚝𝚒𝚎𝚖𝚙𝚘. 𝚛𝚎𝚊𝚕 𝚙𝚘𝚗 𝚎𝚕 𝚌𝚘𝚖𝚊𝚗𝚍𝚘: #𝚗𝚒𝚟𝚎𝚕𝚖𝚊𝚜𝚌𝚘𝚝𝚊`);
} else m.reply(`No tiene suficiente *${count}* Para hacer la comprar`)
}

if (command == 'monos' || command == 'mono') {
let count = command.replace(/^monos/i, '');
count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].limit / 100) : parseInt(count) : args[0] ? parseInt(args[0]) : 1;
count = Math.max(1, count);
if (global.db.data.users[m.sender].monos > 1) return m.reply(`Ya tiene 1 monos🐵`) 
if (global.db.data.users[m.sender].limit >= 100 * count) {
global.db.data.users[m.sender].limit -= 100 * count;
global.db.data.users[m.sender].monos += count;
m.reply(`🥳𝐅𝐞𝐥𝐢𝐜𝐢𝐝𝐚𝐝𝐞𝐬! 𝐇𝐚𝐬 𝐚𝐝𝐪𝐮𝐢𝐫𝐢𝐝𝐨🥳
 ᴀ ${count} ᴄʜᴀɴɢᴜɪᴛᴏ (ᴄᴏᴍᴏ ᴛᴜ ᴇx)🐵 

ᴄʜᴀɴɢᴜɪᴛᴏ🐵(${pushnane}) 
ᴇs ᴄᴏᴍᴏ ᴜɴ ʙᴇʙᴇ ᴄᴏɴ ᴍᴜᴄʜᴏs ᴘᴇʟᴏs, ᴅɪᴠᴇʀᴛɪᴅᴏ ʏ ᴛʀᴀᴠɪᴇsᴏ, ᴀᴍᴀ ʟᴀs ʙᴀɴᴀɴᴀs ʏ ᴍᴏɴᴛᴀʀsᴇ ᴇɴ ᴛᴜ ʜᴏᴍʙʀᴏ. ᴘᴇʀᴏ ᴛᴇ ʀᴇᴄᴏᴍɪᴇɴᴅᴏ ᴘᴏɴᴇʀʟᴇ ᴘᴀñᴀʟᴇs.😁

𝕊𝕦𝕤 𝕙𝕒𝕓𝕚𝕝𝕚𝕕𝕒𝕕𝕖𝕤 𝕤𝕠𝕟:
- ᴍᴇᴀʀ 
- ᴄᴏᴍᴇʀ ɪɴsᴇᴄᴛᴏs 
- ʟᴀɴᴢᴀʀ ᴘᴏᴘᴏ ᴀ ᴛᴜs ᴇɴᴇᴍɪɢᴏs  

𝑵𝒊𝒗𝒆𝒍: 1.

💯𝙿𝚊𝚛𝚊 𝚟𝚎𝚛 𝚎𝚗 𝚚𝚞𝚎 𝚝𝚘𝚙 𝚎𝚜𝚝𝚊 𝚝𝚞 𝚖𝚊𝚜𝚌𝚘𝚝𝚊 𝚙𝚘𝚗 𝚎𝚕 𝚌𝚘𝚖𝚊𝚗𝚍𝚘: #𝚖𝚌
💯𝚙𝚊𝚛𝚊 𝚟𝚎𝚛 𝚎𝚕 𝚗𝚒𝚟𝚎𝚕 𝚍𝚎 𝚝𝚞 𝚖𝚊𝚜𝚌𝚘𝚝𝚊 𝚎𝚗 𝚝𝚒𝚎𝚖𝚙𝚘. 𝚛𝚎𝚊𝚕 𝚙𝚘𝚗 𝚎𝚕 𝚌𝚘𝚖𝚊𝚗𝚍𝚘: #𝚗𝚒𝚟𝚎𝚕𝚖𝚊𝚜𝚌𝚘𝚝𝚊`);
} else m.reply(`No tiene suficiente *${count}* Para hacer la comprar`)
}

if (command == 'gato' || command == 'gatos') {
let count = command.replace(/^gato/i, '');
count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].limit / 100) : parseInt(count) : args[0] ? parseInt(args[0]) : 1;
count = Math.max(1, count);
if (global.db.data.users[m.sender].gato > 1) return m.reply(`Ya tiene 1 monos🐵`) 
if (global.db.data.users[m.sender].limit >= 100 * count) {
global.db.data.users[m.sender].limit -= 100 * count;
global.db.data.users[m.sender].gato += count;
m.reply(`🥳𝐅𝐞𝐥𝐢𝐜𝐢𝐝𝐚𝐝𝐞𝐬! 𝐇𝐚𝐬 𝐚𝐝𝐪𝐮𝐢𝐫𝐢𝐝𝐨🥳
 ᴀ ᴜɴ ɢᴀᴛɪᴛᴏ 🐈‍⬛

ɢᴀᴛɪᴛᴏ🐈‍⬛(${pushname}) 
sᴇʀᴀ ᴛᴜ ᴘᴇǫᴜᴇñᴏ ᴀᴍɪɢᴏ, ᴇs ᴄᴀʀɪñᴏsᴏ ᴏᴄᴀsɪᴏɴᴀʟᴍᴇɴᴛᴇ ʏ ᴅᴇsᴀᴘᴀʀᴇᴄᴇ ᴍᴜᴄʜᴏ, ᴘᴇʀᴏ ᴛʀᴀɴǫᴜɪʟᴏ, sɪᴇᴍᴘʀᴇ ᴠᴏʟᴠᴇʀᴀ ᴄᴏɴ ᴜɴᴀ ʀᴀᴛᴀ ᴘᴀʀᴀ ᴛɪ. ᴛᴇ sᴜʙɪʀᴀ ᴇʟ ᴀɴɪᴍᴏ ᴄᴏɴ sᴜs ᴛʀᴀᴠᴇsᴜʀᴀs ᴘᴇʀᴏ ʀᴇᴄᴜᴇʀᴅᴀ, ᴊᴀᴍᴀs ʟᴇ ᴛɪʀᴇs ᴀɢᴜᴀ.💦

𝕊𝕦𝕤 𝕙𝕒𝕓𝕚𝕝𝕚𝕕𝕒𝕕𝕖𝕤 𝕤𝕠𝕟:
- ᴘᴜᴇᴅᴇ sᴇʀ ᴍᴀs ᴏᴅɪᴏsᴏ ǫᴜᴇ ᴛᴜ ᴇx  
- ᴅᴏʀᴍɪʀ
- ᴀʀᴜñᴀʀ  

𝑵𝒊𝒗𝒆𝒍: 1.

💯𝙿𝚊𝚛𝚊 𝚟𝚎𝚛 𝚎𝚗 𝚚𝚞𝚎 𝚝𝚘𝚙 𝚎𝚜𝚝𝚊 𝚝𝚞 𝚖𝚊𝚜𝚌𝚘𝚝𝚊 𝚙𝚘𝚗 𝚎𝚕 𝚌𝚘𝚖𝚊𝚗𝚍𝚘: #𝚖𝚌
💯𝚙𝚊𝚛𝚊 𝚟𝚎𝚛 𝚎𝚕 𝚗𝚒𝚟𝚎𝚕 𝚍𝚎 𝚝𝚞 𝚖𝚊𝚜𝚌𝚘𝚝𝚊 𝚎𝚗 𝚝𝚒𝚎𝚖𝚙𝚘. 𝚛𝚎𝚊𝚕 𝚙𝚘𝚗 𝚎𝚕 𝚌𝚘𝚖𝚊𝚗𝚍𝚘: #𝚗𝚒𝚟𝚎𝚕𝚖𝚊𝚜𝚌𝚘𝚝𝚊`);
} else m.reply(`No tiene suficiente *${count}* Para hacer la comprar`)
}

if (command == 'bal' || command == 'balance' || command == 'diamond') {
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let user = global.db.data.users[who]
if (!(who in global.db.data.users)) return m.reply(lenguaje.grupos.text31)
conn.sendMessage(m.chat, {text: `_____▄▀▀▀▄▄▄▄▄▄▄▀▀▀▄_____
───█▒▒░░░░░░░░░▒▒█───
────█░░█░░░░░█░░█────
─▄▄──█░░░▀█▀░░░█──▄▄─
█░░█─▀▄░░░░░░░▄▀─█░░█
•─⧼𝘽𝘼𝙇𝘼𝙉𝘾𝙀 𝘿𝙀 𝙏𝙐 𝘾𝙐𝙀𝙉𝙏𝘼⧽─•

@${who.split('@')[0]} ${user.registered === true ? '✓' : ''}【✔】 ᴛɪᴇɴᴇ: 

*💳 𝐂𝐫𝐞𝐝𝐢𝐭𝐨 𝐃𝐢𝐬𝐩𝐨𝐧𝐢𝐛𝐥𝐞 :*  ${user.limit}
*⬆️ 𝐄𝐗𝐏 :* ${user.exp}
*🪙 𝗖𝗢𝗜𝗡𝗦 :* ${user.money}
> ➥ *ᴀғᴜᴇʀᴀ ᴅᴇʟ ʙᴀɴᴄᴏ💳*

•─⧼𝘽𝘼𝙉𝘾𝙊 𝙂𝙀𝙉𝙀𝙍𝘼𝙇 𝘾𝙊𝙍𝙏𝘼𝙉𝘼⧽─•

*🏢 ᴅɪɴᴇʀᴏ💳:* ${user.banco}
> ➥ ᴀᴅᴇɴᴛʀᴏ ᴅᴇʟ ʙᴀɴᴄᴏ🏢 

•──────────✧──────────•

> ➥ 📒 *𝐍𝐎𝐓𝐀 : ᴘᴜᴇᴅᴇs ᴄᴏᴍᴘʀᴀʀ ᴍᴀs 💳 ᴄʀᴇᴅɪᴛᴏs*
➥ *ᴜsᴀɴᴅᴏ ʟᴏs ᴄᴏᴍᴀɴᴅᴏ ᴅᴇ ᴀʙᴀᴊᴏ:*
➥ • ${prefix}buy <cantidad>
➥ • ${prefix}buyall`, mentions: [who]}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}

if (command == 'dep' || command == 'depositar') {    
let who;
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
else who = m.sender;
let users =  global.db.data.users[m.sender];
if (!args[0]) return m.reply('*[ ⚠️ ] Ingresa la cantidad para agregar a sus cuenta bancaria*');
if (args[0] == '--all') {
let count = parseInt(users.limit);
users.limit -= count * 1
users.banco += count * 1
await m.reply(`*[ 🏦 ] ʜᴀs ɪɴɢʀᴇsᴀɴᴅᴏ (${count}) ᴄʀᴇᴅɪᴛᴏ ᴀʟ ʙᴀɴᴄᴏ*`);
return !0;
};
if (!Number(args[0])) return m.reply('*[ ⚠️ ] Falto en número de cantidad de crédito💳*');
let count = parseInt(args[0]);
if (!users.limit) return m.reply('*Esta pobre no tener suficiente crédito*');
if (users.limit < count) return m.reply(`*Che no sabes cuanto dinero tiene el tu cartera? usar el comando:* #bal`);
users.limit -= count * 1;
users.banco += count * 1;
await m.reply(`*[ 🏦 ] ʜᴀs ɪɴɢʀᴇsᴀɴᴅᴏ ${count} ᴄʀᴇᴅɪᴛᴏ ᴀʟ ʙᴀɴᴄᴏ*`)}
  
if (command == 'retirar' || command == 'toremove') {     
let user =  global.db.data.users[m.sender]
if (!args[0]) return m.reply('*[ ⚠️ ] ingresa la cantidad a retirar*');
if (args[0] == '--all') {
let count = parseInt(user.banco);
user.banco -= count * 1
user.limit += count * 1
await m.reply(`*[ 🏦 ] ʜᴀs ʀᴇᴛɪʀᴀᴅᴏ (${count}) ᴄʀᴇᴅɪᴛᴏ ᴅᴇʟ ʙᴀɴᴄᴏ.*`);
return !0 
}
if (!Number(args[0])) return m.reply('La cantidad debe ser un mumero.'); 
let count = parseInt(args[0]);
if (!user.banco) return m.reply('Hey fantasma 👻, no tener esa cantidad de dinero el banco 🥲');
if (user.banco < count) return m.reply(`*Che no sabes cuanto dinero tiene el tu cartera? usar el comando:* #bal`);
user.banco -= count * 1
user.limit += count * 1
await m.reply(`*[ 🏦 ] ʜᴀs ʀᴇᴛɪʀᴀᴅᴏ (${count}) ᴄʀᴇᴅɪᴛᴏ ᴅᴇʟ ʙᴀɴᴄᴏ.*`)}

if (command == 'batalla' || command == 'batalla2') {

const date = global.db.data.users[m.sender].timebatalla + 1800000; //3600000 = 30 min 
if (new Date - global.db.data.users[m.sender].timebatalla < 1800000) return m.reply(`⏰ Tu mascota esta cansada, vuelvas mas tardes: ${msToTime(date - new Date())}`)
const exp = Math.floor(Math.random() * 15000)
const diamond = Math.floor(Math.random() * 150)
const money = Math.floor(Math.random() * 15000)

if (global.db.data.users[m.sender].exp < 0) return m.reply(`${batall2} ${exp} XP`).catch(global.db.data.users[m.sender].exp += exp)
if (global.db.data.users[m.sender].limit < 0) return m.reply(`${batall2} ${diamond} ᴄʀᴇᴅɪᴛᴏs💳`).catch(global.db.data.users[m.sender].limit += diamond)
if (global.db.data.users[m.sender].money < 0) return m.reply(`${batall2} ${money} Coins`).catch(global.db.data.users[m.sender].money += money) 

let or = ['text', 'text2']; 
let media = or[Math.floor(Math.random() * 2)]
global.db.data.users[m.sender].timebatalla = new Date * 1

if (media === 'text') m.reply(`${batall2} ${exp} XP`).catch(global.db.data.users[m.sender].exp += exp) 
if (media === 'text2') m.reply(`${batall} ${exp} XP`).catch(global.db.data.users[m.sender].exp -= exp) 
if (media === 'text3') m.reply(`${batall2}\n\n${diamond} ᴄʀᴇᴅɪᴛᴏs💳`).catch(global.db.data.users[m.sender].limit += diamond) 
if (media === 'text4') m.reply(`${batall}\n\n${diamond} ᴄʀᴇᴅɪᴛᴏs💳`).catch(global.db.data.users[m.sender].limit -= diamond)}

if (command == 'minar' || command == 'mine') {
const date = global.db.data.users[m.sender].lastmiming + 600000;
if (new Date - global.db.data.users[m.sender].lastmiming < 600000) return m.reply(`*${lenguaje.rpg.text9} ${msToTime(date - new Date())} ${lenguaje.rpg.text10}*`) 
const exp = Math.floor(Math.random() * 9999)
global.db.data.users[m.sender].exp += exp;
m.reply(`*${minar} ${exp} XP*`)
global.db.data.users[m.sender].lastmiming = new Date * 1;
}

if (command == 'minar2' || command == 'mine2') {
const date = global.db.data.users[m.sender].lastmiming2 + 3600000;
if (new Date - global.db.data.users[m.sender].lastmiming2 < 3600000) return m.reply(`*${lenguaje.rpg.text9} ${msToTime(date - new Date())} ${lenguaje.rpg.text10}*`)
//const exp = Math.floor(Math.random() * 2500)
const diamond = Math.floor(Math.random() * 75)
const money = Math.floor(Math.random() * 6500)
//global.db.data.users[m.sender].exp += exp
global.db.data.users[m.sender].limit += diamond
global.db.data.users[m.sender].money += money
m.reply(`${minar}\n${diamond} 💳 *ᴄʀᴇᴅɪᴛᴏ:*\n${money} 𝐂𝐎𝐈𝐍𝐒 🪙`)
m.react('💳') 
global.db.data.users[m.sender].lastmiming2 = new Date * 1;
}

if (command == 'trabajar' || command == 'work' || command == 'w') {
let hasil = Math.floor(Math.random() * 99999)
//let dono = Math.floor(Math.random() * 40)
let time = global.db.data.users[m.sender].lastwork + 650000 //3600000
if (new Date - global.db.data.users[m.sender].lastwork < 650000) return m.reply(`${lenguaje.rpg.text12}\n\n*${lenguaje.rpg.text9}* ${msToTime(time - new Date())} ${lenguaje.rpg.text13}`) 
let anu = (await axios.get('https://raw.githubusercontent.com/fgmods/fg-team/main/games/work.json')).data
let res = pickRandom(anu)
global.db.data.users[m.sender].exp += hasil
//global.db.data.users[m.sender].limit += dono
m.reply(`⚒️ ${res.fgwork} *${hasil} XP*`)
global.db.data.users[m.sender].lastwork = new Date * 1
}

if (command == 'claim' || command == 'daily') {
let time = global.db.data.users[m.sender].lastclaim + 7200000
if (new Date - global.db.data.users[m.sender].lastclaim < 7200000) return m.reply(`${lenguaje.rpg.text14} ${msToTime(time - new Date())}`) 
const exp = Math.floor(Math.random() * 9999)
const limit = Math.floor(Math.random() * 75)
const money = Math.floor(Math.random() * 9999)
global.db.data.users[m.sender].limit += limit;
global.db.data.users[m.sender].money += money
global.db.data.users[m.sender].exp += exp
m.reply(`${lenguaje.rpg.text15}\n🆙 *xᴘ* : ${exp}\n💳 *ᴄʀᴇᴅɪᴛᴏ:* ${limit}\n🪙 *ᴄᴏɪɴs :* ${money}`)
global.db.data.users[m.sender].lastclaim = new Date * 1
}

if (command == 'perfil') {
avatar = await conn.profilePictureUrl(who, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')
let { money, exp, role, limit, level, registered, age} = global.db.data.users[m.sender]
conn.sendMessage(m.chat, { image: { url: avatar }, caption: `${lenguaje.rpg.pp}

${lenguaje.rpg.pp2} ${pushname} ${registered === true ? 'ͧͧͧͦꙶͣͤ✓' : ''}
${lenguaje.rpg.pp3} wa.me/${sender.split("@")[0]} ${registered ? '\n*🧐 EDAD :* ' + age + ' años' : ''}
${lenguaje.rpg.pp4} ${limit}
${lenguaje.rpg.pp5} ${level}
*⬆️ EXP :* ${exp}
${lenguaje.rpg.pp6} ${role}
${lenguaje.rpg.pp7} ${registered ? 'Si': 'No'}`}, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
m.react(done)}

if (command == 'levelup' || command == 'nivel') {
//let name = conn.getName(m.sender);  
let user = global.db.data.users[m.sender]; 
if (!canLevelUp(user.level, user.exp, global.multiplier)) { 
let {min, xp, max} = xpRange(user.level, global.multiplier);
return m.reply(`╭╌「 ${lenguaje.rpg.level} 」
├╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
├ ${lenguaje.rpg.level2}
├╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
├─ ${lenguaje.rpg.level3} ${pushname}
├─ ➫ *𝑿𝑷 🆙:* ${user.exp - min}/${xp}
├─ ${lenguaje['smsAutonivel3']()} ${user.level}
├─ ${lenguaje['smsAutonivel6']()} ${user.role}
╰╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌

${lenguaje.rpg.level4} *${max - user.exp}* ${lenguaje.rpg.level5}`)} 
const before = user.level * 1; 
while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++; 
if (before !== user.level) {
const str = `╭╌「 *LEVEL UP 🎊* 」
├╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
├『 🥳 ${pushname} ${lenguaje.rpg.level6}
├╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
├─ ${lenguaje['smsAutonivel4']()} ${before}
├─ ${lenguaje['smsAutonivel5']()} ${user.level}
├─ ${lenguaje['smsAutonivel6']()} ${user.role}
╰╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌

${lenguaje.rpg.level7}`.trim()
return m.reply(str)}}

if (command == 'cofre') {
if (global.db.data.users[m.sender].level < 9) return m.reply(`${lenguaje['nivel']()} 9 ${lenguaje['nivel2']()} ${prefix}nivel`) 
const date = global.db.data.users[m.sender].lastcofre + 86400000; //10 hs
if (new Date - global.db.data.users[m.sender].lastcofre < 86400000) return m.reply(`${lenguaje.rpg.text16} ${msToTime(date - new Date())}`) 
exp = Math.floor(Math.random() * 99999)
limit = Math.floor(Math.random() * 95)
trash = Math.floor(Math.random() * 900)
potion = Math.floor(Math.random() * 399)
money = Math.floor(Math.random() * 99999)
global.db.data.users[m.sender].exp += exp
global.db.data.users[m.sender].limit += limit
global.db.data.users[m.sender].trash += trash
global.db.data.users[m.sender].potion += potion
global.db.data.users[m.sender].money += money
m.reply(`╔══🎉═🎉═🎉══⬣\n║${lenguaje.rpg.text17}\n║┈┈┈┈┈┈┈┈┈┈┈┈┈\n║⚡${exp} 𝙴𝚇𝙿\n║💳 ${limit} ᴄʀᴇᴅɪᴛᴏ\n║🗑️ ${trash} 𝙱𝙰𝚂𝚄𝚁𝙰\n║🥤 ${potion} 𝙿𝙾𝙲𝙸𝙾𝙽𝙴𝚂\n║🪙 ${money} 𝙲𝙾𝙸𝙽𝚂\n╚═════════════════⬣`)
global.db.data.users[m.sender].lastcofre = new Date * 1;
}}

//función pickrandow
function pickRandom(list) {
return list[Math.floor(list.length * Math.random())]
}

function sort(property, ascending = true) {
  if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property];
  else return (...args) => args[ascending & 1] - args[!ascending & 1];
}

function toNumber(property, _default = 0) {
  if (property) {
    return (a, i, b) => {
      return {...b[i], [property]: a[property] === undefined ? _default : a[property]};
    };
  } else return (a) => a === undefined ? _default : a;
}

function enumGetKey(a) {
  return a.jid;
}

//temporarily
function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

hours = (hours < 10) ? "0" + hours : hours
minutes = (minutes < 10) ? "0" + minutes : minutes
seconds = (seconds < 10) ? "0" + seconds : seconds

return hours + " Horas " + minutes + " Minutos " + seconds + " Segundos "
}

function isNumber(x) {
    return !isNaN(x)
}

module.exports = { reg, rpg }

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})
