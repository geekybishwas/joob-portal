import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

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

// middlewares
user_schema.pre("save", async function () {
  // password hashing
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// JSON WEBTOKEN
user_schema.methods.createJWT = function () {
  return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const User = mongoose.model("user", user_schema);

export default User;
