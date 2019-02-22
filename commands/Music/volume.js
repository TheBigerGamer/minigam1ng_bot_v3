exports.run = async (client, msg, [volume]) => {
  if (!msg.guild.voiceConnection) { throw "Não estou conectado a um canal de voz, por favor dá-me algumas músicas para misturar primeiro!"; }
  const handler = client.queue.get(msg.guild.id);
  if (!handler || handler.playing === false) { throw "É dificil ajustar o volume se eu não estou a tocar nada..."; }

  const dispatcher = msg.guild.voiceConnection.dispatcher;

  if (!volume) { return msg.send(`📢 Volume: ${Math.round(dispatcher.volume * 50)}%`); }
  if (volume === 0) { return msg.send("Se não me queres ouvir, mais vale me calares."); }
  if (volume > 100) { return msg.send("100% é o máximo. Tu não podes dar 110% com este bot."); }

  var emote = (volume < (dispatcher.volume * 50)) ? ["🔉", "Diminuindo"] : ["🔊", "Aumentando"];

  dispatcher.setVolume(Math.min(volume) / 50, 2);
  msg.send(`${emote[0]} ${emote[1]} the volume! Volume: ${Math.round(dispatcher.volume * 50)}%`);
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: ["vol"],
  permLevel: 0,
  botPerms: []
};

exports.help = {
  name: "volume",
  description: "Ajusta o volume das músicas.",
  usage: "[volume:int]"
};
