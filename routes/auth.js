import express from "express";
import router from "./test_routes.js";

// import file
import register_controller from "../controllers/auth_controller.js";

// router object
const auth_router = express.Router();

auth_router.post("/register", register_controller);

export default auth_router;