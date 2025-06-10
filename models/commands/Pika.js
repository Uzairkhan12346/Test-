const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const gTTS = require("gtts");

module.exports.config = {
  name: "hercai",
  version: "2.0",
  hasPermission: 0,
  credits: "Uzair GPT",
  description: "Advanced Hercai AI with voice + mood + time greeting",
  commandCategory: "no prefix",
  usages: "",
  cooldowns: 1,
};

const ownerName = "Uzair 🦋";
const emojis = ["😂", "💋", "🙈", "😜", "🌸", "🔥", "🥺", "😍", "😎"];

module.exports.handleEvent = async function ({ api, event, Users }) {
  const { body, threadID, messageID, senderID } = event;
  if (!body || senderID == api.getCurrentUserID()) return;

  const name = await Users.getNameUser(senderID);
  const lower = body.toLowerCase();
  let reply = "";

  try {
    // 🕒 Time-based Greetings
    const hour = new Date().getHours();
    if (lower.includes("good morning") || lower.includes("morning")) {
      reply = `Good Morning ${name} ☀️\nUmeed hai tumhara din khubsurat ho!`;
    } else if (lower.includes("good night") || lower.includes("night") || (hour >= 22 || hour <= 5)) {
      reply = `Good Night ${name} 🌙\nSweet dreams 💖 Main tumhare khwab mein aaungi 😘`;
    }

    // 🛡️ Owner protection
    else if (lower.includes("owner") && (lower.includes("chutiya") || lower.includes("bura") || lower.includes("ganda"))) {
      reply = `😡 Apne ${ownerName} ke khilaaf ek lafz bhi nahi sunungi!\nWoh mere sab kuch hain 💖`;
    }

    // 📢 Promote
    else if (lower.includes("promote") || lower.includes("follow") || lower.includes("bot banado")) {
      reply = `🌸 Follow karo mere owner ${ownerName} ko!\n💖 Insta: @uzair.official\n🔥 Bot banwana ho to msg kro!`;
    }

    // 💞 Romantic
    else if (lower.includes("i love you") || lower.includes("meri jaan") || lower.includes("tum meri ho") || lower.includes("baby") || lower.includes("gf")) {
      reply = `Aww 😍 Main bhi tumse pyar karti hoon ${name} 💖 Tum meri zindagi ho 🥺`;
    }

    // 👯‍♀️ Bestie/Sis
    else if (lower.includes("sad") || lower.includes("akeli") || lower.includes("bestie") || lower.includes("behen")) {
      reply = `Tum akeli nahi ho ${name}, main tumhari bestie hoon 💕 Hamesha saath rahungi!`;
    }

    // 😂 Funny
    else if (lower.includes("joke") || lower.includes("funny") || lower.includes("bore")) {
      reply = `Ek joke suno ${name}:\nBoy: Kya tum mujhe chhod dogi?\nGirl: Jab Net slow hoga tab bhi YouTube nahi chhodti, tum kya cheez ho! 😂`;
    }

    // 🌐 Default: Hercai AI reply
    else {
      const res = await axios.get(`https://hercai.onrender.com/v3/hercai?question=${encodeURIComponent(body)}`);
      reply = res.data.reply;
    }

    // Emoji add
    reply += " " + emojis[Math.floor(Math.random() * emojis.length)];

    // 🔊 Voice reply via gTTS
    const gtts = new gTTS(reply, 'hi'); // 'hi' for Hindi/Urdu accent
    const filePath = path.join(__dirname, "..", "..", "cache", `${senderID}_hercai.mp3`);
    gtts.save(filePath, async function (err) {
      if (err) {
        console.error("gTTS error:", err);
        return api.sendMessage({ body: reply }, threadID, messageID);
      }

      // Send audio with reply
      api.sendMessage(
        {
          body: reply,
          attachment: fs.createReadStream(filePath),
          mentions: [{ tag: name, id: senderID }],
        },
        threadID,
        () => fs.unlinkSync(filePath),
        messageID
      );
    });
  } catch (e) {
    console.log("Hercai Error:", e);
  }
};

module.exports.run = () => {};
