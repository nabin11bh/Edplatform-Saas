


import express,{Router} from 'express'
import asyncErrorHandler from "../../services/asyncErrorHandling"
import { teacherLogin } from '../../controller/teacher/teacherController';
const router:Router = express.Router()

router.route("/").post(asyncErrorHandler(teacherLogin))

export default router;