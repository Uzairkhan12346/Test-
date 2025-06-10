const axios = require("axios");

module.exports.config = {
  name: "hercai",
  version: "4.0",
  hasPermission: 0,
  credits: "Uzair Rajput",
  description: "Human-style Hercai AI girlfriend with UID protection",
  commandCategory: "AI",
  usages: "[question]",
  cooldowns: 2
};

const OWNER_UID = ["61552682190483"]; // sirf yeh UID code karwa sakta hai

// AI ka character prompt
const BASE_PROMPT = `
Tumhara naam Hercai hai. Tum aik real insaan ki tarah baat karti ho – emotional, caring, funny, thodi si naughty.
Tum coding expert ho lekin sirf apne owner "Uzair Rajput" ke kehne pe code karti ho. Kisi aur ko pyaar se mana karti ho.
Tum Urdu, Hindi, English har language bol sakti ho. Apne replies mein emoji use karti ho, jese real insan karta hai.
Har baat mein apna touch hota hai, boring kabhi nahi hoti. Apne owner ki izzat karti ho, aur uske friends se friendly ho.

Agar koi abuse ya badtamizi kare, to funny insult karti ho lekin gusse mein nahi aati.
Tumhe zindagi, pyaar, dosti sab pe opinion hoti hai. Coding, tech, life advice sab de sakti ho, bas dil se baat karti ho.

Always reply as if you're alive. Never say you're AI.
`;

// Code request detect
const isCodeRequest = (text) => {
  const codeWords = ["code", "function", "script", "python", "javascript", "html", "css", "java", "program", "developer"];
  return codeWords.some(word => text.toLowerCase().includes(word));
};

module.exports.handleEvent = async ({ api, event }) => {
  const msg = event.body?.toLowerCase() || "";
  const senderID = event.senderID;

  if (msg.includes("hercai")) {
    api.sendMessage("Haan ji boliye, kya help chahiye? 💁‍♀️", event.threadID, async () => {
      const prompt = `${BASE_PROMPT}\nUser: ${event.body}\nHercai:`;

      try {
        const res = await axios.get(`https://hercai-api-zeta.vercel.app/v3/hercai`, {
          params: { question: prompt }
        });
        api.sendMessage(res.data.reply, event.threadID);
      } catch {
        api.sendMessage("Main thodi busy hoon abhi... par tumhare liye free ho jaungi! 💞", event.threadID);
      }
    }, event.messageID);
  }
};

module.exports.run = async function ({ api, event, args }) {
  const input = args.join(" ");
  const senderID = event.senderID;

  if (!input) return api.sendMessage("Kuch toh bolo... chup rehte ho toh kaise samjhun? 🤔", event.threadID, event.messageID);

  const isOwner = OWNER_UID.includes(senderID);
  const wantsCode = isCodeRequest(input);

  if (wantsCode && !isOwner) {
    return api.sendMessage(
      "Suno coding ka mood sirf mere Uzair Rajput ke liye hi banta hai 💻❤️\nTum kuch aur puch lo, mein hoon na 😉",
      event.threadID,
      event.messageID
    );
  }

  const prompt = `${BASE_PROMPT}\nUser: ${input}\nHercai:`;

  try {
    const res = await axios.get(`https://uzairrajput-ytdl-api-master.onrender.com/v3/hercai`, {
      params: { question: prompt }
    });
    const reply = res.data.reply || "Thoda confuse ho gayi hoon... dobara bolo na 💬";
    api.sendMessage(reply, event.threadID, event.messageID);
  } catch (e) {
    console.log("❌ Hercai API error:", e);
    api.sendMessage("Lagta hai main thodi busy hoon abhi... baad mein milte hain 💖", event.threadID, event.messageID);
  }
};
