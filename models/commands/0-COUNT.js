const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { getStreamFromURL } = global.utils;

module.exports.config = {
  name: "cover",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "uzairrajput",
  description: "Get user cover using Facebook cookie (private & public)",
  commandCategory: "info",
  usages: "[uid or @mention]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const mention = Object.keys(event.mentions)[0];
  const uid = mention || args[0] || event.senderID;

  const cookie = "[
    {
        "key": "datr",
        "value": "piA_aK4BcuDMUPbFLoEo6g6I",
        "domain": "facebook.com",
        "path": "/",
        "hostOnly": false,
        "creation": "2025-06-10T05:54:03.713Z",
        "lastAccessed": "2025-06-10T05:54:03.714Z"
    },
    {
        "key": "sb",
        "value": "piA_aPw_z4EuiqEWsDr3eEfD",
        "domain": "facebook.com",
        "path": "/",
        "hostOnly": false,
        "creation": "2025-06-10T05:54:03.714Z",
        "lastAccessed": "2025-06-10T05:54:03.714Z"
    },
    {
        "key": "locale",
        "value": "en_US",
        "domain": "facebook.com",
        "path": "/",
        "hostOnly": false,
        "creation": "2025-06-10T05:54:03.714Z",
        "lastAccessed": "2025-06-10T05:54:03.714Z"
    },
    {
        "key": "vpd",
        "value": "v1%3B614x360x2",
        "domain": "facebook.com",
        "path": "/",
        "hostOnly": false,
        "creation": "2025-06-10T05:54:03.714Z",
        "lastAccessed": "2025-06-10T05:54:03.714Z"
    },
    {
        "key": "ps_l",
        "value": "1",
        "domain": "facebook.com",
        "path": "/",
        "hostOnly": false,
        "creation": "2025-06-10T05:54:03.714Z",
        "lastAccessed": "2025-06-10T05:54:03.714Z"
    },
    {
        "key": "ps_n",
        "value": "1",
        "domain": "facebook.com",
        "path": "/",
        "hostOnly": false,
        "creation": "2025-06-10T05:54:03.714Z",
        "lastAccessed": "2025-06-10T05:54:03.714Z"
    },
    {
        "key": "c_user",
        "value": "61575025542449",
        "domain": "facebook.com",
        "path": "/",
        "hostOnly": false,
        "creation": "2025-06-10T05:54:03.714Z",
        "lastAccessed": "2025-06-10T05:54:03.714Z"
    },
    {
        "key": "xs",
        "value": "28%3AsxsTSGGLHp5KFw%3A2%3A1749519528%3A-1%3A-1",
        "domain": "facebook.com",
        "path": "/",
        "hostOnly": false,
        "creation": "2025-06-10T05:54:03.714Z",
        "lastAccessed": "2025-06-10T05:54:03.714Z"
    },
    {
        "key": "fr",
        "value": "0GwlmumldgkJlsodM.AWfFw_KlqDAYvpY7MLa5vVQI9pCtpQGc0ABO3hC0xXfY6GqdXmM.BoR4y3..AAA.0.0.BoR8hw.AWdMizN2qYPbKoBUwyB2bJ2mqko",
        "domain": "facebook.com",
        "path": "/",
        "hostOnly": false,
        "creation": "2025-06-10T05:54:03.714Z",
        "lastAccessed": "2025-06-10T05:54:03.714Z"
    },
    {
        "key": "wl_cbv",
        "value": "v2%3Bclient_version%3A2841%3Btimestamp%3A1749534832",
        "domain": "facebook.com",
        "path": "/",
        "hostOnly": false,
        "creation": "2025-06-10T05:54:03.714Z",
        "lastAccessed": "2025-06-10T05:54:03.714Z"
    },
    {
        "key": "fbl_st",
        "value": "100739312%3BT%3A29158913",
        "domain": "facebook.com",
        "path": "/",
        "hostOnly": false,
        "creation": "2025-06-10T05:54:03.714Z",
        "lastAccessed": "2025-06-10T05:54:03.714Z"
    }
]"; // Replace with your Facebook cookie

  try {
    const res = await axios.get(`https://mbasic.facebook.com/${uid}`, {
      headers: {
        cookie,
        "User-Agent": "Mozilla/5.0"
      }
    });

    const coverMatch = res.data.match(/<img[^>]+src="([^"]+)"[^>]+alt="Cover photo"/);
    if (!coverMatch) return api.sendMessage("❌ Cover not found or profile has no cover.", event.threadID);

    const coverUrl = coverMatch[1].replace(/&amp;/g, "&");
    const msg = {
      body: "📸 𝗖𝗼𝘃𝗲𝗿 𝗣𝗵𝗼𝘁𝗼 𝗙𝗲𝘁𝗰𝗵𝗲𝗱!",
      attachment: await getStreamFromURL(coverUrl)
    };
    return api.sendMessage(msg, event.threadID);
  } catch (err) {
    return api.sendMessage("❌ Error: " + err.message, event.threadID);
  }
};
