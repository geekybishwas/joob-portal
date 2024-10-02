import express from "express";
import router from "./test_routes.js";

// import file
import controllers from "../controllers/auth_controller.js";

import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

const { register_controller, login_controller } = controllers;
// router object
const auth_router = express.Router();

// REGISTER
auth_router.post("/register", limiter, register_controller);

// LOGIN
auth_router.post("/login", limiter, login_controller);

export default auth_router;
