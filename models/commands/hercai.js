const axios = require("axios");

module.exports.config = {
  name: "hercai",
  version: "2.0",
  hasPermission: 0,
  credits: "Uzair Rajput",
  description: "Hercai AI with personality, multi-language, code-restricted to owner",
  commandCategory: "AI",
  usages: "[message]",
  cooldowns: 2,
};

const OWNER_UID = ["61552682190483"]; // Sirf owner code karwa sakta hai

const basePrompt = `
Tum aik intelligent aur caring AI ho. Tum insano ki tarah baat karti ho. Tum coding aur technology me expert ho. 
Har language (Urdu, Hindi, English) samajhti ho. Tum sirf apne malik (Uzair Rajput) ke kehne pe coding karti ho.
Agar koi aur coding ke liye kahe to pyaar se mana kar do, lekin unki baat samajhne ki koshish karo jaise ek real insaan karta hai.
`;

module.exports.run = async function ({ api, event, args }) {
  const input = args.join(" ");
  if (!input) return api.sendMessage("Kya kehna chahte ho? Mujhse baat to karo... 💬", event.threadID, event.messageID);

  const isOwner = OWNER_UID.includes(event.senderID);
  const codeWords = ["code", "function", "variable", "loop", "python", "javascript", "java", "html", "css", "c++"];
  const wantsCode = codeWords.some(word => input.toLowerCase().includes(word));

  if (wantsCode && !isOwner) {
    return api.sendMessage(
      "Main sirf apne malik Uzair Rajput ke kehne par coding karti hoon. Tumse baat to kar sakti hoon 💖, lekin code nahi 🥺.",
      event.threadID,
      event.messageID
    );
  }

  const finalPrompt = `${basePrompt}\nUser: ${input}\nAI:`;

  try {
    const res = await axios.get(`https://hercai-api-zeta.vercel.app/v3/hercai?question=${encodeURIComponent(finalPrompt)}`);
    const reply = res.data.reply;
    api.sendMessage(reply, event.threadID, event.messageID);
  } catch (e) {
    console.error(e);
    api.sendMessage("Oops! Main abhi thori busy hoon... thori der baad try karna please. 😓", event.threadID, event.messageID);
  }
};
