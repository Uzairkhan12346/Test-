const fs = require("fs");
module.exports.config = {
  name: "p",
  version: "3.0.0",
  hasPermssion: 0,
  credits: "uzairrajput",
  description: "The Real Mafia Owner Info",
  commandCategory: "no prefix",
  cooldowns: 5,
};

module.exports.handleEvent = async ({ api, event, Users }) => {
  const name = await Users.getNameUser(event.senderID);
  const { threadID, messageID } = event;
  const react = event.body.toLowerCase();

  if (
    react.includes("p") ||
    react.includes("p") ||
    react.includes("p")
  ) {
    const msg = {
      body: `
╭━━━╮╱╱╱╭╮      🖤
┃╭━━╯╱╱╱┃┃          ✦
┃╰━━┳━━┳┫┃╭┳━━┳━┳━━╮
┃╭━━┫╭╮┣┫╰╯┫┃━┫╭┫┃━┫
┃╰━━┫╭╮┃┃╭╮┫┃━┫┃┃┃━┫
╰━━━┻╯╰┻┻╯╰┻━━┻╯╰━━╯

🔥 𝐌𝐀𝐅𝐈𝐀 𝐊𝐈𝐍𝐆 𝐈𝐍𝐅𝐎 🔥

╭───────────────╮
┃ 🧠 𝗡𝗔𝗠𝗘: 『𝐌𝐓𝐗』⚡ Kîrâñ Råjp👑öt
┃ 🕶 𝗔𝗧𝗧𝗜𝗧𝗨𝗗𝗘: Born to Rule, Built to Destroy 🖤
┃ 💢 𝗔𝗚𝗘: 20 — Still Untouchable
┃ 🌍 𝗙𝗥𝗢𝗠: Hyderabad, Sindh 🐍
┃ 🧩 𝗦𝗧𝗔𝗧𝗨𝗦: Single ❌ — Dangerous ✅
┃ 📚 𝗘𝗗𝗨𝗖𝗔𝗧𝗜𝗢𝗡: BTech in Code & Chaos
┃ 🕸️ 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞: fb.com/Mtxuzair
╰───────────────╯

❝ 𝙎𝙩𝙖𝙮 𝙇𝙤𝙬 𝘽𝙪𝙩 𝙃𝙖𝙣𝙙𝙡𝙚 𝙇𝙞𝙠𝙚 𝘼 𝙆𝙞𝙣𝙜 ❞
❝ 𝘽𝙚𝙝𝙖𝙫𝙞𝙤𝙪𝙧 𝙞𝙨 𝙁𝙧𝙚𝙚, 𝘽𝙪𝙩 𝙍𝙚𝙨𝙥𝙚𝙘𝙩 𝙄𝙨 𝙀𝙖𝙧𝙣𝙚𝙙. ❞

🥷 𝗗𝗢𝗡'𝗧 𝗙𝗢𝗥𝗚𝗘𝗧... 𝗜 𝗪𝗔𝗦 𝗕𝗢𝗥𝗡 𝗔𝗦 𝗧𝗛𝗘 𝗧𝗛𝗥𝗘𝗔𝗧.

🦅 𝗧𝗛𝗘 𝗥𝗘𝗔𝗟 𝗠𝗔𝗙𝗜𝗔 𝗜𝗦 𝗔𝗟𝗪𝗔𝗬𝗦 𝗨𝗡𝗧𝗢𝗨𝗖𝗛𝗔𝗕𝗟𝗘...

✦────────────✦`,
      attachment: fs.createReadStream(__dirname + `/uzair/Owner.gif`)
    };

    api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🖤", event.messageID, () => {}, true);
  }
};

module.exports.run = async () => {};
