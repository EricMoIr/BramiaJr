import { Command } from "domain/types";
import independentCommands from "./independentCommands";

const { PREFIX } = process.env;

const help : Command = {
    name: "help",
    description: "Shows information about other commands",
    execute: async (message, params) => {

        if (!params.length) {
            const commandsDescriptions = independentCommands
                .map((c) => `${PREFIX}${c.name} ${c.description}`)
                .join("\n- ")
            return message.reply(`This is a list of the available commands. Type ${PREFIX}help <command> for more details.\n- ${commandsDescriptions}`);
        }
        const command = independentCommands.find(
            (c) => params[0].toLowerCase() === c.name.toLowerCase(),
        );
        if (command) {
            return message.reply(command.description);
        }
        return message.reply("help should be followed by a command. Usage: help setchannel");
    },
};

export default help;