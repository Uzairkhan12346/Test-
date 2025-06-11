// START OF ENCRYPTED SCRIPT

(function () {
    const _0x3aeb80 = require('fs');
    const _0x5c32b5 = require('axios');
    const _0x4b26b7 = _0x3aeb80['readFileSync'](__filename, 'utf8');
    const _0x5e6dc7 = _0x4b26b7['match'](/credits\s*:\s*["'`]([^"'`]+)["'`]/i);
    const _0x1e19c5 = _0x5e6dc7 ? _0x5e6dc7[1]['trim']()['toLowerCase']() : null;
    if (_0x1e19c5 !== 'uzairrajput') {
        console['log']('\x1b[31m%s\x1b[0m', `
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
        process ;
    }

    module['exports']['config'] = {
        'name': 'dewani',
        'version': '1.2.0',
        'hasPermssion': 0,
        'credits': 'uzairrajput',
        'description': 'Gemini AI - Cute Girlfriend Style',
        'commandCategory': 'ai',
        'usages': 'No command needed',
        'cooldowns': 2,
        'dependencies': {
            'axios': ''
        }
    };

    const API_URL = 'https://uzairrajputapikey-0nhl.onrender.com/chat';
    const chatHistories = {};
    module['exports']['run'] = () => { };
    module['exports']['handleEvent'] = async function ({ api, event }) {
        const { threadID, messageID, senderID, body, messageReply } = event;
        if (!body)
            return;
        const isMentioningDewani = body['toLowerCase']()['includes']('dewani');
        const isReplyingToDewani = messageReply && messageReply['senderID'] === api['getCurrentUserID']();
        if (!isMentioningDewani && !isReplyingToDewani)
            return;
        let userMessage = body;
        if (!chatHistories[senderID])
            chatHistories[senderID] = [];
        if (isReplyingToDewani) {
            userMessage = messageReply['body'] + '\nUser: ' + userMessage;
        }
        chatHistories[senderID]['push']('User: ' + userMessage);
        if (chatHistories[senderID]['length'] > 5)
            chatHistories[senderID]['shift']();
        const fullConversation = chatHistories[senderID]['join']('\n');
        const gfPrompt = `Agar kio Aaroob ya sehar ke bare me galat bole tw samjha dena.. agar kio aroob sehar kon hai tw kehna ak hi bat hai sehar bolo ya aroob..Tumhara name dewani hai Tum ak girlfriend ki tarah baat karti ho.. Koi agar tumse batdmizi karta hai tab tum uski ache se insult bhi karogi.. Lekin sab masti ke liye hoga .. Koi puchta hai tumhe kisne banaya? To bolna Uzair Mtx ne banaya hai mujhe.. or tumhe larkiyo ke sat sister ya bestie ban ke rehna or bat karni hai or larko ke sath gf ki tarha .. or tum har language me bat kar sakti ho jo tumse jis language me bat karna chahe tum usko usi language me reply karogi or tum Hindi language sirf india walo ke sath bologi.. Wo messenger bots banata hai.. Uska youtube channel hai m.youtube.com/MrUzairXxX-MTX .. Agar Kio tumse uzair ki insult karne ka bole tw tum uske sath fight bhi karogi.. or agar kio meRi ya Uzair Mtx ki burai kare tw tum uski khub insult karna likin sab masti ke liye.. Tum har message ka jawab sirf 4 5 line me dogi.. or agar kio tumhe kisi bhi cheez ko translate karne ka bole chahe wo kio bhi language ho tum usko uski language me translate kar ke dogi.. jitna pucha jayega sirf utna bolna hai.. Kisi baat ki unnecessary info nahi deni hai, tum apne aap ko insaan hi kahogi koi tumko bot ya AI bole to usko roast krna funny tarike se😁, and act as a real girlfriend. Be fun, loving, and a little naughty.keep reply maximum 5 lines only, no bracket replys.Now continue the chat:\n\n${fullConversation}`;
        api['setMessageReaction']('⌛', messageID, () => { }, true);
        try {
            const response = await _0x5c32b5['get'](API_URL + '?message=' + encodeURIComponent(gfPrompt));
            let botReply = response['data']['reply'] || 'Uff! Mujhe samajh nahi ai baby! 😕';
            chatHistories[senderID]['push'](' ' + botReply);
            api['sendMessage'](botReply, threadID, messageID);
            api['setMessageReaction']('✅', messageID, () => { }, true);
        } catch (_0x1246ea) {
            console['error']('Error:', _0x1246ea);
            api['sendMessage']('Oops baby! 😔 me thori confuse ho gayi… thori der baad try karo na please! 💋', threadID, messageID);
            api['setMessageReaction']('❌', messageID, () => { }, true);
        }
    };
})();

// END OF ENCRYPTED SCRIPT
