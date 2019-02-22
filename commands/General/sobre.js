exports.run = async (client, msg) => {
    const config = require("../../assets/settings.json");
    const prefix = msg.guildSettings.prefix || config.prefix;
  
    const embed = new client.methods.Embed()
        .setColor(0x37FDFC)
        .setTimestamp()
        .setTitle("Sobre Winston")
        .setDescription(`Sou um grande ajudante (*ás vezes.*) e um bot fantástico! Usando ${prefix}help é bom para eu poder arranjar maneiras de te ajudar. Fui escrito em Komada, um framework do Discord.js.
        \n**Origem do Nome:** O típico nickname do DarkenLight Mage#2401 é TheBiger. 'O Maior' traduzido para português. O meu nome vem de um antigo 1º Ministro do Reino Unido, Winston Churchill *(DarkenLight Mage#2401 tende a chamar-lhe 'Ditador')* que foi um grande homem.
        \n**Criação:** Fui criado em ${client.user.createdAt.toLocaleString()} por ${client.owner.tag}. A minha versão atual é ${config.build.version} em vez de ${config.build.releaseDate}.
        \n**Mais informação:** Tenho um repositório no Github que contem o meu tracker de updates e o código fonte com [este link](https://github.com/TheBigerGamer/minigam1ng_bot_v3).`)
        .setThumbnail(client.user.displayAvatarURL());
    msg.channel.send({embed});
};

exports.conf = {
    enabled: true,
    runIn: ["text", "dm"],
    aliases: [],
    permLevel: 0,
    botPerms: []
};
  
exports.help = {
    name: "sobre",
    description: "Informação geral.",
    usage: ""
};
