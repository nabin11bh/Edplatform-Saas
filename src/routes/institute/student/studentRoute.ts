



import express, { Router } from "express"
import asyncErrorHandling from "../../../services/asyncErrorHandling"
import { getStudents } from "../../../controller/institute/student/studentController"



const router:Router = express.Router()

router.route("/")
.get(asyncErrorHandling(getStudents))



export default router

 