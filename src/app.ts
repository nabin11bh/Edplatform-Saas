import express from 'express'
const app = express()
import authRoute from "./routes/globals/auth/authRoute"
import instituteRoute from "./routes/institute/instituteRoute"

app.use(express.json())


app.use("/api",authRoute)
app.use("/api/institute",instituteRoute)
export default app