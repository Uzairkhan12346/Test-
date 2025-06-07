const axios = require("axios");
const fs = require("fs");

const BASE_URL = "https://uzair-sehar-api.onrender.com"; // <-- replace with your real backend URL

module.exports.config = {
  name: "sing",
  version: "1.0.0",
  aliases: ["music", "play"],
  credits: "Uzair Rajput",
  description: "Download audio/video from YouTube",
  category: "media",
  usePrefix: true,
};

module.exports.run = async ({ api, args, event }) => {
  const input = args.join(" ");
  const isLink = input.includes("youtube.com") || input.includes("youtu.be");
  const format = input.endsWith(".mp4") ? "mp4" : "mp3";
  const link = isLink ? input.replace("https://", "").split(/[?& ]/)[0].split("/").pop() : null;

  try {
    let videoID = link;

    if (!isLink) {
      const search = await axios.get(`${BASE_URL}/ytFullSearch?songName=${encodeURIComponent(input)}`);
      const result = search.data[0];
      videoID = result.id;
    }

    const { data } = await axios.get(`${BASE_URL}/ytDl3?link=${videoID}&format=${format}`);
    const file = await axios.get(data.downloadLink, { responseType: "arraybuffer" });
    const fileName = `file.${format}`;
    fs.writeFileSync(fileName, Buffer.from(file.data));

    api.sendMessage({
      body: `${data.title} (${format.toUpperCase()})`,
      attachment: fs.createReadStream(fileName)
    }, event.threadID, () => fs.unlinkSync(fileName), event.messageID);
  } catch (e) {
    console.log(e.message);
    api.sendMessage("❌ Error: " + e.message, event.threadID, event.messageID);
  }
};
