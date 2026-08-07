import { Schema, Types, Document, models, model } from "mongoose";

interface Iblog{
    title:string,
    slug:string,
    thumbnail:string,
    content:string,
    category:string,
    tags:string[],
    author:Types.ObjectId,
    published:boolean,
}

export interface IblogDoc extends Iblog,Document{}

const blogSchema=new Schema(
    {
        title:{
            type: String,
            required: true
        },
        slug:{
            type: String,
            required: true,
            unique: true,
        },
        thumbnail:{
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true
        },
        category:{
            type: String,
            required: true,
        },
        tags:{
            type: [String],
        },
        author:{
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        published:{
            type: Boolean,
            default: true,
        }
    },{timestamps: true}
);

const Blog=models?.Blog || model<Iblog>("blog",blogSchema);
export default Blog;

