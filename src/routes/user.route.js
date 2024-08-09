import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { registeruser,loginuser,logout, fetchprofile } from "../controllers/user.controller.js";
import { tokenverification } from "../middlewares/tokenverification.middleware.js";
import { checkadmin ,checkuser} from "../middlewares/isadmin.js";



const router=Router();

router.route('/register').post( upload.fields([{name:"avatar"}]) ,registeruser  )


router.route('/login').post(upload.none(),loginuser)

router.route('/logout').post(tokenverification,logout)
router.route('/admin-auth').get(tokenverification,checkadmin,(req,res)=>{

    res.send({status:true})
})
router.route('/user-auth').get(tokenverification,checkuser,(req,res)=>{

    res.send({status:true})
})

router.route('/fetch-profile').get(tokenverification,fetchprofile)

router.route('/userverification').get(tokenverification,(req,res)=>{

    res.send({status:true})
})
export default router;