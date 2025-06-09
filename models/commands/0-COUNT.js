module.exports.config = {
  name: "profile",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "uzairrajput",
  description: "Show FB DP of mentioned user or your own.",
  commandCategory: "utility",
  cooldowns: 0
};

module.exports.run = async function({ event, api, Users }) {
  const fs = global.nodemodule["fs-extra"];
  const request = global.nodemodule["request"];

  // 🔒 Credit lock
  if (this.config.credits.toLowerCase() !== "uzairrajput") {
    return api.sendMessage("⚠️ Credit mat hatao bhai. Creator: Uzair Rajput 💖", event.threadID, event.messageID);
  }

  let uid, name;

  // ✅ If user is mentioned
  if (Object.keys(event.mentions).length > 0) {
    uid = Object.keys(event.mentions)[0];
    name = event.mentions[uid].split(" ")[0];
  } 
  // ✅ If no mention, use sender
  else {
    uid = event.senderID;
    name = await Users.getNameUser(uid);
  }

  const callback = () =>
    api.sendMessage({
      body: `📸 𝐋𝐨 𝐛𝐡𝐚𝐢 ${name} 𝐤𝐢 𝐃𝐏 𝐚𝐠𝐲𝐢 😎\n💖 𝐌𝐞𝐧𝐭𝐢𝐨𝐧 𝐡𝐨 𝐲𝐚 𝐧𝐚𝐡𝐢𝐧, 𝐌𝐓𝐗 𝐁𝐨𝐭 𝐝𝐢𝐥 𝐣𝐢𝐭 𝐫𝐚𝐡𝐚 𝐡𝐚𝐢 💚\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•.`,
      attachment: fs.createReadStream(__dirname + "/cache/profile.png")
    }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/profile.png"), event.messageID);

  return request(encodeURI(`https://graph.facebook.com/${uid}/picture?height=1500&width=1500&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662`))
    .pipe(fs.createWriteStream(__dirname + "/cache/profile.png"))
    .on("close", () => callback());
};
