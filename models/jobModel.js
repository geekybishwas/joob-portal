import mongoose from "mongoose";

const job_schema = new mongoose.Schema(
  {
    comopany: {
      type: String,
      required: [true, "Company name is required"],
    },
    position: {
      type: String,
      required: [true, "Job position is required"],
    },
    status: {
      type: String,
      enum: ["pending", "reject", "interview"],
      default: "pending",
    },
    work_type: {
      type: String,
      enum: ["full-time", "part-time", "internship", "contract"],
      default: "fill-time",
    },
    work_location: {
      type: String,
      default: "Pokhara",
      required: [true, "Work location is requried"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("job", job_schema);

export default Job;
