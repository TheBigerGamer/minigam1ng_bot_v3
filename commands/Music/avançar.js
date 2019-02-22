exports.run = async (client, msg) => {
  if (!msg.guild.voiceConnection) { throw "Não estou conectado a um canal de voz, por favor dá-me algumas músicas para misturar primeiro!"; }
  if (msg.member.voiceConnection !== msg.guild.voiceConnection) { throw "Não podes avançar uma música que não estás a ouvir!"; }

  msg.guild.voiceConnection.dispatcher.end();
  msg.send("⏭ Avançada a música atual.");
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 0,
  botPerms: []
};

exports.help = {
  name: "avançar",
  description: "Avança a música atual.",
  usage: ""
};
