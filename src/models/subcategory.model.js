import mongoose from 'mongoose'
const subcategoryschema=mongoose.Schema({

name:
{type:String,
required:true,
unique:true
}
,
category:{
    type:mongoose.Schema.ObjectId,
    ref:"Category"
}
},{})


export const Subcategory=mongoose.model("Subcategory",subcategoryschema)