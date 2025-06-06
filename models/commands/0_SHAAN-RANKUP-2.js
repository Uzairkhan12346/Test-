module.exports.config = {
  name: "count",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "Modified by ChatGPT (Original: uzairrajput)",
  usePrefix: false,
  description: "Group ki cheezein ginain aur group ki DP bhi dikhain 😎",
  commandCategory: "group",
  usages: "count message/admin/member/male/female/gei/allgroup/alluser",
  cooldowns: 5,
  envConfig: {}
};

module.exports.run = async function({ api, Threads, Users, event, args }) {
  const input = args.join().toLowerCase().trim();
  const out = (msg, attachment) => {
    api.sendMessage({ body: msg, attachment }, event.threadID, event.messageID);
  };

  const threadInfo = await api.getThreadInfo(event.threadID);
  const gendernam = [], gendernu = [], nope = [];

  for (const u of threadInfo.userInfo) {
    switch (u.gender) {
      case "MALE": gendernam.push(u); break;
      case "FEMALE": gendernu.push(u); break;
      default: nope.push(u); break;
    }
  }

  const boxget = await Threads.getAll(['threadID']);
  const userget = await Users.getAll(['userID']);

  let message = "";
  switch (input) {
    case "":
      message = `🤖✨ *Welcome to Counting Zone!* ✨🤖\n\nYeh wale tag likho aur dekh kar hairan ho jao:\n📩 message\n👮‍♂️ admin\n👥 member\n👦 male\n👧 female\n🌈 gei\n💬 allgroup\n🙋‍♂️ alluser`;
      break;
    case "message":
      message = `📨 Is group me *${threadInfo.messageCount}* message hain!\nMatlab sab ne full chater-pater macha rakhi hai! 💬🔥`;
      break;
    case "admin":
      message = `👑 Is group ke *${threadInfo.adminIDs.length}* admin hain!\nBhai full king & queen waali feeling aa rahi hai! 🫅💼`;
      break;
    case "member":
      message = `👥 Total members: *${threadInfo.participantIDs.length}*\nBhai yeh to koi group nahi, *baarat* lag rahi hai! 😂🕺`;
      break;
    case "male":
      message = `👦 Larkay hain: *${gendernam.length}*\nMummy ke sher sab yahan chill kar rahe hain! 🦁🔥`;
      break;
    case "female":
      message = `👧 Larkiyan hain: *${gendernu.length}*\nPapa ki pariyan udan bhar rahi hain! 👼✨`;
      break;
    case "gei":
      message = `🌈 ${nope.length} log jin ka gender *top secret* hai!\nFull mystery scene chal raha hai 🔮😏`;
      break;
    case "allgroup":
      message = `💬 Bot abhi *${boxget.length}* groups me fire maar raha hai! 🔥🤖`;
      break;
    case "alluser":
      message = `🙋 Total users: *${userget.length}*\nBot ki popularity dekh kar school topper bhi ro raha hai 😎📚`;
      break;
    default:
      message = `❌ Bhai galat tag likh diya!\nSahi likho: message/admin/member/male/female/gei/allgroup/alluser`;
  }

  // Send group photo only if available
  if (threadInfo.imageSrc) {
    return out(message, threadInfo.imageSrc);
  } else {
    return out(message);
  }
};
