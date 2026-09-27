import { Schema, Types, Document, models, model } from "mongoose";

export interface ICollection{
    author: Types.ObjectId,
    message: Types.ObjectId,
}

export interface ICollectionDoc extends ICollection,Document{}

const collectionSchema= new Schema(
    {
        author:{
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        message:{
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Contact"
        }
    },
    {timestamps: true}
)

collectionSchema.index({author: 1, message:1},{unique: true});
const Collection= models.Collection || model("Collection",collectionSchema);
export default Collection;