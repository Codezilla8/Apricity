import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";

// Complete user profile
export const completeProfile = asyncHandler(async (req, res) => {
    const { bio } = req.body;

    // Validation
    if (!bio || bio.trim().length < 10) {
        throw new ApiError(400, "Bio must be at least 10 characters");
    }

    if (bio.trim().length > 150) {
        throw new ApiError(400, "Bio must not exceed 150 characters");
    }
    console.log('bio:', bio);

    // Get current user (from auth middleware)
    const user = await User.findById(req.user._id);
    

    if (!user) {
        throw new ApiError(404, "User not found");
    }
    console.log('user:', user);

    // Update bio
    user.description = bio.trim();

    // Handle avatar upload if provided
    if (req.file) {
        // Upload to Cloudinary
        const avatarLocalPath = req.file.path;
        console.log('avatarLocalPath:', avatarLocalPath);
        const avatar = await uploadOnCloudinary(avatarLocalPath);

        if (!avatar) {
            throw new ApiError(500, "Failed to upload avatar");
        }

        user.profilePicture = avatar.url;
        console.log('Uploaded avatar URL:', avatar.url);
    }

    // Mark profile as complete
    user.profileComplete = true;

    await user.save({ validateBeforeSave: false });

    const updatedUser = await User.findById(user._id).select("-password -refreshToken");

    return res
        .status(200)
        .json(
            new ApiResponse(200, {
                user: updatedUser
            }, "Profile completed successfully")
        );
});

// Get current user profile
export const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password -refreshToken");
    
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, {
            user
        }, "User fetched successfully")
    );
});

// //get user profile by username
// export const getUserProfileByUsername = asyncHandler(async (req, res) => {
//     const { username } = req.params;

//     const user = await User.findOne({ username })
//         .select("-password -refreshToken");

//     if (!user) {
//         throw new ApiError(404, "User not found");
//     }

//     const posts = await Post.find({ author: user._id })
//         .sort({ createdAt: -1 });

//     return res.status(200).json(
//         new ApiResponse(200, {
//             user,
//             posts
//         }, "Profile fetched successfully")
//     );
// });


// //search users by username or name
// export const searchUsers = asyncHandler(async (req, res) => {
//   const { q } = req.query;

//   if (!q || !q.trim()) {
//     return res.status(200).json(
//       new ApiResponse(200, { users: [] }, "Empty search")
//     );
//   }

//   const users = await User.find({
//     username: { $regex: q, $options: "i" }
//   })
//     .select("username profilePicture description")
//     .limit(10);

//   return res.status(200).json(
//     new ApiResponse(200, { users }, "Users found")
//   );
// });


//Search users by username
export const searchUsers = asyncHandler(async (req, res) => {
    const { q } = req.query;

    if (!q || !q.trim()) {
        return res.status(200).json(
            new ApiResponse(200, { users: [] }, "Empty query")
        );
    }

    const users = await User.aggregate([
        {
            $match: {
                username: { $regex: q, $options: "i" }
            }
        },
        {
            $lookup: {
                from: "posts",
                localField: "_id",
                foreignField: "author",
                as: "posts"
            }
        },
        {
            $project: {
                username: 1,
                profilePicture: 1,
                description: 1,
                postCount: { $size: "$posts" }
            }
        },
        {
            $limit: 10
        }
    ]);

    return res.status(200).json(
        new ApiResponse(200, { users }, "Users found")
    );
});
