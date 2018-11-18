const Guild = require("models/guild");
let { guilds } = require("store").cache;

const getGuilds = async () => {
    try {
        if (guilds) {
            return guilds;
        }
        
        const dbGuilds = await Guild.find();
        guilds = dbGuilds.reduce((result, guild) => {
            return {
                ...result,
                [guild.id]: guild
            }
        }, {});
        return guilds;
    } catch(error) {
        console.error(error);
        return { error };
    }
}
const getGuild = (id) => {
    if (guilds && guilds[id]){
        return guilds[id];
    }

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

exports.getGuilds = getGuilds;
exports.getGuild = getGuild;
exports.addGuild = addGuild;
exports.setDefaultChannel = setDefaultChannel;
exports.updateGuilds = updateGuilds;