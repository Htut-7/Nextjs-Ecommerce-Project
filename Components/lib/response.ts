import { NextResponse } from "next/server"
import { ZodError } from "zod";

const handleSuccessResponse=(data:unknown, status:number=200)=>{
    return NextResponse.json(
        {
            data,
            success:true,
           
        },{status}
    )
};

const handleErrorResponse=(e: unknown)=>{

    let status=500;
    let details=null;
    let message=e instanceof Error ? e.message : "Something went Wrong";

    if(e instanceof ZodError){
        status= 400;
        details= e.flatten().fieldErrors;
        message= "Validation Error";
    }

    return NextResponse.json(
        {
            message,
            details,
            success: false,
        },{
            status
        }
    )
};

const actionError=(e: unknown)=>{

    let details=null;
    let message=e instanceof Error ? e.message : "Something went Wrong";

    if(e instanceof ZodError){
        details= e.flatten().fieldErrors;
        message= "Validation Error";
    }

    return{
         message,
         details,
         success: false,
    }
}

export {handleErrorResponse,handleSuccessResponse,actionError}