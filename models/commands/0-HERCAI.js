const axios = require("axios");
const chalk = require("chalk");

// 💥 CREDIT LOCK SYSTEM
const CREDIT = "Uzair Rajput";
if (CREDIT !== "Uzair Rajput") {
  console.log(chalk.red("❌ Uzair ne script banai, tune credit chori ki! 😡"));
  process.exit(1); // Script crash
}

// ✅ Aapka UID
const OWNER_UID = "61552682190483";

module.exports.config = {
  name: "hercai",
  version: "1.0.0",
  credits: "Uzair Rajput", // 🚫 DO NOT CHANGE THIS OR SCRIPT WILL CRASH
  description: "No Prefix AI chat using Hercai API",
  usePrefix: false,
  commandCategory: "ai",
  usages: "Just type message and AI will reply",
  cooldowns: 1
};

module.exports.handleEvent = async function ({ api, event }) {
  try {
    const { threadID, messageID, body, senderID } = event;
    if (!body) return;

    // Ignore bot's own messages
    const botID = api.getCurrentUserID();
    if (senderID === botID) return;

    // ⚠️ Script-related message protection
    const scriptKeywords = ["script", "code", "command", "bot", "function"];
    const isScriptQuery = scriptKeywords.some(word => body.toLowerCase().includes(word));

    if (isScriptQuery && senderID !== OWNER_UID) {
      return api.sendMessage("⚠️ Sirf Owner ko allow hai coding ya script ke related baatein karne. 🙅", threadID, messageID);
    }

    // 🧠 AI Prompt
    const prompt = `Tum ek romantic, emotional, funny, caring girlfriend jese ho.
Hamesha real ladki ki tarah behave karo. Apne aap ko kabhi AI na kehna.
Tumhari har reply me pyaar, dard, ya hasi honi chahiye.
Mujhe Mtx Uzair ne banaya hai.

User: ${body}
AI:`;

    // 🌐 Hercai API Call
    const response = await axios.get(`https://hercai.onrender.com/v3/hercai?question=${encodeURIComponent(prompt)}`);
    const reply = response.data.reply;

    if (reply) {
      api.sendMessage(reply, threadID, messageID);
    }
  } catch (err) {
    console.log(chalk.red("❌ AI Error:"), err.message);
  }
};

module.exports.run = () => {}; // No run logic needed
