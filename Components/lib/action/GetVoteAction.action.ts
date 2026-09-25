"use server";
import { auth } from "@/auth";
import dbConnect from "../dbConnect";
import User from "@/database/user.model";
import { actionError } from "../response";
import validateBody from "../validateBody";
import GetVoteSchema from "../schema/GetVoteSchema";
import Vote from "@/database/vote.model";

export async function GetVoteAction(params:{
    type: "message" | "comment",
    typeId: string,
}) : Promise<{
    success: boolean,
    data?:{
        userVote: "like" | "dislike" | null;
    },
    message?: string;
    details?: object | null;
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
        throw new Error("User not found");
    }

    try{
        const validatedData=validateBody(params, GetVoteSchema);
        const {type, typeId}= validatedData;

        const vote=await Vote.findOne({
            author: user._id,
            type,
            type_id: typeId,
        });

        return {
            success: true,
            data:{
                userVote: vote?.votetype || null,
            }
        }

    }catch(e){
        return actionError(e);
    }

}