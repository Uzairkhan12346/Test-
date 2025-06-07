const axios = require("axios");
const fs = require("fs");

const API_BASE = "https://ytdl-uzair.onrender.com/api"; // ✅ Tumhara deployed API

module.exports.config = {
  name: "sing",
  version: "2.1.0",
  aliases: ["music", "play"],
  credits: "Uzair + N9W9Z",
  countDown: 5,
  hasPermssion: 0,
  description: "Download audio from YouTube",
  category: "media",
  commandCategory: "media",
  usePrefix: true,
  prefix: true,
  usages: "{pn} [<song name>|<song link>] \n   Example:\n{pn} tere hawale"
};

module.exports.run = async ({ api, args, event }) => {
  const checkurl = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))((\w|-){11})(?:\S+)?$/;
  let videoID;
  const urlYtb = checkurl.test(args[0]);

  if (urlYtb) {
    const match = args[0].match(checkurl);
    videoID = match ? match[1] : null;

    const { data: { title, downloadLink } } = await axios.get(`${API_BASE}/ytDl3?link=${videoID}&format=mp3`);
    return api.sendMessage({
      body: title,
      attachment: await downloadFile(downloadLink, "audio.mp3")
    }, event.threadID, () => fs.unlinkSync("audio.mp3"), event.messageID);
  }

  let keyWord = args.join(" ");
  const maxResults = 6;
  let result;
  try {
    const response = await axios.get(`${API_BASE}/ytFullSearch?songName=${encodeURIComponent(keyWord)}`);
    result = response.data.slice(0, maxResults);
  } catch (err) {
    return api.sendMessage("❌ Error: " + err.message, event.threadID, event.messageID);
  }

  if (!result.length) return api.sendMessage("❌ Koi result nahi mila: " + keyWord, event.threadID, event.messageID);

  let msg = "";
  const thumbnails = [];
  let i = 1;
  for (const info of result) {
    thumbnails.push(downloadStream(info.thumbnail, 'photo.jpg'));
    msg += `${i++}. ${info.title}\n⏱️ ${info.time}\n📺 ${info.channel.name}\n\n`;
  }

  api.sendMessage({
    body: msg + "🟢 Reply karo number ke sath jo gaana sunna hai",
    attachment: await Promise.all(thumbnails)
  }, event.threadID, (err, info) => {
    global.client.handleReply.push({
      name: this.config.name,
      messageID: info.messageID,
      author: event.senderID,
      result
    });
  }, event.messageID);
};

module.exports.handleReply = async ({ event, api, handleReply }) => {
  try {
    const { result } = handleReply;
    const choice = parseInt(event.body);
    if (!isNaN(choice) && choice <= result.length && choice > 0) {
      const infoChoice = result[choice - 1];
      const idvideo = infoChoice.id;
      const { data: { title, downloadLink, quality } } = await axios.get(`${API_BASE}/ytDl3?link=${idvideo}&format=mp3`);
      await api.unsendMessage(handleReply.messageID);
      await api.sendMessage({
        body: `🎵 Title: ${title}\n🎧 Quality: ${quality}`,
        attachment: await downloadFile(downloadLink, "audio.mp3")
      }, event.threadID, () => fs.unlinkSync("audio.mp3"), event.messageID);
    } else {
      api.sendMessage("❌ Invalid choice. 1-6 ka number do.", event.threadID, event.messageID);
    }
  } catch (error) {
    console.log(error);
    api.sendMessage("❌ Error ya file size ka masla ho gaya.", event.threadID, event.messageID);
  }
};

async function downloadFile(url, pathName) {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  fs.writeFileSync(pathName, Buffer.from(response.data));
  return fs.createReadStream(pathName);
}

async function downloadStream(url, pathName) {
  const response = await axios.get(url, { responseType: "stream" });
  response.data.path = pathName;
  return response.data;
}
