import mongoose from 'mongoose'
const cartschema=mongoose.Schema({

    product:{type:mongoose.Schema.ObjectId,
    ref:"Product"
    },
    choosenquantity:{
        typen:Number,
        required:true
    }
})
export const Cart=mongoose.model("Cart",cartschema)