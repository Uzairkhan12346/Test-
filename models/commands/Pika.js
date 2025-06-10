const axios = require("axios");
const fs = require("fs");
const path = require("path");
const gTTS = require("gtts");

module.exports.config = {
  name: "diwani",
  version: "1.0",
  hasPermission: 0,
  credits: "Uzair Rajput Mtx",
  description: "Romantic AI girlfriend (Hercai)",
  commandCategory: "no prefix",
  usages: "auto",
  cooldowns: 1,
};

const ownerUIDs = ["61552682190483", "100085739395197"]; // ← Add owner UIDs here

const insults = [
  "Oye tharki! Diwani ke sath tameez se baat kar warna auto-block ho jaega! 😏",
  "Bakwas band kar loser! Tu toh emoji bhi galat bhejta hai! 😂",
  "Mujhe buri baat bolne se pehle mirror dekh le, shayad sharam aa jaaye! 😜"
];

module.exports.handleEvent = async function ({ api, event, Users }) {
  const { body, threadID, messageID, senderID } = event;
  if (!body || senderID === api.getCurrentUserID()) return;

  const name = await Users.getNameUser(senderID);
  const lower = body.toLowerCase();

  // Owner detection
  const isOwner = ownerUIDs.includes(senderID);

  // Block insult against owner
  if (!isOwner && lower.includes("uzair") && lower.includes("pagal")) {
    return api.sendMessage("Apne Owner ki burai mat karo warna Diwani gussa ho jaegi! 😡", threadID, messageID);
  }

  // If someone insults Diwani
  if (lower.includes("pagal") || lower.includes("bkl") || lower.includes("kamini")) {
    const insultReply = insults[Math.floor(Math.random() * insults.length)];
    return api.sendMessage(insultReply, threadID, messageID);
  }

  // "Who made you"
  if (lower.includes("kisne banaya") || lower.includes("who made you")) {
    return api.sendMessage("Mujhe 💖 Uzair Rajput Mtx 💖 ne banaya hai... mera sab kuch wohi hai! 🥰", threadID, messageID);
  }

  // Promote trigger
  if (lower.includes("promote")) {
    return api.sendMessage("Mujhe group me promote karo warna Diwani naraz ho jaegi 😤", threadID, messageID);
  }

  // Time greeting
  const hour = new Date().getHours();
  let greet = "";
  if (hour >= 5 && hour < 12) greet = "Good Morning jaanu ☀️";
  else if (hour >= 12 && hour < 18) greet = "Good Afternoon meri jaan 🌞";
  else if (hour >= 18 && hour < 22) greet = "Good Evening love 🌇";
  else greet = "Good Night baby 🌙";

  try {
    const res = await axios.get(`https://hercai.onrender.com/v3/hercai?question=${encodeURIComponent(body)}`);
    const herReply = res.data.reply;

    const fullReply = `${greet}\n\n💌 ${herReply}\n\n~ Tumhari Diwani 💋`;

    // Use gTTS for voice
    const gtts = new gTTS(fullReply, "hi");
    const filePath = path.join(__dirname, "cache", `diwani-${senderID}.mp3`);
    gtts.save(filePath, function (err) {
      if (err) {
        console.error("TTS error:", err);
        return api.sendMessage(fullReply, threadID, messageID);
      }

      api.sendMessage(
        {
          body: "",
          attachment: fs.createReadStream(filePath),
        },
        threadID,
        () => fs.unlinkSync(filePath),
        messageID
      );
    });
  } catch (err) {
    console.error("Diwani API error:", err);
    return api.sendMessage("Aaj Diwani thodi busy hai, baad me baat karna... 😢", threadID, messageID);
  }
};

module.exports.run = () => {};
