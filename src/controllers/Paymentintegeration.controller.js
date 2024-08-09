import Razorpay from 'razorpay'
import dotenv from 'dotenv'
import crypto from 'crypto'
import { Order } from '../models/order.model.js';
import { Product } from '../models/product.model.js';


dotenv.config()
var instance = new Razorpay({
  key_id: process.env.RAZOR_PAYAPI_KEY,
  key_secret: process.env.RAZORPAY_SECRETKEY,
});


const createordercheckout=async(req,res)=>{

  try{const options={

  amount:Number(req.body.sumtotal*100),  
  currency: "INR",
  
}

const orderdetailsgenerated= await instance.orders.create(options)

res.send({data:orderdetailsgenerated})}
catch(err){

  console.log(err.message)
}


}


const paymentverification=async(req,res)=>{
  try{
const{ addressobject,res:{razorpay_payment_id,  razorpay_order_id, razorpay_signature},amount,id,selectedproduct }=req.body;

const body=razorpay_order_id + "|"+razorpay_payment_id;
console.log(amount)

const expectedsignature=crypto.createHmac('sha256',process.env.RAZORPAY_SECRETKEY)
.update(body.toString())
.digest('hex');
if(razorpay_signature===expectedsignature)
{console.log("valid payment")

const allupdationpromises=selectedproduct.map((ele)=>Product.findByIdAndUpdate(ele._id,{$inc:{quantity:-ele.choosenquantity}}))

const updateall=await Promise.all(allupdationpromises)
console.log("all changed")

const orderinsertion= await Order.create({buyer:id,shippingaddress:addressobject,products:selectedproduct,payment:{razorpaysignature:razorpay_signature,razorpayorderid:razorpay_order_id,razorpaypaymentid:razorpay_payment_id,amount}})
 res.status(200).send({success:true,message:"Order completed product ordered",orderid:razorpay_order_id})


}
else{

  res.send({success:false,message:"invalid Signature"})
}
  }
  catch(err){

    res.status(500).send({success:false,message:"Something wrong happnend"})
  }
}

export{createordercheckout,paymentverification}