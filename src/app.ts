import express from 'express'
const app = express()
import authRoute from "./routes/globals/auth/authRoute"
import instituteRoute from "./routes/institute/instituteRoute"
import courseRoute from "./routes/course/courseRoute"






app.use(express.json());


app.use("/api",authRoute)
app.use("/api/institute",instituteRoute)
app.use("/api/institute/course",courseRoute);
export default app