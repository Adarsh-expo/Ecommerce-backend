import mongoose from "mongoose";


const shippingaddresschema=mongoose.Schema({

    fullname:{type:String,
        required:true
    },
    city:{type:String,required:true},
    phoneno:{type:String,required:true},
    Zipcode:{type:String,required:true},
    State:{type:String,required:true},
    Flatno:{type:String,required:true},
    Landmark:{type:String,required:true},
    Country:{type:String,required:true}
})


const paymentschema=mongoose.Schema({
    razorpaypaymentid:{type: String},

    razorpayorderid:{type:String} ,

    razorpaysignature:{type:String},

    amount:{type:Number}

})


const orderschema=new mongoose.Schema({

products:[{type:Object,required:true}],
payment:{
    type:paymentschema,
    required:true
},
buyer:{
    type:mongoose.Schema.ObjectId,
    ref:"User"
},
shippingaddress:{
type:shippingaddresschema,
required:true

},
status:{
    type:String,
    default:"Not process",
    enum:["Not process","Processing","shipped","delivered","cancel"]
}

},{timestamps:true});
export const Order=mongoose.model('Order',orderschema)









