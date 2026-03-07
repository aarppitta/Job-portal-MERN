import express from "express";
import {postjob,getAllJobs,getJobById,getAdminJobs } from "../controllers/postjobController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router()

//register job
router.post("/", isAuthenticated, postjob);

router.get("/", isAuthenticated,getAllJobs)

router.get("/admin", isAuthenticated, getAdminJobs)

router.get("/:id", isAuthenticated, getJobById)


export default router