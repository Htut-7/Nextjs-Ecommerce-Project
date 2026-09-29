"use server";

import Collection, { ICollection } from "@/database/collection.model";
import dbConnect from "../dbConnect";
import { auth } from "@/auth";
import User from "@/database/user.model";
import validateBody from "../validateBody";
import PaginatedSearchParamsSchema from "../schema/PaginatedSearchParamsSchema";
import { actionError } from "../response";
import { PipelineStage } from "mongoose";
import mongoose from "mongoose";

export async function GetBookmark(params:{
    page?: number,
    pageSize?: number,
    search?: string,
    sort?: string,
    filter?: string,
}):Promise<{
    success: boolean,
    data?:{
        collection: ICollection[],
        isNext: boolean,
    }
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

    const userId=user._id;
    if(!userId){
        return{
            success: true,
            data: {
                collection: [], isNext:false
            }
        }
    };

    const validatedData=validateBody(params,PaginatedSearchParamsSchema);
    const {page=1, pageSize=10, search, filter}=validatedData;

    const skip=(Number(page)-1)*10;
    const limit=Number(pageSize);

    const sortOption: Record<string, Record<string, 1|-1>>={
        popular: {"contact.likeVote": -1},
        oldest: {"contact.createdAt": 1},
        newest: {"contact.createdAt": -1},
    };

    const sortOptionResult=sortOption[filter] || sortOption.newest;

    try{
        const pipeline: PipelineStage[]=[
            {
                $match: {author: new mongoose.Types.ObjectId(userId)}
            },
            {
                $lookup:{
                    from: "contact",
                    foreignField: "_id",
                    localField: "contact",
                    as: "contact"
                }
            },{$unwind: "$contact"},

            {
                $lookup:{
                    from: "users",
                    localField: "contact.author",
                    foreignField: "_id",
                    as: "contact.author"
                }
            },{$unwind: "$contact.author"},

            {
                $lookup:{
                    from: "tags",
                    localField: "contact.tags",
                    foreignField: "_id",
                    as: "contact.tags"
                }
            },
        ];

        if(search){
            pipeline.push({
                $match:{
                    $or:[
                        {content: {$regex: new RegExp(search, "i")}},
                    ]
                }
            })
        };

        const [collectionCount]=await Collection.aggregate([
            ...pipeline,
            {$count: "count"},
        ]);

        const totalCollection=collectionCount?.count || 0;

        const collections=await Collection.aggregate([
            ...pipeline,
            {$skip: skip},
            {$limit: limit},
            {$sort: sortOptionResult},
        ]);

        const isNext=totalCollection > skip+ collections.length;

        return{
            success: true,
            data:{
                collection: JSON.parse(JSON.stringify(collections)),
                isNext,
            }
        }

    }catch(e){
        return actionError(e);
    }
}