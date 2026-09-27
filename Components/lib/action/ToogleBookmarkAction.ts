"use server";

import { auth } from "@/auth";
import dbConnect from "../dbConnect";
import ToogleBookmarkSchema from "../schema/ToogleBookmarkSchema";
import validateBody from "../validateBody";
import User from "@/database/user.model";
import { actionError } from "../response";
import Contact from "@/database/contact.model";
import Collection from "@/database/collection.model";

export async function ToogleBookmarkAction(params:{
    messageId: string;
}) : Promise<{
    success: boolean;
    data?: {
        saved: boolean, 
    },
    message?: string;
    details?: object | null;
}>{
    await dbConnect();
    const validatedData=validateBody(params,ToogleBookmarkSchema);
    const {messageId}=validatedData;
    
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

    try{
        const message=await Contact.findById(messageId);
        if(!message){
            throw new Error("Message not found");
        }

        const collection=await Collection.findOne({
            author: userId,
            message: messageId,
        });
        
        if(collection){
            await Collection.findByIdAndDelete(collection._id);
            return{
                success: true,
                data:{
                    saved: false,
                }
            }
        }

        await Collection.create({
            author: userId,
            message: messageId
        });

        return{
            success: true,
            data: {
                saved: true,
            }
        }

    }catch(e){
        return actionError(e);
    }
}