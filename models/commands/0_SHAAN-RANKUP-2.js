const fs = require("fs");
const https = require("https");
const path = require("path");
const crypto = require("crypto");

const config = {
  name: "count",
  version: "1.0.3",
  hasPermssion: 0,
  credits: "uzairrajput",
  usePrefix: false,
  description: "Group ki cheezein ginain aur DP bhi dikhain 😎",
  commandCategory: "group",
  usages: "count message/admin/member/male/female/gei/allgroup/alluser",
  cooldowns: 5
};

const expectedHash = "a17d7f46b3aa91b78ef1829fda164a0f265aa8412fcba10c86592c1dc0bc0d7c";
const actualHash = crypto.createHash("sha256").update(config.credits).digest("hex");

if (actualHash !== expectedHash) {
  console.log("\x1b[41m\x1b[30m❌ ERROR: Credit Tampering Detected!\x1b[0m");
  console.log("\x1b[33m🚫 Script banai Uzair Rajput Mtx ne!");
  console.log("👎 Tum developer banne ki fake try maar rahe ho!");
  console.log("🛑 Bot ab turant band ho raha hai...\x1b[0m");
  module.exports = {}; // prevent bot from loading
  return;
}

module.exports.config = config;

module.exports.run = async function ({ api, Threads, Users, event, args }) {
  const input = args.join().toLowerCase().trim();
  const send = (msg, attachment = null) => {
    api.sendMessage({ body: msg, attachment }, event.threadID, event.messageID);
  };

  const threadInfo = await api.getThreadInfo(event.threadID);
  const male = [], female = [], unknown = [];

  for (let u of threadInfo.userInfo) {
    if (u.gender === "MALE") male.push(u);
    else if (u.gender === "FEMALE") female.push(u);
    else unknown.push(u);
  }

  let allGroups = [], allUsers = [];
  try {
    allGroups = await Threads.getAll(['threadID']) || [];
    allUsers = await Users.getAll(['userID']) || [];
  } catch (e) {}

  let msg = "";
  switch (input) {
    case "":
      msg = `🤖✨ *Welcome To Uzair Bot Counting Zone!* ✨🤖\n● ──────────────────── ●\nYeh wale tag likho or dekh kar hairan ho jao:\n📩 message\n👮‍♂️ admin\n👥 member\n👦 male\n👧 female\n🌈 gei\n💬 allgroup\n🙋‍♂️ alluser`;
      break;
    case "message":
      msg = `📨 Is Group Me *${threadInfo.messageCount}* messages hain!`;
      break;
    case "admin":
      msg = `👑 Is Group Ke *${threadInfo.adminIDs.length}* admin hain!`;
      break;
    case "member":
      msg = `👥 Total Members Hain: *${threadInfo.participantIDs.length}*`;
      break;
    case "male":
      msg = `👦 Larkay Hain: *${male.length}*`;
      break;
    case "female":
      msg = `👧 Larkiyan Hain: *${female.length}*`;
      break;
    case "gei":
      msg = `🌈 Secret gender wale: *${unknown.length}*`;
      break;
    case "allgroup":
      msg = `💬 Bot *${allGroups.length}* groups me active hai!`;
      break;
    case "alluser":
      msg = `🙋 Total Bot Users: *${allUsers.length}*`;
      break;
    default:
      msg = `❌ Baby galat tag likh diya!\nSahi likho: message/admin/member/male/female/gei/allgroup/alluser`;
  }

  if (threadInfo.imageSrc) {
    const imgPath = path.join(__dirname, 'cache', `${event.threadID}_dp.jpg`);
    const file = fs.createWriteStream(imgPath);

    https.get(threadInfo.imageSrc, response => {
      response.pipe(file);
      file.on("finish", () => {
        file.close(() => {
          const stream = fs.createReadStream(imgPath);
          send(msg, stream);
          setTimeout(() => fs.unlinkSync(imgPath), 60 * 1000);
        });
      });
    }).on("error", err => {
      console.log("Image download failed:", err.message);
      send(msg);
    });
  } else {
    send(msg);
  }
};
