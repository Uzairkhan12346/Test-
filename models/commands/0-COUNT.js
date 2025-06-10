const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");

module.exports.config = {
  name: "cover",
  version: "1.0.1",
  hasPermssion: 1,
  credits: "uzairrajput",
  description: "Show Facebook cover photo of mentioned user only.",
  commandCategory: "utility",
  cooldowns: 0
};

module.exports.run = async function({ event, api }) {
  if (this.config.credits.toLowerCase() !== "uzairrajput") {
    return api.sendMessage("⚠️ Credit mat hatao bhai. Creator: Uzair Rajput 💖", event.threadID, event.messageID);
  }

  const mention = Object.keys(event.mentions);
  if (mention.length === 0) {
    return api.sendMessage("⚠️ Sirf mention pe command chalegi. Kisi ko tag karo!", event.threadID, event.messageID);
  }

  const uid = mention[0];
  const name = event.mentions[uid].split(" ")[0];
  const url = `https://graph.facebook.com/${uid}?fields=cover&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662`;

  try {
    const res = await axios.get(url);
    const coverUrl = res.data.cover?.source;

    if (!coverUrl) {
      return api.sendMessage("❌ Cover photo nahi mil saki. Shayad private hai ya set nahi hai.", event.threadID, event.messageID);
    }

    const filePath = __dirname + "/cache/cover.jpg";
    request(encodeURI(coverUrl))
      .pipe(fs.createWriteStream(filePath))
      .on("close", () => {
        api.sendMessage({
          body: `📷 𝐘𝐞 𝐫𝐚𝐡𝐢 𝐜𝐨𝐯𝐞𝐫 𝐩𝐢𝐜 𝐛𝐡𝐚𝐢 ${name} 𝐤𝐢 😎\n🌈 𝐅𝐮𝐥𝐥 𝐒𝐭𝐲𝐥𝐞 𝐨𝐫 𝐀𝐭𝐭𝐢𝐭𝐮𝐝𝐞 💖\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•.`,
          attachment: fs.createReadStream(filePath)
        }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
      });

  } catch (error) {
    console.error(error.message || error);
    return api.sendMessage("❌ Koi error aa gaya cover photo laate waqt. Shayad UID galat ya token invalid hai.", event.threadID, event.messageID);
  }
};
