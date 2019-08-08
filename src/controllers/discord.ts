import { Guild, GuildMember, Client, Message } from "discord.js";

import Logger from "logger";
import * as util from "discordUtil";
import commands from "commands";
import * as guildService from "services/guild";
import * as messageService from "services/message";

const { PREFIX } = process.env;

export const guildCreate = async (guild: Guild) => {
    const response = await guildService.addGuild(guild.id, guild.name);
    if (!response) {
        Logger.error(`Couldn't add the guild ${guild.name} to the store`);
    }
};

export const guildMemberAdd = async ({ guild, user }: GuildMember) => {
    if (guildService.hasDefaultChannel(guild.id)) {
        await guildService.sendToDefaultChannel(guild.id, `${user} has joined the server`);
    }
};

export const guildMemberRemove = async ({ guild, user }: GuildMember) => {
    if (guildService.hasDefaultChannel(guild.id)) {
        await guildService.sendToDefaultChannel(guild.id, `${user.username} has left the server`);
    }
};

export const message = async (message: Message) => {
    if (!message.content.startsWith(PREFIX)) {
        return messageService.handleMessage(message);
    }
    const { command, params } = util.findCommand(message, commands);
    // const [possibleCommand, ...params] = util.parseMessage(message);
    // const command = commands.find((c) => 
    //     c.name.toLowerCase() === possibleCommand.toLocaleLowerCase()
    // );
    if (command) {
        Logger.log(`Executing the command ${command.name}. Fired by ${message.author.username}`);
        return command.execute(message, params);
    }
    Logger.warn(`I couldn't find a command in ${message.content}. Fired by ${message.author.username}`);
}

export const ready = async (client: Client) => {
    try {
        await Promise.all([
            guildService.updateGuilds(client.guilds),
            client.user.setPresence({
                game: {
                    name: "$help",
                },
            }),
        ]);
        
        Logger.log("Bot is ready");
    } catch(error) {
        Logger.error("Couldn't handle ready event", error);
    }
};

export const disconnect = async (_, client: Client, token: string) => {
    try {
        Logger.warn("Was disconnected from discord.");
        await client.login(token);
    } catch (error) {
        await error(error, client, token);
    }
};

export const error = async (thrownError: Error, client: Client, token: string) => {
    Logger.error("Error occurred", thrownError);
    try {
        await client.login(token);
    } catch (err) {
        await error(err, client, token);
    }
};

export const signIn = async (client: Client, token: string) => {
    try {
        Logger.log("Attempting to connect to discord...");
        await client.login(token);
    } catch (error) {
        Logger.error("Couldn't connect to discord", error);
    }
}