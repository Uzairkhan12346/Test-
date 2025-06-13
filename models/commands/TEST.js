module.exports.config = {
  name: "\n",
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
  const timeStart = Date.now();
  const dcm = process.uptime();
  var seconds = Math.floor(dcm / (60 * 60));
  var minutes = Math.floor((dcm % (60 * 60)) / 60);
  var hours = Math.floor(dcm % 60);
  const timeNow = moment.tz("Asia/Karachi").format("DD/MM/YYYY || HH:mm:ss");

  var thu = moment.tz('Asia/Karachi').format('dddd');
  if (thu == 'Sunday') thu = 'Sunday';
  if (thu == 'Monday') thu = 'Monday';
  if (thu == 'Tuesday') thu = 'Tuesday';
  if (thu == 'Wednesday') thu = 'Wednesday';
  if (thu == "Thursday") thu = 'Thursday';
  if (thu == 'Friday') thu = 'Friday';
  if (thu == 'Saturday') thu = 'Saturday';

  const quotes = [
    "It does not matter how slowly you go as long as you do not stop. - Confucius",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "The purpose of our lives is to be happy. — Dalai Lama",
    "Life is what happens when you're busy making other plans. — John Lennon",
    "Get busy living or get busy dying. — Stephen King",
    "You only live once, but if you do it right, once is enough. — Mae West",
    "Many of life’s failures are people who did not realize how close they were to success when they gave up. – Thomas A. Edison",
    "If you want to live a happy life, tie it to a goal, not to people or things.– Albert Einstein",
    "Never let the fear of striking out keep you from playing the game.– Babe Ruth",
    "Money and success don’t change people; they merely amplify what is already there. — Will Smith",
    "Your time is limited, so don’t waste it living someone else’s life. Don’t be trapped by dogma – which is living with the results of other people’s thinking. – Steve Jobs",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const randomImages = [
    "https://drive.google.com/uc?id=17zEuf5Scwefsrd8yr9uPrQFeNMjhy85o",
    "https://drive.google.com/uc?id=17dOM3HaoYSii0dUSR97GiY8AW1bU6yJe",

"https://drive.google.com/uc?id=187jD7F08XOjdEH8okCFcb0j0iTuYZfgo",

"https://drive.google.com/uc?id=17rXCnKyhbTXZ6ieEz8gFq5l5fs2ZUvxb",

"https://drive.google.com/uc?id=188IqN_aZulLV4SlRmlYSFuEtDJZoi-An"
  ];

  const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];

  const messageInfo = await api.sendMessage({
    body: `𝗵𝗲𝗹𝗹𝗼 𝗲𝘃𝗲𝗿𝘆𝗼𝗻𝗲, 𝘆𝗲𝘀 𝘆𝗼𝘂'𝗿𝗲 𝗿𝗶𝗴𝗵𝘁 𝘁𝗵𝗮𝘁'𝘀 𝗺𝘆 𝗽𝗿𝗲𝗳𝗶𝘅 𝗳𝗼𝗿 𝗻𝗼𝘄 𝗶 𝘄𝗶𝗹𝗹 𝗴𝗶𝘃𝗲 𝘆𝗼𝘂 𝗮 𝗿𝗮𝗻𝗱𝗼𝗺𝗲𝗾𝘂𝗼𝘁𝗲𝘀!\n\n 𝗵𝗲𝗿𝗲'𝘀 𝘆𝗼𝘂𝗿 𝗿𝗮𝗻𝗱𝗼𝗺 𝗾𝘂𝗼𝘁𝗲𝘀: ${randomQuote}\n\n𝘁𝗵𝗲 𝗰𝗮𝗹𝗲𝗻𝗱𝗮𝗿 𝘁𝗼𝗹𝗱 𝗺𝗲 𝘁𝗵𝗮𝘁 𝘁𝗵𝗲 𝗱𝗮𝘆 𝗿𝗶𝗴𝗵𝘁 𝗻𝗼𝘄 𝗶𝘀: ${thu}\n\n\𝗵𝗲𝗿𝗲'𝘀 𝘁𝗵𝗲 𝗱𝗮𝘁𝗲 𝗮𝗻𝗱 𝘁𝗶𝗺𝗲 𝗻𝗼𝘄:
     ${timeNow}\n◆━━━━◆『 ${lol} 』◆━━━◆\n\n𝗕𝗢𝗧 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡:
     \nThe Bot Status: Online 24/7\nProcessing speed: ${Date.now() - timeStart} second\nThe Bot Online at: ${seconds} hour ${minutes} minute ${hours} seconds. 」`,
    attachment: (await global.nodemodule["axios"]({
      url: randomImage,
      method: "GET",
      responseType: "stream"
    })).data
  }, event.threadID);

  const handleReply = ({ event }) => {
    if (event.messageID === messageInfo.messageID && event.userID !== api.getCurrentUserID()) {
      api.sendMessage(
        `=== [ 𝗔𝗗𝗠𝗜𝗡 𝗕𝗢𝗧 ] ===\n` +
        `❯ Name: 𝑴𝒓𝑼𝒛𝒂𝒊𝒓𝑿𝒙𝑿\n` +
        `❯ Height: secret\n` +
        `❯ Date of birth: 15/10/2005\n` +
        `❯ Instagram: it'xuzair449\n` +
        `❯ Weight: 62\n` +
        `❯ Facebook: https://www.facebook.com/Mtxuzair\n` +
        `❯ Thanks for using 𝑴𝒓𝑼𝒛𝒂𝒊𝒓𝑿𝒙𝑿-𝑴𝑻𝑿 💚✨ bot 🤖.`, event.threadID
      );

      api.removeListener(handleReply);
    }
  };

  api.listenMqttEvent('message_reply', handleReply);
};
