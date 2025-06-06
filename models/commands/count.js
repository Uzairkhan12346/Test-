const axios = require("axios");
const fs = require("fs");

const baseApiUrl = async () => {
  const res = await axios.get("https://uzair-rajput-api.vercel.app");
  return res.data.api;
};

module.exports.config = {
  name: "sing",
  version: "2.1.0",
  aliases: ["music", "play"],
  credits: "N9W9Z H9CK3R",
  countDown: 5,
  hasPermssion: 0,
  description: "Download audio from YouTube",
  category: "media",
  commandCategory: "media",
  usePrefix: true,
  prefix: true,
  usages: "{pn} [<song name>|<song link>]:\n   Example:\n{pn} chipi chipi chapa chapa"
};

module.exports.run = async ({ api, args, event }) => {
  if (!args[0]) return api.sendMessage("❌ Please provide a song name or YouTube link.", event.threadID, event.messageID);

  const checkUrl = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))((\w|-){11})(?:\S+)?$/;
  let videoID;
  const isLink = checkUrl.test(args[0]);

  try {
    if (isLink) {
      const match = args[0].match(checkUrl);
      videoID = match ? match[1] : null;

      const { data: { title, downloadLink } } = await axios.get(
        `${await baseApiUrl()}/ytDl3?link=${videoID}&format=mp3`
      );

      const filePath = `audio_${event.senderID}.mp3`;
      const audio = await dipto(downloadLink, filePath);

      return api.sendMessage({
        body: title,
        attachment: audio
      }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
    }

    // If it's a search query
    const query = args.join(" ").replace("?feature=share", "");
    const maxResults = 6;
    const searchResult = (await axios.get(`${await baseApiUrl()}/ytFullSearch?songName=${encodeURIComponent(query)}`)).data.slice(0, maxResults);

    if (searchResult.length === 0)
      return api.sendMessage("⭕ No search results match the keyword: " + query, event.threadID, event.messageID);

    let msg = "";
    const thumbnails = [];
    for (let i = 0; i < searchResult.length; i++) {
      const info = searchResult[i];
      thumbnails.push(await diptoSt(info.thumbnail, `thumb_${i}.jpg`));
      msg += `${i + 1}. ${info.title}\nTime: ${info.time}\nChannel: ${info.channel.name}\n\n`;
    }

    api.sendMessage({
      body: msg + "Reply to this message with a number (1-6) to choose a song.",
      attachment: await Promise.all(thumbnails)
    }, event.threadID, (err, info) => {
      if (err) console.log(err);
      global.client.handleReply.push({
        name: module.exports.config.name,
        messageID: info.messageID,
        author: event.senderID,
        result: searchResult
      });
    }, event.messageID);

  } catch (err) {
    console.log("🔴 Error:", err);
    return api.sendMessage("❌ An error occurred: " + err.message, event.threadID, event.messageID);
  }
};

module.exports.handleReply = async ({ event, api, handleReply }) => {
  const { result, author, messageID } = handleReply;

  if (event.senderID !== author) return;

  const choice = parseInt(event.body);
  if (isNaN(choice) || choice < 1 || choice > result.length)
    return api.sendMessage("❌ Invalid choice. Please enter a number between 1 and " + result.length, event.threadID, event.messageID);

  try {
    const selected = result[choice - 1];
    const { data: { title, downloadLink, quality } } = await axios.get(`${await baseApiUrl()}/ytDl3?link=${selected.id}&format=mp3`);

    const filePath = `audio_${event.senderID}.mp3`;
    const audio = await dipto(downloadLink, filePath);

    await api.unsendMessage(messageID);
    return api.sendMessage({
      body: `🎵 Title: ${title}\n🔊 Quality: ${quality}`,
      attachment: audio
    }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);

  } catch (err) {
    console.log("🔴 Download Error:", err);
    return api.sendMessage("⭕ Failed to get audio. Try another option.", event.threadID, event.messageID);
  }
};

async function dipto(url, filePath) {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  fs.writeFileSync(filePath, Buffer.from(response.data));
  return fs.createReadStream(filePath);
}

async function diptoSt(url, filePath) {
  const response = await axios.get(url, { responseType: "stream" });
  response.data.path = filePath;
  return response.data;
}
