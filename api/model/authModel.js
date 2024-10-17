import mongoose, { Types } from "mongoose";

const auth = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    clan:{
        type:Types.ObjectId,
        ref:"Clan",
        default:null
    },
    client:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const User = mongoose.model('User',auth);

export default User;