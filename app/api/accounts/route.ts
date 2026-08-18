import dbConnect from "@/Components/lib/dbConnect";
import { handleErrorResponse, handleSuccessResponse } from "@/Components/lib/response";
import AccountSchema from "@/Components/lib/schema/AccountSchema";
import validateBody from "@/Components/lib/validateBody";
import Account from "@/database/account.model";

export async function GET(){
    try{
        await dbConnect();
        const account=Account.findOne();
        return handleSuccessResponse(account);

    }catch(e){
        return handleErrorResponse(e);
    }
}

export async function POST(request:Request){
    try{
        await dbConnect();
        const body=await request.json();
        const {provider,providerAccountId}=body;

        validateBody(body,AccountSchema);

        const existingAccount=await Account.findOne({
            provider,
            providerAccountId,
        });

        if(existingAccount){
            throw new Error('Account already exists');
        }

        const newAccount=await Account.create(body);
        return handleSuccessResponse(newAccount,201);

    }catch(e){
        return handleErrorResponse(e);
    }
}