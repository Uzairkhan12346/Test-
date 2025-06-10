const fs = global.nodemodule["fs-extra"];
const request = global.nodemodule["request"];

module.exports.config = {
  name: "cover",
  version: "1.0.3",
  hasPermssion: 1,
  credits: "uzairrajput",
  description: "Show Facebook cover photo of mentioned user.",
  commandCategory: "utility",
  cooldowns: 0
};

module.exports.run = async function({ event, api, Users }) {
  if (Object.keys(event.mentions).length === 0) {
    return api.sendMessage("❌ Sirf jab koi user mention ho tab hi ye command chalegi.\n📌 Example: cover @name", event.threadID, event.messageID);
  }

  const uid = Object.keys(event.mentions)[0];
  const name = event.mentions[uid].split(" ")[0];
  const coverUrl = `https://api.vyturex.com/facebookcover?uid=${uid}`;
  const filePath = __dirname + "/cache/cover.jpg";

  request(encodeURI(coverUrl))
    .pipe(fs.createWriteStream(filePath))
    .on("close", () => {
      api.sendMessage({
        body: `📷 𝐘𝐞 𝐫𝐚𝐡𝐢 ${name} 𝐤𝐢 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐂𝐨𝐯𝐞𝐫 𝐏𝐢𝐜 😎\n🌈 𝐒𝐭𝐲𝐥𝐞 𝐚𝐮𝐫 𝐂𝐥𝐚𝐬𝐬 𝐝𝐨𝐧𝐨 𝐚𝐥𝐚𝐠 𝐡𝐢 𝐡𝐚𝐢 💖\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•.`,
        attachment: fs.createReadStream(filePath)
      }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
    });
};
