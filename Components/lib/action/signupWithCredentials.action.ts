"use server";

import dbConnect from "../dbConnect";
import mongoose from "mongoose";
import { actionError } from "../response";
import validateBody from "../validateBody";
import signupWithCredentialsSchema from "../schema/signupWithCredentialSchema";
import User from "@/database/user.model";
import Account from "@/database/account.model";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";

export async function signupWithCredentials(params: {

  email: string;
  password: string;
  username: string;
}) {
  await dbConnect();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const validatedData = validateBody(params, signupWithCredentialsSchema);
    const { email, username, password } = validatedData;

    const existingEmail = await User.findOne({ email }).session(session);

    if (existingEmail) {
      throw new Error("Email already exists");
    }

    const existingUsername = await User.findOne({ username }).session(session);

    if (existingUsername) {
      throw new Error("Username already exists");
    }

    const [newUser] = await User.create(
      [
        {
          email,
          username,
        },
      ],
      { session }
    );

    await Account.create(
      [
        {
          userId: newUser._id,
          password: await bcrypt.hash(password, 10),
          provider: "credentials",
          providerAccountId: email,
          email,
          username,   
        },
      ],
      { session }
    );
    await session.commitTransaction();
    await signIn('credentials',{email,password,redirect:false})
    return { success: true };
  } catch (error) {
    console.error("SIGNUP ERROR:", error);

  if (session.inTransaction()) {
    await session.abortTransaction();
  }

  return actionError(error);
  } finally {
    await session.endSession();
  }
}