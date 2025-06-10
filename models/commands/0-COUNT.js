// Fake .setdp command for aesthetic
module.exports.config = {
  name: "setdp",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "uzairrajput",
  description: "Pretend to set bot DP by sending an image",
  commandCategory: "admin",
  usages: "[photo reply]",
  cooldowns: 5,
};

module.exports.run = async ({ api, event }) => {
  if (!event.messageReply || !event.messageReply.attachments[0]) {
    return api.sendMessage("📸 Reply kisi image pe karo jise DP banana chahte ho!", event.threadID, event.messageID);
  }

  const imgURL = event.messageReply.attachments[0].url;
  api.sendMessage({
    body: "🤖 Bot ne DP set kar li (pretend)...",
    attachment: await global.utils.getStreamFromURL(imgURL)
  }, event.threadID, event.messageID);
};
