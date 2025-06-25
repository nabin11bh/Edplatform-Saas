import express from 'express'
const app = express()
import authRoute from "./routes/globals/auth/authRoute"
import instituteRoute from "./routes/institute/instituteRoute"
import courseRoute from "./routes/institute/course/courseRoute"
import studentRoute from "./routes/institute/student/studentRoute"
import categoryRoute from "./routes/institute/category/categoryRoute"






app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api",authRoute)
app.use("/api/institute",instituteRoute)
app.use("/api/institute/course",courseRoute);
app.use("/api/institute/student",studentRoute);
app.use("/api/institute/category",categoryRoute);

export default app