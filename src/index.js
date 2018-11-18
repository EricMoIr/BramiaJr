require("module-alias/register");
const Discord = require("discord.js");

const store = require("store");
const discordController = require("controllers/discord");
const { DISCORD_TOKEN } = process.env;

const client = new Discord.Client();
store.connect();

const init = async () => {
    client.on("guildCreate", discordController.guildCreate);
    client.on("guildMemberAdd", discordController.guildMemberAdd);
    client.on("guildMemberRemove", () => discordController.guildMemberRemove(client));
    client.on("message", discordController.message);
    client.on("ready", discordController.ready);

    client.login(DISCORD_TOKEN);
};

init();