exports.run = (client, message, sides) => {
    if (sides.length < 1) { sides = 6; }
    if (sides === 0) { return message.channel.send("Não podes rodar pelo 0!"); }

    if (Number.isInteger(Number(sides))) { 
        var y = Math.floor(Math.random() * (Math.floor(sides) - Math.ceil(1) + 1)) + Math.ceil(1);
        return message.channel.send(`🎲 Rodaste um ${y}! 🎲`);
    } else {
        return message.channel.send("Parece que adicionaste letras ao teu número. Por favor tenta outra vez!");
    }    
 };

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
};
  
exports.help = {
    name: "roda-dado",
    description: "Roda um dado!",
    usage: "[sides:str]",
    usageDelim: "",
};
