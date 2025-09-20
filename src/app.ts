import express from 'express'
const app = express()

import authRoute from "./routes/globals/auth/authRoute"
import instituteRoute from "./routes/institute/instituteRoute"
import courseRoute from "./routes/institute/course/courseRoute"
import studentRoute from "./routes/institute/student/studentRoute"
import categoryRoute from "./routes/institute/category/categoryRoute"
import teacherInstituteRoute from "./routes/institute/teacher/teacherRoute"
import teacherRoute from './routes/teacher/teacherRoute'
import lessonRoute from './routes/teacher/course/lessons/course-lesson'
import chapterRoute from './routes/teacher/course/chapters/course-chapter-router'

import cors from 'cors'






app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:3000"
}))

//global route
app.use("/api/auth",authRoute)

//institute route
app.use("/api/institute",instituteRoute)
app.use("/api/institute/course",courseRoute);
app.use("/api/institute/student",studentRoute);
app.use("/api/institute/category",categoryRoute);
app.use("/api/institute/teacher",teacherInstituteRoute);


//teacher route
app.use("/api/teacher",teacherRoute)
app.use("/api/teacher/course",chapterRoute)
app.use("/api/teacher/course",lessonRoute)



export default app