const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

module.exports.config = {
  name: "checksamework",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "uzairrajput",
  description: "Detect files with same work but different names",
  commandCategory: "admin",
  usages: "[checksamework]",
  cooldowns: 5,
};

function getFileHash(filePath) {
  const data = fs.readFileSync(filePath, "utf8")
    .replace(/\s/g, "") // remove whitespace
    .replace(/\/\/.*$/gm, "") // remove single-line comments
    .replace(/\/\*[\s\S]*?\*\//g, ""); // remove multi-line comments

  return crypto.createHash("md5").update(data).digest("hex");
}

module.exports.run = async ({ api, event }) => {
  const folderPath = __dirname;
  const files = fs.readdirSync(folderPath).filter(f => f.endsWith(".js") && f !== "checksamework.js");

  const hashes = new Map();
  let duplicates = [];

  for (const file of files) {
    const fullPath = path.join(folderPath, file);
    const hash = getFileHash(fullPath);

    if (hashes.has(hash)) {
      const existingFile = hashes.get(hash);
      duplicates.push(`⚠️ Same work:\n- ${existingFile}\n- ${file}`);
    } else {
      hashes.set(hash, file);
    }
  }

  if (duplicates.length === 0) {
    return api.sendMessage("✅ Koi bhi same kaam karne wali file nahi mili.", event.threadID, event.messageID);
  } else {
    return api.sendMessage(`🔁 Same logic wali files milin:\n\n${duplicates.join("\n\n")}`, event.threadID, event.messageID);
  }
};
