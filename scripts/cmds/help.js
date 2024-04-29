const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "[ 🐐 | GoatBot V2 ]";

module.exports = {
	config: {
		name: "help",
		version: "1.17",
		author: "aesther",
		countDown: 5,
		role: 0,
		shortDescription: {
			en: "View command usage and list all commands directly",
		},
		longDescription: {
			en: "View command usage and list all commands directly",
		},
		category: "info",
		guide: {
			en: "{pn} / help cmdName ",
		},
		priority: 1,
	},

	onStart: async function ({ message, args, event, threadsData, role }) {
	const { threadID } = event;
	const threadData = await threadsData.get(threadID);
	const prefix = getPrefix(threadID);

	if (args.length === 0) {
			const categories = {};
			let msg = "";

			msg += ` ≛𝙇𝙄𝙉𝙀𝙎≛ [✦]𝗖𝗠𝗗𝚜\n━━━━━━━━━━━\n➫[🛄]𝗔𝗗𝗠𝗜𝗡: Dåemōn's Shiñmõñe Dẽslâss\n➫[🌐] 𝗣𝗥𝗘𝗙𝗜𝗫 : 【 ${prefix} 】\n━━━━━━━━━━━\n`;

			for (const [name, value] of commands) {
					if (value.config.role > 1 && role < value.config.role) continue;

					const category = value.config.category || "Uncategorized";
					categories[category] = categories[category] || { commands: [] };
					categories[category].commands.push(name);
			}
8
			Object.keys(categories).forEach(category => {
					if (category !== "info") {
							msg += ``;

							const names = categories[category].commands.sort();
							for (let i = 0; i < names.length; i += 1) {
									const cmds = names.slice(i, i + 1).map(item => ` ●「${item}」 `);
									msg += `\n${cmds.join(" ".repeat(Math.max(0, 5 - cmds.join("").length)))}`;
							}

							msg += ``;
					}
			});

			const totalCommands = commands.size;
			msg += `\n━━━━━━━━━━━\n꒰⑅ᵕ༚ᵕ꒱˖♡˖꒰ᵕ༚ᵕ⑅꒱ 【${totalCommands}】 𝗖𝗠𝗗𝘴\n`;
			msg += ``;
			msg += `💬𝗚𝗢𝗔𝗧𝗕𝗢𝗧 𝘝2:\n≛𝙇𝙀𝙉𝙄-𝘽𝙊𝙏≛ owner:\n➠https://www.facebook.com/more.sidibe.1`;


			const helpListImages = [
				"https://i.imgur.com/8d6WbRJ.gif"
			];


			const helpListImage = helpListImages[Math.floor(Math.random() * helpListImages.length)];


			await message.reply({
					body: msg,
					attachment: await global.utils.getStreamFromURL(helpListImage)
			});
	} else {
			const commandName = args[0].toLowerCase();
			const command = commands.get(commandName) || commands.get(aliases.get(commandName));

			if (!command) {
				await message.reply(`Command "${commandName}" not found.`);
			} else {
				const configCommand = command.config;
				const roleText = roleTextToString(configCommand.role);
				const author = configCommand.author || "Unknown";

				const longDescription = configCommand.longDescription ? configCommand.longDescription.en || "No description" : "No description";

				const guideBody = configCommand.guide?.en || "No guide available.";
				const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);

				const response = `╭── NAME ────⭓
	│ ${configCommand.name}
	├── INFO
	│ Description: ${longDescription}
	│ Other names: ${configCommand.aliases ? configCommand.aliases.join(", ") : "Do not have"}
	│ Other names in your group: Do not have
	│ Version: ${configCommand.version || "1.0"}
	│ Role: ${roleText}
	│ Time per command: ${configCommand.countDown || 1}s
	│ Author: ${author}
	├── Usage
	│ ${usage}
	├── Notes
	│ The content inside <XXXXX> can be changed
	│ The content inside [a|b|c] is a or b or c
	╰━━━━━━━❖`;

				await message.reply(response);
			}
		}
	},
};

function roleTextToString(roleText) {
	switch (roleText) {
		case 0:
			return "0 (All users)";
		case 1:
			return "1 (Group administrators)";
		case 2:
			return "2 (Admin bot)";
		default:
			return "Unknown role";
	}
}
