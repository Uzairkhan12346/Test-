module.exports.config = {
  name: "cover",
  version: "1.0.1",
  hasPermssion: 1,
  credits: "uzairrajput",
  description: "Send cover photo of yourself or mentioned user.",
  commandCategory: "utility",
  cooldowns: 0
};

module.exports.run = async function ({ event, api, Users }) {
  const axios = require("axios");
  const fs = require("fs-extra");
  const request = require("request");

  // 🔒 Credit Lock
  if (this.config.credits.toLowerCase() !== "uzairrajput") {
    return api.sendMessage("⚠️ Credit mat hatao bhai. Creator: Uzair Rajput 💖", event.threadID, event.messageID);
  }

  let uid, name;

  // ✅ Check if user is mentioned
  if (Object.keys(event.mentions).length > 0) {
    uid = Object.keys(event.mentions)[0];
    name = event.mentions[uid].split(" ")[0];
  } else {
    uid = event.senderID;
    name = await Users.getNameUser(uid);
  }

  try {
    const token = "6628568379|c1e620fa708a1d5696fb991c1bde5662"; // Public token (limited access)

    const res = await axios.get(`https://graph.facebook.com/${uid}?fields=cover&access_token=${token}`);
    const coverUrl = res.data.cover?.source;

    if (!coverUrl) {
      return api.sendMessage(`❌ ${name} ki cover photo nahi mil saki.`, event.threadID, event.messageID);
    }

    const path = __dirname + `/uzair/cover_${uid}.jpg`;

    request(coverUrl)
      .pipe(fs.createWriteStream(path))
      .on("close", () => {
        api.sendMessage({
          body: `🎀 𝐘𝐞 𝐫𝐚𝐡𝐢 𝐛𝐚𝐛𝐲 ${name} 𝐤𝐢 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐂𝐨𝐯𝐞𝐫 😍\n💖 𝐌𝐓𝐗 𝐁𝐨𝐭 𝐒𝐭𝐲𝐥𝐞 𝐦𝐞𝐢𝐧 𝐝𝐢𝐥 𝐣𝐢𝐭 𝐫𝐚𝐡𝐚 💚\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•.`,
          attachment: fs.createReadStream(path)
        }, event.threadID, () => fs.unlinkSync(path), event.messageID);
      });
  } catch (err) {
    console.error(err);
    return api.sendMessage("❌ Error: Cover fetch nahi ho paayi. User ki privacy ya token limit ho sakti hai.", event.threadID, event.messageID);
  }
};
