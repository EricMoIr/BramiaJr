import Users from "models/user";
import * as configurationService from "services/configuration";
import isSameWeek from "date-fns/is_same_week";
import { GuildMember } from "discord.js";

export const get = async (id, serverId) => {
    return await Users.findOne({ id, server: serverId });
};
export const create = async (user) => {
    return Users.create(user);
};
export const getMostActiveUsers = async (guildId, limit) => {
    return Users
        .find({ server: guildId, points: { $gt: 0 } })
        .sort({ points: "desc" })
        .limit(limit);
};
export const getMostActiveUsersThisWeek = async (guildId, limit) => {
    return Users
        .find({ server: guildId, pointsWeekly: { $gt: 0 } })
        .sort({ pointsWeekly: "desc" })
        .limit(limit);
};
export const getInactiveUsers = async (guildId, limit) => {
    return Users
        .find({ server: guildId, points: { $lte: 10 }})
        .sort({ points: "asc" })
        .limit(limit);
};
export const getInactiveUsersThisWeek = async (guildId, limit) => {
    return Users
        .find({ server: guildId, pointsWeekly: { $lte: 10 }, })
        .sort({ pointsWeekly: "asc" })
        .limit(limit);
};
export const addPoints = async (user, points) => {
    user.points += points;
    user.pointsWeekly += points;
    return user.save();
};
export const addUsers = async (guildMembers: GuildMember[]) => {
    const promises = guildMembers.map(async ({ id, user, guild }) => {
        const dbUser = await get(id, guild.id);
        if (!dbUser) {
            const newUser = {
                id,
                username: user.username,
                server: guild.id,
                isBot: user.bot,
            };
            return create(newUser);
        }
        return new Promise((resolve) => resolve(dbUser));
    });
    return Promise.all(promises);
};
export const updatePoints = async () => {
    const lastSync = await configurationService.getLastSync();
    const today = new Date();
    if (isSameWeek(lastSync, today)) {
        return;
    }
    const users = await Users.find();
    const promises = users.map((user) => {
        user.pointsWeekly = 0;
        return user.save();
    });
    await Promise.all(promises);
};