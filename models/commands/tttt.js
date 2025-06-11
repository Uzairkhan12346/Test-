const _0x3c1d9f = _0x11ab;
(function (_0x5cfc3c, _0x35b3d9) {
    const _0x1a96cb = _0x11ab,
        _0x43dddf = _0x5cfc3c();
    while (!![]) {
        try {
            const _0x1ae0e2 = parseInt(_0x1a96cb(0x14e)) / 0x1 * (-parseInt(_0x1a96cb(0x150)) / 0x2) + -parseInt(_0x1a96cb(0x155)) / 0x3 * (parseInt(_0x1a96cb(0x14f)) / 0x4) + parseInt(_0x1a96cb(0x152)) / 0x5 + -parseInt(_0x1a96cb(0x14c)) / 0x6 * (-parseInt(_0x1a96cb(0x151)) / 0x7) + parseInt(_0x1a96cb(0x14b)) / 0x8 * (-parseInt(_0x1a96cb(0x14a)) / 0x9) + parseInt(_0x1a96cb(0x154)) / 0xa + -parseInt(_0x1a96cb(0x153)) / 0xb;
            if (_0x1ae0e2 === _0x35b3d9) break;
            else _0x43dddf['push'](_0x43dddf['shift']());
        } catch (_0x5e6e02) {
            _0x43dddf['push'](_0x43dddf['shift']());
        }
    }
}(_0x25ba, 0x61cf4));

function _0x11ab(_0x2f2991, _0x4160c1) {
    const _0x25ba44 = _0x25ba();
    return _0x11ab = function (_0x11ab30, _0x402a1e) {
        _0x11ab30 = _0x11ab30 - 0x14a;
        let _0x163c1f = _0x25ba44[_0x11ab30];
        return _0x163c1f;
    }, _0x11ab(_0x2f2991, _0x4160c1);
}

function _0x25ba() {
    const _0x38118b = ['actualCredit', '2678GPDFMe', 'match', 'log', 'fs', 'toLowerCase', 'utf8', '3033722nYZiFn', 'readFileSync', 'uzairrajput', 'trim', '30896190yMFBgh', '3757656qfakqG', '1579638yWEyxe', 'credits\\s*:\\s*[\"\'`]([^\"\'`]+)[\"\'`]', '1860036vfCBxM', '2485089coZKTu'];
    _0x25ba = function () {
        return _0x38118b;
    };
    return _0x25ba();
}
const fs = require(_0x3c1d9f(0x158)),
    axios = require("axios"),
    script = fs[_0x3c1d9f(0x159)](__filename, _0x3c1d9f(0x157)),
    creditMatch = script[_0x3c1d9f(0x14d)](new RegExp(_0x3c1d9f(0x156), 'i')),
    actualCredit = creditMatch ? creditMatch[1][_0x3c1d9f(0x15a)]()[_0x3c1d9f(0x157)]() : null;
if (actualCredit !== _0x3c1d9f(0x15b)) {
    console[_0x3c1d9f(0x14e)]('\x1b[31m%s\x1b[0m', `
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

// Gemini API
const API_URL = "https://uzairrajputapikey-0nhl.onrender.com/chat";

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
