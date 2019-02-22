const yt = require("ytdl-core");

exports.run = async (client, msg) => {
  const handler = client.queue.get(msg.guild.id);
  if (!handler) { throw `Adiciona algumas musicas para a lista com ${msg.guild.settings.prefix}queueadd [Youtube URL]`; }
  
  if (!msg.guild.voiceConnection) {
    await client.commands.get("join").run(client, msg);
    if (!msg.guild.voiceConnection) { return; }
    return this.run(client, msg);
  }

  if (handler.playing) { 
    if (msg.member.voiceConnection !== msg.guild.voiceConnection) { throw "Desculpa. Já estou a tocar musica noutro canal de voz no teu server!"; }

    throw "Já estou a tocar nesse canal.";
  } else { handler.playing = true; }
    
  (function play(song) {
    if (song === undefined) {
      return msg.channel.send("Todas as tuas musicas foram agora selecionadas. Vou retirar-me por agora.").then(() => {
      handler.playing = false;
      return msg.member.voiceChannel.leave();
    });
  }
    
  msg.channel.send(`📻 Tocando ${song.requester}'s request: **${song.title}**`).catch(err => client.emit("log", err, "error"));
  
  return msg.guild.voiceConnection.playStream(yt(song.url, { audioonly: true }), { passes: 2 })
    .on("end", () => { setTimeout(() => {
      handler.songs.shift();
      play(handler.songs[0]);
    }, 100); })
  
    .on("error", err => msg.channel.send(`error: ${err}`).then(() => {
      handler.songs.shift();
      play(handler.songs[0]);
    }));
  }(handler.songs[0]));
    
  return null;
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 0,
  botPerms: []
};

exports.help = {
  name: "play",
  description: "Põe a tocar a lista de musicas.",
  usage: "[songURL:str]"
};
