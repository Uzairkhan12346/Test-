module.exports.config = {
  name: "motki",
  version: "7.3.1",
  hasPermssion: 0,
  credits: "uzairrajput", 
  description: "Just Respond",
  commandCategory: "no prefix",
  cooldowns: 5, 
};

module.exports.handleEvent = async function({ api, event, client, Users, __GLOBAL }) {
  var { threadID, messageID } = event;
  var name = await Users.getNameUser(event.senderID);
  const body = event.body.toLowerCase();
  if (
    body.includes("moti") || body.includes("moti") ||
    body.includes("moto") || body.includes("sandi")
  ) {
    const msg = {
      body: `𝐎𝐲𝐞 𝐌𝐨𝐭𝐢 🐷🤭 \n${name} \n𝐌𝐨𝐭𝐚 𝐏𝐞𝐭..🍩🍔\n 𝐒𝐚𝐫𝐚𝐤 𝐩𝐞 𝐥𝐞𝐭,🛣️😴\n𝐆𝐚𝐫𝐢 𝐚𝐢 🚗💥\n  𝐏𝐡𝐚𝐭 𝐆𝐚𝐲𝐚 𝐏𝐞𝐭! 😵‍💫😵‍💫\n𝐆𝐚𝐫𝐢 𝐤𝐚 𝐧𝐮𝐦𝐛𝐞𝐫 𝟏𝟎𝟏 🔢\n𝐌𝐨𝐭𝐚: 𝐛𝐨𝐥𝐞 "𝐇𝐚𝐲𝐞 𝐌𝐞𝐫𝐚 𝐏𝐞𝐭!" 🤣😂🐃\n\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•.`
    };
    api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🐷", event.messageID, (err) => {}, true);
  }
}

module.exports.run = function({ api, event, client, __GLOBAL }) {};
