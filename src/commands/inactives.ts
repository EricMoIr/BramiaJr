import { Command } from "domain/types";
import * as userService from "services/user";

const inactives : Command = {
    name: "inactives",
    description: "Shows the members with the lowest activity this week",
    execute: async (message) => {
        const users = await userService.getInactiveUsersThisWeek(message.guild.id, 10);
        let content;
        if (users.length) {
            content = `Least active members
Rank | Name | Score\n\n`;
            users.forEach((user, i) => {
                content += `#${i + 1}: ${user.username} | ${user.pointsWeekly} points\n`;
            });
        } else {
            content = "There are no inactive members this week. Congratulations!";
        }

        return message.channel.send(content, { code: true });
    },
};

export default inactives;