const { cache } = require("persistence/store");
const userService = require("services/user")
const Message = require("models/message")

const handleMessage = async (message) => {
    if (message.author.bot){
        return;
    }
    const author = {
        id: message.author.id,
        username: message.author.username,
        server: message.guild.id
    };
    const dbMessage = {
        content: message.cleanContent,
        author,
        time: new Date()
    }
    let user = await userService.get(message.author.id, message.guild.id);
    if (!user) {
        user = await userService.create(author);
    } 
    if (isCooldownOver(author.id)) {
        cache.messages[author.id].push(dbMessage);
        await userService.addPoints(user, getPoints(message));
    }
}

const getPoints = (message) => {
    return message.cleanContent.length;
}

const saveMessages = async () => {
    for(const userId in cache.messages) {
        const author = await userService.get(userId, cache.messages[userId][0].author.server);
        cache.messages[userId].forEach(async (message) => {
            message.author = author;
            await Message.create(message);
        });
    }
    cache.messages = {};
}

const isCooldownOver = (authorId) => {
    if (!cache.messages[authorId]) {
        cache.messages[authorId] = [];
    }
    const messages = cache.messages[authorId];
    const lastMessage = messages.length === 0? null : messages[messages.length-1];
    return !lastMessage || lastMessage && Date.now() - lastMessage.time > 1000 * 2; 
}

exports.handleMessage = handleMessage;
exports.saveMessages = saveMessages;