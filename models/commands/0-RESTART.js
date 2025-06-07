const authorizedUID = "61552682190483";

const triggerWords = ["restart", "Restart", "start"];
const funnyReplies = [
  "Tu restart karega or bot maan bhi jayega? 🤔😂",
  "Aby bhai, tere kehne se kuch nahi hota, admin ko bula! 🤣",
  "Bot restart karne ka sapna chhor de... 😹",
  "Restart? Pehle permission le le Mod se 😏",
  "Kya socha tha restart likh ke bot bhag jayega? Nice try! 😆"
];

const config = {
  name: "restart",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "uzairrajp",
  description: "Restart the Bot",
  commandCategory: "system",
  usages: "restart",
  cooldowns: 5,
  usePrefix: false
};

// 🔒 Credit Lock - Ye check ab config set hone ke baad hai
(function () {
  const _0x4db0b3 = [
    Buffer.from("dXphaXJyYWpwdXQ=", "base64").toString("utf-8"), // => "uzairrajput"
    "\n❌ Aray oye! Tumne script ka credit change kar diya 😡",
    "📛 Sirf 'Uzair Mtx' is script ka asli creator hai.",
    "💥 Ab bot khud ko band kar raha hai...",
    "log",
    "exit",
    "credits"
  ];

  if (config[_0x4db0b3[6]] !== _0x4db0b3[0]) {
    console[_0x4db0b3[4]](_0x4db0b3[1]);
    console[_0x4db0b3[4]](_0x4db0b3[2]);
    console[_0x4db0b3[4]](_0x4db0b3[3]);
    process ;
  }

  module["exports"]["config"] = config;
})();

module.exports.handleEvent = async ({ api, event }) => {
  const { body, senderID, threadID } = event;
  if (!body) return;
  const text = body.toLowerCase();

  if (triggerWords.includes(text)) {
    if (senderID === authorizedUID) {
      await api.sendMessage("[ OK ] MTX BOT RESTART HO RAHA HAI 😇✨..!", threadID);
      process.exit(1);
    } else {
      const reply = funnyReplies[Math.floor(Math.random() * funnyReplies.length)];
      return api.sendMessage(reply, threadID);
    }
  }
};

module.exports.run = () => {};
