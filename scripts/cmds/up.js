module.exports = {
  config: {
    name: "upt",
    aliases: ["up", "upt"],
    version: "1.0",
    author: "tero bau",
    role: 0,
    shortDescription: {
      en: "Displays the uptime of the bot."
    },
    longDescription: {
      en: "Displays the amount of time that the bot has been running for."
    },
    category: "System",
    guide: {
      en: "Use {p}uptime to display the uptime of the bot."
    }
  },
  onStart: async function ({ api, event, args }) {
    
    const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const days = Math.floor(uptime / (60 * 60 * 24));
    const uptimeString = `${days} 𝗗𝗔𝗬𝗦 ${hours} 𝗛𝗢𝗨𝗥𝗦 ${minutes} 𝗠𝗜𝗡𝗨𝗧𝗘𝗦 ${seconds} 𝗦𝗘𝗖𝗢𝗡𝗗𝘀 🧋`;
    api.sendMessage(`✔ 𝗕𝗢𝗧 𝗨𝗣𝗧𝗜𝗠𝗘»🌐 \n----------------------------------------\n 🕣|${uptimeString} \n----------------------------------------\n≛𝙃𝙐𝙉𝙏𝙀𝙍 𝙇𝙄𝙉𝙀≛ `, event.threadID);
  }
};
