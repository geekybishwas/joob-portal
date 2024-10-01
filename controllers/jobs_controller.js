import Job from "../models/jobModel.js";
import User from "../models/userModel.js";

import mongoose from "mongoose";

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
  const { status } = req.query;

  
  const queryObject = {
    createdBy: req.user.userId,
  };
  console.log(queryObject);

  if (status && status !== "all") {
    queryObject.status = status;
  }

  const queryResult = Job.find(queryObject);
  
  const jobs = await queryResult;


  // const jobs = await Job.find({ createdBy: req.user.userId });

  res.status(200).json({
    total_jobs: jobs.length,
    success: "true",
    jobs,
  });
};

// update jobs
export const update_jobs = async (req, res, next) => {
  const { id } = req.params;

  const { company, position } = req.body;

  // validation
  if (!company || !position) next("Please provide all fields");

  const job = await Job.findOne({ _id: id });

  if (!job) next(`No job is associated with this id ${id}`);

  if (req.user.userId !== job.createdBy.toString()) {
    next("You are not authorized to update this job");
  }

  const update_job = await Job.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    update_job,
  });
};

// delete
export const delete_jobs = async (req, res, next) => {
  const { id } = req.params;

  const job = await Job.findOne({ _id: id });

  if (!job) next("No job is associated with that id");

  if (!req.user.userId === job.createdBy.toString()) {
    next("You are not authorized to delete this job");
    return;
  }

  // await job.remove();

  await job.deleteOne();

  return res.status(200).json({
    message: "Sucessfully deleted the job",
    job,
  });
};

// jobs stats and filter
export const jobs_stats_controller = async (req, res, next) => {
  const stats = await Job.aggregate([
    // search by user jobs
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  // defaul stats
  const default_stats = {
    pending: stats.pending || 0,
    reject: stats.reject || 0,
    interview: stats.interview || 0,
  };

  // monthly yearly stats
  let monthly_application = await Job.aggregate([
    {
      $match: {
        createdBy: new moongose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  res.status(200).json({
    totaljobs: stats.length,
    default_stats,
    monthly_application,
  });
};
