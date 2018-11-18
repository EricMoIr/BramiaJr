const Discord = require("discord.js");

const { commands } = require("./commands");
const store = require("./store");
const { PREFIX, DISCORD_TOKEN } = process.env;

const client = new Discord.Client();
store.connect();

const init = async () => {
    client.on("guildCreate", async (guild) => {
        const { error } = await store.addGuild(guild.id, guild.name);
        if (error) {
            console.error(`Couldn't add the guild ${guild.name} to the store`);
        }
    })

    client.on("guildMemberAdd", ({ guild, user }) => {
        if (store.getGuild(guild.id) && store.getGuild(guild.id).defaultChannel) {
            store.getGuild(guild.id).defaultChannel.send(`${user} has joined the server`);
        }
    });

    client.on("guildMemberRemove", ({ guild, user }) => {
        if (store.getGuild(guild.id) && store.getGuild(guild.id).defaultChannel){
            store.getGuild(guild.id).defaultChannel.send(`${user.username} has left the server`);
        }
    });

    client.on("message", async (message) => {
        for(let i=commands.length-1; i>-1; i--) {
            if (message.content.startsWith(`${PREFIX}${commands[i].name}`)) {
                await commands[i].execute(message);
                return;
            }
        }
    });

    client.on("ready", async () => {
        await store.updateGuilds(client.guilds);
    });

    client.login(DISCORD_TOKEN);
}

init();