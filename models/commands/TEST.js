const axios = require("axios");

module.exports.config = {
  name: "hercai",
  version: "3.0",
  hasPermission: 0,
  credits: "Uzair Rajput",
  description: "Human-style AI | Code only on Owner UID",
  commandCategory: "AI",
  usages: "[question]",
  cooldowns: 2
};

const OWNER_UID = ["61552682190483"];

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

  const messageText = event.body.toLowerCase();

  // Auto reply if message contains just 'hercai' or starts with hercai
  if (messageText === "hercai" || messageText.startsWith("hercai") || messageText.includes(" hercai")) {
    api.sendMessage("Haan ji, mein kya madad kar sakta hoon? 😊", event.threadID, async (err, info) => {
      // After sending greeting, generate reply if input exists
      if (input) {
        const codeRequested = isCodeRequest(input);
        const isOwner = OWNER_UID.includes(senderID);

        if (codeRequested && !isOwner) {
          return api.sendMessage(
            "Main sirf apne creator Uzair Rajput ke kehne pe coding karti hoon 💻. Tumse baat karna acha lagta hai! 😊",
            event.threadID,
            event.messageID
          );
        }

        const prompt = `${BASE_PROMPT}\nUser: ${input}\nHercai:`;

        try {
          const res = await axios.get(`https://hercai-api-zeta.vercel.app/v3/hercai`, {
            params: { question: prompt }
          });

          const reply = res.data.reply || "Hmm... kuch samajh nahi aaya. Dobara pucho? 😊";
          api.sendMessage(reply, event.threadID, event.messageID);
        } catch (err) {
          console.error("Hercai API error:", err);
          api.sendMessage("Oops! Main thori der ke liye busy hoon... baad mein try karna 🙏", event.threadID, event.messageID);
        }
      }
    }, event.messageID);

    return;
  }

  // Fallback if not keyword-based and not starting with hercai
  if (!input) {
    return api.sendMessage("Hercai se baat karne ke liye kuch likho bhi toh! 💬", event.threadID, event.messageID);
  }

  const codeRequested = isCodeRequest(input);
  const isOwner = OWNER_UID.includes(senderID);

  if (codeRequested && !isOwner) {
    return api.sendMessage(
      "Main sirf apne creator Uzair Rajput ke kehne pe coding karti hoon 💻. Tumse baat karna acha lagta hai! 😊",
      event.threadID,
      event.messageID
    );
  }

  const prompt = `${BASE_PROMPT}\nUser: ${input}\nHercai:`;

  try {
    const res = await axios.get(`https://hercai-api-zeta.vercel.app/v3/hercai`, {
      params: { question: prompt }
    });

    const reply = res.data.reply || "Kuch ghalti ho gayi... dobara try karo 😊";
    api.sendMessage(reply, event.threadID, event.messageID);

  } catch (err) {
    console.error("Hercai API error:", err);
    api.sendMessage("Oops! Main busy hoon... thori der mein baat karte hain 🙏", event.threadID, event.messageID);
  }
};
