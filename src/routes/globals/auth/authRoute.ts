
import express, { Router } from "express"
import AuthController from "../../../controller/globals/auth/auth.Controller"
import asyncErrorHandling from "../../../services/asyncErrorHandling"


const router:Router = express.Router()
router.route("/login").post(asyncErrorHandling(AuthController.loginUser))
router.route("/register").post(asyncErrorHandling(AuthController.registerUser))

export default router