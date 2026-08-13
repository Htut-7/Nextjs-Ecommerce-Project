import { handleErrorResponse, handleSuccessResponse } from "@/Components/lib/response";
import User from "@/database/user.model";

export async function POST(request: Request){
    try{
        const {email}=await request.json();
        const user=await User.findOne({email})

        if(!user){
            throw new Error('User not found');
        }

        return handleSuccessResponse(user);
    }catch(e){
        return handleErrorResponse(e)
    }
}