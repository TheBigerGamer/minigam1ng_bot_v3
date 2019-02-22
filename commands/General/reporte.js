const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("./assets/data/score.sqlite");
const reportChannel = require("../../assets/settings.json").owner.channels.report;

exports.run = async (client, msg) => {   
    const reports = [];
    
    const reportTypes = {
        issue: ["Problema", 0xFF0000],
        bug: ["Bug", 0xFFFF00],
        improvement: ["Melhoramento", 0xFFA500],
        suggestion: ["Sugestão", 0xFFA500],
        complaint: ["Complemento", 0xDB3E17],
        todo: ["A fazer", 0x04d5fd]
    };

    const text = [
        "Muito bem. Sejamos diretos. 1ª Quetão: Que tipo de problema é esse?\nPor favor responde `issue`, `bug`, `complaint`, `suggestion`, ou `improvement`",
        "Next: Please provide a decently sized message explaining the item."
    ];

    const issue = [
        "Parece que pensaste demasiado tempo. Quando tiveres pronto, tenta outra vez!",
        "Dá-me uma descrição a tempo. Recomendo esncurtares a descrição ou copia-la e cola-la, para não tentares escrever muito rápidamente."
    ];

    await msg.reply("Vou-te perguntar algumas coisas no privado.");
    await msg.author.send(text[0]).then(() => {
        msg.author.dmChannel.awaitMessages(m => m.content, { max: 1, time: 160000, errors: ["time"], }).then((collected) => {
            var type = collected.first().content;
            if (type.toLowerCase() !== reportTypes[type.toLowerCase()][0].toLowerCase()) { return msg.author.send("Deste-me um tipo de problema desconhecido. Tenta outra vez com um tipo válido."); }
            if (reportTypes[type.toLowerCase()][0] === "Todo" && msg.author.id !== client.owner.id) { return msg.author.send("Não podes mandar reportes do tipo 'a fazer'. Apenas o Bot Manteiner e os MASTER podem."); }
            
            reports.push(reportTypes[type.toLowerCase()]);
            msg.author.send(text[1]).then(() => {
                msg.author.dmChannel.awaitMessages(m => m.content, { max: 1, time: 130000, errors: ["time"], }).then((collected) => {
                    reports.push(collected.first().content);
                    db.get("SELECT reportNumber FROM stats WHERE statName = 'general'", [], (err, row) => {
                        if (err) { return console.log(err); }
                        
                        const embed = new client.methods.Embed()
                            .setTimestamp()
                            .setColor(reports[0][1])
                            .setTitle(`${reports[0][0]} Reporte: ${row.reportNumber}`)
                            .setDescription(reports[1])
                            .setFooter(`Reportado por: ${msg.author.tag} de ${msg.channel.guild.name}`, msg.author.displayAvatarURL());
    
                        const DMembed = new client.methods.Embed()
                            .setColor(0x00AE86)
                            .setTimestamp()
                            .setDescription(`**Número de Reporte:** ${row.reportNumber} \n**Problema:** ${reports[1]} 
                            \nO teu reporte foi enviado! Mais alguma questão, pergunte aos MASTERs ou a DarkenLight Mage#2401!`);
   
                        db.run(`UPDATE stats SET reportNumber = ${row.reportNumber + 1} WHERE statName ="general"`); 
                        client.channels.get(reportChannel).send({embed});
                        msg.author.send({embed: DMembed});       
                    });
                    db.close();
                }).catch(() => { msg.author.send(issue[1]); }); 
            });
        }).catch(() => { msg.author.send(issue[0]); }); 
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
    name: "reporte",
    description: "Faz um reporte para o desenvolvedor do bot. (ie: Bug, problema, complemento)",
    usage: "",
    extendedHelp: "Winston vai-te perguntar algumas coisa no privado. Verifica se tens o privado aberto e pronto para responderes!"
};
