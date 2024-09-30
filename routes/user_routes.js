import express from "express";
import userAuth from "../middlewares/auth_middleware.js";
import { updateUserController } from "../controllers/user_controller.js";

// router object
const user_router = express.Router();

// routes
user_router.put("/update-user", userAuth, updateUserController);

export default user_router;
