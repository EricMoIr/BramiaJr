import { Command } from "domain/types";
import * as userService from "services/user";

const top : Command  = {
    name: "top",
    description: "Shows the top 10 members based on this week's activity",
    execute: async (message) => {
        const users = await userService.getMostActiveUsersThisWeek(message.guild.id, 10);
        let content;
        if (users.length) {
            content = `Most active members
Rank | Name | Score\n\n`;
            users.forEach((user, i) => {
                content += `#${i + 1}: ${user.username} | ${user.pointsWeekly} points\n`;
            });
        } else {
            // Shouldn't happen because I handle the message before running the command
            content = "There was no activity in the server this week.";
        }

        return message.channel.send(content, { code: true });
    },
};

export default top;