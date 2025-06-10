const axios = require("axios");
const fs = global.nodemodule["fs-extra"];
const request = global.nodemodule["request"];

module.exports.config = {
  name: "cover",
  version: "1.0.1",
  hasPermssion: 1,
  credits: "uzairrajput",
  description: "Show Facebook cover photo of mentioned user or your own.",
  commandCategory: "utility",
  cooldowns: 0
};

module.exports.run = async function({ event, api, Users }) {
  if (this.config.credits.toLowerCase() !== "uzairrajput") {
    return api.sendMessage("⚠️ Credit mat hatao bhai. Creator: Uzair Rajput 💖", event.threadID, event.messageID);
  }

  let uid = Object.keys(event.mentions)[0] || event.senderID;
  let name = Object.keys(event.mentions).length > 0 
    ? event.mentions[uid].split(" ")[0] 
    : await Users.getNameUser(uid);

  const url = `https://graph.facebook.com/${uid}?fields=cover&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662`;

  try {
    const res = await axios.get(url);
    const coverUrl = res.data.cover?.source;

    if (!coverUrl) {
      return api.sendMessage("❌ Cover photo nahi mil saki. Shayad privacy on hai.", event.threadID, event.messageID);
    }

    const filePath = __dirname + "/cache/cover.jpg";

    request(encodeURI(coverUrl))
      .pipe(fs.createWriteStream(filePath))
      .on("close", () => {
        api.sendMessage({
          body: `📷 𝐋𝐨 𝐛𝐡𝐚𝐢 ${name} 𝐤𝐢 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐂𝐨𝐯𝐞𝐫 𝐏𝐢𝐜 😎\n🌈 𝐒𝐭𝐲𝐥𝐞 𝐚𝐮𝐫 𝐒𝐡𝐚𝐧 𝐝𝐨𝐧𝐨 𝐚𝐥𝐚𝐠 𝐡𝐢 𝐡𝐚𝐢 💖\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•.`,
          attachment: fs.createReadStream(filePath)
        }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
      });

  } catch (err) {
    console.error(err);
    api.sendMessage("❌ Error aaya cover photo fetch karte waqt.", event.threadID, event.messageID);
  }
};
