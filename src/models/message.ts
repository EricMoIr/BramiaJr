import { Document } from "mongoose";

import { IUser } from "models/user";
import Store from "persistence/store";

const { mongoose } = Store.instance;
const { Schema, Types: { ObjectId } } = mongoose;

interface IMessage extends Document {
    content: string;
    author: IUser;
    time: Date;
    createdAt: Date;
    modifiedAt: Date;
}

const messageSchema = new Schema({
    content: { type: String, required: true },
    author: { type: ObjectId, ref: "User", required: true },
    time: { type: Date, default: 0 },
}, { timestamps: true });

export default mongoose.model<IMessage>("Message", messageSchema);