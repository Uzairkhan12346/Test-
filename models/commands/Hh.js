const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

module.exports.config = {
  name: "checksamework",
  version: "2.0.0",
  hasPermssion: 2,
  credits: "uzairrajput",
  description: "Detect files with same work but different names + show name & desc",
  commandCategory: "admin",
  usages: "[checksamework]",
  cooldowns: 5,
};

function getFileHash(filePath) {
  const data = fs.readFileSync(filePath, "utf8")
    .replace(/\s/g, "")
    .replace(/\/\/.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "");

  return crypto.createHash("md5").update(data).digest("hex");
}

function getFileMeta(filePath) {
  try {
    const command = require(filePath);
    return {
      name: command.config?.name || "❓ unknown",
      description: command.config?.description || "❓ no description"
    };
  } catch (err) {
    return {
      name: "❌ error loading",
      description: err.message
    };
  }
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

      const fileAPath = path.join(folderPath, existingFile);
      const fileBPath = path.join(folderPath, file);

      const metaA = getFileMeta(fileAPath);
      const metaB = getFileMeta(fileBPath);

      duplicates.push(
        `⚠️ Same logic found in:\n` +
        `📁 ${existingFile} — name: ${metaA.name}, desc: ${metaA.description}\n` +
        `📁 ${file} — name: ${metaB.name}, desc: ${metaB.description}`
      );
    } else {
      hashes.set(hash, file);
    }
  }

  if (duplicates.length === 0) {
    return api.sendMessage("✅ Koi bhi same kaam karne wali file nahi mili.", event.threadID, event.messageID);
  }

  return api.sendMessage(`🔁 Same logic wali files milin:\n\n${duplicates.join("\n\n")}`, event.threadID, event.messageID);
};
