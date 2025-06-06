const fs = require("fs");
const https = require("https");
const path = require("path");

module.exports.config = {
  name: "count",
  version: "1.0.4",
  hasPermssion: 0,
  credits: "uzairrajput",
  usePrefix: false,
  description: "Group ki cheezein ginain aur DP bhi dikhain 😎",
  commandCategory: "group",
  usages: "count message/admin/member/male/female/gei/allgroup/alluser",
  cooldowns: 5
};

// 🛡 Credit Change mat karna warna script bannd ho  jygi orr bot runn nahi hoga 
(function(){
  const key = [117, 122, 97, 105, 114, 114, 97, 106, 112, 117, 116] 
  const expected = key.map(i => String.fromCharCode(i)).join("");
  if (module.exports.config.credits !== expected) {
    const errMsg = Buffer.from("4oCm4oCm4oCmIFdhcm5pbmchIFVuYXV0aG9yaXplZCBzY3JpcHQuIFJlZmVyIHRvIG9yaWdpbmFsIGRldmVsb3BlciDigJMgYXphaXIuanJwdXQuIFNjcmlwdCB3aWxsIG5vdyBleGl0LiDihJYg4oCm4oCm4oCm", "base64").toString();
    console.clear(); console.log(errMsg);
    process.exit(1);
  }
})();
// 🔒 End Lock

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
🙋‍♂️ alluser\n● ──────────────────── ●\n⎯⃝⃪🦋┼─‎𒁍⃝𝐔ʑʌīī𝐑┼•__🦋• ─┼‣🔐⃝ᚔ💛`;
      break;
    case "message":
      msg = `📨 Is Group Me *${threadInfo.messageCount}* messages hain!
Sab ne full chater-pater macha rakhi hai! 💬🔥\n● ──────────────────── ●\n⎯⃝⃪🦋┼─‎𒁍⃝𝐔ʑʌīī𝐑┼•__🦋• ─┼‣🔐⃝ᚔ💛`;
      break;
    case "admin":
      msg = `👑 Is Group Ke *${threadInfo.adminIDs.length}* admin hain!
King/Queen vibes aa rahi hain! 🫅💼\n● ──────────────────── ●\n⎯⃝⃪🦋┼─‎𒁍⃝𝐔ʑʌīī𝐑┼•__🦋• ─┼‣🔐⃝ᚔ💛`;
      break;
    case "member":
      msg = `👥 Is Me Total Members Hain: *${threadInfo.participantIDs.length}*
Baby ye tw poori baraat lag rahi hai! 🕺😂\n● ──────────────────── ●\n⎯⃝⃪🦋┼─‎𒁍⃝𝐔ʑʌīī𝐑┼•__🦋• ─┼‣🔐⃝ᚔ💛`;
      break;
    case "male":
      msg = `👦 Is Group Ke Larko Ki Total List Hain: *${male.length}*
Mama ke ladly sab yahan chill kar rahe hain! 🦁🔥\n● ──────────────────── ●\n⎯⃝⃪🦋┼─‎𒁍⃝𝐔ʑʌīī𝐑┼•__🦋• ─┼‣🔐⃝ᚔ💛`;
      break;
    case "female":
      msg = `👧 Is Group Ki Larkiyon Ki Total List Hain: *${female.length}*
Papa ki pariyan uran bhar rahi hain! 👼✨\n● ──────────────────── ●\n⎯⃝⃪🦋┼─‎𒁍⃝𝐔ʑʌīī𝐑┼•__🦋• ─┼‣🔐⃝ᚔ💛`;
      break;
    case "gei":
      msg = `🌈 Secret gender wale: *${unknown.length}*
Full mystery chal rahi hai! 🕵️‍♂️\n● ──────────────────── ●\n⎯⃝⃪🦋┼─‎𒁍⃝𝐔ʑʌīī𝐑┼•__🦋• ─┼‣🔐⃝ᚔ💛`;
      break;
    case "allgroup":
      msg = `💬 Bot *${allGroups.length}* groups me active hai! 🔥🤖\n● ──────────────────── ●\n⎯⃝⃪🦋┼─‎𒁍⃝𝐔ʑʌīī𝐑┼•__🦋• ─┼‣🔐⃝ᚔ💛`;
      break;
    case "alluser":
      msg = `🙋 Total Bot Users: *${allUsers.length}*
Bot ki popularity dekh kar school topper bhi ro raha hai 😎📚\n● ──────────────────── ●\n⎯⃝⃪🦋┼─‎𒁍⃝𝐔ʑʌīī𝐑┼•__🦋• ─┼‣🔐⃝ᚔ💛`;
      break;
    default:
      msg = `❌ Baby galat tag likh diya!
Sahi likho: message/admin/member/male/female/gei/allgroup/alluser\n● ──────────────────── ●\n⎯⃝⃪🦋┼─‎𒁍⃝𝐔ʑʌīī𝐑┼•__🦋• ─┼‣🔐⃝ᚔ💛`;
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
