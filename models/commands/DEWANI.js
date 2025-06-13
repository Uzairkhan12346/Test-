sk_e4225ec52dce1c51a1dde0e1438d0f49f5e697035132b4fdconst axios = require("axios");
const fs = require("fs");

const apiKey = "sk_e4225ec52dce1c51a1dde0e1438d0f49f5e697035132b4fd"; // sk- se start hone wali
const voiceId = "BpjGufoPiobT79j2vtj4";  // tumhara voice ID
const text = "Mujhse voice pe baat karo baby 💋 Dewani ready hai.";

axios({
  method: "post",
  url: `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
  headers: {
    "xi-api-key": apiKey,
    "Content-Type": "application/json",
    "Accept": "audio/mpeg"
  },
  data: {
    text,
    model_id: "eleven_multilingual_v2",
    voice_settings: {
      stability: 0.5,
      similarity_boost: 0.75
    }
  },
  responseType: "stream"
})
.then(response => {
  const writer = fs.createWriteStream("voice.mp3");
  response.data.pipe(writer);
  writer.on("finish", () => console.log("✅ Voice saved: voice.mp3"));
})
.catch(error => {
  console.error("❌ Error:", error.response?.data || error.message);
});
