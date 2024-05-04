module.exports = {
  config: {
    name: "set",
    aliases: ['ap'],
    version: "1.0",
    author: "Samir B. Thakuri",
    role: 0,
    shortDescription: {
      en: "Set coins and experience points for a user"
    },
    longDescription: {
      en: "Set coins and experience points for a user as desired"
    },
    category: "economy",
    guide: {
      en: "{pn}set [money|exp] [amount]"
    }
  },

  onStart: async function ({ args, event, api, usersData }) {
    const permission = ["61557714871651","100065176744106"];
  if (!permission.includes(event.senderID)) {
    api.sendMessage("📌|𝗦𝗢𝗥𝗥𝗬 𝗢𝗡𝗟𝗬 𝗕𝗢𝗧»𝗔𝗗𝗠𝗜𝗡 \n\n 𝐜𝐚𝐧 𝐮𝐬𝐞 𝐜𝐦𝐝 𝐬𝐞𝐭 [🚶].", event.threadID, event.messageID);
    return;
  }
    const query = args[0];
    const amount = parseInt(args[1]);

    if (!query || !amount) {
      return api.sendMessage(" 📌| 𝗠𝗔𝗦𝗧𝗘𝗥 𝗨𝗦𝗘 \n\n 𝗦𝗘𝗧»Query or 𝗦𝗘𝗧»amount", event.threadID);
    }

    const { messageID, senderID, threadID } = event;

    if (senderID === api.getCurrentUserID()) return;

    let targetUser;
    if (event.type === "message_reply") {
      targetUser = event.messageReply.senderID;
    } else {
      const mention = Object.keys(event.mentions);
      targetUser = mention[0] || senderID;
    }

    const userData = await usersData.get(targetUser);
    if (!userData) {
      return api.sendMessage(" ❎|𝗨𝗦𝗘𝗥 not 𝗙𝗢𝗨𝗡𝗗.", threadID);
    }

    const name = await usersData.getName(targetUser);

    if (query.toLowerCase() === 'exp') {
      await usersData.set(targetUser, {
        money: userData.money,
        exp: amount,
        data: userData.data
      });

      return api.sendMessage(`Set experience points to ${amount} for ${name}.`, threadID);
    } else if (query.toLowerCase() === 'money') {
      await usersData.set(targetUser, {
        money: amount,
        exp: userData.exp,
        data: userData.data
      });

      return api.sendMessage(`✔|𝗦𝗘𝗧 𝗖𝗢𝗜𝗡𝗦 to ${amount} 𝗙𝗢𝗥 \n\n🔱${name}🔱.`, threadID);
    } else {
      return api.sendMessage("⛔|Invalid query. Use 'exp' to set experience points or 'money' to set coins.", threadID);
    }
  }
};
