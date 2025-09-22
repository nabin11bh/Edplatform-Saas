import express,{ Router } from "express";
import asyncErrorHandling from "../../../services/asyncErrorHandling";
import {instituteListForStudent} from "../../../controller/student/institute/student-institute-controller";

const router:Router = express.Router()
router.route("/institute").get(asyncErrorHandling(instituteListForStudent))
router.route("/institute/:institutedId/courses").get(asyncErrorHandling(instituteListForStudent))

export default router;