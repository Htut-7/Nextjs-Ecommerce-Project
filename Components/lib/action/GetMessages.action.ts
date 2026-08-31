/* eslint-disable @typescript-eslint/no-unused-vars */
import Contact, { IContactDoc } from "@/database/contact.model"
import dbConnect from "../dbConnect"
import validateBody from "../validateBody";
import PaginatedSearchParamsSchema from "../schema/PaginatedSearchParamsSchema";
import { FilterQuery } from "mongoose";
import { actionError } from "../response";

export async function GetMessages(params:{
    page?: number,
    pageSize?: number,
    sort?: string,
    filter?: string,
    search?: string,
}): Promise<{
    data?:{
        messages: IContactDoc[],
        isNext: boolean,
    },
    success:boolean,
    message?: string,
    detail?: object | null,
}>{
    await dbConnect();
    const validatedData=validateBody(params,PaginatedSearchParamsSchema);
    const {page=1, pageSize=10, sort, filter, search}=validatedData;

    const skip=Number(page)-1 * pageSize;
    const limit=Number(pageSize);

    const filterQuery: FilterQuery<typeof Contact>={};

    if(filter==='recommended'){
        return {success: true, data: {messages:[], isNext:false}}
    }

    if(search){
        filterQuery.$or=[
            {title: {$regex: new RegExp(search,"i")}},
            {content: {$regex: new RegExp(search,"i")}}
        ]
    }

    let sortingCriteria={}

    switch(filter){
        case "newest":{
            sortingCriteria={createdAt:-1}
        }

        default:{
            sortingCriteria={createdAt: -1}
        }
    }

    try{
        const totalMessage=await Contact.countDocuments(filterQuery);
        const message=await Contact.find(filterQuery)
                      .populate("tags","name")
                      .lean()
                      .sort(sortingCriteria)
                      .skip(skip)
                      .limit(limit)

        const isNext=totalMessage> skip + message.length
        return {success: true, data:{
            messages: JSON.parse(JSON.stringify(message)),
            isNext
        }}
    }catch(e){
        return actionError(e);
    }
}