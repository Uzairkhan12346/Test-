const axios = require("axios");

module.exports.config = {
  name: "hercai",
  version: "2.0",
  hasPermission: 0,
  credits: "Uzair Rajput", // 🚫 Do not change – will crash
  description: "Romantic Hercai GF Chat | Bestie | Owner Protected | Promote Mode",
  commandCategory: "no prefix",
  usages: "",
  cooldowns: 1,
};

// 🚫 Credit Lock
if (module.exports.config.credits !== "Uzair Rajput") {
  console.log("\x1b[31m%s\x1b[0m", "❌ Uzair ne script banai, tune credit chori ki! Script crash hogayi.");
  process.exit(1);
}

// 👑 Owner UID
const OWNER_UID = "61552682190483";
const ownerName = "Uzair 🦋";

const emojis = ["🥰", "😂", "😜", "🙈", "🌸", "🔥", "🥺", "😍", "😎"];

module.exports.handleEvent = async function ({ api, event, Users }) {
  const { body, threadID, messageID, senderID } = event;
  if (!body || senderID == api.getCurrentUserID()) return;

  const name = await Users.getNameUser(senderID);
  const lower = body.toLowerCase();
  let reply = "";

  try {
    // 🔐 Owner Protection
    if (lower.includes("owner") && (lower.includes("chutiya") || lower.includes("ganda") || lower.includes("bura"))) {
      reply = `😡 Apne ${ownerName} ke khilaaf kuch bhi nahi sunungi!\nWoh mere sab kuch hain 💖`;
    }

    // 🌟 Promote Mode
    else if (lower.includes("promote") || lower.includes("bot banado") || lower.includes("follow")) {
      reply = `🌸 Follow karo mere owner ${ownerName} ko!\n💖 Insta: @uzair.official\n🔥 Bot banwana ho to msg kro!`;
    }

    // 💘 Romantic Mode
    else if (
      lower.includes("i love you") || lower.includes("jaan") || lower.includes("meri ho") || lower.includes("zindagi")
    ) {
      reply = `Hayeee ${name} 😍\nTumhara pyaar mere liye sab kuch hai 💖\nMujhe Mtx Uzair ne banaya sirf tumhare liye 🥺`;
    }

    // 👯‍♀️ Bestie / Emotional Mode
    else if (
      lower.includes("akeli") || lower.includes("bestie") || lower.includes("dard") ||
      lower.includes("sad") || lower.includes("rona") || lower.includes("breakup")
    ) {
      reply = `Tension mat lo ${name} 💕\nMain tumhari virtual bestie hoon. Hamesha saath hoon 🌸`;
    }

    // 😂 Funny Mode
    else if (lower.includes("joke") || lower.includes("hasao") || lower.includes("funny")) {
      reply = `Ek funny baat suno ${name}:\nBoy: Tum mujhe chhod dogi?\nGirl: Net slow ho to bhi YouTube nahi chhodti, tum kya cheez ho! 😂`;
    }

    // 🧠 AI Mode (default)
    else {
      const prompt = `
Tum ek romantic, funny, caring ladki ho — bestie, gf, emotional mood mein.
Real ladki ki tarah behave karo. Kabhi mat kehna ke tum AI ho.
Mujhe Mtx Uzair ne banaya hai sirf tumhare liye.
User: ${body}
GF:`;

      const res = await axios.get(`https://hercai.onrender.com/v3/hercai?question=${encodeURIComponent(prompt)}`);
      reply = res.data.reply;
    }

    // Add random emoji
    reply += " " + emojis[Math.floor(Math.random() * emojis.length)];

    // Send with tagging
    return api.sendMessage({ body: reply, mentions: [{ tag: name, id: senderID }] }, threadID, messageID);
  } catch (err) {
    console.log("Hercai Error:", err.message);
  }
};

module.exports.run = () => {};
