const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const messageSchema = new Schema({
    content: {type: String, required: true},
    author: {type: ObjectId, ref: 'User', required: true},
    time: {type: Date, default: 0},
}, {timestamps: true});

messageSchema.index({id: 1}, {unique: true});

module.exports = mongoose.model('Message', messageSchema);