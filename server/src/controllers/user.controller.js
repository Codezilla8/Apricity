import { User } from "../models/user. model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

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

    // Get current user (from auth middleware)
    const user = await User.findById(req.user._id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Update bio
    user.description = bio. trim();

    // Handle avatar upload if provided
    if (req.file) {
        // Upload to Cloudinary
        const avatarLocalPath = req.file.path;
        const avatar = await uploadOnCloudinary(avatarLocalPath);

        if (!avatar) {
            throw new ApiError(500, "Failed to upload avatar");
        }

        user.profilePicture = avatar. url;
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