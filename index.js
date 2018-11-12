const Discord = require("discord.js");
const { token, prefix, defaultChannels } = require("./config");
const { commands } = require("./commands");

const client = new Discord.Client();

const init = async () => {
    client.on("guildMemberAdd", ({ guild, user }) => {
        if (defaultChannels[guild.id])
            defaultChannels[guild.id].send(`${user} has joined the server`);
    });

    client.on("guildMemberRemove", ({ guild, user }) => {
        if (defaultChannels[guild.id])
            defaultChannels[guild.id].send(`${user} has left the server`);
    });

    client.on("message", async (message) => {
        for(let i=commands.length-1; i>-1; i--) {
            if (message.content.startsWith(`${prefix}${commands[i].name}`)) {
                await commands[i].execute(message);
                return;
            }
        }
    })

    client.login(token);
}

init();