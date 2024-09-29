import express from "express";
import router from "./test_routes.js";

// import file
import controllers from "../controllers/auth_controller.js";

const { register_controller, login_controller } = controllers;
// router object
const auth_router = express.Router();

// REGISTER
auth_router.post("/register", register_controller);

// LOGIN
auth_router.post("/login", login_controller);

export default auth_router;
