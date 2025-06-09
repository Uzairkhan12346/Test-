const fs = require("fs");
const axios = require("axios");
const path = require("path");

const dataPath = path.join(__dirname, "lockData.json");
const imageDir = path.join(__dirname, "uzair");

// Folder create if not exists
if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir);

// Load lock data from file if exists
let lockData = {};
if (fs.existsSync(dataPath)) {
  lockData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
}

function saveLockData() {
  fs.writeFileSync(dataPath, JSON.stringify(lockData, null, 2));
}

function getImageExtension(contentType) {
  if (contentType.includes("jpeg")) return ".jpg";
  if (contentType.includes("png")) return ".png";
  return ".jpg"; // default fallback
}

module.exports.config = {
  name: "lockgroup",
  version: "3.0.0",
  hasPermssion: 1,
  credits: "Uzair🔥",
  description: "Group name, emoji aur image lock karo permanently",
  commandCategory: "group",
  usages: "[on/off]",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  const threadID = event.threadID;

  if (!args[0]) return api.sendMessage("⚠️ Use: lockgroup on/off", threadID);

  if (args[0].toLowerCase() === "on") {
    try {
      const threadInfo = await api.getThreadInfo(threadID);
      const groupName = threadInfo.threadName;
      const groupEmoji = threadInfo.emoji || null;
      const groupImageSrc = threadInfo.imageSrc;

      let imagePath = null;

      if (groupImageSrc) {
        const response = await axios.get(groupImageSrc, { responseType: "arraybuffer" });
        const contentType = response.headers["content-type"];
        const ext = getImageExtension(contentType);

        imagePath = path.join(imageDir, `group_${threadID}${ext}`);
        fs.writeFileSync(imagePath, Buffer.from(response.data, "binary"));
      }

      lockData[threadID] = {
        name: groupName,
        emoji: groupEmoji,
        image: imagePath
      };
      saveLockData();

      return api.sendMessage(`🔒 Group locked!\nNaam, emoji, aur image ab auto-reset honge.`, threadID);
    } catch (err) {
      console.log("❌ Error locking group:", err);
      return api.sendMessage("❌ Lock fail hogaya. Error aaya!", threadID);
    }
  }

  if (args[0].toLowerCase() === "off") {
    if (!lockData[threadID]) return api.sendMessage("🔓 Group pe pehle se lock nahi tha.", threadID);

    if (lockData[threadID].image && fs.existsSync(lockData[threadID].image)) {
      fs.unlinkSync(lockData[threadID].image);
    }

    delete lockData[threadID];
    saveLockData();
    return api.sendMessage("🔓 Group lock hata diya gaya.", threadID);
  }

  return api.sendMessage("⚠️ Format: lockgroup on/off", threadID);
};

module.exports.handleEvent = async function ({ api, event }) {
  const threadID = event.threadID;
  if (!lockData[threadID]) return;

  try {
    const threadInfo = await api.getThreadInfo(threadID);
    const { name: lockedName, emoji: lockedEmoji, image: lockedImagePath } = lockData[threadID];

    const currentName = threadInfo.threadName;
    const currentEmoji = threadInfo.emoji || null;
    const currentImage = threadInfo.imageSrc;

    // Name Reset
    if (currentName !== lockedName) {
      await api.setTitle(lockedName, threadID);
      api.sendMessage(`📝 Group name change hua tha.\nWapas set kar diya gaya.`, threadID);
    }

    // Emoji Reset
    if (lockedEmoji !== currentEmoji) {
      await api.changeThreadEmoji(lockedEmoji || "", threadID);
      api.sendMessage(`🙂 Emoji change hua tha.\nWapas laga diya gaya.`, threadID);
    }

    // Image Reset
    if (lockedImagePath && fs.existsSync(lockedImagePath)) {
      const lockedBuffer = fs.readFileSync(lockedImagePath);

      if (!currentImage) {
        await api.changeGroupImage(fs.createReadStream(lockedImagePath), threadID);
        api.sendMessage("🖼️ Group image delete kar di gayi thi.\nWapas laga di gayi.", threadID);
      } else {
        const response = await axios.get(currentImage, { responseType: "arraybuffer" });
        const currentBuffer = Buffer.from(response.data, "binary");

        if (!currentBuffer.equals(lockedBuffer)) {
          await api.changeGroupImage(fs.createReadStream(lockedImagePath), threadID);
          api.sendMessage("🖼️ Group image change hui thi.\nWapas original image laga di gayi.", threadID);
        }
      }
    }

  } catch (err) {
    console.log("❌ Error in handleEvent:", err.message);
  }
};
