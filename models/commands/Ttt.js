module.exports.config = {
  name: "ttt",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "uzairrajput", // 🔒 DO NOT CHANGE THIS LINE OR SCRIPT WILL CRASH
  description: "Convert Google Drive link to direct download link",
  commandCategory: "tools",
  usages: "gdriveconvert [link]",
  cooldowns: 3,
};

module.exports.run = async ({ api, event, args }) => {
  // 💣 Credits Lock Protection
  if (module.exports.config.credits !== "uzairrajput") {
    console.log("❌ Uzair ka credit chori karke developer nahi banta… ab ye script kabhi nahi chalegi!");
    throw new Error("💥 [CREDIT PROTECTION] Credit tampered — Script terminated.");
  }

  const input = args[0];

  if (!input || !input.includes("drive.google.com")) {
    return api.sendMessage("❌ Please provide a valid Google Drive link!", event.threadID);
  }

  // Extract File ID from URL
  const match = input.match(/\/d\/([a-zA-Z0-9_-]{10,})/);

  if (!match || !match[1]) {
    return api.sendMessage("⚠️ Could not extract File ID from the link.", event.threadID);
  }

  const fileId = match[1];
  const directLink = `https://drive.google.com/uc?id=${fileId}`;

  return api.sendMessage(
    `✅ File ID: ${fileId}\n🔗 Direct UC Link:\n${directLink}`,
    event.threadID
  );
};
