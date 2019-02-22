const moment = require("moment");
require("moment-duration-format");

exports.run = async (client, message) => {
  if (!message.guild.voiceConnection) { return message.channel.send("Como é que eu posso a tocar musica se eu nem estou num canal de som, baka!"); }

  const handler = client.queue.get(message.guild.id);
  if (!handler || handler.playing === false) { return message.channel.send(`Não estou a tocar musica! Adiciona algum em ${message.guild.settings.prefix}`); }
  
  let song = handler.songs[0];
  const embed = new client.methods.Embed()
  .setColor(0x04d5fd)
  .setTimestamp()
  .setTitle(`📻 __${message.guild.name}'s Music Stream__`)
  .setDescription("*Transmitindo todos os teus pedidos da biblioteca do YouTube*")
  .setThumbnail(song.image)
  .addField("**Titulo:**", `[${song.title}](${song.url})`)
  .addField("**Requestado por:**", song.requester, true)
  .addField("**Tempo restante:**", `${moment.duration((handler.songs[0].seconds * 1000) - message.guild.voiceConnection.dispatcher.time).format("h:mm:ss", { trim: false })} out of ` + moment.duration(handler.songs[0].seconds * 1000).format("h:mm:ss", { trim: false }), true);

  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: ["np", "whatsplaying", "whatsplayingfam"],
  permLevel: 0,
  botPerms: []
};

exports.help = {
  name: "nowplaying",
  description: "Vê o que está a dar no CV.",
  usage: ""
};
