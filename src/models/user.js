const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {type: String, required: true},
    username: {type: String, required: true},
    points: Number,
}, {timestamps: true});

userSchema.index({id: 1}, {unique: true});

module.exports = mongoose.model('User', userSchema);