const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "getcover",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "uzairrajput",
  description: "Get cover photo by Facebook UID",
  commandCategory: "tools",
  usages: "[uid]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const uid = args[0] || event.senderID;

  if (!/^\d+$/.test(uid)) {
    return api.sendMessage("❌ Valid Facebook UID do bhai!", event.threadID, event.messageID);
  }

  try {
    const res = await axios.get(`https://graph.facebook.com/${uid}?fields=cover&access_token=350685531728|62f8ce9f74b12f84c123cc23437a4a32`);
    const coverUrl = res.data.cover?.source;

    if (!coverUrl) {
      return api.sendMessage("😕 Cover photo nahi mili!", event.threadID, event.messageID);
    }

    const coverPath = path.join(__dirname, "cache", `cover_${uid}.jpg`);
    const response = await axios.get(coverUrl, { responseType: "stream" });

    response.data.pipe(fs.createWriteStream(coverPath));
    response.data.on("end", () => {
      api.sendMessage({
        body: `📷 𝐂𝐨𝐯𝐞𝐫 𝐩𝐡𝐨𝐭𝐨 𝐨𝐟 𝐔𝐈𝐃: ${uid}`,
        attachment: fs.createReadStream(coverPath)
      }, event.threadID, () => fs.unlinkSync(coverPath), event.messageID);
    });
  } catch (err) {
    console.error(err);
    return api.sendMessage("❌ Error aagayi bhai! UID sahi hai ya cover public hai kya?", event.threadID, event.messageID);
  }
};
