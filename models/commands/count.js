const axios = require("axios");

module.exports = {
  config: {
    name: "sing",
    aliases: ["yt", "ytdl"],
    version: "1.0",
    author: "Uzair Rajput",
    shortDescription: "Download YouTube audio or video",
    longDescription: "Download YouTube audio or video using Uzair's custom API",
    category: "media",
    guide: "{pn} <YouTube link>"
  },

  onStart: async function ({ message, event, args, api }) {
    const url = args[0];
    
    if (!url || !url.includes("youtube.com") && !url.includes("youtu.be")) {
      return message.reply("❌ Please provide a valid YouTube link.");
    }

    try {
      const res = await axios.get(`http://localhost:3000/alldl?url=${encodeURIComponent(url)}`);
      const data = res.data.data;

      if (!data.audio && !data.video) {
        return message.reply("❌ Could not find any downloadable media.");
      }

      const audioUrl = data.audio;
      const videoUrl = data.video;

      message.reply({
        body: `✅ Download complete!\n\n🎵 Audio: ${audioUrl}\n🎥 Video: ${videoUrl}\n\nBy Uzair Rajput`
      });

    } catch (err) {
      console.error("Command Error:", err.message);
      message.reply("❌ Failed to fetch download links. Please try again later.");
    }
  }
};
