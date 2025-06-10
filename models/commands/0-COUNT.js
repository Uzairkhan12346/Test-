const axios = require("axios");
const fs = require("fs");
const login = require("fca-mtx-uzair");

const config = {
  name: "coverdp",
  aliases: ["cp", "cover"],
  author: "Uzair",
  description: "Get Facebook Cover Photo (public or private)",
  usePrefix: true,
  role: 0,
  cooldowns: 5,
};

const onStart = async ({ api, event, args }) => {
  try {
    const appState = JSON.parse(fs.readFileSync("./Uzair.json", "utf8"));

    login({ appState }, async (err, fcaApi) => {
      if (err) return api.sendMessage("❌ FCA login failed.", event.threadID, event.messageID);

      let uid;

      if (args[0]) {
        if (/^\d+$/.test(args[0])) {
          uid = args[0];
        } else {
          const match = args[0].match(/profile\.php\?id=(\d+)/);
          if (match) uid = match[1];
        }
      }

      if (!uid) {
        uid =
          event.type === "message_reply"
            ? event.messageReply.senderID
            : Object.keys(event.mentions)[0] || event.senderID;
      }

      const token = fcaApi.getAccessToken?.();
      if (!token) {
        return api.sendMessage("❌ Unable to get access token from FCA.", event.threadID, event.messageID);
      }

      const res = await axios.get(`https://graph.facebook.com/${uid}?fields=cover&access_token=${token}`);

      if (!res.data?.cover?.source) {
        return api.sendMessage("❌ Cover photo not found (user may not have one).", event.threadID, event.messageID);
      }

      const image = await axios.get(res.data.cover.source, { responseType: "stream" });

      return api.sendMessage(
        {
          body: `🖼️ Cover Photo of UID: ${uid}`,
          attachment: image.data,
        },
        event.threadID,
        event.messageID
      );
    });
  } catch (err) {
    console.error("CoverDP Error:", err);
    api.sendMessage("❌ Error occurred while fetching cover photo.", event.threadID, event.messageID);
  }
};

module.exports = {
  config,
  onStart,
};
