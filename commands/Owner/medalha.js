exports.run = async (client, message, [member, option, amount]) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./bwd/data/score.sqlite");

    if (member != null) {  
        var user = client.funcs.userSearch(client, message, member); 
        if (user.username === null) { return; }
        if (user.bot === true) { return message.reply("Não podes mudar ou adcionar dados a um bot user!"); }
    } else { return message.reply("Não me deste um player!"); }

    if (!option) { return message.reply("Ouve, para dar nada já bastam os políticos!"); }

    db.get(`SELECT * FROM badges WHERE userId = "${user.id}"`, [], (err, row) => {
        if (err) { return console.log(err); }
        if (!row) { 
            if (option.toLowerCase() === "add") { 
                db.run("INSERT INTO badges (userId, betaTester, bugSmasher) VALUES (?, ?, ?)", [user.id, "no", "no"]);
                return message.reply("Player adicionado à tabela da base de dados. Agora podes recompensa-lo.");
            }
            else { return message.reply("Esse player não tem nenhum dado na base de dados. Por favor tenta outra vez com `//medalha <player> add`"); }
        } else {
            db.run(`UPDATE badges SET ${option} = "${amount}" WHERE userId = "${user.id}"`);
            return message.reply(`Tabela atualizada. Eu atualizei a tabela, por isso o player ${user.username} ganhou o a medalha ${option}!`);
        }
    });
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 10,
    botPerms: [],
    requiredFuncs: [],
};
  
exports.help = {
    name: "medalha",
    description: "Dá a um player uma medalha baseada nos seus esforços.",
    usage: "[member:str] [option:str] [yes|no]",
    usageDelim: " ",
};
