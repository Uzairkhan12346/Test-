module.exports.config = {
  name: "zguide",
  version: "1.0.7",
  hasPermssion: 0,
  credits: "uzairrajput",
  description: "Random quote & image with reply info",
  commandCategory: "fun",
  usages: "prefix",
  cooldowns: 3,
};

module.exports.run = async ({ api, event }) => {
  const axios = require("axios");
  const moment = require("moment-timezone");

  const quotes = [
    "It does not matter how slowly you go as long as you do not stop. - Confucius",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Life is what happens when you're busy making other plans. — John Lennon",
    "Get busy living or get busy dying. — Stephen King",
    "You only live once, but if you do it right, once is enough. — Mae West"
  ];
  const icons = ["💞", "💖", "💗", "💜", "🌸", "💝", "🌹", "🌟"];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const randomIcon = icons[Math.floor(Math.random() * icons.length)];

  const timeNow = moment.tz("Asia/Karachi").format("DD/MM/YYYY || HH:mm:ss");
  const dayNow = moment.tz("Asia/Karachi").format("dddd");

  const uptimeSec = process.uptime();
  const hours = Math.floor(uptimeSec / 3600);
  const minutes = Math.floor((uptimeSec % 3600) / 60);
  const seconds = Math.floor(uptimeSec % 60);

  const imageUrl = "https://i.ibb.co/YTDGhpC8/received-712740294739164.jpg"; // ✅ Direct link required

  const res = await axios.get(imageUrl, { responseType: "stream" });

  return api.sendMessage({
    body:
`✨ 𝗛𝗲𝗹𝗹𝗼 𝗕𝗲𝗮𝘂𝘁𝗶𝗲𝘀 ✨

📜 𝗥𝗮𝗻𝗱𝗼𝗺 𝗤𝘂𝗼𝘁𝗲:
"${randomQuote}"

📅 𝗗𝗮𝘁𝗲 & 𝗗𝗮𝘆: ${dayNow} - ${timeNow}
⏱️ 𝗕𝗼𝘁 𝗨𝗽𝘁𝗶𝗺𝗲: ${hours}h ${minutes}m ${seconds}s
◆━━━━━◆『 ${randomIcon} 』◆━━━━━◆

(Reply to this message for admin info!)`,
    attachment: res.data
  }, event.threadID, (err, info) => {
    global.client.handleReply.push({
      name: module.exports.config.name,
      messageID: info.messageID,
      author: event.senderID,
      type: "admininfo"
    });
  });
};

module.exports.handleReply = async ({ api, event, handleReply }) => {
  if (handleReply.type === "admininfo" && event.messageID) {
    return api.sendMessage(
`=== [ 𝗔𝗗𝗠𝗜𝗡 𝗜𝗡𝗙𝗢 ] ===

👤 Name: 𝑴𝒓𝑼𝒛𝒂𝒊𝒓𝑿𝒙𝑿
🎂 DOB: 15/10/2005
📏 Height: Secret
⚖️ Weight: 62kg
📸 Instagram: it'xuzair449
📘 Facebook: https://facebook.com/Mtxuzair

Thanks for using ✨ 𝑴𝒓𝑼𝒛𝒂𝒊𝒓𝑿𝒙𝑿 - 𝑴𝑻𝑿 ✨ bot 🤖`, event.threadID);
  }
};
