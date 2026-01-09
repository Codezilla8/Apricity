import { Router } from "express";
import { completeProfile, getCurrentUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = Router();

//secured routes

// Complete profile (after signup)
userRouter.route("/complete-profile").post(
    verifyJWT,
    upload.single("avatar"), // Handle file upload
    completeProfile
);

// Get current user
userRouter.route("/me").get(verifyJWT, getCurrentUser);

export { userRouter };