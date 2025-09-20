


import express,{Router} from 'express'
import asyncErrorHandler from '../../../../services/asyncErrorHandling';
import  { isLoggedIn, restrictTo } from '../../../../middleware/middleware';
import { createCourseChapterTable } from '../../../../controller/institute/instituteController';

import { UserRole } from '../../../../middleware/type';
import { addChapterToCourse, fetchCourseChapter } from '../../../../controller/teacher/courses/chapter/chapter-controller';

const router:Router = express.Router()

router.route("/:courseId/chapters/").post(isLoggedIn, restrictTo(UserRole.Teacher), asyncErrorHandler(addChapterToCourse))
.get(isLoggedIn,asyncErrorHandler(fetchCourseChapter))

export default router;