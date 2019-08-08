export default {
    my_permissions: "I don't have enough permissions for that",
    your_permissions: "You don't have enough permissions for that",
    meeting_missing_params: (prefix) => `${prefix}meeting should be followed by parameters. For example, ${prefix}meeting starts unlocks the meeting channel and ${prefix}meeting in <channel_name> sets <channel_name> to be the meeting channel, locking it until a meeting starts`,
}