import { Router } from "express";
import { completeProfile, getCurrentUser, getUserProfileByUsername } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = Router();

//secured routes

// Complete profile (after signup)
userRouter.route("/complete-profile").post(//url: /api/v1/users/complete-profile
    verifyJWT,
    upload.single("avatar"), // Handle file upload
    completeProfile
);

// Get current user
userRouter.route("/me").get(verifyJWT, getCurrentUser);


//get user by username
userRouter.route("/:username").get(getUserProfileByUsername);

export { userRouter };



