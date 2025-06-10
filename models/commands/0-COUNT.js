const fs = require("fs");

module.exports.config = {
  name: "gana",
  version: "1.1.1",
  hasPermssion: 0,
  credits: "uzairrajput", 
  description: "Just Respond",
  commandCategory: "no prefix",
  cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  const { threadID, messageID, senderID, body } = event;
  const react = body.toLowerCase();

  if (
    react.includes("gana") ||
    react.includes("song") ||
    react.includes("music")
  ) {
    api.getUserInfo(senderID, (err, result) => {
      if (err) return console.error(err);
      const name = result[senderID].name;

      const msg = {
        body: `🌸 𝐇𝐞𝐲  @${name} 🌸\n\n𝐀𝐠𝐚𝐫 𝐀𝐩𝐧𝐞 𝐣𝐨 [🎵 𝐒𝐨𝐧𝐠] 𝐬𝐮𝐧𝐚 𝐡𝐚𝐢 𝐭𝐰 𝐩𝐡𝐥𝐞 𝐮𝐬𝐤𝐚 𝐧𝐚𝐦𝐞 𝐥𝐢𝐤𝐡𝐞𝐢𝐧 🙂🖐️\n.𝐌𝐮𝐬𝐢𝐜 𝐚𝐨 𝐫𝐚𝐣𝐚 𝐀𝐢𝐬𝐞\n\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•`,
        mentions: [{
          tag: `@${name}`,
          id: senderID
        }]
      };

      api.sendMessage(msg, threadID, messageID);
      api.setMessageReaction("🎧", messageID, (err) => {}, true);
    });
  }
};

module.exports.run = function({ api, event, client, __GLOBAL }) {};
