

import  express from "express";
import { registerUser } from "../../../controller/globals/auth/auth.controller";
const router = express.Router()

router.route("/register").post(registerUser)


export default router