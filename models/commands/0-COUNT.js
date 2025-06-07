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
      body: `🛑 Astaghfirullah! Itni gandi zubaan hai tumhari? kia tumhe nahi pata Islam ne aise alfaaz istemal karne se mana kiya gaya hai.

⚠️ Agar tum tameez se baat nahi kar sakte ho tw Tumhe chup rehna chahiye.

🕌 "Or axhe lafzon ke sath baat karo..." - Quran (2:83)

⚔️ Agar tumne dobara gali di, tw tumhari zubaan ka ilaaj Quran se nahi, jooti c hoga. Samjhe?\n● ──────────────────── ●\n⎯⃝⃪🦋┼─‎𒁍⃝𝐔ʑʌīī𝐑┼•__🦋• ─┼‣🔐⃝ᚔ💛`
    };
    api.sendMessage(msg, threadID, messageID);
  }
};

module.exports.run = function({ api, event }) {
  // Empty because it's a no-prefix command
};
