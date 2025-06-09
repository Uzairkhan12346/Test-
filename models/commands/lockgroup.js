const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");

module.exports.config = {
  name: "lockgroup",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "Uzair Edited",
  description: "Group name aur photo lock karo, auto reset bhi karega agar koi change kare.",
  commandCategory: "group",
  usages: "[on/off]",
  cooldowns: 5
};

const lockData = {}; // RAM-based lock info

module.exports.run = async function ({ api, event, args }) {
  const threadID = event.threadID;

  if (!args[0]) return api.sendMessage("❌ Use: lockgroup on/off", threadID);

  if (args[0].toLowerCase() === "on") {
    try {
      const threadInfo = await api.getThreadInfo(threadID);
      const groupName = threadInfo.threadName;
      const groupImageSrc = threadInfo.imageSrc;

      // 🔐 Ensure 'uzair' folder exists
      const imageDir = path.join(__dirname, "uzair");
      fs.ensureDirSync(imageDir);

      let imagePath = null;

      // 🖼️ Download and save group image
      if (groupImageSrc) {
        const img = await axios.get(groupImageSrc, { responseType: "arraybuffer" });
        imagePath = path.join(imageDir, `group_${threadID}.jpg`);
        fs.writeFileSync(imagePath, Buffer.from(img.data, "binary"));
      }

      lockData[threadID] = {
        name: groupName,
        image: imagePath
      };

      return api.sendMessage(`🔒 Group name aur photo LOCK kar diye gaye hain!\nAgar koi badlega to auto reset ho jayega.`, threadID);
    } catch (err) {
      console.log(err);
      return api.sendMessage("⚠️ Lock fail ho gaya. Kuch error aaya!", threadID);
    }
  }

  if (args[0].toLowerCase() === "off") {
    if (!lockData[threadID]) return api.sendMessage("⚠️ Group pehle se unlocked hai!", threadID);

    if (lockData[threadID].image) fs.unlinkSync(lockData[threadID].image);
    delete lockData[threadID];
    return api.sendMessage("✅ Group ka name aur photo UNLOCK kar diya gaya.", threadID);
  }

  return api.sendMessage("❌ Invalid option! Use: lockgroup on/off", threadID);
};

module.exports.handleEvent = async function ({ api, event }) {
  const threadID = event.threadID;
  if (!lockData[threadID]) return;

  try {
    const threadInfo = await api.getThreadInfo(threadID);
    const currentName = threadInfo.threadName;
    const currentImage = threadInfo.imageSrc;

    const { name: lockedName, image: lockedImagePath } = lockData[threadID];

    // 📝 Check name
    if (currentName !== lockedName) {
      await api.setTitle(lockedName, threadID);
      api.sendMessage(`⚠️ Kisi ne group ka name badla tha, lekin wapas "${lockedName}" set kar diya gaya.`, threadID);
    }

    // 🖼️ Check photo
    if (lockedImagePath && currentImage) {
      const currentImgRes = await axios.get(currentImage, { responseType: "arraybuffer" });
      const currentBuffer = Buffer.from(currentImgRes.data, "binary");

      const lockedBuffer = fs.readFileSync(lockedImagePath);

      if (!currentBuffer.equals(lockedBuffer)) {
        await api.changeGroupImage(fs.createReadStream(lockedImagePath), threadID);
        api.sendMessage(`🖼️ Group photo badli gayi thi, lekin original locked photo wapas laga di gayi.`, threadID);
      }
    }
  } catch (err) {
    console.log("Error in lockgroup event:", err.message);
  }
};
