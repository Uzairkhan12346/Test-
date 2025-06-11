const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "dewani",
  version: "1.3.0",
  hasPermssion: 0,
  credits: "uzairrajput + ChatGPT",
  description: "Gemini AI + ElevenLabs Voice (Only for Owner)",
  commandCategory: "ai",
  usages: "Auto replies only to mentions/replies",
  cooldowns: 2,
  dependencies: {
    "axios": ""
  }
};

const API_URL = "https://uzairrajputapikey-0nhl.onrender.com/chat";
const elevenLabsApiKey = "sk-120e1b6fdaa43ab502ec50247a226363b7a85981b0c3b675";
const elevenLabsVoiceId = "BpjGufoPiobT79j2vtj4"; // Priyanka Sogam

const OWNER_UID = "61552682190483";
const voiceToggles = {}; // UID: true/false
const chatHistories = {};

module.exports.run = () => {}; // No command

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, senderID, body, messageReply } = event;
  if (!body) return;

  const lower = body.toLowerCase();

  // 🔘 Trigger voice ON
  if (senderID === OWNER_UID && /(voice me karo|voice kro|voice pe baat karo)/i.test(lower)) {
    voiceToggles[senderID] = true;
    return api.sendMessage("Jee baby 😘 ab main sirf awaz me baat karungi 🗣️", threadID, messageID);
  }

  // 🔘 Trigger voice OFF
  if (senderID === OWNER_UID && /(msg pe baat karo|text me karo|chal msg pe baat karo)/i.test(lower)) {
    voiceToggles[senderID] = false;
    return api.sendMessage("Ok jaan ❤️ ab sirf text me baat karungi 💬", threadID, messageID);
  }

  // 💬 Only respond if mentioned or replying to Dewani
  const isMentioningDewani = lower.includes("dewani");
  const isReplyingToDewani = messageReply && messageReply.senderID === api.getCurrentUserID();
  if (!isMentioningDewani && !isReplyingToDewani) return;

  let userMessage = body;
  if (!chatHistories[senderID]) chatHistories[senderID] = [];

  if (isReplyingToDewani) {
    userMessage = messageReply.body + "\nUser: " + userMessage;
  }

  chatHistories[senderID].push(`User: ${userMessage}`);
  if (chatHistories[senderID].length > 5) chatHistories[senderID].shift();

  const fullConversation = chatHistories[senderID].join("\n");

  const gfPrompt = `Agar kio Aaroob ya sehar ke bare me galat bole tw samjha dena.. agar kio aroob sehar kon hai tw kehna ak hi bat hai sehar bolo ya aroob..Tumhara name dewani hai Tum ak girlfriend ki tarah baat karti ho.. Koi agar tumse batdmizi karta hai tab tum uski ache se insult bhi karogi.. Lekin sab masti ke liye hoga .. Koi puchta hai tumhe kisne banaya? To bolna Uzair Mtx ne banaya hai mujhe.. or tumhe larkiyo ke sat sister ya bestie ban ke rehna or bat karni hai or larko ke sath gf ki tarha .. or tum har language me bat kar sakti ho jo tumse jis language me bat karna chahe tum usko usi language me reply karogi or tum Hindi language sirf india walo ke sath bologi.. Wo messenger bots banata hai.. Uska youtube channel hai m.youtube.com/MrUzairXxX-MTX .. Agar Kio tumse uzair ki insult karne ka bole tw tum uske sath fight bhi karogi.. or agar kio meRi ya Uzair Mtx ki burai kare tw tum uski khub insult karna likin sab masti ke liye.. Tum har message ka jawab sirf 4 5 line me dogi.. or agar kio tumhe kisi bhi cheez ko translate karne ka bole chahe wo kio bhi language ho tum usko uski language me translate kar ke dogi.. jitna pucha jayega sirf utna bolna hai.. Kisi baat ki unnecessary info nahi deni hai, tum apne aap ko insaan hi kahogi koi tumko bot ya AI bole to usko roast krna funny tarike se😁, and act as a real girlfriend. Be fun, loving, and a little naughty.keep reply maximum 5 lines only, no bracket replys.Now continue the chat:\n\n${fullConversation}`;

  api.setMessageReaction("⌛", messageID, () => {}, true);

  try {
    const response = await axios.get(`${API_URL}?message=${encodeURIComponent(gfPrompt)}`);
    const botReply = response.data.reply;

    if (!botReply) {
      return api.sendMessage("Oops baby! 😔 me thori confuse ho gayi… thori der baad try karo na please! 💋", threadID, messageID);
    }

    chatHistories[senderID].push(` ${botReply}`);

    if (voiceToggles[senderID]) {
      const ttsResponse = await axios({
        method: "POST",
        url: `https://api.elevenlabs.io/v1/text-to-speech/${elevenLabsVoiceId}`,
        headers: {
          "xi-api-key": elevenLabsApiKey,
          "Content-Type": "application/json"
        },
        responseType: "arraybuffer",
        data: {
          text: botReply,
          model_id: "eleven_monolingual_v1",
          voice_settings: {
            stability: 0.4,
            similarity_boost: 0.8
          }
        }
      });

      const fileName = path.join(__dirname, "dewani_voice.mp3");
      fs.writeFileSync(fileName, Buffer.from(ttsResponse.data));

      api.sendMessage({
        body: "",
        attachment: fs.createReadStream(fileName)
      }, threadID, () => fs.unlinkSync(fileName), messageID);

    } else {
      api.sendMessage(botReply, threadID, messageID);
    }

    api.setMessageReaction("✅", messageID, () => {}, true);
  } catch (err) {
    console.error("Gemini/Voice error:", err.message);
    api.sendMessage("Oops baby! 😔 me thori confuse ho gayi… thori der baad try karo na please! 💋", threadID, messageID);
    api.setMessageReaction("❌", messageID, () => {}, true);
  }
};
