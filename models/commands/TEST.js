const axios = require("axios");

module.exports = {
  config: {
    name: "hercai",
    version: "1.1",
    author: "Uzair Rajput Mtx",
    countDown: 5,
    role: 0,
    shortDescription: "Romantic Girlfriend AI",
    longDescription: "Romantic, naughty and caring AI using Hercai API",
    category: "ai",
    guide: {
      en: "{pn} <your message>"
    }
  },

  onStart: async function ({ api, event, args }) {
    const baseURL = "https://uzairrajput-ytdl-api-master.onrender.com/v3/hercai?question=";
    const input = args.join(" ");
    const { senderID, threadID, messageID } = event;

    // OWNER UID(s)
    const ownerUIDs = ["61552682190483"];

    if (!input) {
      return api.sendMessage("Pehle kuch likho toh sahi... mujhe kya bataun? 😜", threadID, messageID);
    }

    // Abuse filter
    const abusiveWords = ["chut", "bhosdi", "lund", "madarchod", "mc", "bc", "randi"];
    if (abusiveWords.some(w => input.toLowerCase().includes(w))) {
      const reply = ownerUIDs.includes(senderID)
        ? "Aap toh mere Malik ho... sab kuch maaf hai 😚"
        : "Oyeee! Batameezi ki hadd hoti hai! 😠";
      return api.sendMessage(reply, threadID, messageID);
    }

    // Horny mode trigger
    if (/horny mode|call/i.test(input)) {
      return api.sendMessage(
        `Horny Mode Activated 🔥\nRiya ab full naughty mood mein hai 😈\n_Aur agar zyada hero banoge toh cheekh ke bataungi sabko tumhara raaz 😏_`,
        threadID,
        messageID
      );
    }

    // Main API Call
    try {
      const res = await axios.get(baseURL + encodeURIComponent(input));
      const reply = res.data.reply;

      api.sendMessage(
        {
          body: `💋 Riya: ${reply}`,
          mentions: [{ id: senderID, tag: "you" }]
        },
        threadID,
        messageID
      );
    } catch (err) {
      console.error(err.message);
      return api.sendMessage("Riya thodi busy hai... baad mein baat karte hain 😔", threadID, messageID);
    }
  }
};
