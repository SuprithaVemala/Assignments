import mongoose from 'mongoose'

const bookSchema=new mongoose.Schema({
    Title:{
        type:String
    },
    Author:{
        type:String
    },
    Price:{
        type:String
    },
    Rating:{
        type:String
    },
    Description:{
        type:String
    },
    Cover:{
        type:String
    }
})

const model=mongoose.model("books",bookSchema)

export {model}