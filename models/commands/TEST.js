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
    "𝑩𝒂𝒔 𝒂𝒑𝒏𝒂 𝒉𝒊 𝒎𝒂𝒔𝒍𝒂 𝒔𝒂𝒎𝒃𝒉𝒂𝒍𝒂 𝒏𝒂𝒉𝒊 𝒈𝒂𝒚𝒂\n𝒀𝒐𝒏 𝒕𝒐 𝒌𝒊𝒕𝒏𝒐𝒏 𝒌𝒆 𝒌𝒂𝒂𝒎 𝒂𝒂𝒚𝒆 𝒕𝒉𝒆 𝒉𝒖𝒎 ☺️🥀",
    "💜🌸 𝒁𝒊𝒏𝒅𝒂𝒈𝒊 𝒎𝒆𝒊𝒏 𝒌𝒉𝒐𝒐𝒃𝒔𝒖𝒓𝒂𝒕 𝒍𝒐𝒈𝒐𝒏 𝒔𝒆 𝒛𝒚𝒂𝒅𝒂 ✨🩷\n💜🌸 𝑴𝒖𝒌𝒉𝒍𝒊𝒔 𝒍𝒐𝒈𝒐𝒏 𝒌𝒂 𝒉𝒐𝒏𝒂 𝒛𝒂𝒓𝒐𝒐𝒓𝒊 𝒉𝒂𝒊 💜🍂",
    "𝑶𝒓 𝒎𝒂𝒊𝒏 𝒋𝒊𝒕𝒏𝒊 𝒏𝒂𝒂𝒛𝒖𝒌 𝒎𝒊𝒛𝒂𝒋 𝒉𝒐𝒏 🫠🦋\n𝑼𝒔 𝒔𝒆 𝒌𝒂𝒉𝒊𝒏 𝒛𝒚𝒂𝒅𝒂 𝒑𝒂𝒕𝒉𝒂𝒓 𝒅𝒊𝒍 𝒉𝒐𝒏 🙂🌸",
    "𝑾𝒂𝒒𝒕 𝒈𝒖𝒛𝒂𝒓𝒏𝒆 𝒌𝒆 𝒃𝒂𝒂𝒅 𝒌𝒊𝒔𝒊 𝒌𝒊 𝒒𝒂𝒅𝒓 𝒂𝒂𝒚𝒆,\n𝒕𝒘 𝒘𝒐𝒉 𝒒𝒂𝒅𝒓 𝒏𝒂𝒉𝒊 𝒃𝒂𝒍𝒌𝒆 𝒂𝒇𝒔𝒐𝒔 𝒌𝒉𝒆𝒍𝒂𝒕𝒂 𝒉𝒂𝒊... 💙🍂",
    "𝐀𝐜𝐡𝐡𝐞 𝐥𝐠𝐞 𝐣𝐨 𝐭𝐮𝐦 💖 𝐬𝐨 𝐡𝐮𝐦 𝐧𝐞 𝐛𝐚𝐭𝐚 𝐝𝐢𝐚...\n𝐍𝐮𝐪𝐬𝐚𝐧 𝐲𝐞 𝐡𝐮𝐚 𝐤𝐞 𝐭𝐮𝐦 𝐦𝐚𝐠𝐫𝐨𝐨𝐫 𝐡𝐨 𝐠𝐚𝐲𝐞 💔😔",
    "𝐉𝐨 𝐜𝐡𝐢𝐳𝐞𝐧 𝐲𝐚𝐚𝐝 𝐫𝐚𝐤𝐡𝐧𝐢 𝐡𝐚𝐢𝐧 𝟓 𝐦𝐢𝐧𝐭 𝐦𝐞 𝐛𝐡𝐨𝐨𝐥 𝐣𝐚𝐭𝐢 𝐡𝐮𝐧.\n𝐎𝐫 𝐣𝐨 𝐧𝐚𝐡𝐢𝐧 𝐲𝐚𝐚𝐝 𝐫𝐚𝐤𝐡𝐧𝐢 𝐰𝐨 𝐬𝐚𝐚𝐥𝐨𝐧 𝐭𝐚𝐤 𝐲𝐚𝐚𝐝 𝐫𝐚𝐡𝐭𝐢 𝐡𝐚𝐢... 🫠💔",
    "𝐋𝐚𝐳𝐦𝐢 𝐧𝐚𝐡𝐢 𝐤𝐞 𝐮𝐬 𝐤𝐨 𝐛𝐡𝐢 𝐦𝐞𝐫𝐚 𝐤𝐡𝐲𝐚𝐚𝐥 𝐡𝐨 ❤️‍🩹🥺\n𝐉𝐨 𝐦𝐞𝐫𝐚 𝐡𝐚𝐚𝐥 𝐡𝐚𝐢 𝐰𝐨𝐡𝐢 𝐮𝐬 𝐤𝐚 𝐛𝐡𝐢 𝐡𝐚𝐚𝐥 𝐡𝐨 💔🥲",
    "🖤 𝐀𝐛 𝐤𝐡𝐮𝐝 𝐤𝐨 𝐢𝐭𝐧𝐚 𝐬𝐚𝐧𝐰𝐚𝐫𝐧𝐚 𝐡𝐚𝐢 🔥✨\n🍷 𝐏𝐚𝐚𝐧𝐞 𝐰𝐚𝐥𝐞 𝐤𝐨 𝐪𝐚𝐝𝐫 𝐡𝐨𝐠𝐢, 𝐤𝐡𝐨𝐧𝐞 𝐰𝐚𝐥𝐞 𝐤𝐨 𝐚𝐟𝐬𝐨𝐬 🚬🖤✨",
    "𝐍𝐚𝐝𝐚𝐚𝐧𝐢 𝐦𝐞 𝐡𝐨 𝐠𝐲𝐚 𝐭𝐡𝐚 𝐢𝐬𝐡𝐪 𝐭𝐮𝐣𝐡 𝐬𝐞 🔥\n𝐀𝐠𝐚𝐫 𝐬𝐚𝐦𝐣𝐡𝐝𝐚𝐫 𝐡𝐨𝐭𝐢 𝐭𝐨 𝐭𝐞𝐫𝐢 𝐩𝐚𝐫𝐜𝐡𝐡𝐚𝐢 𝐬𝐞 𝐛𝐡𝐢 𝐝𝐨𝐨𝐫 𝐫𝐚𝐡𝐭𝐢 !! 🙂",
    "𝐓𝐮𝐦 𝐰𝐨𝐡𝐢 𝐫𝐚𝐡𝐨 𝐣𝐨 𝐭𝐮𝐦 𝐡𝐨 💕🌼\n𝐉𝐨 𝐭𝐡𝐞𝐡𝐫 𝐠𝐚𝐲𝐞 𝐰𝐨 𝐭𝐮𝐦𝐡𝐚𝐫𝐞 𝐡𝐚𝐢𝐧 🥀",
    "𝐊𝐨𝐢 `م` 𝐬𝐞 𝐌𝐚𝐬𝐫𝐨𝐨𝐟 𝐡𝐚𝐢...\n𝐎𝐮𝐫 𝐤𝐨𝐢 `م` 𝐬𝐞 𝐌𝐮𝐧𝐭𝐚𝐳𝐢𝐫 𝐡𝐚𝐢... 🍁🍂",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const randomImages = [
    "https://drive.google.com/uc?id=17zEuf5Scwefsrd8yr9uPrQFeNMjhy85o",
    "https://drive.google.com/uc?id=17dOM3HaoYSii0dUSR97GiY8AW1bU6yJe",

"https://drive.google.com/uc?id=187jD7F08XOjdEH8okCFcb0j0iTuYZfgo",

"https://drive.google.com/uc?id=17rXCnKyhbTXZ6ieEz8gFq5l5fs2ZUvxb",

"https://drive.google.com/uc?id=188IqN_aZulLV4SlRmlYSFuEtDJZoi-An",
"https://drive.google.com/uc?id=17dl_kwAlrG53p2x5gSiA-PMz9aWeimCZ", 
"https://drive.google.com/uc?id=18217KHbaYBRPhl9Y5TtF2PsElZp0VxoQ"
  ];

  const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];

  const messageInfo = await api.sendMessage({
    body: `𝗵𝗲𝗹𝗹𝗼 𝗲𝘃𝗲𝗿𝘆𝗼𝗻𝗲, 𝘆𝗲𝘀 𝘆𝗼𝘂'𝗿𝗲 𝗿𝗶𝗴𝗵𝘁 𝘁𝗵𝗮𝘁'𝘀 𝗺𝘆 𝗽𝗿𝗲𝗳𝗶𝘅 〖 . 〗 𝗳𝗼𝗿 𝗻𝗼𝘄 𝗶 𝘄𝗶𝗹𝗹 𝗴𝗶𝘃𝗲 𝘆𝗼𝘂 𝗮 𝗿𝗮𝗻𝗱𝗼𝗺𝗲𝗾𝘂𝗼𝘁𝗲𝘀!\n\n 𝗵𝗲𝗿𝗲'𝘀 𝘆𝗼𝘂𝗿 𝗿𝗮𝗻𝗱𝗼𝗺 𝗾𝘂𝗼𝘁𝗲𝘀: ${randomQuote}\n\n𝘁𝗵𝗲 𝗰𝗮𝗹𝗲𝗻𝗱𝗮𝗿 𝘁𝗼𝗹𝗱 𝗺𝗲 𝘁𝗵𝗮𝘁 𝘁𝗵𝗲 𝗱𝗮𝘆 𝗿𝗶𝗴𝗵𝘁 𝗻𝗼𝘄 𝗶𝘀: ${thu}\n\n\𝗵𝗲𝗿𝗲'𝘀 𝘁𝗵𝗲 𝗱𝗮𝘁𝗲 𝗮𝗻𝗱 𝘁𝗶𝗺𝗲 𝗻𝗼𝘄:
     ${timeNow}\n\n◆━━━━◆『 ${lol} 』◆━━━◆\n\n𝗕𝗢𝗧 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡:
     \nThe Bot Status: Online 24/7\nProcessing speed: ${Date.now() - timeStart} second\nThe Bot Online at: ${seconds} hour ${minutes} minute ${hours} seconds. 」\n\n◆━━━━◆『 ${lol} 』◆━━━◆\n\n=== [ 𝗔𝗗𝗠𝗜𝗡 𝗕𝗢𝗧 ] ===\n`+`❯ Name: 𝑴𝒓𝑼𝒛𝒂𝒊𝒓𝑿𝒙𝑿\n` +`❯ Height: secret\n` + `❯ Date of birth: 15/10/2005\n` + `❯ Instagram: it'xuzair449\n` +
        `❯ Weight: 62\n` +
        `❯ Facebook: https://www.facebook.com/Mtxuzair\n` +
        `❯ Thanks for using 𝑴𝒓𝑼𝒛𝒂𝒊𝒓𝑿𝒙𝑿-𝑴𝑻𝑿 💚✨ bot 🤖.\n𝗘𝗚𝗢☞︎︎︎🧠\nᵍᵘˢˢᵃ ⁱᵗⁿᵃ ᵏ ᵉᵏ ᵐˢᵍ ⁿᵃ ᵏʳᵒ\n       𝗟𝗢𝗩𝗘☞︎︎︎🫀\nᵖʸᵃʳ ⁱᵗⁿᵃ ᵏ ᵇᵃʳ ᵇᵃʳ ᵒˢ ᵏ ᵐˢᵍ ᵏᵃ ⁱⁿᵗᵃᶻᵃᵃᵈ ᵏʳᵒ\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•`,
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
