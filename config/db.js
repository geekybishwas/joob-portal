import mongoose from "mongoose";

// import dotenv from "dotenv";

// dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to MONGO Database ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`Mongo Error ${error}`);
  }
};

export default connectDB;
