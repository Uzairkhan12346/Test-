module.exports.config = {
  name: "cover",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "uzairrajput",
  description: "Show DP + Cover of mentioned user or yourself.",
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

  // ✅ Mention ya khud ka
  if (Object.keys(event.mentions).length > 0) {
    uid = Object.keys(event.mentions)[0];
    name = event.mentions[uid].split(" ")[0];
  } else {
    uid = event.senderID;
    name = await Users.getNameUser(uid);
  }

  try {
    // ✅ Facebook se DP + Cover photo fetch
    const fbInfo = await axios.get(
      `https://graph.facebook.com/${uid}?fields=cover&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662`
    );

    const dpUrl = `https://graph.facebook.com/${uid}/picture?height=1500&width=1500&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662`;
    const coverUrl = fbInfo.data.cover?.source;

    if (!coverUrl) {
      return api.sendMessage(`❌ ${name} ki cover photo nahi mil saki.`, event.threadID, event.messageID);
    }

    const dpPath = __dirname + `/uzair/dp_${uid}.jpg`;
    const coverPath = __dirname + `/uzair/cover_${uid}.jpg`;

    const sendImages = () =>
      api.sendMessage({
        body: `🌟 𝐋𝐨 𝐝𝐨𝐧𝐨 𝐚𝐚𝐠𝐲𝐞 𝐛𝐚𝐛𝐲 ${name} 𝐤𝐢 𝐃𝐏 𝐚𝐮𝐫 𝐂𝐨𝐯𝐞𝐫 😎\n💞 𝐌𝐞𝐧𝐭𝐢𝐨𝐧 𝐤𝐚𝐫𝐨 𝐲𝐚 𝐧𝐚𝐡𝐢, 𝐃𝐨𝐧𝐨 𝐜𝐡𝐚𝐥𝐞𝐠𝐢𝐧 💖\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•.`,
        attachment: [
          fs.createReadStream(dpPath),
          fs.createReadStream(coverPath)
        ]
      }, event.threadID, () => {
        fs.unlinkSync(dpPath);
        fs.unlinkSync(coverPath);
      }, event.messageID);

    // ✅ Download both DP & Cover
    request(encodeURI(dpUrl))
      .pipe(fs.createWriteStream(dpPath))
      .on("close", () => {
        request(encodeURI(coverUrl))
          .pipe(fs.createWriteStream(coverPath))
          .on("close", () => sendImages());
      });
  } catch (err) {
    console.error(err);
    return api.sendMessage("❌ Error fetching DP or Cover photo. Token ya UID issue ho sakta hai.", event.threadID, event.messageID);
  }
};
