const axios = require("axios");
const fs = require("fs");

// ✅ Direct API URL (no need to fetch from GitHub)
const baseApiUrl = async () => "https://uzair-rajput-api.vercel.app";

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
  const checkurl = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))((\w|-){11})(?:\S+)?$/;
  const urlYtb = checkurl.test(args[0]);

  if (urlYtb) {
    const match = args[0].match(checkurl);
    const videoID = match ? match[1] : null;
    const { data: { title, downloadLink } } = await axios.get(
      `${await baseApiUrl()}/ytDl3?link=${videoID}&format=mp3`
    );
    return api.sendMessage({
      body: title,
      attachment: await dipto(downloadLink, 'audio.mp3')
    }, event.threadID, () => fs.unlinkSync('audio.mp3'), event.messageID);
  }

  const keyWord = args.join(" ").replace("?feature=share", "");
  const maxResults = 6;
  let result;

  try {
    result = (await axios.get(`${await baseApiUrl()}/ytFullSearch?songName=${encodeURIComponent(keyWord)}`)).data.slice(0, maxResults);
  } catch (err) {
    return api.sendMessage("❌ An error occurred: " + err.message, event.threadID, event.messageID);
  }

  if (!result || result.length === 0) {
    return api.sendMessage("⭕ No search results found for: " + keyWord, event.threadID, event.messageID);
  }

  let msg = "";
  const thumbnails = [];

  for (let i = 0; i < result.length; i++) {
    const info = result[i];
    thumbnails.push(diptoSt(info.thumbnail, `thumb_${i}.jpg`));
    msg += `${i + 1}. ${info.title}\nTime: ${info.time}\nChannel: ${info.channel.name}\n\n`;
  }

  api.sendMessage({
    body: msg + "Reply to this message with the number of the song you want to listen to.",
    attachment: await Promise.all(thumbnails)
  }, event.threadID, (err, info) => {
    if (!err) {
      global.client.handleReply.push({
        name: module.exports.config.name,
        messageID: info.messageID,
        author: event.senderID,
        result
      });
    }
  }, event.messageID);
};

module.exports.handleReply = async ({ event, api, handleReply }) => {
  try {
    const { result } = handleReply;
    const choice = parseInt(event.body);

    if (!isNaN(choice) && choice > 0 && choice <= result.length) {
      const infoChoice = result[choice - 1];
      const idvideo = infoChoice.id;
      const { data: { title, downloadLink, quality } } = await axios.get(
        `${await baseApiUrl()}/ytDl3?link=${idvideo}&format=mp3`
      );

      await api.unsendMessage(handleReply.messageID);
      await api.sendMessage({
        body: `• Title: ${title}\n• Quality: ${quality}`,
        attachment: await dipto(downloadLink, 'audio.mp3')
      }, event.threadID, () => fs.unlinkSync('audio.mp3'), event.messageID);
    } else {
      api.sendMessage("❌ Invalid choice. Please enter a number between 1 and 6.", event.threadID, event.messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("⭕ Error: File might be too large or unavailable.", event.threadID, event.messageID);
  }
};

// Download audio
async function dipto(url, pathName) {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    fs.writeFileSync(pathName, Buffer.from(response));
    return fs.createReadStream(pathName);
  } catch (err) {
    throw err;
  }
}

// Stream thumbnail
async function diptoSt(url, pathName) {
  try {
    const response = await axios.get(url, { responseType: "stream" });
    response.data.path = pathName;
    return response.data;
  } catch (err) {
    throw err;
  }
}
