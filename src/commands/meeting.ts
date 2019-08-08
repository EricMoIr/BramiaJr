import { Command } from "domain/types";
import * as guildService from "services/guild";
import Messages from "messages/messages";
import * as utils from "discordUtil";

const { PREFIX } = process.env;

const meetingCommands: Command = {
    name: "meeting",
    description: `${PREFIX}meeting starts unlocks the meeting channel and ${PREFIX}meeting in <channel_name> sets <channel_name> to be the meeting channel, locking it until a meeting starts`,
    execute: async (message, params) => {
        if (!guildService.canManageMeetings(message.author, message.guild)) {
            return message.reply(Messages.your_permissions);
        }
        if (!params.length) {
            return message.reply(Messages.meeting_missing_params(PREFIX));
        }
        if (params[0].toLowerCase() === "in") {
            if (params.length < 2) {
                return message.reply(Messages.meeting_missing_params(PREFIX));
            }
            const channel = utils.findChannel(params[1], message.guild.channels);

            if (channel) {
                if (!await guildService.setMeetingChannel(channel)) {
                    return message.reply(Messages.my_permissions);
                }
                return message.reply(`Setting ${channel} as meeting channel`);
            }
            return message.reply("I couldn't find that channel");
        } else if (params[0].toLowerCase() === "starts") {
            const channel = await guildService.getMeetingChannel(message.guild.id);
            if (!channel) {
                return message.reply(`You should try setting up a meeting channel first with ${PREFIX}meeting in <channel_name>`);
            }
            if (!await guildService.unlockMeetingChannel(message.guild.id)) {
                return message.reply(Messages.my_permissions);
            }
            return message.reply(`The meeting has started at ${channel.name}!`);
        } else if (params[0].toLowerCase() === "ends") {
            const channel = await guildService.getMeetingChannel(message.guild.id);
            if (!channel) {
                return message.reply(`You should try setting up a meeting channel first with ${PREFIX}meeting in <channel_name>`);
            }
            if (!await guildService.lockMeetingChannel(message.guild.id)) {
                return message.reply(Messages.my_permissions);
            }
            return message.reply(`The meeting at ${channel.name} has ended!`);
        }
    },
};

export default meetingCommands;