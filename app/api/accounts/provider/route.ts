import { handleErrorResponse, handleSuccessResponse } from "@/Components/lib/response";
import Account from "@/database/account.model";

export async function POST(request:Request){
    try{
        const {providerAccountId}=await request.json();

        const account=await Account.findOne({providerAccountId});

        return handleSuccessResponse(account);
    }catch(e){
        return handleErrorResponse(e);
    }
}