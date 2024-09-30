import Job from "../models/jobModel.js";

export const create_jobs_controller = async (req, res, next) => {
  const { company, position } = req.body;

  if (!company || !position) {
    next("Please provide all fields");
  }

  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);

  res.status(200).json({
    success: "true",
    job,
  });
};
