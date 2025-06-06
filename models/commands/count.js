const axios = require("axios");
const fs = require("fs");

module.exports.config = {
  name: "sing",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "uzair1267",
  description: "Play audio from YouTube link",
  commandCategory: "media",
  usages: "[YouTube Link]",
  cooldowns: 5
};

module.exports.run = async ({ api, args, event }) => {
  const link = args[0];
  if (!link) return api.sendMessage("❌ Please provide a YouTube link.", event.threadID, event.messageID);

  try {
    const res = await axios.get(`https://uzair-rajput-api.vercel.app/ytDl3?link=${link}&format=mp3`);
    const { title, downloadLink } = res.data;

    const audio = await axios.get(downloadLink, { responseType: 'arraybuffer' });
    const filePath = __dirname + `/audio_${event.senderID}.mp3`;
    fs.writeFileSync(filePath, Buffer.from(audio.data, 'binary'));

    return api.sendMessage({
      body: `🎵 ${title}`,
      attachment: fs.createReadStream(filePath)
    }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
  } catch (err) {
    console.log(err.message);
    return api.sendMessage("❌ Failed to fetch or send audio. Please check the link or try again later.", event.threadID, event.messageID);
  }
};
