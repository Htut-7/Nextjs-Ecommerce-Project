"use server";

import Contact, { IContactDoc } from "@/database/contact.model"
import dbConnect from "../dbConnect"
import mongoose from "mongoose"
import { actionError } from "../response"
import validateBody from "../validateBody"
import CreateCommentSchema from "../schema/CreateCommentSchema"
import { auth } from "@/auth"
import User from "@/database/user.model"
import Comment from "@/database/CommentModel.model";

export async function CreateComment(params : {messageId: string, content: string}) : Promise<{
    success: boolean,
    data?:{
        newComment: IContactDoc
    },
    message?: string,
    details?: object | null
}>{
    await dbConnect();
    const authSession=await auth();

    if(!authSession?.user?.email){
        throw new Error("Unauthorized");
    }

    const user=await User.findOne({
        email: authSession.user.email
    });

    if(!user){
        throw new Error("User not found.");
    }

    const session=await mongoose.startSession();
    session.startTransaction();
    const validatedData=validateBody(params,CreateCommentSchema);
    const {messageId, content}=validatedData;

    try{
        const comment= await Contact.findById(messageId);

        if(!comment) throw new Error('Message not found');

        const [newComment]=await Comment.create([
            {
                author: user._id,
                content,
                message: messageId,
            },
        ],{session});

        comment.message +=1;
        await comment.save({session});
        await session.commitTransaction();

        return{
            success: true,
            data:{
                newComment: JSON.parse(JSON.stringify(newComment)),
            }
        };
    }catch(e){
        session.abortTransaction();
        return actionError(e);
    }finally{
        await session.endSession();
    }
}