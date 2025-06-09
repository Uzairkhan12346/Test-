const fs = require("fs");
module.exports.config = {
  name: "owner",
  version: "11.0.0",
  hasPermssion: 0,
  credits: "uzairrajput",
  description: "😈 Owner Info in Royal Hacker Style",
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
╭━━━┻┻━━━━⊱◈◈◈⊰━━━━┻┻━━━╮
👁‍🗨 𝙎𝙔𝙎𝙏𝙀𝙈 𝘼𝘾𝘾𝙀𝙎𝙎 𝙂𝙍𝘼𝙉𝙏𝙀𝘿...
✨ 𝙍𝙀𝙌 𝘽𝙔: 『 ${name} 』
╰━━━┳┳━━━━⊱◈◈◈⊰━━━━┳┳━━━╯

⚔️ 『 𝗢𝗪𝗡𝗘𝗥 𝗣𝗥𝗢𝗙𝗜𝗟𝗘 』⚔️

🦾 𝑵𝑨𝑴𝑬: 『 𝑴𝑻𝑿 ⚡ Kìrâñ 𝙍𝘼𝙅𝙋𝙊𝙊𝙏 ☠️ 』
🎭 𝘿𝙀𝙎𝙏𝙄𝙉𝙔: 𝙃𝘼𝘾𝙆 𝙏𝙃𝙀 𝙒𝙊𝙍𝙇𝘿, 𝙇𝙀𝘼𝙑𝙀 𝙉𝙊 𝙏𝙍𝘼𝘾𝙀

🎂 𝘼𝙂𝙀: 20 ✧ 𝙄𝙉 𝘼 𝙂𝙇𝙄𝙏𝘾𝙃 𝘿𝙀𝘼𝘿 𝙒𝙊𝙍𝙇𝘿
💞 𝙍𝙀𝙇𝘼𝙏𝙄𝙊𝙉: ❝ 𝙊𝙣𝙡𝙮 𝘾𝙊𝘿𝙀 𝙇𝙊𝙑𝙀𝙎 𝙈𝙀 ❞
📍 𝙁𝙍𝙊𝙈: 𓆩 HYDERABAD ★ SINDH 𓆪
📚 𝙁𝙄𝙀𝙇𝘿: 𝐁.𝐓𝐞𝐜𝐡 ✘ 𝘾𝙤𝙙𝙚 𝙈𝙤𝙣𝙠 🔥

🌐 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞:
➡️ https://facebook.com/Mtxuzair

📵 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣:
『 ⛔ 𝙀𝙉𝘾𝙍𝙔𝙋𝙏𝙀𝘿 - 𝙁𝙊𝙍 𝙊𝙒𝙉𝙀𝙍 𝙐𝙎𝙀 𝙊𝙉𝙇𝙔 』

☣️ 𝙌𝙐𝙊𝙏𝙀:
"𝘿𝙞𝙡 𝙩𝙤 𝙃𝙖𝙘𝙠𝙚𝙧 𝙝𝙖𝙞,
𝘼𝙩𝙩𝙖𝙘𝙠 𝙝𝙖𝙧 𝘽𝙖𝙖𝙧 𝙋𝙮𝙖𝙧 𝙎𝙚 𝙠𝙖𝙧𝙩𝙖 𝙝𝙖𝙞." 💉❤️

╭═══════⊹⊰••⊱⊹═══════╮
🧠 𝙈𝘼𝘿𝙀 𝘽𝙔 𒁍⃝𝐔ʑʌīī𝐑┼•__🦋•
╰═══════⊹⊰••⊱⊹═══════╯
`,
      attachment: fs.createReadStream(__dirname + `/uzair/Owner.gif`)
    };
    api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("💀", event.messageID, () => {}, true);
  }
};

module.exports.run = async () => {};
