const Guild = require("../models/guild");

exports.getGuilds = async () => {
    try {
        return await Guild.find();
    } catch(error) {
        console.error(error);
        return { error };
    }
}

exports.addGuild = async (guild) => {
    try {
        return await Guild.create(guild);
    } catch (error) {
        console.error(error);
        return { error }
    }
}