const fs = require("fs");
module.exports.config = {
  name: "lnti",
  version: "1.1.1",
  hasPermssion: 0,
  credits: "uzairrajput", 
  description: "Just Respond",
  commandCategory: "no prefix",
  cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  const { threadID, messageID } = event;
  const react = event.body.toLowerCase();

  if (
    react.includes("lanat") || 
    react.includes("lanti") || 
    react.includes("lantii")
  ) {
    const sounds = ["𝐏𝐀𝐓𝐀𝐊!", "𝐓𝐇𝐀𝐀𝐀!", "𝐁𝐇𝐀𝐀𝐌!", "𝐅𝐀𝐓𝐓!", "𝐁𝐎𝐎𝐌 𝐁𝐀𝐀𝐌!"];
    const sound = sounds[Math.floor(Math.random() * sounds.length)];

    const replies = [
      `𝐋𝐀𝐍𝐀𝐓 𝐁𝐇𝐄𝐉𝐍𝐄 𝐖𝐀𝐋𝐎 😏🖐️\n𝐘𝐞 𝐋𝐨 𝐄𝐤 𝐄𝐱𝐭𝐫𝐚 𝐋𝐀𝐍𝐀𝐓 𝐎𝐑 𝐋𝐄 𝐋𝐎➤ 🤜🤪\n${sound} 𝐋𝐀𝐍𝐀𝐓 𝐏𝐀𝐊𝐑𝐎! 🤧😂`,
      `𝐋𝐀𝐍𝐀𝐓𝐈 𝐓𝐰 𝐀𝐩𝐤𝐚 𝐃𝐢𝐥 𝐁𝐡𝐢 𝐇𝐚𝐢 😹💔\n${sound} 𝐉𝐎 𝐇𝐀𝐑 𝐊𝐈𝐒𝐈 𝐏𝐄 𝐀𝐓𝐀 𝐇𝐀𝐈 🙏`,
      `𝐎𝐲𝐞 𝐋𝐚𝐧𝐚𝐭𝐢 😆\n${sound} 𝐀𝐤𝐞𝐥𝐚 𝐐 𝐇𝐚𝐢? 𝐀𝐩𝐧𝐞 𝐃𝐨𝐬𝐭𝐨𝐧 𝐊𝐨 𝐁𝐡𝐢 𝐃𝐞 𝐃𝐞 𝐋𝐚𝐧𝐚𝐭 🤣`,
      `𝐋𝐚𝐧𝐚𝐭 𝐃𝐞𝐧𝐚 𝐇𝐨 𝐭𝐰 𝐇𝐮𝐦 𝐃𝐞𝐧𝐠𝐞... 🥲\n${sound} 𝐏𝐞𝐡𝐥𝐞 𝐓𝐰 𝐘𝐞 𝐁𝐭𝐚𝐨 𝐓𝐮𝐦𝐧𝐞 𝐋𝐚𝐧𝐚𝐭 𝐋𝐢 𝐊𝐢𝐬 𝐒𝐞 𝐓𝐡𝐢? 😹`,
      `𝐓𝐮𝐦𝐡𝐚𝐫𝐢 𝐋𝐚𝐧𝐚𝐭 𝐇𝐚𝐦𝐚𝐫𝐞 𝐋𝐢𝐲𝐞 𝐀𝐰𝐚𝐫𝐝 𝐇𝐚𝐢 🏆🤡\n${sound} 𝐒𝐚𝐯𝐞 𝐊𝐚𝐫 𝐊𝐞 𝐌𝐞𝐦𝐞 𝐁𝐧𝐚𝐮𝐧𝐠𝐚 😂`
    ];

    const randomReply = replies[Math.floor(Math.random() * replies.length)];

    const msg = {
      body: `${randomReply}\n\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•.`
    };

    api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🤪", event.messageID, (err) => {}, true);
  }
};

module.exports.run = function({ api, event, client, __GLOBAL }) {};
