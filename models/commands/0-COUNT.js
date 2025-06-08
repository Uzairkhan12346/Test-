const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "miss",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "uzairrajput",
  description: "Auto-reply on 'miss you'",
  commandCategory: "no prefix",
  cooldowns: 2,
};

module.exports.handleEvent = async ({ api, event, Users }) => {
  const name = await Users.getNameUser(event.senderID);
  const { threadID, messageID, body } = event;

  if (!body) return;
  const react = body.toLowerCase();

  if (
    react.includes("miss") ||
    react.includes("miss you") ||
    react.includes("i miss you")
  ) {
    const replies = [
      `🥹 ${name}, Yaad aayi tumhari! 💔`,
      `🌸 ${name}, miss kar rahe hain aapko!`,
    ];

    const randomMsg = replies[Math.floor(Math.random() * replies.length)];

    // GIF Path Fix
    const gifFolder = path.join(__dirname, "../Uzair");
    const gifFiles = fs.readdirSync(gifFolder).filter(f => f.endsWith(".gif"));

    if (gifFiles.length < 6) {
      return api.sendMessage("❗ Kam se kam 6 GIFs chahiye the folder me.", threadID, messageID);
    }

    const gifPath = path.join(gifFolder, gifFiles[Math.floor(Math.random() * gifFiles.length)]);

    api.sendMessage(
      {
        body: randomMsg,
        attachment: fs.createReadStream(gifPath)
      },
      threadID,
      messageID
    );
  }
};

module.exports.run = () => {};
