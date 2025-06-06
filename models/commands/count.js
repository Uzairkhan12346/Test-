const fs = require("fs");
const https = require("https");
const path = require("path");

module.exports.config = {
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
      msg = `📨 Is Group Me *${threadInfo.messageCount}* messages hain!\nSab ne full chater-pater macha rakhi hai! 💬🔥`;
      break;
    case "admin":
      msg = `👑 Is Group Ke *${threadInfo.adminIDs.length}* admin hain!\nKing/Queen vibes aa rahi hain! 🫅💼`;
      break;
    case "member":
      msg = `👥 Total Members Hain: *${threadInfo.participantIDs.length}*\nBaby ye tw poori baraat lag rahi hai! 🕺😂`;
      break;
    case "male":
      msg = `👦 Larkay Hain: *${male.length}*\nMama ke ladly sab yahan chill kar rahe hain! 🦁🔥`;
      break;
    case "female":
      msg = `👧 Larkiyan Hain: *${female.length}*\nPapa ki pariyan uran bhar rahi hain! 👼✨`;
      break;
    case "gei":
      msg = `🌈 Secret gender wale: *${unknown.length}*\nFull mystery chal rahi hai! 🕵️‍♂️`;
      break;
    case "allgroup":
      msg = `💬 Bot *${allGroups.length}* groups me active hai! 🔥🤖`;
      break;
    case "alluser":
      msg = `🙋 Total Bot Users: *${allUsers.length}*\nBot ki popularity dekh kar school topper bhi ro raha hai 😎📚`;
      break;
    default:
      msg = `❌ Baby galat tag likh diya!\nSahi likho: message/admin/member/male/female/gei/allgroup/alluser`;
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
