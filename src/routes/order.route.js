import { Router } from "express";
import { tokenverification } from "../middlewares/tokenverification.middleware.js";
import { allorders, getorderdetail, updateorder } from "../controllers/order.controller.js";
import { checkadmin } from "../middlewares/isadmin.js";
export const orderrouter=Router();

orderrouter.route('/getorderdetail').get(tokenverification,getorderdetail)
orderrouter.route('/getallorderdetail').get(tokenverification,checkadmin,allorders)
orderrouter.route('/updateorder').put(tokenverification,checkadmin,updateorder)