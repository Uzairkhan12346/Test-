const path = require('path');
const fs = require('fs');
const axios = require('axios');
const { createCanvas, loadImage } = require('canvas');

// Cache directory setup
const cacheDir = path.join(__dirname, 'cache', 'rankup');
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true }); // Recursive directory creation
}

// Module configuration
module.exports.config = {
  name: "uzairkiran",
  version: "7.3.2",
  hasPermssion: 1,
  credits: "uzairrajput",
  description: "Group aur user ke liye rank-up announce karta hai",
  usePrefix: true,
  commandCategory: "Edit-IMG",
  dependencies: {
    "axios": "",
    "canvas": ""
  },
  cooldowns: 2,
};

// Handle rank-up event
module.exports.handleEvent = async function ({ api, event, Currencies, Users, getText }) {
  const { threadID, senderID } = event;
  const pathImg = path.join(cacheDir, 'rankup.png');
  const pathAvt = path.join(cacheDir, 'avatar.png');

  // Thread settings
  const thread = global.data.threadData.get(threadID) || {};

  // Experience update
  let userData = await Currencies.getData(senderID);
  let exp = userData.exp || 0;
  exp += 1;

  if (isNaN(exp)) {
    console.error("Exp invalid hai:", exp);
    return;
  }

  // Rank-up off hai to return
  if (thread["rankup"] === false) {
    await Currencies.setData(senderID, { exp });
    return;
  }

  // Level calculation
  const curLevel = Math.floor((Math.sqrt(1 + (4 * exp / 3) + 1) / 2));
  const newLevel = Math.floor((Math.sqrt(1 + (4 * (exp + 1) / 3) + 1) / 2));

  if (newLevel > curLevel && newLevel !== 1) {
    const name = global.data.userName.get(senderID) || await Users.getNameUser(senderID);

    // Time aur date for rank-up
    const now = new Date();
    const timeString = now.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: 'Asia/Karachi' // Pakistan timezone
    });
    const dateString = now.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    // Message customization
    let message = thread.customRankup || getText("levelup") || "{name}, aap ka level {level} ho gaya hai!";
    message = message
      .replace(/\{name}/g, name)
      .replace(/\{level}/g, newLevel)
      .replace(/\{time}/g, timeString)
      .replace(/\{date}/g, dateString);

    // Background images
    const backgrounds = [
      "https://i.imgur.com/mXmaIFr.jpeg",
      "https://i.imgur.com/SeLdZua.jpeg",
      "https://i.imgur.com/HrHPulp.jpeg",
      "https://i.imgur.com/zZpub9k.jpeg",
      "https://i.imgur.com/EP7gdQy.jpeg",
      "https://i.imgur.com/pKOgCjs.jpeg",
      "https://i.imgur.com/1jPLnZX.jpeg",
      "https://i.imgur.com/QmtNkyQ.jpg",
      "https://i.imgur.com/qybgIRD.jpg",
      "https://i.imgur.com/RFRARpY.jpg",
      "https://i.imgur.com/B7i6dhL.jpg",
      "https://i.imgur.com/LkHUQMJ.jpeg"
    ];
    const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];

    try {
      // Avatar download
      const avatarResponse = await axios.get(
        `https://graph.facebook.com/${senderID}/picture?width=720&height=720&access_token=${process.env.FB_ACCESS_TOKEN || '6628568379|c1e620fa708a1d5696fb991c1bde5662'}`,
        { responseType: "arraybuffer" }
      );
      fs.writeFileSync(pathAvt, Buffer.from(avatarResponse.data, "utf-8"));

      // Background download
      const bgResponse = await axios.get(randomBg, { responseType: "arraybuffer" });
      fs.writeFileSync(pathImg, Buffer.from(bgResponse.data, "utf-8"));

      // Canvas setup
      const baseImage = await loadImage(pathImg);
      const baseAvt = await loadImage(pathAvt);
      const canvas = createCanvas(baseImage.width, baseImage.height);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.rotate(-25 * Math.PI / 180);
      ctx.drawImage(baseAvt, 27.3, 103, 108, 108);
      ctx.restore();

      // Save and send image
      const imageBuffer = canvas.toBuffer();
      fs.writeFileSync(pathImg, imageBuffer);

      api.sendMessage({
        body: message,
        mentions: [{ tag: name, id: senderID }],
        attachment: fs.createReadStream(pathImg)
      }, threadID, () => {
        // Cleanup
        if (fs.existsSync(pathImg)) fs.unlinkSync(pathImg);
        if (fs.existsSync(pathAvt)) fs.unlinkSync(pathAvt);
      });
    } catch (error) {
      console.error("Rank-up error:", error);
      api.sendMessage("Rank-up image banane mein error! Try again.", threadID);
    }
  }

  // Update experience
  await Currencies.setData(senderID, { exp });
};

// Language support
module.exports.languages = {
  "en": {
    "on": "on",
    "off": "off",
    "successText": "Rank-up notification success!",
    "levelup": "◈━━━━━━━━━━━━━━━━━💚✨\n{name}, Khel abhi khatam nahi hua! Level abhi baki hai!!! 😇🫰🏻\n👉[{level}] 🙊\nRank-up time: {time} on {date}\n◈━━━━━━━━━━━━━━━━━💚✨"
  }
};

// Command to toggle rank-up
module.exports.run = async function ({ api, event, Threads, getText }) {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data || {};

  // Toggle rank-up
  data["rankup"] = !data["rankup"];
  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);

  api.sendMessage(
    `${data["rankup"] ? getText("on") : getText("off")} ${getText("successText")}`,
    threadID,
    messageID
  );
};
