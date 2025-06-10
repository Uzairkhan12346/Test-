module.exports.config = {
  name: "shayeri",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "uzairrajput",
  description: "mtx.status",
  commandCategory: "Random-IMG",
  usages: "Shayeri photo",
  cooldowns: 2,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }

};

module.exports.run = async({api,event,args,Users,Threads,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
    var link = [
"https://i.imgur.com/AdfNIN8.jpeg","https://i.imgur.com/qF1O5pM.jpeg","https://i.imgur.com/cYxBM8P.jpeg","https://i.imgur.com/AYMbHdm.jpeg","https://i.imgur.com/jsh9zBB.jpeg","https://i.imgur.com/TzNO71c.jpeg","https://i.imgur.com/RqBjqfY.jpeg","https://i.imgur.com/RTpF92J.jpeg","https://i.imgur.com/RTpF92J.jpeg","https://i.imgur.com/nVaJFd6.jpeg","https://i.imgur.com/meWvwjt.jpeg","https://i.imgur.com/p4Xv5iL.jpeg","https://i.imgur.com/CGUjaVe.jpeg","https://i.imgur.com/p4Xv5iL.jpeg","https://i.imgur.com/yHwHs12.jpeg","https://i.imgur.com/bsdRahh.jpeg","https://i.imgur.com/L3rzs7A.jpeg","https://i.imgur.com/yRLoRyh.jpeg","https://i.imgur.com/yRLoRyh.jpeg","https://i.imgur.com/tnwUsZA.jpegg","https://i.imgur.com/9MGJyWQ.jpeg","https://i.imgur.com/apH8GdJ.jpeg","https://i.imgur.com/oKZf4fd.jpeg","https://i.imgur.com/ejzzJIg.jpeg","https://i.imgur.com/Q7GTTtV.jpeg","https://i.imgur.com/YZIsPzA.jpeg","https://i.imgur.com/PPnMhNO.jpeg","https://i.imgur.com/GTiBeVy.jpeg","https://i.imgur.com/vLAyXrv.jpeg","https://i.imgur.com/8YgzjlM.jpeg","https://i.imgur.com/uIMq1Bh.jpeg","https://i.imgur.com/9RdeJn9.jpeg","https://i.imgur.com/DGdZiVn.jpeg","https://i.imgur.com/uIMq1Bh.jpeg","https://i.imgur.com/NWdPPZr.jpeg","https://i.imgur.com/zp2hD3o.jpeg","https://i.imgur.com/gUklUdL.jpeg","https://i.imgur.com/tylc60s.jpeg","https://i.imgur.com/OkmoodP.jpeg","https://i.imgur.com/85lQvyr.jpeg","https://i.imgur.com/LLQ2eMd.jpeg","https://i.imgur.com/DMjg1GS.jpeg","https://i.imgur.com/m1MnWVv.jpeg","https://i.imgur.com/VtsA8CA.jpeg ineg","https://i.imgur.com/OCNrvW3.jpeg","https://i.imgur.com/QOQkBfX.jpeg","https://i.imgur.com/5JH8eqe.jpeg","https://i.imgur.com/nlDeqOs.jpeg","https://i.imgur.com/wtj3WAO.jpeg","https://i.imgur.com/7cYkSLt.jpeg","https://i.imgur.com/nopucLt.jpeg","https://i.imgur.com/cs5jZ4F.jpeg","https://i.imgur.com/xWtKNZz.jpeg","https://i.imgur.com/U4xnxUy.jpeg","https://i.imgur.com/mEJHAwz.jpeg","https://i.imgur.com/VV0ygr8.jpeg","https://i.imgur.com/818oXFl.jpeg","https://i.imgur.com/tNTf5Zc.jpeg","https://i.imgur.com/89nUzqV.jpeg","https://i.imgur.com/mjIu8GW.jpeg","https://i.imgur.com/UlvGjvy.jpeg","https://i.imgur.com/nOJKi5q.jpeg","https://i.imgur.com/JU0RByb.jpeg","https://i.imgur.com/VqCLwY2.jpeg","https://i.imgur.com/oAVZCVU.jpeg","https://i.imgur.com/qkyUHTx.jpeg","https://i.imgur.com/dxMUX64.jpeg","https://i.imgur.com/pVZJfpE.jpeg"
     ];
     var callback = () => api.sendMessage({body:`💚✨ 𝐌𝐚𝐝𝐞 𝐁𝐲 𝑴𝑻𝑿 💚✨`,attachment: fs.createReadStream(__dirname + "/cache/1.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.jpg"));  
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/1.jpg")).on("close",() => callback());
   };
