import { NextResponse } from "next/server"

const handleSuccessResponse=(data:unknown, status:number=200)=>{
    return NextResponse.json(
        {
            data,
            success:true,
           
        },{status}
    )
};

const handleErrorResponse=(e: unknown)=>{
    return NextResponse.json(
        {
            message: e instanceof Error ? e.message : "Something went Wrong",
            success: false,
        },{
            status: 500
        }
    )
}

export {handleErrorResponse,handleSuccessResponse}