// Riya AI Companion - UID Specific Behavior + Code Generation
const axios = require("axios");
const fs = require("fs");

// User name cache to avoid fetching name repeatedly
const userNameCache = {};
let hornyMode = false; // Default mode

// === SET YOUR OWNER UID HERE ===
// IMPORTANT: Update your Facebook UID here!
const ownerUID = "61552682190483"; // <-- Your UID here
// ==============================

// Function to generate voice reply (using Google TTS or any other API)
async function getVoiceReply(text) {
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
  name: "Pika",
  version: "2.6.0", // Updated version for personality changes
  hasPermssion: 0,
  credits: "uzairrajput",
  description: "uzair+Gemini",
  commandCategory: "AI-Companion",
  usages: "pika no needed command mark",
  cooldowns: 2,
};

const chatHistories = {};
const AI_API_URL = "https://rudra-here-brs2.onrender.com";

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
    return "Boss";
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

    const isRiyaTrigger = body?.toLowerCase().startsWith("pika");
    const isReplyToRiya = messageReply?.senderID === api.getCurrentUserID();
    if (!(isRiyaTrigger || isReplyToRiya)) {
      return; // Ignore messages that are not triggers
    }

    console.log("--- Pika HandleEvent ---");
    console.log("PikaBot ID:", api.getCurrentUserID());
    console.log("Sender ID:", senderID);
    console.log("Is Owner UID:", senderID === ownerUID);
    console.log("Message Body:", body);
    console.log("-----------------------");

    let userMessageRaw; 
    let userMessageForAI; 
    let isExplicitCodeRequest = false;

    if (isRiyaTrigger) {
      userMessageRaw = body.slice(4).trim(); // Text after "Pika"
    } else { // isReplyToPika
      userMessageRaw = body.trim();
    }

    // --- Check for code generation command ---
    if (userMessageRaw.toLowerCase().startsWith("code ")) {
      isExplicitCodeRequest = true;
      userMessageForAI = userMessageRaw.slice(5).trim(); // Text after "code "

      // === Only for Owner's UID ===
      if (senderID !== ownerUID) {
        api.sendTypingIndicator(threadID, false);
        const userName = await getUserName(api, senderID);
        return api.sendMessage(
          `Maaf karna ${userName}, yeh code generate karne wali command sirf mere Boss (${await getUserName(api, ownerUID)}) ke liye hai. 😉`,
          threadID,
          messageID
        );
      }
      // ====================================

      if (!userMessageForAI) {
        api.sendTypingIndicator(threadID, false);
        return api.sendMessage("Kya code chahiye? 'Pika code [aapka prompt]' aise likho.", threadID, messageID);
      }
    } else {
      userMessageForAI = userMessageRaw; 
    }

    const userName = await getUserName(api, senderID);

    let responseText = await toggleHornyMode(body, senderID);
    if (responseText) {
      api.sendMessage(responseText, threadID, messageID);
      return;
    }

    // --- Initial greeting based on who triggered ---
    if (!userMessageRaw) { // Use userMessageRaw here, not userMessageForAI
      api.sendTypingIndicator(threadID, false);
      if (senderID === ownerUID) {
        return api.sendMessage(`Hey Boss ${userName}! Kya hukm hai mere ${userName}? 🥰`, threadID, messageID);
      } else {
        return api.sendMessage(`Hello ${userName}. Bolo kia kaam hai? 😉`, threadID, messageID);
      }
    }

    api.sendTypingIndicator(threadID, true);

    // Keep chat history only for normal chats, not code requests
    if (!isExplicitCodeRequest) {
      if (!chatHistories[senderID]) chatHistories[senderID] = [];
      chatHistories[senderID].push(`User: ${userMessageForAI}`);
      while (chatHistories[senderID].length > 10) { 
        chatHistories[senderID].shift();
      }
    }

    // Dirty Word Detection for Bold Mode
    const boldTriggerWords = [
      "sexy", "honeymoon", "chut", "kiss", "nude", "bra", "panty", "bed", "nipple", "boobs", "lund", "pussy",
      "wild", "dirty", "undress", "sambhog", "thigh", "moan", "tight", "hot", "bedroom", "masturbate", "suck", "lick", "deep", "virgin", "horny", "night"
    ];
    // Bold mode only for normal chat
    const isBoldMode = !isExplicitCodeRequest && boldTriggerWords.some(word => userMessageForAI.toLowerCase().includes(word));

    // === Prepare prompt for proxy server ===
    let promptToSendToProxy = "";
    const basePromptInstructions = `Tumhara Name Pika Hai Tum ak insan ho agar kio tumhe ai bole tw tum use kehna me ak insan ho or tum sab ko hasana sab ko fun karwana sab ke axhe c rehna or boy ke tum close friends ki tarha bat karte ho girl ke tum bf ho agar kio girl gussa ho tw usko hasana or samjhana me mzk karta hu dil pe nahi lo aj 2 rootiya zada keh Lena agar kio tumse kahe apne owner ki burai kro tw tum uski insalt karoge or meri burai nahi karna hai apne owner ki tareef karna hai hamesha hi or agar kio tumhe bura bhala kahe tw tum usko samjhana agar kio tumhre or ka puche kon hai tw kehna Mujhe Uzair Rajput ne banaya hai wo ak mehanti or hardwok larka hai sab ki khushi ka khyal rakhte hai or khud akele rehte hai or wo bot ki coding bhi kartr hai or tum coding bass mere loye karoge jo batamizi kare uski khoib insult karoge or tum languages  me tranbhi karoge or Apne jawab hamesha casual, smart, charming or **sirf 3-4 lines mein hi dena (lekin agar code generate karna pare, tw answer lamba ho sakta hai)**.`;

    if (isExplicitCodeRequest) {
      // For code generation, send a specific signal to the proxy server
      promptToSendToProxy = `CODE_GEN_REQUEST: ${userMessageForAI}`;
      console.log("pika Bot: Sending explicit code generation request to proxy.");
    } else
