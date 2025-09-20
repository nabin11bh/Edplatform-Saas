import express,{Router} from 'express'
import asyncErrorHandler from '../../../../services/asyncErrorHandling';
import  { isLoggedIn, restrictTo } from '../../../../middleware/middleware';
import { UserRole } from '../../../../middleware/type';
import { createChapterLessonTable } from '../../../../controller/institute/instituteController';
import { fetchCourseChapter } from '../../../../controller/teacher/courses/chapter/chapter-controller';

const router:Router = express.Router()

router.route("/:chapterId/lessons").post(isLoggedIn, restrictTo(UserRole.Teacher), asyncErrorHandler(createChapterLessonTable))
.get(isLoggedIn,asyncErrorHandler(fetchCourseChapter))

export default router;