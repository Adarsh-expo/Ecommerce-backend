import { Category } from "../models/category.model.js"
import slugify from "slugify"

//create category controller
const createcategory=async(req,res)=>{

const {name}=req.body
if(!name){
    return res.send({success:false,message:"Fields can not be empty"})
}
try{const findcateg=await Category.find({name})
console.log(findcateg)
if(findcateg.length>0){return res.send({success:false,message:"Category exists"})}
const categoryinserted=await Category.create({name,slug:slugify(name)})

res.status(200).send({success:true,message:"Category inserted",data:categoryinserted})}
catch(err){
console.log(err)
res.send({error:err.message})

}


}

//update category
const updatecategory=async(req,res)=>{
try{   

    const {id}=req.params;
    const {name}=req.body;
    if(!name){return res.send({success:false,message:"Fields cant be empty"})}
    const category=await Category.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
return res.send({success:true,message:"Category Updated",data:category})
}
catch(err){
   res.status(500).send({success:false,message:err.message})

}

}


//get all category
const categories=async(req,res)=>{

const categoriesall=await Category.find()
res.send({succes:true,categoriesall:categoriesall})

}
//get single category
const singlecategory=async(req,res)=>{
try{  const categorysingle=await Category.findOne({slug:req.params.slug});
    res.send({success:true,singlecategory:categorysingle})}
    catch(err){

        return res.status(500).send({message:err.message})
    }
  
}
//delete category

const deletecategory=async(req,res)=>{

    const{id}=req.params;
try{
    await Category.findByIdAndDelete(id)
    res.send({success:true,message:"category deleted"})
}catch(err){
    res.status(500).send({sucess:false,message:err.message})
}
} 


export {createcategory,updatecategory,categories,singlecategory,deletecategory} 



