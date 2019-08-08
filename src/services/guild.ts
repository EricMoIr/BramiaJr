import Logger from "logger";
import Guilds from "models/guild";
import Store from "persistence/store";
import * as userService from "services/user";
import { Guild } from "domain/types";
import { GuildChannel, TextChannel, Guild as DiscordGuild, Collection, User } from "discord.js";

const guildsCache = Store.instance.guilds;

export const getGuilds = async (): Promise<Map<string, Guild> | false> => {
    try {
        if (guildsCache.size) {
            return guildsCache;
        }
        const dbGuilds = await Guilds.find();
        guildsCache.clear();
        dbGuilds.forEach((guild) => {
            guildsCache.set(guild.id, new Guild(guild));
        });
        return guildsCache;
    } catch (error) {
        Logger.error(error);
        return false;
    }
};
export const getGuild = (id: string): Guild => {
    if (guildsCache.get(id)) {
        return guildsCache.get(id);
    }
    Logger.error(`Couldn't find the guild ${id}`);
    return null;
};
export const addGuild = async (id: string, name: string) => {
    try {
        let guild = await Guilds.findOne({ id });
        if (guild) {
            Logger.log(`The guild ${id}: ${name} already exists`);
            return { error: "Guild already exists" };
        }
        guild = await Guilds.create({
            id,
            name,
            defaultChannelId: null,
            leftServer: false,
        });
        guildsCache.set(id, new Guild(guild));
        return guild;
    } catch (error) {
        Logger.error(error);
        return false;
    }
};
export const setDefaultChannel = async (guildId: string, channel: TextChannel) => {
    const guild = await Guilds.findOne({ id: guildId });
    guild.defaultChannelId = channel.id;
    await guild.save();
    guildsCache.get(guildId).setDefaultChannel(channel);
};
export const updateGuilds = async (guilds: Collection<string, DiscordGuild>) => {
    const dbGuilds = await getGuilds();
    if(!dbGuilds) return;

    dbGuilds.forEach((_, id) => {
        if (!guilds.has(id)) {
            dbGuilds.delete(id);
        }
    });

    const promises = [];
    guilds.forEach(async (guild, id) => {
        promises.push(userService.addUsers(guild.members.array()));
        if (!dbGuilds.has(id)) {
            const guildName = guild.name;
            promises.push(addGuild(id, guildName));
        } else if (dbGuilds.get(id).defaultChannelId) {
            promises.push(setDefaultChannel(
                id,
                <TextChannel>guild.channels.get(dbGuilds.get(id).defaultChannelId),
            ));
            promises.push(setMeetingChannel(guild.channels.get(dbGuilds.get(id).meetingChannelId)));
        }
    });
    return Promise.all(promises);
};
export const hasDefaultChannel = (guildId: string) => {
    return getGuild(guildId).defaultChannel !== null;
};
export const sendToDefaultChannel = async (guildId: string, message: string) => {
    return getGuild(guildId).defaultChannel.send(message);
};
export const getMeetingChannel = (guildId: string) => {
    return getGuild(guildId).meetingChannel;
};
export const setMeetingChannel = async (channel: GuildChannel) => {
    const id = channel.guild.id;
    const guild = await Guilds.findOne({ id });
    guild.meetingChannelId = channel.id;
    await guild.save();
    guildsCache.get(id).setMeetingChannel(channel);
    if (!await lockMeetingChannel(id)) {
        return false;
    }
    return getMeetingChannel(id);
};
export const unlockMeetingChannel = async (guildId: string) => {
    const channel = getMeetingChannel(guildId);
    try {
        // guildId is the snowflake for @everyone
        await channel.overwritePermissions(guildId, {
            SEND_MESSAGES: true
        });
        return true;
    } catch(_) {
        return false;
    }
};
export const lockMeetingChannel = async (guildId: string) => {
    const channel = getMeetingChannel(guildId);
    if (!channel) {
        Logger.warn(`The server ${guildId} doesn't have a meeting channel`);
        return false;
    }
    try {
        // guildId is the snowflake for @everyone
        await channel.overwritePermissions(guildId, {
            SEND_MESSAGES: false
        });
        return true;
    } catch(_) {
        Logger.warn(`Not enough permissions to overwrite ${guildId}'s meeting channel permissions`);
        return false;
    }
};
export const canManageMeetings = (user: User, guild: DiscordGuild) => {
    const author = guild.members.find((member) => member.id === user.id);
    if (!author) {
        Logger.error(`The author ${user} was not found in ${guild}`);
        return false;
    }
    return guild.ownerID === user.id;
};