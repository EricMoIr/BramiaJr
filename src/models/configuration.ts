import { Document } from "mongoose";

import Store from "persistence/store";

const { mongoose } = Store.instance;
const { Schema } = mongoose;

interface IConfiguration extends Document {
    name: string;
    value: string;
}

const configurationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: { unique: true, dropDups: true }
    },
    value: { type: String, required: true },
  },
);

export default mongoose.model<IConfiguration>("Configuration", configurationSchema); // <IConfigurationModel>
