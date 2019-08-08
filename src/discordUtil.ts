import { Message, Collection, GuildChannel } from "discord.js";
import { Command } from "domain/types";

export const getParams = (message: Message) => {
    return message.content.split(/\s+/u).slice(1);
};

export const parseMessage = (message: Message) => {
    return message.content.substring(1).split(/\s+/u);
}

export const findChannel = (channelName: string, channels: Collection<string, GuildChannel>) => {
    if (channelName[0] !== "<") {
        // It's a channel name
        return channels.find(
            (c) => c.name === channelName,
        );
    } else {
        // It's a channel tag
        const snowflake = channelName.substring(2, channelName.length - 1);
        return channels.get(snowflake);
    }
}

export const findCommand = (message: Message, commands: Command[]) => {
    const content = message.content.substring(1);
    const result = {
        command: <Command> null,
        params: <string[]> null,
    }
    for (const command of commands) {
        const { command: foundCommand } = result;

        if (content.toLowerCase().startsWith(command.name.toLowerCase()) && 
        (content.length === command.name.length || content[command.name.length] === " ") &&
        (!foundCommand || command.name.length > foundCommand.name.length)) {
            result.command = command;
            result.params = content.substring(command.name.length).split(/\s+/u);
        }
    }
    return result;
}