exports.run = async (client, msg, user) => {
    var data = await client.funcs.userSearch(msg, {user: [user], name: this.help.name});
    
    if (data.valid === false) { return; }

    if (data.user[0].id === client.user.id) { return msg.channel.send(`Porque tentarias fazer-me saudar-me a mim mesmo, ${msg.author.username}? Não sou assim tão solitário!`); }

	msg.channel.send(`Olá ${data.user[0].prefered}! `);
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: ["userSearch"]
};

exports.help = {
  name: "saudar",
  description: "Faz o Winston saudar alguem com um olá!",
  usage: "[user:str]"
};
