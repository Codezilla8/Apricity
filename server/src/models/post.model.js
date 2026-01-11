import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose. Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    type: {
        type: String,
        enum: ['poetry', 'painting', 'story', 'photograph'],
        required: true,
    },
    title: {
        type: String,
        maxlength: 200,
    },
    content: {
        type: String,
        required: true,
        maxlength: 5000,
    },
    image: {
        type: String, // Cloudinary URL
        default: null,
    },
    imagePublicId: {
        type:  String,
        default: null,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    likesCount: {
        type:  Number,
        default: 0,
    },
    commentsCount: {
        type:  Number,
        default: 0,
    },
}, {
    timestamps: true
});

// Indexes for performance
postSchema.index({ createdAt: -1 });
postSchema.index({ author: 1, createdAt: -1 });
postSchema.index({ type: 1, createdAt: -1 });
postSchema.index({ likesCount: -1 });

export const Post = mongoose.model("Post", postSchema);