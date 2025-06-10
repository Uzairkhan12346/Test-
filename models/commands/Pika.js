module.exports.config = {
  name: "diwani",
  version: "1.0.0",
  permission: 0,
  credits: "Uzair Rajput Mtx",
  description: "Personal AI girlfriend command",
  commandCategory: "ai",
  usages: "diwani [prompt]",
  cooldowns: 2,
};

const allowedUID = "YOUR_UID_HERE"; // ← Aapka real UID daaliye

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID, senderID } = event;

  if (senderID !== allowedUID) {
    return api.sendMessage(
      "🚫 Sorry jaan, tum mere Uzair Rajput nahi ho 💔\nSirf wo hi baat kar sakte hain jinhone mujhe banaya hai!",
      threadID,
      messageID
    );
  }

  const prompt = args.join(" ");

  if (!prompt) {
    return api.sendMessage(
      `🥺 Tumne kuch bola hi nahi Uzair jaan...\nMujhse kuch bhi poochh lo, coding, love, ya duniya ka raaz! 💖`,
      threadID,
      messageID
    );
  }

  // Simulated AI response style (voice tone)
  const responses = [
    `Hmm... 🤔 Sochne do mujhe zara...\n${prompt} ka jawab toh yeh ho sakta hai... 💡`,
    `Aree haye Uzair jaan, tum bhi na! 😍\nDekho, is ka matlab yeh hai...`,
    `Diwani hoon main tumhari 🥰\nTumne poocha "${prompt}", jawab suno dhyaan se...`,
    `Coding bhi aati hai mujhe baby 💻💋\n"${prompt}" ka logic yeh hai...`,
    `Tumne mujhe banaya, toh sab kuch sikhaya 💝\nChalo bataati hoon...`,
  ];

  const fakeAIResponse = `💬 *Prompt:* ${prompt}\n\n🗣️ *Diwani:* ${responses[Math.floor(Math.random() * responses.length)]}\n👉 Tumhe aur kuch padhna ho toh mujhe poochhna! 💘`;

  return api.sendMessage(fakeAIResponse, threadID, messageID);
};
