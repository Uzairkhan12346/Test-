const axios = require("axios");
const fs = require("fs");

const baseApiUrl = async () => {
  const base = await axios.get(
    `https://raw.githubusercontent.com/uzair1267/uzair-music-song/main/baseApiUrl.json`
  );
  return base.data.api;
};

module.exports.config = {
  name: "sing",
  version: "2.1.0",
  aliases: ["music", "play"],
  credits: "Uzair Rajput",
  countDown: 5,
  hasPermssion: 0,
  description: "Download audio from YouTube",
  category: "media",
  commandCategory: "media",
  usePrefix: true,
  prefix: true,
  usages: "{pn} <song name | YouTube link>"
};

module.exports.run = async ({ api, args, event }) => {
  const checkurl =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))((\w|-){11})(?:\S+)?$/;
  const query = args.join(" ");
  let videoID;

  // Handle YouTube link
  if (checkurl.test(query)) {
    const match = query.match(checkurl);
    videoID = match ? match[1] : null;

    try {
      const { data } = await axios.get(
        `${await baseApiUrl()}/api/ytDl3?link=${videoID}&format=mp3`
      );

      if (!data.downloadLink) {
        return api.sendMessage("❌ Failed to get download link.", event.threadID, event.messageID);
      }

      return api.sendMessage(
        {
          body: data.title,
          attachment: await downloadFile(data.downloadLink, "audio.mp3")
        },
        event.threadID,
        () => fs.unlinkSync("audio.mp3"),
        event.messageID
      );
    } catch (err) {
      return api.sendMessage("❌ Error: " + err.message, event.threadID, event.messageID);
    }
  }

  // Handle keyword search
  try {
    const { data } = await axios.get(
      `${await baseApiUrl()}/api/ytFullSearch?songName=${encodeURIComponent(query)}`
    );
    const result = data.slice(0, 6);
    if (result.length === 0)
      return api.sendMessage("⭕ No results found.", event.threadID, event.messageID);

    let msg = "";
    const thumbs = [];

    for (let i = 0; i < result.length; i++) {
      const song = result[i];
      msg += `${i + 1}. ${song.title}\nTime: ${song.time}\nChannel: ${song.channel.name}\n\n`;
      thumbs.push(await streamThumbnail(song.thumbnail, `thumb${i}.jpg`));
    }

    api.sendMessage(
      {
        body: msg + "Reply with a number to download.",
        attachment: await Promise.all(thumbs)
      },
      event.threadID,
      (err, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: event.senderID,
          result
        });
      },
      event.messageID
    );
  } catch (err) {
    return api.sendMessage("❌ Error: " + err.message, event.threadID, event.messageID);
  }
};

module.exports.handleReply = async ({ api, event, handleReply }) => {
  const { result } = handleReply;
  const choice = parseInt(event.body);
  if (isNaN(choice) || choice < 1 || choice > result.length)
    return api.sendMessage("❌ Invalid selection.", event.threadID, event.messageID);

  const chosen = result[choice - 1];
  try {
    const { data } = await axios.get(
      `${await baseApiUrl()}/api/ytDl3?link=${chosen.id}&format=mp3`
    );

    if (!data.downloadLink) {
      return api.sendMessage("❌ Download link not found.", event.threadID, event.messageID);
    }

    await api.unsendMessage(handleReply.messageID);
    return api.sendMessage(
      {
        body: `🎶 ${data.title}\n🔊 Quality: ${data.quality}`,
        attachment: await downloadFile(data.downloadLink, "audio.mp3")
      },
      event.threadID,
      () => fs.unlinkSync("audio.mp3"),
      event.messageID
    );
  } catch (err) {
    return api.sendMessage("❌ Error: " + err.message, event.threadID, event.messageID);
  }
};

// === Utility Functions ===

async function downloadFile(url, fileName) {
  const res = await axios.get(url, { responseType: "arraybuffer" });
  fs.writeFileSync(fileName, Buffer.from(res.data));
  return fs.createReadStream(fileName);
}

async function streamThumbnail(url, fileName) {
  const res = await axios.get(url, { responseType: "stream" });
  res.data.path = fileName;
  return res.data;
}
