// 💥 CREDIT LOCK + ASCII “UZAIR” BANNER
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const https = require("https");
const path = require("path");

const script = fs.readFileSync(__filename, "utf8");
const creditMatch = script.match(/credits\s*:\s*"([^"]+)"/i);
const actualCredit = creditMatch ? creditMatch[1].trim().toLowerCase() : null;

if (actualCredit !== "uzairrajput") {
  console.log(
    "\x1b[31m%s\x1b[0m",
    `██╗░░░██╗███████╗░█████╗░██╗██████╗░\n██║░░░██║╚════██║██╔══██╗██║██╔══██╗\n██║░░░██║░░███╔═╝███████║██║██████╔╝\n██║░░░██║██╔══╝░░██╔══██║██║██╔══██╗\n╚██████╔╝███████╗██║░░██║██║██║░░██║\n░╚═════╝░╚══════╝╚═╝░░╚═╝╚═╝╚═╝░░╚═╝\n💣 SCRIPT BLOCKED 💣\n🔥 Created by: Uzair MTX\n🚫 Credit choron ki entry band hai!`
  );
  process.exit(1);
}

module.exports.config = {
  name: "dewani",
  version: "1.2.0",
  hasPermssion: 0,
  credits: "uzairrajput",
  description: "AI voice, gif & mood bot (cute + naughty)",
  commandCategory: "ai",
  usages: "",
  cooldowns: 2,
};

const GEMINI_API = "https://uzairrajputapikey-0nhl.onrender.com/chat";
const VOICERSS_API_KEY = "fac8be56591049c3838a249d5c4d9f38";
const GIPHY_API_KEY = "JDeEepEj1zWHLqEaCOdwXW0krItJISC5";
const HUGGING_FACE_API = "https://api-inference.huggingface.co/models/google/vit-base-patch16-224";
const HUGGING_FACE_TOKEN = "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";

const chatHistories = {};

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, senderID, body, attachments, messageReply } = event;

  if (!body && !attachments?.length) return;

  const mention = body?.toLowerCase().includes("dewani");
  const replyToDewani = messageReply?.senderID === api.getCurrentUserID();

  if (!mention && !replyToDewani && !attachments?.length) return;

  let userMessage = body || "";
  if (!chatHistories[senderID]) chatHistories[senderID] = [];

  if (replyToDewani)
    userMessage = messageReply.body + "\nUser: " + userMessage;

  chatHistories[senderID].push(`User: ${userMessage}`);
  if (chatHistories[senderID].length > 5) chatHistories[senderID].shift();

  const conversation = chatHistories[senderID].join("\n");
  const prompt = `Tumhara name dewani hai. Tum aik girlfriend ki tarah baat karti ho, thori naughty, thori cute, aur full romantic. Reply hamesha expressive aur thumke maar ke karti ho.\n\n${conversation}`;

  api.setMessageReaction("⌛", messageID, () => {}, true);

  try {
    const aiRes = await axios.get(`${GEMINI_API}?message=${encodeURIComponent(prompt)}`);
    const reply = aiRes.data.reply || "Uff! Mujhe samajh nahi ai baby! 😕";

    // Voice
    const voiceURL = `https://api.voicerss.org/?key=${VOICERSS_API_KEY}&hl=hi-in&c=MP3&src=${encodeURIComponent(reply)}`;
    const voicePath = path.join(__dirname, `voice-${senderID}.mp3`);
    const writer = fs.createWriteStream(voicePath);

    https.get(voiceURL, (res) => {
      res.pipe(writer);
      writer.on("finish", async () => {
        await api.sendMessage({
          body: reply,
          attachment: fs.createReadStream(voicePath),
        }, threadID, () => fs.unlinkSync(voicePath));
      });
    });

    // Image mood detection
    if (attachments?.[0]?.type === "photo") {
      const imgUrl = attachments[0].url;
      const image = await axios.get(imgUrl, { responseType: "arraybuffer" });
      const form = new FormData();
      form.append("inputs", image.data, { filename: "image.jpg" });

      const moodRes = await axios.post(HUGGING_FACE_API, form, {
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer ${HUGGING_FACE_TOKEN}`,
        },
      });

      const mood = moodRes.data?.[0]?.label || "funny";

      const gif = await axios.get(`https://api.giphy.com/v1/gifs/search?q=${mood}&api_key=${GIPHY_API_KEY}&limit=1`);
      const gifUrl = gif.data?.data?.[0]?.images?.original?.url;

      if (gifUrl) {
        const gifStream = await global.utils.getStreamFromURL(gifUrl);
        api.sendMessage({ attachment: gifStream }, threadID);
      }
    }

    chatHistories[senderID].push(`Dewani: ${reply}`);
    api.setMessageReaction("✅", messageID, () => {}, true);
  } catch (err) {
    console.error("Dewani error:", err.message);
    api.sendMessage(
      "Oops baby! 😔 me thori confuse ho gayi… thori der baad try karo na please! 💋",
      threadID,
      messageID
    );
    api.setMessageReaction("❌", messageID, () => {}, true);
  }
};

module.exports.run = () => {};
