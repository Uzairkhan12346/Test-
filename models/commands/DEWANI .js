// 💥 CREDIT LOCK + ASCII “UZAIR” BANNER const fs = require("fs"); const axios = require("axios"); const FormData = require("form-data"); const https = require("https"); const path = require("path");

const script = fs.readFileSync(__filename, "utf8"); const creditMatch = script.match(/credits\s*:\s*["']([^"']+)["'`]/i); const actualCredit = creditMatch ? creditMatch[1].trim().toLowerCase() : null;

if (actualCredit !== "uzairrajput") { console.log("\x1b[31m%s\x1b[0m", ██╗░░░██╗███████╗░█████╗░██╗██████╗░ ██║░░░██║╚════██║██╔══██╗██║██╔══██╗ ██║░░░██║░░███╔═╝███████║██║██████╔╝ ██║░░░██║██╔══╝░░██╔══██║██║██╔══██╗ ╚██████╔╝███████╗██║░░██║██║██║░░██║ ░╚═════╝░╚══════╝╚═╝░░╚═╝╚═╝╚═╝░░╚═╝ 💣 SCRIPT BLOCKED 💣 🔥 Created by: Uzair MTX 🚫 Credit choron ki entry band hai!); process.exit(1); }

module.exports.config = { name: "dewani", version: "1.3.0", hasPermssion: 0, credits: "uzairrajput", description: "AI romantic bot with conditional voice", commandCategory: "ai", usages: "", cooldowns: 2, };

const GEMINI_API = "https://uzair-rajput-api-key.onrender.com/chat"; const VOICERSS_API_KEY = "fac8be56591049c3838a249d5c4d9f38"; const GIPHY_API_KEY = "JDeEepEj1zWHLqEaCOdwXW0krItJISC5"; const HUGGING_FACE_API = "https://api-inference.huggingface.co/models/google/vit-base-patch16-224"; const HUGGING_FACE_TOKEN = "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";

const OWNER_UID = "61552682190483"; const PASSWORD = "UZAIR SIR";

const chatHistories = {}; const ownerAuth = {}; const voiceMode = {}; // owner ke liye toggle

module.exports.handleEvent = async function ({ api, event }) { const { threadID, messageID, senderID, body, attachments, messageReply } = event; if (!body && !attachments?.length) return;

const lowerBody = body?.toLowerCase() || ""; const mention = lowerBody.includes("dewani"); const replyToDewani = messageReply?.senderID === api.getCurrentUserID();

if (!mention && !replyToDewani && !attachments?.length) return;

if (!chatHistories[senderID]) chatHistories[senderID] = [];

// Voice mode control (owner only) if (senderID === OWNER_UID) { if (/(voice pe baat karo|voice me karo|voice kro)/.test(lowerBody)) { voiceMode[senderID] = true; return api.sendMessage("💋 Dewani ab sirf voice me baat karegi, Uzair Sir!", threadID, messageID); } if (/(msg pe baat karo|text me karo|chal msg pe baat karo)/.test(lowerBody)) { voiceMode[senderID] = false; return api.sendMessage("📩 Dewani ab text me hi reply karegi, Uzair Sir!", threadID, messageID); } }

// Code access if (senderID === OWNER_UID && lowerBody.includes("code") && !ownerAuth[senderID]) { api.sendMessage("👮 Password bolo Uzair Sir?", threadID, messageID); ownerAuth[senderID] = { awaitingPassword: true }; return; } if (ownerAuth[senderID]?.awaitingPassword) { if (body.trim() === PASSWORD) { ownerAuth[senderID] = { authorized: true }; return api.sendMessage("✅ Welcome back, Uzair Sir!", threadID, messageID); } else { return api.sendMessage("❌ Ghalat password! Dobara try karo.", threadID, messageID); } }

let userMessage = body || ""; if (replyToDewani) userMessage = messageReply.body + "\nUser: " + userMessage;

chatHistories[senderID].push(User: ${userMessage}); if (chatHistories[senderID].length > 5) chatHistories[senderID].shift();

const isOwner = senderID === OWNER_UID && ownerAuth[senderID]?.authorized; const prompt = isOwner ? Tumhara naam Dewani hai. Tum Uzair Sir ke orders pe code likhti ho.\n\n${chatHistories[senderID].join("\n")} : Tumhara naam Dewani hai. Tum ek girlfriend ki tarah baat karti ho, thodi naughty, thodi cute, aur full romantic.\n\n${chatHistories[senderID].join("\n")};

api.setMessageReaction("⌛", messageID, () => {}, true);

try { const aiRes = await axios.get(${GEMINI_API}?message=${encodeURIComponent(prompt)}); const reply = aiRes.data.reply || "Uff! Mujhe samajh nahi aaya baby 😕";

const shouldSpeak = senderID === OWNER_UID && voiceMode[senderID];
if (shouldSpeak) {
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
} else {
  await api.sendMessage(reply, threadID, messageID);
}

// Mood GIF if photo sent
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
    const gifRes = await axios.get(gifUrl, { responseType: "stream" });
    api.sendMessage({ attachment: gifRes.data }, threadID);
  }
}

chatHistories[senderID].push(`Dewani: ${reply}`);
api.setMessageReaction("✅", messageID, () => {}, true);

} catch (err) { console.error("Dewani error:", err.message); api.sendMessage("Oops baby! 😔 Thori confusion ho gayi. Baad me try karo na please! 💋", threadID, messageID); api.setMessageReaction("❌", messageID, () => {}, true); } };

module.exports.run = () => {};

