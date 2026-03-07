import express from "express";
import {postjob,getAllJobs,getJobById,getAdminJobs } from "../controllers/postjobController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router()

//register job
router.post("/", isAuthenticated, postjob);

router.get("/", isAuthenticated,getAllJobs)
router.get("/:id", isAuthenticated, getJobById)
router.get("/admin", isAuthenticated, getAdminJobs)

export default router