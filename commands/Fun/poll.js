exports.run = async (client, msg, [question, ...option]) => {
    if (!question) { return msg.reply("O que é que vais perguntar? O nada não serve!"); }
    else if (option.length < 2) { return msg.reply("Dá pelo menos duas opções!"); }
    else if (option.length > 25) { return msg.reply("EH LÁ! Ganda lista de opções! Menos, por favor!"); }

    var emote = ["✅", "❎", "☑", "✔", "❌", "✖", "⭕", "🔘"];

    msg.delete().catch();
    const embed = new client.methods.Embed()
        .setColor("#FFFFFF")
        .setTimestamp()
        .setDescription(`Uma pergunta foi feita por ${msg.author.username}!`)
        .addField("Question: ", `${question}`);

    for (var x = 0; x < option.length; x++) { embed.addField(`Option ${x + 1} - ${emote[x]}:`, option[x]); }

    const message = await msg.channel.send({embed});
    for (var x = 0; x < option.length; x++) { message.react(emote[x]); }
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
};
  
exports.help = {
    name: "poll",
    description: "Faz questões aos players.",
    usage: "[question:str] [option:str][...]",
    usageDelim: " | ",
    humanUse: "(question)_(option1)_(option2)_(etc...->option5)"
};
