import express from "express";
import router from "./test_routes";

// import file
import register_controller from "../controllers/auth_controller.js";

// router object
const auth_router = express.Router();

router.post("/register", register_controller);

export default auth_router;
