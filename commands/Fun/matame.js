exports.run = function(client, message) {
    message.channel.send(`${message.author.username} morreu.`).then(Message => {
        setTimeout(() => { Message.edit("Respawnando..."); }, 1000);
        setTimeout(() => { Message.edit(`Rescussitação completa. Bem-vondo de volta, ${message.author.username}`); }, 1000);
    });
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["kms"],
    permLevel: 0,
    botPerms: []
};
      
exports.help = {
    name: "matame",
    description: "Mata-te. Agora com respawn grátis!!",
    usage: ""
};
