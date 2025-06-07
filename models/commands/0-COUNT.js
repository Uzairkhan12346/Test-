module.exports.config = {
  name: "joke",
  version: "1.0.1",
  hasPermission: 0,
  credits: "uzairrajput",
  description: "Noprefix",
  commandCategory: "noPrefix",
  usages: "[]",
  cooldowns: 5,
  usePrefix: false
};

module.exports.handleEvent = async function ({ api, event, Users }) {
  var { threadID, messageID } = event;

  var tl = [
    "𝙎𝙝𝙤𝙝𝙖𝙧 (𝙗𝙖𝙬𝙞 𝙠𝙤 𝙛𝙤𝙣 𝙥𝙚): Tum bohat pyari ho...!\nBivi: Shukriya...!\nShohar: Tum bilkul Shehzadi jesi ho...\nBivi: Bohat shukriya... aur batao kya kar rahe ho?\nShohar: Main farigh tha socha mazak karun! 😆👈\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•",
    "𝙂𝙞𝙧𝙡𝙛𝙧𝙞𝙚𝙣𝙙: Purse ghar reh gaya hai, 1000 rupee chahiye\nBoyfriend: Yeh 10 rupee lo, rickshaw lo aur apni girlfriend ko behosh kar do 😂👈\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•",
    "𝘼𝙪𝙣𝙩𝙞: Doctor saab ghutney mein dard hai\nDoctor: Wazan kitna hai?\nAunty: Aankh ki chashme ke sath 83kg hai\nDoctor: Aur baghair chashme ke?\nAunty: Mein dekhi nahi sakti 😂👈\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•",
    "𝘾𝙝𝙖𝙣𝙩𝙪: Mujhe agar naya dimaagh lagwana ho toh tumhara lagwaunga\nMintu: Tumhein lagta hai main genius hoon?\nChantu: Nahi, mujhe aisa chahiye jo kabhi use hi na hua ho 😂\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•",
    "𝘼𝙪𝙧𝙖𝙩: Mera wazan kaise kam hoga?\nDoctor: Gardan ko left aur right hilaen\nAurat: Kab?\nDoctor: Jab koi khana offer kare 😂👈\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•",
    "𝘽𝙞𝙫𝙞: Tum sharab par paisay barbaad karte ho!\nShohar: Aur tum 5000 ka makeup?\nBivi: Kyunke main tumhein handsome samajhti hoon!\nShohar: Main bhi isliye peeta hoon 😂👈\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•",
    "𝙀𝙠 𝙢𝙖𝙘𝙝𝙝𝙖𝙧 uda uda soch raha tha...\nDost: Kya hua?\nPehla: Soch raha hoon ki chuhe ki patti mein chooha, soap box mein soap... phir aadmi machardani mein? 😆\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•",
    "𝙎𝙝𝙤𝙝𝙖𝙧: Aaj khana kyun nahi banaya?\nBivi: Gir gayi thi aur lag gayi\nShohar: Kahan gir gayi thi?\nBivi: Takiyye pe gir ke aankh lag gayi 😂👈\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•",
    "𝙎𝙝𝙤𝙝𝙖𝙧: Tum meri film mein kaam karogi?\nBivi: Scene kya hai?\nShohar: Tumhe pani mein dhire dhire jaana hai\nBivi: Film ka naam kya hai?\nShohar: Bhains paani mein chali gayi 😂👈\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•",
    "𝘿𝙤𝙘𝙩𝙤𝙧: Tumhara beta pagal kaise hua?\nBaap: Pehle general coach mein safar karta tha\nDoctor: Phir?\nBaap: Sab kehte the thoda hato, tab se fisal gaya 😂👈\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•",
    "𝙂𝙞𝙧𝙡: Kya kar rahe ho?\nBunty: Machhar maar raha hoon\nGirl: Kitne maare?\nBunty: 5 - 3 auratein 2 mard\nGirl: Kaise pata?\nBunty: 3 mirror ke samne, 2 beer ke sath 😂👈\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•",
    "𝘿𝙖𝙣𝙞: Agar teri GF aur best friend doob rahe hon to kise bachayega?\nMTX: Dono ko doobne dunga... ek sath kyun the? 😆\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•",
    "𝙇𝙖𝙧𝙠𝙞: Kya tumhe mera chappal ka size pata hai?\nLarka: Pehle hi gift mang rahi ho? Main sandal nahi de raha 😂👈\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•",
    "𝘽𝙖𝙣𝙠 𝙈𝙖𝙣𝙖𝙜𝙚𝙧: Mishra ji humare purane grahak hain\nClerk: Hello Mishra ji! Kal bola tha 'jahannum mein jao'\nAaj sirf yeh kehne ke liye call kiya... mat jao 😂👈\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•",
    "𝙎𝙝𝙤𝙝𝙖𝙧: Kaash tum sugar hoti, kabhi kabhi meetha bolti\nBivi: Kaash tum adrak hotay, dil pe bojh mat dalte 😆👈\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•",
    "𝙈𝙖𝙨𝙩𝙚𝙧: Decimal kya hai?\nPappu: Jab 10 se LOVE hota hai to decimal kehte hain 😂\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•",
    "𝘽𝙖𝙗𝙖: Facebook pe roza rakho, mohabbat wapas aa jaayegi 😄\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•",
    "𝙐𝙨𝙩𝙖𝙙: Asmaan mein udti aur zameen pe paida karti hai?\nPappu: Air Hostess 😂\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•",
    "𝙎𝙩𝙪𝙙𝙚𝙣𝙩: Aapne kabhi bakri ya ghora chashma lagaye dekha hai?\nUstaad behosh 😂\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•",
    "𝙈𝙖𝙨𝙩𝙚𝙧: Kitaabein dekh kar kya feel hota hai?\nStudent: Wo phone karti hai lekin jana nahi chahti 😎\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•",
    "𝘽𝙚𝙩𝙖: Amma pyaar ka virus fail gaya hai\nAmma: Chappal hai mere paas, antivirus kaam karti hai 😆\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•",
    "𝘽𝙞𝙫𝙞: Tum mein kya dekha jo shaadi ki?\nShohar: Balcony mein bartan dhote dekha tha 😆\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•",
    "𝙂𝙞𝙧𝙡𝙛𝙧𝙞𝙚𝙣𝙙: Shaadi ke liye maa se baat karo\nBoy: Ab mere dil mein sirf tu hi hai 😍\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•",
    "𝙇𝙖𝙧𝙠𝙖: WhatsApp update karo\nLarki: Kaise?\nLarka: Play Store se\nLarki: Hamare gaon mein Play Store nahi hai 😆\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•",
    "𝙍𝙖𝙢𝙪: Garmi mein kya karte ho?\nDholu: AC ke saamne baithte hain\nRamu: Bohat garmi ho to?\nDholu: AC chalu karte hain 😄\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•",
    "𝙇𝙖𝙧𝙠𝙖: Pizza khao\nLarki: Paise nahi\nLarka: Mehngai hai\nLarki: Ab tum mere bhai ho 😆\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•",
    "𝘼𝙖𝙨𝙝𝙞𝙦: Mujh mein Khuda dikhta hai\nGF: Darshan karo, dakshina do aur nikal jao 😆\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•",
    "𝘽𝙤𝙮𝙛𝙧𝙞𝙚𝙣𝙙: Music mein taqat hai, pani bhi garam ho jaye\nGF: Tera gana sun kar mera khoon ubalta hai 😎\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•",
    "𝙆𝙖𝙧𝙖𝙣: Main Sunil se shaadi nahi kar sakti\nSavita: Kyun?\nMonica: Usne mujhe doosre se pyar karte dekh liya 😆\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•",
    "𝙇𝙖𝙧𝙠𝙖: Mere baap ke samne sab katora leke khade hote hain\nGF: Tumhara baap ameer hai\nLarka: Nahi, gol gappay bechta hai 😂\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•",
    "𝙈𝙖𝙧𝙞𝙯: Operation theek se karein\nDoctor: Aisa kyun?\nMariz: Warna aapka hath chalta hai to mera doobta hai 😆\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•",
    "𝘿𝙤𝙘𝙩𝙤𝙧: Shohar ko aaram ki zarurat hai, yeh goliyan lo\nBivi: Kab doon?\nDoctor: Yeh uske liye nahi, aapke liye hain 😂\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•",
    "𝙋𝙖𝙥𝙥𝙪: Doctor mujhe kya bimari hai?\nDoctor: Larkiyon ka picha chhor do\nPappu: Kya hoga?\nDoctor: Warna mar jaoge, kyunke ek larki meri bhi hai 😆\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•",
    "𝘾𝙝𝙖𝙣𝙩𝙪: Doctor saab, seedhiyan chadhte saans phoolti hai\nDoctor: Dawa likh raha hoon\nChantu: Roz football khelta hoon\nDoctor: Kab tak?\nChantu: Jab tak phone charge hota hai 😆\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•",
    "𝘿𝙤𝙘𝙩𝙤𝙧: Tum chhat se kyun latke ho?\nPagal: Main bulb hoon\nDoctor: Jal kyun nahi rahe?\nPagal: Light gayi hai 😂\n● ──────────────────── ●\n𒁍⃝𝐌𝐀𝐃𝐄 𝐁𝐘 𝐔ʑʌīī𝐑┼•__🦋•"
  ];

  var rand = tl[Math.floor(Math.random() * tl.length)];
  let yan = event.body ? event.body.toLowerCase() : '';

  if (yan.indexOf("joke") >= 0) {
    api.setMessageReaction("🙃", event.messageID, (err) => {}, true);
    api.sendTypingIndicator(event.threadID, true);

    let userH = event.senderID;
    const userInfo = global.data.userName.get(userH) || await Users.getUserInfo(userH);
    if (event.senderID == api.getCurrentUserID()) return;

    var msg = {
      body: "@" + userInfo + ", " + rand,
      mentions: [{
        tag: "@" + userInfo,
        id: userH
      }]
    };

    setTimeout(function () {
      return api.sendMessage(msg, threadID, messageID);
    }, 2000);
  }
};

module.exports.run = async function ({ api, event, __GLOBAL }) {};
