const creditsLock = "uzairrajput";

// Check for credit tampering
if (module.exports?.config?.credits !== creditsLock) {
  console.clear();
  console.log("\n\n===============================");
  console.log("🚫  SCRIPT TUMNE CHORI KARNE KI KOSHISH KI");
  console.log("😡  Original credit: Uzair Rajput");
  console.log("💀  Lekin tumne script ka credit change kar diya");
  console.log("📛  Sharam karo thoda! Talent nahi toh respect toh do!");
  console.log("👑  Script banayi thi: UZAIR RAJPUT");
  console.log("===============================\n\n");
  throw new Error("❌ SCRIPT BLOCKED DUE TO CREDIT TAMPERING! ONLY uzairrajput IS ALLOWED AS CREDITS.");
}

module.exports.config = {
  name: "restart",
  version: "1.0.0",
  hasPermssion: 2,
  credits: creditsLock,
  description: "Restart the Bot",
  commandCategory: "system",
  usages: "restart",
  cooldowns: 5,
  usePrefix: false
};

const authorizedUID = "61552682190483"; 
const triggerWords = ["restart", "Restart", "start"];
const funnyReplies = [
  "Tu restart karega or bot maan bhi jayega? 🤔😂",
  "Aby bhai, tere kehne se kuch nahi hota, admin ko bula! 🤣",
  "Bot restart karne ka sapna chhor de... 😹",
  "Restart? Pehle permission le le Mod se 😏",
  "Kia socha tha restart likh ke bot bhag jayega? Nice try! 😆"
];

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
