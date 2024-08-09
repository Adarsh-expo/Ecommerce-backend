import { Subcategory } from "../models/subcategory.model.js";
import { Category } from "../models/category.model.js";
import mongoose from "mongoose";

const createsubcategory=async(req,res)=>{
const {name}=req.body;
const{id}=req.params;
console.log(id)

try{

const findsub=await Subcategory.find({name})
if(findsub.length===1){return res.send({success:false,message:"This sub category exist"})}


const categoryinsert=await Subcategory.create({name,category:id})

res.send({success:true,message:"Inserted"})

}catch(err){
    res.send({message:err.message})
}



}

//all sub category based on specific category
const allsubcategory=async(req,res)=>{

const{slug}=req.params;

try{const categoryfind= await Category.aggregate([{
$match:{
    slug:slug
}

},{

    $lookup:{
        from:"subcategories",
        localField:"_id",
        foreignField:"category",
        as:"Allslugbasedcategory"
    }
}])
  
console.log(categoryfind)
res.send({categoriesall:categoryfind})}
catch(err){
    res.send({success:false,message:"Internal server error"})
}


}
//allsubcategory


const alltypesubcategory=async(req,res)=>{
try{const all=await Subcategory.find()
res.send({allsubcategdata:all})}
catch(err){

    res.send({success:false,message:err.message})
}




}




const deletesubcategory=async(req,res)=>{
try{const{id}=req.params;
await Subcategory.findByIdAndDelete(id);
res.send({success:true,message:"Deleted"})}
catch(err){
    res.send({success:true,message:err.message})
}


}
const updatesubcategory=async(req,res)=>{
    try{const{id}=req.params;
    console.log("fin dd")
    const{name}=req.body;
    await Subcategory.findByIdAndUpdate(id,{name});
    res.send({success:true,message:"Updated"})}
    catch(err){
        res.send({success:true,message:err.message})
    }

}





export{createsubcategory,allsubcategory,deletesubcategory,updatesubcategory,alltypesubcategory}