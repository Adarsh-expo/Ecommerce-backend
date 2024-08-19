import { User } from "../models/user.model.js";
import { Feedbackuser } from "../models/productuserfeedback.model.js";

const insertfeeedback=async(req,res)=>{
    const {review,rating,productid,userid}=req.body;
console.log(review,rating,productid,userid)
try{

const insert=await Feedbackuser.create({review,rating,product:productid,user:userid})
res.send({success:true,message:"Feedback inserted"})

}
catch(err){

    res.send({success:false,message:err.message})
}



}
export {insertfeeedback}