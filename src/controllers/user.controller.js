///eregister based controller
import { SchemaTypeOptions } from "mongoose";
import { User } from "../models/user.model.js";
import cloudinaryupload from "../utils/cloudinary.js";
import jwt from "jsonwebtoken"
import { sendMail } from "../utils/mailer.js";



const generatetokensall=async(id)=>{



    const user=await User.findOne({_id:id})
    console.log("uu",user)
const accesstoken= await user.createaccesstoken()

const refreshtoken= await user.createrefreshtoken()
user.refreshtoken=refreshtoken;
await user.save()
return {accesstoken,refreshtoken}

}



const registeruser=async(req,res)=>{

console.log(req.body)
    try{const {username,password,email,phone,address}=req.body;

///so now i willcheck whether all fields are given or not


if([username,password,email,phone,address].some((field)=>

field.trim()===""

)){
    return res.json({message:'All fields are required',status:false})
}

const data= await User.findOne({$or :[{email:email},{username:username},{phone:phone}]})
if(data){
    return res.send({message:'User do exist',status:false})
}



let uploadResult;

  
if(req.files.avatar){
  const pic=req.files.avatar[0].path;

 uploadResult=  await cloudinaryupload(pic);
console.log(uploadResult.url)}





const createaccount=await User.create({username:username,
    password,email,avatar:uploadResult?.url ||"",phone,address})


const message='<p>hi sir</p>'

sendMail(email,"mail verification",message)
    res.status(200).send({message:"User successfullyt registered",status:"true"})

}
    catch(err){

        res.status(500).send({Error:"louda"})
    }
}


const loginuser=async(req,res)=>{

const {username,password}=req.body;
console.log(username)
const finduser= await User.findOne({username:username})
if(!finduser){return res.send({message:"User dont exist",status:false})}
console.log(finduser)

const verification=   await finduser.isPasswordCorrect(password)
if(!verification){return res.send({message:"Wrong password",status:false})}

const{accesstoken,refreshtoken}=await generatetokensall(finduser._id)

const Option={
httpOnly:true,
secure:true,
sameSite:"lax",
domain:'.https://the-ecommerce-frontend.vercel.app'

}
return res.status(200).
cookie("accesstoken",accesstoken,Option).
cookie("refreshtoken",refreshtoken,Option).
send({message:"Logged In",status:true,userdata:finduser})

}

const logout=async(req,res)=>{

const access=await User.findByIdAndUpdate({_id:req.user._id}
    ,{$set:{refreshtoken:undefined}}
    
    
    
    )



const Option={
    httpOnly:true,
    secure:true
}

return res.status(200).
clearCookie("accesstoken",Option).
clearCookie("refreshtoken",Option).
send({status:"Logged out and token are cleaned"})

}

const fetchprofile=async(req,res)=>{

const data=await User.findById({_id:req.user._id}).select("-password -refreshtoken")

res.send({userdata:data,status:true})

}


export{registeruser,loginuser,logout,fetchprofile}