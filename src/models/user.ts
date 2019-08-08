import { Document, Model } from "mongoose";

import Store from "persistence/store";

const { mongoose } = Store.instance;
const { Schema } = mongoose;

export interface IUser extends Document {
    username: string;
    server: string;
    points: number;
    pointsWeekly: number;
    createdAt: Date;
    modifiedAt: Date;
    isBot: boolean;
}

const userSchema = new Schema({
    id: {type: String, required: true},
    username: {type: String, required: true},
    server: {type: String, required: true},
    isBot: {type: Boolean, default: false},
    points: {type: Number, default: 0},
    pointsWeekly: {type: Number, default: 0},
}, {timestamps: true});

userSchema.index({id: 1, server: 1}, {unique: true});

export default mongoose.model<IUser>("User", userSchema);