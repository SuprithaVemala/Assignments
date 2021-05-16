import mongoose from 'mongoose'

const usersSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
})

const userModel=mongoose.model("users",usersSchema)

export {userModel}