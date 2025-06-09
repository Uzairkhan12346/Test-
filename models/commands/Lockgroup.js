const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");

const dataFolder = path.join(__dirname, "uzair");
const dataFile = path.join(dataFolder, "lockgroup.json");

fs.ensureDirSync(dataFolder);
fs.ensureFileSync(dataFile);

let lockData = {};
try {
  lockData = JSON.parse(fs.readFileSync(dataFile, "utf-8")) || {};
} catch {
  lockData = {};
}

module.exports.config = {
  name: "lockgroup",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "Uzair Rajput Mtx",
  description: "Group ka name, photo, emoji aur theme lock kare",
  commandCategory: "group",
  usages: "[on/off]",
  cooldowns: 5
};

async function saveLockData() {
  fs.writeFileSync(dataFile, JSON.stringify(lockData, null, 2));
}

module.exports.run = async function ({ api, event, args }) {
  const threadID = event.threadID;

  if (!args[0]) return api.sendMessage("🔒 Use: lockgroup on/off", threadID);

  if (args[0].toLowerCase() === "on") {
    try {
      const info = await api.getThreadInfo(threadID);
      const groupName = info.threadName;
      const groupImageSrc = info.imageSrc;
      const emoji = info.emoji;
      const themeID = info.themeID;

      let imagePath = null;

      if (groupImageSrc) {
        const img = await axios.get(groupImageSrc, { responseType: "arraybuffer" });
        imagePath = path.join(dataFolder, `group_${threadID}.jpg`);
        fs.writeFileSync(imagePath, Buffer.from(img.data, "binary"));
      }

      lockData[threadID] = {
        name: groupName,
        image: imagePath,
        emoji,
        themeID
      };
      await saveLockData();

      return api.sendMessage(
        `🔒 Group lock active!\n✅ Naam, photo, emoji aur theme lock kar diye gaye hain.`,
        threadID
      );
    } catch (err) {
      console.log(err);
      return api.sendMessage("⚠️ Lock fail hogaya. Koi error aaya!", threadID);
    }
  }

  if (args[0].toLowerCase() === "off") {
    if (!lockData[threadID]) return api.sendMessage("❌ Ye group pe pehle hi lock nahi tha!", threadID);

    if (lockData[threadID].image) fs.unlinkSync(lockData[threadID].image);
    delete lockData[threadID];
    await saveLockData();
    return api.sendMessage("🔓 Group unlock kar diya gaya.", threadID);
  }

  return api.sendMessage("❌ Invalid option! Use: lockgroup on/off", threadID);
};

module.exports.handleEvent = async function ({ api, event }) {
  const threadID = event.threadID;
  if (!lockData[threadID]) return;

  try {
    const info = await api.getThreadInfo(threadID);
    const currentName = info.threadName;
    const currentImage = info.imageSrc;
    const currentEmoji = info.emoji;
    const currentTheme = info.themeID;

    const { name, image, emoji, themeID } = lockData[threadID];

    if (currentName !== name) {
      await api.setTitle(name, threadID);
      api.sendMessage(`🛑 Group name badla gaya tha. Wapas "${name}" set kar diya.`, threadID);
    }

    if (image && currentImage) {
      const currentImg = await axios.get(currentImage, { responseType: "arraybuffer" });
      const currentBuffer = Buffer.from(currentImg.data, "binary");
      const savedBuffer = fs.readFileSync(image);

      if (!currentBuffer.equals(savedBuffer)) {
        await api.changeGroupImage(fs.createReadStream(image), threadID);
        api.sendMessage(`🖼️ Group photo change hui thi. Wapas original photo set kar di gayi.`, threadID);
      }
    }

    if (emoji !== currentEmoji) {
      await api.changeEmoji(emoji, threadID);
      api.sendMessage(`😀 Emoji change hua tha. Wapas "${emoji}" set kar diya.`, threadID);
    }

    if (themeID !== currentTheme) {
      await api.changeThreadColor(themeID, threadID);
      api.sendMessage(`🎨 Theme badla gaya tha. Wapas locked theme set kar diya.`, threadID);
    }

  } catch (err) {
    console.log("Error in handleEvent (lockgroup):", err.message);
  }
};
