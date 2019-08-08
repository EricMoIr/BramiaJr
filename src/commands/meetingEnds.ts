import { Command } from "domain/types";
import * as guildService from "services/guild";
import Messages from "messages/messages";

const { PREFIX } = process.env;

const meetingCommands: Command = {
    name: "meeting ends",
    description: `Locks the meeting channel`,
    execute: async (message) => {
        if (!guildService.canManageMeetings(message.author, message.guild)) {
            return message.reply(Messages.your_permissions);
        }
        const channel = await guildService.getMeetingChannel(message.guild.id);
        if (!channel) {
            return message.reply(`You should try setting up a meeting channel first with ${PREFIX}meeting in <channel_name>`);
        }
        if (!await guildService.lockMeetingChannel(message.guild.id)) {
            return message.reply(Messages.my_permissions);
        }
        return message.reply(`The meeting at ${channel.name} has ended!`);
    },
};

export default meetingCommands;