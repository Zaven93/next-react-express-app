import express from "express"
import cors from "cors"
import jobsRoutes from "./routes/jobsRoutes.js"

const app = express()

const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/api/jobs", jobsRoutes)

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
