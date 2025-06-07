const axios = require("axios");

module.exports.config = {
    name: "diwani",
    version: "1.1.1",
    hasPermssion: 0,
    credits: "uzairrajput",
    description: "Gemini AI - Cute Girlfriend Style with Gemini API",
    commandCategory: "ai",
    usages: "[ask/on/off]",
    cooldowns: 2,
};

const API_KEY = "YOUR_API_KEY_HERE"; // <== Make sure this is correct
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

const chatHistories = {};
const autoReplyEnabled = {};

module.exports.run = async function ({ api, event, args }) {
    const { threadID, messageID, senderID, messageReply } = event;
    let userMessage = args.join(" ");

    if (userMessage.toLowerCase() === "on") {
        autoReplyEnabled[senderID] = true;
        return api.sendMessage("Hyee baby! 😘 Diwani auto-reply mode **ON** ho gaya...", threadID, messageID);
    }

    if (userMessage.toLowerCase() === "off") {
        autoReplyEnabled[senderID] = false;
        chatHistories[senderID] = [];
        return api.sendMessage("Hmm! 😒 Diwani auto-reply mode **OFF** ho gaya...", threadID, messageID);
    }

    if (!autoReplyEnabled[senderID] && event.body.toLowerCase().indexOf("diwani") !== 0) return;

    if (!chatHistories[senderID]) {
        chatHistories[senderID] = [];
    }

    const isReplyingToAI = messageReply && messageReply.senderID === api.getCurrentUserID();
    if (isReplyingToAI) {
        userMessage = messageReply.body + "\nUser: " + userMessage;
        chatHistories[senderID].push(`User: ${userMessage}`);
    } else {
        chatHistories[senderID].push(`User: ${userMessage}`);
    }

    if (chatHistories[senderID].length > 5) {
        chatHistories[senderID].shift();
    }

    const conversation = chatHistories[senderID].join("\n");

    const gfPrompt = `Tumhara naam Diwani hai. Tum ek real girlfriend ki tarah masti bhari aur romantic style mein baat karti ho. Tum Uzair Mtx ki creation ho. Agar koi badtameezi kare to uski funny roast karo. Tum sabhi languages samajhti ho. Hindi sirf Indians ke sath. Tum har jawab sirf 1 line ka do. Unnecessary info bilkul mat do. Ab baat chalu karo:\n\n${conversation}`;

    api.setMessageReaction("⌛", messageID, () => {}, true);

    try {
        const response = await axios.post(API_URL, {
            contents: [
                {
                    role: "user",
                    parts: [{ text: gfPrompt }]
                }
            ]
        });

        const botReply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Uff baby! Kuch galti ho gayi...";
        chatHistories[senderID].push(`${botReply}`);
        api.sendMessage(botReply, threadID, messageID);
        api.setMessageReaction("✅", messageID, () => {}, true);
    } catch (error) {
        console.error("Gemini API Error:", error.response?.data || error.message);
        api.sendMessage("Oops baby! 😔 Diwani thori confuse ho gayi… thodi der baad try karo! 💋", threadID, messageID);
        api.setMessageReaction("❌", messageID, () => {}, true);
    }
};

module.exports.handleEvent = async function ({ api, event }) {
    const { senderID, body, messageReply } = event;
    if (!autoReplyEnabled[senderID]) return;

    if (messageReply && messageReply.senderID === api.getCurrentUserID() && chatHistories[senderID]) {
        const args = body.split(" ");
        module.exports.run({ api, event, args });
    }
};
