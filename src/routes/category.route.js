import { Router } from "express";
import { tokenverification } from "../middlewares/tokenverification.middleware.js";
import { checkadmin } from "../middlewares/isadmin.js";
import {createcategory, updatecategory,categories, singlecategory, deletecategory} from "../controllers/category.controler.js";
import { allsubcategory, alltypesubcategory, createsubcategory, deletesubcategory, updatesubcategory } from "../controllers/subcategory.controller.js";
const router=Router();
//routes
router.route('/createcategory').post(tokenverification,checkadmin,createcategory)
router.route('/updatecategory/:id').put(tokenverification,checkadmin,updatecategory)
router.route('/allcategory').get(categories)
router.route('/singlecategory/:slug').get(singlecategory)
router.route('/deletecategory/:id').delete(tokenverification,checkadmin,deletecategory)
router.route('/createsubcategory/:id').post(tokenverification,checkadmin,createsubcategory)
router.route('/allsubcategory/:slug').get(allsubcategory)//lest keep it public man
router.route('/deletesubcategory/:id').delete(tokenverification,checkadmin,deletesubcategory)
router.route('/updatesubcategory/:id').put(tokenverification,checkadmin,updatesubcategory)
router.route('/alltypesubcategory').get(alltypesubcategory)
export default router;