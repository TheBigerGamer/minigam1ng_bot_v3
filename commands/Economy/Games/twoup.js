exports.run = async (client, msg, [bet]) => {
    let rolls = [];
    for (var z = 0; z < 7; z++) {
        var x = (Math.random() > .5) ? "cara" : "coroa";
        rolls.push(x);
    }

    let fact = [];
    for (var y = 0; y < 7; y++) {
        if (rolls[y] === rolls[y + 1] && rolls[y] === "cara") { var result = ["won", 1.4]; break; }
        else if (rolls[y] !== rolls[1]) { fact.push(true); }
        else if (y === 6) { var result = fact.includes(false) ? ["lost", -1] : ["won", 2]; } 
        else { fact.push(false); }
    }

    client.funcs.transactions(msg, {credit: [bet, "*", result[1]]}, function(data) {
        if (data.valid === false) { return; }

        msg.channel.send(`**Moedas:** ${rolls.join(", ")}\nTu tens ${result[0]} ${Math.abs(data.earnings)} créditos.`); 
    });
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["two-up"],
    permLevel: 0,
    botPerms: []
};

exports.help = {
    name: "twoup",
    description: "Aposta no cara-coroa. Obtém duas caras seguidas e ganha... Ou reza para que saiam todos ímpares!",
    usage: "[bet:int]",
    extendedHelp: "Two-up é um jogo típico Autraliano, envolvendo um designado 'spinner' atira duas moedas ao ar. Os Players apostam no que quiserem em que as moedas vão cair com ambas as caras para cima, ambas coroa, ou uma cara e uma coroa (conhecido como 'odds'). É tradicionalmente jogado no Anzac Day nos pubs e clubes em todo o lado na Australia, em parte para marcar uma experiencia partilhada com Diggers ao longo dos anos.",
    humanUse: "(Amount)"
};
