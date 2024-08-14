import mongoose from 'mongoose'
const cartschema=mongoose.Schema({

    product:{type:mongoose.Schema.ObjectId,
    ref:"Product"
    },
    choosenquantity:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }
})
export const Cart=mongoose.model("Cart",cartschema)