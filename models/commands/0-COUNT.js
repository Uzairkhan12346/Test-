const fs = require("fs");
module.exports.config = {
  name: "khana",
    version: "2.1.1",
  hasPermssion: 0,
  credits: "uzairrajput", 
  description: "Just Respond",
  commandCategory: "no prefix",
    cooldowns: 5, 
};

module.exports.handleEvent = async ({ api, event, Users, Currencies, args, utils, client, global }) => {
  var name = await Users.getNameUser(event.senderID);
  var { threadID, messageID } = event;
  let react = event.body.toLowerCase();
  if(react.includes("khana") ||
     react.includes("Khana") || react.includes("khao") || react.includes("Khao") ||
react.includes("KHANA") ||
react.includes("khaya") ||
react.includes("lunch") ||
react.includes("Lunch") ||
react.includes("LUNCH") ||
react.includes("DINNER") ||
react.includes("dinner") ||
react.includes("Dinner") ||
react.includes("breakfast") ||
react.includes("Breakfast") ||     
react.includes("BREAKFAST") ||     
react.includes("KHAO")) {
    var msg = {
        body: `😋👨‍🍳 𝙊𝙮𝙚 ${name} 𝙍𝙤𝙠𝙤 𝙗𝙖𝙗𝙮...!!\n🍱 𝙈𝙚 𝙖𝙗𝙝𝙞 "𝙆𝙝𝙖𝙣𝙖" 𝙗𝙖𝙣𝙖 𝙧𝙖𝙝𝙖 𝙝𝙪..\n🍽️ 𝙋𝙝𝙞𝙧 𝙨𝙖𝙖𝙩𝙝 𝙢𝙚 𝙠𝙝𝙖𝙮𝙚𝙣𝙜𝙚 💞😉\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•`,attachment: fs.createReadStream(__dirname + `/uzair/khana.jpeg`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🍱", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = async ({ api, event, Currencies, args, utils, client, global }) => {

  }
