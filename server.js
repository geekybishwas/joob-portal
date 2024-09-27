//import packages
import express from "express";

import dotenv from "dotenv";
import morgan from "morgan";

// MongoDB connection
// import file
import connectDB from "./config/db.js";
import auth_router from "./routes/auth.js";
import router from "./routes/test_routes.js";
import error_middleware from "./middlewares/error_middleware.js";

import "express-async-errors";

// config
dotenv.config();

// mogodb connection
connectDB();

//rest objects
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));

// validation middleware
app.use(error_middleware);

// routes
app.use("/", auth_router);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
