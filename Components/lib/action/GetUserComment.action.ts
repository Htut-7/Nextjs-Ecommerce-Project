"use server";

import Comment, { ICommentDoc } from "@/database/CommentModel.model";
import dbConnect from "../dbConnect";
import validateBody from "../validateBody";
import GetUserCommentSchema from "../schema/GetUserCommentSchema";
import { actionError } from "../response";

export async function GetUserComment(params:{
    userId: string;
    page?: number;
    pageSize?: number;
}) : Promise<{
    success: boolean;
    data?: {
        comment: ICommentDoc[];
        isNext: boolean;
    },
    message?: string;
    details?: object | null;
}>{
    await dbConnect();

    const validatedData=validateBody(params,GetUserCommentSchema);
    const {userId, page=1, pageSize=10}=validatedData;

    const skip=(Number(page)-1)*10;
    const limit=Number(pageSize);

    try{
        const totalComments=await Comment.countDocuments({author: userId});

        const comments=await Comment.find({author: userId})
                        .populate("message","_id name")
                        .populate("author","_id name image")
                        .sort({createdAt: -1})
                        .skip(skip)
                        .limit(limit);

        const isNext= totalComments > skip + comments.length;

        return{
            success: true,
            data: {
                comment: JSON.parse(JSON.stringify(comments)),
                isNext,
            }
        }

    }catch(e){
        return actionError(e);
    }
}