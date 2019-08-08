import Message from "models/message";
import Store from "persistence/store";
import * as userService from "services/user";

const messagesCache = Store.instance.messages;

const COOLDOWN = 2000;

const getPoints = (message) => {
    return message.cleanContent.length;
};

const isCooldownOver = (authorId) => {
    if (!messagesCache.get(authorId)) {
        messagesCache.set(authorId, []);
    }
    const messages = messagesCache.get(authorId);
    const lastMessage = messages.length === 0 ? null : messages[messages.length - 1];
    return !lastMessage ||
    lastMessage && Date.now() - lastMessage.time.getTime() > COOLDOWN;
};

export const saveMessages = async () => {
    const userIds = Object.keys(messagesCache);
    const promises = [];
    userIds.forEach(async (userId) => {
        const messages = messagesCache.get(userId);
        const author = await userService.get(userId, messages[0].author.server);
        promises.push(...messages.map((message) => {
            message.author = author;
            return Message.create(message);
        }));
    });
    await Promise.all(promises);
    messagesCache.clear();
};

export const handleMessage = async (message) => {
    if (message.author.bot) {
        return;
    }
    const author = {
        id: message.author.id,
        username: message.author.username,
        server: message.guild.id,
    };
    const dbMessage = new Message ({
        content: message.cleanContent,
        author,
        time: new Date(),
    });
    let user = await userService.get(message.author.id, message.guild.id);
    if (!user) {
        user = await userService.create(author);
    }
    if (!user.isBot && isCooldownOver(author.id)) {
        messagesCache.get(author.id).push(dbMessage);
        await userService.addPoints(user, getPoints(message));
    }
};