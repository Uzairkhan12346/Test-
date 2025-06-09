const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");

const LOCK_PATH = path.join(__dirname, "Uzair", "lockgroup.json");
fs.ensureDirSync(path.join(__dirname, "Uzair")); // Make sure Uzair folder exists
if (!fs.existsSync(LOCK_PATH)) fs.writeJsonSync(LOCK_PATH, {}); // Create empty JSON if not exist

module.exports.config = {
  name: "lockgroup",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "Uzair Rajput Mtx",
  description: "Group name, emoji, theme aur photo ko lock karein (auto-reset)",
  commandCategory: "Group",
  usages: "[on/off]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const threadID = event.threadID;
  const data = fs.readJsonSync(LOCK_PATH);

  if (!args[0]) return api.sendMessage("❌ Istemaal: lockgroup on/off", threadID);

  if (args[0].toLowerCase() === "on") {
    try {
      const info = await api.getThreadInfo(threadID);
      const name = info.threadName;
      const emoji = info.emoji;
      const themeID = info.threadThemeID;
      const imageSrc = info.imageSrc;

      let imagePath = null;
      if (imageSrc) {
        const imgData = await axios.get(imageSrc, { responseType: "arraybuffer" });
        imagePath = path.join(__dirname, "Uzair", `group_${threadID}.jpg`);
        fs.writeFileSync(imagePath, Buffer.from(imgData.data, "binary"));
      }

      data[threadID] = {
        name,
        emoji,
        themeID,
        image: imagePath
      };

      fs.writeJsonSync(LOCK_PATH, data, { spaces: 2 });
      return api.sendMessage(`🔒 Group ka name, emoji, theme aur photo lock kar diye gaye hain.\nKoi bhi change karega to wapas reset ho jayega.`, threadID);
    } catch (e) {
      console.error(e);
      return api.sendMessage("⚠️ Lock lagane mein masla hua!", threadID);
    }
  }

  if (args[0].toLowerCase() === "off") {
    if (!data[threadID]) return api.sendMessage("⚠️ Ye group pehle se unlocked hai!", threadID);

    if (data[threadID].image) fs.unlinkSync(data[threadID].image);
    delete data[threadID];
    fs.writeJsonSync(LOCK_PATH, data, { spaces: 2 });

    return api.sendMessage("✅ Group ka lock hata diya gaya hai.", threadID);
  }

  return api.sendMessage("❌ Ghalat option! Istemaal: lockgroup on/off", threadID);
};

module.exports.handleEvent = async function ({ api, event }) {
  const threadID = event.threadID;
  const data = fs.readJsonSync(LOCK_PATH);
  if (!data[threadID]) return;

  try {
    const info = await api.getThreadInfo(threadID);
    const { name, emoji, themeID, image } = data[threadID];

    if (info.threadName !== name) {
      await api.setTitle(name, threadID);
      api.sendMessage(`📛 Group ka name change kiya gaya tha, wapas "${name}" kar diya gaya.`, threadID);
    }

    if (info.emoji !== emoji) {
      await api.changeThreadEmoji(emoji, threadID);
      api.sendMessage(`😎 Emoji change hua tha, wapas "${emoji}" kar diya gaya.`, threadID);
    }

    if (info.threadThemeID !== themeID) {
      await api.setThreadTheme(themeID, threadID);
      api.sendMessage(`🎨 Theme change ki gayi thi, wapas original kar di gayi.`, threadID);
    }

    if (image && info.imageSrc) {
      const currentImg = await axios.get(info.imageSrc, { responseType: "arraybuffer" });
      const currentBuffer = Buffer.from(currentImg.data, "binary");
      const originalBuffer = fs.readFileSync(image);

      if (!currentBuffer.equals(originalBuffer)) {
        await api.changeGroupImage(fs.createReadStream(image), threadID);
        api.sendMessage(`🖼️ Group ki photo change hui thi, wapas original photo laga di gayi.`, threadID);
      }
    }
  } catch (e) {
    console.error("🔧 lockgroup error:", e.message);
  }
};
