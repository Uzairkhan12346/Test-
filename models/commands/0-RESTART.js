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
  credits: "uzairrajput",
  description: "Restart the Bot",
  commandCategory: "system",
  usages: "restart",
  cooldowns: 5,
  usePrefix: false
};

// 🔒 Credit Lock - Ye check ab config set hone ke baad hai
if (config.credits !== "uzairrajput") {
  console.log("\n❌ Aray oye! Tumne script ka credit change kar diya 😡");
  console.log("📛 Sirf 'uzairrajput' is script ka asli creator hai.");
  console.log("💥 Ab bot khud ko band kar raha hai...");
  process.exit(1);
}

module.exports.config = config;

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
