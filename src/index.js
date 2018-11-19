require("module-alias/register");
require('dotenv').config()
const Discord = require("discord.js");

const store = require("store");
const discordController = require("controllers/discord");
const { DISCORD_TOKEN } = process.env;

const client = new Discord.Client();

const init = async () => {
    await store.connect();
    client.on("guildCreate", discordController.guildCreate);
    client.on("guildMemberAdd", discordController.guildMemberAdd);
    client.on("guildMemberRemove", discordController.guildMemberRemove);
    client.on("message", discordController.message);
    client.on("ready", () => discordController.ready(client));

    client.login(DISCORD_TOKEN);
};

init();