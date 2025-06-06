const fs = require("fs");
const https = require("https");
const path = require("path");

// CREDIT LOCK START 🔒
const realCredit = "Uzair Rajput Mtx";
if (module.exports?.config?.credits !== realCredit) {
  console.log("\x1b[41m\x1b[30m[CRITICAL ERROR]\x1b[0m ❌ Credit tampered in 'count.js'");
  console.log("\x1b[31m🚫 Please do not change the credits. Respect Uzair Rajput Mtx!\x1b[0m");
  process.exit(1); // Bot will crash if credit is changed
}
// CREDIT LOCK END 🔒

module.exports.config = {
  name: "count",
  version: "1.0.3",
  hasPermssion: 0,
  credits: realCredit,
  usePrefix: false,
  description: "Group ki cheezein ginain aur DP bhi dikhain 😎",
  commandCategory: "group",
  usages: "count message/admin/member/male/female/gei/allgroup/alluser",
  cooldowns: 5
};

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
  const tag = "⎯⃝⃪🦋┼─‎𒁍⃝𝐔ʑʌīī𝐑┼•__🦋• ─┼‣🔐⃝ᚔ💛";

  switch (input) {
    case "":
      msg = `🤖✨ *Welcome To Uzair Bot Counting Zone!* ✨🤖\n● ──────────────────── ●\nYeh wale tag likho or dekh kar hairan ho jao:\n📩 message\n👮‍♂️ admin\n👥 member\n👦 male\n👧 female\n🌈 gei\n💬 allgroup\n🙋‍♂️ alluser`;
      break;
    case "message":
      msg = `📨 Is group me *${threadInfo.messageCount}* messages hain!\nSab ne full chater-pater macha rakhi hai! 💬🔥\n● ──────────────────── ●\n${tag}`;
      break;
    case "admin":
      msg = `👑 Group ke *${threadInfo.adminIDs.length}* admin hain!\nKing/Queen vibes aa rahi hain! 🫅💼\n● ──────────────────── ●\n${tag}`;
      break;
    case "member":
      msg = `👥 Total group members list: *${threadInfo.participantIDs.length}*\nBaby ye tw poori baraat lag rahi hai! 🕺😂\n● ──────────────────── ●\n${tag}`;
      break;
    case "male":
      msg = `Is Group Ke 👦 Larkay Hai: *${male.length}*\nMama ke ladly sab yahan chill kar rahe hain! 🦁🔥\n● ──────────────────── ●\n${tag}`;
      break;
    case "female":
      msg = `Is Group ki 👧 Larkiyan Hai: *${female.length}*\nPapa ki pariyan uran bhar rahi hain! 👼✨\n● ──────────────────── ●\n${tag}`;
      break;
    case "gei":
      msg = `🌈 Secret gender wale: *${unknown.length}*\nFull mystery chal rahi hai! 🕵️‍♂️\n● ──────────────────── ●\n${tag}`;
      break;
    case "allgroup":
      msg = `💬 Bot *${allGroups.length}* groups me active hai! 🔥🤖\n● ──────────────────── ●\n${tag}`;
      break;
    case "alluser":
      msg = `🙋 Total users ki list: *${allUsers.length}*\nBot ki popularity dekh kar school topper bhi ro raha hai 😎📚\n● ──────────────────── ●\n${tag}`;
      break;
    default:
      msg = `❌ Baby galat tag likh diya!\nSahi likho: message/admin/member/male/female/gei/allgroup/alluser`;
  }

  // 📸 DP download aur send
  if (threadInfo.imageSrc) {
    const imgPath = path.join(__dirname, 'cache', `${event.threadID}_dp.jpg`);

    const file = fs.createWriteStream(imgPath);
    https.get(threadInfo.imageSrc, response => {
      response.pipe(file);
      file.on("finish", () => {
        file.close(() => {
          const stream = fs.createReadStream(imgPath);
          send(msg, stream);
          setTimeout(() => fs.unlinkSync(imgPath), 60 * 1000); // Clean up
        });
      });
    }).on("error", err => {
      console.log("Image download failed:", err.message);
      send(msg); // fallback
    });
  } else {
    send(msg);
  }
};
