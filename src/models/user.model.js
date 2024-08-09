import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const userschema=new mongoose.Schema({

username:{
    type:String,
required:true,
lowercase:true,
unique:true,



},
password:{
    type:String,
   
    required:[true,"Password is required"]
}
,email:{

type:String,
unique:true,
required:[true,"Email is required"],


},
phone:{
type:String,
required:true
},
address:{
    type:String,
    required:true

    }
,role:{
    type:Number,
    default:0
},
avatar:{
type:String,   
},
refreshtoken:{
    type:String,
}


},{timestamps:true})


userschema.pre('save',async function(next){
if(!this.isModified("password")){
    next();
}

     this.password = await bcrypt.hash(this.password,10)
     next();
})


userschema.methods.createaccesstoken=async function(){

const accesstoken=await jwt.sign({
    _id:this._id,
    email:this.email,
    password:this.password,
    username:this.username



},process.env.JWT_SECRETKEY,{expiresIn:'1h'})

return accesstoken


}

userschema.methods.isPasswordCorrect=async function
(password){
    return await bcrypt.compare(password,this.password)
}
userschema.methods.createrefreshtoken=async function(){
    const refreshtoken=await jwt.sign({
        _id:this._id
    }
    ,process.env.SECRET_KEY,{expiresIn:'4h'})
    return refreshtoken
}

export const User=mongoose.model("User",userschema)