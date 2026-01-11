import { Router } from "express";
import { toggleLike } from "../controllers/likes.controller.js";
import { getComments, addComment, deleteComment } from "../controllers/comments.controller.js";
import { verifyJWT, checkUserProfileComplete } from "../middlewares/auth.middleware.js";
import { deletePost, createPost } from "../controllers/posts.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const postRouter = Router();

postRouter.use(verifyJWT, checkUserProfileComplete);

// Like routes
postRouter.route("/:postId/like").post(toggleLike);

// Comment routes
postRouter.route("/:postId/comments")
    .get(getComments)
    .post(addComment);

postRouter.route("/comments/:commentId")
    .delete(deleteComment);

//create post and delete post routes

postRouter.route("/").post(upload.single("image"), createPost);

postRouter.route("/:postId")
    .delete(deletePost);

export { postRouter };