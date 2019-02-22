exports.run = async (client, message, [...choice]) => {
    var results = Math.ceil(Math.random() * choice.length);
    results = choice[(results - 1)];

    message.channel.send(`${message.author.username}, Acho que **${results}** serão a melhor escolha!`);
};
  
exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
};
    
exports.help = {
    name: "escolha",
    description: "O único que é rápido a fazer escolhas fáceis!",
    usage: "[choice:str] [...]",
    usageDelim: " | ",
    humanUse: "(choice)_(another one)_(etc...)"
};
