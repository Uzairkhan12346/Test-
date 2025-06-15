const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const jimp = require("jimp");

module.exports.config = {
  name: "friends",
  version: "1.0.4",
  hasPermssion: 0,
  credits: "uzairrajput",
  description: "Create bestie frame with 3 names (no UID)",
  commandCategory: "noprefix",
  usages: "",
  cooldowns: 5,
};

module.exports.onLoad = () => {
  const dir = path.join(__dirname, "uzair", "mtx");
  const framePath = path.join(dir, "mtxfrnd.jpg");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(framePath)) {
    axios.get("https://i.ibb.co/bRJ04NvS/9a59babdfbfa6d19ef94ad52cbef75a4.jpg", { responseType: 'arraybuffer' })
      .then(res => fs.writeFileSync(framePath, Buffer.from(res.data)))
      .catch(err => console.log("❌ Frame download failed", err));
  }
};

async function makeImage({ uid1, uid2, uid3, name1, name2, name3 }) {
  const __root = path.join(__dirname, "uzair", "mtx");
  const frame = await jimp.read(path.join(__root, "mtxfrnd.jpg"));

  const getDP = async (id, file) => {
    const res = await axios.get(`https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' });
    fs.writeFileSync(file, Buffer.from(res.data));
  };

  const path1 = path.join(__root, `avt1.png`);
  const path2 = path.join(__root, `avt2.png`);
  const path3 = path.join(__root, `avt3.png`);

  await Promise.all([
    getDP(uid1, path1),
    getDP(uid2, path2),
    getDP(uid3, path3)
  ]);

  const circled = async (img) => (await jimp.read(img)).circle().getBufferAsync("image/png");

  const [avt1, avt2, avt3] = await Promise.all([
    jimp.read(await circled(path1)),
    jimp.read(await circled(path2)),
    jimp.read(await circled(path3)),
  ]);

  frame.composite(avt2.resize(142, 142), 28, 158);    // left
  frame.composite(avt1.resize(152, 152), 240, 28);    // center
  frame.composite(avt3.resize(142, 142), 478, 155);   // right

  const font = await jimp.loadFont(jimp.FONT_SANS_16_BLACK);
  frame.print(font, 50, 310, name2);  // left
  frame.print(font, 260, 190, name1); // center
  frame.print(font, 500, 310, name3); // right

  const outputPath = path.join(__root, `output_${Date.now()}.png`);
  await frame.writeAsync(outputPath);

  [path1, path2, path3].forEach(f => fs.unlinkSync(f));
  return outputPath;
}

module.exports.handleEvent = async ({ event, api }) => {
  const { body, mentions, threadID, messageID, senderID } = event;
  if (!body || !body.toLowerCase().includes("friend")) return;

  const mentionIDs = Object.keys(mentions);
  if (mentionIDs.length < 2) return;

  const [uid2, uid3] = mentionIDs;

  const fetchName = async id => {
    try {
      const res = await axios.get(`https://graph.facebook.com/${id}?fields=name&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);
      return res.data.name || "Unknown";
    } catch {
      return "Unknown";
    }
  };

  const [name1, name2, name3] = await Promise.all([
    fetchName(senderID),
    fetchName(uid2),
    fetchName(uid3)
  ]);

  const imagePath = await makeImage({
    uid1: senderID, uid2, uid3,
    name1, name2, name3
  });

  return api.sendMessage({
    body: `✨『 𝘽𝙀𝙎𝙏𝙄𝙀 𝙏𝙍𝙄𝙊 』✨\n\n👑 King/Queen: ${name1}\n👯‍♀️ Besties: ${name2} 💖 ${name3}\n\n💫 Dosti = Masti + Pyar + Trust 💫`,
    attachment: fs.createReadStream(imagePath)
  }, threadID, () => fs.unlinkSync(imagePath), messageID);
};

module.exports.run = () => {};
