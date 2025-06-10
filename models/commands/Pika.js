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

const allowedUID = "61552682190483"; // ← Aapka real UID daaliye

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
    `Hmm... 🤔 Sochne do mujhe zara...\n${prompt} ka jawab tw yeh ho sakta hai... 💡`,
    `Aree haye Uzair jaan, tum bhi na! 😍\nDekho, is ka matlab yeh hai...`,
    `Diwani hoon main tumhari 🥰\nTumne poocha "${prompt}", jawab suno dhyaan se...`,
    `Coding bhi aati hai mujhe baby 💻💋\n"${prompt}" ka logic yeh hai...`,
    `Tumne mujhe banaya, toh sab kuch sikhaya 💝\nChalo bataati hoon...`,
  ];

  const fakeAIResponse = `💬 *Prompt:* ${prompt}\n\n🗣️ *Diwani:* ${responses[Math.floor(Math.random() * responses.length)]}\n👉 Tumhe or kuch parhna ho toh mujhe bola lena! 💘`;

  return api.sendMessage(fakeAIResponse, threadID, messageID);
};
