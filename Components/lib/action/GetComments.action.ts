import Comment, { type IComment } from "@/database/comment.model";
import dbConnect from "../dbConnect";
import validateBody from "../validateBody";
import GetCommentsSchema from "../schema/GetCommentsSchema";
import { actionError } from "../response";

export async function GetComments(params:{
    page: number,
    pageSize: number,
    filter: string,
    messageId: string
}) : Promise<{
    success: boolean,
    data?:{
        comments: IComment[],
        isNext: boolean,
        totalComments: number,
    },
    message?: string,
    details?: object | null,
}>{
    await dbConnect();
    const validatedData=validateBody(params, GetCommentsSchema);
    const {page=1, pageSize=10, filter, messageId}=validatedData;

    const skip=(Number(page) -1) * pageSize;
    const limit=Number(pageSize);

    let sortCriteria={};

    switch(filter){
        case "latest":
            sortCriteria={ createdAt: -1};
            break;
        
        case "oldest":
            sortCriteria={createdAt: 1};
            break;

        // case "popular":
        //     sortCriteria={upvotes: -1};
        //     break;

        default:
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            sortCriteria={createdAt: -1};
    }

    try{
        const totalComments= await Comment.countDocuments({message: messageId});

        const comments=await Comment.find({message: messageId})
                        .populate("author","name image email")
                        .sort(sortCriteria)
                        .skip(skip)
                        .limit(limit)

        const isNext= totalComments > skip + comments.length;

        return {
            success: true,
            data: {
                comments: JSON.parse(JSON.stringify(comments)),
                totalComments,
                isNext
            }
        }
    }catch(e){
        return actionError(e);
    }
}