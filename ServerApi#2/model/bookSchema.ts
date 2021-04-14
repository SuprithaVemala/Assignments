import mongoose from 'mongoose'

const bookSchema=new mongoose.Schema({
    id:{
        type:Number
    },
    title:{
        type:String,
        required:true
    },
    author:{
        type:String
    },
    price:{
        type:String
    },
    rating:{
        type:String
    },
    description:{
        type:String
    },
    votes:{
        type:String
    },
    pages:{
        type:String
    }
})

const model=mongoose.model("books",bookSchema)

export {model}