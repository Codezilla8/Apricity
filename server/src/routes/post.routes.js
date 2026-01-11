import { Router } from "express";
import { toggleLike } from "../controllers/likes.controller.js";
import { getComments, addComment, deleteComment } from "../controllers/comments.controller.js";
import { verifyJWT, checkUserProfileComplete } from "../middlewares/auth.middleware.js";

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

export { postRouter };