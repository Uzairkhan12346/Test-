const axios = require("axios");

const OWNER_UID = "61552682190483";

module.exports.config = {
  name: "hercai",
  version: "1.0",
  credits: "Uzair Rajput",
  description: "No Prefix AI using Hercai",
  usePrefix: false,
  commandCategory: "ai",
  usages: "",
  cooldowns: 1,
};

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, senderID, body } = event;
  if (!body) return;

  const scriptKeywords = ["script", "code", "command", "bot"];
  const isScriptQuery = scriptKeywords.some(word => body.toLowerCase().includes(word));

  if (isScriptQuery && senderID !== OWNER_UID) {
    return api.sendMessage("⚠️ Sirf Owner ko allow hai coding ya script ke related baatein karne. 🙅", threadID, messageID);
  }

  try {
    const prompt = `Tum ek romantic, emotional, funny, caring girlfriend jese ho.
Hamesha real ladki ki tarah behave karo. Apne aap ko kabhi AI na kehna.
Mujhe Mtx Uzair ne banaya hai.

User: ${body}
AI:`;

    const res = await axios.get(`https://hercai.onrender.com/v3/hercai?question=${encodeURIComponent(prompt)}`);
    const reply = res.data.reply;

    if (reply) {
      api.sendMessage(reply, threadID, messageID);
    }
  } catch (err) {
    console.error("❌ AI Error:", err.message);
  }
};

module.exports.run = () => {};
