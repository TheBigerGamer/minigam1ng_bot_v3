exports.run = async (client, message, [args]) => {
    let response = ["Sim", "Talvez", "Não", "Tenta depois", "Possivelmente", "Absolutamente", "Provavelmente não", "Outcome is looking good", "O oráculo não parece promissor", "As estrelas dizem que sim"];

    message.channel.send(`${response[~~(Math.random() * response.length)]}, ${message.author.username}.`);    
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: []
};
      
exports.help = {
    name: "8ball",
    description: "Pergunta à mágica 8ball e vê a resposta!",
    usage: "[args:str][...]"
};
