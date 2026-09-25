import mongoose, { Schema, Document, models } from "mongoose";

export interface IContact {
  name: string;
  email: string;
  content: string;
  tags: mongoose.Types.ObjectId[];
  likeVote: number;
  dislikeVote: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContactDoc extends IContact, Document {}

const ContactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],

    likeVote: {
      type: Number,
      default: 0,
    },

    dislikeVote: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Contact =
  models.Contact ||
  mongoose.model<IContact>("Contact", ContactSchema);

export default Contact;