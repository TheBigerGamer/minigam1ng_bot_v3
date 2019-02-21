const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("./assets/data/score.sqlite");

exports.run = async (client, msg, [user, ...note]) => {
    var data = await client.funcs.userSearch(msg, {user: [user], tags:["bot"], name: this.help.name});
    if (data.valid == false) { return; }
        
    user = data.user[0];
    if (user.id === msg.author.id) { return msg.channel.send("Não podes dar rep a ti mesmo! Isso é como dizer que tu queres contratar-me para a tua planta nuclear porque eu sou um estudante universitário!"); }
    var mention = note ? user.tag : user.ping; 

    db.get(`SELECT repDaily, rep FROM scores WHERE userId = "${msg.author.id}"`, [], (err, row) => {
        if (err) { return console.log(err); }
        if (!row) { return msg.reply("You have not redeemed your first daily yet!"); }
        if ((Number(row.repDaily) + 86400000) > Date.now()) { return msg.reply("Já deste rep a alguém hoje!"); }
        
        db.get(`SELECT rep FROM scores WHERE userId = "${user.id}"`, [], (err, row) => {
            if (!row) { return msg.channel.send("Esse player ainda não reclamou a sua rep diária, por isso não pode receber rep de outros de momento. :cry:"); } 
            
            db.run(`UPDATE scores SET rep = ${row.rep + 1} WHERE userId = ${user.id}`);
            db.run(`UPDATE scores SET repDaily = ${Date.now()} WHERE userId = ${msg.author.id}`);
            if (note.trim().length > 0) { user.send("Entrega aqui! Alguém adicionou uma nota com a rep!\n\n" + note.join(" ") + "\n-" + msg.author.tag); } 
            msg.channel.send("Deste " + mention + " um ponto de reputação!");
        });
    });
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
    name: "rep",
    description: "Dá a alguém um ponto de reputação!",
    usage: "[user:str] [note:str][...]",
    usageDelim: " ",
    humanUse: "(Required: User)_(Note)"
};
