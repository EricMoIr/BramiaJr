const Guild = require("models/guild");
const { cache } = require("store");

const getGuilds = async () => {
    try {
        if (cache.guilds && cache.guilds.length > 0) {
            return cache.guilds;
        }
        
        const dbGuilds = await Guild.find();
        cache.guilds = dbGuilds.reduce((result, guild) => {
            return {
                ...result,
                [guild.id]: guild
            }
        }, {});
        return cache.guilds;
    } catch(error) {
        console.error(error);
        return { error };
    }
}
const getGuild = (id) => {
    if (cache.guilds && cache.guilds[id]){
        return cache.guilds[id];
    }
    console.error("Couldn't find the guild "+id);
    return null;
}
const addGuild = async (id, name) => {
    try {
        const guild = {
            id,
            name,
            defaultChannelId: null,
            leftServer: false
        };
        await Guild.create(guild);
        cache.guilds.push({[id]: guild});
    } catch (error) {
        console.error(error);
        return { error };
    }    
}
const setDefaultChannel = async (guildId, channel) => {
    const guild = await Guild.findOne({id: guildId});
    guild.defaultChannelId = channel.id;
    await guild.save();
    cache.guilds[guildId].defaultChannel = channel;
}
const updateGuilds = async (guilds) => {
    const dbGuilds = await getGuilds();
    for(const id in dbGuilds) {
        if (!guilds.has(id)) {
            delete dbGuilds[id];
        }
    }
    for(const id of guilds.keys()){
        if (!(id in dbGuilds)) {
            const guildName = guilds.get(id).name;
            await addGuild(id, guildName);
        } else {
            if (dbGuilds[id].defaultChannelId) {
                await setDefaultChannel(id, guilds.get(id).channels.get(dbGuilds[id].defaultChannelId));
            }
        }
    }
}
const hasDefaultChannel = (guildId) => {
    return getGuild(guildId).defaultChannel !== null;
}
const sendToDefaultChannel = async (guildId, message) => {
    await getGuild(guildId).defaultChannel.send(message);
}

exports.getGuilds = getGuilds;
exports.getGuild = getGuild;
exports.addGuild = addGuild;
exports.setDefaultChannel = setDefaultChannel;
exports.updateGuilds = updateGuilds;
exports.sendToDefaultChannel = sendToDefaultChannel;
exports.hasDefaultChannel = hasDefaultChannel;