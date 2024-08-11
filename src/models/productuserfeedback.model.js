import mongoose from "mongoose";

const feedbackschema=mongoose.Schema({


review:{

    type:String
},
rating:{

    type:Number,
    default:4.8
}
,
user:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true
},
product:{

    type:mongoose.Schema.ObjectId,
    type:"Product",
    required:true
}

},{timestamps:true})

export const Feedbackuser=mongoose.model("Feedbackuser",feedbackschema)