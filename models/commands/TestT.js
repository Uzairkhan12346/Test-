const axios = require("axios");
const fs = require("fs-extra");

module.exports.config = {
  name: "drivevideo",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "uzairjani",
  description: "Send Google Drive video",
  commandCategory: "media",
  usages: "drivevideo",
  cooldowns: 3,
};

module.exports.run = async function({ api, event }) {
  const fileId = "17cMrCKTCqAbbHNcI5Gk-vzC8aCHFIdpk"; // 🟢 Replace this ID for new videos
  const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
  const path = __dirname + `/cache/drivevideo.mp4`;

  try {
    const res = await axios.get(url, { responseType: "arraybuffer" });
    fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));

    return api.sendMessage({
      body: "💖 Yeh rahi tumhari video baby!",
      attachment: fs.createReadStream(path),
    }, event.threadID, () => fs.unlinkSync(path));
  } catch (e) {
    return api.sendMessage("❌ Video download failed!", event.threadID);
  }
};
