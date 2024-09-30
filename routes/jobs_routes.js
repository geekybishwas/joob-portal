import express from "express";
import userAuth from "../middlewares/auth_middleware.js";
import {
  create_jobs_controller,
  get_all_jobs,
  update_jobs,
} from "../controllers/jobs_controller.js";

const job_router = express.Router();

job_router.post("/create-job", userAuth, create_jobs_controller);

job_router.get("/get-jobs", userAuth, get_all_jobs);

job_router.put('/update-job/:id',userAuth,update_jobs);

export default job_router;
