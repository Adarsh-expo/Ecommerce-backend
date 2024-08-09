import { Order } from "../models/order.model.js"

// this is userspecific
const getorderdetail=async(req,res)=>{

try{const order=await Order.find({buyer:req.user._id}).populate("buyer",'username -_id')
.select(' payment.amount payment.razorpayorderid shippingaddress products buyer status _id')
res.send({success:true,Order:order})}
catch(err){
    res.status(502).send({success:true,message:err.message})
}

    




}

//for admin only

const allorders=async(req,res)=>{
    try{const allorder=await Order.find().populate("buyer",'username -_id')
.select(' payment.amount payment.razorpayorderid shippingaddress products buyer status _id createdAt')

res.send({success:true,orders:allorder})}

catch(err){

    res.send({success:false,message:err.message})
}

}


const updateorder=async(req,res)=>{
const{order,status}=req.query;
console.log(order,status)
try{const updatestatus=await Order.updateOne({"payment.razorpayorderid":order},{$set:{status:status}})
res.send({success:true,status:"updated successfully"})}
catch(err){

    res.send({success:false,status:"Error in updating"})
}


}
export{getorderdetail,allorders,updateorder}