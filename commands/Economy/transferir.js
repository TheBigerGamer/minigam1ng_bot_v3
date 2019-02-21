exports.run = async (client, msg, [user, credit]) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./assets/data/score.sqlite");

    var data = await client.funcs.userSearch(msg, {user: [user], tags:["bot"], name: this.help.name});
    if (data.valid === false) { return; }
    user = data.user[0];

    if (user.id === msg.author.id) { return msg.channel.send("Porque é que estás a tentar transferir dinheiro para ti? Acho que estás sozinho na vida."); }

    db.get(`SELECT credits FROM scores WHERE userId = "${msg.author.id}"`, [], (err, row) => {
        if (err) { return console.log(err); }
        if (!row) { return msg.reply("Tu ainda não te registaste e recebeste os teus créditos! D: Usa `//daily` (Prefixo original) para ganhares os teus primeiros créditos."); } 
        if (row.credits < credit) { return msg.reply("Não tens créditos suficientes, ò pá!"); }
            
        db.get(`SELECT credits FROM scores WHERE userId = "${user.id}"`, [], (err, row) => {
            if (!row) { return msg.reply("Esse player aninda não reclamou os seus primeiros créditos!"); }
            db.run(`UPDATE scores SET credits = ${Number(row.credits) + credit} WHERE userId = ${user.id}`);
        });

        db.run(`UPDATE scores SET credits = ${Number(row.credits) - credit} WHERE userId = ${msg.author.id}`); 
    });
    db.close();

    msg.reply(`Tu deste ${credit} créditos ao player: ${user.prefered}`);
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: ["userSearch"],
    cooldown: 10,
};
  
exports.help = {
    name: "transferir",
    description: "Dá a alguém alguns créditos teus.",
    usage: "[user:str] [credit:int]",
    usageDelim: " ",
    humanUse: "(Required: User)_(Required: Credit)"
};
