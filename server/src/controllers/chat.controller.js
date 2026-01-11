import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

// Get all conversations
export const getConversations = asyncHandler(async (req, res) => {
    const conversations = await Conversation.find({
        participants: req.user._id
    })
    .populate('participants', 'username profilePicture')
    .sort({ lastMessageTime: -1 })
    .lean();

    // Format conversations
    const formattedConversations = conversations.map(conv => {
        const otherUser = conv.participants.find(p => p._id.toString() !== req.user._id.toString());
        return {
            id: conv._id,
            with: otherUser.username,
            withUser: otherUser,
            lastMessage: conv.lastMessage,
            lastMessageTime:  conv.lastMessageTime,
        };
    });

    return res.status(200).json(
        new ApiResponse(200, { conversations: formattedConversations }, "Conversations fetched")
    );
});

// Get messages in a conversation
export const getMessages = asyncHandler(async (req, res) => {
    const { username } = req.params;

    // Find the other user
    const otherUser = await User.findOne({ username }).select('_id');
    if (!otherUser) {
        throw new ApiError(404, "User not found");
    }

    // Find conversation
    const conversation = await Conversation.findOne({
        participants: { $all: [req.user._id, otherUser._id] }
    });

    if (!conversation) {
        return res.status(200).json(
            new ApiResponse(200, { messages: [] }, "No messages yet")
        );
    }

    // Get messages
    const messages = await Message.find({ conversation: conversation._id })
        .sort({ createdAt: 1 })
        .populate('sender', 'username profilePicture')
        .lean();

    // Format messages
    const formattedMessages = messages.map(msg => ({
        id: msg._id,
        sender: msg.sender.username,
        text: msg.text,
        timestamp: msg.createdAt,
        isMe: msg.sender._id. toString() === req.user._id.toString(),
    }));

    return res.status(200).json(
        new ApiResponse(200, { messages: formattedMessages }, "Messages fetched")
    );
});