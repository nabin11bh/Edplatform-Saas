




import express, { Router } from "express"

import {isLoggedIn} from "../../middleware/middleware"
import { createChapterLessonTable, createCourseTable, createInstitute, createStudentTable, createTeacherTable } from "../../controller/institute/instituteController"
import asyncErrorHandling from "../../services/asyncErrorHandling"



const router:Router = express.Router()

router.route("/").post(asyncErrorHandling(isLoggedIn), asyncErrorHandling (createInstitute) ,asyncErrorHandling (createTeacherTable),asyncErrorHandling (createStudentTable),asyncErrorHandling (createCourseTable),asyncErrorHandling(createChapterLessonTable))


export default router

 
