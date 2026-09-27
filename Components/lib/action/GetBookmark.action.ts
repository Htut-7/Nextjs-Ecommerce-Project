"use server";

import Collection, { ICollection } from "@/database/collection.model";
import dbConnect from "../dbConnect";
import validateBody from "../validateBody";
import PaginatedSearchParamsSchema from "../schema/PaginatedSearchParamsSchema";
import { FilterQuery } from "mongoose";
import { auth } from "@/auth";
import User from "@/database/user.model";
import Contact from "@/database/contact.model";
import { actionError } from "../response";

export async function GetBookmark(params: {
    page?: number,
    pageSize?: number,
    search?: string,
    sort?: string,
    filter?: string,
}) : Promise<{
    success: boolean;
    data?:{
        collection: ICollection[];
        isNext: boolean;
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

    const userId=user._id;

    const validatedData=validateBody(params, PaginatedSearchParamsSchema);
    const {page=1, pageSize=10, search, filter}=validatedData;

    const skip=(Number(page)-1)*10;
    const limit=Number(pageSize);

    const filterQuery: FilterQuery<typeof Collection> ={author: userId}

    if(search){
        const matchingMessage=await Contact.find({
            $or:[
                {content: {$regex: new RegExp(search, "i")}},
            ]
        }).select("_id");

        const matchingId=matchingMessage.map(m=>m._id);

        if(!matchingId.length){
            return {
                success: true,
                data:{
                    collection:[],
                    isNext: false,
                }
            }
        }
        filterQuery.message={$in : matchingId};
    }

    let sortCriteria={}

    switch(filter){
        case "popular":
            sortCriteria={reputation: -1};
            break;
        case "oldest":
            sortCriteria={createdAt: 1};
            break;

        case "newest":
            sortCriteria={createdAt: -1};
            break;

        default:
            sortCriteria={createdAt: -1};
            break;
    }

    try{
        const totalCollection=await Collection.countDocuments(filterQuery);
        const collections= await Collection.find(filterQuery)
                            .populate({
                                path: "message",
                                populate:[
                                    {path: "tags", select: "_id name"},
                                ]
                            })
                            .skip(skip)
                            .limit(limit)
                            .sort(sortCriteria);

            const isNext= totalCollection > skip + collections.length;

            return{
                success: true,
                data: {
                    collection: JSON.parse(JSON.stringify(collections)),
                    isNext,
                }
            }
    }catch(e){
        return actionError(e);
    }

}