import { Command } from "domain/types";
import * as guildService from "services/guild";
import Messages from "messages/messages";
import * as utils from "discordUtil";

const { PREFIX } = process.env;

const meetingCommands: Command = {
    name: "meeting in",
    description: `${PREFIX}meeting starts unlocks the meeting channel and ${PREFIX}meeting in <channel_name> sets <channel_name> to be the meeting channel, locking it until a meeting starts`,
    execute: async (message, [channelName]) => {
        if (!guildService.canManageMeetings(message.author, message.guild)) {
            return message.reply(Messages.your_permissions);
        }
        if (!channelName) {
            return message.reply(Messages.meeting_missing_params(PREFIX));
        }
        const channel = utils.findChannel(channelName, message.guild.channels);

        if (channel) {
            if (!await guildService.setMeetingChannel(channel)) {
                return message.reply(Messages.my_permissions);
            }
            return message.reply(`Setting ${channel} as meeting channel`);
        }
        return message.reply("I couldn't find that channel");
    },
};

export default meetingCommands;