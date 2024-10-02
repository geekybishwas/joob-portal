//import packages
import express from "express";

import dotenv from "dotenv";
import morgan from "morgan";
import "express-async-errors";

// security packages
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

// MongoDB connection
// import file
import connectDB from "./config/db.js";
import auth_router from "./routes/auth.js";

import test_route from "./routes/test_routes.js";
import job_router from "./routes/jobs_routes.js";

import user_router from "./routes/user_routes.js";

import error_middleware from "./middlewares/error_middleware.js";

// config
dotenv.config();

// mogodb connection
connectDB();

//rest objects
const app = express();

//middlewares
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(morgan("dev"));

// validation middleware
app.use(error_middleware);

// routes
app.use("/", auth_router);

app.use("/test-post", test_route);

app.use("/user", user_router);

app.use("/job", job_router);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
