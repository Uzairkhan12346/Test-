const fs = require("fs");

module.exports.config = {
  name: "jumma",
  version: "2.1.2",
  hasPermssion: 0,
  credits: "uzairrajput",
  description: "Responds to Jumma Mubarak messages",
  commandCategory: "no prefix",
  cooldowns: 5,
};

module.exports.handleEvent = async ({ api, event, Users }) => {
  const { threadID, messageID, senderID, body } = event;

  if (!body) return;

  const react = body.toLowerCase();

  if (
    react.includes("jumma") ||
    react.includes("jumma mubarak") ||
    react.includes("جمعہ مبارک") ||
    react.includes("happy friday")
  ) {
    const name = await Users.getNameUser(senderID);

    // Gender detection via name (simple assumption)
    let title = "Bhai";
    const lowerName = name.toLowerCase();

    // Assume female if name has common girl name endings (you can improve this)
    if (
      lowerName.endsWith("a") ||
      lowerName.endsWith("i") ||
      lowerName.includes("khanum") ||
      lowerName.includes("bibi") ||
      lowerName.includes("fatima") ||
      lowerName.includes("zainab") ||
      lowerName.includes("aneesa")
    ) {
      title = "Baby";
    }

    const msg = {
      body: `✨🌙 *${name} ${title}!* 🌙✨\n\n💚 𝐀𝐩𝐤𝐨 𝐨𝐫 𝐚𝐩𝐤𝐢 𝐟𝐚𝐦𝐢𝐥𝐲 𝐤𝐨 𝐉𝐮𝐦𝐦𝐚𝐡 𝐌𝐮𝐛𝐚𝐫𝐚𝐤 💚\n\n𝐑𝐚𝐛𝐛 𝐚𝐩𝐤𝐢 𝐡𝐚𝐫 𝐝𝐮𝐚 𝐪𝐮𝐛𝐨𝐨𝐥 𝐤𝐚𝐫𝐞 🤲\n𝐊𝐡𝐮𝐬𝐡𝐢𝐲𝐨𝐧, 𝐑𝐚𝐡𝐦𝐚𝐭𝐨𝐧 𝐨𝐫 𝐁𝐚𝐫𝐚𝐤𝐚𝐭𝐨𝐧 𝐰𝐚𝐥𝐚 𝐝𝐢𝐧 𝐡𝐨 💫`,
      attachment: fs.createReadStream(__dirname + `/uzair/jumma.jpeg`)
    };

    api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🌸", messageID, () => {}, true);
  }
};

module.exports.run = async () => {};
