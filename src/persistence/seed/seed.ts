import startOfWeek from "date-fns/start_of_week";

import Configurations from "models/configuration";
import Users from "models/user";
import Store from "persistence/store";
import Logger from "logger";

const init = async () => {
    await Store.instance.connect();
    Logger.db("Resetting index...");
    await Users.collection.dropIndexes();
    Logger.db("Finished resetting index");
    Logger.db("Seeding...");
    const currentWeek = startOfWeek(new Date());
    const config = await Configurations.findOne({ name: "last_sync" });
    if (config) {
        config.value = currentWeek.toString();
        await config.save();
    } else {
        await Configurations.create({
            name: "last_sync",
            value: currentWeek,
        });
    }
    Logger.db("Finished seeding");
    process.exit();
};
init();