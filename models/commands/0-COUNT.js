module.exports.config = {
  name: "coverdp",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "uzairrajput",
  description: "Show Facebook profile picture of mentioned user or your own.",
  commandCategory: "utility",
  cooldowns: 0
};

module.exports.run = async function({ event, api, Users }) {
  const fs = global.nodemodule["fs-extra"];
  const request = global.nodemodule["request"];

  if (this.config.credits.toLowerCase() !== "uzairrajput") {
    return api.sendMessage("⚠️ Credit mat hatao bhai. Creator: Uzair Rajput 💖", event.threadID, event.messageID);
  }

  let uid, name;

  // ✅ Mentioned user
  if (Object.keys(event.mentions).length > 0) {
    uid = Object.keys(event.mentions)[0];
    name = event.mentions[uid].split(" ")[0];
  } 
  // ✅ Command sender
  else {
    uid = event.senderID;
    name = await Users.getNameUser(uid);
  }

  // ✅ Facebook Graph API to get profile picture
  const url = `https://graph.facebook.com/${uid}/picture?type=large&redirect=false&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662`;

  const axios = require("axios");
  try {
    const res = await axios.get(url);
    const dpUrl = res.data.data?.url;

    if (!dpUrl) {
      return api.sendMessage("❌ Profile picture nahi mil saki. Shayad privacy on hai.", event.threadID, event.messageID);
    }

    const filePath = __dirname + "/cache/profile.jpg";

    request(encodeURI(dpUrl))
      .pipe(fs.createWriteStream(filePath))
      .on("close", () => {
        api.sendMessage({
          body: `📸 𝐋𝐨 𝐛𝐡𝐚𝐢 ${name} 𝐤𝐢 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐏𝐫𝐨𝐟𝐢𝐥𝐞 𝐏𝐢𝐜 😎\n🌟 𝐒𝐰𝐚𝐠 𝐚𝐮𝐫 𝐒𝐭𝐲𝐥𝐞 𝐭𝐨 𝐛𝐚𝐧𝐭𝐚 𝐡𝐚𝐢 💖\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•.`,
          attachment: fs.createReadStream(filePath)
        }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
      });
  } catch (err) {
    console.error(err);
    return api.sendMessage("❌ Koi error aa gaya profile picture laate waqt.", event.threadID, event.messageID);
  }
};
