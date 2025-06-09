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
    // Calculate uptime
    const uptime = process.uptime(); // in seconds
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    const formattedUptime = `${hours}h ${minutes}m ${seconds}s`;

    const msg = {
      body: `✨👑 𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐓𝐎 𝐓𝐇𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐂𝐄𝐍𝐓𝐑𝐄 👑✨
╭━━━━━━━━━━━━━━━╮
┃ 🧠 𝐍𝐚𝐚𝐦: 𝑴𝑻𝑿 💚 𝐊𝐢𝐫𝐚𝐧 𝐑𝐚𝐣𝐩𝐨𝐨𝐭
┃ ☠️ 𝐓𝐢𝐭𝐥𝐞: 𝘿𝘼𝙍𝙆 𝙈𝘼𝙁𝙄𝘼 𝙃𝘼𝘾𝙆𝙀𝙍
┃ ⚡ 𝐌𝐨𝐝𝐞: 𝗔𝗹𝗽𝗵𝗮 𝗘𝗻𝗲𝗿𝗴𝘆
┃ 🏴 𝐂𝐢𝐭𝐲: 𝐇𝐲𝐝𝐞𝐫𝐚𝐛𝐚𝐝, 𝐒𝐢𝐧𝐝𝐡 🇵🇰
┃ 📚 𝐒𝐭𝐮𝐝𝐲: 𝐁.𝐓𝐞𝐜𝐡 𝐢𝐧 𝐂𝐨𝐝𝐢𝐧𝐠 & 𝐇𝐚𝐜𝐤𝐢𝐧𝐠
┃ 🔗 𝐂𝐨𝐧𝐧𝐞𝐜𝐭: fb.com/Mtxuzair
┃ ⏱️ 𝐔𝐩𝐭𝐢𝐦𝐞: ${formattedUptime}
╰━━━━━━━━━━━━━━━╯

💬 『𝐌𝐚𝐢 𝐛𝐨𝐥𝐭𝐚 𝐧𝐚𝐡𝐢 𝐡𝐮, 𝐡𝐚𝐫 𝐤𝐡𝐚𝐦𝐨𝐬𝐡𝐢 𝐦𝐞𝐫𝐢 𝐬𝐡𝐚𝐧 𝐡𝐨𝐭𝐢 𝐡𝐚𝐢...』

🎩 𝐋𝐞𝐠𝐞𝐧𝐝𝐬 𝐝𝐨𝐧'𝐭 𝐛𝐫𝐚𝐠,
𝐓𝐡𝐞𝐢𝐫 𝐰𝐨𝐫𝐤 𝐛𝐞𝐜𝐨𝐦𝐞𝐬 𝐡𝐢𝐬𝐭𝐨𝐫𝐲. 💼

🦋 『${name}, 𝐒𝐲𝐬𝐭𝐞𝐦 𝐬𝐞 𝐓𝐮𝐦𝐡𝐚𝐫𝐢 𝐚𝐜𝐭𝐢𝐯𝐢𝐭𝐲 𝐦𝐨𝐧𝐢𝐭𝐨𝐫 𝐤𝐢 𝐣𝐚 𝐫𝐚𝐡𝐢 𝐡𝐚𝐢...』

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
