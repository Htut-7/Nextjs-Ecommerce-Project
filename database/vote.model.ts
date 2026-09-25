import { Schema, Types, Document, model, models } from "mongoose"

export interface Ivote{
    author: Types.ObjectId,
    type_id: Types.ObjectId,
    type: string,
    votetype: string,
}

export interface IvoteDoc extends Ivote, Document{}

const voteSchema= new Schema(
    {
        author:{
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        type_id:{
            type: Schema.Types.ObjectId,
            required: true,
        },
        type:{
            type: String,
            required: true,
            enum: ["message", "comment"]
        },
        votetype:{
            type: String,
            required: true,
            enum: ["like", "dislike"],
        },
    }, {timestamps: true}
);

voteSchema.index({author: 1, type:1, type_id:1},{unique:true});

const Vote=models?.Vote || model<Ivote>("Vote",voteSchema);
export default Vote;