exports.run = async (client, msg, [Name, ID]) => {
    const prefix = msg.guild.settings.prefix || client.config.prefix;

    msg.delete(); 
    if (!Name) { return msg.channel.send("Precisas do nome do emoji para o pesquisares, baka!"); }
    if (msg.content.slice(prefix.length).startsWith("react") && (!ID)) {
        return msg.channel.send("Precisas de especificar o ID da mensagem para eu a encontrar!").then(msg => { setTimeout(() => { msg.delete(); }, 4000); }); 
    }

    let emotes = Array.from(client.emojis);
    let emoji = emotes.filter((element) => {
        if (element[1].name === Name) { return element; }
    });
    var type = emoji[0][1].animated === true ? "gif" : "png";

    if (msg.content.slice(prefix.length).startsWith("react")) {
        msg.channel.messages.fetch(ID).then(msg => msg.react(client.emojis.get(emoji[0][0]))); 
    } else { msg.channel.send({files: [`https://cdn.discordapp.com/emojis/${emoji[0][0]}.${type}`]}); }
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["see", "emote", "react"],
    permLevel: 0,
    botPerms: ["ATTACH_FILES", "ADD_REACTIONS", "MANAGE_MESSAGES"]
};
  
exports.help = {
    name: "emoji",
    description: "Mostra um emoji.",
    usage: "[Name:str] [messageID:str]",
    usageDelim: " ",
    extendedHelp: "Coloca-te na piscina de emojis de outros servers! Usa a imagem grande ou usa o alias de uma reação e adiciona o ID de uma mensagem para reagir!",
    humanUse: "(name)_([If reacting] messageID)"
};
