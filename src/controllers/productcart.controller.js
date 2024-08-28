import { Cart } from "../models/cart.model.js";

const Insertocart=async(req,res)=>{

const{id,choosenquantity,quantity}=req.body;
console.log(req.user._id)
try{
console.log(choosenquantity,id,quantity)

    const search=await Cart.findOne({$and:[{product:id},{user:req.user._id}]});
  console.log(search,99)
  if(search)
  {console.log(search)
   
    if(search.choosenquantity<quantity){
        search.choosenquantity+=1;
       search.save();
       res.send({success:true,message:"Added to cart"})
       }
    
return;}
 
else{

    const insert=await Cart.create({product:id,choosenquantity,user:req.user._id})

res.send({success:true,message:"Added to cart"})
}
}





catch(err){
res.send({success:false,message:err.message})

    console.log(err.message)
}



}


const deletefromcart=async(req,res)=>{
const{_id}=req.body;
console.log(_id)
try{
   
    const deletefromcart =await Cart.findByIdAndDelete(_id);
    console.log("deleted")
    res.send({success:true,message:"Deleted from cart"})


}
catch(err){
    res.send({success:false,message:err.message})
}


}

const sequentialdelete=async(req,res)=>{
const{_id}=req.body
console.log(_id,"qqq")
try{
   
    const sequentialdeletefromcart =await Cart.findOne({_id});
console.log(sequentialdeletefromcart,"lll")
if(sequentialdeletefromcart.choosenquantity>0){ 
      sequentialdeletefromcart.choosenquantity-=1;
    
     sequentialdeletefromcart.save()
       res.send({success:true,message:"Deleted from cart"})
       return;
    }
res.send({message:"nothing to delete"})
   
   


}
catch(err){
    res.send({success:false,message:err.message})
}

}

const sequentialincrese=async(req,res)=>{
const{_id,quantity}=req.body;
try{const search=await Cart.findOne({_id})

if(search.choosenquantity<quantity){
     search.choosenquantity+=1;
    search.save();
    res.send({success:true,message:"Added to cart"})
    }}
    catch(err){

        res.send({success:false,message:err.message})
    }

   



}


const cartdatawhole=async(req,res)=>{
    console.log(req.user._id,"jj")
try{const allcart=await Cart.aggregate([
    
    {$match:{user:req.user._id}},
    {$lookup:{from:"products",localField:"product",foreignField:"_id",as:"cartproduct"}},
{$unwind:"$cartproduct"},
{$project:{choosenquantity:1,_id:1,id:"$cartproduct._id",name:"$cartproduct.name",description:"$cartproduct.description",
quantity:"$cartproduct.quantity",price:"$cartproduct.price",photo:"$cartproduct.photo",category:"$cartproduct.category"}}


])

res.send({allcart})

}
catch(err){

res.send({success:false,message:err.message})
}




}


export{Insertocart,cartdatawhole,deletefromcart,sequentialdelete,sequentialincrese}