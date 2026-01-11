import { Router } from "express";
import { getConversations, getMessages } from "../controllers/chat.controller.js";
import { verifyJWT, checkUserProfileComplete } from "../middlewares/auth.middleware.js";

const chatRouter = Router();

chatRouter.use(verifyJWT, checkUserProfileComplete);

chatRouter.route("/conversations").get(getConversations);
chatRouter.route("/messages/:username").get(getMessages);

export { chatRouter };