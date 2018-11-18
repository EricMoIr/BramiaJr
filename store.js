const mongoose = require("mongoose");

const guildService = require("./services/guild");
const { MONGO_STRING } = process.env;
const cache = {};
const Guild = require("./models/guild");

exports.connect = () => {
    mongoose.set('useCreateIndex', true);
    mongoose.connect(MONGO_STRING);
    mongoose.connection.on('error', (err) => {
        console.error(err);
        console.log("Couldn't connect to MongoDB");
    });

    mongoose.connection.on("connected", async () => {
        await getGuilds();
    });
}

const getGuilds = async () => {
    if (cache.guilds) {
        return cache.guilds;
    }

    const guilds = await guildService.getGuilds();
    cache.guilds = guilds.reduce((result, guild) => {
        return {
            ...result,
            [guild.id]: guild
        }
    }, {});
    return cache.guilds;
}

// exports.getGuilds = getGuilds;

exports.getGuild = (id) => {
    if (cache.guilds && cache.guilds[id]){
        return cache.guilds[id];
    }

    return null;
}

const setDefaultChannel = async (guildId, channel) => {
    console.log(1234)
    const guild = await Guild.findOne({id: guildId});
    guild.defaultChannelId = channel.id;
    await guild.save();
    var a = {}
    a.default = channel;
    cache.guilds[guildId].defaultChannel = channel;
    await channel.send("test");
    await a.default.send("test2");
    await cache.guilds[guildId].defaultChannel.send("test3");
    console.log(cache.guilds[guildId])
}

exports.setDefaultChannel = setDefaultChannel;

exports.updateGuilds = async (guilds) => {
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

const addGuild = async (id, name) => {
    try {
        const guild = {
            id,
            name,
            defaultChannelId: null,
            leftServer: false
        };
        const { error } = await guildService.addGuild(guild);
        if (error) {
            throw error;
        }
        cache.guilds.push({[id]: guild});
    } catch (error) {
        console.error(error);
        return { error };
    }    
}

exports.addGuild = addGuild;