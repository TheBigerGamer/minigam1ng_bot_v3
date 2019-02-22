exports.run = async (client, message) => {
  const voiceChannel = message.member.voiceChannel;
  if (!message.member.voiceChannel) { return message.channel.send("Não estás num canal de voz, baka! Não me forces a estar sozinho!"); }

  const permissions = message.member.voiceChannel.permissionsFor(message.guild.me);
  if (permissions.has("CONNECT") === false) { return message.channel.send(":x: Não tenho permissões suficientes."); }
  if (permissions.has("SPEAK") === false) { return message.channel.send("Wow. Convida-me a tocar musica para ti, já que não posso falar. Tu não tens coração. Dá-me permissões para falar no canal e depois logo se vê."); }

  message.member.voiceChannel.join();
  return message.channel.send(`Agora sintonizado no: ${message.member.voiceChannel}. Pronto e à espera de ordens!`);
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
  name: "entrar",
  description: "Entra no CV em que estás.",
  usage: "",
  usageDelim: "",
};
