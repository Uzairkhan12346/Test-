// File: modules/driveupload.js

const fs = require("fs"); const path = require("path"); const axios = require("axios"); const mime = require("mime-types"); const { google } = require("googleapis");

const CREDENTIALS = require("./credentials.json"); const TOKEN_PATH = "./token.json"; const FOLDER_ID = "17cp6BGSXK-7ZW3AqVUtuln-YBdlwPHzi"; // Uzair's Drive folder

function authorize() { const { client_secret, client_id, redirect_uris } = CREDENTIALS.installed; const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

if (fs.existsSync(TOKEN_PATH)) { const token = fs.readFileSync(TOKEN_PATH); oAuth2Client.setCredentials(JSON.parse(token)); return oAuth2Client; } else { throw new Error("Token not found. Run OAuth setup to generate token.json"); } }

async function uploadToDrive(filePath) { const auth = authorize(); const drive = google.drive({ version: "v3", auth });

const fileName = path.basename(filePath); const mimeType = mime.lookup(filePath) || "application/octet-stream";

const fileMetadata = { name: fileName, parents: [FOLDER_ID], };

const media = { mimeType: mimeType, body: fs.createReadStream(filePath), };

const response = await drive.files.create({ resource: fileMetadata, media: media, fields: "id", });

const fileId = response.data.id;

await drive.permissions.create({ fileId: fileId, requestBody: { role: "reader", type: "anyone", }, });

return https://drive.google.com/file/d/${fileId}/view; }

module.exports = { config: { name: "upload", version: "1.0.0", hasPermssion: 0, credits: "uzairrajput", description: "Upload media to Google Drive", commandCategory: "tools", usages: "reply to image/video", cooldowns: 5, },

run: async function({ api, event }) { const attachment = event.messageReply?.attachments?.[0]; if (!attachment?.url) { return api.sendMessage("📎 Koi media reply karo upload karne ke liye.", event.threadID, event.messageID); }

const ext = path.extname(attachment.url.split("?")[0]) || ".mp4";
const filePath = `./temp/${Date.now()}${ext}`;

try {
  const response = await axios.get(attachment.url, { responseType: "stream" });
  const writer = fs.createWriteStream(filePath);
  response.data.pipe(writer);

  writer.on("finish", async () => {
    const link = await uploadToDrive(filePath);
    api.sendMessage(`🎉 Upload ho gaya jaanu! Link:\n${link}`, event.threadID, event.messageID);
    fs.unlinkSync(filePath);
  });
} catch (err) {
  console.error("Upload error:", err);
  api.sendMessage("❌ Upload mein kuch gadbad ho gayi.", event.threadID, event.messageID);
}

} };

