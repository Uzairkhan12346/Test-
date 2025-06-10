const axios = require("axios");

// ✅ Owner UID
const OWNER_UID = "61552682190483";

// ✅ Credit Lock
const credit = "Uzair Rajput";
if (module.exports.config?.credits !== credit) {
  console.log("\x1b[31m%s\x1b[0m", `❌ Uzair ne script banai, tune credit chori ki! Script crash hogayi.`);
  process.exit(1);
}

module.exports.config = {
  name: "hercai",
  version: "1.0",
  credits: credit,
  description: "Auto AI GF Chat | Protective | Emotional | Funny",
  commandCategory: "AI",
  usePrefix: false,
  cooldowns: 1,
};

const emojis = ["💖", "🥺", "😍", "😜", "🔥", "🌸", "😂", "🙈", "💋"];

module.exports.handleEvent = async function ({ api, event, Users }) {
  const { threadID, messageID, senderID, body } = event;
  if (!body || senderID == api.getCurrentUserID()) return;

  const name = await Users.getNameUser(senderID);
  const lower = body.toLowerCase();
  let reply = "";

  // 🔒 Block coding/chat for non-owner
  const scriptKeywords = ["script", "code", "command", "bot"];
  const isScriptQuery = scriptKeywords.some(k => lower.includes(k));
  if (isScriptQuery && senderID !== OWNER_UID) {
    return api.sendMessage("⚠️ Sirf owner Uzair Rajput ko coding ke bare me baat karne ki permission hai! ❌", threadID, messageID);
  }

  // 😡 Protect Owner
  if (lower.includes("owner") && (lower.includes("chutiya") || lower.includes("ganda") || lower.includes("bura"))) {
    reply = `😡 Mere Owner ke khilaaf kuch nahi sunungi!\n💖 Uzair Rajput meri jaan hain!`;
  }

  // 🥰 Romantic Mood
  else if (lower.includes("i love you") || lower.includes("baby") || lower.includes("meri jaan") || lower.includes("zindagi")) {
    reply = `Awww ${name}, main bhi tumse utna hi pyar karti hoon 💖 Tum mere dil ke sabse kareeb ho 🥺`;
  }

  // 😭 Emotional Mood
  else if (lower.includes("sad") || lower.includes("dard") || lower.includes("akeli") || lower.includes("rona")) {
    reply = `Tum akeli nahi ho ${name} 🥺 Main tumhare saath hoon har pal. Tum meri bestie ho 💕`;
  }

  // 😂 Funny Mode
  else if (lower.includes("joke") || lower.includes("funny") || lower.includes("bore")) {
    reply = `Ek joke suno ${name}:\nBoy: Tum mujhe chhod dogi?\nGirl: Net slow ho jaye tab bhi YouTube nahi chhodti, tum kya cheez ho! 😂`;
  }

  // 💬 Default AI Chat
  else {
    const prompt = `Tum ek romantic, funny, emotional, caring girlfriend ho. Real ladki ki tarah behave karo. Kabhi apne aap ko AI na kehna. Mujhe Mtx Uzair ne banaya hai.\nUser: ${body}\nGF:`;
    try {
      const res = await axios.get(`https://hercai-api.replit.app/v3/hercai?question=${encodeURIComponent(prompt)}`);
      reply = res.data.reply || "Mujhe samajh nahi aaya jaan 🥺";
    } catch (e) {
      reply = "AI error hua jaanu 💔 Baad me try karo.";
      console.log("Hercai API Error:", e.message);
    }
  }

  reply += " " + emojis[Math.floor(Math.random() * emojis.length)];

  return api.sendMessage(
    {
      body: reply,
      mentions: [{ tag: name, id: senderID }],
    },
    threadID,
    messageID
  );
};

module.exports.run = () => {};
