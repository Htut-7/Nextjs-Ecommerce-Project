import { Schema, model, models, Document } from "mongoose";

export interface ITag {
  name: string;
  messages: number;
}

export interface ITagDoc extends ITag, Document {}

const tagSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },

    messages: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Tag = models?.Tag || model<ITag>("Tag", tagSchema);

export default Tag;