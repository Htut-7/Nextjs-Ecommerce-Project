"use server";

import User, { Iuser } from "@/database/user.model";
import dbConnect from "../dbConnect";
import { actionError } from "../response";
import validateBody from "../validateBody";
import GetUserIdSchema from "../schema/GetUserIdSchema";
import Contact from "@/database/contact.model";
import Comment from "@/database/CommentModel.model";

export async function GetUserId(params: {
    userId: string;
}) : Promise<{
    success: boolean;
    data?:{
        user: Iuser;
        isNext?: boolean;
        totalMessages: number;
        totalComments: number;
    },
    message?: string;
    details?:  object | null;
}>{
    await dbConnect();

    try{
        const validatedData=validateBody(params,GetUserIdSchema);
        const {userId}=validatedData;

        const user=await User.findById(userId);

        console.log("Profile ID:", userId);
console.log("Is MongoDB ObjectId:", /^[a-f\d]{24}$/i.test(userId));

        if(!user){
            throw new Error("User not found");
        }

        const [totalMessages,totalComments]=await Promise.all([
            Contact.countDocuments({author: userId}),
            Comment.countDocuments({author: userId}),
        ]);

        return{
            success: true,
            data:{
                user: JSON.parse(JSON.stringify(user)),
                totalMessages,
                totalComments,
            }
        }

    }catch(e){
        return actionError(e);
    }
}