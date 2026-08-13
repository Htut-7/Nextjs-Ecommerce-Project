import { handleErrorResponse, handleSuccessResponse } from "@/Components/lib/response";
import UserSchema from "@/Components/lib/schema/UserSchema";
import User from "@/database/user.model";
import { Types } from "mongoose";
import validateBody from "@/Components/lib/validateBody";

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

export async function PUT(request: Request, {params} :{params: Promise<{id:string}>}){
    try{
        const {id}=await params;
        const body=await request.json();

        if(!Types.ObjectId.isValid(id)){
            throw new Error('Invalid Id')
        };

        const validatedData=validateBody(body,UserSchema,true);

        const user=await User.findByIdAndUpdate(id,validatedData,{new:true})

        return handleSuccessResponse(user);
    }catch(e){
        return handleErrorResponse(e)
    }
}