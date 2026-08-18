import { handleErrorResponse, handleSuccessResponse } from "@/Components/lib/response";
import AccountSchema from "@/Components/lib/schema/AccountSchema";
import validateBody from "@/Components/lib/validateBody";
import Account from "@/database/account.model";
import { Types } from "mongoose";

export async function GET(request:Request, {params}: {params: Promise<{id:string}>}){
    try{
        const { id }=await params;

        if(!Types.ObjectId.isValid(id)){
            throw new Error('Invalid id');
        }

        const account=await Account.findById(id);

        if(!account){
            throw new Error('Account does not exists');
        }

        return handleSuccessResponse(account);
    }catch(e){
        return handleErrorResponse(e);
    }
}

export async function DELETE(request:Request, {params}: {params: Promise<{id:string}>}){
    try{
        const { id }=await params;

    if(!Types.ObjectId.isValid(id)){
        throw new Error("Invalid id");
    }

    const account=await Account.findByIdAndDelete(id);

    if(!account){
        throw new Error('Account does not exists');
    }

    return handleSuccessResponse(account);
    }catch(e){
        return handleErrorResponse(e);
    }
}

export async function PUT(request: Request, {params}: {params: Promise<{id:string}>}){
    try{
        const { id }=await params;

        if(!Types.ObjectId.isValid(id)){
            throw new Error("Invalid id");
        }
        const body=await request.json();
        const validatedBody=validateBody(body,AccountSchema,true)

        const account=Account.findByIdAndUpdate(id,validatedBody,{new:true});

        if(!account){
            throw new Error('Account does not exists');
        }

        return handleSuccessResponse(account);

    }catch(e){
        return handleErrorResponse(e);
    }
}
