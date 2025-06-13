const axios = require("axios");
const fs = require("fs");
const path = require("path");

const ownerUID = "61552682190483"; // Sirf tumhare liye
const voiceAPI = "sk-120e1b6fdaa43ab502ec50247a226363b7a85981b0c3b675"; // ElevenLabs
const voiceID = "BpjGufoPiobT79j2vtj4"; // Priyanka voice

let voiceMode = false;

module.exports.config = {
  name: "voiceai",
  version: "1.1",
  hasPermssion: 0,
  credits: "uzairrajput",
  description: "Roman Urdu voice-only AI with trigger",
  commandCategory: "ai",
  usages: "auto",
  cooldowns: 0,
};

module.exports.handleEvent = async function ({ api, event }) {
  const { senderID, threadID, body, messageID, isGroup } = event;
  if (!body || isGroup || senderID !== ownerUID) return;

  const msg = body.toLowerCase();

  // 🔄 Turn on voice mode only when user says this:
  if (msg.includes("voice pe baat karo")) {
    voiceMode = true;

    const specialText = "Acha baby 💋 ab sirf voice mein baat hogi 🔥";

    const voiceRes = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceID}`,
      {
        text: specialText,
        model_id: "eleven_multilingual_v2",
        voice_settings: { stability: 0.4, similarity_boost: 0.75 }
      },
      {
        headers: {
          "xi-api-key": voiceAPI,
          "Content-Type": "application/json"
        },
        responseType: "arraybuffer"
      }
    );

    const filePath = path.join(__dirname, `voice-on-${Date.now()}.mp3`);
    fs.writeFileSync(filePath, Buffer.from(voiceRes.data, "binary"));

    return api.sendMessage({ attachment: fs.createReadStream(filePath) }, threadID, () => {
      fs.unlinkSync(filePath);
    });
  }

  // 🛑 If voice mode is off, ignore all
  if (!voiceMode) return;

  // ✨ Generate voice response
  const prompt = `Ek ladki apne boyfriend se baat kar rahi hai, Roman Urdu mein thoda romantic aur naughty tareeke se jawab do. User ne kaha: "${body}"`;

  try {
    const aiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCSbJErgQT35a7JeUuLb9hfR-fIas8yUtQ`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );

    const aiText = aiRes.data.candidates[0].content.parts[0].text;

    const voiceRes = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceID}`,
      {
        text: aiText,
        model_id: "eleven_multilingual_v2",
        voice_settings: { stability: 0.4, similarity_boost: 0.75 }
      },
      {
        headers: {
          "xi-api-key": voiceAPI,
          "Content-Type": "application/json"
        },
        responseType: "arraybuffer"
      }
    );

    const filePath = path.join(__dirname, `voice-${Date.now()}.mp3`);
    fs.writeFileSync(filePath, Buffer.from(voiceRes.data, "binary"));

    return api.sendMessage({ attachment: fs.createReadStream(filePath) }, threadID, () => {
      fs.unlinkSync(filePath);
    });

  } catch (err) {
    console.error("Voice Error:", err.message);
    return api.sendMessage("Oops baby 😔 thoda glitch aaya hai... thori der mein try karo 💋", threadID, messageID);
  }
};

module.exports.run = async () => {};
