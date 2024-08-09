import { Router } from "express";
import { createordercheckout, paymentverification } from "../controllers/Paymentintegeration.controller.js";

const paymentrouter=Router();


paymentrouter.route('/ordercheckout').post(createordercheckout)
paymentrouter.route('/paymentverfication').post(paymentverification)




export default paymentrouter;