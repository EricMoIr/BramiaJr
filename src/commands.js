const util = require("discordUtil");
const guildService = require("services/guild");
const userService = require("services/user");
const messageService = require("services/message");

const help = {
    name: "help",
    description: "help shows information about other commands",
    execute: async (message) => {
        const params = util.getParams(message);

        if (!Array.isArray(params) || params.length === 0) {
            await message.reply("help should be followed by a command. Usage: help setchannel");
            return;
        }

        for(let i=commands.length-1; i>-1; i--){
            if (params[0].toLowerCase() === commands[i].name.toLowerCase()) {
                await message.reply(commands[i].description);
                return;
            }
        }
        
        await message.reply("help should be followed by a command. Usage: help setchannel");
    }
}

const ranking = {
    name: "ranking",
    description: "ranking shows the server members ranked by activity",
    execute: async (message) => {
        const users = await userService.getMostActiveUsers(message.guild.id);
        let content = `Server ranking
Rank | Name | Score\n\n`;
        users.forEach((user, i) => {
            content += `#${i+1}: ${user.username} | ${user.points} points\n`;
        });
        
        await message.channel.send(content, { code: true });
    }
}

const setChannel = {
    name: "setchannel",
    description: "setchannel sets the default channel where I should send welcome/leaving messages",
    execute: async (message) => {
        const params = util.getParams(message);

        if (params.length === 0) {
            await message.reply(`setchannel should be followed by the name of the channel. Usage: setchannel ${message.channel}`);
            return;
        }

        if (params[0][0] !== "<") {
            //It's a channel name
            for(const channel of message.guild.channels) {
                if (channel[1].name === params[0]) {
                    if (channel[1].type !== "text" || !channel[1].permissionsFor(message.guild.me).has("SEND_MESSAGES")) {
                        await message.reply("I can't send messages in that channel");
                        return;
                    }
                    await guildService.setDefaultChannel(message.guild.id, channel[1]);
                    await message.reply(`Setting ${channel[1]} for welcome and leaving messages`);
                    return;
                }
            }
            await message.reply("I couldn't find that channel");
        } else {
            //It's a channel tag
            const snowflake = params[0].substring(2, params[0].length-1);
            for(const channel of message.guild.channels) {
                if (channel[0] === snowflake) {
                    if (channel[1].type !== "text" || !channel[1].permissionsFor(message.guild.me).has("SEND_MESSAGES")) {
                        await message.reply("I can't send messages in that channel");
                        return;
                    }
                    await guildService.setDefaultChannel(message.guild.id, channel[1]);
                    await message.reply(`Setting ${channel[1]} for welcome and leaving messages`);
                    return;
                }
            }
            await message.reply("I couldn't find that channel");
        }
    }
}

const saveMessages = {
    name: "saveMessages",
    description: "You shouldn't be seeing this",
    execute: async () => {
        await messageService.saveMessages();
    }
}

const commandsList = [
    setChannel,
    ranking
];

module.exports = {
    commands: [help, saveMessages, ...commandsList]
}