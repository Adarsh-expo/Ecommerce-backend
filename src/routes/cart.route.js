import { Router } from "express";
import { Insertocart, cartdatawhole, deletefromcart, sequentialdelete, sequentialincrese } from "../controllers/productcart.controller.js";
import { tokenverification } from "../middlewares/tokenverification.middleware.js";
export const cartrouter=Router();


cartrouter.route('/Inserttocart').post(tokenverification,Insertocart)
cartrouter.route('/getallcartdata').get(tokenverification,cartdatawhole)
cartrouter.route('/deletefromcart').delete(tokenverification,deletefromcart)
cartrouter.route('/sequentialdelete').put(tokenverification,sequentialdelete)
cartrouter.route('/sequentialincrease').put(tokenverification,sequentialincrese)
