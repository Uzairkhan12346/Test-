const fs = global.nodemodule["fs-extra"];
const request = global.nodemodule["request"];
const path = require("path");

module.exports.config = {
  name: "cover",
  version: "1.0.4",
  hasPermssion: 1,
  credits: "uzairrajput",
  description: "Mention se FB Cover Photo lao.",
  commandCategory: "utility",
  cooldowns: 0
};

module.exports.run = async function({ event, api, Users }) {
  if (Object.keys(event.mentions).length === 0) {
    return api.sendMessage("📌 Sirf tab chalega jab kisi ko mention karo.\nExample: cover @name", event.threadID, event.messageID);
  }

  const uid = Object.keys(event.mentions)[0];
  const name = event.mentions[uid].split(" ")[0];
  const coverUrl = `https://api.vyturex.com/facebookcover?uid=${uid}`;
  const filePath = path.join(__dirname, "cache", `cover_${uid}.jpg`);

  request(encodeURI(coverUrl))
    .pipe(fs.createWriteStream(filePath))
    .on("close", () => {
      // ✅ Check file size (if image downloaded)
      if (fs.existsSync(filePath) && fs.statSync(filePath).size > 1000) {
        api.sendMessage({
          body: `📷 𝐘𝐞 𝐫𝐚𝐡𝐢 ${name} 𝐤𝐢 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐂𝐨𝐯𝐞𝐫 𝐏𝐢𝐜 😎\n🌈 𝐒𝐭𝐲𝐥𝐞 𝐚𝐮𝐫 𝐂𝐥𝐚𝐬𝐬 𝐝𝐨𝐧𝐨 𝐚𝐥𝐚𝐠 𝐡𝐢 𝐡𝐚𝐢 💖\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•.`,
          attachment: fs.createReadStream(filePath)
        }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
      } else {
        fs.unlinkSync(filePath);
        api.sendMessage("❌ Cover photo nahi mil saki. Shayad private hai ya set nahi ki gayi.", event.threadID, event.messageID);
      }
    })
    .on("error", () => {
      api.sendMessage("❌ Cover photo fetch karte waqt error aaya.", event.threadID, event.messageID);
    });
};
