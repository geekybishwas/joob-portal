import express from "express";
import userAuth from "../middlewares/auth_middleware.js";
import { create_jobs_controller } from "../controllers/jobs_controller.js";

const job_router = express.Router();

job_router.post("/create-job", userAuth, create_jobs_controller);

export default job_router;
