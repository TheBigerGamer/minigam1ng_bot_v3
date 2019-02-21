exports.run = async (client, msg, [item, amount]) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./assets/data/inventory.sqlite");
    let object = require("../../../assets/values/items.json")[item.toLowerCase()];
    if (!object) { return msg.channel.send("That item does not exist."); }
    
    db.get(`SELECT ${object.name} FROM ${object.category[0]} WHERE userId = "${msg.author.id}"`, [], (err, row) => {
        if (err) { return console.log(err); }
        if (!row) { return msg.reply("Ainda não reclamaste os teus créditos diários!"); }
        amount = (amount === undefined) ? Object.values(row)[0] : amount;
        if (amount > row) { return msg.channel.send("Não tens assim tantos " + object.name + ", baka!"); }
        
        db.run(`UPDATE ${object.category[0]} SET ${object.name} = ${Object.values(row)[0] - amount} WHERE userId = "${msg.author.id}"`);

        client.funcs.transactions(msg, {credit: [1, "+", (object.price[1] * amount)]}, function(data) {
            if (data.valid === false) { return; }
    
            msg.channel.send("Vendeste " + amount + " " + object.name + " por " + data.earnings + " créditos.");
        });
    });
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
};
  
exports.help = {
    name: "vender",
    description: "Vende os teus items",
    usage: "<item:str> [amount:int]",
    usageDelim: " "
};
