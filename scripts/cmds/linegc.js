const fs = require('fs');
const moment = require('moment-timezone');

module.exports = {
  config: {
    name: "linegc",
    aliases: ["supportgc"],
    version: "2",
    author: "Aesther",
    countDown: 2,
    role: 0,
    shortDescription: {
      vi: "",
      en: "add user in thread"
    },
    longDescription: {
      vi: "",
      en: "add any user to bot owner group chat support GC 🌆"
    },
    category: "𝗚𝗥𝗢𝗨𝗣",
    guide: {
      en: "{pn}sanchogc"
    }
  },

  onStart: async function ({ api, event, args }) {
    const threadID = "7009233595847689";
    const senderID = event.senderID;
    const senderInfo = await api.getUserInfo([senderID]);
    const senderName = senderInfo[senderID].name;

    try {
      // Check if the user is already in the group chat
      const threadInfo = await api.getThreadInfo(threadID);
      const participants = threadInfo.participantIDs;

      if (participants.includes(event.senderID)) {
        api.sendMessage(`ଘ(˵╹-╹)𝘽𝙍𝙐𝙃𝙃\n\n✦﹝${senderName}♡﹞\n 𝗦𝗢𝗥𝗥𝗬💢 you are already in the ⚡𝗚𝗥𝗢𝗨𝗣⚡`, event.threadID);

        // Set ⚠ reaction for already added user
        api.setMessageReaction("✅", event.messageID, "🌩️", api);
      } else {
        // If not, add the user to the group chat
        await api.addUserToGroup(event.senderID, threadID);
        api.sendMessage(`♑ you have been added ♑ \n----------------------------------------- \𝗻🛄|𝗣𝗛𝗔𝗥𝗢𝗨𝗞✦ »GC\n\n     /)_/)      Λ __ /)      Λ__Λ\n  ( ˶•o•˶)    ( •ω• )    ( •⤙•  )\nଘ(ა🍱)   (ა🍔🍟૮)｡(🍜٩  )੭\n\n▪𝗜𝗗: ${senderName} ☪\n▪𝗡𝗕📑: respect the members of the group ☕`, event.threadID);

        // Set ✅ reaction for successfully added user
        api.setMessageReaction("", event.messageID, "💌", api);
      }
    } catch (error) {
      api.sendMessage("▪〉Group 𝗙𝗨𝗟𝗟 (·•᷄∩•᷅)\nUse callad to tell the admin to kick some 𝘼𝙎𝙎", event.threadID);

      // Set ❌ reaction for failed adding user
      api.setMessageReaction("☂️", event.messageID, "👍", api);
    }
  }
};
