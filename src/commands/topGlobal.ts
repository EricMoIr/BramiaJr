import { Command } from "domain/types";
import * as userService from "services/user";

const topGlobal : Command  = {
    name: "topGlobal",
    description: "Shows the top 10 members based on activity",
    execute: async (message) => {
        const users = await userService.getMostActiveUsers(message.guild.id, 10);
        let content;
        if (users.length) {
            content = `Most active members
Rank | Name | Score\n\n`;
            users.forEach((user, i) => {
                content += `#${i + 1}: ${user.username} | ${user.points} points\n`;
            });
        } else {
            // Shouldn't happen because I handle the message before running the command
            content = "There was no activity in the server... Ever.";
        }

        return message.channel.send(content, { code: true });
    },
};

export default topGlobal;