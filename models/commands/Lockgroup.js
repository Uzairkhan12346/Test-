const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");

module.exports.config = {
  name: "lockgroup",
  version: "3.0.0",
  hasPermssion: 1,
  credits: "Uzair Rajput Mtx",
  description: "Group ka name, photo, emoji aur theme lock karo permanently.",
  commandCategory: "group",
  usages: "[on/off]",
  cooldowns: 5
};

const LOCK_FILE = path.join(__dirname, "cache", "groupLocks.json");
let lockData = {};

// Load lock data from file on startup
if (fs.existsSync(LOCK_FILE)) {
  lockData = JSON.parse(fs.readFileSync(LOCK_FILE, "utf-8"));
}

function saveLockData() {
  fs.writeFileSync(LOCK_FILE, JSON.stringify(lockData, null, 2));
}

module.exports.run = async function ({ api, event, args }) {
  const threadID = event.threadID;

  if (!args[0]) return api.sendMessage("⚠️ Bara-e-meherbani: lockgroup on/off likho!", threadID);

  if (args[0].toLowerCase() === "on") {
    try {
      const threadInfo = await api.getThreadInfo(threadID);
      const groupName = threadInfo.threadName;
      const groupImageSrc = threadInfo.imageSrc;
      const emoji = threadInfo.emoji;
      const themeID = threadInfo.threadThemeID;

      let imagePath = null;

      if (groupImageSrc) {
        const img = await axios.get(groupImageSrc, { responseType: "arraybuffer" });
        imagePath = path.join(__dirname, "cache", `group_${threadID}.jpg`);
        fs.writeFileSync(imagePath, Buffer.from(img.data, "binary"));
      }

      lockData[threadID] = {
        name: groupName,
        image: imagePath,
        emoji: emoji,
        themeID: themeID
      };
      saveLockData();

      return api.sendMessage("🔒 Group ka **Name**, **Photo**, **Emoji** aur **Theme** ab lock ho chuke hain!\n👁️ Kisi ne change kiya toh main turant wapas set kar dunga.", threadID);
    } catch (err) {
      console.log(err);
      return api.sendMessage("❌ Lock laganay mein masla aaya! Thori dair baad koshish karo.", threadID);
    }
  }

  if (args[0].toLowerCase() === "off") {
    if (!lockData[threadID]) return api.sendMessage("⚠️ Bhai! Group pe pehle se lock nahi laga hua.", threadID);

    if (lockData[threadID].image) fs.unlinkSync(lockData[threadID].image);
    delete lockData[threadID];
    saveLockData();

    return api.sendMessage("✅ Group ka **Name**, **Photo**, **Emoji** aur **Theme** ka lock hata diya gaya hai.", threadID);
  }

  return api.sendMessage("⚠️ Ghalat option! Sirf likho: lockgroup on/off", threadID);
};

module.exports.handleEvent = async function ({ api, event }) {
  const threadID = event.threadID;
  if (!lockData[threadID]) return;

  try {
    const threadInfo = await api.getThreadInfo(threadID);
    const currentName = threadInfo.threadName;
    const currentImage = threadInfo.imageSrc;
    const currentEmoji = threadInfo.emoji;
    const currentThemeID = threadInfo.threadThemeID;

    const { name: lockedName, image: lockedImagePath, emoji: lockedEmoji, themeID: lockedThemeID } = lockData[threadID];

    if (currentName !== lockedName) {
      await api.setTitle(lockedName, threadID);
      api.sendMessage(`⚠️ Group name change hua tha. Wapas "${lockedName}" set kar diya gaya.`, threadID);
    }

    if (lockedImagePath && currentImage) {
      const currentImgRes = await axios.get(currentImage, { responseType: "arraybuffer" });
      const currentBuffer = Buffer.from(currentImgRes.data, "binary");
      const lockedBuffer = fs.readFileSync(lockedImagePath);

      if (!currentBuffer.equals(lockedBuffer)) {
        await api.changeGroupImage(fs.createReadStream(lockedImagePath), threadID);
        api.sendMessage("🖼️ Group photo change hui thi. Wapas lock wali laga di gayi hai.", threadID);
      }
    }

    if (lockedEmoji !== currentEmoji) {
      await api.setEmoji(lockedEmoji, threadID);
      api.sendMessage(`😊 Emoji change hua tha. Wapas "${lockedEmoji}" set kar diya gaya.`, threadID);
    }

    if (lockedThemeID !== currentThemeID) {
      await api.setTheme(lockedThemeID, threadID);
      api.sendMessage("🎨 Theme change hua tha. Wapas pehla wala laga diya gaya.", threadID);
    }
  } catch (err) {
    console.log("lockgroup event error:", err.message);
  }
};
