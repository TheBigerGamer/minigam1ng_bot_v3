exports.run = async (client, message, [songID]) => {
    const voiceChannel = message.member.voiceChannel;
    if (!message.member.voiceChannel) { return message.channel.send("Não estás no canal de voz, baka! Não podes spoilar a lista por detrás da cena!"); }
  
    const handler = client.queue.get(message.guild.id);
    if (!handler) { throw `Hmm... Tentei encontrar a tua lista de músicas, mas ela não está registada. Adiciona algumas com ${message.guild.settings.prefix}add.`; }

    if (Number.isInteger(songID) === false) { return message.channel.send("Só tenho músicas em números inteiros. Volta com um número inteiro, OK?"); }

    songID = songID - 1;
    var title = handler.songs[songID].title;
    handler.songs.splice(songID, 1);
    message.channel.send(`${title} foi removido.`);
};
  
exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: []
};
  
exports.help = {
    name: "remover",
    description: "Remove uma música da lista.",
    usage: "[songID:int]",
};
  
