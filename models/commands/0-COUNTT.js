const fs = require("fs");

module.exports.config = {
  name: "oer",
  version: "3.3.4",
  hasPermssion: 0,
  credits: "uzairrajput",
  description: "Unique style owner response",
  commandCategory: "no prefix",
  cooldowns: 5,
};

function formatUptime(seconds) {
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${d}d ${h}h ${m}m ${s}s`;
}

const respondedMsgIDs = new Set();

module.exports.handleEvent = async ({ api, event, Users }) => {
  const { threadID, messageID, body, senderID } = event;
  if (!body) return;

  const react = body.toLowerCase();
  if (
    (react.includes("er") || react.includes("mak") || react.includes("or")) &&
    !respondedMsgIDs.has(messageID)
  ) {
    respondedMsgIDs.add(messageID);

    const name = await Users.getNameUser(senderID);
    const uptime = formatUptime(process.uptime());

    const now = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const dateStr = now.toLocaleDateString("en-PK", options);
    const timeStr = now.toLocaleTimeString("en-PK");

    const poeticUptimeLines = [
      `⏳ 𝐁𝐨𝐭 𝐥𝐢𝐯𝐞 𝐡𝐚𝐢: ${uptime}`,
      `🌙 𝐊𝐚𝐚𝐟𝐢 𝐝𝐞𝐫 𝐬𝐞 𝐜𝐡𝐮𝐩 𝐡𝐮, 𝐩𝐚𝐫 𝐜𝐡𝐚𝐥 𝐫𝐚𝐡𝐚 𝐡𝐮 ${uptime}`,
      `🛡 𝐔𝐧𝐭𝐚𝐚𝐫𝐚 𝐧𝐚𝐡𝐢 𝐣𝐚𝐚𝐫𝐚, 𝐜𝐡𝐚𝐥 𝐫𝐚𝐡𝐚 𝐡𝐮 ${uptime}`,
      `🎯 𝐒𝐢𝐬𝐭𝐞𝐦 𝐬𝐭𝐚𝐫𝐭 𝐡𝐮𝐚 𝐭𝐚𝐛 𝐬𝐞: ${uptime}`,
      `💡 𝐉𝐚𝐛 𝐬𝐞 𝐭𝐮𝐦 𝐬𝐨𝐲𝐞 𝐭𝐡𝐞, 𝐦𝐞𝐢𝐧 𝐜𝐨𝐝𝐞 𝐜𝐡𝐚𝐥𝐚 𝐫𝐚𝐡𝐚 𝐭𝐡𝐚 — ${uptime}`,
    ];

    const randomLine = poeticUptimeLines[Math.floor(Math.random() * poeticUptimeLines.length)];

    const msg = {
      body: `╭─────────────╮
│ 🌸 𝙊𝙒𝙉𝙀𝙍 𝙄𝙉𝙁𝙊 🌸│
╰─────────────╯

● ──────────────────── ●
👨‍💻 𝐍𝐚𝐦𝐞: 𝑴𝑻𝑿 💚 𝐊𝐢𝐫𝐚𝐧 𝐑𝐚𝐣𝐩𝐨𝐨𝐭
🖤 𝐓𝐢𝐭𝐥𝐞: 𝘿𝘼𝙍𝙆 𝙈𝘼𝙁𝙄𝘼 𝙃𝘼𝘾𝙆𝙀𝙍
🏴‍☠️ 𝐌𝐨𝐝𝐞: 𝗔𝗹𝗽𝗵𝗮 𝗘𝗻𝗲𝗿𝗴𝘆 ⚡
🌍 𝐅𝐫𝐨𝐦: 𝗛𝘆𝗱𝗲𝗿𝗮𝗯𝗮𝗱 - 𝗦𝗶𝗻𝗱𝗵 🇵🇰
🧠 𝐄𝐝𝐮𝐜𝐚𝐭𝐢𝐨𝐧: 𝐁.𝐓𝐞𝐜𝐡 𝐈𝐍 𝐂𝐎𝐃𝐈𝐍𝐆 & 𝐇𝐀𝐂𝐊𝐈𝐍𝐆
📱 𝐂𝐨𝐧𝐧𝐞𝐜𝐭: facebook.com/Mtxuzair
━━━━━━━━━━━━━━━━━━
🔥 𝐁𝐔𝐓 𝐑𝐄𝐌𝐄𝐌𝐁𝐄𝐑 𝐓𝐇𝐈𝐒 🔥
『𝐈 𝐝𝐨𝐧'𝐭 𝐭𝐚𝐥𝐤 𝐦𝐮𝐜𝐡, 𝐁𝐮𝐭 𝐈 𝐨𝐰𝐧 𝐞𝐯𝐞𝐫𝐲 𝐬𝐢𝐥𝐞𝐧𝐜𝐞.』
🎩 𝐋𝐞𝐠𝐞𝐧𝐝𝐬 𝐝𝐨𝐧'𝐭 𝐛𝐫𝐚𝐠, 𝐓𝐡𝐞𝐲 𝐥𝐞𝐭 𝐭𝐡𝐞𝐢𝐫 𝐰𝐨𝐫𝐤 𝐬𝐩𝐞𝐚𝐤. 💼

🕰 𝐁𝐨𝐭 𝐔𝐩𝐭𝐢𝐦𝐞 𝐑𝐞𝐩𝐨𝐫𝐭:
${randomLine}

📆 𝐃𝐚𝐭𝐞: ${dateStr}
⏰ 𝐓𝐢𝐦𝐞: ${timeStr}

🦋 『${name}, 𝐈 𝐀𝐦 𝐖𝐚𝐭𝐜𝐡𝐢𝐧𝐠...』
● ──────────────────── ●
𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•.`,
      attachment: fs.createReadStream(__dirname + `/uzair/Owner.gif`)
    };

    api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("👑", messageID, () => {}, true);
  }
};

module.exports.run = async () => {};
