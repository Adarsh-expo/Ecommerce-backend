import mongoose from 'mongoose'

const productschema=mongoose.Schema({
name:{
    type:String,
    required:true,
    
},
slug:{
    type:String,
    required:true
}
,description:{
    type:String,
    required:true,

},
price:{

    required:true,
    type:Number
},category:{
    type:mongoose.Schema.ObjectId,
    ref:'Subcategory'
},quantity:{
    type:Number,
    required:true,
    default:0
}



,photo:{

    type:String,
    required:true
},
shipping:{

    type:String,
    required:true
}

},{timestamps:true})


export const Product=mongoose.model("Product",productschema)