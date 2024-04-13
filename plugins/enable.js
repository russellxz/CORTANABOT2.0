require('../main.js') 
const fs = require("fs") 
const path = require("path")
const chalk = require("chalk");
const { smsg, getGroupAdmins, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, delay, format, logic, generateProfilePicture, parseMention, getRandom} = require('../libs/fuctions.js'); 

async function enable(m, command, isGroupAdmins, text, command, args, isBotAdmins, isGroupAdmins, isCreator) {
if (global.db.data.users[m.sender].registered < true) return  conn.sendMessage(m.chat, {video: {url: verificar}, caption: info.registra}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
if (command == 'enable' || command == 'configuracion' || command == 'configurar') {
const {welcome, antilink, antiFake, antiArabe, detect, autosticker, antiNsfw, modeadmin, chatbot, audios, autolevelup, antitoxic, antiprivado, anticall, antilink2, AntiTiktok, AntiTelegram, AntiFacebook, AntInstagram, AntiYoutube, AntiTwitter, viewonce, autoread} = global.db.data.chats[m.chat];
m.reply(`\`⧼⧼⧼ ＣＯＮＦＩＧＵＲＡＣＩＯ́Ｎ ⧽⧽⧽\`

> ✅ Funcion activar 
> ❌ Función desactivada 

       \`『 FUNCIÓN PARA ADMINS  』\`
       
* ${prefix}welcome on ${welcome ? '✅' : '❌'}
> ᴰᵉˢᶜ : ᵈᵃʳ ˡᵃ ᵇᶦᵉⁿᵛᵉⁿᶦᵈᵃ ᵃ ˡᵒˢ ⁿᵘᵉᵛᵒ ᵐᶦᵉᵐᵇʳᵒˢ

* ${prefix}antilink on ${antilink ? '✅' : '❌'}
> ᵈᵉˢᶜ : ᵉˣᵖᵘˡˢᵃ ᵃ ˡᵒˢ ᵠᵘᵉ ᵐᵃⁿᵈᵃ ˡᶦⁿᵏˢ ᵈᵉ́ ᵒᵗʳᵒˢ ᵍʳᵘᵖᵒˢ

* ${prefix}antilink2 on ${antilink2 ? '✅' : '❌'}
> ❍ ᴰᵉˢᶜ : ᵉˣᵖᵘˡˢᵃ ᵃ ˡᵒˢ ᵠᵘᵉ ᵐᵃⁿᵈᵉ ᶜᵘᵃˡᵠᵘᶦᵉʳ ˡᶦⁿᵏ ᵠᵘᵉ ᶜᵒⁿᵗᵉⁿᵍᵃⁿ https/

* ${prefix}AntiTiktok on ${AntiTiktok ? '✅' : '❌'}
> ᵈᵉˢᶜ : ᵉˣᵖᵘˡˢᵃ ᵃ ˡᵒˢ ᵠᵘᵉ ᵐᵃⁿᵈᵉ ᵃˡᵍᵘⁿ ˡᶦⁿᵏ ᵈᵉ ᵀᶦᵏᵀᵒᵏ

* ${prefix}AntiTelegram on ${AntiTelegram ? '✅' : '❌'}
> ᵈᵉˢᶜ : ᵉˣᵖᵘˡˢᵃ ᵃ ˡᵒˢ ᵠᵘᵉ ᵐᵃⁿᵈᵉ ᵃˡᵍᵘⁿ ˡᶦⁿᵏ ᵈᵉ ᵀᵉˡᵉᵍʳᵃᵐ

* ${prefix}AntiFacebook on ${AntiFacebook ? '✅' : '❌'}
> ᴰᵉˢᶜ : ᵉˣᵖᵘˡˢᵃ ᵃ ˡᵒˢ ᵠᵘᵉ ᵐᵃⁿᵈᵉ ᵃˡᵍᵘⁿ ˡᶦⁿᵏ ᵈᵉ ᶠᵃᶜᵉᵇᵒᵒᵏ

* ${prefix}AntInstagram on ${AntInstagram ? '✅' : '❌'}
> ᵈᵉˢᶜ : ᵉˣᵖᵘˡˢᵃ ᵃ ˡᵒˢ ᵠᵘᵉ ᵐᵃⁿᵈᵉ ᵃˡᵍᵘⁿ ˡᶦⁿᵏ ᵈᵉ ᴵⁿˢᵗᵃᵍʳᵃᵐ

* ${prefix}AntiYoutube on ${AntiYoutube ? '✅' : '❌'}
> ᵈᵉˢᶜ : ᵉˣᵖᵘˡˢᵃ ᵃ ˡᵒˢ ᵠᵘᵉ ᵐᵃⁿᵈᵉ ᵃˡᵍᵘⁿ ˡᶦⁿᵏ ᵈᵉ ʸᵒᵘᵀᵘᵇᵉ

* ${prefix}AntiTwiter on ${AntiTwitter ? '✅' : '❌'}
> ᵈᵉˢᶜ : ᵉˣᵖᵘˡˢᵃ ᵃ ˡᵒˢ ᵠᵘᵉ ᵐᵃⁿᵈᵉ ᵃˡᵍᵘⁿ ˡᶦⁿᵏ ᵈᵉ ᵀʷᶦᵗᵉʳ

* ${prefix}antifake on ${antiFake ? '✅' : '❌'}
> ᵈᵉˢᶜ : ᶦⁿᵍʳᵉˢᵒ ᵈᵉ ⁿᵘᵐᵉʳᵒ ᶠᵃᵏᵉ (ᵛᶦʳᵗᵘᵃˡᵉˢ), ˢᵉʳᵃⁿ ᵉˣᵖˡᵘˢᵃᵈᵒ ᵃᵘᵗᵒᵐᵃ́ᵗᶦᶜᵃᵐᵉⁿᵗᵉ ᵈᵉˡ ᴳʳᵘᵖᵒ...

* ${prefix}antiarabe on ${antiArabe ? '✅' : '❌'}
> ᵈᵉˢᶜ : ᶦⁿᵍʳᵉˢᵒ ᵈᵉ ⁿᵘᵐᵉʳᵒ ᵃʳᵃᵇᵉ (+212, +91, +92, ᵉᵗᶜ), ˢᵉʳᵃⁿ ᵉˣᵖˡᵘˢᵃᵈᵒ ᵃᵘᵗᵒᵐᵃ́ᵗᶦᶜᵃᵐᵉⁿᵗᵉ ᵈᵉˡ ᴳʳᵘᵖᵒ...

* ${prefix}antitoxic on ${antitoxic ? '✅' : '❌'}
> ᵈᵉˢᶜ : ᴰᵉᵗᵉᶜᵗᵃ ˡᵃ ᵐᵃˡᵃˢ ᵖᵃˡᵃᵇʳᵃˢ ʸ ᵃᵈᵛᶦᵉʳᵗᵉ ᵃˡ ᵖᵃʳᵗᶦᶜᶦᵖᵃⁿᵗᵉ del ᵍʳᵘᵖᵒ, ᵃⁿᵗᵉˢ ᵈᵉ ˢᵉʳ ᵉˡᶦᵐᶦⁿᵃᵈᵒ.

* ${prefix}detect on ${detect ? '✅' : '❌'}
> ᵈᵉˢᶜ : ᵈᵉᵗᵉᶜᵗᵃʳ ⁿᵒᵗᶦᶠᶦᶜᵃᶜᶦᵒⁿᵉˢ ᵈᵉ ᵃᵛᶦˢᵒ ᵉˡ ᵍʳᵘᵖᵒ. 

* ${prefix}autostickers on ${autosticker ? '✅' : '❌'}
> ᵈᵉˢᶜ : ᶜʳᵉᵃʳ ˢᵗᶦᶜᵏᵉʳˢ ᵈᵉ ᵐᵃⁿᵉʳᵃ ᵃᵘᵗᵒᵐᵃ́ᵗᶦᶜᵃ ˢᶦⁿ ᵖᵒⁿᵉʳ ⁿᶦⁿᵍᵘⁿ ᵖʳᵉᶠᶦʲᵒ ˢᵒˡᵒ ᵉⁿᵛᶦᵃʳ ˡᵃ ᶦᵐᵃᵍᵉⁿ/ᵛᶦᵈᵉᵒ.

* ${prefix}modocaliente on ${antiNsfw ? '✅' : '❌'}
> ᵈᵉˢᶜ : ᵃᶜᵗᶦᵛᵃʳ ˡᵒˢ ᶜᵒⁿᵗᵉⁿᶦᵈᵒˢ +18 

* ${prefix}audios on ${audios ? '✅' : '❌'}
> ᵈᵉˢᶜ : ᴬᶜᵗᶦᵛᵃʳ ˡᵒˢ ᵃᵘᵈᶦᵒˢ ᵃᵘᵗᵒᵐᵃ́ᵗᶦᶜᵒ. 

* ${prefix}autolevelup on ${autolevelup ? '✅' : '❌'}
> ᵈᵉˢᶜ : ᵃᶜᵗᶦᵛᵃʳ ᵖᵃʳᵃ ˢᵘᵇᶦʳ ᵈᵉ ⁿᶦᵛᵉˡ ᵃᵘᵗᵒᵐᵃ́ᵗᶦᶜᵃᵐᵉⁿᵗᵉ. 

* ${prefix}chatbot on ${chatbot ? '✅' : '❌'}
> ᵈᵉˢᶜ : ᴱˡ ᵇᵒᵗ ᵉᵐᵖᵉᶻᵃʳ ᵃ ʰᵃᵇˡᵃʳ ᶜᵒⁿ ᵗᵒᵈᵒˢ ᵉˡ ᵍʳᵘᵖᵒ. 

* ${prefix}antiviewonce on ${viewonce ? '✅' : '❌'}
> ᵈᵉˢᶜ: ᵖᵉʳᵐᶦᵗᵉ ᵠᵘᵉ ˡᵒˢ ᵘˢᵘᵃʳᶦᵒ ⁿᵒ ᵒᶜᵘˡᵗᵉʳ ᶠᵒᵗᵒ/ᵛᶦᵈᵉᵒ ᵉⁿ ᵛᶦᵉʷᵒⁿᶜᵉ 

* ${prefix}modoadmins on ${modeadmin ? '✅' : '❌'}
> ᵈᵉˢᶜ : ᵉˡ ᵇᵒᵗ ˢᵒˡᵒ ᶠᵘⁿᶜᶦᵒⁿᵃ ᵖᵃʳᵃ ˡᵒˢ ᵃᵈᵐᶦⁿˢ ᵈᵉˡ ᴳʳᵘᵖᵒ.

       \`『 FUNCIÓN SOLO PARA OWNER 』\`
* ${prefix}antiprivado on ${antiprivado ? '✅' : '❌'}
> ᵈᵉˢᶜ : ᴱˡ ᵇᵒᵗ ᵇˡᵒᵠᵘᵉʳᵃ́ ᵃ ᵗᵒᵈᵒˢ ˡᵒˢ ᵠᵘᵉ ᵘˢᵉⁿ ᶜᵒᵐᵃⁿᵈᵒ ᵉˡ ᵖʳᶦᵛᵃᵈᵒ. 

* ${prefix}anticall on ${anticall ? '✅' : '❌'}
> ᵈᵉˢᶜ : ᴱˡ ᴮᵒᵗ ᵇˡᵒᵠᵘᵉʳᵃ́ ᵃ ˡᵃˢ ᵖᵉʳˢᵒⁿᵃˢ ᵠᵘᵉ ˡˡᵃᵐᵉⁿ ᵃˡ ᴮᵒᵗ. 

* ${prefix}autoread on ${autoread ? '✅' : '❌'}
> ᵈᵉˢᶜ : ᴹᵃʳᶜᵃ ᶜᵒᵐᵒ ˡᵉᶦᵈᵒ ˡᵒˢ ᵐᵉⁿˢᵃʲᵉˢ ʸ ˡᵒˢ ᵉˢᵗᵃᵈᵒˢ ᵃᵘᵗᵒᵐᵃ́ᵗᶦᶜᵃᵐᵉⁿᵗᵉ.\n\n${botname}`)}

if (command == 'welcome' || command == 'bienvenida') {
if (!m.isGroup) return m.reply(info.group)
if (!isGroupAdmins) return m.reply(info.admin)
if (!text) return m.reply(`${lenguaje.enable.text}\n\n*• ${prefix + command} on*\n*• ${prefix + command} off*`)
if (args[0] === "on") {
global.db.data.chats[m.chat].welcome = true
m.reply(`✅ *${command}* ${lenguaje.enable.text1}`)
} else if (args[0] === "off") {
global.db.data.chats[m.chat].welcome = false
m.reply(`🟢 *${command}* ${lenguaje.enable.text2}`)}}

if (command == 'antilink' || command == 'antienlace') {
if (!m.isGroup) return m.reply(info.group)
if (!isBotAdmins) return m.reply(info.botAdmin)
if (!isGroupAdmins) return m.reply(info.admin)
if (!text) return m.reply(`${lenguaje.enable.text}\n\n*• ${prefix + command} on*\n*• ${prefix + command} off*`)
if (args[0] === "on") {
global.db.data.chats[m.chat].antilink = true
m.reply(lenguaje.enable.text3)
} else if (args[0] === "off") {
global.db.data.chats[m.chat].antilink = false
m.reply(`🟢 *${command}* ${lenguaje.enable.text2}`)}}

if (command == 'antilink2') {
if (!m.isGroup) return m.reply(info.group)
if (!isBotAdmins) return m.reply(info.botAdmin)
if (!isGroupAdmins) return m.reply(info.admin)
if (!text) return m.reply(`${lenguaje.enable.text}\n\n*• ${prefix + command} on*\n*• ${prefix + command} off*`)
if (args[0] === "on") {
global.db.data.chats[m.chat].antiLink2 = true
m.reply(lenguaje.enable.text3)
} else if (args[0] === "off") {
global.db.data.chats[m.chat].antiLink2 = false
m.reply(`🟢 *${command}* ${lenguaje.enable.text2}`)}}

if (command == 'antitwiter' || command == 'AntiTwiter') {
if (!m.isGroup) return m.reply(info.group)
if (!isBotAdmins) return m.reply(info.botAdmin)
if (!isGroupAdmins) return m.reply(info.admin)
if (!text) return m.reply(`${lenguaje.enable.text}\n\n*• ${prefix + command} on*\n*• ${prefix + command} off*`)
if (args[0] === "on") {
global.db.data.chats[m.chat].AntiTwitter = true
m.reply(`✅ *${command}* ${lenguaje.enable.text1}`)
} else if (args[0] === "off") {
global.db.data.chats[m.chat].AntiTwitter = false
m.reply(`🟢 *${command}* ${lenguaje.enable.text2}`)}}

if (command == 'antitiktok' || command == 'AntiTikTok') {
if (!m.isGroup) return m.reply(info.group)
if (!isBotAdmins) return m.reply(info.botAdmin)
if (!isGroupAdmins) return m.reply(info.admin)
if (!text) return m.reply(`${lenguaje.enable.text}\n\n*• ${prefix + command} on*\n*• ${prefix + command} off*`)
if (args[0] === "on") {
global.db.data.chats[m.chat].AntiTiktok = true
m.reply(`✅ *${command}* ${lenguaje.enable.text1}`)
} else if (args[0] === "off") {
global.db.data.chats[m.chat].AntiTiktok = false
m.reply(`🟢 *${command}* ${lenguaje.enable.text2}`)}}

if (command == 'antitelegram' || command == 'AntiTelegram') {
if (!m.isGroup) return m.reply(info.group)
if (!isBotAdmins) return m.reply(info.botAdmin)
if (!isGroupAdmins) return m.reply(info.admin)
if (!text) return m.reply(`${lenguaje.enable.text}\n\n*• ${prefix + command} on*\n*• ${prefix + command} off*`)
if (args[0] === "on") {
global.db.data.chats[m.chat].AntiTelegram = true
m.reply(`✅ *${command}* ${lenguaje.enable.text1}`)
} else if (args[0] === "off") {
global.db.data.chats[m.chat].AntiTelegram = false
m.reply(`🟢 *${command}* ${lenguaje.enable.text2}`)}}

if (command == 'antifacebook' || command == 'AntiFacebook' || command == 'AntiFb') {
if (!m.isGroup) return m.reply(info.group)
if (!isBotAdmins) return m.reply(info.botAdmin)
if (!isGroupAdmins) return m.reply(info.admin)
if (!text) return m.reply(`${lenguaje.enable.text}\n\n*• ${prefix + command} on*\n*• ${prefix + command} off*`)
if (args[0] === "on") {
global.db.data.chats[m.chat].AntiFacebook = true
m.reply(`✅ *${command}* ${lenguaje.enable.text1}`)
} else if (args[0] === "off") {
global.db.data.chats[m.chat].AntiFacebook = false
m.reply(`🟢 *${command}* ${lenguaje.enable.text2}`)}}

if (command == 'antinstagram' || command == 'AntInstagram' || command == 'AntiIg') {
if (!m.isGroup) return m.reply(info.group)
if (!isBotAdmins) return m.reply(info.botAdmin)
if (!isGroupAdmins) return m.reply(info.admin)
if (!text) return m.reply(`${lenguaje.enable.text}\n\n*• ${prefix + command} on*\n*• ${prefix + command} off*`)
if (args[0] === "on") {
global.db.data.chats[m.chat].AntInstagram = true
m.reply(`✅ *${command}* ${lenguaje.enable.text1}`)
} else if (args[0] === "off") {
global.db.data.chats[m.chat].AntInstagram = false
m.reply(`🟢 *${command}* ${lenguaje.enable.text2}`)}}

if (command == 'antiyoutube' || command == 'AntiYoutube') {
if (!m.isGroup) return m.reply(info.group)
if (!isBotAdmins) return m.reply(info.botAdmin)
if (!isGroupAdmins) return m.reply(info.admin)
if (!text) return m.reply(`${lenguaje.enable.text}\n\n*• ${prefix + command} on*\n*• ${prefix + command} off*`)
if (args[0] === "on") {
global.db.data.chats[m.chat].AntiYoutube = true
m.reply(`✅ *${command}* ${lenguaje.enable.text1}`)
} else if (args[0] === "off") {
global.db.data.chats[m.chat].AntiYoutube = false
m.reply(`🟢 *${command}* ${lenguaje.enable.text2}`)}}

if (command == 'antifake' || command == 'antiFake') {
if (!m.isGroup) return m.reply(info.group)
if (!isBotAdmins) return m.reply(info.botAdmin)
if (!isGroupAdmins) return m.reply(info.admin)
if (!text) return m.reply(`${lenguaje.enable.text}\n\n*• ${prefix + command} on*\n*• ${prefix + command} off*`)
if (args[0] === "on") {
global.db.data.chats[m.chat].antiFake = true
m.reply(`✅ *${command}* ${lenguaje.enable.text1}`)
//m.reply(`*Atención a todos los miembros activos de este grupo 📣*\n\n*El ${command} esta activo*\n\n⚠️ *Los cual el grupo no esta permitido ingreso de numero fake (virtuales), seran explusado automáticamente del Grupo...*`)
} else if (args[0] === "off") {
global.db.data.chats[m.chat].antiFake = false
m.reply(`🟢 *${command}* ${lenguaje.enable.text2}`)}}

if (command == 'antiarabe' || command == 'antiArabe') {
if (!m.isGroup) return m.reply(info.group)
if (!isBotAdmins) return m.reply(info.botAdmin)
if (!isGroupAdmins) return m.reply(info.admin)
if (!text) return m.reply(`${lenguaje.enable.text}\n\n*• ${prefix + command} on*\n*• ${prefix + command} off*`)
if (args[0] === "on") {
global.db.data.chats[m.chat].antiArabe = true
m.reply(`✅ *${command}* ${lenguaje.enable.text1}`)
//m.reply(`*Atención a todos los miembros activos de este grupo 📣*\n\n*El ${command} esta activo*\n\n⚠️ *Los cual el grupo no esta permitido ingreso de numero arabe (+212, +91, +92, etc), seran explusado automáticamente del Grupo...*`)
} else if (args[0] === "off") {
global.db.data.chats[m.chat].antiArabe = false
m.reply(`🟢 *${command}* ${lenguaje.enable.text2}`)}}

if (command == 'antiviewonce') {
if (!m.isGroup) return m.reply(info.group)
if (!isBotAdmins) return m.reply(info.botAdmin)
if (!isGroupAdmins) return m.reply(info.admin)
if (!text) return m.reply(`${lenguaje.enable.text}\n\n*• ${prefix + command} on*\n*• ${prefix + command} off*`)
if (args[0] === "on") {
global.db.data.chats[m.chat].viewonce = true
m.reply(`✅ *${command}* ${lenguaje.enable.text1}`)
} else if (args[0] === "off") {
global.db.data.chats[m.chat].viewonce = false
m.reply(`🟢 *${command}* ${lenguaje.enable.text2}`)}}

if (command == 'antitoxic') {
if (!m.isGroup) return m.reply(info.group)
if (!isBotAdmins) return m.reply(info.botAdmin)
if (!isGroupAdmins) return m.reply(info.admin)
if (!text) return m.reply(`${lenguaje.enable.text}\n\n*• ${prefix + command} on*\n*• ${prefix + command} off*`)
if (args[0] === "on") {
global.db.data.chats[m.chat].antitoxic = true
m.reply(`✅ *${command}* ${lenguaje.enable.text1}`)
} else if (args[0] === "off") {
global.db.data.chats[m.chat].antitoxic = false
m.reply(`🟢 *${command}* ${lenguaje.enable.text2}`)}}

if (command == 'game2') {
if (!m.isGroup) return m.reply(info.group)
if (!isGroupAdmins) return m.reply(info.admin)
if (!text) return m.reply(`${lenguaje.enable.text}\n\n*• ${prefix + command} on*\n*• ${prefix + command} off*`)
if (args[0] === "on") {
global.db.data.chats[m.chat].game2 = true
m.reply(`✅ *${command}* ${lenguaje.enable.text1}`)
} else if (args[0] === "off") {
global.db.data.chats[m.chat].game2 = false
m.reply(`🟢 *${command}* ${lenguaje.enable.text2}`)}} 
       
if (command == 'autodetect' || command == 'detect') {
if (!m.isGroup) return m.reply(info.group)
if (!isGroupAdmins) return m.reply(info.admin)
if (!text) return m.reply(`${lenguaje.enable.text}\n\n*• ${prefix + command} on*\n*• ${prefix + command} off*`)
if (args[0] === "on") {
global.db.data.chats[m.chat].detect = true
m.reply(`✅ *${command}* ${lenguaje.enable.text1}`)
} else if (args[0] === "off") {
global.db.data.chats[m.chat].detect = false
m.reply(`🟢 *${command}* ${lenguaje.enable.text2}`)}}

if (command == 'audios') {
if (!text) return m.reply(`${lenguaje.enable.text}\n\n*• ${prefix + command} on*\n*• ${prefix + command} off*`)
if (args[0] === "on") {
global.db.data.chats[m.chat].audios = true
m.reply(`✅ *${command}* ${lenguaje.enable.text1}`)
} else if (args[0] === "off") {
global.db.data.chats[m.chat].audios = false
m.reply(`🟢 *${command}* ${lenguaje.enable.text2}`)}}

if (command == 'autosticker' || command == 'stickers') {
if (!m.isGroup) return m.reply(info.group)
if (!isGroupAdmins) return m.reply(info.admin)
if (!text) return m.reply(`${lenguaje.enable.text}\n\n*• ${prefix + command} on*\n*• ${prefix + command} off*`)
if (args[0] === "on") {
global.db.data.chats[m.chat].autosticker = true
m.reply(`✅ *${command}* ${lenguaje.enable.text1}`)
} else if (args[0] === "off") {
global.db.data.chats[m.chat].autosticker = false
m.reply(`🟢 *${command}* ${lenguaje.enable.text2}`)}}

if (command == 'modocaliente' || command == 'antinsfw') {
if (!m.isGroup) return m.reply(info.group)
if (!isGroupAdmins) return m.reply(info.admin)
if (!text) return m.reply(`${lenguaje.enable.text}\n\n*• ${prefix + command} on*\n*• ${prefix + command} off*`)
if (args[0] === "on") {
global.db.data.chats[m.chat].antiNsfw = true
m.reply(`✅ *${command}* ${lenguaje.enable.text1}`)
} else if (args[0] === "off") {
global.db.data.chats[m.chat].antiNsfw = false
m.reply(`🟢 *${command}* ${lenguaje.enable.text2}`)}}

if (command == 'modoadmin' || command == 'soloadmin' || command == 'modoadmins') {
if (!m.isGroup) return m.reply(info.group)
if (!isBotAdmins) return m.reply(info.botAdmin)
if (!isGroupAdmins) return m.reply(info.admin)
if (!text) return m.reply(`${lenguaje.enable.text}\n\n*• ${prefix + command} on*\n*• ${prefix + command} off*`)
if (args[0] === "on") { 
global.db.data.chats[m.chat].modeadmin = true
m.reply(`✅ *${command}* ${lenguaje.enable.text1}\n\n${lenguaje.enable.text4}`)
} else if (args[0] === "off") {
global.db.data.chats[m.chat].modeadmin = false
m.reply(`🟢 *${command}* ${lenguaje.enable.text2}\n\n${lenguaje.enable.text5}`)}}

if (command == 'antiprivado' || command == 'antipv') {
if (!isCreator) return m.reply(info.owner)
if (!text) return m.reply(`${lenguaje.enable.text}\n\n*• ${prefix + command} on*\n*• ${prefix + command} off*`)
if (args[0] === "on") {
global.db.data.settings[numBot].antiprivado = true
//conn.antiprivado = true
m.reply(`✅ *${command}* ${lenguaje.enable.text1}`)
} else if (args[0] === "off") {
global.db.data.settings[numBot].antiprivado = false
//conn.antiprivado = false
m.reply(`🟢 *${command}* ${lenguaje.enable.text2}`)}}

if (command == 'anticall' || command == 'antillamada') {
if (!isCreator) return m.reply(info.owner)
if (!text) return m.reply(`${lenguaje.enable.text}\n\n*• ${prefix + command} on*\n*• ${prefix + command} off*`)
if (args[0] === "on") {
global.db.data.settings[numBot].anticall = true
m.reply(`✅ *${command}* ${lenguaje.enable.text1}`)
} else if (args[0] === "off") {
global.db.data.settings[numBot].anticall = false
m.reply(`🟢 *${command}* ${lenguaje.enable.text2}`)}}

if (command == 'modojadibot' || command == 'jadibot') {
if (!isCreator) return m.reply(info.owner)
if (!text) return m.reply(`${lenguaje.enable.text}\n\n*• ${prefix + command} on*\n*• ${prefix + command} off*`)
if (args[0] === "on") {
global.db.data.chats[m.chat].jadibot = true
m.reply(`✅ *${command}* ${lenguaje.enable.text1}`)
} else if (args[0] === "off") {
global.db.data.chats[m.chat].jadibot = false
m.reply(`🟢 *${command}* ${lenguaje.enable.text2}`)}}

if (command == 'autoread' || command == 'autovisto') {
if (!isCreator) return m.reply(info.owner)
if (!text) return m.reply(`${lenguaje.enable.text}\n\n*• ${prefix + command} on*\n*• ${prefix + command} off*`)
if (args[0] === "on") {
global.db.data.settings[conn.user.jid].autoread = false
//conn.autoread = false
m.reply(`✅ *${command}* ${lenguaje.enable.text1}`)
} else if (args[0] === "off") {
global.db.data.settings[conn.user.jid].autoread = true
//conn.autoread = true
m.reply(`🟢 *${command}* ${lenguaje.enable.text2}`)}}

if (command == 'antispam') {
if (!isCreator) return m.reply(info.owner)
if (!text) return m.reply(`${lenguaje.enable.text}\n\n*• ${prefix + command} on*\n*• ${prefix + command} off*`)
if (args[0] === "on") {
global.db.data.chats[m.chat].antispam = true
m.reply(`✅ *${command}* ${lenguaje.enable.text1}`)
} else if (args[0] === "off") {
global.db.data.chats[m.chat].antispam = false
m.reply(`🟢 *${command}* ${lenguaje.enable.text2}`)}}

if (command == 'chatbot' || command == 'simsimi') {
//if (!m.isGroup) return m.reply(info.group)
//if (!isGroupAdmins) return m.reply(info.admin)
if (!text) return m.reply(`${lenguaje.enable.text}\n\n*• ${prefix + command} on*\n*• ${prefix + command} off*`)
if (args[0] === "on") {
global.db.data.chats[m.chat].simi = true
m.reply(`✅ *${command}* ${lenguaje.enable.text1}`)
} else if (args[0] === "off") {
global.db.data.chats[m.chat].simi = false
m.reply(`🟢 *${command}* ${lenguaje.enable.text2}`)}}

if (command == 'autolevelup' || command == 'autonivel') {
if (!m.isGroup) return m.reply(info.group)
if (!text) return m.reply(`${lenguaje.enable.text}\n\n*• ${prefix + command} on*\n*• ${prefix + command} off*`)
if (args[0] === "on") {
global.db.data.chats[m.chat].autolevelup = true
m.reply(`✅ *${command}* ${lenguaje.enable.text1}`)
} else if (args[0] === "off") {
global.db.data.chats[m.chat].autolevelup = false
m.reply(`🟢 *${command}* ${lenguaje.enable.text2}`)}}}

module.exports = { enable }

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})
