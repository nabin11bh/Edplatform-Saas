import express from 'express'
const app = express()
import authRoute from "./routes/globals/auth/authRoute"
import instituteRoute from "./routes/institute/instituteRoute"
import courseRoute from "./routes/institute/course/courseRoute"
import studentRoute from "./routes/institute/student/studentRoute"
import categoryRoute from "./routes/institute/category/categoryRoute"
import teacherInstituteRoute from "./routes/institute/teacher/teacherRoute"
import teacgerRoute from "./routes/teacher/teacherRoute"






app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//global route
app.use("/api",authRoute)

//institute route
app.use("/api/institute",instituteRoute)
app.use("/api/institute/course",courseRoute);
app.use("/api/institute/student",studentRoute);
app.use("/api/institute/category",categoryRoute);
app.use("/api/institute/teacher",teacherInstituteRoute);

//teacher route
app.use("/api/teacher",teacgerRoute)

export default app