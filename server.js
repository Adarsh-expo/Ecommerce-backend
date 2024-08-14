import express from 'express'
import dotenv from 'dotenv'
import dbconnection from './src/db/db.connection.js';
import { User } from './src/models/user.model.js';
import router from './src/routes/user.route.js';
import routercategory from './src/routes/category.route.js';
import  routerproduct from './src/routes/product.route.js';
import paymentrouter from './src/routes/payment.route.js';
import { orderrouter } from './src/routes/order.route.js';
import { cartrouter } from './src/routes/cart.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

import { Category } from './src/models/category.model.js';
import { Product } from './src/models/product.model.js';
import { Subcategory } from './src/models/subcategory.model.js';
import { Order } from './src/models/order.model.js';

dotenv.config()


//here i am configuring .env file so i can access that with process.env
dbconnection();

const app=express();
app.use(cookieParser())
app.use(cors({
    origin: 'https://the-ecommerce-frontend.vercel.app/',
    credentials: true,
  }))
app.use(express.json())
app.use(express.urlencoded({extended:false}))









app.use('/api/v1/user',router)
app.use('/api/v1/category',routercategory)


app.use('/api/v1/product',routerproduct)
app.use('/api/v1/gateway',paymentrouter)
app.use('/api/v1/detail',orderrouter)
app.get('/api/v1/gateway/apikey',(req,res)=>{

res.send({key:process.env.RAZOR_PAYAPI_KEY})


})
app.use('/api/v1',cartrouter)










 
    














 












app.listen(process.env.PORT,()=>{
    console.log(`Server is listening to the ${process.env.PORT}`)
})

