import * as Discord from "discord.js";

import Logger from "logger";
import Store from "persistence/store";
import * as DiscordController from "controllers/discord";
import * as userService from "services/user";
import * as configurationService from "services/configuration";

const { DISCORD_TOKEN } = process.env;
const DAILY = 1000 * 60 * 60 * 24;

const init = async () => {
    const beginning = Date.now();
    try {
        let now = Date.now();
        await Store.instance.connect();
        Logger.log(`Connecting to the store took ${(Date.now() - now) / 1000} seconds`);
    } catch (error) {
        Logger.error("Couldn't connect to store", error);
    }
    
    let now = Date.now();
    await Promise.all([
        configurationService.updateLastSync(),
        userService.updatePoints(),
    ]);
    setInterval(configurationService.updateLastSync, DAILY);
    setInterval(userService.updatePoints, DAILY);
    Logger.log(`Updating last sync and points took ${(Date.now() - now) / 1000} seconds`);

    const client = new Discord.Client();
    //#region Discord config
    client.on("guildCreate", DiscordController.guildCreate);
    client.on("guildMemberAdd", DiscordController.guildMemberAdd);
    client.on("guildMemberRemove", DiscordController.guildMemberRemove);
    client.on("message", DiscordController.message);
    client.on("ready", async () => {
        await DiscordController.ready(client);
        Logger.log(`Starting the bot took ${(Date.now() - beginning) / 1000} seconds`);
    });
    client.on("disconnect", (event) => DiscordController.disconnect(event, client, DISCORD_TOKEN));
    client.on("error", (error) => DiscordController.error(error, client, DISCORD_TOKEN));
    //#endregion
    await DiscordController.signIn(client, DISCORD_TOKEN);
};

try {
    init();
} catch (error) {
    Logger.error("Couldn't start the app", error);
}
