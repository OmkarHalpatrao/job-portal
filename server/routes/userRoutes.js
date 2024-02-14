import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { getUser, updateUser,applyForJob } from "../controllers/userController.js";

const router = express.Router();

// GET user
router.post("/get-user", userAuth, getUser);

// UPDATE USER || PUT
router.put("/update-user", userAuth, updateUser);

router.post("/apply-job", userAuth, applyForJob);

export default router;
