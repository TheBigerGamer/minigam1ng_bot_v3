const ms = require("ms");

exports.run = async (client, message, [time, reason]) => {
  if (!client.lockit) { client.lockit = []; }
  let validUnlocks = ["release", "unlock", "u"];
  if (!time) { return message.reply("Preciso de um tempo para bloquear um canal temporáriamente!"); }

  const Lockembed = new client.methods.Embed()
    .setColor(0xDD2E44)
    .setTimestamp()
    .setTitle("🔒 NOTICIA DE LOCKDOWN 🔒")
    .setDescription(`Este canal entrou em lockdown por ${message.author.tag} por ${time}`);
    if (reason != null) { Lockembed.addField("Rasão: ", reason); }

  const Unlockembed = new client.methods.Embed()
    .setColor(0xDD2E44)
    .setTimestamp()
    .setTitle("🔓 NOTICIA DE LOCKDOWN 🔓")
    .setDescription("Este canal foi desbloqueado.");

  if (message.channel.permissionsFor(message.author.id).has("MUTE_MEMBERS") === false) { 
    const embed = new client.methods.Embed()  
      .setColor(0xDD2E44)
      .setTimestamp()
      .setTitle("❌ ERRO: FALTA DE PERMISSÕES! ❌")
      .setDescription("Não tens permissões suficientes para executares este comando!");
    return message.channel.send({embed});  
  }  

  if (validUnlocks.includes(time)) {
    message.channel.overwritePermissions(message.guild.id, { SEND_MESSAGES: null }).then(() => {
      message.channel.send({embed: Unlockembed});
      clearTimeout(client.lockit[message.channel.id]);
      delete client.lockit[message.channel.id];
    }).catch(error => { console.log(error); });
  } else {
    message.channel.overwritePermissions(message.guild.id, { SEND_MESSAGES: false }).then(() => {
      message.channel.send({embed: Lockembed}).then(() => {
        client.lockit[message.channel.id] = setTimeout(() => {
          message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: null
          }).then(message.channel.send({embed: Unlockembed})).catch(console.error);
          delete client.lockit[message.channel.id];
        }, ms(time));
      }).catch(error => { console.log(error); });
    });
  }
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: ["ld", "lock"],
  permLevel: 2,
  botPerms: ["MANAGE_ROLES", "EMBED_LINKS", "ADMINISTRATOR"]
};
  
exports.help = {
  name: "lockdown",
  description: "Bloqueia ou desbloqueia um canal.",
  usage: "[time:str] [reason:str]",
  usageDelim: " | "
};
