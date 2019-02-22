const settings = require("../../assets/settings.json")["owner"];

exports.run = async (client, message, [user, type, ...text]) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./assets/data/score.sqlite");

    const embed = new client.methods.Embed()
        .setColor(0x04d5fd)
        .setTimestamp();

    if (user !== undefined && message.author.id === client.owner.id) {
        if (!type) { return message.reply("BAKA! I need a type of an award!Preciso de um tipo de prémio!"); }
        if (!text) { return message.reply("Explica-te nesse tipo de prémio!"); }

        var data = await client.funcs.userSearch(message, {user: [user], tags:["bot"], name: this.help.name});
        
        if (data.valid === false) { return; }

        db.get(`SELECT credits FROM scores WHERE userId = "${data.user[0].id}"`, [], (err, row) => {
            if (err) { return console.log(err); }
            if (!row) { return message.reply("Esse utilizador ainda não reclamou o seu primeiro prémio diáio!"); }
                
            type = type.toLowerCase(); 

            const awards = {
                suggest: ["suggest", settings.awards.suggest],
                bug: ["bug", settings.awards.bug],
                minor: ["minor", settings.awards.minor],
                major: ["major", settings.awards.major]
            };

            let users = ["Overall", data.user[0].id];
            for (var x = 0; x < users.length; x++) {
                db.get(`SELECT ${awards[type][0]} FROM awards WHERE userId = "${users[x]}"`, [], (err, row) => {        
                    db.run(`UPDATE awards SET ${awards[type][0]} = ${Object.values(row)[0] + 1} WHERE userId = "${users[x]}"`);
                });
            };

            embed.setTitle(":tada: Notificação de Prémio! :tada:")
            .addField(`Para ${data.user[0].tag} por ${text.join(" ")}`, `Utilizador foi premiado com ${awards[type][1]} créditos!`)
            .setFooter("Prémio para: " + data.user[0].tag + " (" + data.user[0].id + ") on:", data.user.displayAvatarURL());

            message.reply(data.user[0].ping + `(${data.user[0].id}) foi premiado com ${awards[type][1]} créditos!`);
                    
            client.channels.get(settings.channels.award).send({embed});
            db.run(`UPDATE scores SET credits = ${row.credits + awards[type][1]} WHERE userId = "${data.user[0].id}"`);
        });
    } else {
        db.get("SELECT * FROM awards WHERE userID = 'Overall'", [], (err, row) => {
            if (err) { return console.log(err); }
            settings = settings.awards;
            var sum = row.suggest + row.bugs + row.minor + row.major;
            var reward = (row.suggest * settings.suggest) + (row.bugs * settings.bug) + (row.minor * settings.minor) + (row.major * settings.major);
    
            embed.setTitle(client.user.username + "'s Sistema de Prémios")
                .setDescription(sum + " prémio dado equivale a " + reward + " créditos")
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("Descrição:", "Para aqueles que não se registaram com o comando diário, não há maneira de obterem créditos por prémios. Sugerindo encontrando e reportando erros e problemas com o comando reporte, os players podem ganhar créditos assim que o item é adicionado ou reparado.")
                .addField("Melhoramentos (" + settings.suggest +  "):", row.suggest, true)
                .addField("Bugs (" + settings.bug + "):", row.bugs, true)
                .addField("Problemas menores (" + settings.minor + "):", row.minor, true)
                .addField("Problemas maiores (" + settings.major + "):", row.major, true);    
            message.channel.send({embed});
        });
    }
    db.close();
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: ["userSearch"]
};
  
exports.help = {
    name: "prémio",
    description: "Informação dos prémios dados.",
    usage: "[user:str] [suggest|bug|minor|major] [text:str][...]",
    usageDelim: " ",
    humanUse: " "
};
