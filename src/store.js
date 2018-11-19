const mongoose = require("mongoose");

const cache = {
    guilds: {},
};
const { MONGO_STRING } = process.env;

exports.connect = () => {
    return new Promise((resolve) => {
        mongoose.set("useCreateIndex", true);
        mongoose.connect(MONGO_STRING);

        mongoose.connection.on("error", (error) => {
            console.error(error);
            console.log("Couldn't connect to MongoDB");
        });

        mongoose.connection.on("connected", () => {
            console.log("Mongo connection was established");
            resolve();
        });
    })
};
exports.cache = cache;