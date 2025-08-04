
import mongoose,{model, Schema} from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

if (!process.env.DB_URL) {
    throw new Error("DB_URL is not defined in the environment variables");
}
const DB_URL = process.env.DB_URL;
mongoose.connect(DB_URL);


const UserSchema= new Schema({
    username:{type: String, unique:true},
    password: { type: String }
})

const ContentSchema= new Schema({
    title:String,
    link:String,
    type:String,
    tags:[{type:mongoose.Types.ObjectId, ref:'Tag'}],
    userId:{type:mongoose.Types.ObjectId, ref:'User', required: true}
})

const LinkSchema = new Schema({
    hash:String,
    userId:{type: mongoose.Types.ObjectId, ref:'User', required:true ,unique:true}
})

export const UserModel = model("User",UserSchema);
export const ContentModel = model("Content", ContentSchema)
export const LinkModel=model("Links",LinkSchema)