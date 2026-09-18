import { actionError } from "../response";
import IncreaseViewSchema from "../schema/IncreaseViewSchema"
import validateBody from "../validateBody"
import Contact from "@/database/contact.model";

export async function IncreaseView(params: {messageId: string}) : Promise<{
    success: boolean,
    data?: {views: number},
    message?: string,
    details?: object | null
}>{
    const validatedData=validateBody(params,IncreaseViewSchema);
    const {messageId}=validatedData;

    try{
        const message=await Contact.findById(messageId);
        
        if(!message) throw new Error("Message not found");

        message.views +=1;
        await message.save();

        return {
            success: true,
            data: {
                views: messageId,
            }
        }

    }catch(e){
        return actionError(e);
    }
}