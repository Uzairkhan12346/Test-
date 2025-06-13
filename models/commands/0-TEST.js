module.exports.config = {
  name: "zguide",     // <-- Change name from "\n" to meaningful
  version: "1.0.6",
  hasPermssion: 0,
  credits: "uzairrajput",
  description: "Prefix with randoimg",
  commandCategory: "prefix",
  usages: "just use your prefix",
  cooldowns: 0
};

module.exports.run = async ({ api, event, args, global }) => {
  const allicon = ["💞", "💖", "💗", "💜", "🌸", "💗", "💝", "🎀", "🌹", "🍁", "🎊", "🌟", "🍁"];
  const lol = allicon[Math.floor(Math.random() * allicon.length)];
  
  const moment = require("moment-timezone");
  const dcm = process.uptime();
  const seconds = Math.floor(dcm % 60);
  const minutes = Math.floor((dcm / 60) % 60);
  const hours = Math.floor(dcm / 3600);
  const timeNow = moment.tz("Asia/Karachi").format("DD/MM/YYYY || HH:mm:ss");
  let thu = moment.tz("Asia/Karachi").format("dddd");

  const quotes = [
    "It does not matter how slowly you go as long as you do not stop. - Confucius",
    // ... rest of your quotes
    "Your time is limited, so don’t waste it living someone else’s life. – Steve Jobs"
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const randomImages = [
    // Use valid image URLs (direct links to images, not Drive 'view' links)
    "https://i.imgur.com/abc123.jpg",
    "https://i.imgur.com/def456.jpg"
  ];
  const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];

  const start = Date.now();
  const imageStream = await global.nodemodule["axios"]({
    url: randomImage,
    method: "GET",
    responseType: "stream"
  });

  return api.sendMessage({
    body:
      `𝗵𝗲𝗹𝗹𝗼 𝗲𝘃𝗲𝗿𝘆𝗼𝗻𝗲, 𝘆𝗲𝘀 𝘆𝗼𝘂'𝗿𝗲 𝗿𝗶𝗴𝗵𝘁 𝘁𝗵𝗮𝘁'𝘀 𝗺𝘆 𝗽𝗿𝗲𝗳𝗶𝘅 𝗳𝗼𝗿 𝗻𝗼𝘄𝗶 𝘄𝗶𝗹𝗹 𝗴𝗶𝘃𝗲 𝘆𝗼𝘂 𝗮 𝗿𝗮𝗻𝗱𝗼𝗺𝗲𝗾𝘂𝗼𝘁𝗲𝘀!\n\n` +
      `𝗥𝗮𝗻𝗱𝗼𝗺 𝗤𝘂𝗼𝘁𝗲: ${randomQuote}\n` +
      `𝗧𝗼𝗱𝗮𝘆𝗶𝘀 𝗗𝗮𝘆: ${thu}\n` +
      `𝗗𝗮𝘁𝗲 & 𝗧𝗶𝗺𝗲: ${timeNow}\n` +
      `◆━━━━━◆『 ${lol} 』◆━━━━━◆\n\n` +
      `𝗕𝗢𝗧 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡:\n` +
      `➤ Status: Online 24/7\n` +
      `➤ Speed: ${Date.now() - start} ms\n` +
      `➤ Uptime: ${hours}h ${minutes}m ${seconds}s`,
    attachment: imageStream.data
  }, event.threadID, (err, info) => {
    if (err) return console.error(err);
    global.client.handleReply.push({
      name: module.exports.config.name,
      messageID: info.messageID,
      author: event.senderID,
      type: "admininfo"
    });
  });
};

module.exports.handleReply = async ({ api, event, handleReply }) => {
  if (handleReply.type === "admininfo" && event.messageID !== handleReply.messageID) {
    return api.sendMessage(
      `=== [ 𝗔𝗗𝗠𝗜𝗡 𝗕𝗢𝗧 ] ===\n` +
      `❯ Name: 𝑴𝒓𝑼𝒛𝒂𝒊𝒓𝑿𝒙𝑿\n` +
      `❯ Height: secret\n` +
      `❯ Date of birth: 15/10/2005\n` +
      `❯ Instagram: it'xuzair449\n` +
      `❯ Weight: 62\n` +
      `❯ Facebook: https://www.facebook.com/Mtxuzair\n` +
      `❯ Thanks for using 𝑴𝒓𝑼𝒛𝒂𝒊𝒓𝑿𝒙𝑿-𝑴𝑻𝑿 💚✨ bot 🤖.`,
      event.threadID
    );
  }
};
