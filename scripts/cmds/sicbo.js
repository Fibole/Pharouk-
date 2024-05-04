module.exports = {
  config: {
    name: "sicbo",
    aliases: ["sic"],
    version: "1.0",
    author: "Loid Butter",
    countDown: 10,
    role: 0,
    shortDescription: "Play Sicbo, the oldest gambling game",
    longDescription: "Play Sicbo, the oldest gambling game, and earn money",
    category: "game",
    guide: "{pn} <Small/Big> <amount of money>"
  },

  onStart: async function ({ args, message, usersData, event }) {
    const betType = args[0];
    const betAmount = parseInt(args[1]);
    const user = event.senderID;
    const userData = await usersData.get(event.senderID);

    if (!["small", "big"].includes(betType)) {
      return message.reply("📍 | Choose '𝗦𝗠𝗔𝗟𝗟' or '𝗕𝗜𝗚'.");
    }

    if (!Number.isInteger(betAmount) || betAmount < 50) {
      return message.reply("⛔ | Please bet an amount of 50 or more.");
    }

    if (betAmount > userData.money) {
      return message.reply("⛔ | You don't have enough money to make that bet.");
    }

    const dice = [1, 2, 3, 4, 5, 6];
    const results = [];

    for (let i = 0; i < 3; i++) {
      const result = dice[Math.floor(Math.random() * dice.length)];
      results.push(result);
    }

    const winConditions = {
      small: results.filter((num, index, arr) => num >= 1 && num <= 3 && arr.indexOf(num) !== index).length > 0,
      big: results.filter((num, index, arr) => num >= 4 && num <= 6 && arr.indexOf(num) !== index).length > 0,
    };

    const resultString = results.join(" | ");

    if ((winConditions[betType] && Math.random() <= 0.4) || (!winConditions[betType] && Math.random() > 0.4)) {
      const winAmount = 2 * betAmount;
      userData.money += winAmount;
      await usersData.set(event.senderID, userData);
      return message.reply(`∩_∩\n（„• ֊ •„)\n┏━∪∪━━┓\n\n≛𝙇𝙄𝙉𝙀𝙎≛»[📫]\n┗━━━━━┛[ ${resultString} ]\n\n🧃 | 𝗖𝗢𝗡𝗚𝗥𝗔𝗧𝗨𝗟𝗔𝗧𝗜𝗢𝗡𝗦 ! You 𝗪𝗢𝗡 ${winAmount}!`);
    } else {
      userData.money -= betAmount;
      await usersData.set(event.senderID, userData);
      return message.reply(`(\\_/)\n( •_•)\n// >[ ${resultString} ]\n\n ✖ | You 𝗟𝗢𝗦𝗧  ${betAmount}.`);
    }
  }
};
