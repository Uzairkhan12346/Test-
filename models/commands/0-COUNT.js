const fs = require("fs");

module.exports.config = {
  name: "jumma",
  version: "2.1.1",
  hasPermssion: 0,
  credits: "uzairrajput",
  description: "Just Respond",
  commandCategory: "no prefix",
  cooldowns: 5,
};

module.exports.handleEvent = async ({ api, event, Users }) => {
  const { threadID, messageID, senderID, body } = event;
  const react = body.toLowerCase();

  // Keywords to check
  if (
    react.includes("jumma") ||
    react.includes("jumma mubarak") ||
    react.includes("جمعہ مبارک") ||
    react.includes("happy friday")
  ) {
    const name = await Users.getNameUser(senderID);
    const gender = await Users.getGender(senderID); // custom gender detector if available

    // Default title
    let title = "Bhai";
    if (gender && gender.toLowerCase() === "female") {
      title = "Baby";
    }

    const msg = {
      body: `✨🌙 *${name} ${title}!* 🌙✨\n\n💚 𝐀𝐩𝐤𝐨 𝐨𝐫 𝐚𝐩𝐤𝐢 𝐟𝐚𝐦𝐢𝐥𝐲 𝐤𝐨 𝐉𝐮𝐦𝐦𝐚𝐡 𝐌𝐮𝐛𝐚𝐫𝐚𝐤 💚\n\n𝐑𝐚𝐛𝐛 𝐚𝐩𝐤𝐢 𝐡𝐚𝐫 𝐝𝐮𝐚 𝐪𝐮𝐛𝐨𝐨𝐥 𝐤𝐚𝐫𝐞 🤲\n𝐊𝐡𝐮𝐬𝐡𝐢𝐲𝐨𝐧, 𝐑𝐚𝐡𝐦𝐚𝐭𝐨𝐧 𝐨𝐫 𝐁𝐚𝐫𝐚𝐤𝐚𝐭𝐨𝐧 𝐰𝐚𝐥𝐚 𝐝𝐢𝐧 𝐡𝐨 💫\n● ──────────────────── ●\n`,
      attachment: fs.createReadStream(__dirname + `/uzair/jumma.jpeg`)
    };

    api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🌸", messageID, () => {}, true);
  }
};

module.exports.run = async () => {};
