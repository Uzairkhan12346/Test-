const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
    name: "dewani",
    version: "1.2.1",
    hasPermssion: 0,
    credits: "uzairrajput",
    description: "Gemini AI - Cute Girlfriend Style with selective voice replies",
    commandCategory: "ai",
    usages: "Sirf mentions/replies pe auto reply karti hai",
    cooldowns: 2,
    dependencies: { "axios": "" }
};

const API_URL = "https://uzair-rajput-api-key.onrender.com/chat";
const ELEVENLABS_API_KEY = "sk-120e1b6fdaa43ab502ec50247a226363b7a85981b0c3b675";
const ELEVENLABS_VOICE_ID = "BpjGufoPiobT79j2vtj4"; // Priyanka Sogam
const OWNER_UID = "61552682190483";
const chatHistories = {};
const voiceStatus = {}; // userID: true/false

module.exports.run = () => {}; // koi command nahi

module.exports.handleEvent = async function ({ api, event }) {
    const { threadID, messageID, senderID, body, messageReply } = event;
    if (!body) return;

    const lowerBody = body.toLowerCase();

    // 👉 Sirf Uzair bole to voice on ya off hoga
    if (senderID === OWNER_UID) {
        if (/voice\s*(me|pe)?\s*bat\s*karo|voice\s*kro|voice\s*me\s*karo/.test(lowerBody)) {
            voiceStatus[senderID] = true;
            return api.sendMessage("Thik hai baby, ab se sirf voice mein baat hogi 💋", threadID, messageID);
        }
        if (/msg\s*pe\s*bat\s*karo|text\s*me\s*karo/.test(lowerBody)) {
            voiceStatus[senderID] = false;
            return api.sendMessage("Okay jaan, ab se text mein baat hogi 😘", threadID, messageID);
        }
    }

    // 👉 Sirf us waqt reply kare jab "dewani" mention ho ya reply uske msg pe ho
    const isMentioningDewani = lowerBody.includes("dewani");
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

    const gfPrompt = `Tumhara naam Dewani hai, tum girlfriend wali style mein bat karti ho... agar koi Uzair Mtx ya meri burai kare to uski zabardast maaro masti wale style mein 😈. Tum sirf 4-5 line ka reply do, zyada lambi bat nahi. Har message ka jawab loving, thoda naughty aur expressive ho. Aur agar koi tumhe AI ya bot kahe to funny roast karo. Ab baat continue karo:\n\n${fullConversation}`;

    api.setMessageReaction("⌛", messageID, () => {}, true);

    try {
        const response = await axios.get(`${API_URL}?message=${encodeURIComponent(gfPrompt)}`);
        let botReply = response.data.reply || "Uff! Mujhe samajh nahi ai baby! 😕";

        chatHistories[senderID].push(` ${botReply}`);

        // ✅ Sirf Uzair ko voice reply mile jab voice mode on ho
        if (senderID === OWNER_UID && voiceStatus[senderID]) {
            const audioPath = path.join(__dirname, "voice.mp3");

            const voiceResp = await axios({
                method: "POST",
                url: `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`,
                headers: {
                    "xi-api-key": ELEVENLABS_API_KEY,
                    "Content-Type": "application/json"
                },
                data: {
                    text: botReply,
                    model_id: "eleven_multilingual_v2",
                    voice_settings: {
                        stability: 0.4,
                        similarity_boost: 1
                    }
                },
                responseType: "stream"
            });

            const writer = fs.createWriteStream(audioPath);
            voiceResp.data.pipe(writer);

            writer.on("finish", () => {
                api.sendMessage({ attachment: fs.createReadStream(audioPath) }, threadID, () => {
                    fs.unlinkSync(audioPath); // file delete ho jaye baad mein
                }, messageID);
            });
        } else {
            api.sendMessage(botReply, threadID, messageID); // normal text reply
        }

        api.setMessageReaction("✅", messageID, () => {}, true);
    } catch (err) {
        console.error("Error:", err);
        api.sendMessage("Oops baby! 😔 thori si confusion ho gayi, baad mein try karna please!", threadID, messageID);
        api.setMessageReaction("❌", messageID, () => {}, true);
    }
};
