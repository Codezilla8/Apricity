import mongoose from "mongoose";

const conversationSchema = new mongoose. Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:  true,
    }],
    lastMessage: {
        type: String,
        default: '',
    },
    lastMessageTime: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true
});

conversationSchema.index({ participants: 1 });

export const Conversation = mongoose.model("Conversation", conversationSchema);