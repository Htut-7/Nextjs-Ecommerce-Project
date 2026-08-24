"use server";

import dbConnect from "../dbConnect";
import { actionError } from "../response";
import validateBody from "../validateBody";
import User from "@/database/user.model";
import Account from "@/database/account.model";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import signInWithCredentialsSchema from "../schema/signInWithCredentialSchema";

export async function signinWithCredentials(params: {

  email: string;
  password: string;

}) {
  await dbConnect();
  

  try {
    const validatedData = validateBody(params, signInWithCredentialsSchema);
    const { email, password } = validatedData;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new Error("User not found");
    }

    const account=await Account.findOne({
        provider: "credentials",
        providerAccountId: email
    });

    if(!account){
        throw new Error('Account not found')
    }

    const passwordMatch=bcrypt.compare(password,account.password);

    if(!passwordMatch){
        throw new Error('Wrong Password')
    };

    await signIn('credentials',{email,password,redirect:false})
    return { success: true };
  } catch (error) {
    console.error("SIGNUP ERROR:", error);
  return actionError(error);
  } 
}