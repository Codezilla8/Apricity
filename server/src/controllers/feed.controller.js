import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

// Get feed posts
export const getFeed = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, type = 'all' } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build query
    const query = {};
    if (type !== 'all') {
        query.type = type;
    }

    // Fetch posts
    const posts = await Post.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .populate('author', 'username profilePicture')
        .lean();

    // Get total count
    const totalPosts = await Post.countDocuments(query);
    const hasMore = (pageNum * limitNum) < totalPosts;

    // Add isLiked flag
    const postsWithLikeStatus = posts.map(post => ({
        ...post,
        isLiked: post.likes.some(userId => userId.toString() === req.user._id.toString()),
    }));

    return res.status(200).json(
        new ApiResponse(200, {
            posts: postsWithLikeStatus,
            pagination: {
                currentPage: pageNum,
                totalPages: Math.ceil(totalPosts / limitNum),
                totalPosts,
                hasMore,
            }
        }, "Feed fetched successfully")
    );
});

