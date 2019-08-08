import { Command } from "domain/types";
import * as userService from "services/user";

const inactivesGlobal : Command = {
    name: "inactivesGlobal",
    description: "Shows the members with the lowest activity",
    execute: async (message) => {
        const users = await userService.getInactiveUsers(message.guild.id, 10);
        let content;
        if (users.length) {
            content = `Least active members
Rank | Name | Score\n\n`;
            users.forEach((user, i) => {
                content += `#${i + 1}: ${user.username} | ${user.points} points\n`;
            });
        } else {
            content = "There are no inactive members in the server. Congratulations!";
        }

        return message.channel.send(content, { code: true });
    },
};

export default inactivesGlobal;