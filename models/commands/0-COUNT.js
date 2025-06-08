module.exports.config = {
  name: "meme",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Uzair Edit",
  description: "Random Stylish Memes",
  commandCategory: "fun",
  usages: "meme",
  cooldowns: 5
};

const axios = require('axios');
const fs = require('fs');

module.exports.run = async ({ api, event }) => {
  const threadID = event.threadID;

  // 🔥 Stylish Roman Urdu Meme Links (Add more as needed)
  const memeUrls = [
    "https://i.imgflip.com/7x2a4k.jpg",
    "https://i.redd.it/b5f2tkw70zq81.jpg",
    "https://i.imgflip.com/7v2yzg.jpg",
    "https://i.redd.it/yh3e0efvcnq61.jpg",
    "https://i.redd.it/m4p37xem2uq61.jpg",
    "https://i.pinimg.com/736x/d1/99/bd/d199bd2a98b119c0e02d75ef0559e3a3.jpg"
  ];

  const randomMemes = Array.from({ length: 6 }, () => {
    const rand = memeUrls[Math.floor(Math.random() * memeUrls.length)];
    return rand;
  });

  const attachments = await Promise.all(randomMemes.map(async (url) => {
    return (await axios.get(url, { responseType: 'stream' })).data;
  }));

  api.sendMessage({
    body: `🌚 𝗟𝗲 𝗠𝗲𝗺𝗲 𝗔𝗮𝗴𝗮𝗲 𝗧𝗲𝗿𝗲 𝗟𝗶𝗲 🤣
🖼️ 𝟲 Random Memes From Roman Urdu World`,
    attachment: attachments
  }, threadID);
};
