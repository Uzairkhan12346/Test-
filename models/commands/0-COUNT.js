const axios = require("axios");
const fs = require("fs");

const BASE_URL = "https://uzair-sehar-api.onrender.com"; // 🔁 Your API backend URL

module.exports.config = {
  name: "sing",
  version: "1.0.0",
  aliases: ["music", "play"],
  credits: "Uzair Rajput",
  description: "Download audio or video from YouTube by link or keyword",
  category: "media",
  usePrefix: true,
};

module.exports.run = async ({ api, args, event }) => {
  if (!args[0]) {
    return api.sendMessage("⚠️ Please provide a YouTube link or search keyword.", event.threadID, event.messageID);
  }

  const input = args.join(" ");
  const isLink = /(youtube\.com|youtu\.be)/.test(input);
  const format = input.includes(".mp4") ? "mp4" : "mp3";

  try {
    let videoID;

    if (isLink) {
      const match = input.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
      if (!match) return api.sendMessage("❌ Invalid YouTube link.", event.threadID, event.messageID);
      videoID = match[1];
    } else {
      const searchRes = await axios.get(`${BASE_URL}/ytFullSearch?songName=${encodeURIComponent(input)}`);
      if (!searchRes.data.length) return api.sendMessage("❌ No results found.", event.threadID, event.messageID);
      videoID = searchRes.data[0].id;
    }

    const { data } = await axios.get(`${BASE_URL}/ytDl3?link=${videoID}&format=${format}`);
    const fileBuffer = await axios.get(data.downloadLink, { responseType: "arraybuffer" });
    const fileName = `temp.${format}`;

    fs.writeFileSync(fileName, Buffer.from(fileBuffer.data));

    api.sendMessage({
      body: `🎶 ${data.title}\n📦 Format: ${format.toUpperCase()}\n🔊 Quality: ${data.quality || "Unknown"}`,
      attachment: fs.createReadStream(fileName)
    }, event.threadID, () => fs.unlinkSync(fileName), event.messageID);

  } catch (err) {
    console.error("Download error:", err.message);
    api.sendMessage("❌ Error: " + err.message, event.threadID, event.messageID);
  }
};
