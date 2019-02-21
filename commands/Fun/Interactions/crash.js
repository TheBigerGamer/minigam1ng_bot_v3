exports.run = async (client, message) => {
    message.channel.send(`Wow. Isso é horrivel vindo de ti, ${message.author.username}. Só estou aqui para fazer amigos, e tu queres desligar-me. És mau!`);
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: []
};
      
exports.help = {
    name: "crash",
    description: "👀 Tenta. Desafio-te.",
    usage: ""
};
