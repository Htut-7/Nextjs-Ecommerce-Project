import dbConnect from "../dbConnect"
import validateBody from "../validateBody";
import GetTagMessagesSchema from "../schema/GetTagMessagesSchema";
import { actionError } from "../response";
import Tag, { ITagDoc } from "@/database/Tags.model";
import { FilterQuery } from "mongoose";
import Contact, { IContactDoc } from "@/database/contact.model";

export async function GetTagMessages(params: {
    page?: number,
    pageSize?: number,
    search?: string,
    sort?: string,
    tagId?: string
}): Promise<{
    success: boolean,
    data?:{
        tag: ITagDoc,
        messages: IContactDoc[],
        isNext: boolean
    },
    message?: string | undefined,
    detail?: object | null,
}>{
    await dbConnect();
    const validatedData=validateBody(params,GetTagMessagesSchema);
    const {tagId, page=1, pageSize=10, search}=validatedData;

    const skip=(Number(page)-1)*10;
    const limit=Number(pageSize);

    try{
        const tag=await Tag.findById(tagId);
        if(!tag) throw new Error('Tag not found.');

        const filterQuery: FilterQuery<typeof Contact>={
            tags: {$in: tagId}
        }

        if(search){
            filterQuery.name= {$regex: new RegExp(search, "i")}
        }

        const totalMessages=await Contact.countDocuments(filterQuery);
        const messages=await Contact.find(filterQuery)
        .select("name email content tags")
        .populate("tags", "name")
        .lean()
        .skip(skip)
        .limit(limit)

        const isNext=totalMessages>skip + messages.length;

        return {
            success:true,
            data: {
                tag: JSON.parse(JSON.stringify(tag)),
                messages: JSON.parse(JSON.stringify(messages)),
                isNext,
            }
        }

    }catch(e){
        return actionError(e);
    }
}