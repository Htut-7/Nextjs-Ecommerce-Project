/* eslint-disable @typescript-eslint/no-unused-vars */
import Contact, { IContactDoc } from "@/database/contact.model"
import dbConnect from "../dbConnect"
import validateBody from "../validateBody";
import PaginatedSearchParamsSchema from "../schema/PaginatedSearchParamsSchema";
import { FilterQuery } from "mongoose";
import { actionError } from "../response";
import Tag, { ITagDoc } from "@/database/Tags.model";

export async function GetTags(params:{
    page?: number,
    pageSize?: number,
    sort?: string,
    filter?: string,
    search?: string,
}): Promise<{
    data?:{
        tags: ITagDoc[],
        isNext: boolean,
    },
    success:boolean,
    message?: string,
    detail?: object | null,
}>{
    await dbConnect();
    const validatedData=validateBody(params,PaginatedSearchParamsSchema);
    const {page=1, pageSize=10, sort, filter, search}=validatedData;

    const skip=(Number(page)-1) * pageSize;
    const limit=Number(pageSize);

    const filterQuery: FilterQuery<typeof Tag>={};

    

    if(search){
        filterQuery.$or=[
            {name: {$regex: new RegExp(search, "i")}}
        ]
    }

    let sortingCriteria={}

    switch(filter){
        case "popular":
            sortingCriteria={messages: -1};
            break; 

        case "recent":
            sortingCriteria={createdAt: -1};
            break;

        case "oldest":
            sortingCriteria={createdAt: 1};
            break;

        case "name":
            sortingCriteria={name: 1};
            break;

        default:{
            sortingCriteria={messages: -1}
        }
    }

    try{
        const totalTags=await Tag.countDocuments(filterQuery);
        const message=await Tag.find(filterQuery)
                      .lean()
                      .sort(sortingCriteria)
                      .skip(skip)
                      .limit(limit)

        const isNext=totalTags> skip + message.length
        return {success: true, data:{
            tags: JSON.parse(JSON.stringify(message)),
            isNext
        }}
    }catch(e){
        return actionError(e);
    }
}