import isSameWeek from "date-fns/is_same_week";

import Configurations from "models/configuration";

export const updateLastSync = async () => {
    const lastSync = await getLastSync();
    const today = new Date();
    if (isSameWeek(lastSync, today)) {
        return;
    }
    await Configurations.updateOne({ name: "last_sync"}, { value: today.toString() });
};
export const getLastSync = async () => {
    const config = await Configurations.findOne({ name: "last_sync" });
    return new Date(config.value);
}