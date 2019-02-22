const cheerio = require("cheerio");
const request = require("request");

exports.run = async (client, msg, [term]) => {
    const url = "https://myanimelist.net/profile/";

    request(url + term, function(err, res, body) {
        $ = cheerio.load(body);
        var text = $.text().split(" "); var x = 0; var info = new Object();
        info.aStats = new Object(); info.mStats = new Object();

        do {
            var z = text[x].trim(); var y = text[x + 1] ? text[x + 1].trim() : ""; var zed = text[x + 2] ? text[x + 2].trim() : "";
            if (z + y + zed === "404NotFound") { return msg.channel.send("Ups! Parece que um player com esse nome não existe."); }
            else if (z.length > 1) {
                if (z.startsWith("Online")) {
                    if (zed.startsWith("ago")) { info.status = z.slice(6) + " " + y + " ago"; }
                    else if (z.startsWith("OnlineNow")) { info.status = z.slice(6, z.search("Gender")); }
                    else if (zed.includes(":")) { info.status = z.slice(6) + " " + y + " " + (new Date()).getFullYear(); }
                    else if (z.includes("Yesterday") || z.includes("Today") && zed.slice(1, 2) === "M") { 
                        info.status = z.slice(6, -1) + " at " + y + zed.slice(0, 2); 
                    }
                    else if (isNaN(zed) === false) { info.status = z.slice(6) + " " + y + " " + zed; }
                } if (z.includes("Birthday") && !info.birthday) {
                    if (y.includes("Location")) {
                        var num = (z.length - z.search("Birthday")) * (-1);
                        var baka = y.slice(0, y.search("Location"));
                    } else {
                        var num = (z.length - z.search("Birthday")) * (-1);
                        var baka = y.slice(-1) === "," ? y + " " + zed.slice(0, 4) : y;
                    }
                    info.birthday = z.slice(num + 8) + " " + baka;
                } if (z.includes("Gender")) {
                    var amount = (z.search("Birthday")) ? z.search("Birthday") : null;

                    if (z.startsWith("ago")) { var amount2 = 9; }
                    else if (z.startsWith("AM") || z.startsWith("PM")) { var amount2 = 8; }
                    else { var amount2 = 15; } 

                    info.gender = z.slice(amount2, amount);
                } else if (z.startsWith("Watching") || z.startsWith("Reading")) {
                    if (!info.aStats.watch || !info.mStats.read) {
                        var num = [z.search("Completed"), z.search("On-Hold"), z.search("Dropped")];

                        var butter = !info.aStats.watch ? "aStats" : "mStats";
                        info[butter].completed = z.slice(num[0] + 9, num[1]);
                        info[butter].hold = z.slice(num[1] + 7, num[2]);
                        info[butter].drop = z.slice(num[2] + 7, -4);

                        if (butter === "aStats") { 
                            info.aStats.watch = z.slice(8, num[0]); 
                            info.aStats.plan = zed.slice(5, -5);
                        }
                        else { 
                            info.mStats.read = z.slice(7, num[0]); 
                            info.mStats.plan = zed.slice(4, -5);
                        }
                    }
                } else if (z === "All" && !info.friends) { info.friends = y.slice(1, -8); }
                else if (isNaN(y) === false) {
                    if (z === "Dias:") { 
                        if (!info.aStats.days) { info.aStats.days = y; }
                        else { info.mStats.days = y; }
                    } 
                    else if (z === "Pontuação:") {
                        if (!info.aStats.mean) { info.aStats.mean = y; }
                        else { info.mStats.mean = y; }
                    }
                }
            }
            x++;
        } while (x < text.length);

        var list = [];
        if (info.gender) { list.push("🚻 Sexo: " + info.gender); }
        if (info.birthday) { list.push("🎂 Aniversário: " + info.birthday); }
        if (info.friends) { list.push("👫 Amigos: " + info.friends); }

        const embed = new client.methods.Embed()
            .setTitle(term + "'s MAL Profile")
            .setURL(url + term)
            .setDescription("Last online: " + info.status);
            if (list.length > 0) { embed.addField("__Geral:__", list.join("\n")); }
            embed.addField("__Anime:__", "🕓 Dias: " + info.aStats.days + " | 📊 Significido: " + info.aStats.mean + "\n💚 Vendo: " + info.aStats.watch + "\n💙 Completado: " + info.aStats.completed + "\n💛 Em espera: " + info.aStats.hold + "\n💔 Droppado: " + info.aStats.drop + "\n🗓 Planeia ver: " + info.aStats.plan, true)
            .addField("__Manga:__", "🕓 Dias: " + info.mStats.days + " | 📊 Significado: " + info.mStats.mean + "\n📗 Lendo: " + info.mStats.read + "\n📘 Completado: " + info.mStats.completed + "\n📙 Em espera: " + info.mStats.hold + "\n📕 Droppado: " + info.mStats.drop + "\n🗓 Planeia ler: " + info.mStats.plan, true)
            .setTimestamp()
            .setColor(0x2E51A2)
            .setThumbnail($(".user-image").find("img")[0].attribs.src)
            .setFooter("Requestado por: " + msg.author.tag);

        msg.channel.send({embed});
    });    
};
  
exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: ["ATTACH_FILES"],
    cooldown: 30
};
  
exports.help = {
    name: "mal",
    description: "Mostra o perfil de um player no MyAnimeList",
    usage: "[term:str]",
    extendedHelp: "Há um cooldown de 30 segundos para cada pesquisa de perfil para não spamar o site MAL."
};
