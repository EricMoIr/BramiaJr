const User = require("models/user");

const get = async (id, serverId) => {
    return await User.findOne({ id, server: serverId });
}
const create = async (user) => {
    return await User.create(user);
}
const getMostActiveUsers = async (guildId) => {
    return await User.find({server: guildId}).sort({points: "desc"}).limit(10);
}
const addPoints = async (user, points) => {
    user.points += points;
    await user.save();
}

exports.getMostActiveUsers = getMostActiveUsers;
exports.get = get;
exports.create = create;
exports.addPoints = addPoints;