"use server";

import Contact, { IContactDoc } from "@/database/contact.model";
import dbConnect from "../dbConnect";
import validateBody from "../validateBody";
import GetUserMessageSchema from "../schema/GetUserMessageSchema";
import { actionError } from "../response";

export async function GetUserMessage(params:{
    userId: string;
    page: number;
    pageSize: number;
}) : Promise<{
    success: boolean;
    data?: {
        message: IContactDoc[];
        isNext?: boolean;
    },
    message?: string;
    details?: object | null;
}>{
    await dbConnect();

    const validatedData=validateBody(params,GetUserMessageSchema);
    const {userId, page=1, pageSize=10}=validatedData;

    const skip=(Number(page)-1)*10;
    const limit=Number(pageSize);

    try{
        const totalMessage=await Contact.countDocuments({author: userId});

        const message=await Contact.find({author: userId})
                        .populate("author","name image")
                        .populate("tag", "name")
                        .sort({createdAt: -1})
                        .skip(skip)
                        .limit(limit);

        const isNext=totalMessage > skip + message.length;

        return{
            success: true,
            data:{
                message: JSON.parse(JSON.stringify(message)),
                isNext,
            }
        }

    }catch(e){
        return actionError(e);
    }

}