import { Schema, Document, model, models } from "mongoose"

interface Iproduct{
    name:string,
    description:string,
    category:string,
    brand:string,
    price:number,
    stock:number,
    rating:number,
    image:string,
}

 export interface IproductDoc extends Iproduct, Document{}

const productSchema=new Schema(
    {
        name:{
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true
        },
        category:{
            type: String,
            required: true
        },
        brand:{
            type: String,
            required: true,
        },
        price:{
            type: Number,
            required: true
        },
        stock:{
            type: Number,
            default: 0
        },
        rating:{
            type: Number,
            default: 0
        },
        image:{
            type: String,
            required: true
        }
    },{timestamps: true}
)

const Product=models?.Product || model<Iproduct>("product",productSchema);
export default Product;

