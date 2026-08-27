"use server";

import dbConnect from "../dbConnect";
import validateBody from "../validateBody";
import MessageCreateSchema from "../schema/MessageCreateSchema";
import mongoose from "mongoose";
import { actionError } from "../response";
import Contact from "@/database/contact.model";
import Tags from "@/database/Tags.model";

import tagMessage from "@/database/tagMessage.model";

export async function MessageCreate(params:{
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
}> 


{
    await dbConnect();
    console.log("🔥 MESSAGE PARAMS:", params);
    const validatedData=validateBody(params,MessageCreateSchema);
    console.log("🔥 VALIDATED:", validatedData);
    const {name,email,content,tags}=validatedData;
    const session=await mongoose.startSession();
    session.startTransaction();

    try{
        const [message]=await Contact.create([
            {
                name,
                email,
                content,
            }
        ],{session})

        if(!message){
            throw new Error('Fail to create Message');
        }

        const tagIds: mongoose.Types.ObjectId[]=[];
        const tagMessageDocument=[];

        for(const tag of tags){
            const existingTags=await Tags.findOneAndUpdate(
                {name: {$regex: new RegExp(`^${tag}$`,"i")}},
                {$setOnInsert:{name:tag,}, $inc:{messages:1}},
                {upsert:true, returnDocument:"after", session}
            )

            if(!existingTags){
                throw new Error("Failed to create or find Tag");
            }

            tagIds.push(existingTags._id);
            tagMessageDocument.push({
                tag: existingTags._id,
                message: message._id,
            })
        }

        await tagMessage.insertMany(tagMessageDocument,{
            session,
        })

        const updatedMessage=await Contact.findByIdAndUpdate(
            message._id,{
                $push:{
                    tags:{
                        $each: tagIds,
                    },
                },
            },
            {session}
        );

        await session.commitTransaction();
        return {success:true, data: JSON.parse(JSON.stringify(updatedMessage))}

    }catch(e){
        await session.abortTransaction();
        return actionError(e);
    }finally{
        await session.endSession();
    }
}