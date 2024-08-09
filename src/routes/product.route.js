import { Router } from "express";
import { tokenverification } from "../middlewares/tokenverification.middleware.js";
import { checkadmin } from "../middlewares/isadmin.js";
import { allproduct, createproduct, deleteproduct, similarproduct, singleproduct, updateproduct } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const routerproduct=Router();


routerproduct.route('/createproduct').post(tokenverification,checkadmin,upload.fields([{name:"photo"}]),createproduct)


routerproduct.route('/allproduct').get(allproduct)
routerproduct.route('/singleproduct/:slug').get(singleproduct)
routerproduct.route('/deleteproduct/:id').get(tokenverification,checkadmin,deleteproduct)
routerproduct.route('/updateproduct/:id').post(tokenverification,checkadmin ,upload.fields([{name:"photo"}]),updateproduct)
routerproduct.route('/similarproduct/:pid/:cid').get(similarproduct)

export default routerproduct;