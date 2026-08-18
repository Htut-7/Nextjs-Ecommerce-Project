import dbConnect from "@/Components/lib/dbConnect";
import { handleErrorResponse, handleSuccessResponse } from "@/Components/lib/response";
import UserSchema from "@/Components/lib/schema/UserSchema";
import validateBody from "@/Components/lib/validateBody";

import User from "@/database/user.model";


export async function GET(){
    try{
        await dbConnect();
        const users= await User.find();
        return handleSuccessResponse(users);
    }catch(e){
        return handleErrorResponse(e)
    }
};

export async function POST(request: Request){
    try{
        await dbConnect();
        const body=await request.json();

        validateBody(body, UserSchema);

        const existingEmail=await User.findOne({email: body.email});
        if(existingEmail) throw new Error('Email already exists');

        const existingName=await User.findOne({username: body.username});
        if(existingName) throw new Error('Username already exists');

        const newUser= await User.create(body);
        return handleSuccessResponse(newUser, 201);

    }catch(e){
        return handleErrorResponse(e);
    }
}