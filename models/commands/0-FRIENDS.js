module.exports.config = {
  name: "friends",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "uzairrajput",
  description: "Make Bestie Frame with 3 DP",
  commandCategory: "png",
  usages: "[@mention1 @mention2]",
  cooldowns: 5,
  dependencies: { "axios": "", "fs-extra": "", "path": "", "jimp": "" }
};

module.exports.onLoad = async () => {
  const { resolve } = global.nodemodule["path"];
  const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
  const { downloadFile } = global.utils;
  const dir = __dirname + `/uzair/mtx/`;
  const pathImg = resolve(dir, 'mtxfrnd.jpg');
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  if (!existsSync(pathImg)) await downloadFile("https://i.ibb.co/bRJ04NvS/9a59babdfbfa6d19ef94ad52cbef75a4.jpg", pathImg); // Replace with your 3-DP frame
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

  // Download avatars
  const getAvt = async (uid, path) => {
    const res = await axios.get(`https://graph.facebook.com/${uid}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' });
    fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
  };
  await getAvt(one, avt1);
  await getAvt(two, avt2);
  await getAvt(three, avt3);

  // Circle avatars
  const circled = async (img) => (await jimp.read(img)).circle().getBufferAsync("image/png");
  const [circle1, circle2, circle3] = await Promise.all([
    jimp.read(await circled(avt1)),
    jimp.read(await circled(avt2)),
    jimp.read(await circled(avt3)),
  ]);

  // Resize and place on frame
  frame.composite(circle2.resize(149, 149), 30, 147);   // Left friend
  frame.composite(circle1.resize(152, 152), 240, 28);  // Center (you)
  frame.composite(circle3.resize(145, 145), 480, 147);  // Right friend

  // Save final image
  let buffer = await frame.getBufferAsync("image/png");
  fs.writeFileSync(finalPath, buffer);

  // Cleanup
  fs.unlinkSync(avt1); fs.unlinkSync(avt2); fs.unlinkSync(avt3);

  return finalPath;
}

module.exports.run = async function ({ event, api }) {
  const fs = global.nodemodule["fs-extra"];
  const { threadID, messageID, senderID } = event;
  const mentions = Object.keys(event.mentions);

  if (mentions.length < 2)
    return api.sendMessage("『 𝙅𝙖𝙖𝙣 𝙙𝙤 𝙁𝙧𝙞𝙚𝙣𝙙 𝙠𝙤 𝙏𝙖𝙜 𝙠𝙖𝙧𝙤 💞 𝙅𝙖𝙞𝙨𝙚: #𝙗𝙚𝙨𝙩𝙞𝙚3 @𝘼𝙧𝙤𝙤𝙗 @𝙎𝙚𝙝𝙖𝙧 』\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•", threadID, messageID);

  const [left, right] = mentions;
  return makeImage({ one: senderID, two: left, three: right }).then(path =>
    api.sendMessage({
      body: `✨ 𝘽𝙚𝙨𝙩𝙞𝙚 𝙏𝙧𝙞𝙤 𝙎𝙥𝙖𝙢 ✨\n\n👑 ${event.senderID} ❤️ ${event.mentions[left]} & ${event.mentions[right]}\nDosti level: OVERLOADED 💞\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•`,
      attachment: fs.createReadStream(path)
    }, threadID, () => fs.unlinkSync(path), messageID)
  );
};
