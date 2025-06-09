const fs = require("fs");
module.exports.config = {
  name: "owner",
  version: "9.9.9",
  hasPermssion: 0,
  credits: "uzairrajput", 
  description: "⚔️Dark Hacker Royal Info",
  commandCategory: "no prefix",
  cooldowns: 5,
};

module.exports.handleEvent = async ({ api, event, Users }) => {
  const name = await Users.getNameUser(event.senderID);
  const { threadID, messageID } = event;
  const react = event.body.toLowerCase();

  if (
    react.includes("owner") ||
    react.includes("oner") ||
    react.includes("malik")
  ) {
    const msg = {
      body: `
╭══• ೋ•✧๑🖤๑✧•ೋ •══╮
🔍 SYSTEM BREACHED...
✨ REQUESTED BY: ${name}
╰══• ೋ•✧๑🖤๑✧•ೋ •══╯

☠️𝗗𝗔𝗥𝗞 𝗢𝗪𝗡𝗘𝗥 𝗣𝗥𝗢𝗙𝗜𝗟𝗘☠️

⫷👑⫸ ━━━━━━━ ⫷👑⫸
𝙉𝘼𝙈𝙀 : 𝑴𝑻𝑿 ✨ K̷i̷r̷a̷n̷ 𝙍𝘼𝙅𝙋𝙊𝙊𝙏 ☠️
𝘼𝙂𝙀 : 20 (Encrypted) 🧬
𝙍𝙀𝙇𝘼𝙏𝙄𝙊𝙉 : ➤ 𝙎𝙚𝙘𝙧𝙚𝙩 ⚠️
𝙇𝙊𝘾𝘼𝙏𝙄𝙊𝙉 : 𝕊𝕚𝕟𝕕𝕙 ★ 𝕳𝖞𝖉𝖊𝖗𝖆𝖇𝖆𝖉 🗺️
𝙎𝙏𝙐𝘿𝙔 : 𝗕.𝗧𝗲𝗰𝗵 💻 𝘾𝙤𝙙𝙚 𝙈𝙖𝙨𝙩𝙚𝙧
𝙈𝙊𝙏𝙏𝙊 : “𝘾𝙤𝙙𝙚 𝙇𝙞𝙠𝙚 𝘼 𝙆𝙞𝙣𝙜, 𝙃𝙖𝙘𝙠 𝙇𝙞𝙠𝙚 𝘼 𝙂𝙝𝙤𝙨𝙩.” 👻

👾 DIGITAL FOOTPRINTS:
📡 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 : https://facebook.com/Mtxuzair
📴 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣 : ▓▓▓▓▓ [RESTRICTED]

⛓️ SYSTEM STATUS: 🔐𝙐𝙉𝙏𝙊𝙐𝘾𝙃𝘼𝘽𝙇𝙀 — “𝘽𝙀𝘼𝙏 𝙏𝙃𝙀 𝙂𝘼𝙈𝙀, 𝙉𝙀𝙑𝙀𝙍 𝙏𝙃𝙀 𝙋𝙇𝘼𝙔𝙀𝙍.” 👾

⫷💻⫸━━━━━━━━━━━━━━━━━━━⫷💻⫸
⛧ MADE BY Uʑʌīī𝐑┼•__🦋• 
╰───► End of Line... 💀
      `,
      attachment: fs.createReadStream(__dirname + `/uzair/Owner.gif`)
    };
    api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😈", event.messageID, () => {}, true);
  }
};

module.exports.run = async () => {};
