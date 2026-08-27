import { models, Schema, Types, model, Document } from "mongoose";

export interface ITagMessage {
  tag: Types.ObjectId;
  message: Types.ObjectId;
}

export interface ITagMessageDoc extends ITagMessage, Document {}

const tagMessageSchema = new Schema({
  tag: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Tag",
  },

  message: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Contact",
  },
});

tagMessageSchema.index(
  { tag: 1, message: 1 },
  { unique: true }
);

const tagMessage =
  models?.tagMessage ||
  model<ITagMessage>("tagMessage", tagMessageSchema);

export default tagMessage;