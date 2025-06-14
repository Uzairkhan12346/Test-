module.exports.config = {
  name: "friends",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "uzairrajput",
  description: "Make Bestie Frame with 3 DP",
  commandCategory: "png",
  usages: "[@mention1 @mention2]",
  cooldowns: 5,
  dependencies: { "axios": "", "fs-extra": "", "path": "", "jimp": "" },
  usePrefix: false // 🚫 No prefix required
};

module.exports.onLoad = async () => {
  const { resolve } = global.nodemodule["path"];
  const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
  const { downloadFile } = global.utils;
  const dir = __dirname + `/uzair/mtx/`;
  const pathImg = resolve(dir, 'mtxfrnd.jpg');
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  if (!existsSync(pathImg)) await downloadFile("https://i.ibb.co/bRJ04NvS/9a59babdfbfa6d19ef94ad52cbef75a4.jpg", pathImg);
};

async function makeImage({ one, two, three }) {
  const fs = global.nodemodule["fs-extra"];
  const path = global.nodemodule["path"];
  const axios = global.nodemodule["axios"];
  const jimp = global.nodemodule["jimp"];
  const __root = path.resolve(__dirname, "uzair", "mtx");

  let frame = await jimp.read(__root + "/mtxfrnd.jpg");
  let finalPath = __root + `/bestie_${one}_${two}_${three}.png`;
  let avt1 = __root + `/avt_${one}.png`;
  let avt2 = __root + `/avt_${two}.png`;
  let avt3 = __root + `/avt_${three}.png`;

  const getAvt = async (uid, path) => {
    const res = await axios.get(`https://graph.facebook.com/${uid}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' });
    fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
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

// 👇 Handle NoPrefix command
module.exports.handleEvent = async function ({ event, api }) {
  const fs = global.nodemodule["fs-extra"];
  const { threadID, messageID, senderID } = event;

  if (!event.body) return;
  const msg = event.body.toLowerCase();

  if (msg.includes("bestie3") || msg.includes("3 bestie") || msg.includes("bestfriend trio")) {
    const mentions = Object.keys(event.mentions || {});
    if (mentions.length < 2)
      return api.sendMessage("『 𝙅𝙖𝙖𝙣 𝙙𝙤 𝙁𝙧𝙞𝙚𝙣𝙙 𝙠𝙤 𝙏𝙖𝙜 𝙠𝙖𝙧𝙤 💞 𝙅𝙖𝙞𝙨𝙚: bestie3 @Aroob @Sehar 』\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•", threadID, messageID);

    const [left, right] = mentions;
    const path = await makeImage({ one: senderID, two: left, three: right });

    return api.sendMessage({
      body: `✨ 𝘽𝙚𝙨𝙩𝙞𝙚 𝙏𝙧𝙞𝙤 𝙎𝙥𝙖𝙢 ✨\n\n👑 ${event.senderID} ❤️ ${event.mentions[left]} & ${event.mentions[right]}\nDosti level: OVERLOADED 💞\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•`,
      attachment: fs.createReadStream(path)
    }, threadID, () => fs.unlinkSync(path), messageID);
  }
};

module.exports.run = () => {}; // No need to use run if using noPrefix
