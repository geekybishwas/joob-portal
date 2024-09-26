import express from "express";

import test_controller from "../controllers/test_controller.js";

//router object
const router = express.Router();

// routes
router.post("/test", test_controller);

// export

export default router;
