import mongoose, { Schema, Document, models } from "mongoose";

interface IComment {
  content: string;
  message: mongoose.Types.ObjectId;
  author: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICommentDoc extends IComment, Document {}

const CommentSchema = new Schema<IComment>(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: Schema.Types.ObjectId,
      ref: "Contact",
      required: true,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Comment =
  models.Comment ||
  mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;