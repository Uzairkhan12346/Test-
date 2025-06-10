const axios = require("axios");
const fs = global.nodemodule["fs-extra"];
const request = global.nodemodule["request"];

module.exports.config = {
  name: "cover",
  version: "1.0.2",
  hasPermssion: 1,
  credits: "uzairrajput",
  description: "Show Facebook cover photo of the mentioned user only.",
  commandCategory: "utility",
  cooldowns: 0
};

module.exports.run = async function({ event, api, Users }) {
  // ✅ Allow only when a user is mentioned
  if (Object.keys(event.mentions).length === 0) {
    return api.sendMessage("❌ Sirf jab koi user mention ho tab hi ye command chalegi.\n📌 Example: cover @name", event.threadID, event.messageID);
  }

  // ✅ Get mentioned UID and Name
  const uid = Object.keys(event.mentions)[0];
  const name = event.mentions[uid].split(" ")[0];

  // ✅ FB Graph API URL
  const url = `https://graph.facebook.com/${uid}?fields=cover&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662`;

  try {
    const res = await axios.get(url);
    const coverUrl = res.data.cover?.source;

    if (!coverUrl) {
      return api.sendMessage(`❌ ${name} ki cover photo nahi mil saki. Shayad unki privacy on hai.`, event.threadID, event.messageID);
    }

    const filePath = __dirname + "/cache/cover.jpg";

    request(encodeURI(coverUrl))
      .pipe(fs.createWriteStream(filePath))
      .on("close", () => {
        api.sendMessage({
          body: `📷 𝐘𝐞 𝐫𝐚𝐡𝐢 ${name} 𝐤𝐢 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐂𝐨𝐯𝐞𝐫 𝐏𝐢𝐜 😎\n🌈 𝐁𝐨𝐭 𝐧𝐚𝐦 𝐡𝐚𝐢 𝐌𝐓𝐗 - 𝐒𝐭𝐲𝐥𝐞 𝐰𝐢𝐭𝐡 𝐀𝐭𝐭𝐢𝐭𝐮𝐝𝐞 💖\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•.`,
          attachment: fs.createReadStream(filePath)
        }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
      });

  } catch (error) {
    console.error("Cover photo error:", error);
    return api.sendMessage("❌ Koi error aa gaya cover photo laate waqt. Shayad UID galat ya token invalid hai.", event.threadID, event.messageID);
  }
};
