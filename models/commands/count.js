const fs = require("fs");
const https = require("https");
const path = require("path");
const crypto = require("crypto");

module.exports.config = {
  name: "count",
  version: "1.0.4",
  hasPermssion: 0,
  credits: "uzairrajput", // 🚫 Is line ko mat chhedna
  usePrefix: false,
  description: "Group ki cheezein ginain aur DP bhi dikhain 😎",
  commandCategory: "group",
  usages: "count message/admin/member/male/female/gei/allgroup/alluser",
  cooldowns: 5
};

module.exports.run = async function ({ api, Threads, Users, event, args }) {

  // 🔒 Ultra Credit Lock (Hashed)
  const expectedHash = "22a758a4fbc4f4cdb2096e07b8620ab16fd274b00b8ab1f1a7f79980de7a56bb"; // SHA-256 of 'uzairrajput'
  const actualHash = crypto.createHash("sha256").update(module.exports.config.credits).digest("hex");

  if (actualHash !== expectedHash) {
    console.clear();
    console.log(`
\x1b[41m\x1b[30m❌❌❌ WARNING! ❌❌❌\x1b[0m

\x1b[31m🤡 Oye Nakli Developer!
🧠 Tumse na ho payega! Credits chura kar coding ke king nahi ban jaate!

👎 "${module.exports.config.credits}" likhne se tu 'uzairrajput' nahi ban jaata.
💣 Tere jaise copy paster ki script abhi turant phatt jayegi!

🔒 REAL Developer: uzairrajput
🧨 CRASH in 3...2...1...

\x1b[0m`);
    process.exit(1);
  }

  // 🧮 Real Logic Below
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
      msg = `🤖✨ *Welcome To Uzair Bot Counting Zone!* ✨🤖
● ──────────────────── ●
Yeh wale tag likho or dekh kar hairan ho jao:
📩 message
👮‍♂️ admin
👥 member
👦 male
👧 female
🌈 gei
💬 allgroup
🙋‍♂️ alluser`;
      break;
    case "message":
      msg = `📨 Is Group Me *${threadInfo.messageCount}* messages hain!
Sab ne full chater-pater macha rakhi hai! 💬🔥`;
      break;
    case "admin":
      msg = `👑 Is Group Ke *${threadInfo.adminIDs.length}* admin hain!
King/Queen vibes aa rahi hain! 🫅💼`;
      break;
    case "member":
      msg = `👥 Total Members Hain: *${threadInfo.participantIDs.length}*
Baby ye tw poori baraat lag rahi hai! 🕺😂`;
      break;
    case "male":
      msg = `👦 Larkay Hain: *${male.length}*
Mama ke ladly sab yahan chill kar rahe hain! 🦁🔥`;
      break;
    case "female":
      msg = `👧 Larkiyan Hain: *${female.length}*
Papa ki pariyan uran bhar rahi hain! 👼✨`;
      break;
    case "gei":
      msg = `🌈 Secret gender wale: *${unknown.length}*
Full mystery chal rahi hai! 🕵️‍♂️`;
      break;
    case "allgroup":
      msg = `💬 Bot *${allGroups.length}* groups me active hai! 🔥🤖`;
      break;
    case "alluser":
      msg = `🙋 Total Bot Users: *${allUsers.length}*
Bot ki popularity dekh kar school topper bhi ro raha hai 😎📚`;
      break;
    default:
      msg = `❌ Baby galat tag likh diya!
Sahi likho: message/admin/member/male/female/gei/allgroup/alluser`;
  }

  if (threadInfo.imageSrc) {
    const cacheDir = path.join(__dirname, 'cache');
    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

    const imgPath = path.join(cacheDir, `${event.threadID}_dp.jpg`);
    const file = fs.createWriteStream(imgPath);

    https.get(threadInfo.imageSrc, response => {
      response.pipe(file);
      file.on("finish", () => {
        file.close(() => {
          const stream = fs.createReadStream(imgPath);
          send(msg, stream);
          setTimeout(() => fs.unlinkSync(imgPath), 60000);
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
