"use server";

import dbConnect from "../dbConnect";
import validateBody from "../validateBody";
import mongoose from "mongoose";
import { actionError } from "../response";
import GetMessageSchem from "../schema/GetMessageSchema";
import Contact, { IContact } from "@/database/contact.model";
import Collection from "@/database/collection.model";
import { auth } from "@/auth";
import User from "@/database/user.model";

export async function GetMessage(params:{
    messageId:string,
    name:string,
    email:string,
    content:string,
    tags: string[],
}) : Promise<{
    success:boolean,
    data?: IContact
}>{
    await dbConnect();
    const validatedData=validateBody(params,GetMessageSchem);
    const {messageId}=validatedData;
    const session=await mongoose.startSession();
    session.startTransaction();
    

    try{

        const authSession=await auth();

        if(!authSession?.user?.email){
            throw new Error("Unauthorized");
        }

        const user=await User.findOne({
            email: authSession.user.email
        });

        if(!user){
            throw new Error("User not found");
        }
        
        const userId=user._id;

        const message=await Contact.findById(messageId).populate('tags');
        if(!message){
            throw new Error('Fail to create Message');
        }

       const collection= await Collection.findOne({
            author: userId,
            message: messageId,
        })

        return {success:true, data: {...JSON.parse(JSON.stringify(message)),saved: !!collection}}
    }catch(e){
        return actionError(e);
    }
}