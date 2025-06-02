const axios = require("axios");

async function ytdl(url) {
const apis = [
`https://ytdownloader.nvlgroup.my.id/audio?url=${url}&bitrate=128`,
`https://api.dorratz.com/v2/yt-mp3?url=${url}`
];

for (let api of apis) {
try {
await axios.get(api);
return { status: "success", creador: "eliasaryt", dl: api };
} catch (e) {}
}

return { status: "error", creador: "eliasaryt", dl: null };
}

module.exports = ytdl;
