const fs = require("fs")
const { smsg, getGroupAdmins, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, delay, format, logic, generateProfilePicture, parseMention, getRandom} = require('../libs/fuctions.js'); 
const path = require("path") 
const chalk = require("chalk");
const moment = require('moment-timezone') 
const gradient = require('gradient-string') 
const fetch = require('node-fetch') 
const axios = require('axios')
const cheerio = require('cheerio')
const Jimp = require('jimp')
const os = require('os')

const menu = (m, command, conn, prefix, pushname, sender, pickRandom, fkontak) => {
if (global.db.data.users[m.sender].registered < true) return  conn.sendMessage(m.chat, {video: {url: verificar}, caption: info.registra}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
if (global.db.data.users[m.sender].banned) return 
let user = global.db.data.users[m.sender]
let totalreg = Object.keys(global.db.data.users).length
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
const date = moment.tz('America/Bogota').format('DD/MM/YYYY')
const time = moment.tz('America/Argentina/Buenos_Aires').format('LT')
let wa = m.key.id.length > 21 ? 'Android' : m.key.id.substring(0, 2) == '3A' ? 'IOS' : 'whatsapp web'

conn.fakeReply(m.chat, `*🚩 Cargando menu, porfavor espera.*\n\n> No hagas spam de comandos`, '0@s.whatsapp.net', 'Enviando menu aguarden...')

let submenu = `╔══〘 \`👥 INFO DEL USUARIO\` 〗══╗
║ ᴜsᴜᴀʀɪᴏs: @${sender.split("@")[0]} 
║ ${lenguaje.menu.text8} ${user.limit}
║ ${lenguaje.menu.text9} ${user.level}
║ ${lenguaje.menu.text10} ${user.role}
║❐ ᴇxᴘ : ${user.exp}
║❐ ᴄᴏɪɴs : ${user.money}
║════════════
║
║${lenguaje.menu.text11} ${rtotalreg} de ${totalreg}
╚════════════════╝

\`ᰔᩚ 𝐐𝐔𝐈𝐄𝐑𝐄 𝐎𝐁𝐓𝐄𝐍𝐄𝐑 𝐓𝐔 𝐁𝐎𝐓 𝐏𝐄𝐑𝐒𝐎𝐍𝐀𝐋𝐈𝐙𝐀𝐃𝐎? :\`
◈ https://www.facebook.com/elrebelde21\n\n`
let descargar = `╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⪩
┊┏━━━━━━━━━━━━━━•
┊┃ *🚀 ＭＥＮＵ ＤＥＳＣＡＲＧＡ 🚀*
┊┃━━━━━━━━━━━━━━•
┊┃ ❏ ${prefix}play _(descargar música)_
┊┃ ❏ ${prefix}play2 _(Descargar video)_
┊┃ ❏ ${prefix}play.1 _(descargar música)_
┊┃ ❏ ${prefix}play.2 _(descargar video)_
┊┃ ❏ ${prefix}musica
┊┃ ❏ ${prefix}video
┊┃ ❏ ${prefix}playdoc
┊┃ ❏ ${prefix}play3 _(Descarga audio en documento)_
┊┃ ❏ ${prefix}play4 _(Descarga video en documento)_
┊┃ ❏ ${prefix}yts _(Buscador de youtube)_
┊┃ ❏ ${prefix}ytmp3 _(link para descargar el audio)_
┊┃ ❏ ${prefix}ytmp4 _(link para descargar el video)_
┊┃ ❏ ${prefix}spotify
┊┃ ❏ ${prefix}music _(Descarga musica de Spotify)_
┊┃ ❏ ${prefix}gitclone _(descarga repositorio de GitHub)_
┊┃ ❏ ${prefix}tiktok _(descargar video de tiktok)_
┊┃ ❏ ${prefix}tiktokimg
┊┃ ❏ ${prefix}ttimg _(descarga imagen de tiktok)_
┊┃ ❏ ${prefix}igstalk _(nombre de un user de ig)_
┊┃ ❏ ${prefix}facebook
┊┃ ❏ ${prefix}fb _(Descarga videos de Facebook)_
┊┃ ❏ ${prefix}instagram
┊┃ ❏ ${prefix}ig _(Descarga videos de Instagram)_
┊┃ ❏ ${prefix}mediafire _(descarga archivo de mediafire)_
┊┃ ❏ ${prefix}tiktokstalk _(nombre del user de TikTok)_
┊┃ ❏ ${prefix}twitter
┊┃ ❏ ${prefix}x _(descarga video de twiter (X)_
┊┃ ❏ ${prefix}gdrive _(Descarga archivos de gdrive)_
┊┗━━━━━━━━━━━━━━•
╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⪩`
let grupos = `╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⪩
┊┏━━━━━━━━━━━━━━•
┊┃ *🔰 ＭＥＮＵ ＰＡＲＡ ⃐ＧＲＵＰＯＳ 🔰*
┊┃━━━━━━━━━━━━━━•
┊┃Gestionar tu grupo con ${wm}
┊┃━━━━━━━━━━━━━━•
┊┃ ❏ ${prefix}welcome _(on/off)_
┊┃ ❏ ${prefix}antilink _(on/off)_
┊┃ ❏ ${prefix}antienlace _(on/off)_
┊┃ ❏ ${prefix}antifake _(on/off)_
┊┃ ❏ ${prefix}antiarabe _(on/off)_
┊┃ ❏ ${prefix}antitoxic _(on/off)_
┊┃ ❏ ${prefix}antilink2 _(on/off)_
┊┃ ❏ ${prefix}AntiTwiter _(on/off)_
┊┃ ❏ ${prefix}antitiktok _(on/off)_
┊┃ ❏ ${prefix}AntiTikTok _(on/off)_
┊┃ ❏ ${prefix}antitelegram _(on/off)_
┊┃ ❏ ${prefix}AntiTelegram _(on/off)_
┊┃ ❏ ${prefix}antifacebook _(on/off)_
┊┃ ❏ ${prefix}AntiFb _(on/off)_
┊┃ ❏ ${prefix}AntiFaceBook _(on/off)_
┊┃ ❏ ${prefix}AntInstagram _(on/off)_
┊┃ ❏ ${prefix}AntiIg _(on/off)_
┊┃ ❏ ${prefix}antiyoutube _(on/off)_
┊┃ ❏ ${prefix}AntiYoutube _(on/off)_
┊┃ ❏ ${prefix}autosticker _(on/off)_
┊┃ ❏ ${prefix}detect _(on/off)_
┊┃ ❏ ${prefix}autodetect _(on/off)_
┊┃ ❏ ${prefix}antinsfw _(on/off)_
┊┃ ❏ ${prefix}modocaliente _(on/off)_
┊┃ ❏ ${prefix}autosticker _(on/off)_
┊┃ ❏ ${prefix}modoadmin _(on/off)_
┊┃ ❏ ${prefix}audios _(on/off)_
┊┃ ❏ ${prefix}chatbot _(on/off)_
┊┃ ❏ ${prefix}autolevelup _(on/off)_
┊┃ ❏ ${prefix}autonivel _(on/off)_
┊┃ ❏ ${prefix}addrules _(text)_
┊┃ ❏ ${prefix}setrules _(text)_
┊┃ ❏ ${prefix}rules _(reglas del Grupo)_
┊┃ ❏ ${prefix}kick _(@tag)_
┊┃ ❏ ${prefix}add _(@tag)_
┊┃ ❏ ${prefix}invita _(@tag)_
┊┃ ❏ ${prefix}promote _(@tag)_
┊┃ ❏ ${prefix}demote _(@tag)_
┊┃ ❏ ${prefix}infogrupo
┊┃ ❏ ${prefix}groupinfo
┊┃ ❏ ${prefix}admins _(invocar a los admins)_
┊┃ ❏ ${prefix}grupo _(close/open)_
┊┃ ❏ ${prefix}warn _(@tag)_
┊┃ ❏ ${prefix}advertencia _(@tag)_
┊┃ ❏ ${prefix}unwarn _(@tag)_
┊┃ ❏ ${prefix}quitardvertencia _(@tag)_
┊┃ ❏ ${prefix}setppname _(cambia name del grupo)_
┊┃ ❏ ${prefix}setdesc _(cambia la desc del grupo)_
┊┃ ❏ ${prefix}setppgroup _(cambia la foto del grupo)_
┊┃ ❏ ${prefix}anularlink 
┊┃ ❏ ${prefix}resetlink _(restablecer el link del grupo)_
┊┃ ❏ ${prefix}hidetag _(Etiqueta a todos en un mensaje)_
┊┃ ❏ ${prefix}tagall 
┊┃ ❏ ${prefix}invocar _(invocar a todos en una lista)_
┊┃ ❏ ${prefix}listonline _(usuarios online)_
┊┗━━━━━━━━━━━━━━•
╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⪩`

let buscadores = `╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⪩
┊┏━━━━━━━━━━━━━━•
┊┃ *🔎 ＭＥＮＵ ＢＵＳＣＡＤＯＲＥＳ 🔎*
┊┃━━━━━━━━━━━━━━•
┊┃ ❏ ${prefix}google _(buscar información con google)_
┊┃ ❏ ${prefix}chatgpt
┊┃ ❏ ${prefix}ia _(buscar información con la IA)_
┊┃ ❏ ${prefix}bard _(buscar información)_
┊┃ ❏ ${prefix}imagen _(Imagen en google)_
┊┃ ❏ ${prefix}traducir _(Traducir algun texto)_
┊┃ ❏ ${prefix}wallpaper _(imagen del wallpaper)_
┊┃ ❏ ${prefix}ss _(link)_
┊┃ ❏ ${prefix}dall-e
┊┃ ❏ ${prefix}pinterest
┊┃ ❏ ${prefix}wikipedia
┊┃ ❏ ${prefix}wiki
┊┃ ❏ ${prefix}ia2 _(Crear imagen con la (IA)_
┊┃ ❏ ${prefix}horario
┊┗━━━━━━━━━━━━━━•
╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⪩`
let juegos = `╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⪩
┊┏━━━━━━━━━━━━━━•
┊┃ *👾 ＭＥＮＵＪＵＥＧＯＳ 👾*
┊┃━━━━━━━━━━━━━━•
┊┃ ❏ ${prefix}simi _(hablar con el bot)_
┊┃ ❏ ${prefix}ppt _(piedra, papel, o tijera)_
┊┃ ❏ ${prefix}gay @tag
┊┃ ❏ ${prefix}pareja @tag
┊┃ ❏ ${prefix}love @tag
┊┃ ❏ ${prefix}follar @tag
┊┃ ❏ ${prefix}topgays
┊┃ ❏ ${prefix}topotakus
┊┃ ❏ ${prefix}top
┊┃ ❏ ${prefix}pregunta
┊┃ ❏ ${prefix}verdad
┊┃ ❏ ${prefix}reto
┊┃ ❏ ${prefix}doxear
┊┃ ❏ ${prefix}personalidad
┊┃ ❏ ${prefix}racista
┊┃ ❏ ${prefix}slot
┊┃ ❏ ${prefix}math
┊┃ ❏ ${prefix}matematicas
┊┃ ❏ ${prefix}ttt
┊┃ ❏ ${prefix}tictactoe
┊┃ ❏ ${prefix}ttc
┊┃ ❏ ${prefix}delttt
┊┃ ❏ ${prefix}dado
┊┃ ❏ ${prefix}piropo
┊┃ ❏ ${prefix}ship
┊┃ ❏ ${prefix}formartrio
┊┃ ❏ ${prefix}formapareja5
┊┃ ❏ ${prefix}ruletas
┊┃ ❏ ${prefix}suerte
┊┃ ❏ ${prefix}txt _(texto)_
┊┃ ❏ ${prefix}fake _(texto + tag)_
┊┗━━━━━━━━━━━━━━•
╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⪩`
let efecto = `╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⪩
┊┏━━━━━━━━━━━━━━•
┊┃ *🎤 ＭＥＮＵ ＤＥ ＥＦＥＣＴＯＳ 🎤*
┊┃━━━━━━━━━━━━━━•
┊┃ *(𝚁𝙴𝚂𝙿𝙾𝙽𝙳𝙴 𝙰 𝙰𝚄𝙳𝙸𝙾 𝙾 𝙽𝙾𝚃𝙰 𝙳𝙴 𝚅𝙾𝚉)*
┊┃━━━━━━━━━━━━━━•
┊┃ ❏ ${prefix}bass
┊┃ ❏ ${prefix}blown
┊┃ ❏ ${prefix}deep
┊┃ ❏ ${prefix}earrape
┊┃ ❏ ${prefix}fast
┊┃ ❏ ${prefix}fat
┊┃ ❏ ${prefix}nightcore
┊┃ ❏ ${prefix}reverse
┊┃ ❏ ${prefix}robot
┊┃ ❏ ${prefix}slow
┊┃ ❏ ${prefix}smooth
┊┃ ❏ ${prefix}squirrel
┊┗━━━━━━━━━━━━━━•
╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⪩`
let convertidores = `╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⪩
┊┏━━━━━━━━━━━━━━•
┊┃ *🧧ＭＥＮＵ ＣＯＮＶＥＲＴＩＤＯＲＥＳ 🧧*
┊┃━━━━━━━━━━━━━━•
┊┃ ❏ ${prefix}tourl
┊┃ ❏ ${prefix}tts
┊┃ ❏ ${prefix}tomp3
┊┃ ❏ ${prefix}toimg
┊┃ ❏ ${prefix}toaudio
┊┃ ❏ ${prefix}toanime
┊┃ ❏ ${prefix}hd
┊┃ ❏ ${prefix}logos
┊┗━━━━━━━━━━━━━━•
╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⪩`
let menu18 = `╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⪩
┊┏━━━━━━━━━━━━━━•
┊┃ *🥵 ＭＥＮＵ +18 🥵*
┊┃━━━━━━━━━━━━━━•
┊┃ *Nota: usarlo baja tu responsabilidad*
┊┃ *No sea pajero*
┊┃━━━━━━━━━━━━━━•
┊┃ ❏ ${prefix}pussy
┊┃ ❏ ${prefix}nsfwloli
┊┃ ❏ ${prefix}hentai
┊┃ ❏ ${prefix}hentai2
┊┃ ❏ ${prefix}pack
┊┃ ❏ ${prefix}pack2
┊┃ ❏ ${prefix}pack3
┊┃ ❏ ${prefix}china
┊┃ ❏ ${prefix}videoxxx
┊┃ ❏ ${prefix}videoxxxlesbi
┊┃ ❏ ${prefix}pornolesbianavid
┊┃ ❏ ${prefix}videolesbixxx
┊┃ ❏ ${prefix}porno
┊┃ ❏ ${prefix}lewd
┊┃ ❏ ${prefix}feed
┊┃ ❏ ${prefix}gasm
┊┃ ❏ ${prefix}anal	    	
┊┃ ❏ ${prefix}holo	    	
┊┃ ❏ ${prefix}tits	    	
┊┃ ❏ ${prefix}kuni
┊┃ ❏ ${prefix}kiss
┊┃ ❏ ${prefix}erok
┊┃ ❏ ${prefix}smug
┊┃ ❏ ${prefix}solog
┊┃ ❏ ${prefix}feetg
┊┃ ❏ ${prefix}lewdk    
┊┃ ❏ ${prefix}femdom
┊┃ ❏ ${prefix}cuddle
┊┃ ❏ ${prefix}eroyuri
┊┃ ❏ ${prefix}cum	    
┊┃ ❏ ${prefix}blowjob
┊┃ ❏ ${prefix}holoero
┊┃ ❏ ${prefix}erokemo
┊┃ ❏ ${prefix}fox_girl
┊┃ ❏ ${prefix}futanari
┊┃ ❏ ${prefix}wallpaper	   
┊┗━━━━━━━━━━━━━━•
╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⪩`
let menurandow = `╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⪩
┊┏━━━━━━━━━━━━━━•
┊┃ *⛩️ ＭＥＮＵ ＲＡＮＤＯＷ ⛩️*
┊┃━━━━━━━━━━━━━━•
┊┃ ❏ ${prefix}memes
┊┃ ❏ ${prefix}horny
┊┃ ❏ ${prefix}simp
┊┃ ❏ ${prefix}lolice
┊┃ ❏ ${prefix}comentar
┊┃ ❏ ${prefix}comment
┊┃ ❏ ${prefix}loli
┊┃ ❏ ${prefix}lolivid
┊┃ ❏ ${prefix}neko
┊┃ ❏ ${prefix}waifu	
┊┃ ❏ ${prefix}blackpink
┊┃ ❏ ${prefix}navidad
┊┃ ❏ ${prefix}akira
┊┃ ❏ ${prefix}akiyama
┊┃ ❏ ${prefix}china
┊┃ ❏ ${prefix}anna
┊┃ ❏ ${prefix}asuna
┊┃ ❏ ${prefix}ayuzawa
┊┃ ❏ ${prefix}boruto
┊┃ ❏ ${prefix}chiho
┊┃ ❏ ${prefix}chitoge
┊┃ ❏ ${prefix}deidara
┊┃ ❏ ${prefix}erza
┊┃ ❏ ${prefix}elaina
┊┃ ❏ ${prefix}eba
┊┃ ❏ ${prefix}emilia
┊┃ ❏ ${prefix}hestia
┊┃ ❏ ${prefix}hinata
┊┃ ❏ ${prefix}inori
┊┃ ❏ ${prefix}isuzu
┊┃ ❏ ${prefix}itachi
┊┃ ❏ ${prefix}itori
┊┃ ❏ ${prefix}kaga
┊┃ ❏ ${prefix}kagura
┊┃ ❏ ${prefix}kaori
┊┃ ❏ ${prefix}keneki
┊┃ ❏ ${prefix}kotori
┊┃ ❏ ${prefix}kurumi
┊┃ ❏ ${prefix}madara
┊┃ ❏ ${prefix}mikasa
┊┃ ❏ ${prefix}miku
┊┃ ❏ ${prefix}minato
┊┃ ❏ ${prefix}naruto
┊┃ ❏ ${prefix}nezuko
┊┃ ❏ ${prefix}sagiri
┊┃ ❏ ${prefix}sasuke
┊┃ ❏ ${prefix}sakura
┊┃ ❏ ${prefix}cosplay
┊┃━━━━━━━━━━━━━━•
┊┃ *• Mas randow agregados por Russell :*
┊┃━━━━━━━━━━━━━━•
┊┃ ❏ ${prefix}cortanahistoria1
┊┃ ❏ ${prefix}cortanahistoria2
┊┃ ❏ ${prefix}cortanafinal
┊┃ ❏ ${prefix}clancortana
┊┗━━━━━━━━━━━━━━•
╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⪩`
let menuRPG = `╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⪩
┊┏━━━━━━━━━━━━━━•
┊┃ *🪙 ＭＥＮＵ ＲＰＧ / ＥＣＯＮＯＭＩＡ*
┊┃━━━━━━━━━━━━━━•
┊┃ ❏ ${prefix}minar _(Para minar exp)_
┊┃ ❏ ${prefix}robar
┊┃ ❏ ${prefix}rob _(Roba exp algun usuarios)_
┊┃ ❏ ${prefix}crime
┊┃ ❏ ${prefix}trabajar
┊┃ ❏ ${prefix}work _(Trabaja y ganas exp)_
┊┃ ❏ ${prefix}buy _(Comprar mas diamantes (limit)_
┊┃ ❏ ${prefix}bal
┊┃ ❏ ${prefix}balace _(diamante/exp tenés)_
┊┃ ❏ ${prefix}claim _(Recoger tu recompensa)_
┊┃ ❏ ${prefix}lb
┊┃ ❏ ${prefix}leaderboard
┊┃ ❏ ${prefix}cofre
┊┃ ❏ ${prefix}perfil
┊┃ ❏ ${prefix}nivel
┊┃ ❏ ${prefix}dep
┊┃ ❏ ${prefix}depositar
┊┃ ❏ ${prefix}retirar
┊┃ ❏ ${prefix}toremove
┊┃ ❏ ${prefix}levelup
┊┃ ❏ ${prefix}transferir
┊┃ ❏ ${prefix}transfer
┊┃ ❏ ${prefix}afk 
┊┗━━━━━━━━━━━━━━•
╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⪩`
let menuSticker= `╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⪩
┊┏━━━━━━━━━━━━━━•
┊┃ *👽 ＭＥＮＵ ＳＴＩＣＫＥＲ 👽*
┊┃━━━━━━━━━━━━━━•
┊┃ *(Crear sticker desde whatsapp con ${wm}*
┊┃━━━━━━━━━━━━━━•
┊┃ ❏ ${prefix}s
┊┃ ❏ ${prefix}sticker 
┊┃ ❏ ${prefix}wm
┊┃ ❏ ${prefix}attp
┊┃ ❏ ${prefix}qc
┊┃ ❏ ${prefix}emojimix
┊┗━━━━━━━━━━━━━━•
╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⪩`
let menuOwner = `╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⪩
┊┏━━━━━━━━━━━━━━•
┊┃ *👑 ＭＥＮＵ ＯＷＮＥＲ 👑*
┊┃━━━━━━━━━━━━━━•
┊┃ _(Comando exclusivo para propietario/owner del bot)_
┊┃━━━━━━━━━━━━━━•
┊┃ ❏ ${prefix}anticall _(on/off)_
┊┃ ❏ ${prefix}antillamada _(on/off)_
┊┃ ❏ ${prefix}antipv _(on/off)_
┊┃ ❏ ${prefix}antiprivado _(on/off)_
┊┃ ❏ ${prefix}autoread _(on/off)_
┊┃ ❏ ${prefix}modojadibot _(on/off)_
┊┃ ❏ ${prefix}añadirdiamantes _(@tag)_
┊┃ ❏ ${prefix}addlimit _(@tag)_
┊┃ ❏ ${prefix}dardiamantes _(@tag)_
┊┃ ❏ ${prefix}añadirxp _(@tag)_
┊┃ ❏ ${prefix}addxp _(@tag)_
┊┃ ❏ ${prefix}banuser _(@tag)_
┊┃ ❏ ${prefix}unbanuser _(@tag)_
┊┃ ❏ ${prefix}autoadmin 
┊┃ ❏ ${prefix}nuevonombre
┊┃ ❏ ${prefix}botname _(cambiar el name del bot)_
┊┃ ❏ ${prefix}nuevafoto
┊┃ ❏ ${prefix}seppbot
┊┃ ❏ ${prefix}fotobot _(cambiar la foto del bot)_
┊┃ ❏ ${prefix}bc (Difusión a todos los chat)
┊┃ ❏ ${prefix}bcgc (Difusión solo a grupos)
┊┃ ❏ ${prefix}public (Modo público) 
┊┃ ❏ ${prefix}privado (Modo privado) 
┊┃ ❏ ${prefix}getcase
┊┃ ❏ ${prefix}fetch
┊┃ ❏ ${prefix}update
┊┃ ❏ ${prefix}restart 
┊┃ ❏ ${prefix}reiniciar
┊┃ ❏ $ 
┊┃ ❏ >
┊┃ ❏ => 
┊┗━━━━━━━━━━━━━━•
╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⪩`

if (command == 'menu' || command == 'help') {
m.react('🟢') 
let menu = `╔═══〘 ${wm} 〗═══╗
║ ${lenguaje['smsWel']()} @${sender.split("@")[0]} ${user.registered === true ? 'ͧͧͧͦꙶͣͤ✓' : ''} 👋🏻
║══════════════
║${lenguaje.menu.text} [ ${prefix} ]
║${lenguaje.menu.text2} ${date}
║${lenguaje.menu.text3} ${time}
║${lenguaje.menu.text4} ${vs}
║${lenguaje.menu.text5} ${Object.keys(global.db.data.users).length}
║${lenguaje.menu.text6} ${runtime(process.uptime())}
║${lenguaje.menu.text7} ${conn.public ? 'publico' : 'privado'}
║${conn.user.id == global.numBot2 ? `${lenguaje.menu.textt} ` : `${lenguaje.menu.texttt} @${global.numBot.split`@`[0]}`}
║══════════════
║ ${lenguaje.menu.text8} ${user.limit}
║ ${lenguaje.menu.text9} ${user.level}
║ ${lenguaje.menu.text10} ${user.role}
║❐ ᴇxᴘ : ${user.exp}
║❐ ᴄᴏɪɴs : ${user.money}
║══════════════
║${lenguaje.menu.text11} ${rtotalreg} de ${totalreg}
╚══════════════════╝

\`ᰔᩚ 𝐐𝐔𝐈𝐄𝐑𝐄 𝐎𝐁𝐓𝐄𝐍𝐄𝐑 𝐓𝐔 𝐁𝐎𝐓 𝐏𝐄𝐑𝐒𝐎𝐍𝐀𝐋𝐈𝐙𝐀𝐃𝐎? :\`
◈ https://www.facebook.com/elrebelde21

╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⪩
┊┏━━━━━━━━━━━━━━•
┊┃ *🟢 ＬＩＳＴＡ ＤＥＬ ＣＯＭＡＮＤＯ*
┊┃━━━━━━━━━━━━━━•
┊┃ ❏ ${prefix}allmenu | menucompleto
┊┃ ❏ ${prefix}menu1 | descarga
┊┃ ❏ ${prefix}menu2 | audio
┊┃ ❏ ${prefix}menu3 | menugrupos
┊┃ ❏ ${prefix}menu4 | menubuscadores
┊┃ ❏ ${prefix}menu5 | menujuegos
┊┃ ❏ ${prefix}menu6 | menuefecto
┊┃ ❏ ${prefix}menu7 | menuconvertidores
┊┃ ❏ ${prefix}menu8 | menurandow
┊┃ ❏ ${prefix}menu9 | menuRPG
┊┃ ❏ ${prefix}menu10 | menuSticker
┊┃ ❏ ${prefix}menu11 | menuOwner
┊┃ ❏ ${prefix}menu18 | Menuhony
┊┃ ❏ ${prefix}logos 
┊┃━━━━━━━━━━━━━━•
┊┃ *💫 ＩＮＦＯＲＭＡＣＩＯ́Ｎ 💫*
┊┃━━━━━━━━━━━━━━•
┊┃ ❏ ${prefix}estado _(estado del bot)_
┊┃ ❏ ${prefix}nuevo _(nuevo comando)_
┊┃ ❏ ${prefix}reglas _(reglas)_
┊┃ ❏ ${prefix}ping
┊┃ ❏ ${prefix}velocidad
┊┃ ❏ ${prefix}grupos _(grupos oficiales)_
┊┃ ❏ ${prefix}join _(solicita un bot para tu grupo)_
┊┃ ❏ ${prefix}owner
┊┃ ❏ ${prefix}creador _(contactos de mi creador)_
┊┃ ❏ ${prefix}instalarbot (Tutorial del instalacion)_
┊┃ ❏ ${prefix}solicitud
┊┃ ❏ ${prefix}cuenta 
┊┃ ❏ ${prefix}cuentaoficiales
┊┃ ❏ ${prefix}status 
┊┃ ❏ ${prefix}enable 
┊┃ ❏ ${prefix}configurar
┊┃ ❏ ${prefix}cafirexos
┊┃ ❏ ${prefix}report _(reporta errores)_
┊┗━━━━━━━━━━━━━━•
╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⪩`
conn.sendMessage(m.chat, { text: menu,  
contextInfo:{  
forwardingScore: 9999999,  
isForwarded: true,   
mentionedJid:[sender, numBot],  
"externalAdReply": {  
"showAdAttribution": true,  
"renderLargerThumbnail": true,  
"title": wm,   
"containsAutoReply": true,  
"mediaType": 1,   
"thumbnail": imagen3, 
sourceUrl: tiktok
}}}, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}) 
}

if (command == 'menu1' || command == 'descarga') {
m.react('🚀') 
conn.sendFile(m.chat, imagen2, 'lp.jpg', submenu + descargar, fkontak, false, { contextInfo:{  
forwardingScore: 9999999,  
isForwarded: true,   
mentionedJid:[sender],  
"externalAdReply": {  
"showAdAttribution": true,  
"renderLargerThumbnail": true,  
"title": wm,   
"containsAutoReply": true,  
"mediaType": 1,   
"thumbnail": imagen3, 
sourceUrl: tiktok
}}})}

if (command == 'menu2' || command == 'audio') {

let menu2 = `${lenguaje.menu.text13}\n\na\nfeliz navidad\nMerry Christmas\nFeliz cumpleaños\nPasa pack\nUwu\nSiuuu\nhola\nhello\nVete a la verga\nPasen porno\nHora del sexito\nPongan cuties\nFiesta del admin\nAdmin party\nViernes\nGOOOOD\nAlto temazo\nTodo bien\nBuenos dias\nBot gay\nGracias\nFua\nFino señores\n🧐🍷\nCorte\nGaspi buenos dias\nGaspi me saludas\nGaspi y las minitas\nGaspi todo bien\nGaspi ya no aguanto\nContate algo bot\nSexo\nMomento epico\nEl bot del orto no funciona\nEpicardo\nInsta de la minita\nUna mierda de bot\nUltimo momento\nNefasto\nParaguayo\nBot de mierda\nVenezolano\na nadie le importa\nGaspi corte\nYa me voy a dormir\nCalefon\nApurate bot\nUn chino\nNo funciona\nBoliviano\nEnano\nQuien es tu sempai botsito\nMe gimes 7u7\nTe amo botsito uwu\nOnichan\nLa toca 7w7\nautodestruction\n\n*• Mas Audios agregados por Russell :*\nQue\nque\nquien para jugar\nbr mj jugar\nJuegar\nKien pa jugar\nQuien pa jugar\nquien pa jugar\nte gusta los hombres\nYoce que vez porno gay\nMi amiga es trapito\nTe gusta el yaoi\nTe quiero cortana\nTe amo Cortana\nBroken\nLotex\nBroken vs lotex\nGay\nMaldito\nMal pario\nMmgb\nMmwb\nHijo de puta\nHdp\nCara de verga\nMarico\nMarica\nte Gusta el pito\nHijo de perra\nBuenas Tardes\nBuenas noches\nPene\nfollar\nCojer\nNovio\nNovia\nrico\nsabraso\ntetas\nhermosa\nluuk\nMamate un wuebo\n❥ ${wm}`
conn.sendMessage(m.chat, { text: menu2}, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})}

if (command == 'menu3' || command == 'menugrupos') {
m.react('🔰') 
conn.sendFile(m.chat, imagen2, 'lp.jpg', submenu + grupos, fkontak, false, { contextInfo:{  
forwardingScore: 9999999,  
isForwarded: true,   
mentionedJid:[sender],  
"externalAdReply": {  
"showAdAttribution": true,  
"renderLargerThumbnail": true,  
"title": wm,   
"containsAutoReply": true,  
"mediaType": 1,   
"thumbnail": imagen3, 
sourceUrl: tiktok
}}})}

if (command == 'menu4' || command == 'menubuscadores') {
m.react('🪄') 
conn.sendFile(m.chat, imagen2, 'lp.jpg', submenu + buscadores, fkontak, false, { contextInfo:{  
forwardingScore: 9999999,  
isForwarded: true,   
mentionedJid:[sender],  
"externalAdReply": {  
"showAdAttribution": true,  
"renderLargerThumbnail": true,  
"title": wm,   
"containsAutoReply": true,  
"mediaType": 1,   
"thumbnail": imagen3, 
sourceUrl: tiktok
}}})}

if (command == 'menu5' || command == 'menujuegos') {
m.react('👾') 
conn.sendFile(m.chat, imagen2, 'lp.jpg', submenu + juegos, fkontak, false, { contextInfo:{  
forwardingScore: 9999999,  
isForwarded: true,   
mentionedJid:[sender],  
"externalAdReply": {  
"showAdAttribution": true,  
"renderLargerThumbnail": true,  
"title": wm,   
"containsAutoReply": true,  
"mediaType": 1,   
"thumbnail": imagen3, 
sourceUrl: tiktok
}}})}

if (command == 'menu6' || command == 'menuefecto') {
m.react('🎤') 
conn.sendFile(m.chat, imagen2, 'lp.jpg', submenu + efecto, fkontak, false, { contextInfo:{  
forwardingScore: 9999999,  
isForwarded: true,   
mentionedJid:[sender],  
"externalAdReply": {  
"showAdAttribution": true,  
"renderLargerThumbnail": true,  
"title": wm,   
"containsAutoReply": true,  
"mediaType": 1,   
"thumbnail": imagen3, 
sourceUrl: tiktok
}}})}

if (command == 'menu7' || command == 'menuconvertidores') {
m.react('🧧') 
conn.sendFile(m.chat, imagen2, 'lp.jpg', submenu + convertidores, fkontak, false, { contextInfo:{  
forwardingScore: 9999999,  
isForwarded: true,   
mentionedJid:[sender],  
"externalAdReply": {  
"showAdAttribution": true,  
"renderLargerThumbnail": true,  
"title": wm,   
"containsAutoReply": true,  
"mediaType": 1,   
"thumbnail": imagen3, 
sourceUrl: tiktok
}}})}

if (command == 'menu18' || command == 'Menuhony') {
m.react('🥵') 
conn.sendFile(m.chat, imagen2, 'lp.jpg', submenu + menu18, fkontak, false, { contextInfo:{  
forwardingScore: 9999999,  
isForwarded: true,   
mentionedJid:[sender],  
"externalAdReply": {  
"showAdAttribution": true,  
"renderLargerThumbnail": true,  
"title": wm,   
"containsAutoReply": true,  
"mediaType": 1,   
"thumbnail": imagen3, 
sourceUrl: tiktok
}}})}

if (command == 'menurandow' || command == 'menu8') {
m.react('⛩️') 
conn.sendFile(m.chat, imagen2, 'lp.jpg', submenu + menurandow, fkontak, false, { contextInfo:{  
forwardingScore: 9999999,  
isForwarded: true,   
mentionedJid:[sender],  
"externalAdReply": {  
"showAdAttribution": true,  
"renderLargerThumbnail": true,  
"title": wm,   
"containsAutoReply": true,  
"mediaType": 1,   
"thumbnail": imagen3, 
sourceUrl: tiktok
}}})}

if (command == 'menuRPG' || command == 'menu9') {
m.react('⚒️') 
conn.sendFile(m.chat, imagen2, 'lp.jpg', submenu + menuRPG, fkontak, false, { contextInfo:{  
forwardingScore: 9999999,  
isForwarded: true,   
mentionedJid:[sender],  
"externalAdReply": {  
"showAdAttribution": true,  
"renderLargerThumbnail": true,  
"title": wm,   
"containsAutoReply": true,  
"mediaType": 1,   
"thumbnail": imagen3, 
sourceUrl: tiktok
}}})}

if (command == 'menuSticker' || command == 'menu10') {
m.react('🎈') 
conn.sendFile(m.chat, imagen2, 'lp.jpg', submenu + menuSticker, fkontak, false, { contextInfo:{  
forwardingScore: 9999999,  
isForwarded: true,   
mentionedJid:[sender],  
"externalAdReply": {  
"showAdAttribution": true,  
"renderLargerThumbnail": true,  
"title": wm,   
"containsAutoReply": true,  
"mediaType": 1,   
"thumbnail": imagen3, 
sourceUrl: tiktok
}}})}

if (command == 'menuOwner' || command == 'menu11') {
m.react('👑') 
conn.sendFile(m.chat, imagen2, 'lp.jpg', submenu + menuOwner, fkontak, false, { contextInfo:{  
forwardingScore: 9999999,  
isForwarded: true,   
mentionedJid:[sender],  
"externalAdReply": {  
"showAdAttribution": true,  
"renderLargerThumbnail": true,  
"title": wm,   
"containsAutoReply": true,  
"mediaType": 1,   
"thumbnail": imagen3, 
sourceUrl: tiktok
}}})}

if (command == 'allmenu' || command == 'menucompleto') {
m.react('🙌') 
let menu = `╔══════ ≪ •❈• ≫ ══════╗
║◤━━━━━ ☆. ∆ .☆ ━━━━━◥
║${lenguaje['smsWel']()} @${sender.split("@")[0]} ${user.registered === true ? 'ͧͧͧͦꙶͣͤ✓' : ''} 👋🏻
║◤━━━━━ ☆. ∆ .☆ ━━━━━◥
║${lenguaje.menu.text} [ ${prefix} ]
║${lenguaje.menu.text2} ${date}
║${lenguaje.menu.text3} ${time}
║${lenguaje.menu.text4} ${vs}
║${lenguaje.menu.text5} ${Object.keys(global.db.data.users).length}
║${lenguaje.menu.text6} ${runtime(process.uptime())}
║${lenguaje.menu.text7} ${conn.public ? 'publico' : 'privado'}
║${conn.user.id == global.numBot2 ? `${lenguaje.menu.textt} ` : `${lenguaje.menu.texttt} @${global.numBot.split`@`[0]}`}
║ 
║${lenguaje.menu.text8} ${user.limit}
║${lenguaje.menu.text9} ${user.level}
║${lenguaje.menu.text10} ${user.role}
║❐ ᴇxᴘ : ${user.exp}
║❐ ᴄᴏɪɴs : ${user.money}
║ 
║${lenguaje.menu.text11} ${rtotalreg} de ${totalreg}
║◤━━━━━ ☆. ∆ .☆ ━━━━━◥
╚══════ ≪ •❈• ≫ ══════╝

===============================
${lenguaje.menu.text12}
===============================

*╭─╮─᤻─᳒─᤻᳒᯽⃟ᰳᰬᰶ┈*⃐ℹ️ ＩＮＦＯＢＯＴ*️⃟ᬽ፝֟━*
├❥ᰰຼ ❏ ${prefix}reg _(Registrarte en el bot)_
├❥ᰰຼ ❏ ${prefix}unreg _(borrar su registro)_
├❥ᰰຼ ❏ ${prefix}myns _(numero de serie)_
├❥ᰰຼ ❏ ${prefix}estado _(estado del bot)_
├❥ᰰຼ ❏ ${prefix}menu2
├❥ᰰຼ ❏ ${prefix}audios 
├❥ᰰຼ ❏ ${prefix}nuevo _(nuevo comando)_
├❥ᰰຼ ❏ ${prefix}reglas _(reglas)_
├❥ᰰຼ ❏ ${prefix}ping
├❥ᰰຼ ❏ ${prefix}velocidad
├❥ᰰຼ ❏ ${prefix}grupos _(grupos oficiales)_
├❥ᰰຼ ❏ ${prefix}join _(solicita un bot para tu grupo)_
├❥ᰰຼ ❏ ${prefix}owner
├❥ᰰຼ ❏ ${prefix}creador _(contactos de mi creador)_
├❥ᰰຼ ❏ ${prefix}instalarbot (Tutorial del instalacion)_
├❥ᰰຼ ❏ ${prefix}solicitud
├❥ᰰຼ ❏ ${prefix}cuenta 
├❥ᰰຼ ❏ ${prefix}cuentaoficiales
├❥ᰰຼ ❏ ${prefix}status 
├❥ᰰຼ ❏ ${prefix}cafirexos
├❥ᰰຼ ❏ ${prefix}report _(reporta errores)_
╰┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭۫

*╭─╮─᤻─᳒─᤻᳒᯽⃟ᰳᰬᰶ┈*⃐🤖ＪＡＤＩＢＯＴ*️⃟ᬽ፝֟━*
├• *(Tiene 2 opciónes para hacerte SubBot)*
├┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
├• *Escaneado el QR*
├❥ᰰຼ ❏ ${prefix}serbot
├❥ᰰຼ ❏ ${prefix}qr
├┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
├• *Con codigo de 8 digitos*
├❥ᰰ ❏ ${prefix}serbot --code
├❥ᰰຼ ❏ ${prefix}jadibot --code
├┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
├• *(Comprueba si hay sub bot conectado)*
├❥ᰰຼ ❏ ${prefix}bots 
├┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
├• *(Comando solo para los sub bot)*
├❥ᰰຼ ❏ ${prefix}stop
├❥ᰰຼ ❏ ${prefix}deljadibot
╰┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭۫

*╭─╮─᤻─᳒─᤻᳒᯽⃟ᰳᰬᰶ┈*⃐🔄ＤＥＳＣＡＲＧＡ*️⃟ᬽ፝֟━*
├❥ᰰຼ ❏ ${prefix}play _(descargar música)_
├❥ᰰຼ ❏ ${prefix}play2 _(Descargar video)_
├❥ᰰຼ ❏ ${prefix}play.1 _(descargar música)_
├❥ᰰຼ ❏ ${prefix}play.2 _(descargar video)_
├❥ᰰຼ ❏ ${prefix}musica
├❥ᰰຼ ❏ ${prefix}video
├❥ᰰຼ ❏ ${prefix}playdoc
├❥ᰰຼ ❏ ${prefix}play3 _(Descarga audio en documento)_
├❥ᰰຼ ❏ ${prefix}play4 _(Descarga video en documento)_
├❥ᰰຼ ❏ ${prefix}yts _(Buscador de youtube)_
├❥ᰰຼ ❏ ${prefix}ytmp3 _(link para descargar el audio)_
├❥ᰰຼ ❏ ${prefix}ytmp4 _(link para descargar el video)_
├❥ᰰຼ ❏ ${prefix}spotify
├❥ᰰຼ ❏ ${prefix}music _(Descarga musica de Spotify)_
├❥ᰰຼ ❏ ${prefix}gitclone _(descarga repositorio de GitHub)_
├❥ᰰຼ ❏ ${prefix}tiktok _(descargar video de tiktok)_
├❥ᰰຼ ❏ ${prefix}tiktokimg
├❥ᰰຼ ❏ ${prefix}ttimg _(descarga imagen de tiktok)_
├❥ᰰຼ ❏ ${prefix}igstalk _(nombre de un usuario de ig)_
├❥ᰰຼ ❏ ${prefix}facebook
├❥ᰰຼ ❏ ${prefix}fb _(Descarga videos de Facebook)_
├❥ᰰຼ ❏ ${prefix}instagram
├❥ᰰຼ ❏ ${prefix}ig _(Descarga videos de Instagram)_
├❥ᰰຼ ❏ ${prefix}mediafire _(descarga archivo de mediafire)_
├❥ᰰຼ ❏ ${prefix}gdrive _(Descarga archivos de gdrive)_
*╰┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭۫*

*╭─╮─᤻─᳒─᤻᳒᯽⃟ᰳᰬᰶ┈*🔰⃐ＧＲＵＰＯＳ*️⃟ᬽ፝֟━*
├• Gestionar tu grupo con ${wm}
├┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
├❥ᰰຼ ❏ ${prefix}welcome _(on/off)_
├❥ᰰຼ ❏ ${prefix}antilink _(on/off)_
├❥ᰰຼ ❏ ${prefix}antienlace _(on/off)_
├❥ᰰຼ ❏ ${prefix}antifake _(on/off)_
├❥ᰰຼ ❏ ${prefix}antiarabe _(on/off)_
├❥ᰰຼ ❏ ${prefix}antitoxic _(on/off)_
├❥ᰰຼ ❏ ${prefix}antilink2 _(on/off)_
├❥ᰰຼ ❏ ${prefix}AntiTwiter _(on/off)_
├❥ᰰຼ ❏ ${prefix}antitiktok _(on/off)_
├❥ᰰຼ ❏ ${prefix}AntiTikTok _(on/off)_
├❥ᰰຼ ❏ ${prefix}antitelegram _(on/off)_
├❥ᰰຼ ❏ ${prefix}AntiTelegram _(on/off)_
├❥ᰰຼ ❏ ${prefix}antifacebook _(on/off)_
├❥ᰰຼ ❏ ${prefix}AntiFb _(on/off)_
├❥ᰰຼ ❏ ${prefix}AntiFaceBook _(on/off)_
├❥ᰰຼ ❏ ${prefix}AntInstagram _(on/off)_
├❥ᰰຼ ❏ ${prefix}AntiIg _(on/off)_
├❥ᰰຼ ❏ ${prefix}antiyoutube _(on/off)_
├❥ᰰຼ ❏ ${prefix}AntiYoutube _(on/off)_
├❥ᰰຼ ❏ ${prefix}autosticker _(on/off)_
├❥ᰰຼ ❏ ${prefix}detect _(on/off)_
├❥ᰰຼ ❏ ${prefix}autodetect _(on/off)_
├❥ᰰຼ ❏ ${prefix}antinsfw _(on/off)_
├❥ᰰຼ ❏ ${prefix}modocaliente _(on/off)_
├❥ᰰຼ ❏ ${prefix}autosticker _(on/off)_
├❥ᰰຼ ❏ ${prefix}modoadmin _(on/off)_
├❥ᰰຼ ❏ ${prefix}audios _(on/off)_
├❥ᰰຼ ❏ ${prefix}chatbot _(on/off)_
├❥ᰰຼ ❏ ${prefix}autolevelup _(on/off)_
├❥ᰰຼ ❏ ${prefix}autonivel _(on/off)_
├❥ᰰຼ ❏ ${prefix}kick _(@tag)_
├❥ᰰຼ ❏ ${prefix}add _(@tag)_
├❥ᰰຼ ❏ ${prefix}invita _(@tag)_
├❥ᰰຼ ❏ ${prefix}promote _(@tag)_
├❥ᰰຼ ❏ ${prefix}demote _(@tag)_
├❥ᰰຼ ❏ ${prefix}infogrupo
├❥ᰰຼ ❏ ${prefix}groupinfo
├❥ᰰຼ ❏ ${prefix}admins _(llama a los admins)_
├❥ᰰຼ ❏ ${prefix}grupo close/open 
├❥ᰰຼ ❏ ${prefix}warn _(@tag)_
├❥ᰰຼ ❏ ${prefix}advertencia _(@tag)_
├❥ᰰຼ ❏ ${prefix}unwarn _(@tag)_
├❥ᰰຼ ❏ ${prefix}quitardvertencia _(@tag)_
├❥ᰰຼ ❏ ${prefix}setppname _(cambia el nombre del grupo)_
├❥ᰰຼ ❏ ${prefix}setdesc _(cambia la desc del Grupo)_
├❥ᰰຼ ❏ ${prefix}setppgroup _(cambia la foto del Grupo)_
├❥ᰰຼ ❏ ${prefix}anularlink 
├❥ᰰຼ ❏ ${prefix}resetlink _(restablece el link del grupo)_
├❥ᰰຼ ❏ ${prefix}hidetag _(etiqueta a todos el un mensaje)_
├❥ᰰຼ ❏ ${prefix}tagall 
├❥ᰰຼ ❏ ${prefix}invocar _(etiqueta a todos el una listas)_
├❥ᰰຼ ❏ ${prefix}listonline _(usuarios que esta online)_
*╰┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭۫*

*╭─╮─᤻─᳒─᤻᳒᯽⃟ᰳᰬᰶ┈*🔎⃐ＢＵＳＣＡＤＯＲＥＳ*️⃟ᬽ፝֟━*
├❥ᰰຼ ❏ ${prefix}google _(buscar información con google)_
├❥ᰰຼ ❏ ${prefix}chatgpt
├❥ᰰຼ ❏ ${prefix}ia _(buscar información con la IA)_
├❥ᰰຼ ❏ ${prefix}bard _(buscar información)_
├❥ᰰຼ ❏ ${prefix}imagen _(Imagen en google)_
├❥ᰰຼ ❏ ${prefix}traducir _(Traducir algun texto)_
├❥ᰰຼ ❏ ${prefix}wallpaper _(imagen del wallpaper)_
├❥ᰰຼ ❏ ${prefix}ss _(link)_
├❥ᰰຼ ❏ ${prefix}dall-e
├❥ᰰຼ ❏ ${prefix}ia2 _(Crear imagen con la (IA)_
├❥ᰰຼ ❏ ${prefix}horario
*╰┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭۫*

*╭─╮─᤻─᳒─᤻᳒᯽⃟ᰳᰬᰶ┈*⃐👾ＪＵＥＧＯＳ*️⃟ᬽ፝֟━*
├❥ᰰຼ ❏ ${prefix}simi _(hablar con el bot)_
├❥ᰰຼ ❏ ${prefix}ppt _(piedra, papel, o tijera)_
├❥ᰰຼ ❏ ${prefix}gay @tag
├❥ᰰຼ ❏ ${prefix}pareja @tag
├❥ᰰຼ ❏ ${prefix}love @tag
├❥ᰰຼ ❏ ${prefix}follar @tag
├❥ᰰຼ ❏ ${prefix}topgays
├❥ᰰຼ ❏ ${prefix}topotakus
├❥ᰰຼ ❏ ${prefix}top
├❥ᰰຼ ❏ ${prefix}pregunta
├❥ᰰຼ ❏ ${prefix}verdad
├❥ᰰຼ ❏ ${prefix}reto
├❥ᰰຼ ❏ ${prefix}doxear
├❥ᰰຼ ❏ ${prefix}math
├❥ᰰຼ ❏ ${prefix}matematicas
├❥ᰰຼ ❏ ${prefix}ttt
├❥ᰰຼ ❏ ${prefix}tictactoe
├❥ᰰຼ ❏ ${prefix}ttc
├❥ᰰຼ ❏ ${prefix}delttt
├❥ᰰຼ ❏ ${prefix}personalidad
├❥ᰰຼ ❏ ${prefix}racista
├❥ᰰຼ ❏ ${prefix}slot
├❥ᰰຼ ❏ ${prefix}dado
├❥ᰰຼ ❏ ${prefix}piropo
├❥ᰰຼ ❏ ${prefix}ship
├❥ᰰຼ ❏ ${prefix}formartrio
├❥ᰰຼ ❏ ${prefix}formapareja5
├❥ᰰຼ ❏ ${prefix}ruletas
├❥ᰰຼ ❏ ${prefix}suerte
├❥ᰰຼ ❏ ${prefix}txt _(texto)_
├❥ᰰຼ ❏ ${prefix}fake _(texto + tag)_
*╰┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭۫*

*╭─╮─᤻─᳒─᤻᳒᯽⃟ᰳᰬᰶ┈*🎤 EFECTOS DE AUDIOS*️⃟ᬽ፝֟━*
├❥ᰰຼ *(𝚁𝙴𝚂𝙿𝙾𝙽𝙳𝙴 𝙰 𝙰𝚄𝙳𝙸𝙾 𝙾 𝙽𝙾𝚃𝙰 𝙳𝙴 𝚅𝙾𝚉)*
├ *✧･ﾟ: *✧･ﾟ:*✧･ﾟ: *✧･ﾟ:*✧･ﾟ: *✧･ﾟ:
├❥ᰰຼ ❏ ${prefix}bass
├❥ᰰຼ ❏ ${prefix}blown
├❥ᰰຼ ❏ ${prefix}deep
├❥ᰰຼ ❏ ${prefix}earrape
├❥ᰰຼ ❏ ${prefix}fast
├❥ᰰຼ ❏ ${prefix}fat
├❥ᰰຼ ❏ ${prefix}nightcore
├❥ᰰຼ ❏ ${prefix}reverse
├❥ᰰຼ ❏ ${prefix}robot
├❥ᰰຼ ❏ ${prefix}slow
├❥ᰰຼ ❏ ${prefix}smooth
├❥ᰰຼ ❏ ${prefix}squirrel
*╰┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭۫*

*╭─╮─᤻─᳒─᤻᳒᯽⃟ᰳᰬᰶ┈*⃐🧧CONVERTIDORES*️⃟ᬽ፝֟━*
├❥ᰰຼ ❏ ${prefix}tourl
├❥ᰰຼ ❏ ${prefix}tts
├❥ᰰຼ ❏ ${prefix}tomp3
├❥ᰰຼ ❏ ${prefix}toimg
├❥ᰰຼ ❏ ${prefix}toaudio
├❥ᰰຼ ❏ ${prefix}toanime
├❥ᰰຼ ❏ ${prefix}hd
*╰┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭۫* 	

*╭─╮─᤻─᳒─᤻᳒᯽⃟ᰳᰬᰶ┈*⃐🥵COMANDO +18*️⃟ᬽ፝֟━*
├❥ᰰຼ  *Activa con (antiNsfw on)*
├ *✧･ﾟ: *✧･ﾟ:*✧･ﾟ: *✧･ﾟ:*✧･ﾟ: *✧･ﾟ:
├❥ᰰຼ ❏ ${prefix}pussy
├❥ᰰຼ ❏ ${prefix}nsfwloli
├❥ᰰຼ ❏ ${prefix}hentai
├❥ᰰຼ ❏ ${prefix}hentai2
├❥ᰰຼ ❏ ${prefix}pack
├❥ᰰຼ ❏ ${prefix}pack2
├❥ᰰຼ ❏ ${prefix}pack3
├❥ᰰຼ ❏ ${prefix}videoxxx
├❥ᰰຼ ❏ ${prefix}videoxxxlesbi
├❥ᰰຼ ❏ ${prefix}pornolesbianavid
├❥ᰰຼ ❏ ${prefix}videolesbixxx
├❥ᰰຼ ❏ ${prefix}porno
├❥ᰰຼ ❏ ${prefix}lewd
├❥ᰰຼ ❏ ${prefix}feed
├❥ᰰຼ ❏ ${prefix}gasm
├❥ᰰຼ ❏ ${prefix}anal	    	
├❥ᰰຼ ❏ ${prefix}holo	    	
├❥ᰰຼ ❏ ${prefix}tits	    	
├❥ᰰຼ ❏ ${prefix}kuni
├❥ᰰຼ ❏ ${prefix}kiss
├❥ᰰຼ ❏ ${prefix}erok
├❥ᰰຼ ❏ ${prefix}smug
├❥ᰰຼ ❏ ${prefix}solog
├❥ᰰຼ ❏ ${prefix}feetg
├❥ᰰຼ ❏ ${prefix}lewdk    
├❥ᰰຼ ❏ ${prefix}femdom
├❥ᰰຼ ❏ ${prefix}cuddle
├❥ᰰຼ ❏ ${prefix}eroyuri
├❥ᰰຼ ❏ ${prefix}cum	    
├❥ᰰຼ ❏ ${prefix}blowjob
├❥ᰰຼ ❏ ${prefix}holoero
├❥ᰰຼ ❏ ${prefix}erokemo
├❥ᰰຼ ❏ ${prefix}fox_girl
├❥ᰰຼ ❏ ${prefix}futanari
├❥ᰰຼ ❏ ${prefix}wallpaper	   
├❥ᰰຼ *Nota: usarlo baja tu responsabilidad*
*╰┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭۫* 	
	
╭─╮─᤻─᳒─᤻᳒᯽⃟ᰳᰬᰶ┈*⛩️ ⃐RANDOW*️⃟ᬽ፝֟━*
├❥ᰰຼ ❏ ${prefix}memes
├❥ᰰຼ ❏ ${prefix}horny
├❥ᰰຼ ❏ ${prefix}simp
├❥ᰰຼ ❏ ${prefix}lolice
├❥ᰰຼ ❏ ${prefix}comentar
├❥ᰰຼ ❏ ${prefix}comment
├❥ᰰຼ ❏ ${prefix}loli
├❥ᰰຼ ❏ ${prefix}lolivid
├❥ᰰຼ ❏ ${prefix}neko
├❥ᰰຼ ❏ ${prefix}waifu	
├❥ᰰຼ ❏ ${prefix}blackpink
├❥ᰰຼ ❏ ${prefix}navidad
├❥ᰰຼ ❏ ${prefix}akira
├❥ᰰຼ ❏ ${prefix}akiyama
├❥ᰰຼ ❏ ${prefix}anna
├❥ᰰຼ ❏ ${prefix}asuna
├❥ᰰຼ ❏ ${prefix}ayuzawa
├❥ᰰຼ ❏ ${prefix}boruto
├❥ᰰຼ ❏ ${prefix}chiho
├❥ᰰຼ ❏ ${prefix}chitoge
├❥ᰰຼ ❏ ${prefix}deidara
├❥ᰰຼ ❏ ${prefix}erza
├❥ᰰຼ ❏ ${prefix}elaina
├❥ᰰຼ ❏ ${prefix}eba
├❥ᰰຼ ❏ ${prefix}emilia
├❥ᰰຼ ❏ ${prefix}hestia
├❥ᰰຼ ❏ ${prefix}hinata
├❥ᰰຼ ❏ ${prefix}inori
├❥ᰰຼ ❏ ${prefix}isuzu
├❥ᰰຼ ❏ ${prefix}itachi
├❥ᰰຼ ❏ ${prefix}itori
├❥ᰰຼ ❏ ${prefix}kaga
├❥ᰰຼ ❏ ${prefix}kagura
├❥ᰰຼ ❏ ${prefix}kaori':
├❥ᰰຼ ❏ ${prefix}keneki
├❥ᰰຼ ❏ ${prefix}kotori
├❥ᰰຼ ❏ ${prefix}kurumi
├❥ᰰຼ ❏ ${prefix}madara
├❥ᰰຼ ❏ ${prefix}mikasa
├❥ᰰຼ ❏ ${prefix}miku
├❥ᰰຼ ❏ ${prefix}minato
├❥ᰰຼ ❏ ${prefix}naruto
├❥ᰰຼ ❏ ${prefix}nezuko
├❥ᰰຼ ❏ ${prefix}sagiri
├❥ᰰຼ ❏ ${prefix}sasuke
├❥ᰰຼ ❏ ${prefix}sakura
├❥ᰰຼ ❏ ${prefix}'cosplay
*╰┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭۫*
             
*╭─╮─᤻─᳒─᤻᳒᯽⃟ᰳᰬᰶ┈*⃐🪙 ＥＣＯＮＯＭＩＡ*️⃟ᬽ፝֟━*
├❥ᰰຼ ❏ ${prefix}minar _(Para minar exp)_
├❥ᰰຼ ❏ ${prefix}robar
├❥ᰰຼ ❏ ${prefix}rob _(Roba exp algun usuarios)_
├❥ᰰຼ ❏ ${prefix}crime
├❥ᰰຼ ❏ ${prefix}trabajar
├❥ᰰຼ ❏ ${prefix}work _(Trabaja y ganas exp)_
├❥ᰰຼ ❏ ${prefix}buy _(Comprar mas diamantes (limit)_
├❥ᰰຼ ❏ ${prefix}bal
├❥ᰰຼ ❏ ${prefix}balace _(diamante/exp tenés)_
├❥ᰰຼ ❏ ${prefix}claim
├❥ᰰຼ _(Recoger tu recompensa)_
├❥ᰰຼ ❏ ${prefix}lb
├❥ᰰຼ ❏ ${prefix}leaderboard
├❥ᰰຼ ❏ ${prefix}cofre
├❥ᰰຼ ❏ ${prefix}perfil
├❥ᰰຼ ❏ ${prefix}nivel
├❥ᰰຼ ❏ ${prefix}levelup
├❥ᰰຼ ❏ ${prefix}transferir
├❥ᰰຼ ❏ ${prefix}transfer
├❥ᰰຼ ❏ ${prefix}afk 
*╰┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭۫*

*╭─╮─᤻─᳒─᤻᳒᯽⃟ᰳᰬᰶ┈*⃐👽ＳＴＩＣＫＥＲ*️⃟ᬽ፝֟━*
├❥ *(Crear sticker desde whatsapp con ${wm})*
├ *✧･ﾟ: *✧･ﾟ:*✧･ﾟ: *✧･ﾟ:*✧･ﾟ: *✧･ﾟ:
├❥ᰰຼ ❏ ${prefix}s
├❥ᰰຼ ❏ ${prefix}sticker 
├❥ᰰຼ ❏ ${prefix}wm
├❥ᰰຼ ❏ ${prefix}attp
├❥ᰰຼ ❏ ${prefix}qc
├❥ᰰຼ ❏ ${prefix}emojimix
*╰┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭۫*

*╭─╮─᤻─᳒─᤻᳒᯽⃟ᰳᰬᰶ┈*⃐👑ＯＷＮＥＲ*️⃟ᬽ፝֟━*
├❥ _(Comando exclusivo para propietario/owner del bot)_
├ *✧･ﾟ: *✧･ﾟ:*✧･ﾟ: *✧･ﾟ:*✧･ﾟ: *✧･ﾟ:
├❥ᰰຼ ❏ ${prefix}anticall _(on/off)_
├❥ᰰຼ ❏ ${prefix}antillamada _(on/off)_
├❥ᰰຼ ❏ ${prefix}antipv _(on/off)_
├❥ᰰຼ ❏ ${prefix}antiprivado _(on/off)_
├❥ᰰຼ ❏ ${prefix}autoread _(on/off)_
├❥ᰰຼ ❏ ${prefix}modojadibot _(on/off)_
├❥ᰰຼ ❏ ${prefix}añadirdiamantes _(@tag)_
├❥ᰰຼ ❏ ${prefix}addlimit _(@tag)_
├❥ᰰຼ ❏ ${prefix}dardiamantes _(@tag)_
├❥ᰰຼ ❏ ${prefix}añadirxp _(@tag)_
├❥ᰰຼ ❏ ${prefix}addxp _(@tag)_
├❥ᰰຼ ❏ ${prefix}banuser _(@tag)_
├❥ᰰຼ ❏ ${prefix}unbanuser _(@tag)_
├❥ᰰຼ ❏ ${prefix}autoadmin 
├❥ᰰຼ ❏ ${prefix}nuevonombre
├❥ᰰຼ ❏ ${prefix}botname _(cambiar el name del bot)_
├❥ᰰຼ ❏ ${prefix}nuevafoto
├❥ᰰຼ ❏ ${prefix}seppbot
├❥ᰰຼ ❏ ${prefix}fotobot _(cambiar la foto del bot)_
├❥ᰰຼ ❏ ${prefix}bc (Difusión a todos los chat)
├❥ᰰຼ ❏ ${prefix}bcgc (Difusión solo a grupos)
├❥ᰰຼ ❏ ${prefix}setpp (Cambia la foto del bot) 
├❥ᰰຼ ❏ ${prefix}public (Modo público) 
├❥ᰰຼ ❏ ${prefix}privado (Modo privado) 
├❥ᰰຼ ❏ ${prefix}getcase
├❥ᰰຼ ❏ ${prefix}fetch
├❥ᰰຼ ❏ ${prefix}update
├❥ᰰຼ ❏ ${prefix}restart 
├❥ᰰຼ ❏ ${prefix}reiniciar
├❥ᰰຼ ❏ $ 
├❥ᰰຼ ❏ >
├❥ᰰຼ ❏ => 
*╰┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭۫*`
conn.sendMessage(m.chat, { text: menu,  
contextInfo:{  
forwardingScore: 9999999,  
isForwarded: true,   
mentionedJid:[sender, numBot],  
"externalAdReply": {  
"showAdAttribution": true,  
"renderLargerThumbnail": true,  
"title": wm,   
"containsAutoReply": true,  
"mediaType": 1,   
"thumbnail": imagen2,  
sourceUrl: tiktok
}}}, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}) 
}

if (command == 'nuevo' || command == 'extreno') {
conn.sendMessage(m.chat, { text: lenguaje.menu.text15(vs), contextInfo:{mentions: [sender], forwardingScore: 9999999, isForwarded: true, "externalAdReply": {"showAdAttribution": true, "containsAutoReply": true, "title": ` ${wm}`, "body": ` ${vs}`, "previewType": "PHOTO", thumbnail: imagen4, sourceUrl: `${pickRandom([nna, nn2, tiktok])}`}}}, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})}

if (command == 'reglas') {
conn.sendMessage(m.chat, { text: lenguaje.menu.text16, contextInfo:{mentions: [sender], forwardingScore: 9999999, isForwarded: true, "externalAdReply": {"showAdAttribution": true, "containsAutoReply": true, "title": ` ${wm}`, "body": ` ${vs}`, "previewType": "PHOTO", thumbnail: imagen3, sourceUrl: `${pickRandom([nna, nn2, tiktok])}`}}}, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})}}

module.exports = { menu }

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})
