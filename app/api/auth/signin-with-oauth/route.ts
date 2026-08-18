import dbConnect from "@/Components/lib/dbConnect";
import { handleSuccessResponse } from "@/Components/lib/response";
import signinWithOauthSchema from "@/Components/lib/schema/signinWithOauthSchema";
import validateBody from "@/Components/lib/validateBody";
import Account from "@/database/account.model";
import User from "@/database/user.model";
import mongoose from "mongoose";
import slugify from "slugify";

export async function POST(request:Request){
    const {provider,providerAccountId,user}=await request.json();
    await dbConnect();

    const session=await mongoose.startSession();
    session.startTransaction();

    try{
        const validateData=validateBody({
            provider,
            providerAccountId,
            user,
        },signinWithOauthSchema)

        const {username,email,image}= validateData.user;

        let  existingUser=await User.findOne({
            email,
        }).session(session);

        if(!existingUser){
            const [newUser]=await User.create([
                {
                    email,
                    image,
                    username:slugify(username,{
                        lower:true,
                        trim:true,
                        strict:true,
                    })
                }
            ],{session});
            existingUser=newUser;
        }else{
            await User.updateOne({
                _id: existingUser._id
            },{
                $set:{
                    username,
                    image,
                }
            }).session(session);
        }

        const existingAccount=await Account.findOne({
            userId:existingUser._id,
            provider,
            providerAccountId,
        }).session(session);

        if(!existingAccount){
            await Account.create([
                {
                    userId:existingUser._id,
                    provider,
                    providerAccountId,
                    username,
                    image,
                    email,
                }
            ],{session})
        }

        await session.commitTransaction();
        return handleSuccessResponse({
            existingUser,
        })

    }catch(error:unknown){
        console.log(error);
        session.abortTransaction();
    }finally{
        session.endSession();
    }
}