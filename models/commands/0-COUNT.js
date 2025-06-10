const axios = require('axios');

module.exports.config = {
  name: "cover",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "uzairrajput",
  description: "Get Facebook user's cover photo",
  commandCategory: "info",
  usages: "[uid or mention]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const mention = Object.keys(event.mentions)[0];
  const uid = mention || args[0] || event.senderID;

  try {
    const res = await axios.get(`https://graph.facebook.com/${uid}?fields=cover&access_token=350685531728|62f8ce9f74b12f84c123cc23437a4a32`);
    
    if (res.data.cover && res.data.cover.source) {
      const coverUrl = res.data.cover.source;
      return api.sendMessage({ body: "✅ 𝗖𝗼𝘃𝗲𝗿 𝗣𝗵𝗼𝘁𝗼 𝗙𝗲𝘁𝗰𝗵𝗲𝗱:", attachment: await global.utils.getStreamFromURL(coverUrl) }, event.threadID);
    } else {
      return api.sendMessage("❌ Cover photo not found or is private.", event.threadID);
    }

  } catch (err) {
    return api.sendMessage("❌ Error: " + err.message, event.threadID);
  }
};
