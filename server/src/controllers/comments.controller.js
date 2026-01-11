import { Comment } from "../models/comment.model.js";
import { Post } from "../models/post.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

// Get comments for a post
export const getComments = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const comments = await Comment.find({ post: postId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .populate('author', 'username profilePicture')
        .lean();

    const totalComments = await Comment.countDocuments({ post: postId });

    return res.status(200).json(
        new ApiResponse(200, {
            comments,
            pagination: {
                currentPage: pageNum,
                totalPages: Math.ceil(totalComments / limitNum),
                totalComments,
                hasMore: (pageNum * limitNum) < totalComments,
            }
        }, "Comments fetched successfully")
    );
});

// Add comment
export const addComment = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;

    if (! content || content.trim().length === 0) {
        throw new ApiError(400, "Comment content is required");
    }

    if (content.length > 500) {
        throw new ApiError(400, "Comment must not exceed 500 characters");
    }

    // Check if post exists
    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    // Create comment
    const comment = await Comment.create({
        post: postId,
        author: req. user._id,
        content: content.trim(),
    });

    // Update post comments count
    post.commentsCount += 1;
    await post.save();

    const populatedComment = await Comment.findById(comment._id)
        .populate('author', 'username profilePicture');

    return res.status(201).json(
        new ApiResponse(201, { comment: populatedComment }, "Comment added successfully")
    );
});

// Delete comment
export const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }

    if (comment.author.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You can only delete your own comments");
    }

    // Update post comments count
    const post = await Post.findById(comment.post);
    if (post) {
        post.commentsCount = Math.max(0, post. commentsCount - 1);
        await post.save();
    }

    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json(
        new ApiResponse(200, null, "Comment deleted successfully")
    );
});