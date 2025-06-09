module.exports.config = {
  name: "cover",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "uzairrajput",
  description: "Show Facebook cover photo of mentioned user or your own.",
  commandCategory: "utility",
  cooldowns: 0
};

module.exports.run = async function({ event, api, Users }) {
  const fs = require("fs-extra");
  const axios = require("axios");

  // 🔒 Credit lock
  if (this.config.credits.toLowerCase() !== "uzairrajput") {
    return api.sendMessage("⚠️ Credit mat hatao bhai. Creator: Uzair Rajput 💖", event.threadID, event.messageID);
  }

  let uid, name;

  if (Object.keys(event.mentions).length > 0) {
    uid = Object.keys(event.mentions)[0];
    name = event.mentions[uid].split(" ")[0];
  } else {
    uid = event.senderID;
    name = await Users.getNameUser(uid);
  }

  try {
    const res = await axios.get(`https://graph.facebook.com/${uid}?fields=cover&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662`);
    const coverUrl = res.data.cover?.source;

    if (!coverUrl) throw new Error("Cover photo not found.");

    const filePath = __dirname + "/uzair/cover.jpg";
    const image = (await axios.get(coverUrl, { responseType: "stream" })).data;

    image.pipe(fs.createWriteStream(filePath)).on("finish", () => {
      api.sendMessage({
        body: `🖼️ 𝐋𝐨 𝐛𝐚𝐛𝐲 ${name} 𝐤𝐢 𝐂𝐨𝐯𝐞𝐫 𝐏𝐡𝐨𝐭𝐨 😍\n💖 𝐌𝐞𝐧𝐭𝐢𝐨𝐧 𝐡𝐨 𝐲𝐚 𝐧𝐚𝐡𝐢, 𝐲𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐝𝐨𝐧𝐨 𝐭𝐚𝐫𝐢𝐤𝐨𝐧 𝐬𝐞 𝐜𝐡𝐚𝐥𝐞𝐠𝐢 💚\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•.`,
        attachment: fs.createReadStream(filePath)
      }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
    });

  } catch (err) {
    console.error("❌ Cover fetch error:", err.message);
    return api.sendMessage("❌ Error: Cover fetch nahi ho paayi. User ki privacy ya token limit ho sakti hai.", event.threadID, event.messageID);
  }
};
