const fs = require("fs");
module.exports.config = {
  name: "r",
  version: "3.0.0",
  hasPermssion: 0,
  credits: "uzairrajput", 
  description: "Respond with royal owner info",
  commandCategory: "no prefix",
  cooldowns: 5, 
};

module.exports.handleEvent = async ({ api, event, Users }) => {
  var name = await Users.getNameUser(event.senderID);
  var { threadID, messageID } = event;
  let react = event.body.toLowerCase();

  if (
    react.includes("o") ||
    react.includes("o") ||
    react.includes("m")
  ) {
    const msg = {
      body: `╭━━━━━━━❰👑❱━━━━━━━╮
        🌟 *𝐎𝐖𝐍𝐄𝐑 𝐈𝐍𝐅𝐎* 🌟
╰━━━━━━━❰👑❱━━━━━━━╯

✨ 𝐀𝐬𝐬𝐚𝐥𝐚𝐦𝐮𝐚𝐥𝐚𝐢𝐤𝐮𝐦 ${name}!  
𝐘𝐞 𝐑𝐨𝐲𝐚𝐥 𝐌𝐚𝐥𝐢𝐤 𝐤𝐢 𝐭𝐡𝐨𝐫𝐢 𝐬𝐢 𝐉𝐚𝐧𝐤𝐚𝐫𝐢 𝐡𝐚𝐢 ✨

𖠌 ❰ 𝑵𝒂𝒎𝒆 ❱: 𝑴𝑻𝑿 💚✨ 𝐊𝐢𝐫𝐚𝐧 𝐑𝐚𝐣𝐩𝐨𝐨𝐭 ☠️  
𖠌 ❰ 𝑨𝒈𝒆 ❱: 20 — Young & Deadly 😎  
𖠌 ❰ 𝑹𝒆𝒍𝒂𝒕𝒊𝒐𝒏 ❱: 𝙎𝙞𝙧𝙛 𝙆𝙤𝙙𝙚 𝙨𝙚 𝙄𝙨𝙝𝙦 😌  
𖠌 ❰ 𝑭𝒓𝒐𝒎 ❱: Hyderabad, Sindh ❤️  
𖠌 ❰ 𝑺𝒕𝒖𝒅𝒚 ❱: B.Tech (ᴄᴏᴍᴘᴜᴛᴇʀ ᴘʀᴏɢʀᴀᴍᴍɪɴɢ) 👨‍💻  
𖠌 ❰ 𝑭𝑩 ❱: fb.com/Mtxuzair 🌐  
𖠌 ❰ 𝑾𝒉𝒂𝒕𝒔𝑨𝒑𝒑 ❱: ❝ Secret Hai Boss 🤫 ❞

✦✧✦✧✦✧✦✧✦✧✦✧✦

💬 *Quote of the King*:
"𝙅𝙞𝙣 𝙠𝙖 𝙏𝙤𝙧 𝙣𝙖 𝙝𝙤, 𝙐𝙨𝙚 𝙈𝙩𝙭 𝙆𝙖𝙝𝙩𝙚 𝙝𝙖𝙞𝙣!" 👑

♛━━━━━━━━━━━━━━━━♛
𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•
● ──────────────────── ●`,
      attachment: fs.createReadStream(__dirname + `/uzair/Owner.gif`)
    };
    api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("👑", event.messageID, () => {}, true);
  }
};

module.exports.run = async () => {};
