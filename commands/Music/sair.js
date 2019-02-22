exports.run = async (client, message) => {
    if (!message.member.voiceChannel) { return message.channel.send("Tu não estás no meu canal de voz! Por isso cala-te!"); }
  
    message.member.voiceChannel.leave();
    return message.channel.send(`I have left ${message.member.voiceChannel}.`);
  };
  
  exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
  };
  
  exports.help = {
    name: "sair",
    description: "Sai do CV em que estás.",
    usage: "",
    usageDelim: "",
  };
  
