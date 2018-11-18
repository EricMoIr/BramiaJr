const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guildSchema = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    defaultChannelId: String,
    leftServer: { type: Boolean, default: false },
}, {timestamps: true});

guildSchema.index({guildId: 1}, {unique: true});

module.exports = mongoose.model('Guild', guildSchema);