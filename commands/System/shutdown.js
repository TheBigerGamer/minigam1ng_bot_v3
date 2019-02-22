exports.run = async (client, message) => {
    await message.delete().catch();
    await message.channel.send(`Boa noite, ${client.owner.username}!`);
    await process.exit().catch((e) => { console.error(e); });
};
  
exports.conf = {
  enabled: true,
  runIn: ["text", "dm"],
  aliases: ["sleep"],
  permLevel: 10,
  botPerms: [], 
};
  
exports.help = {
  name: "shutdown",
  description: "Desliga o bot.",
  usage: "",
};  
