import mongoose from "mongoose";
import validator from "validator";

// scheme
const user_schema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "Name is required"],
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    location: {
      type: String,
      default: "Nepal",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", user_schema);


export default User;
