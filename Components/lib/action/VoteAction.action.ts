"use server";

import { auth } from "@/auth";
import dbConnect from "../dbConnect";
import VoteActionSchema from "../schema/VoteActionSchema";
import validateBody from "../validateBody";
import mongoose from "mongoose";
import User from "@/database/user.model";
import { actionError } from "../response";
import Contact from "@/database/contact.model";
import Vote from "@/database/vote.model";
import Comment from "@/database/CommentModel.model";

export async function VoteAction(params: {
    type: "message" | "comment",
    typeId: string,
    voteType: "like" | "dislike";
}) : Promise<{
    success: boolean;
    data?: {
        likeVote: number;
        dislikeVote: number;
        userVote: "like" | "dislike" | null;
    },
    message?: string;
    details?: object | null;
}>{
    await dbConnect();
    const session=await mongoose.startSession();
    session.startTransaction();
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

    const validatedData=validateBody(params, VoteActionSchema);
    const {type, typeId, voteType}=validatedData;

    try{
       const item= type==="message" ? await Contact.findById(typeId).session(session) : await Comment.findById(typeId).session(session);

        if(!item){
            throw new Error("Item not found");
        }

        const existingVote=await Vote.findOne(
            {
                author: userId,
                type_id: typeId,
                type,
            }).session(session);
            
            let newLike= item.likeVote || 0;
            let newDislike= item.dislikeVote || 0;
            let userVote: "like" | "dislike" | null = null;

            if(existingVote){
                if(existingVote.votetype===voteType){
                    if(voteType==="like"){
                        newLike= Math.max(0, newLike-1);
                    }else{
                        newDislike=Math.max(0, newDislike-1);
                    }
                    await Vote.findByIdAndDelete(existingVote._id).session(session);
                    userVote=null
                }else{
                    if(existingVote.votetype==="like"){
                        newLike= Math.max(0, newLike-1);
                        newDislike +=1;
                    }else{
                        newDislike= Math.max(0, newDislike-1);
                        newLike+=1;
                    }
                    existingVote.votetype=voteType;
                    await existingVote.save({session});
                }
            }else{
                await Vote.create([
                    {
                        author: userId,
                        type_id: typeId,
                        type,
                        votetype: voteType,
                    }
                ],{session});

                if(voteType==="like"){
                    newLike+=1;
                }else{
                    newDislike+=1;
                }
                userVote=voteType;
            }

            item.likeVote=newLike;
            item.dislikeVote=newDislike;
            await item.save({session});

            return{
                success: true,
                data:{
                    likeVote: newLike,
                    dislikeVote: newDislike,
                    userVote,
                }
            }

    }catch(e){
        await session.abortTransaction();
        return actionError(e)
    }finally{
        await session.endSession();
    }
}