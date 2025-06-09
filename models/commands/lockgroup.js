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

module.exports.config = {
  name: "lockgroup",
  version: "2.0.0",
  hasPermssion: 1,
  credits: "Uzair🔥",
  description: "Group ka name, photo aur emoji lock karo aur auto reset karo (persistent)",
  commandCategory: "group",
  usages: "[on/off]",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  const threadID = event.threadID;

  if (!args[0]) return api.sendMessage("⚠️ Use karo: lockgroup on/off", threadID);

  if (args[0].toLowerCase() === "on") {
    try {
      const threadInfo = await api.getThreadInfo(threadID);
      const groupName = threadInfo.threadName;
      const groupEmoji = threadInfo.emoji || null;
      const groupImageSrc = threadInfo.imageSrc;
      let imagePath = null;

      // Group image save karo agar hai
      if (groupImageSrc) {
        const img = await axios.get(groupImageSrc, { responseType: "arraybuffer" });
        imagePath = path.join(imageDir, `group_${threadID}.jpg`);
        fs.writeFileSync(imagePath, Buffer.from(img.data, "binary"));
      }

      lockData[threadID] = {
        name: groupName,
        image: imagePath,
        emoji: groupEmoji
      };
      saveLockData();

      return api.sendMessage(`🔒 Group ka naam, photo aur emoji ab LOCK ho chuke hain!\n🔁 Koi change karega toh wapas reset ho jaayega.`, threadID);
    } catch (err) {
      console.log(err);
      return api.sendMessage("❌ Lock fail hogaya! Kuch masla aagaya.", threadID);
    }
  }

  if (args[0].toLowerCase() === "off") {
    if (!lockData[threadID]) return api.sendMessage("🚫 Group pe pehle se lock nahi laga hua!", threadID);

    if (lockData[threadID].image && fs.existsSync(lockData[threadID].image)) {
      fs.unlinkSync(lockData[threadID].image);
    }

    delete lockData[threadID];
    saveLockData();

    return api.sendMessage("🔓 Lock hata diya gaya! Ab koi bhi name, photo ya emoji change kar sakta hai.", threadID);
  }

  return api.sendMessage("⚠️ Sahi format use karo: lockgroup on/off", threadID);
};

module.exports.handleEvent = async function ({ api, event }) {
  const threadID = event.threadID;
  if (!lockData[threadID]) return;

  try {
    const threadInfo = await api.getThreadInfo(threadID);
    const currentName = threadInfo.threadName;
    const currentEmoji = threadInfo.emoji || null;
    const currentImage = threadInfo.imageSrc;

    const { name: lockedName, image: lockedImagePath, emoji: lockedEmoji } = lockData[threadID];

    // 🔁 Name reset
    if (currentName !== lockedName) {
      await api.setTitle(lockedName, threadID);
      api.sendMessage(`📝 Group name change hua tha.\nWapas "${lockedName}" set kar diya.`, threadID);
    }

    // 🙂 Emoji reset
    if (currentEmoji !== lockedEmoji) {
      await api.changeThreadEmoji(lockedEmoji || "", threadID);
      api.sendMessage(`🙂 Group emoji change hua tha.\nWapas "${lockedEmoji || 'remove'}" kar diya.`, threadID);
    }

    // 🖼️ Image reset
    if (lockedImagePath && fs.existsSync(lockedImagePath)) {
      const lockedBuffer = fs.readFileSync(lockedImagePath);

      if (!currentImage) {
        await api.changeGroupImage(fs.createReadStream(lockedImagePath), threadID);
        api.sendMessage("🖼️ Group ki photo delete kar di gayi thi.\nWapas original photo laga di gayi.", threadID);
      } else {
        const currentImgRes = await axios.get(currentImage, { responseType: "arraybuffer" });
        const currentBuffer = Buffer.from(currentImgRes.data, "binary");

        if (!currentBuffer.equals(lockedBuffer)) {
          await api.changeGroupImage(fs.createReadStream(lockedImagePath), threadID);
          api.sendMessage("🖼️ Group ki photo badli gayi thi.\nWapas original photo laga di gayi.", threadID);
        }
      }
    }

  } catch (err) {
    console.log("❌ Error in lockgroup handleEvent:", err.message);
  }
};
