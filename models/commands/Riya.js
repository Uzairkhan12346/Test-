// Riya AI Companion - UID Specific Behavior + Code Generation
const axios = require("axios");
const fs = require("fs");

// User name cache to avoid fetching name repeatedly
const userNameCache = {};
let hornyMode = false; // Default mode

// === SET YOUR OWNER UID HERE ===
// महत्वपूर्ण: अपना Facebook UID यहां अपडेट करें!
const ownerUID = "61550558518720"; // <-- अपना UID यहां डालें
// ==============================

// Function to generate voice reply (using Google TTS or any other API)
async function getVoiceReply(text) {
// महत्वपूर्ण: आपको YOUR_API_KEY को अपनी VoiceRSS API Key से बदलना होगा
// IMPORTANT: Replace YOUR_API_KEY with your VoiceRSS API Key
const voiceApiUrl = `https://api.voicerss.org/?key=YOUR_API_KEY&hl=hi-in&src=${encodeURIComponent(text)}`;
try {
const response = await axios.get(voiceApiUrl, { responseType: 'arraybuffer' });
const audioData = response.data;
const audioPath = './voice_reply.mp3';
fs.writeFileSync(audioPath, audioData);  // Save to local MP3 file
return audioPath;
} catch (error) {
console.error("Error generating voice reply:", error);
return null;
}
}

// Function to get a GIF from Giphy API (working API integrated)
async function getGIF(query) {
const giphyApiKey = "dc6zaTOxFJmzC";  // Working Giphy API key (free key, limited usage)
const giphyUrl = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${encodeURIComponent(query)}&limit=1`;
try {
const response = await axios.get(giphyUrl);
// Check if data exists before accessing properties
if (response.data && response.data.data && response.data.data.length > 0) {
return response.data.data[0]?.images?.original?.url;
} else {
console.log("No GIF found for query:", query);
return null; // Return null if no GIF is found
}
} catch (error) {
console.error("Error fetching GIF:", error);
return null;
}
}

module.exports.config = {
name: "Riya",
version: "2.6.0", // Updated version for personality changes
hasPermssion: 0,
credits: "Rudra + API from Angel code + Logging & User Name by Gemini + Code Generation Ability + Personality Enhanced by User Request",
description: "Riya, your AI companion: modern, smart, flirty with users, roasts playfully, and super respectful to Owner. UID specific behavior. Responds only when triggered. Modified for 3-4 line replies (with code exceptions).",
commandCategory: "AI-Companion",
usages: "Riya [आपका मैसेज] / Riya code [आपका कोड प्रॉम्प्ट] (Owner Only) / Reply to Riya",
cooldowns: 2,
};

const chatHistories = {};
const AI_API_URL = "https://rudra-here-brs2.onrender.com"; // <-- नया Render सर्वर URL

// User name cache to avoid fetching name repeatedly
async function getUserName(api, userID) {
if (userNameCache[userID]) {
return userNameCache[userID];
}
try {
const userInfo = await api.getUserInfo(userID);
if (userInfo && userInfo[userID] && userInfo[userID].name) {
const name = userInfo[userID].name;
userNameCache[userID] = name;
return name;
}
} catch (error) {
console.error("Error fetching user info:", error);
}
if (userID === ownerUID) {
return "Boss"; // Changed from "boss" to "Boss" for consistency with prompts
}
return "yaar";
}

module.exports.run = async function () {};

// Toggle mode logic remains the same, applies to everyone
async function toggleHornyMode(body, senderID) {
if (body.toLowerCase().includes("horny mode on") || body.toLowerCase().includes("garam mode on")) {
hornyMode = true;
return "Alright, horny mode's ON. Let's get naughty and wild! 😈🔥";
} else if (body.toLowerCase().includes("horny mode off") || body.toLowerCase().includes("garam mode off")) {
hornyMode = false;
return "Okay, switching back to our usual charming style. 😉";
}
return null;
}

module.exports.handleEvent = async function ({ api, event }) {
try {
const { threadID, messageID, senderID, body, messageReply } = event;

const isRiyaTrigger = body?.toLowerCase().startsWith("riya");
    const isReplyToRiya = messageReply?.senderID === api.getCurrentUserID();
    if (!(isRiyaTrigger || isReplyToRiya)) {
        return; // Ignore messages that are not triggers
    }

    console.log("--- Riya HandleEvent ---");
    console.log("Riya's Bot ID:", api.getCurrentUserID());
    console.log("Sender ID:", senderID);
    console.log("Is Owner UID:", senderID === ownerUID);
    console.log("Message Body:", body);
    console.log("-----------------------");

    let userMessageRaw; // उपयोगकर्ता द्वारा भेजा गया मूल मैसेज
    let userMessageForAI; // AI को भेजा जाने वाला प्रॉम्प्ट
    let isExplicitCodeRequest = false; // नया फ्लैग

    if (isRiyaTrigger) {
        userMessageRaw = body.slice(4).trim(); // "riya" के बाद का टेक्स्ट
    } else { // isReplyToRiya
        userMessageRaw = body.trim();
    }

    // --- कोड जनरेशन कमांड की जांच करें ---
    if (userMessageRaw.toLowerCase().startsWith("code ")) {
        isExplicitCodeRequest = true;
        userMessageForAI = userMessageRaw.slice(5).trim(); // "code " के बाद का टेक्स्ट

        // === केवल मालिक के लिए कोड जनरेशन ===
        if (senderID !== owne
