import { TextChannel, GuildChannel, Message as DiscordMessage } from "discord.js";
import GuildModel from "models/guild";
import MessageModel from "models/message";
import UserModel from "models/user";

export type Command = {
    name: string,
    description: string,
    execute: (message: DiscordMessage, params?: string[]) => Promise<any>,
}

export class Guild extends GuildModel {
    defaultChannel: TextChannel;
    meetingChannel: GuildChannel;

    setDefaultChannel(channel: TextChannel) {
        this.defaultChannel = channel;
    }
    setMeetingChannel(channel: GuildChannel) {
        this.meetingChannel = channel;
    }
}

export class Message extends MessageModel {

}

export class User extends UserModel {
    
}