import { Command } from "domain/types";
import * as guildService from "services/guild";
import * as utils from "discordUtil";

const { PREFIX } = process.env;

async function setDefaultChannel(channel, message) {
    if (channel[1].type !== "text" || !channel[1].permissionsFor(message.guild.me).has("SEND_MESSAGES")) {
        return message.reply("I can't send messages in that channel");
    }
    await guildService.setDefaultChannel(message.guild.id, channel[1]);
    return message.reply(`Setting ${channel[1]} for welcome and leaving messages`);
}

const setChannel: Command = {
    name: "setchannel",
    description: "Sets the default channel where I should send welcome/leaving messages",
    execute: async (message, params) => {
        if (!params.length) {
            return message.reply(`${PREFIX}setchannel should be followed by the name of the channel. Usage: ${PREFIX}setchannel ${message.channel}`);
        }
        const channel = await utils.findChannel(params[0], message.guild.channels);

        if (channel) {
            return setDefaultChannel(channel, message);
        }
        return message.reply("I couldn't find that channel");
    },
};

export default setChannel;