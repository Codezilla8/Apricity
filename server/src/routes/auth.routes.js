import { Router } from "express";
import { signupUser, loginUser } from "../controllers/auth.controllers.js";

const authRouter = Router();

authRouter.route('/signup').post(signupUser)//full url: /api/v1/auth/signup
authRouter.route('/login').post(loginUser)//full url: /api/v1/auth/login

export { authRouter,
    loginUser
}