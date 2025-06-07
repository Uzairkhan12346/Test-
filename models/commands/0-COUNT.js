const fs = require("fs");
module.exports.config = {
  name: "gali",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "uzairrajput",
  description: "no prefix",
  commandCategory: "no prefix",
  usages: "auto reply to bad words",
  cooldowns: 5,
};

module.exports.handleEvent = function({ api, event }) {
  const { threadID, messageID, body } = event;
  const badWords = [
    "fuck", "mc", "chot", "chutiya", "bc", "maa ki chut",
    "bhen chod", "behen chod", "🖕", "madarchod", "chudi", "gand mara"
  ];

  const msgLower = body.toLowerCase();
  const isGali = badWords.some(word => msgLower.startsWith(word));

  if (isGali) {
    const msg = {
      body: `🛑 Astaghfirullah! Itni gandi zubaan hai tumhari? Islam ne aise alfaaz se mana kiya gaya hai.

⚠️ Agar tameez se baat nahi kar sakte ho tw Tumhe chup rehna chahiye.

🕌 "Or achey lafzon se baat karo..." - Quran (2:83)

⚔️ Dobara gali di, to zubaan ka ilaaj Quran se nahi, jooti se hoga. Samjhe?`
    };
    api.sendMessage(msg, threadID, messageID);
  }
};

module.exports.run = function({ api, event }) {
  // Empty because it's a no-prefix command
};
