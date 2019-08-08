import { Document } from "mongoose";

import Store from "persistence/store";

const { mongoose } = Store.instance;
const { Schema } = mongoose;

interface IGuild extends Document {
    name: string;
    defaultChannelId: string;
    meetingChannelId: string;
    leftServer: boolean;
    createdAt: Date;
    modifiedAt: Date;
}

const guildSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      index: { unique: true, dropDups: true }
    },
    name: { type: String, required: true },
    defaultChannelId: String,
    meetingChannelId: String,
    leftServer: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model<IGuild>("Guild", guildSchema); // <IGuildModel>
