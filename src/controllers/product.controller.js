
import slugify from "slugify";
import { Product } from "../models/product.model.js"
import cloudinaryupload from "../utils/cloudinary.js"
import { Feedbackuser } from "../models/productuserfeedback.model.js";

import fs from 'fs'


//create product by admin
const createproduct=async(req,res)=>{

    try{const {name,description,price,quantity,category,shipping}=req.body;
    console.log(name,'tger')
    
    if([name,description,price,quantity,category,shipping].some((ele)=>
    ele.trim()==="")){
    
        return res.send({success:false,message:"all feilds are mandatory"})
    }
    console.log(req.files)
    if(!req.files.photo){
    return  res.send({success:false,message:"Photo is required"})
    }
    if(req.files.photo[0].size>1000000){
        return res.send({success:false,message:"Photo size should be less than 1mb"})
    }


    const uploadphoto= await cloudinaryupload(req.files.photo[0].path)
   if(uploadphoto.url){
    fs.unlink(req.files.photo[0].path,(err)=>{
        if(err){
            console.log("failed to delete")
        }
        else{ console.log("delted from disk")}
    })
   }
    
    const productinserted=await Product.create({name,description,price,quantity,category,slug:slugify(name),photo:uploadphoto.url,shipping})
    console.log(productinserted)
    res.send({success:true,message:"producted Inserted"})}
catch(err){
res.status(500).send({message:err.message})

}

}
//all product
const allproduct=async(req,res)=>{
try{
    
const detail=  await Product.aggregate([
{$lookup:{from:"subcategories",localField:"category",foreignField:"_id", as:"Productwithcategorydetail"  }},
{ $unwind:"$Productwithcategorydetail"},
{$lookup:{from:"categories",localField:"Productwithcategorydetail.category",foreignField:"_id",as:"productcategsubcategdetail"}},
{$unwind:"$productcategsubcategdetail"},
{
   $lookup:{from:"feedbackusers",localField:"_id",foreignField:"product",as:"feedbackdetail",
   pipeline:[{$lookup:{from:"users",localField:"user",foreignField:"_id",as:"userdetail" }},

{$unwind:"$userdetail"},{$project:{_id:1,review:1,rating:1,username:"$userdetail.username",userid:"$userdetail._id"}}

]} //writing subpipeline at userdetail level
},{$addFields:{totalreviews:{$size:"$feedbackdetail"}}},
{$project:{_id:1,name:1,description:1,price:1,slug:1,quantity:1,photo:1,choosequantity:1,
    productsubcategory:"$Productwithcategorydetail.name",productcategory:"$productcategsubcategdetail.name",feedbackdetail:1,totalreviews:1}}
])
res.send(detail)

}
catch(err){

    res.send({success:false,message:err.message})
}


}

//get single product
const singleproduct=async(req,res)=>{

    try{const{slug}=req.params;
const singleproduct=await Product.aggregate([{
    $match:{slug:slug}
},{$lookup:{from:"subcategories",localField:"category",foreignField:"_id",as:"subcategory"}


},{$unwind:"$subcategory"},{$lookup:{from:"feedbackusers",localField:"_id",foreignField:"product",as:"feedbackdetail"
,pipeline:[{$lookup:{from:"users",localField:"user",foreignField:"_id",as:"userdetail"}},
{$unwind:"$userdetail"},{$project:{_id:1,review:1,rating:1,username:"$userdetail.username",userid:"$userdetail._id",userprofilepic:"$userdetail.avatar"}}]

}}
,
{$addFields:{totalreviews:{$size:"$feedbackdetail"},averagerating:{$avg:"$feedbackdetail.rating"}}},

{$project:{_id:1,name:1,quantity:1,price:1,description:1,photo:1,category:"$subcategory.name"
,categoryid:"$subcategory._id",slug:1,quantity:1,feedbackdetail:1,totalreviews:1,averagerating:1}},


])

res.send(singleproduct)



}

catch(err){

    res.send({success:false,message:err.message})
}
}

//delete product
const deleteproduct=async(req,res)=>{
try{await Product.findByIdAndDelete(req.params.id)

res.send({success:true,message:"Producted successfully deleted"})}
catch(err){

    res.send({success:false,message:err.message})
}


}

//update product
const updateproduct=async(req,res)=>{


try{
    const {name,description,price,quantity,categoryid,slug}=req.body;


    if([name,description,price,quantity,categoryid,slug].some((field)=>
    field.trim()==="")){
    
        return res.send({success:false,message:"all feilds are mandatory"})
    }

  
       
     
    let updatedproduct;
    console.log(req.params.id)

        if(!req.files.photo){
             updatedproduct=await Product.findByIdAndUpdate(req.params.id,{name,description,price,quantity,categoryid,slug},{new:true})
            }
            else{
                 const  uploadphoto= await cloudinaryupload(req.files.photo[0].path)
        const updatedproduct=await Product.findByIdAndUpdate(req.params.id,{name,description,price,quantity,categoryid,slug,photo:uploadphoto.url},{new:true})
            }
res.send({success:true,updatedproduct,message:"Product updated"})
console.log(updatedproduct)}

catch(err){
    res.send({success:false,message:err.message})
}


}
//similar product
const similarproduct=async(req,res)=>{
    try{

const{pid,cid}=req.params;
console.log(pid)
console.log(cid)
const product=await Product.find({ $and:[{category:cid},{_id:{$ne:pid}}]
}).populate('category')
res.send(product)

    }
    catch(err){

console.log(err.message)
res.send({success:false,message:err.message})
    }


}


export{createproduct,allproduct,singleproduct,deleteproduct,updateproduct,similarproduct}