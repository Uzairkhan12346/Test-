const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");

module.exports.config = {
  name: "lockgroup",
  version: "2.0.0",
  hasPermssion: 1,
  credits: "Uzair Modified",
  description: "Group name, photo aur emoji lock karo. Auto reset on change.",
  commandCategory: "group",
  usages: "[on/off]",
  cooldowns: 5
};

const lockData = {}; // Memory-based lock info

module.exports.run = async function ({ api, event, args }) {
  const threadID = event.threadID;

  if (!args[0]) return api.sendMessage("❌ Use: lockgroup on/off", threadID);

  if (args[0].toLowerCase() === "on") {
    try {
      const threadInfo = await api.getThreadInfo(threadID);
      const groupName = threadInfo.threadName;
      const groupImageSrc = threadInfo.imageSrc;
      const groupEmoji = threadInfo.emoji || null;

      // 🗂️ Folder ensure
      const imageDir = path.join(__dirname, "uzair");
      fs.ensureDirSync(imageDir);

      let imagePath = null;

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

      return api.sendMessage(`🔒 Group name, photo aur emoji LOCK kar diye gaye hain!\nKoi change karega to wapas original set ho jayega.`, threadID);
    } catch (err) {
      console.log(err);
      return api.sendMessage("⚠️ Lock karte waqt kuch error aaya!", threadID);
    }
  }

  if (args[0].toLowerCase() === "off") {
    if (!lockData[threadID]) return api.sendMessage("⚠️ Group pehle se unlocked hai!", threadID);

    if (lockData[threadID].image) fs.unlinkSync(lockData[threadID].image);
    delete lockData[threadID];
    return api.sendMessage("✅ Group ka name, photo aur emoji UNLOCK kar diya gaya.", threadID);
  }

  return api.sendMessage("❌ Invalid option! Use: lockgroup on/off", threadID);
};

module.exports.handleEvent = async function ({ api, event }) {
  const threadID = event.threadID;
  if (!lockData[threadID]) return;

  try {
    const threadInfo = await api.getThreadInfo(threadID);
    const { name: lockedName, image: lockedImagePath, emoji: lockedEmoji } = lockData[threadID];

    const currentName = threadInfo.threadName;
    const currentImage = threadInfo.imageSrc;
    const currentEmoji = threadInfo.emoji || null;

    // 📝 Check & Reset Name
    if (currentName !== lockedName) {
      await api.setTitle(lockedName, threadID);
      api.sendMessage(`⚠️ Group ka name change hua tha, wapas "${lockedName}" set kar diya.`, threadID);
    }

    // 🖼️ Check & Reset Photo
    if (lockedImagePath && currentImage) {
      const currentImgRes = await axios.get(currentImage, { responseType: "arraybuffer" });
      const currentBuffer = Buffer.from(currentImgRes.data, "binary");

      const lockedBuffer = fs.readFileSync(lockedImagePath);

      if (!currentBuffer.equals(lockedBuffer)) {
        await api.changeGroupImage(fs.createReadStream(lockedImagePath), threadID);
        api.sendMessage(`🖼️ Group ki photo badli gayi thi, wapas original photo laga di gayi.`, threadID);
      }
    }

    // 😃 Check & Reset Emoji
    if (lockedEmoji !== currentEmoji) {
      await api.changeThreadEmoji(lockedEmoji, threadID);
      api.sendMessage(`😃 Group emoji change hua tha, wapas "${lockedEmoji}" set kar diya.`, threadID);
    }

  } catch (err) {
    console.log("Error in lockgroup event:", err.message);
  }
};
