import { Cart } from "../models/cart.model.js";

const Insertocart=async(req,res)=>{

const{id,choosenquantity}=req.body;
try{
console.log(choosenquantity,id)

    const search=await Cart.findOne({$and:[{product:id},{user:req._id}]});
  if(search)
  {
    search.choosenquantity+=1;
    search.save();
    res.send({success:true,message:"Addes to cart"})
return;
}

const insert=await Cart.create({product:id,choosenquantity,user:req._id})

res.send({success:true,message:"Added to cart"})

}
catch(err){
res.send({success:false,message:"Failed to add to cart"})

    console.log(err.message)
}



}


export{Insertocart}