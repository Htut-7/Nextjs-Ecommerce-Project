"use server";

import dbConnect from "../dbConnect";
import validateBody from "../validateBody";
import mongoose from "mongoose";
import { actionError } from "../response";
import GetMessageSchem from "../schema/GetMessageSchema";
import Contact, { IContact } from "@/database/contact.model";

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
        const message=await Contact.findById(messageId).populate('tags');
        if(!message){
            throw new Error('Fail to create Message');
        }
        return {success:true, data: JSON.parse(JSON.stringify(message))}
    }catch(e){
        return actionError(e);
    }
}