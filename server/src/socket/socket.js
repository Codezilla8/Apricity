import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { Message } from "../models/message.model.js";
import { Conversation } from "../models/conversation.model.js";
import { User } from "../models/user.model.js";

export const initializeSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:3000",
            credentials: true,
        },
    });

    // Auth middleware
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth. token;
            if (!token) {
                return next(new Error("Authentication error"));
            }

            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(decoded._id).select("-password -refreshToken");

            if (!user) {
                return next(new Error("User not found"));
            }

            socket.userId = user._id. toString();
            socket.username = user.username;
            next();
        } catch (error) {
            next(new Error("Authentication error"));
        }
    });

    io.on("connection", (socket) => {
        console.log(`✅ User connected: ${socket.username}`);

        // Join user's personal room
        socket.join(socket.userId);

        // Send message
        socket.on("send_message", async (data) => {
            try {
                const { recipientId, text } = data;

                // Find or create conversation
                let conversation = await Conversation.findOne({
                    participants: { $all: [socket.userId, recipientId] }
                });

                if (!conversation) {
                    conversation = await Conversation.create({
                        participants: [socket.userId, recipientId],
                        lastMessage: text,
                        lastMessageTime: new Date(),
                    });
                } else {
                    conversation.lastMessage = text;
                    conversation.lastMessageTime = new Date();
                    await conversation.save();
                }

                // Create message
                const message = await Message.create({
                    conversation: conversation._id,
                    sender: socket.userId,
                    text,
                });

                const populatedMessage = await Message.findById(message._id)
                    .populate('sender', 'username profilePicture');

                // Send to recipient
                io.to(recipientId).emit("receive_message", {
                    conversationId: conversation._id,
                    message: populatedMessage,
                });

                // Confirm to sender
                socket.emit("message_sent", {
                    conversationId: conversation._id,
                    message: populatedMessage,
                });

            } catch (error) {
                console.error("Send message error:", error);
                socket.emit("error", { message: "Failed to send message" });
            }
        });

        socket.on("disconnect", () => {
            console.log(`❌ User disconnected: ${socket. username}`);
        });
    });

    return io;
};