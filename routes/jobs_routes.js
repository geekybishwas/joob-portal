import express from "express";
import userAuth from "../middlewares/auth_middleware.js";
import {
  create_jobs_controller,
  delete_jobs,
  get_all_jobs,
  jobs_stats_controller,
  update_jobs,
} from "../controllers/jobs_controller.js";

const job_router = express.Router();

// Create job
job_router.post("/create-job", userAuth, create_jobs_controller);

// Get jobss
job_router.get("/get-jobs", userAuth, get_all_jobs);

// Update jobs
job_router.put('/update-job/:id',userAuth,update_jobs);

// Delete jobs
job_router.delete('/delete-job/:id',userAuth,delete_jobs);

// jobs stats filter
job_router.get('/job-stats',userAuth,jobs_stats_controller)

export default job_router;
