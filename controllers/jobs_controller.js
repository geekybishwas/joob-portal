import Job from "../models/jobModel.js";
import User from "../models/userModel.js";

export const create_jobs_controller = async (req, res, next) => {
  const { company, position } = req.body;

  if (!company || !position) {
    next("Please provide all fields");
  }

  req.body.createdBy = req.user.userId;

  console.log(req.user);
  const job = await Job.create(req.body);

  res.status(200).json({
    success: "true",
    job,
  });
};

// get all jobs

export const get_all_jobs = async (req, res, next) => {
  const email = req.email;

  const jobs = await Job.find({ createdBy: req.user.userId });

  res.status(200).json({
    total_jobs: jobs.length,
    success: "true",
    jobs,
  });
};
