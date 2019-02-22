exports.run = async (client, msg) => {
  if (!msg.guild.voiceConnection) { throw "Não estou conectado a um canal de voz, por favor adiciona algumas músicas aà lista"; }
  if (msg.guild.voiceConnection.dispatcher.paused === false) { return msg.send("A música não está pausada, baka!"); }

  msg.guild.voiceConnection.dispatcher.resume();
  msg.send("▶ Agora retomando a transmição. Que a festa continue!");
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 0,
  botPerms: []
};

exports.help = {
  name: "retomar",
  description: "Retoma a playlist.",
  usage: ""
};
