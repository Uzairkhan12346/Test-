module.exports.config = {
  name: "profile",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "uzairrajput", //❌ Don't change this credit. Respect developer.
  description: "THIS BOT IS MADE BY UZAIR RAJPUT MTX. DON'T CHANGE MY CREDIT.",
  commandCategory: "PROFILE DP",
  cooldowns: 0
};

module.exports.run = async function({ event, api, args, Users }) {
  const fs = global.nodemodule["fs-extra"];
  const request = global.nodemodule["request"];
  const axios = global.nodemodule["axios"];

  // 🔒 Credit lock check
  const credit = this.config.credits.toLowerCase();
  if (credit !== "uzairrajput") {
    return api.sendMessage("⚠️ Credit change mat karo bhai... Respect the creator: Uzair Rajput 💖", event.threadID, event.messageID);
  }

  // ✨ If message is a reply
  if (event.type === "message_reply") {
    const name = await Users.getNameUser(event.messageReply.senderID);
    const uid = event.messageReply.senderID;

    const callback = () =>
      api.sendMessage({
        body: `📥 𝐃𝐏 𝐫𝐞𝐩𝐥𝐲 𝐬𝐞 𝐮𝐭𝐡𝐚𝐥𝐢 𝐠𝐲𝐢 𝐛𝐡𝐚𝐢 😜\n🌸 𝐘𝐞 𝐫𝐚𝐡𝐢 𝐭𝐮𝐦𝐡𝐚𝐫𝐢 𝐒𝐭𝐲𝐥𝐢𝐬𝐡 𝐏𝐫𝐨𝐟𝐢𝐥𝐞 𝐏𝐢𝐜 💞\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•.`,
        attachment: fs.createReadStream(__dirname + "/cache/1.png")
      }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);

    return request(encodeURI(`https://graph.facebook.com/${uid}/picture?height=1500&width=1500&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662`))
      .pipe(fs.createWriteStream(__dirname + "/cache/1.png"))
      .on("close", () => callback());
  }

  // ✨ If no args (self)
  if (!args[0]) {
    const uid = event.senderID;
    const res = await axios.get(`https://www.nguyenmanh.name.vn/api/fbInfo?id=${uid}&apikey=LV7LWgAp`);
    const name = res.data.result.name;

    const callback = () =>
      api.sendMessage({
        body: `👑 𝐋𝐨 𝐛𝐡𝐚𝐢 ${name}, 𝐭𝐞𝐫𝐢 𝐚𝐬𝐥𝐢 𝐃𝐏 𝐚𝐚𝐠𝐲𝐢 📸\n💫 𝐁𝐢𝐧𝐚 𝐅𝐢𝐥𝐭𝐞𝐫 𝐤𝐞 𝐛𝐡𝐢 𝐭𝐮 𝐡𝐢𝐭 𝐥𝐚𝐠 𝐫𝐚𝐡𝐚 💖\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•.`,
        attachment: fs.createReadStream(__dirname + "/cache/1.png")
      }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);

    return request(encodeURI(`https://graph.facebook.com/${uid}/picture?height=1500&width=1500&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662`))
      .pipe(fs.createWriteStream(__dirname + "/cache/1.png"))
      .on("close", () => callback());
  }

  // ✨ If args contains FB profile link
  if (args[0].includes(".com/")) {
    const res_ID = await api.getUID(args[0]);
    const data = await api.getUserInfoV2(res_ID);
    const name = data.name;

    const callback = () =>
      api.sendMessage({
        body: `🔍 𝐋𝐢𝐧𝐤 𝐜𝐡𝐞𝐜𝐤 𝐤𝐚𝐫𝐤𝐞 𝐃𝐏 𝐮𝐭𝐡𝐚 𝐥𝐢 𝐠𝐲𝐢 😎\n🔥 𝐘𝐞 𝐫𝐚𝐡𝐢 ${name} 𝐤𝐢 𝐅𝐁 𝐏𝐫𝐨𝐟𝐢𝐥𝐞 𝐏𝐢𝐜 📲\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•.`,
        attachment: fs.createReadStream(__dirname + "/cache/1.png")
      }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);

    return request(encodeURI(`https://graph.facebook.com/${res_ID}/picture?height=1500&width=1500&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662`))
      .pipe(fs.createWriteStream(__dirname + "/cache/1.png"))
      .on("close", () => callback());
  }

  // ✨ If user mentions someone
  if (args.join().includes('@')) {
    const uid = Object.keys(event.mentions)[0];

    const callback = () =>
      api.sendMessage({
        body: `🎯 𝐋𝐨 𝐛𝐡𝐚𝐢, 𝐣𝐢𝐬𝐞 𝐦𝐞𝐧𝐭𝐢𝐨𝐧 𝐤𝐢𝐲𝐚 𝐭𝐡𝐚 𝐮𝐬𝐤𝐢 𝐃𝐏 𝐥𝐞 𝐥𝐨 😎\n💖 𝐌𝐓𝐗 𝐁𝐨𝐭 𝐒𝐭𝐲𝐥𝐞 𝐦𝐞𝐢𝐧 𝐝𝐢𝐥 𝐣𝐢𝐭 𝐫𝐚𝐡𝐚 💚\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•.`,
        attachment: fs.createReadStream(__dirname + "/cache/1.png")
      }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);

    return request(encodeURI(`https://graph.facebook.com/${uid}/picture?height=1500&width=1500&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662`))
      .pipe(fs.createWriteStream(__dirname + "/cache/1.png"))
      .on("close", () => callback());
  }
};
