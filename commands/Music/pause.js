exports.run = async (client, msg) => {
  if (!msg.guild.voiceConnection) { throw `Não estou a transmitir nada (que seca). Dá-me algumas musicas para misturar com ${msg.guild.settings.prefix}queueadd`; }
  if (msg.guild.voiceConnection.dispatcher.paused) { return msg.send("A transmissão já está pausada, baka!"); }

  msg.guild.voiceConnection.dispatcher.pause();
  return msg.send("⏸ A mistura está agora pausada. Alto e pára o baile!");
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
  name: "pause",
  description: "Pausa a playlist.",
  usage: "",
  usageDelim: "",
  extendedHelp: "",
};
