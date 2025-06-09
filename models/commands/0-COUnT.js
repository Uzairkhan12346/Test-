const fs = require("fs");
module.exports.config = {
  name: "w",
  version: "2.1.1",
  hasPermssion: 0,
  credits: "uzairrajput",
  description: "Just Respond",
  commandCategory: "no prefix",
  cooldowns: 5,
};

module.exports.handleEvent = async ({ api, event, Users }) => {
  const name = await Users.getNameUser(event.senderID);
  const { threadID, messageID } = event;
  const react = event.body.toLowerCase();

  if (
    react.includes("o") ||
    react.includes("r") ||
    react.includes("n")
  ) {
    const msg = {
      body: `
┏━━━━༺❀༻━━━━┓
   🌸 𝒪𝓌𝓃𝑒𝓇 𝐼𝓃𝒻𝑜 🌸
┗━━━━༺❀༻━━━━┛

❥ 𝐑𝐞𝐪𝐮𝐞𝐬𝐭 𝐅𝐫𝐨𝐦: ${name}
─────────────────────

👑 𝐍𝐀𝐌𝐄: 𝑀𝒯𝒳 💚 𝐾𝐢𝐫𝒶𝓃 𝑅𝒶𝒿𝓅𝑜𝑜𝓉  
📍 𝐿𝑜𝒸𝒶𝓉𝒾𝑜𝓃: Hyderabad, Sindh  
🎓 𝒮𝓉𝓊𝒹𝓎: B.Tech (Computer Programming)  
❤️ 𝑅𝑒𝓁𝒶𝓉𝒾𝑜𝓃: 𝕂𝕠𝕚 ℕ𝕚 🤍

📘 𝐹𝒶𝒸𝑒𝒷𝑜𝑜𝓀:
➤ https://facebook.com/Mtxuzair  
📞 𝑊𝒽𝒶𝓉𝓈𝒜𝓅𝓅:
➤ 𝒮𝑒𝒸𝓇𝑒𝓉 𝒽𝑒 𝐵𝑜𝓈𝓈 🌙

───── •★• ─────
✨ "𝑀𝓊𝒽𝒶𝒷𝒷𝒶𝓉 𝓋𝑜 𝒿𝑜 𝒞𝑜𝒹𝑒 𝓈𝑒 𝒷𝒶𝓉𝒽 𝒦𝒶𝓇𝑒!" 💻💖
───── •★• ─────

𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘: 𝐔ʑʌīī𝐑┼•__🦋•
`,
      attachment: fs.createReadStream(__dirname + `/uzair/Owner.gif`)
    };
    api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🌸", event.messageID, () => {}, true);
  }
};

module.exports.run = async () => {};
