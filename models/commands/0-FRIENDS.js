const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const jimp = require("jimp");

module.exports.config = {
name: "friends",
version: "1.0.1",
hasPermssion: 0,
credits: "uzairrajput", // 🚫 DO NOT CHANGE THIS
description: "Create bestie frame with 3 DP",
commandCategory: "image",
usages: "[@mention1 @mention2]",
cooldowns: 5,
dependencies: { "axios": "", "fs-extra": "", "path": "", "jimp": "" }
};

// 🚨 CREDITS LOCK CHECK
module.exports.onLoad = () => {
if (module.exports.config.credits !== "uzairrajput") {
console.log("⛔ Credit tampering detected. Script will now crash.");
process.exit(1); // 🧨 Crash if credit is changed
}

const dir = __dirname + /uzair/mtx/;
const framePath = path.resolve(dir, 'mtxfrnd.jpg');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
if (!fs.existsSync(framePath)) {
axios.get("https://i.ibb.co/bRJ04NvS/9a59babdfbfa6d19ef94ad52cbef75a4.jpg", { responseType: 'arraybuffer' })
.then(res => fs.writeFileSync(framePath, Buffer.from(res.data)))
.catch(err => console.log("❌ Frame download failed", err));
}
};

async function makeImage({ one, two, three }) {
const __root = path.resolve(__dirname, "uzair", "mtx");
let frame = await jimp.read(__root + "/mtxfrnd.jpg");

let finalPath = _root + /bestie${one}${two}${three}.png;
let avt1 = _root + /avt${one}.png;
let avt2 = _root + /avt${two}.png;
let avt3 = _root + /avt${three}.png;

const getAvt = async (uid, filepath) => {
const res = await axios.get(https://graph.facebook.com/${uid}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662, { responseType: 'arraybuffer' });
fs.writeFileSync(filepath, Buffer.from(res.data));
};

await getAvt(one, avt1);
await getAvt(two, avt2);
await getAvt(three, avt3);

const circled = async (img) => (await jimp.read(img)).circle().getBufferAsync("image/png");
const [circle1, circle2, circle3] = await Promise.all([
jimp.read(await circled(avt1)),
jimp.read(await circled(avt2)),
jimp.read(await circled(avt3)),
]);

frame.composite(circle2.resize(142, 142), 28, 158);
frame.composite(circle1.resize(152, 152), 240, 28);
frame.composite(circle3.resize(142, 142), 478, 155);

let buffer = await frame.getBufferAsync("image/png");
fs.writeFileSync(finalPath, buffer);

fs.unlinkSync(avt1); fs.unlinkSync(avt2); fs.unlinkSync(avt3);
return finalPath;
}

module.exports.run = async function ({ event, api }) {
const { threadID, messageID, senderID, mentions } = event;
const mentionIDs = Object.keys(mentions);

if (mentionIDs.length < 2)
return api.sendMessage("『 𝙅𝙖𝙖𝙣 𝙙𝙤 𝙁𝙧𝙞𝙚𝙣𝙙 𝙠𝙤 𝙏𝙖𝙜 𝙠𝙖𝙧𝙤 💞 𝙅𝙖𝙞𝙨𝙚: #𝙗𝙚𝙨𝙩𝙞𝙚3 @𝘼𝙧𝙤𝙤𝙗 @𝙎𝙚𝙝𝙖𝙧 』", threadID, messageID);

const [left, right] = mentionIDs;

let getName = async (id) => {
try {
const res = await axios.get(https://graph.facebook.com/${id}?fields=name&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662);
return res.data.name || id;
} catch {
return id;
}
};

const senderName = await getName(senderID);
const leftName = await getName(left);
const rightName = await getName(right);

return makeImage({ one: senderID, two: left, three: right }).then(path =>
api.sendMessage({
body: `✨『 𝘽𝙀𝙎𝙏𝙄𝙀 𝙏𝙍𝙄𝙊 』✨
\n● ──────────────────── ●\n
👑 𝙆𝙞𝙣𝙜/𝙌𝙪𝙚𝙚𝙣: ${senderName}
👯‍♀️ 𝘽𝙚𝙨𝙩𝙞𝙚𝙨: ${leftName} 💖 ${rightName}
\n● ──────────────────── ●\n
💫 𝘿𝙤𝙨𝙩𝙞 = 𝙈𝙖𝙨𝙩𝙞 + 𝙋𝙮𝙖𝙧 + 𝙏𝙧𝙪𝙨𝙩 💫
📸 𝙎𝙝𝙖𝙧𝙚 𝙩𝙝𝙞𝙨 𝙢𝙤𝙢𝙚𝙣𝙩!

\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•`,
attachment: fs.createReadStream(path)
}, threadID, () => fs.unlinkSync(path), messageID)
);
};
