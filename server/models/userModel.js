import mongoose from "mongoose";


//first making schema
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        reequired:true,
        minlength:6,
    },
    blogs: [{ type: mongoose.Types.ObjectId, ref: "Blog", required: true }],


})
//here User is name of table
const User=mongoose.model("User",userSchema);

export default User;