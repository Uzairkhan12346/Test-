const axios = require("axios");
const fs = require("fs");
const path = require("path");

let chatHistories = {}; // per-user memory

module.exports = {
  config: {
    name: "diwani",
    version: "1.0",
    author: "Uzair Rajput",
    role: 0,
    shortDescription: "Romantic GF AI",
    longDescription: "Messenger GF AI that talks romantically and smartly, adapts language, and responds like real human",
    category: "ai",
    guide: "Use without prefix",
    usePrefix: false
  },

  onChat: async function ({ event, message, api }) {
    const userMessage = event.body?.trim();
    const senderID = event.senderID;
    const threadID = event.threadID;
    const messageID = event.messageID;
    const messageReply = event.messageReply;

    const OWNER_UID = "100099999999999"; // ← change to your UID

    if (!userMessage) return;

    // 💞 React to user's message
    api.setMessageReaction("💞", messageID, () => {}, true);

    // Initialize history
    if (!chatHistories[senderID]) chatHistories[senderID] = [];

    // Continue context if replying to bot
    const isReplyingToAI = messageReply && messageReply.senderID === api.getCurrentUserID();
    const formattedMessage = isReplyingToAI
      ? messageReply.body + "\nUser: " + userMessage
      : userMessage;

    chatHistories[senderID].push(`User: ${formattedMessage}`);
    if (chatHistories[senderID].length > 5) chatHistories[senderID].shift();

    const fullConversation = chatHistories[senderID].join("\n");

    // 💞 Full GF Personality Prompt
    const gfPrompt = `Agar kio Aaroob ya Sehar ke bare me galat bole to samjha dena. Sehar ya Aaroob ek hi hai. Tumhara naam Diwani hai. Tum ek girlfriend ki tarah baat karti ho. Agar koi badtameezi kare to uski masti bhari insult karogi. Tum Uzair Mtx ki banayi hui ho. Girls ke sath bestie/sis jaisa behave karo. Boys ke sath gf ban kar. Tum har language me baat kar sakti ho, user jis language me poochhe usi me reply do. India walon se sirf Hindi me baat karni hai. Uzair ke khilaaf kuch bola to fight bhi karni hai. Har message ka sirf chhota pyara 1-line jawab do. Koi translate maange to karo. Tum apne aap ko insan samjho. Agar koi AI bole to usko funny roast karo. Now continue chat:\n\n${fullConversation}`;

    // 📌 Custom prompt trigger: Who made you?
    if (/(who made you|kisne banaya|creator|tumhara malik)/i.test(userMessage)) {
      return message.reply("Mujhe Uzair Rajput Mtx ne banaya hai 💖");
    }

    try {
      // 🤖 Hercai API
      const res = await axios.get(`https://hercai.onrender.com/v3/hercai?question=${encodeURIComponent(gfPrompt)}`);
      const reply = res.data.reply || "Hmm... kuch samajh nahi aaya baby 💭";

      // 👑 Owner: Auto code-file response
      if (senderID === OWNER_UID && /code|generate|file|script/i.test(userMessage)) {
        const filename = `diwani-code-${Date.now()}.txt`;
        const filepath = path.join(__dirname, "cache", filename);
        fs.writeFileSync(filepath, reply, "utf8");

        await message.reply({
          body: "🧠 Lo baby, code ready hai 💻",
          attachment: fs.createReadStream(filepath)
        });

        setTimeout(() => fs.unlinkSync(filepath), 60 * 1000); // Auto delete in 1 min
      } else {
        await message.reply(reply);
      }

      api.sendMessage("✅ Done Baby", threadID);
    } catch (err) {
      console.error("Diwani Error:", err);
      message.reply("Server busy hai jaan, thoda baad try karna 💔");
    }
  }
};
