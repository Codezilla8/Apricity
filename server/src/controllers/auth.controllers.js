import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from 'google-auth-library';

//what would happen in a case when user gets registered but isn't able to generate tokens due to some error? we need to delete that user from db in that case

const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}


//register a new user
export const signupUser = asyncHandler(async (req, res) => {
    const { username, 
            email, 
            password, 
            dateOfBirth } = req.body;

    if (
        [email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    if (!dateOfBirth) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

        // if (existedUser) {
        //     if (!existedUser.profileComplete) {
        //         throw new ApiError(409, "INCOMPLETE_PROFILE: Account exists but profile incomplete. Please login to complete your profile.")
        //     }
        //     throw new ApiError(409, "ACCOUNT_EXISTS: An account with this email or username already exists. Please login instead.")
        // }

    console.log(req.files);

    const user = await User.create({
        email, 
        password,
        username: username.toLowerCase(),
        dateOfBirth,
        profileComplete: false,
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    //Generate tokens 
    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)


    const options = {
    httpOnly: true,
    secure:  false, //set to true in production (https)
    }

    // Set cookies and return response
    return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(201, {
            user: createdUser,
            accessToken,
            refreshToken,
            profileComplete: false
        }, "User registered successfully")
    )

    // return res.status(201).json(
    //     new ApiResponse(201, createdUser, "User registered Successfully")
    // )

});



//login user

export const loginUser = asyncHandler(async (req, res) =>{

    const {email, username, password} = req.body
    console.log(email);

    if (!username && !email) {
        throw new ApiError(400, "username or email is required")
    }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

   const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
    }

   const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

   const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: false
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, 
                accessToken, 
                refreshToken,
                profileComplete: loggedInUser.profileComplete
            },
            "User logged In Successfully"
        )
    )

})


//logout user

export const logoutUser = asyncHandler(async(req, res) => {//clear the cookies and also delete/reset the referesh tokens
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true,
        }
    )

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(200, null, "User logged out successfully")
    )
})


export const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})


// Google Sign-In

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = asyncHandler(async (req, res) => {
    const { credential } = req.body; // Google ID token from frontend

    if (!credential) {
        throw new ApiError(400, "Google credential is required");
    }

    try {
        //Verify the Google token
        const ticket = await client. verifyIdToken({
            idToken: credential,
            audience: process.env. GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        
        console.log('Google user:', payload.email);

        // Extract user info from Google
        const { email, name, picture, sub:  googleId } = payload;

        //Check if user exists
        let user = await User.findOne({ email });

        if (user) {
            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            // 👤 USER EXISTS - Login
            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            console.log('Existing user, logging in');

            // Generate tokens
            const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

            const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

            const options = {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                path: '/',
                maxAge: 24 * 60 * 60 * 1000
            };

            return res
                .status(200)
                .cookie("accessToken", accessToken, options)
                .cookie("refreshToken", refreshToken, options)
                .json(
                    new ApiResponse(200, {
                        user: loggedInUser,
                        accessToken,
                        refreshToken,
                        profileComplete: loggedInUser.profileComplete
                    }, "Logged in with Google successfully")
                );

        } else {
            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            // ✨ NEW USER - Create account
            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            console. log('✨ New user, creating account');

            // Generate username from email
            const baseUsername = email.split('@')[0]. toLowerCase();
            let username = baseUsername;
            
            // Check if username exists, add number if needed
            let counter = 1;
            while (await User.findOne({ username })) {
                username = `${baseUsername}${counter}`;
                counter++;
            }

            // Create new user
            const newUser = await User.create({
                email,
                username,
                password: googleId, // Use Google ID as password (won't be used for login)
                profilePicture:  picture || null,
                description: null,
                profileComplete: false,
                googleId, // Store Google ID for future reference
                dateOfBirth: new Date('2000-01-01'), // Default, user can update later
            });

            const createdUser = await User.findById(newUser._id).select("-password -refreshToken");

            // Generate tokens
            const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(newUser._id);

            const options = {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                path: '/',
                maxAge: 24 * 60 * 60 * 1000
            };

            return res
                .status(201)
                .cookie("accessToken", accessToken, options)
                .cookie("refreshToken", refreshToken, options)
                .json(
                    new ApiResponse(201, {
                        user:  createdUser,
                        accessToken,
                        refreshToken,
                        profileComplete: false
                    }, "Signed up with Google successfully")
                );
        }

    } catch (error) {
        console.error('❌ Google auth error:', error);
        throw new ApiError(401, "Invalid Google credential");
    }
});