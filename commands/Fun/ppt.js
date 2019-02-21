exports.run = async (client, msg, [choice, user]) => {
    if (!user) { user = client.user.id; }  
    var data = await client.funcs.userSearch(msg, {user: [null, user], name: this.help.name});
    
    if (data.valid === false) { return; }
    if (data.user[1].id === msg.author.id) { msg.channel.send("Hey! Não podes jogar pedra-papel-tesoura sozinho! Convida alguém ou joga comigo!"); }
        
    var types = ["rock", "paper", "scissors"];
    var hand = types[Math.floor(Math.random() * (Math.floor(2) - Math.ceil(1) + 1)) + Math.ceil(1)];

    if ((choice === "pedra" && hand === "tesoura") || (choice === "papel" && hand === "pedra") || (choice === "tesoura" && hand === "papel")) { var result = `**${data.user[0].prefered} venceu!**`; } 
    else if ((choice === "pedra" && hand === "papel") || (choice === "papel" && hand === "tesoura") || (choice === "tesoura" && hand === "pedra")) { var result = `**${data.user[1].prefered} venceu!**`; }
    else { var result = "**EMPATE!**"; }

    msg.channel.send(`${data.user[0].prefered} jogou ${choice}! ${data.user[1].prefered} jogou ${hand}! ${result}`);
};
    
exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: ["userSearch"],
};
    
exports.help = {
    name: "ppt",
    description: "Joga pedra, papel, tesoura!",
    usage: "<paper|scissors|rock> [user:str]",
    usageDelim: " ",
    humanUse: "(papel|tesoura|pedra)_(user)"
};
