module.exports.config = {
  name: "imagine1",
  version: "1.0.",
  hasPermssion: 0,
  credits: "uzairrajput",
  description: "generate image from polination",
  commandCategory: "image",
  usages: "query",
  cooldowns: 2,
};
module.exports.run = async ({api, event, args }) => {
const axios = require('axios');
const fs = require('fs-extra');
 let { threadID, messageID } = event;
  let query = args.join(" ");
  if (!query) return api.sendMessage("put text/query", threadID, messageID);
let path = __dirname + `/cache/poli.png`;
  const poli = (await axios.get(`https://image.pollinations.ai/prompt/${query}`, {
    responseType: "arraybuffer",
  })).data;
  fs.writeFileSync(path, Buffer.from(poli, "utf-8"));
  api.sendMessage({
    body: `🎨 “${query}” 𝐊𝐢 𝐈𝐦𝐚𝐠𝐞 𝐓𝐚𝐲𝐚𝐫 𝐤𝐚𝐫 𝐝𝐢 𝐠𝐚𝐲𝐢 𝐡𝐚𝐢!\n\n🖌️ 𝐔𝐦𝐞𝐞𝐝 𝐡𝐚𝐢 𝐤𝐢 𝐲𝐞 𝐢𝐦𝐚𝐠𝐢𝐧𝐚𝐭𝐢𝐨𝐧 𝐚𝐚𝐩𝐤𝐨 𝐩𝐚𝐬𝐚𝐧𝐝 𝐚𝐲𝐞 💫\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•`,
    attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID);
};
