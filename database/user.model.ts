import { model, Schema, models, Document } from "mongoose";

interface Iuser{
        username: string,
        email: string,
        password: string,
        profileImage?:string,
        role?:string
    }

    export interface IuserDoc extends Iuser,Document{}

const userSchema=new Schema(
    {
        username:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
        },
        password:{
            type:String,
            required: true,
        },
        profileImage:{
            type: String,
        },
        role:{
            type: String,
            enum: ["Admin","User"],
            default: "User",
        }
    },{timestamps: true}
)

const User=models?.User || model<Iuser>("User",userSchema)

export default User;