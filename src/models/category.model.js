import mongoose from 'mongoose'
const Categoryschema=mongoose.Schema({
name:{
    required:true,
    type:String,
    unique:true
},



slug:{

    type:String,
    lowercase:true
}


})
  export const Category=mongoose.model("Category",Categoryschema)