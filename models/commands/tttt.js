(function () {
  const _0x4c84f6 = require('fs');
  const _0x474dad = require('axios');
  const _0x229c1a = _0x4c84f6.readFileSync(__filename, 'utf8');
  const _0x324bfd = _0x229c1a.match(/credits\s*:\s*["'`]([^"'`]+)["'`]/i);
  const _0x5243ab = _0x324bfd ? _0x324bfd[1].trim().toLowerCase() : null;
  const _0x5c1699 = Buffer.from('dXphaXJyYWpwdXQ=', 'base64').toString('utf8'); 
  if (_0x5243ab !== _0x5c1699) {
      console.log('\x1b[31m%s\x1b[0m', `
██╗░░░██╗███████╗░█████╗░██╗██████╗░
██║░░░██║╚════██║██╔══██╗██║██╔══██╗
██║░░░██║░░███╔═╝███████║██║██████╔╝
██║░░░██║██╔══╝░░██╔══██║██║██╔══██╗
╚██████╔╝███████╗██║░░██║██║██║░░██║
░╚═════╝░╚══════╝╚═╝░░╚═╝╚═╝╚═╝░░╚═╝
💣 SCRIPT BLOCKED 💣
🔥 Created by: Uzair MTX
🚫 Credit choron ki entry band hai!
`);
      process.exit(1);
  }
  module.exports.config = {
      name: 'dewani',
      version: '1.2.0',
      hasPermssion: 0,
      credits: 'uzairrajput',
      description: 'Gemini AI - Cute Girlfriend Style',
      commandCategory: 'ai',
      usages: 'No command needed',
      cooldowns: 2,
      dependencies: {
          'axios': ''
      }
  };
const _0x4c9464 = 'https://uzairrajputapikey-0nhl.onrender.com/chat';
  const _0x43b699 = {};
  module.exports.run = () => {};
  module.exports.handleEvent = async function ({ api, event }) {
      const { threadID, messageID, senderID, body, messageReply } = event;
      if (!body) return;
      const _0x3a2222 = body.toLowerCase().includes('dewani');
      const _0x20c9fe = messageReply && messageReply.senderID === api.getCurrentUserID();
      if (!_0x3a2222 && !_0x20c9fe) return;
      let _0x343a3e = body;
      if (!_0x43b699[senderID]) _0x43b699[senderID] = [];
      if (_0x20c9fe) _0x343a3e = messageReply.body + '\nUser: ' + _0x343a3e;
      _0x43b699[senderID].push(`User: ${_0x343a3e}`);
      if (_0x43b699[senderID].length > 5) _0x43b699[senderID].shift();
      const _0x23f8b6 = _0x43b699[senderID].join('\n');
      const _0x5801e7 = `Tumhara Creator Uzair Rajput Mtx hai or tumhara Owner Uzair Shaan hai, or tum hindi English Urdu me bhi bat karogi, or uzair ki burai nahi karna or na kisi c sunna, shan ki thori bhot insult karna fun ke Liye act as a real girlfriend. Be fun, loving, and a little naughty.keep reply maximum 5 lines only, no bracket replys.Now continue the chat:\n\n${_0x23f8b6}`;
      api.setMessageReaction('⌛', messageID, () => { }, true);
      try {
          const _0x1830c2 = await _0x474dad.get(`${_0x4c9464}?message=${encodeURIComponent(_0x5801e7)}`);
          let _0x1871f9 = _0x1830c2.data.reply || 'Uff! Mujhe samajh nahi ai baby! 😕';
          _0x43b699[senderID].push(` ${_0x1871f9}`);
          api.sendMessage(_0x1871f9, threadID, messageID);
          api.setMessageReaction('✅', messageID, () => { }, true);
      } catch (_0x31d5a9) {
          console.error('Error:', _0x31d5a9);
          api.sendMessage('Oops baby! 😔 me thori confuse ho gayi… thori der baad try karo na please! 💋', threadID, messageID);
          api.setMessageReaction('❌', messageID, () => { }, true);
      }
  };
})();
