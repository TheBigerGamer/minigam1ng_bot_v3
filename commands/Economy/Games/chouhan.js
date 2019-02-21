exports.run = async (client, msg, [bet, credit]) => {
    let rolls = [];
    for (var z = 0; z < 6; z++) { rolls.push(Math.floor(Math.random() * (Math.floor(6) - Math.ceil(1) + 1)) + Math.ceil(1)); }

    var sum = rolls[0] + rolls[1] + rolls[2] + rolls[3] + rolls[4] + rolls[5];

    if ((sum%2 === 0 && bet === "even") || (sum%2 !== 0 && bet === "odd")) { var result = ["won", 1.5]; } 
    else { var result = ["lost", -1]; }

    client.funcs.transactions(msg, {credit: [credit, "*", result[1]]}, function(data) {
        if (data.valid === false) { return; }

        msg.channel.send(`**Sum:** ${sum} \n**Adivinhaste:** ${bet} \n*Ganhaste ${result[0]} ${Math.abs(data.earnings)} créditos.*`);
    });
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["chō-han", "chōhan", "chou-han"],
    permLevel: 0,
    botPerms: []
};
  
exports.help = {
    name: "chouhan",
    description: "Aposta os teus créditos num jogo de seis dados.",
    usage: "<even|odd> [credits:int]",
    usageDelim: " ",
    extendedHelp: "Um jogo Japones simples. Seis dados são atirados e o resultado é mantido em segredo. Os Players apostam se é odd ou even.",
    humanUse: "(even|odd)_(amount)"
};
