import { Schema,Document, model, models } from "mongoose";

export interface IAccount extends Document {
  username: string;
  email: string;
  password?: string;
  provider: string;
  providerAccountId: string;
}

const AccountSchema=new Schema(
    {
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
  },
  {
    timestamps: true,
  }
);

const Account=models?.Acccount || model<IAccount>("account",AccountSchema)

export default Account;
