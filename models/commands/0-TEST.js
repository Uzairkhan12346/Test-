module.exports.config = {
  name: "prefixinfo",
  version: "1.0.5",
  hasPermssion: 0,
  credits: "uzairrajput",
  description: "Prefix with randoimg",
  commandCategory: "prefix",
  usages: "just use your prefix",
  cooldowns: 0,
};

module.exports.run = async ({ api, event }) => {
  const allicon = ["💞", "💖", "💗", "💜", "🌸", "💗", "💝", "🎀", "🌹", "🍁", "🎊", "🌟", "🍁"];
  const lol = allicon[Math.floor(Math.random() * allicon.length)];
  const moment = require("moment-timezone");
  const axios = require("axios");
  const timeStart = Date.now();
  const dcm = process.uptime();
  const hours = Math.floor(dcm / 3600);
  const minutes = Math.floor((dcm % 3600) / 60);
  const seconds = Math.floor(dcm % 60);
  const timeNow = moment.tz("Asia/Karachi").format("DD/MM/YYYY || HH:mm:ss");
  const thu = moment.tz("Asia/Karachi").format("dddd");

  const quotes = [
    "It does not matter how slowly you go as long as you do not stop. - Confucius",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "The purpose of our lives is to be happy. — Dalai Lama",
    "Life is what happens when you're busy making other plans. — John Lennon",
    "Get busy living or get busy dying. — Stephen King",
    "You only live once, but if you do it right, once is enough. — Mae West",
    "Many of life’s failures are people who did not realize how close they were to success when they gave up. – Thomas Edison",
    "If you want to live a happy life, tie it to a goal, not to people or things. – Albert Einstein",
    "Never let the fear of striking out keep you from playing the game. – Babe Ruth",
    "Money and success don’t change people; they merely amplify what is already there. — Will Smith",
    "Your time is limited, so don’t waste it living someone else’s life. – Steve Jobs"
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const randomImage = "https://i.ibb.co/YTDGhpC8/received-712740294739164.jpg";

  const sentMsg = await api.sendMessage({
    body:
      `𝗵𝗲𝗹𝗹𝗼 𝗲𝘃𝗲𝗿𝘆𝗼𝗻𝗲, 𝘆𝗲𝘀 𝘆𝗼𝘂'𝗿𝗲 𝗿𝗶𝗴𝗵𝘁 𝘁𝗵𝗮𝘁'𝘀 𝗺𝘆 𝗽𝗿𝗲𝗳𝗶𝘅 𝗳𝗼𝗿 𝗻𝗼𝘄!\n\n` +
      `𝗥𝗮𝗻𝗱𝗼𝗺 𝗤𝘂𝗼𝘁𝗲: ${randomQuote}\n\n` +
      `𝗧𝗼𝗱𝗮𝘆 𝗶𝘀: ${thu}\n` +
      `𝗧𝗶𝗺𝗲 𝗡𝗼𝘄: ${timeNow}\n` +
      `◆━━━━━◆『 ${lol} 』◆━━━━━◆\n\n` +
      `𝗕𝗢𝗧 𝗜𝗡𝗙𝗢:\n` +
      `• Status: Online 24/7\n` +
      `• Response speed: ${Date.now() - timeStart}ms\n` +
      `• Uptime: ${hours}h ${minutes}m ${seconds}s`,
    attachment: (await axios.get(randomImage, { responseType: "stream" })).data
  }, event.threadID, (err, info) => {
    if (!err) {
      global.client.handleReply.push({
        name: module.exports.config.name,
        messageID: info.messageID,
        author: event.senderID,
        type: "admininfo"
      });
    }
  });
};

module.exports.handleReply = async ({ api, event, handleReply }) => {
  if (handleReply.type === "admininfo") {
    return api.sendMessage(
      `=== [ 𝗔𝗗𝗠𝗜𝗡 𝗜𝗡𝗙𝗢 ] ===\n` +
      `❯ Name: 𝑴𝒓𝑼𝒛𝒂𝒊𝒓𝑿𝒙𝑿\n` +
      `❯ Height: secret\n` +
      `❯ Date of birth: 15/10/2005\n` +
      `❯ Instagram: it'xuzair449\n` +
      `❯ Weight: 62\n` +
      `❯ Facebook: https://www.facebook.com/Mtxuzair\n\n` +
      `❯ Thanks for using 𝑴𝒓𝑼𝒛𝒂𝒊𝒓𝑿𝒙𝑿-𝑴𝑻𝑿 💚✨ bot 🤖.`,
      event.threadID, event.messageID
    );
  }
};
