


// this is data connection i am setting up for server ,in seperate folder and i will export it for use
import mongoose from "mongoose";


const createdatabseconnection= async()=>{
    console.log(process.env.MONGODB_URL)

try{
    
    const connection=await mongoose.connect(`${process.env.MONGODB_URL}/ecommerce sec`)

console.log(`connection successful`);

}
catch(err){

    console.log(err.message)
}

}

export default createdatabseconnection;