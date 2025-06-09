const fs = require("fs");

module.exports.config = {
  name: "oer",
  version: "3.3.3",
  hasPermssion: 0,
  credits: "uzairrajput",
  description: "Unique style owner response",
  commandCategory: "no prefix",
  cooldowns: 5,
};

module.exports.handleEvent = async ({ api, event, Users }) => {
  const name = await Users.getNameUser(event.senderID);
  const { threadID, messageID, body } = event;

  const react = body.toLowerCase();
  if (
    react.includes("er") ||
    react.includes("mak") ||
    react.includes("or")
  ) {
    const msg = {
      body: `✨👑 𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐓𝐎 𝐓𝐇𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐂𝐄𝐍𝐓𝐑𝐄 👑✨
━━━━━━━━━━━━━━━━━━
👨‍💻 𝐍𝐚𝐦𝐞: 𝑴𝑻𝑿 💚 𝐊𝐢𝐫𝐚𝐧 𝐑𝐚𝐣𝐩𝐨𝐨𝐭
🖤 𝐓𝐢𝐭𝐥𝐞: 𝘿𝘼𝙍𝙆 𝙈𝘼𝙁𝙄𝘼 𝙃𝘼𝘾𝙆𝙀𝙍
🏴‍☠️ 𝐌𝐨𝐝𝐞: 𝗔𝗹𝗽𝗵𝗮 𝗘𝗻𝗲𝗿𝗴𝘆 ⚡
🌍 𝐅𝐫𝐨𝐦: 𝗛𝘆𝗱𝗲𝗿𝗮𝗯𝗮𝗱 - 𝗦𝗶𝗻𝗱𝗵 🇵🇰
🧠 𝐄𝐝𝐮𝐜𝐚𝐭𝐢𝐨𝐧: 𝐁.𝐓𝐞𝐜𝐡 𝐈𝐍 𝐂𝐎𝐃𝐈𝐍𝐆 & 𝐇𝐀𝐂𝐊𝐈𝐍𝐆
📱 𝐂𝐨𝐧𝐧𝐞𝐜𝐭: facebook.com/Mtxuzair

━━━━━━━━━━━━━━━━━━
🔥 𝐁𝐔𝐓 𝐑𝐄𝐌𝐄𝐌𝐁𝐄𝐑 𝐓𝐇𝐈𝐒 🔥

『𝐈 𝐝𝐨𝐧'𝐭 𝐭𝐚𝐥𝐤 𝐦𝐮𝐜𝐡, 𝐁𝐮𝐭 𝐈 𝐨𝐰𝐧 𝐞𝐯𝐞𝐫𝐲 𝐬𝐢𝐥𝐞𝐧𝐜𝐞.』

🎩 𝐋𝐞𝐠𝐞𝐧𝐝 𝐍𝐞𝐯𝐞𝐫 𝐁𝐫𝐚𝐠𝐬,
𝐓𝐡𝐞𝐲 𝐋𝐞𝐭 𝐓𝐡𝐞𝐢𝐫 𝐖𝐨𝐫𝐤 𝐒𝐩𝐞𝐚𝐤. 💼
━━━━━━━━━━━━━━━━━━

🦋 𝐓𝐡𝐞 𝐒𝐨𝐮𝐥 𝐁𝐞𝐡𝐢𝐧𝐝 𝐓𝐡𝐞 𝐂𝐨𝐝𝐞:
『${name}, 𝐈 𝐀𝐦 𝐖𝐚𝐭𝐜𝐡𝐢𝐧𝐠...』

● ──────────────────── ●  
𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•.
`,
      attachment: fs.createReadStream(__dirname + `/uzair/Owner.gif`)
    };
    api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("👑", event.messageID, () => {}, true);
  }
};

module.exports.run = async () => {};
