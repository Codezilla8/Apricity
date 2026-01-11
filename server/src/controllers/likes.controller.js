import { Post } from "../models/post.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

// Toggle like on post
export const toggleLike = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    const userIdStr = req.user._id.toString();
    const isLiked = post.likes. some(userId => userId.toString() === userIdStr);

    if (isLiked) {
        // Unlike
        post.likes = post.likes.filter(userId => userId. toString() !== userIdStr);
        post.likesCount = Math.max(0, post.likesCount - 1);
    } else {
        // Like
        post.likes.push(req.user._id);
        post.likesCount += 1;
    }

    await post.save();

    return res.status(200).json(
        new ApiResponse(200, { 
            isLiked: !isLiked,
            likesCount:  post.likesCount 
        }, isLiked ? "Post unliked" : "Post liked")
    );
});