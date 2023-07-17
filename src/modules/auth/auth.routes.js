import { Router } from "express";
import * as userController from "./controllers/auth.controllers.js"
const router = Router()

import { uploadSingleFile } from "../../middleware/fileUpload.js";

router.post("/signUp",uploadSingleFile("user","profilePic") ,userController.signUp)
router.post("/signIn",userController.signIn)



export default router