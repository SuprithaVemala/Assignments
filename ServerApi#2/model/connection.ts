import mongoose from "mongoose";
import env from 'dotenv';
env.config()

export function run(){
    return new Promise((resolve,reject)=>{
        mongoose.connect(`mongodb+srv://${process.env.user_name}:${process.env.pass}@${process.env.server}/${process.env.dbName}?retryWrites=true&w=majority`,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:true})

        mongoose.connection.on("open",()=>resolve("connection established"))
        mongoose.connection.on("error",(err)=>reject(err.message))
    })
}

