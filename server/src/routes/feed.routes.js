import { Router } from "express";
import { getFeed } from "../controllers/feed.controller.js";
import { verifyJWT, checkUserProfileComplete } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const feedRouter = Router();

// All routes require auth + complete profile
feedRouter.use(verifyJWT, checkUserProfileComplete);

// Get feed
feedRouter.route("/").get(getFeed)
    // .post(upload.single("image"), createPost);

// Delete post
// feedRouter.route("/:postId")
//     .delete(deletePost);

export { feedRouter };