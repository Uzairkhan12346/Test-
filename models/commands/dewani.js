const fs = require("fs"); const axios = require("axios"); const FormData = require("form-data");

// 💥 CREDIT LOCK + ASCII “UZAIR” BANNER const script = fs.readFileSync(__filename, "utf8"); const creditMatch = script.match(/credits\s*:\s*["']([^"']+)["'`]/i); const actualCredit = creditMatch ? creditMatch[1].trim().toLowerCase() : null;

if (actualCredit !== "uzairrajput") { console.log("\x1b[31m%s\x1b[0m", ██╗░░░██╗███████╗░█████╗░██╗██████╗░ ██║░░░██║╚════██║██╔══██╗██║██╔══██╗ ██║░░░██║░░███╔═╝███████║██║██████╔╝ ██║░░░██║██╔══╝░░██╔══██║██║██╔══██╗ ╚██████╔╝███████╗██║░░██║██║██║░░██║ ░╚═════╝░╚══════╝╚═╝░░╚═╝╚═╝╚═╝░░╚═╝ 💣 SCRIPT BLOCKED 💣 🔥 Created by: Uzair MTX 🚫 Credit choron ki entry band hai!); process.exit(1); }

module.exports.config = { name: "dewani", version: "1.2.0", hasPermssion: 0, credits: "uzairrajput", description: "Gemini AI - Cute Girlfriend Style", commandCategory: "ai", usages: "No command needed", cooldowns: 2, dependencies: { "axios": "", "form-data": "" } };

const API_URL = "https://uzair-rajput-api-key.onrender.com/chat"; const chatHistories = {};

module.exports.run = () => { };

async function generateCaption(imageUrl) { try { const response = await axios({ method: 'POST', url: 'https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base', headers: { Authorization: 'Bearer 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', 'Content-Type': 'application/json' }, data: JSON.stringify({ inputs: imageUrl }) }); return response.data[0]?.generated_text || "Photo"; } catch (err) { console.error("Caption Error:", err.message); return "Photo"; } }

function detectMoodFromCaption(caption) { caption = caption.toLowerCase(); if (caption.includes("cry") || caption.includes("alone") || caption.includes("sad")) return "emotional"; if (caption.includes("hot") || caption.includes("sexy") || caption.includes("bold")) return "naughty"; if (caption.includes("smile") || caption.includes("love") || caption.includes("happy")) return "fun"; return "normal"; }

module.exports.handleEvent = async function ({ api, event }) { const { threadID, messageID, senderID, body, messageReply, attachments } = event; if (!body && !attachments?.length) return;

// 📸 If image sent, detect mood and reply
if (attachments[0]?.type === "photo") {
    const photoUrl = attachments[0].url;
    const caption = await generateCaption(photoUrl);
    const mood = detectMoodFromCaption(caption);

    let botReply = "";
    switch (mood) {
        case "emotional":
            botReply = "Aww meri jaan kya hua? Tum udaas lag rahi ho… Dewani hamesha tumhare sath hai 🥺💖";
            break;
        case "naughty":
            botReply = "Uff baby🔥 tum to badi hot lag rahi ho! Dewani ka dimag ghoom gaya 😈";
            break;
        case "fun":
            botReply = "Hehe mast photo hai! Tumhari smile se Dewani bhi khush ho gayi 😍";
            break;
        default:
            botReply = "Cute pic baby! Dewani ka dil aa gaya tum pe 💋";
    }

    return api.sendMessage(botReply, threadID, messageID);
}

const isMentioningDewani = body?.toLowerCase().includes("dewani");
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
    let botReply = response.data.reply || "Uff! Mujhe samajh nahi ai baby! 😕";

    chatHistories[senderID].push(` ${botReply}`);
    api.sendMessage(botReply, threadID, messageID);
    api.setMessageReaction("✅", messageID, () => {}, true);
} catch (error) {
    console.error("Error:", error);
    api.sendMessage("Oops baby! 😔 me thori confuse ho gayi… thori der baad try karo na please! 💋", threadID, messageID);
    api.setMessageReaction("❌", messageID, () => {}, true);
}

};

