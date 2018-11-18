const mongoose = require("mongoose");

const cache = {};
const { MONGO_STRING } = process.env;

exports.connect = () => {
    mongoose.set("useCreateIndex", true);
    mongoose.connect(MONGO_STRING);
    mongoose.connection.on("error", (err) => {
        console.error(err);
        console.log("Couldn't connect to MongoDB");
    });

    mongoose.connection.on("connected", async () => {
        console.log("Mongo connection was established");
    });
};
exports.cache = cache;