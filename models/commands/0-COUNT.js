const fs = require("fs");
module.exports.config = {
  name: "3",
  version: "6.6.6",
  hasPermssion: 0,
  credits: "uzairrajput",
  description: "🔥 Stylish Mafia Owner Card 🔥",
  commandCategory: "no prefix",
  cooldowns: 5,
};

module.exports.handleEvent = async ({ api, event, Users }) => {
  const name = await Users.getNameUser(event.senderID);
  const { threadID, messageID } = event;
  const react = event.body.toLowerCase();

  if (
    react.includes("1") ||
    react.includes("1") ||
    react.includes("2")
  ) {
    const msg = {
      body: `
╭━━━[ 🔥 𝙈𝘼𝙁𝙄𝘼 𝘽𝙊𝙎𝙎 𝙀𝙉𝙏𝙍𝙔 🔥 ]━━━╮
   😈 𝐇𝐞𝐲 ${name}, 𝐎𝐰𝐧𝐞𝐫 𝐀𝐫𝐫𝐢𝐯𝐞𝐝...
╰━━━━━━━━━━━━━━━━━━━━━━━╯

👑 𝐍𝐀𝐌𝐄 : 『ＭＴＸ』⚡ 𝐊𝐢𝐫𝐚𝐧 𝐑𝐚𝐣𝐩𝐮𝐭  
🛡️ 𝐓𝐈𝐓𝐋𝐄 : 𝐓𝐡𝐞 𝐋𝐞𝐠𝐞𝐧𝐝 𝐘𝐨𝐮 𝐂𝐚𝐧'𝐭 𝐓𝐨𝐮𝐜𝐡  
🖤 𝐒𝐓𝐀𝐓𝐔𝐒 : 𝘼𝙩𝙩𝙞𝙩𝙪𝙙𝙚 𝙄𝙨 𝙈𝙮 𝘽𝙧𝙖𝙣𝙙  
📍 𝐋𝐎𝐂𝐀𝐓𝐈𝐎𝐍 : 𝐇𝐲𝐝𝐞𝐫𝐚𝐛𝐚𝐝 - 𝐒𝐢𝐧𝐝𝐡  
💻 𝐅𝐈𝐄𝐋𝐃 : 𝐁.𝐓𝐞𝐜𝐡 - 𝐂𝐨𝐝𝐞 𝐒𝐭𝐫𝐞𝐞𝐭𝐬  

💘 𝐋𝐎𝐕𝐄 : 𝐎𝐧𝐥𝐲 𝐅𝐨𝐫 𝐌𝐲 𝐀𝐭𝐭𝐢𝐭𝐮𝐝𝐞 💋

🔗 𝐅𝐁 : facebook.com/Mtxuzair  
📵 𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏 : 𝐓𝐎𝐏 𝐒𝐄𝐂𝐑𝐄𝐓

━━━━━━━━━━━━━━━━━━━━━
🔥 𝗤𝗨𝗢𝗧𝗘:
❝ 𝐈 𝐃𝐢𝐝𝐧’𝐭 𝐂𝐡𝐚𝐧𝐠𝐞, 𝐈 𝐋𝐞𝐯𝐞𝐥𝐞𝐝 𝐔𝐩.  
𝐍𝐨𝐰 𝐈’𝐦 𝐓𝐡𝐞 𝐁𝐎𝐒𝐒. ❞

⚠️ 𝗪𝗔𝗥𝗡𝗜𝗡𝗚:
𝐁𝐞 𝐂𝐚𝐫𝐞𝐟𝐮𝐥 𝐖𝐡𝐞𝐧 𝐘𝐨𝐮 𝐏𝐥𝐚𝐲 𝐖𝐢𝐭𝐡 𝐅𝐈𝐑𝐄 🔥

┌───── ⭑ 🔥 ⭑ ─────┐
👑 𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•.
└───── ⭑ 🔥 ⭑ ─────┘`,
      attachment: fs.createReadStream(__dirname + `/uzair/Owner.gif`)
    };
    api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😈", event.messageID, () => {}, true);
  }
};

module.exports.run = async () => {};
