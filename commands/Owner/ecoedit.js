exports.run = async (client, message, [member, option, amount]) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./assets/data/score.sqlite");

    var data = await client.funcs.userSearch(message, {user: [member], tags: ["bot"], name: this.help.name});
    if (data.valid === false) { return; }

    db.get(`SELECT * FROM scores WHERE userId = "${data.user[0].id}"`, [], (err, row) => {
        if (err) { return console.log(err); }
        if (!row) { return message.reply("Esse player não tem dados na base de dados."); }
        else {
            db.run(`UPDATE scores SET ${option} = ${amount} WHERE userId ="${data.user[0].id}"`);
            return message.reply(`Tabela atualizada. Eu atualizei a tabela, por isso a  ${option} de ${user.prefered} foi mudada para ${amount}!`);
        }
    });
    
    if (user.bot === true) { return message.reply("Não podes mudar ou adicionar dados a um bot user!"); }
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 10,
    botPerms: [],
    requiredFuncs: ["userSearch"],
};
  
exports.help = {
    name: "ecoedit",
    description: "Edita os valores de economia de um utilizador.",
    usage: "[member:str] [option:str] [amount:int]",
    usageDelim: " ",
};
