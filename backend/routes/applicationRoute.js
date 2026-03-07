import express from "express";
import {applyJob, getAppliedJobs, getApplicants, updateApplicationStatus } from "../controllers/applicationController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router()

//apply for a job
router.post("/apply/:id", isAuthenticated, applyJob) //job id we need

//get applied jobs
router.get("/applied-jobs", isAuthenticated, getAppliedJobs)

//admin will see how many students applied for the job and their details
router.get("/applicants/:id", isAuthenticated, getApplicants) //which user applied

//update application status
router.put("/update-status/:id", isAuthenticated, updateApplicationStatus)

export default router