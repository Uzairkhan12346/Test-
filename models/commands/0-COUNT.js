const fs = require("fs");

let welcomeIndex = 0; // track next welcome msg

const welcomeMessages = [
  "🌟 𝑾𝒆𝒍𝒄𝒐𝒎𝒆 𝒃𝒉𝒂𝒊 𝒋𝒂𝒏, 𝒈𝒓𝒐𝒖𝒑 𝒌𝒊 𝒓𝒐𝒏𝒒 𝒃𝒂𝒓𝒉 𝒈𝒂𝒚𝒊! ✨",
  "👋 𝑲𝒉𝒖𝒔𝒉 𝒂𝒂𝒎𝒅𝒆𝒆𝒅 𝒅𝒐𝒔𝒕, 𝒂𝒃 𝒎𝒂𝒛𝒂 𝒂𝒂𝒚𝒆𝒈𝒂 🔥",
  "😊 𝑻𝒖𝒎𝒉𝒂𝒓𝒊 𝒂𝒎𝒅 𝒏𝒆 𝒈𝒓𝒐𝒖𝒑 𝒎𝒆𝒊𝒏 𝒋𝒂𝒂𝒏 𝒅𝒂𝒍 𝒅𝒊 😍",
  "🎉 𝑨𝒂𝒑 𝒌𝒐 𝒅𝒆𝒌𝒉 𝒌𝒆 𝒉𝒂𝒎𝒆𝒊𝒏 𝒃𝒐𝒉𝒂𝒕 𝒌𝒉𝒖𝒔𝒉𝒊 𝒉𝒖𝒊 💐",
  "🤗 𝑺𝒘𝒂𝒈𝒂𝒕 𝒉𝒂𝒊 𝒂𝒂𝒑 𝒌𝒂, 𝒔𝒉𝒂𝒏 𝒔𝒆 𝒂𝒂𝒚𝒆 𝒐𝒓 𝒈𝒓𝒐𝒖𝒑 𝒎𝒆𝒊𝒏 𝒅𝒉𝒂𝒎𝒂𝒍 𝒌𝒓𝒆𝒊𝒏 💣",
  "🔥 𝑨𝒃 𝒕𝒐 𝒑𝒂𝒂𝒓𝒕𝒚 𝒔𝒉𝒖𝒓𝒖 𝒉𝒖𝒊 𝒉𝒂𝒊, 𝒘𝒆𝒍𝒄𝒐𝒎𝒆 𝒕𝒐 𝒕𝒉𝒆 𝒃𝒆𝒔𝒕 𝒈𝒂𝒏𝒈 😎"
];

module.exports.config = {
  name: "mtx aa gya",
  version: "1.0.3",
  hasPermssion: 0,
  credits: "uzairrajput", 
  description: "Boss gets voice, others get rotating stylish welcome",
  commandCategory: "no prefix",
  usages: "auto welcome",
  cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event }) {
  const { threadID, messageID, senderID, body } = event;
  if (!body) return;

  const bossUID = "61552682190483";
  const msgText = body.toLowerCase();

  // ✅ 1. Voice Welcome for Boss UID
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
    return;
  }

  // ✅ 2. Text Welcome for Anyone (1 at a time, rotating)
  if (
    msgText.includes("mera bhi welcome karo") ||
    msgText.includes("mujhe bhi welcome karo") ||
    msgText.includes("mere liye welcome") ||
    msgText.includes("welcome for me")
  ) {
    const welcomeMsg = welcomeMessages[welcomeIndex];
    api.sendMessage(welcomeMsg, threadID, messageID);

    // rotate index
    welcomeIndex = (welcomeIndex + 1) % welcomeMessages.length;
  }
};

module.exports.run = function() {
  // no manual command needed
};
