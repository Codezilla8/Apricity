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

// Create post
export const createPost = asyncHandler(async (req, res) => {
    const { type, title, content } = req.body;

    if (! type || !content) {
        throw new ApiError(400, "Type and content are required");
    }

    if (! ['poetry', 'painting', 'story', 'photograph'].includes(type)) {
        throw new ApiError(400, "Invalid post type");
    }

    // Handle image upload
    let imageData = null;
    if (req.file) {
        const { uploadOnCloudinary } = await import("../config/cloudinary.js");
        const uploaded = await uploadOnCloudinary(req.file.path);
        if (uploaded) {
            imageData = {
                image: uploaded.url,
                imagePublicId:  uploaded.public_id,
            };
        }
    }

    const post = await Post.create({
        author: req.user._id,
        type,
        title:  title || null,
        content,
        ... imageData,
    });

    const populatedPost = await Post.findById(post._id)
        .populate('author', 'username profilePicture');

    return res.status(201).json(
        new ApiResponse(201, { post:  populatedPost }, "Post created successfully")
    );
});

// Delete post
export const deletePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    if (post.author.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You can only delete your own posts");
    }

    await Post.findByIdAndDelete(postId);

    return res.status(200).json(
        new ApiResponse(200, null, "Post deleted successfully")
    );
});