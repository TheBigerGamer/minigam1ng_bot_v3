exports.run = async (client, message) => {
    return message.send(`O meu convite do Discord para o server oficial: <${client.invite}> 
    \nNo link acima é requestado o minimo de permissões necessárias para executar todos os meus comandos. Se há um comando que requer uma certa permissão que não está selecionada, eu avisarei que algo está errado. :smile:`);
};
  
exports.conf = {
    enabled: true,
    runIn: ["text", "dm"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
};

exports.help = {
    name: "convidar",
    description: "Mostra o link do servidor oficial do bot.",
    usage: "",
};
