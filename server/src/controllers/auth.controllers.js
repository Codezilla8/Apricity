import User from "../models/user.model.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


//register a new user
export const signupUser = asyncHandler(async (req, res) => {
    const { username, 
            email, 
            password, 
            dateOfBirth: dob, 
            favoriteColor } = req.body;

    if (
        [email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    if (!(dob && favoriteColor)) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    console.log(req.files);

    const user = await User.create({
        email, 
        password,
        username: username.toLowerCase(),
        dob,
        favoriteColor,
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

});