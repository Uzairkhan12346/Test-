const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const jimp = require("jimp");

module.exports.config = {
  name: "bestie3",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "uzairrajput",
  description: "Create bestie frame with 3 DP (no prefix)",
  commandCategory: "image",
  usages: "[mention 2 friends]",
  cooldowns: 5
};

module.exports.onLoad = () => {
  const dir = __dirname + "/uzair/mtx/";
  const framePath = path.resolve(dir, "mtxfrnd.jpg");
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

  let finalPath = `${__root}/bestie_${one}_${two}_${three}.png`;
  let avt1 = `${__root}/avt_${one}.png`;
  let avt2 = `${__root}/avt_${two}.png`;
  let avt3 = `${__root}/avt_${three}.png`;

  const getAvt = async (uid, filepath) => {
    const res = await axios.get(`https://graph.facebook.com/${uid}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' });
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
    return api.sendMessage("『 Tag 2 best friends jaise: @Aroob @Sehar 』", threadID, messageID);

  const [left, right] = mentionIDs;

  let getName = async (id) => {
    try {
      const res = await axios.get(`https://graph.facebook.com/${id}?fields=name&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);
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
      body: `👑 King/Queen: ${senderName}
👯‍♀️ Besties: ${leftName} 💖 ${rightName}

⭐ Dosti = Masti + Pyar + Trust ⭐
📸 Share this moment!
✘𓆩 MADE BY Uʑʌī𝐑 ┼•__🦋•`,
      attachment: fs.createReadStream(path)
    }, threadID, () => fs.unlinkSync(path), messageID)
  );
};
