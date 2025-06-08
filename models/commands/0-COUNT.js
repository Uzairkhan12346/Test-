const fs = require("fs");

module.exports.config = {
  name: "mtx aa gya",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "uzairrajput", 
  description: "Boss ke liye voice, dusron ke liye text welcome",
  commandCategory: "no prefix",
  usages: "auto welcome",
  cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event }) {
  const { threadID, messageID, senderID, body } = event;
  if (!body) return;

  const bossUID = "61552682190483";
  const msgText = body.toLowerCase();

  // ✅ 1. Boss UID wale ka "I'm agya" voice welcome
  if (
    senderID == bossUID &&
    (
      msgText.includes("me agai") ||
      msgText.includes("me agya") ||
      msgText.includes("i'm agya") ||
      msgText.includes("𝑴𝑻𝑿 💚✨")
    )
  ) {
    const msg = {
      body: "Welcome boss🙈",
      attachment: fs.createReadStream(__dirname + `/uzair/dk.mp3`)
    };
    api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😘", messageID, (err) => {}, true);
  }

  // ✅ 2. Kisi ne kaha "mera bhi welcome karo" to 6 text welcome msgs
  if (
    msgText.includes("mera bhi welcome karo") ||
    msgText.includes("mujhe bhi welcome karo") ||
    msgText.includes("mere liye welcome") ||
    msgText.includes("welcome for me")
  ) {
    const welcomeMessages = [
      "🌟 Welcome to the group!",
      "👋 Khush aamdeed dost!",
      "😊 Bohat khushi hui apko dekh kar!",
      "🎉 Apki aamad se roshni hogayi!",
      "🤗 Group mein apka dil se swagat hai!",
      "🔥 Mazaa aa gaya! Welcome yaar!"
    ];

    // Send all 6 welcome messages one by one
    for (let i = 0; i < welcomeMessages.length; i++) {
      setTimeout(() => {
        api.sendMessage(welcomeMessages[i], threadID);
      }, i * 1000); // 1 second gap between messages
    }
  }
};

module.exports.run = function() {
  // Manual run not needed
};
