module.exports.config = {
  name: "autosetgroup",
  version: "1.0.0",
  hasPermission: 1,
  credits: "Uzair",
  description: "Auto reset group name, emoji, and photo if changed.",
  commandCategory: "group",
  usages: "[]",
  cooldowns: 5,
};

const DEFAULT_NAME = "𝑴𝒀 𝑪𝑼𝑻𝑬 𝑮𝑹𝑶𝑼𝑷 💖";
const DEFAULT_EMOJI = "💖";
const DEFAULT_IMAGE_PATH = __dirname + "/cache/default.jpg"; // Put your default group image here

module.exports.handleEvent = async function ({ event, api }) {
  const threadID = event.threadID;

  try {
    const threadInfo = await api.getThreadInfo(threadID);

    // Auto reset name
    if (threadInfo.threadName !== DEFAULT_NAME) {
      await api.setTitle(DEFAULT_NAME, threadID);
    }

    // Auto reset emoji
    if (threadInfo.emoji !== DEFAULT_EMOJI) {
      await api.setGroupEmoji(DEFAULT_EMOJI, threadID);
    }

    // Auto reset group picture (only if photo URL changed)
    const currentImageSrc = threadInfo.imageSrc || "";
    if (!currentImageSrc.includes("your_default_image_url_here")) {
      const fs = require("fs");
      const imageStream = fs.createReadStream(DEFAULT_IMAGE_PATH);
      await api.changeGroupImage(imageStream, threadID);
    }

  } catch (err) {
    console.log("Error in autosetgroup:", err);
  }
};

module.exports.run = async function () {};
