"use server";

import dbConnect from "../dbConnect";
import validateBody from "../validateBody";
import mongoose from "mongoose";
import { actionError } from "../response";
import EditQuestionSchema from "../schema/EditQuestionSchema";
import Contact from "@/database/contact.model";
import Tags, { ITagDoc } from "@/database/Tags.model";
import tagMessage from "@/database/tagMessage.model";

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
            await message.save({session})
        }

        const tagsToAdd=tags.filter((tag:string)=>!message.tags.includes(tag.toLowerCase()));

        const tagsToRemove=message.tags.filter((tag:ITagDoc)=>!tags.filter(tag.name.toLowerCase()));

        if(tagsToRemove.length){
            const tagsIdToRemove=tags.map((tag:ITagDoc)=>tag._id);

            await Tags.updateMany(
                {_id: {$in: tagsIdToRemove}},
                {$inc: {messages:-1}},
                {session},
            );

            message.tags=message.tags.filter((tagid: mongoose.Types.ObjectId)=>!tagsToRemove(tagid));

            await tagMessage.deleteMany({
                tag: {$in: tagsIdToRemove},
                message: messageId,
            });
        }

        if(tagsToAdd.length){
            const newTagDocuments=[];
            for(const tag of tagsToAdd){
                const existingTag=await Tags.findOneAndUpdate(
                    {name: {$regex: new RegExp(`^${tag}$`,"i")}},
                    {$setOnInsert: {name:tag}, $inc: {messages:1}},
                    {upsert: true, new:true, session}
                );
                if(existingTag){
                    const existingTagMessage=await tagMessage.findOne({
                        tag: existingTag._id,
                        message: messageId,
                    });
                
                if(!existingTagMessage){
                    newTagDocuments.push({
                        tag: existingTag._id,
                        message: messageId,
                    });
                }
             }
                if (
                    !message.tags.find(
                        (tagId: mongoose.Types.ObjectId) => tagId.equals(existingTag._id)
                    )
                    ) {
                    message.tags.push(existingTag._id);
                }
            }
        }
        await message.save({session});
        await session.commitTransaction();
        return {success:true, data: JSON.parse(JSON.stringify(message))}

    }catch(e){
        return actionError(e);
    }
}