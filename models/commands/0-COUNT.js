const axios = require("axios");
const fs = require("fs");
const login = require("fca-mtx-uzair");

const config = {
  name: "coverdp",
  aliases: ["cover", "cp"],
  author: "Uzair",
  description: "Get Facebook cover photo (public/private)",
  usePrefix: true,
  role: 0,
  cooldowns: 5,
};

const onStart = async ({ api, event, args }) => {
  try {
    const appState = JSON.parse(fs.readFileSync("./Uzair.json", "utf8"));

    login({ appState }, async (err, fcaApi) => {
      if (err) {
        return api.sendMessage("❌ Login failed. Invalid AppState.", event.threadID, event.messageID);
      }

      let uid;

      // Detect user ID
      if (args[0]) {
        if (/^\d+$/.test(args[0])) {
          uid = args[0];
        } else {
          const match = args[0].match(/profile\.php\?id=(\d+)/);
          if (match) uid = match[1];
        }
      }

      if (!uid) {
        uid = event.messageReply?.senderID || Object.keys(event.mentions)[0] || event.senderID;
      }

      // Get access token
      const token = fcaApi.getAccessToken?.();
      if (!token) return api.sendMessage("❌ Can't get access token.", event.threadID, event.messageID);

      // Get cover photo via Graph API
      const res = await axios.get(`https://graph.facebook.com/${uid}?fields=cover&access_token=${token}`);
      const coverUrl = res.data?.cover?.source;

      if (!coverUrl) {
        return api.sendMessage("❌ Cover photo not found.", event.threadID, event.messageID);
      }

      // Stream and send
      const imgStream = await axios.get(coverUrl, { responseType: "stream" });

      api.sendMessage({
        body: `🖼️ Facebook Cover of UID: ${uid}`,
        attachment: imgStream.data,
      }, event.threadID, event.messageID);
    });

  } catch (e) {
    console.log(e);
    api.sendMessage("❌ Error occurred while fetching cover photo.", event.threadID, event.messageID);
  }
};

module.exports = {
  config,
  onStart,
};
