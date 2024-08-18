import { Router } from "express";
import { insertfeeedback } from "../controllers/Userfeedback.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
export const feedbackroute=Router();

feedbackroute.route('/feedbackuser').post(upload.none(),insertfeeedback)