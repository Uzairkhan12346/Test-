const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "testvoice",
  version: "1.0",
  hasPermssion: 0,
  credits: "uzairrajput",
  description: "Voice test only",
  commandCategory: "test",
  usages: "auto",
  cooldowns: 0,
};

module.exports.handleEvent = async function ({ api, event }) {
  const { body, threadID, messageID, senderID } = event;
  if (!body || senderID !== "61552682190483") return;

  if (body.toLowerCase() !== "hello") return;

  const voiceAPI = "sk_e4225ec52dce1c51a1dde0e1438d0f49f5e697035132b4fd";
  const voiceID = "BpjGufoPiobT79j2vtj4";

  const text = "Hello baby, ye test message hai 💋";

  try {
    const res = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceID}`,
      {
        text,
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

    const filePath = path.join(__dirname, `test-${Date.now()}.mp3`);
    fs.writeFileSync(filePath, Buffer.from(res.data, "binary"));

    api.sendMessage({ attachment: fs.createReadStream(filePath) }, threadID, () => {
      fs.unlinkSync(filePath);
    });

  } catch (err) {
    console.error("Voice test failed:", err.message);
    api.sendMessage("Voice test failed 💔", threadID, messageID);
  }
};

module.exports.run = async () => {};
