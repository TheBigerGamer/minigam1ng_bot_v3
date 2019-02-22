exports.run = async (client, message, [Amount, user]) => {
    message.delete();
    let messagecount = Number(Amount);

    if (user) { 
        user = client.funcs.userSearch(client, message, user);
        if (user.username === null) {
            const embed = new client.methods.Embed()
                .setTimestamp()
                .setAuthor(message.guild.name, message.guild.iconURL())
                .addField(":x: Player não encontrado! :x:");
            return message.channel.send({embed});
        }
    }
    
    if (!Amount || (2 > Amount) || (Amount > 99)) { return message.reply("Não me deste um número entre 2 e 99 de mensagens para fazer delete!"); }
  
    if (message.channel.permissionsFor(message.author.id).has("MANAGE_MESSAGES") === false) { 
      const embed = new client.methods.Embed()
        .setColor("#FF0000")
        .setTimestamp()
        .setTitle("❌ ERRO: FALTA DE PERMISSÕES! ❌")
        .setDescription("Não tens permissões suficientes para eecutares este comando!");
      return message.channel.send({embed});  
    }

    message.channel.messages.fetch({ limit: messagecount }).then((messages) => {
        if (user) {
            message.delete();
            const filterBy = user ? user.id : client.user.id;
            messages = messages.filter(m => m.author.id === filterBy).array().slice(0, Amount);
            var extra = `by ${user.tag} `;
        }

        message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
        return message.reply(`Limpas ${Amount} mensagens ` + (extra || "") + "deste canal.");
    });
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 2,
    botPerms: ["MANAGE_MESSAGES"],
    requiredFuncs: ["userSearch"],
    cooldown: 30,
};
      
exports.help = {
    name: "purge",
    description: "Elimina X mensagens de um canal.",
    usage: "[Amount:int] [user:str]",
    usageDelim: " ",
    extendedHelp: "Devido a limitações, o purge só pode eliminar mensagens entre 2 e 99. Se queres eliminar mais, por favor espera que o cooldown acabe (30 segundos) e fa-lo outra vez."
};
