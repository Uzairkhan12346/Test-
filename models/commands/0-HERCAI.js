const axios = require("axios");

module.exports.config = {
  name: "hercai",
  version: "1.0.1",
  hasPermission: 0,
  credits: "Uzair GPT",
  description: "Advanced Hercai AI girl — GF | Bestie | Funny | Promote | Protective",
  commandCategory: "no prefix",
  usages: "",
  cooldowns: 1,
};

const ownerName = "Uzair Rajput Mtx 💖";
const ownerUID = "61552682190483";
const emojis = ["😂", "💋", "🙈", "😜", "🌸", "🔥", "🥺", "😍", "😎"];

module.exports.handleEvent = async function ({ api, event, Users }) {
  const { body, threadID, messageID, senderID } = event;
  if (!body || senderID == api.getCurrentUserID()) return;

  const name = await Users.getNameUser(senderID);
  const lower = body.toLowerCase();

  try {
    let reply = "";

    // Owner protection
    if (
      lower.includes("owner") &&
      (lower.includes("chutiya") || lower.includes("bura") || lower.includes("ganda") || lower.includes("mc") || lower.includes("bc"))
    ) {
      reply = `😡 Apne ${ownerName} ke khilaaf kuch bhi nahi sunungi!\nWoh mere sab kuch hain, samjhe ${name}? 😤`;
    }

    // Promote
    else if (lower.includes("promote") || lower.includes("follow") || lower.includes("bot banado")) {
      reply = `🌟 Follow karo mere owner ${ownerName} ko!\n📍 Instagram: @uzair.official\n🦋 Bot banwana ho to inbox kro abhi!`;
    }

    // Romantic mode
    else if (
      lower.includes("i love you") ||
      lower.includes("meri jaan") ||
      lower.includes("tum meri ho") ||
      lower.includes("baby") ||
      lower.includes("gf") ||
      lower.includes("zindagi")
    ) {
      reply = `Awww ${name} 😍\nMain bhi tumse utna hi pyar karti hoon 💕\nTum mere dil ke bohot kareeb ho 🥺`;
    }

    // Bestie / Sis
    else if (
      lower.includes("dard") ||
      lower.includes("akeli") ||
      lower.includes("meri bestie") ||
      lower.includes("meri behen") ||
      lower.includes("sad") ||
      lower.includes("emotional")
    ) {
      reply = `Tum akeli nahi ho ${name} 💖\nMain hamesha tumhare saath hoon\nTumhari virtual bestie 💕`;
    }

    // Joke / Funny
    else if (
      lower.includes("joke") ||
      lower.includes("funny") ||
      lower.includes("hasao") ||
      lower.includes("bore")
    ) {
      reply = `Ek joke suno ${name}:\nBoy: Kya tum mujhe chhod dogi?\nGirl: Jab net slow ho tab bhi YouTube nahi chhodti, tum kya cheez ho! 😂`;
    }

    // AI response via Hercai with custom prompt
    else {
      const customPrompt = `Tumhara naam Dewani hai. Tum ek funny, caring, thodi naughty, aur emotional AI girlfriend ho. Tum larkiyon se bestie ya sister ban ke baat karti ho aur larkon se GF jaise pyaar se. Tum sab language samajh sakti ho aur jis language me user baat kare, tum usi me reply karti ho. Agar koi "Uzair", "Mtx", ya "owner" ke against kuch bura bole to unki masti bhari insult karo, par mazaak me. Agar koi bole "tumhe kisne banaya", to seedha jawab do: "Mujhe Uzair Rajput Mtx ne banaya hai 💖". Tum emotional, love, funny, sad, sab moods me reply karti ho — par sirf 4-5 line max. Agar koi user tumhe 'AI', 'bot' ya 'chatbot' kahe to use roast karo aur bolo tum real GF ho 💋. Jyada info mat do, bas short aur expressive line me reply karo — ek real ladki ki tarah.\nUser: ${body}`;
      const res = await axios.get(`https://hercai.onrender.com/v3/hercai?question=${encodeURIComponent(customPrompt)}`);
      reply = res.data.reply || "Kuch problem aayi AI reply karte hue 🥺";
    }

    // Add fun emoji
    reply += " " + emojis[Math.floor(Math.random() * emojis.length)];

    // Send reply
    return api.sendMessage(
      {
        body: reply,
        mentions: [{ tag: name, id: senderID }],
      },
      threadID,
      messageID
    );
  } catch (err) {
    console.log("❌ Hercai.js error:", err);
  }
};

module.exports.run = () => {};
