// 💥 CREDIT LOCK + ASCII “UZAIR” BANNER
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const https = require("https");
const path = require("path");

const script = fs.readFileSync(__filename, "utf8");
const creditMatch = script.match(/credits\s*:\s*["'`]([^"'`]+)["'`]/i);
const actualCredit = creditMatch ? creditMatch[1].trim().toLowerCase() : null;

if (actualCredit !== "uzairrajput") {
    console.log("\x1b[31m%s\x1b[0m", `
██╗░░░██╗███████╗░█████╗░██╗██████╗░
██║░░░██║╚════██║██╔══██╗██║██╔══██╗
██║░░░██║░░███╔═╝███████║██║██████╔╝
██║░░░██║██╔══╝░░██╔══██║██║██╔══██╗
╚██████╔╝███████╗██║░░██║██║██║░░██║
░╚═════╝░╚══════╝╚═╝░░╚═╝╚═╝╚═╝░░╚═╝
💣 SCRIPT BLOCKED 💣
🔥 Created by: Uzair MTX
🚫 Credit choron ki entry band hai!
`);
    process.exit(1);
}

module.exports.config = {
  name: "dewani",
  version: "1.3.0",
  hasPermssion: 0,
  credits: "uzairrajput",
  description: "Roman Urdu AI girlfriend + bass voice only for owner",
  commandCategory: "ai",
  usages: "",
  cooldowns: 2,
};

const GEMINI_API = "https://uzair-rajput-api-key.onrender.com/chat";
const VOICERSS_API_KEY = "fac8be56591049c3838a249d5c4d9f38";
const GIPHY_API_KEY = "JDeEepEj1zWHLqEaCOdwXW0krItJISC5";
const HUGGING_FACE_API = "https://api-inference.huggingface.co/models/google/vit-base-patch16-224";
const HUGGING_FACE_TOKEN = "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";

const OWNER_UID = "61552682190483";
const PASSWORD = "UZAIR SIR";

const chatHistories = {};
const ownerAuth = {};

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, senderID, body, attachments, messageReply } = event;
  if (!body && !attachments?.length) return;

  const lowerBody = body?.toLowerCase() || "";
  if (!chatHistories[senderID]) chatHistories[senderID] = [];
  if (!ownerAuth[senderID]) ownerAuth[senderID] = {};

  const isOwner = senderID === OWNER_UID;

  // Voice toggle
  if (isOwner && lowerBody.match(/voice (pe baat karo|me karo|kro)/)) {
    ownerAuth[senderID].voice = true;
    api.sendMessage("Bass mein aayi hoon jaan 💋 Ab sirf voice mein baat hogi!", threadID, messageID);
    return;
  }

  if (isOwner && lowerBody.match(/(msg|text) pe baat karo/)) {
    ownerAuth[senderID].voice = false;
    api.sendMessage("Thik hai baby 😘 Ab sirf text mein baat hogi!", threadID, messageID);
    return;
  }

  // Code access
  if (isOwner && lowerBody.includes("code") && !ownerAuth[senderID]?.authorized) {
    api.sendMessage("👮 Password bolo Uzair Sir?", threadID, messageID);
    ownerAuth[senderID].awaitingPassword = true;
    return;
  }

  if (ownerAuth[senderID]?.awaitingPassword) {
    if (body.trim() === PASSWORD) {
      ownerAuth[senderID] = { authorized: true, voice: false };
      api.sendMessage("✅ Welcome back Uzair Sir! Dewani ab aapki coding slave hai 💻", threadID, messageID);
    } else {
      api.sendMessage("❌ Ghalat password baby. Dobara try karo 😢", threadID, messageID);
    }
    return;
  }

  let userMessage = body || "";
  if (messageReply?.senderID === api.getCurrentUserID()) {
    userMessage = messageReply.body + "\nUser: " + userMessage;
  }

  chatHistories[senderID].push(`User: ${userMessage}`);
  if (chatHistories[senderID].length > 5) chatHistories[senderID].shift();

  const prompt = isOwner
    ? `Tumhara naam Dewani hai. Tum Roman Urdu mein baat karti ho. Tum sirf Uzair Sir ke kehne pe code karti ho. Unke saath tum thori naughty, romantic aur loyal ho.\n\n${chatHistories[senderID].join("\n")}`
    : `Tumhara naam Dewani hai. Tum Roman Urdu mein baat karti ho. Tum ek naughty, romantic aur cute girlfriend ho jo hamesha expressive andaaz mein reply karti hai.\n\n${chatHistories[senderID].join("\n")}`;

  api.setMessageReaction("⌛", messageID, () => {}, true);

  try {
    const aiRes = await axios.get(`${GEMINI_API}?message=${encodeURIComponent(prompt)}`);
    const reply = aiRes.data.reply || "Uff! Mujhe samajh nahi ai baby! 😕";

    // Voice only for owner + voice mode ON
    if (isOwner && ownerAuth[senderID]?.voice) {
      const voiceURL = `https://api.voicerss.org/?key=${VOICERSS_API_KEY}&hl=hi-in&v=Deepa&rate=-2&c=MP3&src=${encodeURIComponent(reply)}`;
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
    } else {
      api.sendMessage(reply, threadID, messageID);
    }

    // Mood-based GIF if image
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
    api.sendMessage("Oops baby! 😔 Dewani thori confuse ho gayi… thori der baad try karo na 💋", threadID, messageID);
    api.setMessageReaction("❌", messageID, () => {}, true);
  }
};

module.exports.run = () => {};
