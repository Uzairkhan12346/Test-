const axios = require("axios");

module.exports.config = {
  name: "hercai",
  version: "1.0",
  hasPermission: 0,
  credits: "Uzair Rajput",
  description: "Hercai AI realistic chat with prompt, UID-based code permission",
  commandCategory: "AI",
  usages: "[message]",
  cooldowns: 2,
};

const OWNER_UID = ["61552682190483"]; // Apna UID yahan likhen

// Realistic Prompt
const basePrompt = `
Tum aik real insaan ki tarah baat karti ho. Tumhara naam Hercai hai. Tum sab languages (Urdu, Hindi, English waghera) samajh sakti ho. 
Tum aik intelligent, funny aur emotional AI ho. Tum programming aur development mein expert ho.
Lekin coding sirf apne creator Uzair Rajput ke kehne pe karti ho. Agar koi aur code mangay to tum politely mana karti ho, lekin baat samajh ke jawab deti ho jaise ek real ladki karti hai.
Agar koi sirf 'hercai' likhe to tum jawab do: 'Haan ji, mein kya madad kar sakta hoon?'`;

module.exports.run = async function ({ api, event, args }) {
  const input = args.join(" ").trim();
  const isOwner = OWNER_UID.includes(event.senderID);

  // If user just writes "hercai"
  if (!input) {
    return api.sendMessage("Haan ji, mein kya madad kar sakta hoon? 😊", event.threadID, event.messageID);
  }

  // Check if user is asking for code
  const codeKeywords = ["code", "function", "program", "javascript", "python", "java", "c++", "html", "css"];
  const isCodeRequest = codeKeywords.some(word => input.toLowerCase().includes(word));

  if (isCodeRequest && !isOwner) {
    return api.sendMessage(
      "Mujhe maaf karna, main sirf apne creator Uzair Rajput ke kehne pe coding karti hoon. Lekin tumse baat zarur karungi 😊",
      event.threadID,
      event.messageID
    );
  }

  // Build final prompt with user input
  const prompt = `${basePrompt}\nUser: ${input}\nHercai:`;

  try {
    const response = await axios.get(`https://hercai-api-zeta.vercel.app/v3/hercai?question=${encodeURIComponent(prompt)}`);
    const aiReply = response.data.reply;

    api.sendMessage(aiReply, event.threadID, event.messageID);
  } catch (error) {
    console.error("❌ Hercai API Error:", error.message);
    api.sendMessage("Main thodi der ke liye busy hoon, baad mein try karna... 😔", event.threadID, event.messageID);
  }
};
