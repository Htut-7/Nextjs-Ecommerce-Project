import dbConnect from "@/Components/lib/dbConnect";
import { handleErrorResponse, handleSuccessResponse } from "@/Components/lib/response";
import productSchema from "@/Components/lib/schema/ProductSchema";
import UserSchema from "@/Components/lib/schema/UserSchema";
import validateBody from "@/Components/lib/validateBody";
import Product from "@/database/product.model";

import User from "@/database/user.model";


export async function GET(){
    try{
        await dbConnect();
        const products= await Product.find();
        return handleSuccessResponse(products);
    }catch(e){
        return handleErrorResponse(e)
    }
};

export async function POST(request: Request){
    try{
        await dbConnect();
        const body=await request.json();
        const {name}=body;

        const validatedData=validateBody(body, productSchema);


        const existingProduct=await Product.findOne({name});
        if(existingProduct) throw new Error('Product already exists');

        const newProduct= await Product.create(validatedData);
        return handleSuccessResponse(newProduct, 201);

    }catch(e){
        return handleErrorResponse(e);
    }
}