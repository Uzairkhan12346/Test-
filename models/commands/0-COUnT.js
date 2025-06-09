const fs = require("fs");
module.exports.config = {
  name: "ttt",
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
    react.includes("tt") ||
    react.includes("t") ||
    react.includes("ttt")
  ) {
    const msg = {
      body: `✧･ﾟ: *✧･ﾟ:* 𝐇𝐞𝐲 ${name} 😍 *:･ﾟ✧*:･ﾟ✧

╭─────────────𖤐─────────────╮
          🔱 𝙊𝙒𝙉𝙀𝙍 𝙄𝙉𝙁𝙊 🔱
╰─────────────𖤐─────────────╯

👑 𓆩 𝑴𝑻𝑿 💚✨ Kìrâñ RajPööt ☠️ 🏴‍☠️ 𓆪

╭──────〔 🔍 𝐃𝐄𝐓𝐀𝐈𝐋𝐒 〕──────╮
🌟 𝙉𝙖𝙢𝙚: Uzair Rajpoot 𖣘  
🎂 𝘼𝙜𝙚: 20 years young ✨
💞 𝙍𝙚𝙡𝙖𝙩𝙞𝙤𝙣𝙨𝙝𝙞𝙥: 𝕂𝕠𝕚 ℕ𝕚 😎
🏠 𝙁𝙧𝙤𝙢: Sindh☆Hyderabad ❤️
🎓 𝙎𝙩𝙪𝙙𝙮: B.Tech (Computer Programming) 👨‍💻
🌐 𝙁𝙖𝙘𝙚𝙗𝙤𝙤𝙠: fb.com/Mtxuzair 🌍
📞 𝙒𝙝𝙖𝙩𝙨𝙖𝙥𝙥: SECRET HAI BOSS 🕵️‍♂️
╰────────────────────────╯

🧠 *𝑸𝒖𝒐𝒕𝒆*:
"нαм внι нση gαү вεωαғα,
кαнεη кιsι кι zιη∂αgι мα!❤🙂♣️"

⚡ 𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚: 𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•
● ━━━━━━━━━━━━ ●`,
      attachment: fs.createReadStream(__dirname + `/uzair/Owner.gif`)
    };
    api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("👑", event.messageID, () => {}, true);
  }
};

module.exports.run = async () => {};
