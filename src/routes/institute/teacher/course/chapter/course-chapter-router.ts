


import express,{Router} from 'express'
import asyncErrorHandler from '../../../../../services/asyncErrorHandling';
import isLoggedIn from '../../../../../middleware/middleware';
import { addChapterToCourse, fetchCourseChapter } from '../../../../../controller/teacher/courses/chapter/chapter-controller';

const router:Router = express.Router()

router.route("/course/:courseId/chapter/").post(isLoggedIn,asyncErrorHandler(addChapterToCourse))
.get(isLoggedIn,asyncErrorHandler(fetchCourseChapter))