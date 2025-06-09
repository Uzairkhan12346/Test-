const fs = require("fs");
module.exports.config = {
  name: "owner",
  version: "2.1.1",
  hasPermssion: 0,
  credits: "uzairrajput", 
  description: "Just Respond",
  commandCategory: "no prefix",
  cooldowns: 5, 
};

module.exports.handleEvent = async ({ api, event, Users }) => {
  var name = await Users.getNameUser(event.senderID);
  var { threadID, messageID } = event;
  let react = event.body.toLowerCase();
  if (
    react.includes("3") ||
    react.includes("2") ||
    react.includes("1")
  ) {
    const msg = {
      body: `✨ 𝐇𝐞𝐲 ${name}, 𝐃𝐞𝐤𝐡𝐨 𝐃𝐞𝐤𝐡𝐨 𝐌𝐚𝐥𝐢𝐤 𝐊𝐢 𝐈𝐧𝐟𝐨 𝐀𝐠𝐚𝐲𝐢 ✨

╭─────╮
│ 🔰 𝙊𝙒𝙉𝙀𝙍 𝙄𝙉𝙁𝙊 🔰 │
╰─────╯

🌟 𓆩 𝑴𝑻𝑿 💚✨ Kìrâñ RajPööt ☠️ 🏴‍☠️ 𓆪

╭──────────────────────╮
│ 👤 𝐍𝐚𝐦𝐞: Mtx Uzair Rajpoot
│ 🎂 𝐀𝐠𝐞: 20
│ 💞 𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧𝐬𝐡𝐢𝐩: 𝕂𝕠𝕚 ℕ𝕚 😌
│ 🏠 𝐅𝐫𝐨𝐦: Sindh☆Hyderabad ❤️
│ 🎓 𝐒𝐭𝐮𝐝𝐲: B.Tech (𝐂𝐨𝐦𝐩𝐮𝐭𝐞𝐫 𝐏𝐫𝐨𝐠𝐫𝐚𝐦𝐦𝐢𝐧𝐠)
│ 🌐 𝐅𝐛: facebook.com/Mtxuzair
│ 📞 𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩: SECRET HAI BOSS 😎
╰──────────────────────╯

💭 *Quote*:
"нαм внι нση gαү вεωαғα, кαнεη кιsι кι zιη∂αgι мα!❤🙂♣️"

● ──────── ◆ ──────── ●
𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•
`,
      attachment: fs.createReadStream(__dirname + `/uzair/Owner.gif`)
    };
    api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🥰", event.messageID, () => {}, true);
  }
};

module.exports.run = async () => {};
