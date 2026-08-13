import { handleErrorResponse, handleSuccessResponse } from "@/Components/lib/response";
import User from "@/database/user.model";
import { Types } from "mongoose";

export async function GET(request: Request, {params} : {params: Promise<{id: string}>}){
    try{
        const { id }=await params;

        if(!Types.ObjectId.isValid(id)){
            throw new Error ('Invalid Id')
        }

        const user=await User.findById(id);

        if(!user){
            throw new Error ('User not found')
        }

        return handleSuccessResponse(user);
    }catch(e){
        return handleErrorResponse(e);
    }
}

export async function DELETE(request: Request, {params} : {params: Promise<{id:string}>}){
    try{
        const { id }=await params;

        if(!Types.ObjectId.isValid(id)){
            throw new Error("Invalid Id")
        };

        const user=await User.findByIdAndDelete(id);

        if(!user){
            throw new Error("User not found")
        };

        return handleSuccessResponse(user);
    }catch(e){
        return handleErrorResponse(e);
    }
}