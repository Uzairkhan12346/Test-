module.exports.config = {
  name: "gdriveconvert",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "uzairjani",
  description: "Convert Google Drive link to direct download link",
  commandCategory: "tools",
  usages: "gdriveconvert [link]",
  cooldowns: 3,
};

module.exports.run = async ({ api, event, args }) => {
  const input = args[0];

  if (!input || !input.includes("drive.google.com")) {
    return api.sendMessage("❌ Please provide a valid Google Drive link!", event.threadID);
  }

  // File ID extract from URL
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
