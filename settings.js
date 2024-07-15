const fs = require('fs') 
const path = require('path')
const chalk = require('chalk') 
const { en, es, ar, id, pt, rs} = require('./libs/idiomas/total-idiomas.js') 

//---------[ PROPIETARIO/OWNER ]---------
global.owner = [["15167096032", "Owner", true], ["50766666665"], ["595975740803"], ["595986172767"], ["5492266466080"], ["50768888888"], ["5492266613038"], ["584123552078"], ["573242402359"], ["5217294888993"],["5214437863111"], ["51906662557"], ["595992302861"], ["5217441298510"], ["5491155983299"], ["5493795319022"], ["5217821153974"], ["584163393168"], ["573147616444"], ["5216865268215"], ["573012482694"]]
global.mods = []
global.premium = []  
global.blockList = []  

//---------[ NOMBRE/INFO ]---------
global.botname = "CORTANABOT-2.0"
global.wm = '𝙲𝙾𝚁𝚃𝙰𝙽𝙰𝙱𝙾𝚃-𝟸.𝟶'
global.vs = '(Personalizado)'

//Función beta : escribe el número que quiere que sea bot para que mande el Código de 8 digitos
global.botNumberCode = "" //Ejemplo: +59309090909
global.phoneNumber = ""

//---------[ FECHA/IDIOMAS ]---------
global.place = 'America/Bogota' // Aquí puedes encontrar tu ubicación https://momentjs.com/timezone/
global.lenguaje = es //Predeterminado en idioma Español 
global.prefix = [`/`]

//---------[ APIS GLOBAL ]---------
global.keysZens = ['LuOlangNgentot', 'c2459db922', '37CC845916', '6fb0eff124', 'hdiiofficial', 'fiktod', 'BF39D349845E', '675e34de8a', '0b917b905e6f']; 
global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())]; 
global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63']; 
global.keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())]; 
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5']; 
global.keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())]; 
global.lolkeysapi = ['GataDios']; // ['BrunoSobrino_2'] 
global.itsrose = ['4b146102c4d500809da9d1ff'];
global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({...query, ...(apikeyqueryname ? {[apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]} : {})})) : '');

global.APIs = {
//ApiEmpire: 'https://',
CFROSAPI: 'https://api.cafirexos.com',
nrtm: 'https://fg-nrtm.ddns.net',
fgmods: 'https://api.fgmods.xyz', 
xteam: 'https://api.xteam.xyz',
dzx: 'https://api.dhamzxploit.my.id',
lol: 'https://api.lolhuman.xyz',
neoxr: 'https://api.neoxr.my.id',
zenzapis: 'https://api.zahwazein.xyz',
akuari: 'https://api.akuari.my.id',
akuari2: 'https://apimu.my.id',
botcahx: 'https://api.botcahx.biz.id',
ibeng: 'https://api.ibeng.tech/docs',
rose: 'https://api.itsrose.site',
popcat: 'https://api.popcat.xyz',
xcoders: 'https://api-xcoders.site',
vihangayt: 'https://vihangayt.me',
erdwpe: 'https://api.erdwpe.com',
xyroinee: 'https://api.xyroinee.xyz',
nekobot: 'https://nekobot.xyz'
},
global.APIKeys = {
'https://api.xteam.xyz': `${keysxteam}`,
'https://api.lolhuman.xyz': 'GataDios',
'https://api.neoxr.my.id': `${keysneoxr}`,
'https://api.zahwazein.xyz': `${keysxxx}`,
'https://api.fgmods.xyz': 'DRLg5kY7', 
'https://api-fgmods.ddns.net': 'fg-dylux',
'https://api.botcahx.biz.id': 'Admin',
'https://api.ibeng.tech/docs': 'tamvan',
'https://api.itsrose.site': 'Rs-Zeltoria',
'https://api-xcoders.site': 'Frieren',
'https://api.xyroinee.xyz': 'uwgflzFEh6'
};
 
//---------[ STICKERS ]---------
global.packname = "𝙲𝙾𝚁𝚃𝙰𝙽𝙰𝙱𝙾𝚃-𝟸.𝟶"
global.author = `${vs}`
 
//---------[ IMAGEN ]--------- 
global.img = "https://qu.ax/hQrA.jpg"
global.img1 = 'https://qu.ax/VqDa.jpg'
global.img2 = 'https://qu.ax/lwJi.jpg' 

global.imagen1 = fs.readFileSync('./media/menu.jpg')
global.imagen2 = fs.readFileSync('./media/menu2.jpg')
global.imagen3 = fs.readFileSync('./media/menu3.jpg')
global.imagen4 = fs.readFileSync('./media/menu4.jpg')
global.imagen5 = fs.readFileSync('./media/menu5.jpg')
global.noperfil = fs.readFileSync('./media/sinfoto.jpg')
global.verificar = 'https://qu.ax/Wogm.mp4'

//---------[ ENLACES ]---------
global.md = 'https://github.com/russellxz/CORTANABOT2.0.git'
global.yt = 'https://www.youtube.com/@RussellxzZing507andCrownsavage'
global.tiktok = 'https://www.instagram.com/russellxz507ny'
global.fb = 'https://www.facebook.com/elrebelde21'
global.faceb = 'https://facebook.com/groups/872989990425789/'

global.n2 = "https://whatsapp.com/channel/0029VaWABAMG8l5K8K9PAB3v" //canal cortaba 
global.nna = 'https://whatsapp.com/channel/0029Va4QjH7DeON0ePwzjS1A' //Update 
global.nn = 'https://chat.whatsapp.com/HOcczbax7HR1TgRcLfeBRE' //LoliBot
global.nn2 = 'https://chat.whatsapp.com/HOcczbax7HR1TgRcLfeBRE' //Loli & Nova
global.nn3 = 'https://chat.whatsapp.com/HOcczbax7HR1TgRcLfeBRE' //Grupo de Colaboracion
global.nn4 = 'https://chat.whatsapp.com/HOcczbax7HR1TgRcLfeBRE' // Grupo COL 2
global.nn5 = 'https://chat.whatsapp.com/HOcczbax7HR1TgRcLfeBRE' //Grupo COL 3
global.nn6 = 'https://chat.whatsapp.com/HOcczbax7HR1TgRcLfeBRE' //test
global.nn7 = 'https://chat.whatsapp.com/FDRfhecUGrCEQswkg8FUYz' //Grupo ayuda sobre el bot
global.nn8 = 'https://chat.whatsapp.com/HOcczbax7HR1TgRcLfeBRE' //enlace lolibot
global.multi = 'https://chat.whatsapp.com/HOcczbax7HR1TgRcLfeBRE' //Grupo COL 4
global.nna2 = 'HOcczbax7HR1TgRcLfeBRE'

//---------[ INFO ]--------- 
global.info = { wait: '*_▬▭▭▭▭▭▭_*', 
waitt: '*_▬▬▭▭▭_*', 
waittt: '*_▬▬▬▬▭▭_*', 
waitttt: '*_▬▬▬▬▬▬▭_*', 
waittttt: '*_▬▬▬▬▬▬▬_*', 
result: `${lenguaje['exito']()}`,  
admin: `${lenguaje['admin']()}`, 
botAdmin: `${lenguaje['botAdmin']()}`, 
owner: `${lenguaje['propietario']()}`, 
group: `${lenguaje['group']()}`, 
private: `${lenguaje['private']()}`, 
bot: `${lenguaje['bot']()}`, 
error: `${lenguaje['error']()}`, 
advertencia: `${lenguaje['advertencia']()}`, 
registra: `${lenguaje['registra']()}`, 
limit: `${lenguaje['limit']()}`, 
AntiNsfw: `${lenguaje['AntiNsfw']()}`,
endLimit: `${lenguaje['endLimit']()}`, }
global.rwait = '🕕'
global.dmoji = '😈'
global.done = '💢'
global.error = '🚫' 
global.xmoji = '👿' 

//---------------[ NIVELES, ADVERTENCIA ]----------------
global.multiplier = 35 // Cuanto más alto, más difícil subir de nivel 
global.maxwarn = '6' // máxima advertencias 

//----------------------------------------------------

let file = require.resolve(__filename) 
fs.watchFile(file, () => { 
fs.unwatchFile(file)
const fileName = path.basename(file)
console.log(chalk.greenBright.bold(`Update '${fileName}'.`)) 
delete require.cache[file] 
require(file) 
})
