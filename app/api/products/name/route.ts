import { handleErrorResponse, handleSuccessResponse } from "@/Components/lib/response";
import Product from "@/database/product.model";

export async function POST(request: Request){
    try{
        const {name}=await request.json();
        const product=await Product.findOne({name});

        if(!product){
            throw new Error('Product not found');
        }

        return handleSuccessResponse(product);
    }catch(e){
        return handleErrorResponse(e);
    }
}