exports.run = async (client, msg, [user]) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./assets/data/score.sqlite");

    var data = await client.funcs.userSearch(msg, {user: [user], tags:["bot"], name: this.help.name});
    if (data.valid === false) { return; }

    db.get(`SELECT * FROM scores WHERE userId = "${data.user[0].id}"`, [], (err, row) => {
        if (err) { return console.log(err); }
        if (!row) { return msg.reply("That person hasn't signed up with `m~daily` yet! D:"); } 

        let time = [((Date.now() - row.daily) / 86400000), ((Date.now() - row.repDaily) / 86400000)];
        for (var x = 0; x < 2; x++) {
            if (time[x] >= 14) { time.push((time[x]/7).toFixed(2) + " weeks"); }
            else if (time[x] >= 1) { time.push(time[x].toFixed(2) + " days"); }
            else { time.push((time[0] * 24).toFixed(2) + " hours"); }
        }
        
        client.users.fetch(data.user[0].id).then(avatar => {
            const embed = new client.methods.Embed()
                .setTimestamp()
                .setFooter(msg.guild.name, msg.guild.iconURL())
                .setThumbnail(avatar.displayAvatarURL())
                .setColor(0x04d5fd)
                .setAuthor(`User: ${data.user[0].username}`, avatar.displayAvatarURL())
                .setDescription(`ID: ${data.user[0].id}`)
                .addField("Creditos:", (row.credits).toLocaleString() + " (Último claim: " + time[2] + " atrás)")
                .addField("Reputação:", row.rep + " (Última Reputação: " + time[3] + " atrás)");
        
            msg.channel.send({embed});
        });
    });
    db.close();
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["bal", "credits", "profile"],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: ["userSearch"]
};
  
exports.help = {
    name: "balance",
    description: "Vê o teu dinheiro e a última zez que recalamate o teu dinheiro diário.",
    usage: "[user:str]",
    humanUse: "(user)"
};
