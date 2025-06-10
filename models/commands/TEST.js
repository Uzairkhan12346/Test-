const axios = require("axios");

module.exports = {
  config: {
    name: "hercai",
    version: "1.0",
    author: "Uzair Rajput Mtx",
    countDown: 5,
    role: 0,
    shortDescription: "Romantic Girlfriend AI",
    longDescription: "Romantic, naughty and caring AI using Hercai",
    category: "ai",
    guide: {
      en: "{pn} <your message>"
    }
  },

  onStart: async function ({ api, event, args }) {
    const hercaiAPI = "https://uzairrajput-ytdl-api-master.onrender.com/api/hercai?q=";
    const input = args.join(" ");
    const { senderID, threadID, messageID } = event;

    // OWNER UID(s)
    const ownerUIDs = ["61552682190483"];

    // Check for empty input
    if (!input) {
      return api.sendMessage("Kya kehna chahte ho mujhe? 💬", threadID, messageID);
    }

    // Abuse filter
    const abusiveWords = ["chut", "bhosdi", "lund", "madarchod", "mc", "bc", "randi"];
    if (abusiveWords.some(w => input.toLowerCase().includes(w))) {
      const reply = ownerUIDs.includes(senderID)
        ? "Aap toh mere Malik ho... mazak bhi cute lagta hai 😚"
        : "Ek tamacha lagaaungi na, AI bhool jaoge! 😠";
      return api.sendMessage(reply, threadID, messageID);
    }

    // Romantic mode keywords
    if (/horny mode|call/i.test(input)) {
      return api.sendMessage(
        `Alright, horny mode's ON. Let's get naughty and wild! 😈🔥\n\n_Ek thappad maarungi na, deewar pe chipak jaoge! 😏 Special naughty plan banate hain sirf aapke liye 💋_\n_Your charmingly naughty Riya 💕_`,
        threadID,
        messageID
      );
    }

    // AI Response
    try {
      const res = await axios.get(`${hercaiAPI}${encodeURIComponent(input)}`);
      const reply = res.data.reply;

      api.sendMessage(
        {
          body: `🩷 Riya: ${reply}`,
          mentions: [{
            id: senderID,
            tag: "you"
          }]
        },
        threadID,
        messageID
      );
    } catch (err) {
      console.error(err);
      return api.sendMessage("Oops! Riya thodi busy hai... baad me try karo 😔", threadID, messageID);
    }
  }
};
