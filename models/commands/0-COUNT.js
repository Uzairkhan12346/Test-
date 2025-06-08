const fs = require("fs");
module.exports.config = {
  name: "miss",
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
  if(react.includes("miss") ||
     react.includes("miss you") || react.includes("MISS") || react.includes("Miss") ||
react.includes("yad you") ||
react.includes("i yad you")) {
    var msg = {
        body: `${name} Baby, me bhi apko miss kRta hu 🥺😇👈`,attachment: fs.createReadStream(__dirname + `/uzair/miss.gif`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("☀️", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = async ({ api, event, Currencies, args, utils, client, global }) => {

  }
