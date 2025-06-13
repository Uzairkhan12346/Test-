const axios = require("axios");
const moment = require("moment-timezone");

module.exports.config = {
  name: "randoimg",
  version: "1.0.5",
  hasPermssion: 0,
  credits: "uzairrajput",
  description: "Shows random quote, image and reply with admin info",
  commandCategory: "utility",
  usages: "randoimg",
  cooldowns: 0,
};

module.exports.run = async ({ api, event }) => {
  const imageUrl = "https://i.ibb.co/YTDGhpC8/received-712740294739164.jpg";

  const quotes = [
    "Life is what happens when you're busy making other plans. — John Lennon",
    "It does not matter how slowly you go as long as you do not stop. - Confucius",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "You only live once, but if you do it right, once is enough. — Mae West"
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const now = moment.tz("Asia/Karachi");
  const date = now.format("DD/MM/YYYY || HH:mm:ss");
  const day = now.format("dddd");

  const uptime = process.uptime();
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);

  const msg = {
    body:
      `🌟 here's your random quotes:\n${randomQuote}\n\n` +
      `📅 the calendar told me that the day right now is: ${day}\n` +
      `⏰ here's the date and time now:\n${date}\n\n` +
      `🧠 BOT INFORMATION:\n` +
      `The Bot Status: Online 24/7\n` +
      `Processing speed: 0 second\n` +
      `The Bot Online at: ${hours} hour ${minutes} minute ${seconds} seconds.\n\n` +
      `🖼️ Image loaded below 👇`,
    attachment: (await axios.get(imageUrl, { responseType: "stream" })).data
  };

  return api.sendMessage(msg, event.threadID, async (err, info) => {
    if (!err) {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: event.senderID,
        type: "adminreply"
      });
    }
  });
};

module.exports.handleReply = async ({ api, event, handleReply }) => {
  if (handleReply.type !== "adminreply") return;

  return api.sendMessage(
    `👤 𝗕𝗢𝗧 𝗔𝗗𝗠𝗜𝗡 𝗜𝗡𝗙𝗢:\n\n` +
    `❯ Name: 𝑴𝒓𝑼𝒛𝒂𝒊𝒓𝑿𝒙𝑿\n` +
    `❯ Height: Secret\n` +
    `❯ DOB: 15/10/2005\n` +
    `❯ Instagram: it'xuzair449\n` +
    `❯ Facebook: https://www.facebook.com/Mtxuzair\n` +
    `❯ Weight: 62kg\n\n` +
    `💖 Bot created with love by Uzair Mtx ✨`,
    event.threadID,
    event.messageID
  );
};
