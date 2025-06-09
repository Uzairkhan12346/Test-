module.exports.config = {
  name: "cover",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "uzairrajput",
  description: "Show FB cover of mentioned user or your own.",
  commandCategory: "utility",
  cooldowns: 0
};

module.exports.run = async function({ event, api, Users }) {
  const fs = global.nodemodule["fs-extra"];
  const axios = global.nodemodule["axios"];
  const request = global.nodemodule["request"];

  // 🔒 Credit lock
  if (this.config.credits.toLowerCase() !== "uzairrajput") {
    return api.sendMessage("⚠️ Credit mat hatao bhai. Creator: Uzair Rajput 💖", event.threadID, event.messageID);
  }

  let uid, name;

  // ✅ Mentioned user
  if (Object.keys(event.mentions).length > 0) {
    uid = Object.keys(event.mentions)[0];
    name = event.mentions[uid].split(" ")[0];
  } 
  // ✅ No mention (self)
  else {
    uid = event.senderID;
    name = await Users.getNameUser(uid);
  }

  try {
    const res = await axios.get(
      `https://graph.facebook.com/${uid}?fields=cover&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662`
    );

    if (!res.data.cover || !res.data.cover.source) {
      return api.sendMessage(`❌ Cover photo not available for ${name}.`, event.threadID, event.messageID);
    }

    const coverUrl = res.data.cover.source;
    const path = __dirname + "/uzair/cover.jpg";

    const callback = () =>
      api.sendMessage({
        body: `🌄 𝐋𝐨 𝐛𝐚𝐛𝐲 ${name} 𝐤𝐢 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐂𝐨𝐯𝐞𝐫 𝐚𝐠𝐲𝐢 😍\n📲 𝐌𝐞𝐧𝐭𝐢𝐨𝐧 𝐡𝐨 𝐲𝐚 𝐧𝐚𝐡𝐢, 𝐲𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐝𝐨𝐧𝐨 𝐭𝐚𝐫𝐢𝐤𝐨𝐧 𝐬𝐞 𝐜𝐡𝐚𝐥𝐞𝐠𝐢 💖\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•.`,
        attachment: fs.createReadStream(path)
      }, event.threadID, () => fs.unlinkSync(path), event.messageID);

    return request(encodeURI(coverUrl)).pipe(fs.createWriteStream(path)).on("close", () => callback());
  } catch (error) {
    console.error(error);
    return api.sendMessage("❌ Error fetching cover photo. Try again later.", event.threadID, event.messageID);
  }
};
