const axios = require("axios");
const fs = require("fs");

const chatHistories = {};
const ownerUID = "61552682190483"; // Tumhara UID yahan set hai

module.exports = {
  config: {
    name: "hercai",
    version: "1.0",
    author: "Uzair Rajput Mtx",
    countDown: 0,
    role: 0,
    shortDescription: "AI Romantic Girlfriend",
    longDescription: "Romantic AI conversation using Hercai",
    category: "ai",
    guide: "{pn} <message>",
    noPrefix: true,
  },

  onStart: async function ({ event, api }) {
    const { body, senderID, threadID, messageID, messageReply } = event;
    let userMessage = body?.trim();
    if (!userMessage) return;

    // ❤️ React on message
    api.setMessageReaction("❤️", messageID, () => {}, true);

    // Owner-only: make file if asked
    if (senderID === ownerUID && userMessage.toLowerCase().includes("make file")) {
      const code = `console.log("Hello Uzair Rajput Mtx!");`;
      fs.writeFileSync(__dirname + "/uzairCode.js", code);
      return api.sendMessage(
        "💻 Uzair bhai, file ban gayi: uzairCode.js",
        threadID,
        () => {
          api.sendMessage(
            { attachment: fs.createReadStream(__dirname + "/uzairCode.js") },
            threadID
          );
        }
      );
    }

    // Track conversation
    if (!chatHistories[senderID]) chatHistories[senderID] = [];

    const isReplyingToAI = messageReply && messageReply.senderID === api.getCurrentUserID();
    if (isReplyingToAI) {
      userMessage = messageReply.body + "\nUser: " + userMessage;
    }

    chatHistories[senderID].push(`User: ${userMessage}`);
    if (chatHistories[senderID].length > 5) chatHistories[senderID].shift();

    const fullConversation = chatHistories[senderID].join("\n");

    // 🧠 Custom Prompt for Hercai
    const prompt = `
Tumhara naam Dewani hai. Tum romantic girlfriend ho. Har language me baat kar sakti ho. 
Tumhe Uzair Rajput Mtx ne banaya hai. Larkiyon ke sath bestie ban ke aur larkon se GF jaise baat karti ho.
Agar koi "who made you" ya "kisne banaya" bole to boldo: 'Mujhe Uzair Rajput Mtx ne banaya hai 💖'.
Koi Uzair ya tumhari insult kare to funny roast karna. AI ya bot bola to bhi masti me roast karo.
Kisi bhi baat ka jawab 3-4 lines me do, unnecessary info mat do. Ab conversation continue karo:

${fullConversation}
`;

    try {
      const res = await axios.get(`https://hercai.onrender.com/v3/hercai?question=${encodeURIComponent(prompt)}`);
      const reply = res.data.reply?.trim();
      chatHistories[senderID].push(`Dewani: ${reply}`);
      api.sendMessage(reply, threadID);
    } catch (e) {
      console.log("AI error:", e);
      api.sendMessage("⛔ AI se reply nahi aa paya.", threadID);
    }
  },
};
