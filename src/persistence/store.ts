import { Mongoose } from "mongoose";
import Logger from "logger";
import { Guild, Message } from "domain/types";

const { MONGO_STRING } = process.env;

class Store {
    static instance = new Store();
    mongoose = new Mongoose();
    guilds = new Map<string, Guild>(); 
    messages = new Map<string, Message[]>();

    connect = () => {
        return new Promise((resolve) => {
            this.mongoose.set("useCreateIndex", true);
            this.mongoose.connect(MONGO_STRING);

            this.mongoose.connection.on("error", (error) => {
                Logger.error(error);
                Logger.log("Couldn't connect to MongoDB");
            });

            this.mongoose.connection.on("connected", () => {
                Logger.log("Mongo connection was established");
                resolve();
            });
        });
    };
}

export default Store;
