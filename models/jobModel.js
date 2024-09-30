import mongoose from "mongoose";

const job_schema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is required"],
    },
    position: {
      type: String,
      required: [true, "Job position is required"],
      maxlenght: 100,
    },
    status: {
      type: String,
      enum: ["pending", "reject", "interview"],
      default: "pending",
    },
    work_type: {
      type: String,
      enum: ["full-time", "part-time", "internship", "contract"],
      default: "full-time",
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
