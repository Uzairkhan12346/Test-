const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");

module.exports = {
  config: {
    name: "lockgroup",
    version: "1.0",
    author: "Uzair",
    countDown: 5,
    role: 1,
    shortDescription: {
      en: "Lock group name and emoji"
    },
    longDescription: {
      en: "Automatically reverts any group name or emoji change"
    },
    category: "group",
    guide: {
      en: "{pn} to lock the group name and emoji"
    }
  },

  onStart: async function ({ api, event }) {
    const threadID = event.threadID;

    // Get current group info
    const threadInfo = await api.getThreadInfo(threadID);
    const groupName = threadInfo.threadName || "No name";
    const emoji = threadInfo.emoji || "❌";

    const data = {
      groupName,
      emoji
    };

    const filePath = path.join(__dirname, "cache", `lock_${threadID}.json`);
    fs.ensureDirSync(path.join(__dirname, "cache"));
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return api.sendMessage(`✅ Group has been locked.\n🔒 Name: ${groupName}\n🔒 Emoji: ${emoji}`, threadID);
  },

  handleEvent: async function ({ api, event }) {
    const { threadID } = event;

    const filePath = path.join(__dirname, "cache", `lock_${threadID}.json`);
    if (!fs.existsSync(filePath)) return;

    const stored = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const current = await api.getThreadInfo(threadID);

    const currentName = current.threadName || "No name";
    const currentEmoji = current.emoji || "❌";

    let changed = false;

    if (currentName !== stored.groupName) {
      await api.setTitle(stored.groupName, threadID);
      changed = true;
    }

    if (currentEmoji !== stored.emoji) {
      await api.changeThreadEmoji(stored.emoji, threadID);
      changed = true;
    }

    if (changed) {
      const imageURL = "https://i.ibb.co/MD9CrCYw/Messenger-creation-1203929291062179.jpg";
      const imagePath = path.join(__dirname, "uzair", "locked.jpeg");
      const res = await axios.get(imageURL, { responseType: "arraybuffer" });
      fs.writeFileSync(imagePath, Buffer.from(res.data, "binary"));

      api.sendMessage({
        body: "🚫 Group name or emoji is locked!",
        attachment: fs.createReadStream(imagePath)
      }, threadID);
    }
  }
};
