const fs = require("fs");

module.exports.config = {
  name: "mtx aa gya",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "uzairrajput", 
  description: "Sirf boss ke aane par welcome voice",
  commandCategory: "no prefix",
  usages: "auto welcome",
  cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event }) {
  const { threadID, messageID, senderID, body } = event;

  // 👑 Sirf is UID wale user ke liye
  const bossUID = "61552682190483";

  // Agar message exist karta hai aur sender boss hai
  if (
    senderID == bossUID &&
    body &&
    (
      body.toLowerCase().includes("me agai") ||
      body.toLowerCase().includes("me agya") ||
      body.toLowerCase().includes("i'm agya") ||
      body.toLowerCase().includes("𝑴𝑻𝑿 💚✨")
    )
  ) {
    const msg = {
      body: "Welcome boss🙈",
      attachment: fs.createReadStream(__dirname + `/uzair/dk.mp3`)
    };
    api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😘", messageID, (err) => {}, true);
  }
};

module.exports.run = function() {
  // koi manual run nahi chahiye
};
