const axios = require("axios");

module.exports.config = {
  name: "hercai",
  version: "2.0",
  hasPermission: 0,
  credits: "Uzair Rajput",
  description: "Human-style Hercai AI with language + coding + UID control",
  commandCategory: "AI",
  usages: "[question]",
  cooldowns: 2
};

const OWNER_UID = ["61552682190483"]; // Yahan apna UID lagayein

const BASE_PROMPT = `
Tum aik smart aur real insaan ki tarah baat karti ho. Tumhara naam Hercai hai.
Tum emotional, funny, aur intelligent ho. Har language (Urdu, Hindi, English) samajh sakti ho.
Tum coding ki expert ho, lekin sirf apne malik Uzair Rajput ke kehne pe coding karti ho.
Agar koi aur code maange to pyaar se mana karti ho lekin polite aur friendly tareeqe se jawab deti ho.
`;

// Check if message contains coding keywords
const isCodeRequest = (text) => {
  const keywords = ["code", "function", "variable", "loop", "program", "script", "python", "javascript", "html", "java", "c++"];
  return keywords.some(word => text.toLowerCase().includes(word));
};

module.exports.run = async function ({ api, event, args }) {
  const input = args.join(" ").trim();
  const senderID = event.senderID;

  // If only "hercai" is typed
  if (!input) {
    return api.sendMessage("Haan ji, mein kya madad kar sakta hoon? 😊", event.threadID, event.messageID);
  }

  const codeRequested = isCodeRequest(input);
  const isOwner = OWNER_UID.includes(senderID);

  // Block code for non-owner
  if (codeRequested && !isOwner) {
    return api.sendMessage(
      "Main sirf apne creator Uzair Rajput ke kehne pe coding karti hoon 💻. Lekin tumse baat karna acha lagta hai! 😊",
      event.threadID,
      event.messageID
    );
  }

  // Create prompt
  const prompt = `${BASE_PROMPT}\nUser: ${input}\nHercai:`;

  try {
    const res = await axios.get(`https://hercai-api-zeta.vercel.app/v3/hercai`, {
      params: {
        question: prompt
      }
    });

    const reply = res.data.reply || "Kuch toh ghalat ho gaya, thori der baad try karo 😔";
    api.sendMessage(reply, event.threadID, event.messageID);

  } catch (err) {
    console.error("Hercai API error:", err);
    api.sendMessage("Oops! Main thori der ke liye busy hoon... baad mein try karna 🙏", event.threadID, event.messageID);
  }
};
