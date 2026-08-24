import { Schema,Document, model, models, Types } from "mongoose";

export interface IAccount extends Document {
  userId: Types.ObjectId,
  username: string;
  email: string;
  password?: string;
  provider: string;
  providerAccountId: string;
  image?: string;
}

const AccountSchema=new Schema(
    {
      userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
        username: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: false,
    },

    provider: {
      type: String,
      required: true,
      trim: true,
    },

    providerAccountId: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
  type: String,
  required: false,
},
  },
  {
    timestamps: true,
  }
);

const Account=models?.Account || model<IAccount>("Account",AccountSchema)

export default Account;
