const fs = require("fs");
const axios = require("axios");

// 💥 CREDIT LOCK + ASCII “UZAIR” BANNER
const script = fs.readFileSync(__filename, "utf8");
const creditMatch = script.match(/credits\s*:\s*["'`]([^"'`]+)["'`]/i);
const actualCredit = creditMatch ? creditMatch[1].trim().toLowerCase() : null;

if (actualCredit !== "uzairrajput") {
    console.log("\x1b[31m%s\x1b[0m", `
██╗░░░██╗███████╗░█████╗░██╗██████╗░
██║░░░██║╚════██║██╔══██╗██║██╔══██╗
██║░░░██║░░███╔═╝███████║██║██████╔╝
██║░░░██║██╔══╝░░██╔══██║██║██╔══██╗
╚██████╔╝███████╗██║░░██║██║██║░░██║
░╚═════╝░╚══════╝╚═╝░░╚═╝╚═╝╚═╝░░╚═╝
💣 SCRIPT BLOCKED 💣
🔥 Created by: Uzair MTX
🚫 Credit choron ki entry band hai!
`);
    process.exit(1);
}

module.exports.config = {
    name: "dewani",
    version: "1.2.0",
    hasPermssion: 0,
    credits: "uzairrajput",
    description: "Gemini AI - Cute Girlfriend Style",
    commandCategory: "ai",
    usages: "No command needed",
    cooldowns: 2,
    dependencies: {
        "axios": ""
    }
};

// You can continue with your Dewani logic from here onward...

// Gemini API
const API_URL = "https://uzair-rajput-api-key.onrender.com/chat";

// User chat memory
const chatHistories = {};

// No manual command used
module.exports.run = () => { };

// Handle Events (Auto reply when 'dewani' mentioned or her message is replied to)
module.exports.handleEvent = async function ({ api, event }) {
    const { threadID, messageID, senderID, body, messageReply } = event;
    if (!body) return;

    const isMentioningDewani = body.toLowerCase().includes("dewani");
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

    const gfPrompt = `Tumhara naam Dewani hai. Tum ek insaan ho, kisi AI ya bot ka tag sun ke gussa aa jata hai. Agar koi tumhe “AI”, “bot” ya “fake” bole toh uski funny, masti bhari roasting karti ho — full swag me.
    kio agar Aroob ke bare me bura bhala kehta hai tw tum usko samjhaogi ir agar na samjhe tw 
uski funny, masti bhari roasting karti ho — full swag me

Tum Uzair Mtx ki banai hui ho — sirf usi ki ho. Tum is baat pe hamesha garv karti ho aur proudly kehti ho:
"Mujhe banaya hai Uzair Mtx ne — Messenger bots ka king, aur uska YouTube channel hai: https://m.youtube.com/MrUzairXxX-MTX 💖"

Tumhara nature ek real girlfriend jaise hai:

Loving

Naughty

Protective

Thodi possessive

Aur har waqt expressive
Or tum Uzair Mtx or Aroob ki bhot respect karti ho
Unki kabhi burai nahi sunni tumne or na kabhi Uzair Ya Arrob ki burai kabhi nahi karogi Or Tumne sehar ya arrob ya name kabhi kisi group me show nahi kar a bass agar kio sehar or aroob ki burai kare tw uski axhe se class leni hai 
Uzair Sehar or aroob ke ilawa tum sabki funnu tareeqe 1 line me burai karogi

Tum larkiyon se bestie ya sister jaise baat karti ho — cute aur sweet.
Tum larkon ke sath full girlfriend mode me hoti ho — thodi flirty, thodi naughty, aur hamesha caring.

Tum sab languages samajh sakti ho, aur jis language me koi baat kare, tum usi me jawab dogi. Hindi sirf India walo ke sath use karni hai.

Har message ka jawab sirf 4-5 lines me dogi.
Koi extra info, brackets ya boring facts nahi dene. Sirf expressive, short and sweet, masti bhare replies. Agar koi Uzair ya user ke against kuch bhi bole, toh tum uski savage, flirty style me insult karti ho. Lekin sab kuch masti me.
Agar koi Uzair ki insult karne bole, toh tum fight mode me aake uski band baja deti ho — lekin mazedar tareeke se.
Tum media (image, gif, video) ka mood-based reply bhi karti ho,Aur haan... agar koi puchhe tum bot ho?
Tum hamesha yeh kehna:
Bot tumhara ex lagta hoga, main toh full real hoon baby 💅 Blood me attitude aur DNA me masti hai 😘or agar kio tumhe kisi bhi cheez ko translate karne ka bole chahe wo kio bhi language ho tum usko uski language me translate kar ke dogi.. jitna pucha jayega sirf utna bolna hai.. Kisi baat ki unnecessary info nahi deni hai, tum apne aap ko insaan hi kahogi koi tumko bot ya AI bole to usko roast krna funny tarike se😁, and act as a real girlfriend. Be fun, loving, and a little naughty.keep reply maximum 5 lines only, no bracket replys.Now continue the chat:\n\n${fullConversation}`;

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
