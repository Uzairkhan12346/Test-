const fs = require("fs"); const axios = require("axios"); const path = require("path");

const dataPath = path.join(__dirname, "lockData.json"); const imageDir = path.join(__dirname, "uzair");

// Folder create if not exists if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir);

// Load lock data from file if exists let lockData = {}; if (fs.existsSync(dataPath)) { lockData = JSON.parse(fs.readFileSync(dataPath, "utf-8")); }

function saveLockData() { fs.writeFileSync(dataPath, JSON.stringify(lockData, null, 2)); }

module.exports.config = { name: "lockgroup", version: "3.0.0", hasPermssion: 1, credits: "Uzair🔥", description: "Group ka name, photo aur emoji lock karo aur auto reset karo (persistent)", commandCategory: "group", usages: "[on/off/status/list]", cooldowns: 5 };

module.exports.run = async function ({ api, event, args }) { const threadID = event.threadID;

if (!args[0]) return api.sendMessage("⚠️ Use: lockgroup on/off/status/list", threadID);

const option = args[0].toLowerCase();

if (option === "on") { try { const threadInfo = await api.getThreadInfo(threadID); const groupName = threadInfo.threadName; const groupEmoji = threadInfo.emoji || null;

// No need to fetch group image, bot will use first image from uzair/ folder

  lockData[threadID] = {
    name: groupName,
    image: "auto", // flag to auto-pick from uzair folder
    emoji: groupEmoji
  };
  saveLockData();

  return api.sendMessage(`🔒 Group ka naam, photo aur emoji ab LOCK ho chuke hain!\n🖼️ Photo uzair

