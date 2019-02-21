exports.run = (client, message, [msg]) => { 
    if (!msg) { return message.reply("You need to provide a message."); }
    
    message.delete().catch();
    if (message.author.id === client.owner.id) { return message.channel.send(msg); }
    return message.channel.send(`${message.author.username} (${message.author.id}) quis dizer: ${msg}`);
};
  
exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["echo", "talk"],
    permLevel: 0,
    botPerms: [],
};
  
exports.help = {
    name: "say",
    description: "Faz o Winston dizer o que queres.",
    usage: "[msg:str]",
};
