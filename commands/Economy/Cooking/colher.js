exports.run = async (client, msg) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./assets/data/inventory.sqlite");
    const items = require("../../../assets/values/items.json");

    client.funcs.transactions(msg, {credit: [1, "-", 11]}, function(data) {
        if (data.valid === false) { return; }
    });

    db.get(`SELECT * FROM material WHERE userId = "${msg.author.id}"`, [], (err, row) => {
        var die = Math.random();

        const itemName = [
            ["maça_verde", "maça", "limão", "batata", "pão", "arroz", "ovo", "chocolate"],
            [row.greenapple, row.apple, row.lemon, row.potato, row.rice, row.egg, row.bread, row.chocolate]
        ];

        if (die < .06) { var results = 0; } 
        else if (die < .12) { var results = 1; }
        else if (die < .24) { var results = 2; } 
        else if (die < .36) { var results = 3; } 
        else if (die < .48) { var results = 4; } 
        else if (die < .6) { var results = 5; }
        else if (die < .80) { var results = 6; }
        else { var results = 7; }

        var item = items[itemName[0][results]];
        var amount = Number(itemName[1][results]) + 1;

        var name = (item.name === "maça_verde") ? "maça_verde" : item.name;

        db.run(`UPDATE material SET ${name} = ${amount} WHERE userId = ${msg.author.id}`);
                
        return msg.channel.send(`${msg.author.username}, encontraste ${item.emote}. O item foi colocado no teu inventário.`);
    });
    db.close();
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    cooldown: 30,
};
  
exports.help = {
    name: "colher",
    description: "Colhe frutos e outros materiais para cozinhar!",
    usage: "",
};
