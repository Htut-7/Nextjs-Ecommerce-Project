"use server";

import User from "@/database/user.model";
import dbConnect from "../dbConnect"
import { actionError } from "../response";
import signupWithCredentialsSchema from "../schema/signupWithCredentialSchema";
import validateBody from "../validateBody";
import mongoose from "mongoose";
import Account from "@/database/account.model";
import bcrypt from  "bcryptjs";
import { signIn } from "@/auth";

export async function signupWithCredentail(params:{
    email:string,
    username:string,
    password:string
}){
    await dbConnect();
    const session=await mongoose.startSession();
    session.startTransaction();

    try{
    const validatedData=validateBody(params,signupWithCredentialsSchema);
    const {username,email,password}=validatedData;

    const existingUser=await User.findOne({email});
    
    if(existingUser){
        throw new Error("Email already exists");
    }

    const existingUsername=await User.findOne({username});

    if(existingUsername){
        throw new Error("Username already exists");
    }

    const [newUser] =await User.create([
        {   
            username,
            email,
        }
    ],{
        session
    });

    await Account.create([
        {
            userId: newUser._id,
            username,
            email,
            provider:"credentials",
            providerAccountId:email,
            password: await bcrypt.hash(password,10),
        }
    ],{
        session
    });

    await session.commitTransaction();
    await signIn("credentials",{email,password,redirect:false})
    return {success:true};

    }catch(error){
        await session.abortTransaction();
        return actionError(error);
    }finally{
        await session.endSession();
    }

}