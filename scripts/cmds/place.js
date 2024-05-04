module.exports = {
    config: {
        name: "place",
        version: "1.0",
        author: "Hassan",
        countDown: 10,
        shortDescription: {
            en: "Place your bet and see if you win or lose",
        },
        longDescription: {
            en: "Place your bet and see if you win or lose.",
        },
        category: "Game",
    },
    langs: {
        en: {
            not_enough_money: " 🚫|𝗦𝗢𝗥𝗥𝗬 𝗬𝗢𝗨 𝗗𝗢𝗡'𝗧 𝗛𝗔𝗩𝗘 𝗘𝗡𝗢𝗨𝗚𝗛 𝗠𝗢𝗡𝗘𝗬 🚮",
            bet_placed: "Your 𝗕𝗘𝗧 of [$%1] has been 𝗣𝗟𝗔𝗖𝗘𝗗. Let's see if you 𝗪𝗜𝗡 or 𝗟𝗢𝗦𝗘!",
            win_message: "🛂|𝗖𝗢𝗡𝗚𝗥𝗔𝗧𝗨𝗟𝗔𝗧𝗜𝗢𝗡! You 𝗪𝗜𝗡 {$%1}",
            lose_message: "🚫|𝗦𝗢𝗥𝗥𝗬, you 𝗟𝗢𝗦𝗘 [$%1]",
        },
    },
    onStart: async function ({ args, message, event, usersData, getLang }) {
        const { senderID } = event;
        const userData = await usersData.get(senderID);
        const amount = parseInt(args[0]);

        if (isNaN(amount) || amount <= 0) {
            return message.reply("🔃|𝗣𝗟𝗘𝗔𝗦𝗘 𝗘𝗡𝗧𝗘𝗥 𝗔 𝗣𝗜𝗦𝗜𝗧𝗜𝗩𝗘 𝗔𝗠𝗢𝗨𝗡𝗧 𝗧𝗢 𝗣𝗟𝗔𝗖𝗘 𝗬𝗢𝗨𝗥 𝗕𝗘𝗧");
        }

        if (amount > userData.money) {
            return message.reply(getLang("not_enough_money"));
        }

        const result = Math.random() < 0.5 ? "win" : "lose";
        const winnings = result === "win" ? amount : -amount;

        await usersData.set(senderID, {
            money: userData.money + winnings,
            data: userData.data,
        });

        return message.reply(getLang(result === "win" ? "win_message" : "lose_message", Math.abs(winnings)));
    },
};
