exports.run = async (client, msg) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./assets/data/inventory.sqlite");
    const items = require("../../../assets/values/items.json");

    client.funcs.transactions(msg, {credit: [1, "-", 11]}, function(data) {
        if (data.valid === false) { return; }

        db.get(`SELECT * FROM material WHERE userId = "${msg.author.id}"`, [], (err, row) => {
            if (err) { return console.log(err); }
            var die = Math.random();
    
            const Fisher = [
                ["porra", "peixe", "caranguejo", "lula (da Silva)", "tubarão"],
                [0, row.fish, row.crab, row.squid, row.shark]
            ];
    
            if (die < .5) { var results = 0; } 
            else if (die < .75) { var results = 1; } 
            else if (die < .88) { var results = 2; } 
            else if (die < .98) { var results = 3; } 
            else { var results = 4; }
    
            var kind = Fisher[0][results];
            var result = (kind === "porra") ? "Perdeu 10 créditos" : "Puseste peixe no teu inventário";
    
            if (kind !== "trash") { db.run(`UPDATE material SET ${kind} = ${Number(Fisher[1][results]) + 1} WHERE userId = ${msg.author.id}`); }
    
            msg.channel.send(`${msg.author.username}, apanhaste ${items[kind].emote}. ${result}.`);
        });
        db.close();
    });
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    cooldown: 30
};
  
exports.help = {
    name: "pesca",
    description: "Pesca e tenta encontrar uma fortuna!",
    usage: "",
    extendedHelp: "Gasta 10 créditos e tenta encontrar uma fortuna!"
};
