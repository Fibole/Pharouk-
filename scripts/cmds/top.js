module.exports = {
 config: {
 name: "top",
 version: "1.0",
 author: "Loid Butter",
 role: 0,
 shortDescription: {
 en: "Top 100 Rich Users"
 },
 longDescription: {
 en: ""
 },
 category: "group",
 guide: {
 en: "{pn}"
 }
 },
 onStart: async function ({ api, args, message, event, usersData }) {
 const allUsers = await usersData.getAll();
 
 const topUsers = allUsers.sort((a, b) => b.money - a.money).slice(0,10);
 
 const topUsersList = topUsers.map((user, index) => `${index + 1}. 𝗠𝗔𝗦𝗧𝗘𝗥 : ${user.name}✦: 
 𝗕𝗔𝗟: ${user.money}💰`);
 
 const messageText = ` 𝗧𝗢𝗣 𝗥𝗘𝗖𝗛𝗘𝗦𝗧»🌐\n\n ${topUsersList.join('\n')}

  𝗕𝗢𝗧»𝗔𝗗𝗠𝗜𝗡 𝗣𝗛𝗔𝗥𝗢𝗨𝗞 `;

 message.reply(messageText);
 }
};
