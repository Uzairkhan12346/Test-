// modules/upload2drive.js

const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const mime = require("mime-types");

const DRIVE_FOLDER_ID = "17cp6BGSXK-7ZW3AqVUtuln-YBdlwPHzi";
const CREDENTIALS_PATH = __dirname + "/credentials.json"; // Service account JSON yahan rakhna

module.exports.config = {
  name: "upload2drive",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "uzairrajput",
  description: "Upload media to Google Drive and return direct link",
  commandCategory: "tools",
  usages: "send image/video + type 'drive'",
  cooldowns: 5,
};

module.exports.run = async ({ api, event }) => {
  if (!event.messageReply || !event.messageReply.attachments[0]) {
    return api.sendMessage("📎 Reply any media with 'drive' command to upload!", event.threadID);
  }

  const attachment = event.messageReply.attachments[0];
  const fileUrl = attachment.url;
  const ext = mime.extension(attachment.type) || "bin";
  const filePath = path.join(__dirname, `temp.${ext}`);

  const writer = fs.createWriteStream(filePath);
  const res = await axios({ url: fileUrl, method: "GET", responseType: "stream" });
  res.data.pipe(writer);

  await new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });

  const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: ["https://www.googleapis.com/auth/drive"],
  });

  const drive = google.drive({ version: "v3", auth: await auth.getClient() });

  const fileMetadata = {
    name: `UploadedByBot.${ext}`,
    parents: [DRIVE_FOLDER_ID],
  };

  const media = {
    mimeType: mime.lookup(filePath),
    body: fs.createReadStream(filePath),
  };

  try {
    const uploadRes = await drive.files.create({
      resource: fileMetadata,
      media,
      fields: "id",
    });

    const fileId = uploadRes.data.id;

    await drive.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const directLink = `https://drive.google.com/uc?id=${fileId}`;
    api.sendMessage(`✅ File uploaded!\n🔗 Direct link:\n${directLink}`, event.threadID, event.messageID);
  } catch (e) {
    console.error("Upload failed:", e);
    api.sendMessage("❌ Upload failed. Check console.", event.threadID);
  } finally {
    fs.unlinkSync(filePath);
  }
};
