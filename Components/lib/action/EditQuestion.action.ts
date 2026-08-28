"use server";

import dbConnect from "../dbConnect";
import validateBody from "../validateBody";
import mongoose from "mongoose";
import { actionError } from "../response";
import EditQuestionSchema from "../schema/EditQuestionSchema";
import Contact from "@/database/contact.model";

export async function MessageCreate(params:{
    messageId:string,
    name:string,
    email:string,
    content:string,
    tags: string[],
}) : Promise<{
    success:boolean,
    data?: {
        _id:string
        name:string;
        email: string;
        content: string;
        tags: string[];
    }
}> {
    await dbConnect();
    const validatedData=validateBody(params,EditQuestionSchema);
    const {name,email,content,tags,messageId}=validatedData;
    const session=await mongoose.startSession();
    session.startTransaction();

    try{
        const message=await Contact.findById(messageId).populate("tags");
        if(!message){
            throw new Error('Fail to get a Message');
        }

        if(message.name !== name || message.email !==email || message.content!==content){
            message.name=name;
            message.email=email;
            message.content=content;
            await message.save()
        }
        await session.commitTransaction();
        return {success:true, data: JSON.parse(JSON.stringify(message))}

    }catch(e){
        return actionError(e);
    }
}