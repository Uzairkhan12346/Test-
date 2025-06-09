module.exports.config = {
  name: "cover",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "uzairrajput",
  description: "Show FB cover photo of a mentioned user or yourself.",
  commandCategory: "utility",
  cooldowns: 0
};

module.exports.run = async function({ event, api, Users }) {
  const fs = global.nodemodule["fs-extra"];
  const axios = global.nodemodule["axios"];
  const request = global.nodemodule["request"];

  // 🔐 Credit Lock
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
    const fbInfo = await axios.get(
      `https://graph.facebook.com/${uid}?fields=cover&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662`
    );

    if (!fbInfo.data.cover || !fbInfo.data.cover.source) {
      return api.sendMessage(`❌ ${name} ki cover photo nahi mil saki.`, event.threadID, event.messageID);
    }

    const coverUrl = fbInfo.data.cover.source;
    const filePath = __dirname + `/uzair/cover_${uid}.jpg`;

    const callback = () =>
      api.sendMessage({
        body: `🌄 𝐘𝐞 𝐫𝐡𝐢 ${name} 𝐤𝐢 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐂𝐨𝐯𝐞𝐫 😍\n🌀 𝐌𝐞𝐧𝐭𝐢𝐨𝐧 𝐡𝐨 𝐲𝐚 𝐧𝐚𝐡𝐢, 𝐝𝐨𝐧𝐨 𝐦𝐨𝐝𝐞 𝐦𝐞𝐢𝐧 𝐜𝐡𝐚𝐥𝐞𝐠𝐢 💖\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•.`,
        attachment: fs.createReadStream(filePath)
      }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);

    // Download the cover image
    request(encodeURI(coverUrl))
      .pipe(fs.createWriteStream(filePath))
      .on("close", () => callback());
  } catch (error) {
    console.error("Cover fetch error:", error);
    return api.sendMessage("❌ Error fetching cover photo. Check UID/token.", event.threadID, event.messageID);
  }
};
