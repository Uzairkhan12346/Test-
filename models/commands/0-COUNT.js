const fs = require("fs");
module.exports.config = {
  name: "mtx aa gya",
    version: "1.0.1",
  hasPermssion: 0,
  credits: "uzairrajput", 
  description: "hihihihi",
  commandCategory: "no prefix",
  usages: "Mtx",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;
  if (event.body.indexOf("me agai")>=0 || event.body.indexOf("me agya")>=0 || event.body.indexOf("I'm agya")>=0 || event.body.indexOf("𝑴𝑻𝑿 💚✨")>=0) {
    var msg = {
        body: "welcome boss🙈",
        attachment: fs.createReadStream(__dirname + `/uzair/dk.mp3`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😘", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
