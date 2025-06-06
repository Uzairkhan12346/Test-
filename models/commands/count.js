const axios = require("axios");
const fs = require("fs");

const BASE_API = "https://raw.githubusercontent.com/uzair1267/Ghumname-api-ytdl/main/baseApiUrl.json";

module.exports.config = {
  name: "audio",
  version: "1.0.0",
  aliases: ["play", "sing"],
  credits: "uzair1267",
  countDown: 5,
  hasPermssion: 0,
  description: "Download audio from YouTube",
  category: "media",
  commandCategory: "media",
  usePrefix: true,
  prefix: true,
  usages: "{pn} <song name or youtube link>"
};

module.exports.run = async ({ api, args, event }) => {
  const checkurl = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))((\w|-){11})(?:\S+)?$/;
  let videoID;

  const isLink = checkurl.test(args[0]);
  if (isLink) {
    const match = args[0].match(checkurl);
    videoID = match ? match[1] : null;

    try {
      const { data } = await axios.get(`${BASE_API}/ytDl3?link=${videoID}&format=mp3`);
      const { title, downloadLink } = data;

      const audio = await downloadFile(downloadLink, "audio.mp3");
      return api.sendMessage({
        body: title,
        attachment: audio
      }, event.threadID, () => fs.unlinkSync("audio.mp3"), event.messageID);

    } catch (err) {
      return api.sendMessage("❌ Error: " + err.message, event.threadID, event.messageID);
    }
  }

  // search
  let keyword = args.join(" ");
  try {
    const { data: results } = await axios.get(`${BASE_API}/ytFullSearch?songName=${encodeURIComponent(keyword)}`);
    const topResults = results.slice(0, 6);

    if (topResults.length === 0) {
      return api.sendMessage("❌ No results found for: " + keyword, event.threadID, event.messageID);
    }

    let msg = "";
    const thumbnails = [];

    for (let i = 0; i < topResults.length; i++) {
      const video = topResults[i];
      msg += `${i + 1}. ${video.title}\nDuration: ${video.time}\nChannel: ${video.channel.name}\n\n`;
      thumbnails.push(await streamImage(video.thumbnail, `thumb${i}.jpg`));
    }

    api.sendMessage({
      body: msg + "Reply with number (1-6) to select a song.",
      attachment: thumbnails
    }, event.threadID, (err, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: event.senderID,
        result: topResults
      });
    }, event.messageID);

  } catch (err) {
    return api.sendMessage("❌ Search failed: " + err.message, event.threadID, event.messageID);
  }
};

module.exports.handleReply = async ({ event, api, handleReply }) => {
  try {
    const { result } = handleReply;
    const choice = parseInt(event.body);

    if (isNaN(choice) || choice < 1 || choice > result.length) {
      return api.sendMessage("❌ Invalid number. Choose between 1-6.", event.threadID, event.messageID);
    }

    const chosen = result[choice - 1];
    const { data } = await axios.get(`${BASE_API}/ytDl3?link=${chosen.id}&format=mp3`);
    const { title, quality, downloadLink } = data;

    const audio = await downloadFile(downloadLink, "audio.mp3");
    await api.unsendMessage(handleReply.messageID);
    return api.sendMessage({
      body: `🎵 Title: ${title}\n🎧 Quality: ${quality}`,
      attachment: audio
    }, event.threadID, () => fs.unlinkSync("audio.mp3"), event.messageID);

  } catch (err) {
    return api.sendMessage("❌ Error downloading audio: " + err.message, event.threadID, event.messageID);
  }
};

// helpers
async function downloadFile(url, filename) {
  const { data } = await axios.get(url, { responseType: "arraybuffer" });
  fs.writeFileSync(filename, Buffer.from(data));
  return fs.createReadStream(filename);
}

async function streamImage(url, filename) {
  const { data } = await axios.get(url, { responseType: "stream" });
  data.path = filename;
  return data;
}
