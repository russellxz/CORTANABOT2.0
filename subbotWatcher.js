const path = require("path");
const fs = require("fs");
const pino = require("pino");
const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore
} = require("@whiskeysockets/baileys");

const subbotFolder = "./subbots";
let subbotsCargados = new Set();

async function verificarNuevosSubbots() {
  if (!fs.existsSync(subbotFolder)) return;

  const subDirs = fs
    .readdirSync(subbotFolder)
    .filter(d => fs.existsSync(`${subbotFolder}/${d}/creds.json`));

  for (const dir of subDirs) {
    if (!subbotsCargados.has(dir)) {
      console.log(`🆕 Subbot nuevo detectado: ${dir} → iniciando...`);
      subbotsCargados.add(dir);
      await iniciarSubbotDinamico(dir);
    }
  }
}

// 🔁 Escaneo cada 10 segundos
setInterval(verificarNuevosSubbots, 10_000);

async function iniciarSubbotDinamico(dir) {
  const sessionPath = path.join(subbotFolder, dir);

  try {
    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
    const { version } = await fetchLatestBaileysVersion();
    const subSock = makeWASocket({
      version,
      logger: pino({ level: "silent" }),
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" }))
      },
      browser: ["SubbotWatcher", "Firefox", "2.0"]
    });

    subSock.ev.on("creds.update", saveCreds);

    subSock.ev.on("connection.update", ({ connection }) => {
      if (connection === "open") {
        console.log(`✅ Subbot ${dir} conectado automáticamente`);
      } else if (connection === "close") {
        console.log(`❌ Subbot ${dir} desconectado`);
      }
    });

    // Aquí podrías meter lógica opcional como logs, autogestión o respuesta simple
  } catch (err) {
    console.error(`❌ Error iniciando subbot ${dir}:`, err);
  }
}
