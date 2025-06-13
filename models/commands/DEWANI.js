const axios = require("axios");
const fs = require("fs");
const path = require("path");

const ownerUID = "61552682190483"; // Sirf tumhare liye
const voiceAPI = "sk-120e1b6fdaa43ab502ec50247a226363b7a85981b0c3b675"; // ElevenLabs API
const voiceID = "BpjGufoPiobT79j2vtj4"; // Priyanka Sogam voice

module.exports.config = {
  name: "voiceai",
  version: "1.0",
  hasPermssion: 0,
  credits: "uzairrajput",
  description: "Roman Urdu voice-only girlfriend AI",
  commandCategory: "ai",
  usages: "auto",
  cooldowns: 0,
};

module.exports.handleEvent = async function ({ api, event }) {
  const { senderID, threadID, body, messageID, isGroup } = event;
  if (!body || isGroup || senderID !== ownerUID) return;

  const prompt = `Ek ladki apne boyfriend se baat kar rahi hai, Roman Urdu mein thoda romantic aur naughty tareeke se jawab do. User ne kaha: "${body}"`;

  try {
    // Gemini AI se reply lo
    const aiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCSbJErgQT35a7JeUuLb9hfR-fIas8yUtQ`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );

    const aiText = aiRes.data.candidates[0].content.parts[0].text;

    // ElevenLabs se voice banao
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

    const filePath = path.join(__dirname, `dewani-${Date.now()}.mp3`);
    fs.writeFileSync(filePath, Buffer.from(voiceRes.data, "binary"));

    api.sendMessage({ attachment: fs.createReadStream(filePath) }, threadID, () => {
      fs.unlinkSync(filePath);
    });

  } catch (err) {
    console.error("Voice AI Error:", err.message);
    return api.sendMessage("Oops baby 😔 Dewani ko thoda issue hua... thori der baad try karo na 💋", threadID, messageID);
  }
};

module.exports.run = async () => {}; // No manual command
