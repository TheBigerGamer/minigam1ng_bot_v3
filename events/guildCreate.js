exports.run = async (client, guild) => {
    const embed = new client.methods.Embed()
        .setTimestamp()
        .setColor(0xF1C40F)
        .addField("Aos players de " + guild.name, `Olá mundo! O meu nome é ${client.user.username} e obrigado por me adicionares ao teu server! Eu sou muito útil e um fabtástico bot criado usando Komada, um framework do Discord.js. Para ver como é que eu posso ser util, usa ${client.config.prefix}help.` + "Eu vou-te mostra o meu menu de ajuda com os meus comandos, digo-o eu mesmo!\nSe tens ideias sobre melhoramentos, encontrate problemas ou bugs, ou tens algum complemento, usa o meu comando de reporte e faz o meu criador ser avisado!");

    let channel = client.funcs.defaultChannel(client, guild.id);
    if (guild.available) { client.settings.guilds.create(guild).catch(e => client.emit("log", e, "error")); }

    const msg = await channel.send({embed});
    var data = msg.channel.guild.members.find("id", client.owner.id);
    if (data !== null) { channel.send(`Oh! こんにちは <@${client.owner.id}>. Pronto para trabalhar! Vê-me excel! :thumbsup:`); }
};
