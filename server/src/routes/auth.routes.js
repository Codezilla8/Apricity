import { Router } from "express";
import { signupUser, loginUser, logoutUser } from "../controllers/auth.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.route('/signup').post(signupUser)//full url: /api/v1/auth/signup
authRouter.route('/login').post(loginUser)//full url: /api/v1/auth/login

//secured routes
authRouter.route('/logout').post(verifyJWT, logoutUser)//full url: /api/v1/auth/logout

export { authRouter };