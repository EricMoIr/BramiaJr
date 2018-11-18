const { commands } = require("commands");
const guildService = require("services/guild");
const { PREFIX } = process.env;


exports.guildCreate = async (guild) => {
    const { error } = await guildService.addGuild(guild.id, guild.name);
    if (error) {
        console.error(`Couldn't add the guild ${guild.name} to the store`);
    }
};

exports.guildMemberAdd = async ({ guild, user }) => {
    if (guildService.getGuild(guild.id) && guildService.getGuild(guild.id).defaultChannel){
        guildService.getGuild(guild.id).defaultChannel.send(`${user.username} has left the server`);
    }
}

exports.guildMemberRemove = async ({ guild, user }) => {
    if (guildService.getGuild(guild.id) && guildService.getGuild(guild.id).defaultChannel){
        guildService.getGuild(guild.id).defaultChannel.send(`${user.username} has left the server`);
    }
}

exports.message = async (message) => {
    for(let i=commands.length-1; i>-1; i--) {
        if (message.content.startsWith(`${PREFIX}${commands[i].name}`)) {
            await commands[i].execute(message);
            return;
        }
    }
}

exports.ready = async (client) => {
    await guildService.updateGuilds(client.guilds);
}