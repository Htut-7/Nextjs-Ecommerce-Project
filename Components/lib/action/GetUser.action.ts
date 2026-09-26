"use server";

import User, { IuserDoc } from "@/database/user.model";
import dbConnect from "../dbConnect";
import validateBody from "../validateBody";
import PaginatedSearchParamsSchema from "../schema/PaginatedSearchParamsSchema";
import { FilterQuery } from "mongoose";
import { actionError } from "../response";

export async function GetUser(params:{
    page?: number,
    pageSize?: number,
    search?: string,
    filter?: string,
    sort?: string,
}) : Promise<{
    success: boolean,
    data?:{
        user: IuserDoc[];
        isNext: boolean;
    },
    message?: string;
    details?: object | null;
}>{
    await dbConnect();
    const validatedData=validateBody(params, PaginatedSearchParamsSchema);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {page=1, pageSize=10, search, sort, filter}=validatedData;

    const skip=(Number(page)-1)*10;
    const limit= Number(pageSize);

    const filterQuery: FilterQuery<typeof User>={};

    if(search){
        filterQuery.$or=[
            {name: {$regex: new RegExp(search, "i")}},
            {email: {$regex: new RegExp(search, "i")}},
        ]
    };

    let sortCriteria={};

    switch(filter){
        case "newest":
            sortCriteria={createdAt: -1};
            break;

        case "oldest":
            sortCriteria={createdAt: 1};
            break;

        case "popular":
            sortCriteria={reputation: -1};
            break;

        default:
            sortCriteria={createdAt: -1};
            break;
    }

    try{
        const totalUser=await User.countDocuments(filterQuery);
        const user=await User.find(filterQuery)
                    .skip(skip)
                    .limit(limit)
                    .sort(sortCriteria)

        const isNext=totalUser > skip + user.length;

        return{
            success: true,
            data:{
                user: JSON.parse(JSON.stringify(user)),
                isNext,
            }
        }
        

    }catch(e){
        return actionError(e);
    }

}