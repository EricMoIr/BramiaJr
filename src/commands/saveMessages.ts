import { Command } from "domain/types";
import * as messageService from "services/message";

const saveMessages: Command = {
    name: "saveMessages",
    description: "You shouldn't be seeing this",
    execute: async (_) => {
        return messageService.saveMessages();
    },
};

export default saveMessages;