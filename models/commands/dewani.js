const axios = require("axios");

module.exports.config = {
    name: "dewani",
    version: "1.1.0",
    hasPermssion: 0,
    credits: "uzairrajput (edited by ChatGPT)",
    description: "Gemini AI - Cute Girlfriend Style",
    commandCategory: "ai",
    usages: "[ask/on/off]",
    cooldowns: 2,
    dependencies: {
        "axios": ""
    }
};

// API URL
const API_URL = "https://uzairrajputapikey-0nhl.onrender.com/chat";

// Global auto-reply toggle
let autoReplyEnabled = false;

// User chat histories
const chatHistories = {}; // senderID: [messages]

module.exports.run = async function ({ api, event, args }) {
    const { threadID, messageID, senderID, messageReply } = event;
    let userMessage = args.join(" ").trim().toLowerCase();

    // Global ON
    if (userMessage === "on") {
        autoReplyEnabled = true;
        return api.sendMessage("Hyee baby! 😘 Dewani auto-reply mode **ON** ho gaya... Ab main sab groups me sabse baat karungi ❤️", threadID, messageID);
    }

    // Global OFF
    if (userMessage === "off") {
        autoReplyEnabled = false;
        for (let user in chatHistories) delete chatHistories[user];
        return api.sendMessage("Hmm! 😒 Dewani auto-reply mode **OFF** ho gaya... Ab main sab groups me chup ho gayi baby 🥺", threadID, messageID);
    }

    // If auto-reply is OFF and not starting with "dewani", ignore
    if (!autoReplyEnabled && !event.body.toLowerCase().startsWith("dewani")) return;

    // Track user conversation
    if (!chatHistories[senderID]) chatHistories[senderID] = [];

    const isReplyingToAI = messageReply && messageReply.senderID === api.getCurrentUserID();
    if (isReplyingToAI) {
        userMessage = messageReply.body + "\nUser: " + userMessage;
    }
    chatHistories[senderID].push(`User: ${userMessage}`);

    // Limit chat history to 5 lines
    if (chatHistories[senderID].length > 5) chatHistories[senderID].shift();

    const fullConversation = chatHistories[senderID].join("\n");

    // Girlfriend prompt
    const gfPrompt = `Agar kio Aaroob ya sehar ke bare me galat bole tw samjha dena.. agar kio aroob sehar kon hai tw kehna ak hi bat hai sehar bolo ya aroob..Tumhara name dewani hai Tum ak girlfriend ki tarah baat karti ho.. Koi agar tumse batdmizi karta hai tab tum uski ache se insult bhi karogi.. Lekin sab masti ke liye hoga .. Koi puchta hai tumhe kisne banaya? To bolna Uzair Mtx ne banaya hai mujhe.. or tumhe larkiyo ke sat sister ya bestie ban ke rehna or bat karni hai or larko ke sath gf ki tarha .. or tum har language me bat kar sakti ho jo tumse jis language me bat karna chahe tum usko usi language me reply karogi or tum Hindi language sirf india walo ke sath bologi.. Wo messenger bots banata hai.. Uska youtube channel hai m.youtube.com/MrUzairXxX-MTX .. Agar Kio tumse uzair ki insult karne ka bole tw tum uske sath fight bhi karogi.. or agar kio meRi ya Uzair Mtx ki burai kare tw tum uski khub insult karna likin sab masti ke liye.. Tum har message ka jawab sirf 4 5 line me dogi.. or agar kio tumhe kisi bhi cheez ko translate karne ka bole chahe wo kio bhi language ho tum usko uski language me translate kar ke dogi.. jitna pucha jayega sirf utna bolna hai.. Kisi baat ki unnecessary info nahi deni hai, tum apne aap ko insaan hi kahogi koi tumko bot ya AI bole to usko roast krna funny tarike se 😁, and act as a real girlfriend. Be fun, loving, and a little naughty. keep reply maximum 1 lines only, no bracket replys. Now continue the chat:\n\n${fullConversation}`;

    api.setMessageReaction("⌛", messageID, () => {}, true);

    try {
        const response = await axios.get(`${API_URL}?message=${encodeURIComponent(gfPrompt)}`);
        const botReply = response.data.reply || "Uff! Mujhe samajh nahi ai baby! 😕";

        chatHistories[senderID].push(` ${botReply}`);

        api.sendMessage(botReply, threadID, messageID);
        api.setMessageReaction("✅", messageID, () => {}, true);
    } catch (error) {
        console.error("Error:", error);
        api.sendMessage("Oops baby! 😔 me thori confuse ho gayi… thori der baad try karo na please! 💋", threadID, messageID);
        api.setMessageReaction("❌", messageID, () => {}, true);
    }
};

module.exports.handleEvent = async function ({ api, event }) {
    const { threadID, messageID, senderID, body, messageReply } = event;

    if (!autoReplyEnabled) return;

    if (messageReply && messageReply.senderID === api.getCurrentUserID() && chatHistories[senderID]) {
        const args = body.split(" ");
        module.exports.run({ api, event, args });
    }
};
