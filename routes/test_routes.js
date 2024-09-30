import express from "express";

import test_controller from "../controllers/test_controller.js";
import userAuth from "../middlewares/auth_middleware.js";

//router object
const test_route = express.Router();

// routes
test_route.post("/test", userAuth, test_controller);

// export

export default test_route;
