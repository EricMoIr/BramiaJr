const { commands } = require("commands");
const guildService = require("services/guild");
const messageService = require("services/message");
const { PREFIX } = process.env;


exports.guildCreate = async (guild) => {
    const { error } = await guildService.addGuild(guild.id, guild.name);
    if (error) {
        console.error(`Couldn't add the guild ${guild.name} to the store`);
    }
};

exports.guildMemberAdd = async ({ guild, user }) => {
    if (guildService.hasDefaultChannel(guild.id)){
        await guildService.sendToDefaultChannel(guild.id, `${user} has joined the server`);
    }
}

exports.guildMemberRemove = async ({ guild, user }) => {
    if (guildService.hasDefaultChannel(guild.id)){
        await guildService.sendToDefaultChannel(guild.id, `${user.username} has left the server`);
    }
}

exports.message = async (message) => {
    messageService.handleMessage(message);
    for(let i=commands.length-1; i>-1; i--) {
        if (message.content.startsWith(`${PREFIX}${commands[i].name}`)) {
            await commands[i].execute(message);
            return;
        }
    }
}

exports.ready = async (client) => {
    await guildService.updateGuilds(client.guilds);
    await client.user.setPresence({
        game: {
            name: "$help"
        }
    });
    console.log("Bot is ready");
}

exports.disconnect = async (event, client, token) => {
    try {
        console.error("Was disconnected from discord");
        await client.login(token);
    } catch(error) {
        console.error("Couldn't connect to discord");
    }
}