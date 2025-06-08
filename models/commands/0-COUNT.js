const fs = require("fs");
const path = require("path");

module.exports.config = {
name: "miss",
version: "3.0.1",
hasPermssion: 0,
credits: "uzairrajput",
description: "Auto-reply in Roman Urdu when someone says 'miss you'",
commandCategory: "no prefix",
cooldowns: 5,
};

module.exports.handleEvent = async ({ api, event, Users }) => {
const name = await Users.getNameUser(event.senderID);
const { threadID, messageID, body } = event;
const react = body?.toLowerCase();

if (
react.includes("miss") ||
react.includes("miss you") ||
react.includes("i miss you") ||
react.includes("miss u") ||
react.includes("yad you") ||
react.includes("i yad you")
) {
const replies = [
🌸 𝐎𝐲𝐞 𝐌𝐲 𝐋𝐢𝐟𝐞 ${name}, 𝐇𝐨 𝐫𝐚𝐡𝐚 𝐡𝐮 𝐦𝐞 𝐤𝐢𝐬 𝐭𝐚𝐫𝐡𝐚 𝐛𝐚𝐫𝐛𝐚𝐝... 𝐃𝐞𝐤𝐡𝐧𝐞 𝐰𝐚𝐥𝐞 𝐡𝐚𝐭𝐡 𝐦𝐚𝐥𝐭𝐞 𝐫𝐞𝐡 𝐣𝐚𝐲𝐞𝐧𝐠𝐞 🥺💞\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•,
🥹 𝐇𝐚𝐫 𝐦𝐞𝐫𝐢 𝐲𝐚𝐚𝐝 𝐭𝐮𝐦𝐡𝐞𝐢𝐧 𝐭𝐚𝐫𝐩𝐚𝐲𝐞𝐠𝐢..  ${name} 𝐌𝐞 𝐉𝐚𝐠𝐨𝐠𝐚 𝐧𝐢𝐧𝐝 𝐭𝐮𝐦𝐡𝐞𝐢𝐧 𝐧𝐚 𝐚𝐲𝐞𝐠𝐢 💔\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•,
😇 𝐉𝐚𝐛 𝐭𝐮𝐦 𝐘𝐚𝐝 𝐚𝐚𝐭𝐞 𝐡𝐨 𝐧𝐚, 𝐭𝐰 𝐝𝐢𝐥 𝐛𝐢𝐧𝐚 𝐰𝐚𝐣𝐚 𝐡𝐢 𝐮𝐝𝐚𝐬 𝐡𝐨 𝐣𝐚𝐭𝐚 𝐡𝐚𝐢... 𝐌𝐢𝐬𝐬 𝐲𝐨𝐮 ${name} 💭\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•,
🌹 𝐌𝐞 𝐭𝐮𝐦𝐡𝐞 𝐡𝐚𝐫 𝐩𝐚𝐥 𝐲𝐚𝐝 𝐤𝐚𝐫𝐭𝐚 𝐡𝐮... 𝐬𝐚𝐧𝐬𝐨𝐧 𝐦𝐞 𝐛𝐬 𝐭𝐮𝐦𝐡𝐚𝐫𝐢 𝐛𝐚𝐭𝐞𝐢𝐧 𝐛𝐚𝐬𝐢 𝐡𝐮𝐢 𝐡𝐚𝐢 ${name} 😘\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•,
🖤 𝐉𝐚𝐧𝐞 𝐐 𝐡𝐚𝐫 𝐰𝐚𝐪𝐭 𝐭𝐮𝐦𝐡𝐢 𝐲𝐚𝐝 𝐚𝐚𝐭𝐢 𝐡𝐨... 𝐌𝐞𝐫𝐞 𝐝𝐢𝐥 𝐤𝐨 𝐭𝐮𝐦𝐬𝐞 𝐚𝐤 𝐚𝐥𝐚𝐠 𝐬𝐚 𝐫𝐢𝐬𝐡𝐭𝐚 𝐡𝐨 𝐠𝐚𝐲𝐚 𝐡𝐚𝐢 ${name} 😢\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•,
✨ 𝐃𝐞𝐤𝐡𝐨 𝐧𝐚 ${name}, 𝐭𝐮𝐦𝐡𝐚𝐫𝐢 𝐘𝐚𝐚𝐝 𝐚𝐚𝐲𝐢 𝐭𝐰 𝐝𝐢𝐥 𝐧𝐞 𝐛𝐡𝐢 𝐛𝐨𝐥𝐚... "𝐌𝐞𝐫𝐚 𝐚𝐬𝐥𝐢 𝐒𝐮𝐤𝐨𝐨𝐧 𝐭𝐰 𝐮𝐬𝐢 𝐤𝐞 𝐬𝐚𝐭𝐡 𝐭𝐡𝐚!" 💫\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•
];

const randomMsg = replies[Math.floor(Math.random() * replies.length)];  

// GIFs from the same "uzair/" folder  
const gifFolder = path.join(__dirname, "uzair");  
const gifFiles = fs.readdirSync(gifFolder).filter(file => file.endsWith(".gif"));  

if (gifFiles.length === 0) {  
  return api.sendMessage(`😢 Koi GIF nahi mila uzair/ folder me.`, threadID, messageID);  
}  

const randomGif = path.join(gifFolder, gifFiles[Math.floor(Math.random() * gifFiles.length)]);  

api.sendMessage(  
  {  
    body: randomMsg,  
    attachment: fs.createReadStream(randomGif)  
  },  
  threadID,  
  messageID  
);  

api.setMessageReaction("🥺", messageID, () => {}, true);

}
};

module.exports.run = async () => {}; 
