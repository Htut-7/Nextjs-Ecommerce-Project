import mongoose, { Schema, Document, models } from "mongoose";

export interface IComment {
  content: string;
  message: mongoose.Types.ObjectId;
  author: mongoose.Types.ObjectId;
  likeVote: number,
  dislikeVote: number,
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

const Comment =
  models.Comment ||
  mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;