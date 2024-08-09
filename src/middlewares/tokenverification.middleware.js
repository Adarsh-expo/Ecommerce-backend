import { User } from "../models/user.model.js";
import  jwt  from "jsonwebtoken"
import cookieParser from 'cookie-parser';

export const tokenverification=async(req,res,next)=>{

try{const tokengot=req.cookies?.accesstoken || req.header("Authorization")?.replace("Bearer ","")
    console.log(tokengot)
    if(!tokengot){
        res.send({status:false})
    }
    const decodetoken=   jwt.verify(tokengot,process.env.JWT_SECRETKEY) 

const gotuser= await User.findById({_id:decodetoken._id}).select("-password -refreshtoken")

if(!gotuser){res.send({status:"Invalid User ,No access denied"})}
req.user=gotuser;
console.log("token got");
next();
}
catch(err){

    console.log("token authentication error",err.message)
}
    
}