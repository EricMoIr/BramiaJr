const Discord = require("discord.js");
const { token } = require("./config.js");

const client = new Discord.Client();

const init = async () => {
    client.on("guildMemberAdd", ({ guild, user }) => {
        for (const channel of guild.channels) {
            if (channel[1].type === "text" && channel[1].permissionsFor(guild.me).has("SEND_MESSAGES")) {
                channel[1].send(`${user} has joined the server`);
                break;
            }
        }
        
    });

    client.on("guildMemberRemove", ({ guild, user }) => {
        for (const channel of guild.channels) {
            if (channel[1].type === "text" && channel[1].permissionsFor(guild.me).has("SEND_MESSAGES")) {
                channel[1].send(`${user} has left the server`);
                break;
            }
        }
        
    });
    client.login(token);
}

init();