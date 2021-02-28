import express from "express"
const router = express.Router()
import { getJobs } from "../controllers/jobsController.js"

router.get("/", getJobs)

export default router
